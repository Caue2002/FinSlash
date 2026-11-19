import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const MODELO_EMBEDDING = 'gemini-embedding-001';
const DIMENSOES_EMBEDDING = 768;
const TAMANHO_LOTE = 32;
const TENTATIVAS_MAXIMAS = 4;

function criarTextoDocumento(cenario) {
    const etapas = Array.isArray(cenario.steps) ? cenario.steps : [];
    return [
        `${cenario.serviceName}: ${cenario.title}`,
        cenario.summary,
        ...etapas.map((etapa) => `${etapa.title}. ${etapa.content}`)
    ].filter((trecho) => typeof trecho === 'string' && trecho.trim())
        .join('\n')
        .trim();
}

function criarHashConteudo(texto) {
    return createHash('sha256')
        .update(`${MODELO_EMBEDDING}:${DIMENSOES_EMBEDDING}\n${texto}`, 'utf8')
        .digest('hex');
}

function validarVetor(vetor) {
    if (!Array.isArray(vetor)
        || vetor.length !== DIMENSOES_EMBEDDING
        || vetor.some((valor) => !Number.isFinite(valor))) {
        throw new TypeError('O Gemini devolveu um vetor inválido para o catálogo.');
    }
    const norma = Math.hypot(...vetor);
    if (!Number.isFinite(norma) || norma === 0) {
        throw new TypeError('O Gemini devolveu um embedding sem magnitude válida.');
    }
    return vetor.map((valor) => valor / norma);
}

function serializarVetor(vetor) {
    return `[${validarVetor(vetor).join(',')}]`;
}

async function gerarEmbeddings(textos, chave) {
    let ultimaFalha;
    for (let tentativa = 0; tentativa < TENTATIVAS_MAXIMAS; tentativa += 1) {
        try {
            const resposta = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${MODELO_EMBEDDING}:batchEmbedContents`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': chave
                    },
                    body: JSON.stringify({
                        requests: textos.map((texto) => ({
                            model: `models/${MODELO_EMBEDDING}`,
                            content: { parts: [{ text: texto }] },
                            taskType: 'RETRIEVAL_DOCUMENT',
                            outputDimensionality: DIMENSOES_EMBEDDING
                        }))
                    })
                }
            );

            if (!resposta.ok) {
                const detalhe = (await resposta.text()).slice(0, 300);
                const erro = new Error(`Gemini respondeu HTTP ${resposta.status}: ${detalhe}`);
                erro.retryable = resposta.status >= 500 || resposta.status === 429;
                if (!erro.retryable) {
                    throw erro;
                }
                ultimaFalha = erro;
            } else {
                const dados = await resposta.json();
                if (!Array.isArray(dados.embeddings) || dados.embeddings.length !== textos.length) {
                    throw new TypeError('A resposta do Gemini não corresponde ao lote solicitado.');
                }
                return dados.embeddings.map((item) => validarVetor(item.values));
            }
        } catch (erro) {
            ultimaFalha = erro;
            if (erro.retryable === false
                || (erro instanceof TypeError && !String(erro.message).includes('fetch'))) {
                throw erro;
            }
        }

        if (tentativa < TENTATIVAS_MAXIMAS - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500 * (2 ** tentativa)));
        }
    }
    throw ultimaFalha || new Error('Não foi possível gerar embeddings para o catálogo.');
}

async function sincronizarCatalogo(pool, chave) {
    const resultado = await pool.query(
        `SELECT
            scenario.id,
            service.name AS "serviceName",
            scenario.title,
            scenario.summary,
            COALESCE((
                SELECT json_agg(json_build_object('title', step.title, 'content', step.content)
                    ORDER BY step.step_type, step.position)
                FROM scenario_steps AS step
                WHERE step.scenario_id = scenario.id
            ), '[]'::json) AS steps,
            embedding.content_hash AS "contentHash"
         FROM cost_scenarios AS scenario
         JOIN aws_services AS service ON service.id = scenario.service_id
         LEFT JOIN scenario_embeddings AS embedding ON embedding.scenario_id = scenario.id
         WHERE scenario.is_published = TRUE
         ORDER BY scenario.id`
    );

    const pendentes = resultado.rows.map((cenario) => {
        const texto = criarTextoDocumento(cenario);
        return {
            id: cenario.id,
            texto,
            hash: criarHashConteudo(texto),
            contentHash: cenario.contentHash
        };
    }).filter((cenario) => cenario.hash !== cenario.contentHash);

    for (let inicio = 0; inicio < pendentes.length; inicio += TAMANHO_LOTE) {
        const lote = pendentes.slice(inicio, inicio + TAMANHO_LOTE);
        const vetores = await gerarEmbeddings(lote.map((item) => item.texto), chave);
        const parametros = [];
        const valores = lote.map((item, indice) => {
            const base = indice * 4;
            parametros.push(
                item.id,
                item.hash,
                serializarVetor(vetores[indice]),
                MODELO_EMBEDDING
            );
            return `($${base + 1}, $${base + 2}, $${base + 3}::extensions.vector(${DIMENSOES_EMBEDDING}), $${base + 4})`;
        });

        await pool.query(
            `INSERT INTO scenario_embeddings
                (scenario_id, content_hash, embedding, embedding_model)
             VALUES ${valores.join(', ')}
             ON CONFLICT (scenario_id) DO UPDATE SET
                content_hash = EXCLUDED.content_hash,
                embedding = EXCLUDED.embedding,
                embedding_model = EXCLUDED.embedding_model,
                updated_at = NOW()`,
            parametros
        );
        console.log(`Embeddings sincronizados: ${Math.min(inicio + lote.length, pendentes.length)}/${pendentes.length}.`);
    }

    return { total: resultado.rowCount, pendentes: pendentes.length };
}

async function main() {
    if (!process.env.DATABASE_URL || !process.env.GEMINI_API_KEY) {
        throw new Error('Configure DATABASE_URL e GEMINI_API_KEY antes de sincronizar embeddings.');
    }

    const url = new URL(process.env.DATABASE_URL);
    if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
        throw new TypeError('DATABASE_URL precisa usar o protocolo PostgreSQL.');
    }
    ['ssl', 'sslmode', 'sslcert', 'sslkey', 'sslrootcert'].forEach((parametro) => {
        url.searchParams.delete(parametro);
    });
    const pool = new Pool({
        connectionString: url.toString(),
        max: 1,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 10000,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const resultado = await sincronizarCatalogo(pool, process.env.GEMINI_API_KEY);
        console.log(`Catálogo verificado: ${resultado.total}; novos ou atualizados: ${resultado.pendentes}.`);
    } finally {
        await pool.end();
    }
}

export { criarTextoDocumento, gerarEmbeddings };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main().catch((erro) => {
        console.error('Falha ao sincronizar embeddings do catálogo:', erro);
        process.exitCode = 1;
    });
}
