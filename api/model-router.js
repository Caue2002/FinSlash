// Roteador de modelos Gemini: fila de prioridade, teto de tokens por dia e
// fallback transparente entre modelos. A contagem persistida fica em
// gemini_model_usage (Postgres); sem banco, usa contadores em memoria da
// instancia — sempre em modo best-effort para nunca bloquear a resposta.

const MODELOS_GEMINI_PADRAO = [
    'gemini-3.8-flash',
    'gemini-3.6-flash',
    'gemini-3-flash-preview',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite'
];

const LIMITE_TOKENS_PADRAO_MODELO = 1000000;
const STATUS_RETRY_AVEL_GEMINI = new Set([408, 429, 500, 502, 503, 504]);

let tabelaUsoVerificada = false;
let persistenciaIndisponivel = false;
const consumoMemoria = new Map();

function obterLimiteTokensModelo() {
    const limiteConfigurado = Number(process.env.GEMINI_MODEL_TOKEN_LIMIT);
    return Number.isFinite(limiteConfigurado) && limiteConfigurado > 0
        ? Math.floor(limiteConfigurado)
        : LIMITE_TOKENS_PADRAO_MODELO;
}

// A fila vem de GEMINI_MODELS (CSV, do mais capaz ao mais leve). GEMINI_MODEL
// continua valendo como fila de um unico modelo para compatibilidade.
function obterFilaModelosGemini() {
    const configurados = (process.env.GEMINI_MODELS || '')
        .split(',')
        .map((modelo) => modelo.trim())
        .filter(Boolean);
    if (configurados.length) {
        return [...new Set(configurados)];
    }
    const unico = process.env.GEMINI_MODEL?.trim();
    if (unico) {
        return [unico];
    }
    return [...MODELOS_GEMINI_PADRAO];
}

function dataUtcAtual() {
    return new Date().toISOString().slice(0, 10);
}

function chaveMemoria(modelo) {
    return `${modelo}|${dataUtcAtual()}`;
}

function consumoMemoriaModelo(modelo) {
    return consumoMemoria.get(chaveMemoria(modelo)) || 0;
}

// Cria a tabela de uso sob demanda (uma vez por instancia) para nao exigir
// migration manual. Se o banco nao permitir DDL, segue em modo memoria.
async function garantirTabelaUso(banco) {
    if (tabelaUsoVerificada || persistenciaIndisponivel) {
        return;
    }
    tabelaUsoVerificada = true;
    try {
        await banco.query(
            `CREATE TABLE IF NOT EXISTS gemini_model_usage (
                model TEXT NOT NULL,
                usage_date DATE NOT NULL,
                input_tokens BIGINT NOT NULL DEFAULT 0,
                output_tokens BIGINT NOT NULL DEFAULT 0,
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                PRIMARY KEY (model, usage_date)
            )`
        );
    } catch (error) {
        persistenciaIndisponivel = true;
        console.warn('Contagem de tokens Gemini sem persistencia: usando memoria da instancia.', error?.message || error);
    }
}

// Retorna um Map modelo -> tokens consumidos no dia UTC corrente.
// null indica que a persistencia esta indisponivel e o chamador deve usar memoria.
async function obterConsumoDiario(banco) {
    if (!banco || persistenciaIndisponivel) {
        return null;
    }
    try {
        await garantirTabelaUso(banco);
        if (persistenciaIndisponivel) {
            return null;
        }
        const resultado = await banco.query(
            `SELECT model,
                    COALESCE(input_tokens, 0) + COALESCE(output_tokens, 0) AS total
             FROM gemini_model_usage
             WHERE usage_date = $1::date`,
            [dataUtcAtual()]
        );
        return new Map(resultado.rows.map((linha) => [linha.model, Number(linha.total) || 0]));
    } catch (error) {
        persistenciaIndisponivel = true;
        console.warn('Leitura do consumo Gemini falhou; usando memoria da instancia.', error?.message || error);
        return null;
    }
}

// Persiste o consumo de um modelo apos uma chamada bem-sucedida. Best-effort:
// nunca deve derrubar nem atrasar a resposta alem de uma query simples.
async function registrarConsumoModelo(banco, modelo, usage) {
    const inputTokens = Number.isFinite(usage?.promptTokenCount)
        ? Math.max(0, Math.floor(usage.promptTokenCount))
        : 0;
    const outputTokens = (Number.isFinite(usage?.candidatesTokenCount)
            ? Math.max(0, Math.floor(usage.candidatesTokenCount))
            : 0)
        + (Number.isFinite(usage?.thoughtsTokenCount)
            ? Math.max(0, Math.floor(usage.thoughtsTokenCount))
            : 0);
    if (!inputTokens && !outputTokens) {
        return;
    }
    if (!banco || persistenciaIndisponivel) {
        consumoMemoria.set(chaveMemoria(modelo), consumoMemoriaModelo(modelo) + inputTokens + outputTokens);
        return;
    }
    try {
        await garantirTabelaUso(banco);
        if (persistenciaIndisponivel) {
            consumoMemoria.set(chaveMemoria(modelo), consumoMemoriaModelo(modelo) + inputTokens + outputTokens);
            return;
        }
        await banco.query(
            `INSERT INTO gemini_model_usage (model, usage_date, input_tokens, output_tokens, updated_at)
             VALUES ($1, $2::date, $3, $4, NOW())
             ON CONFLICT (model, usage_date) DO UPDATE SET
                input_tokens = gemini_model_usage.input_tokens + EXCLUDED.input_tokens,
                output_tokens = gemini_model_usage.output_tokens + EXCLUDED.output_tokens,
                updated_at = NOW()`,
            [modelo, dataUtcAtual(), inputTokens, outputTokens]
        );
    } catch (error) {
        persistenciaIndisponivel = true;
        consumoMemoria.set(chaveMemoria(modelo), consumoMemoriaModelo(modelo) + inputTokens + outputTokens);
        console.warn('Registro do consumo Gemini falhou; usando memoria da instancia.', error?.message || error);
    }
}

function erroRetryavelGemini(erro) {
    if (erro?.name === 'AbortError' || erro?.name === 'TimeoutError') {
        return true;
    }
    if (erro instanceof TypeError) {
        return true;
    }
    return Number.isInteger(erro?.status) && STATUS_RETRY_AVEL_GEMINI.has(erro.status);
}

// Percorre a fila do modelo mais capaz ao mais leve. `executar(modelo)` deve
// retornar { resultado, usage } ou lancar erro; qualquer falha retryavel (ou
// qualquer falha de geracao, como resposta vazia/JSON invalido) passa para o
// proximo modelo. Retorna o resultado do primeiro modelo saudavel.
async function chamarGeminiComFallback({ banco = null, executar }) {
    const fila = obterFilaModelosGemini();
    const limite = obterLimiteTokensModelo();
    const consumoPersistido = await obterConsumoDiario(banco);
    const consumo = consumoPersistido || new Map(
        fila.map((modelo) => [modelo, consumoMemoriaModelo(modelo)])
    );
    let ultimoErro = null;
    for (const modelo of fila) {
        const consumido = consumo.get(modelo) || 0;
        if (consumido >= limite) {
            console.warn(`Modelo Gemini ${modelo} esgotado no ciclo atual (${consumido}/${limite} tokens).`);
            continue;
        }
        try {
            const { resultado, usage } = await executar(modelo);
            await registrarConsumoModelo(banco, modelo, usage);
            return resultado;
        } catch (erro) {
            ultimoErro = erro;
            if (!erroRetryavelGemini(erro)) {
                continue;
            }
            console.warn(`Modelo Gemini ${modelo} indisponivel; tentando o proximo da fila.`, erro?.message || erro);
        }
    }
    throw ultimoErro || new Error('Nenhum modelo Gemini disponivel na fila.');
}

export {
    chamarGeminiComFallback,
    obterFilaModelosGemini,
    obterLimiteTokensModelo,
    registrarConsumoModelo
};
