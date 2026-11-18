import { createHmac, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import pg from 'pg';

let pool;
const { Pool } = pg;

const LIMITE_BYTES_FEEDBACK = 4096;
const LIMITE_CARACTERES_FEEDBACK = 1000;
const LIMITE_BYTES_ADVISOR = 4096;
const LIMITE_CARACTERES_ADVISOR = 300;
const LIMITE_ENVIOS_POR_HORA = 5;
const CATEGORIAS_FEEDBACK = new Set(['suggestion', 'issue', 'content']);
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'openai/gpt-oss-20b';

const SINONIMOS_ADVISOR = {
    ec2: ['ec2', 'servidor', 'servidores', 'maquina', 'maquinas', 'instancia', 'instancias', 'compute', 'direito ao tamanho', 'dimensionamento', 'ocioso', 'ociosa', 'subutilizado', 'subutilizada', 'savings plan'],
    s3: ['s3', 'bucket', 'buckets', 'objeto', 'objetos', 'armazenamento', 'lifecycle', 'ciclo de vida', 'glacier', 'multipart', 'transferencia', 'transferir'],
    rds: ['rds', 'aurora', 'banco relacional', 'banco de dados', 'bancos de dados', 'base relacional', 'database', 'db', 'mysql', 'postgresql', 'sql'],
    lambda: ['lambda', 'funcao serverless', 'funcoes serverless', 'memoria', 'ram', 'invocacao', 'invocoes'],
    cloudwatch: ['cloudwatch', 'monitoramento', 'metrica', 'metricas', 'alarme', 'alarmes', 'logs', 'observabilidade'],
    iam: ['iam', 'permissao', 'permissoes', 'usuarios', 'politicas', 'acesso', 'roles', 'identidade'],
    cloudfront: ['cloudfront', 'cdn', 'cache', 'distribuicao', 'edge', 'conteudo estatico'],
    ebs: ['ebs', 'disco', 'discos', 'volume', 'volumes', 'snapshot', 'snapshots', 'anexo', 'desanexado'],
    eks: ['eks', 'kubernetes', 'cluster', 'nos', 'pods', 'node'],
    ecs: ['ecs', 'container', 'containers', 'fargate', 'tarefa', 'tarefas'],
    dynamodb: ['dynamodb', 'nosql', 'tabela', 'tabelas', 'throughput', 'throttling', 'sob demanda'],
    natgateway: ['nat gateway', 'gateway nat', 'saida para internet', 'trafego externo'],
    budgets: ['budget', 'budgets', 'orcamento', 'orcamentos', 'limite de custo', 'alerta de custo'],
    costexplorer: ['cost explorer', 'explorador de custos', 'curva de custo', 'gastos mensais', 'fatura'],
    finops: ['custo', 'custos', 'gasto', 'gastos', 'cobranca', 'economizar', 'economia', 'reduzir', 'otimizar', 'desperdicio', 'despesas']
};

const SERVICOS_ADVISOR = {
    ec2: 'Amazon EC2',
    s3: 'Amazon S3',
    rds: 'Amazon RDS',
    lambda: 'AWS Lambda',
    cloudwatch: 'Amazon CloudWatch',
    iam: 'AWS IAM',
    cloudfront: 'Amazon CloudFront',
    ebs: 'Amazon EBS',
    eks: 'Amazon EKS',
    ecs: 'Amazon ECS',
    dynamodb: 'Amazon DynamoDB',
    natgateway: 'NAT Gateway'
};

// Força TLS validado e evita que opções TLS da URL substituam a configuração do pool.
function obterPoolBanco() {
    if (!pool) {
        const url = new URL(process.env.DATABASE_URL);
        if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
            throw new TypeError('DATABASE_URL precisa usar o protocolo PostgreSQL.');
        }
        ['ssl', 'sslmode', 'sslcert', 'sslkey', 'sslrootcert'].forEach((parametro) => {
            url.searchParams.delete(parametro);
        });
        pool = new Pool({
            connectionString: url.toString(),
            max: 2,
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 10000,
            query_timeout: 7000,
            statement_timeout: 5000,
            ssl: { rejectUnauthorized: false }
        });
    }
    return pool;
}

function responder(status, corpo, cabecalhos = {}) {
    return Response.json(corpo, {
        status,
        headers: {
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
            ...cabecalhos
        }
    });
}

function obterOrigemPermitida() {
    const origem = process.env.ALLOWED_ORIGIN;
    if (!origem) {
        return null;
    }

    try {
        const url = new URL(origem);
        const ambienteLocal = process.env.NODE_ENV !== 'production' && url.hostname === 'localhost';
        if ((url.protocol !== 'https:' && !ambienteLocal) || url.origin !== origem) {
            console.error('ALLOWED_ORIGIN precisa ser uma origem HTTPS exata.');
            return null;
        }
        return url.origin;
    } catch (error) {
        console.error('ALLOWED_ORIGIN precisa ser uma origem HTTPS válida.');
        return null;
    }
}

function cabecalhosCors(request, origemPermitida, metodos) {
    const cabecalhos = { Vary: 'Origin' };
    if (origemPermitida && request.headers.get('origin') === origemPermitida) {
        cabecalhos['Access-Control-Allow-Origin'] = origemPermitida;
        cabecalhos['Access-Control-Allow-Methods'] = metodos;
        cabecalhos['Access-Control-Allow-Headers'] = 'Accept, Content-Type';
        cabecalhos['Access-Control-Max-Age'] = '600';
    }
    return cabecalhos;
}

function normalizarTextoAdvisor(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim();
}

async function lerJsonAdvisor(request) {
    const contentLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > LIMITE_BYTES_ADVISOR) {
        throw new RangeError('A pergunta excede o tamanho permitido.');
    }
    if (!request.body) {
        throw new TypeError('O corpo precisa ser um objeto JSON.');
    }

    let textoBruto;
    try {
        textoBruto = await request.text();
    } catch (error) {
        throw new TypeError('O corpo precisa conter JSON válido.');
    }
    if (new TextEncoder().encode(textoBruto).byteLength > LIMITE_BYTES_ADVISOR) {
        throw new RangeError('A pergunta excede o tamanho permitido.');
    }

    let json;
    try {
        json = JSON.parse(textoBruto);
    } catch (error) {
        throw new TypeError('O corpo precisa conter JSON válido.');
    }
    if (!json || typeof json !== 'object' || Array.isArray(json)) {
        throw new TypeError('O corpo precisa ser um objeto JSON.');
    }
    if (Object.keys(json).some((chave) => chave !== 'pergunta')) {
        throw new TypeError('O corpo contém campos não permitidos.');
    }
    if (typeof json.pergunta !== 'string') {
        throw new TypeError('Informe a pergunta como texto.');
    }

    const pergunta = json.pergunta.normalize('NFC').replace(/\r\n?/gu, ' ').replace(/\s+/gu, ' ').trim();
    const quantidadeCaracteres = Array.from(pergunta).length;
    if (!pergunta) {
        throw new TypeError('Digite uma pergunta.');
    }
    if (quantidadeCaracteres > LIMITE_CARACTERES_ADVISOR) {
        throw new RangeError('A pergunta deve ter no máximo 300 caracteres.');
    }
    if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(pergunta)) {
        throw new TypeError('A pergunta contém caracteres inválidos.');
    }
    return pergunta;
}

async function consultarAdvisor(pergunta) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL não configurada');
    }

    const normalizada = normalizarTextoAdvisor(pergunta);
    const palavras = normalizada.split(' ').filter((palavra) => palavra.length >= 3);
    const termos = new Set(palavras);
    Object.entries(SINONIMOS_ADVISOR).forEach(([servico, sinonimos]) => {
        if (sinonimos.some((sinonimo) => normalizada.includes(normalizarTextoAdvisor(sinonimo)))) {
            termos.add(servico);
            sinonimos.forEach((sinonimo) => termos.add(normalizarTextoAdvisor(sinonimo)));
        }
    });

    const termosBusca = [...termos].slice(0, 10);
    const condicoes = [];
    const parametros = [];
    termosBusca.forEach((termo) => {
        parametros.push(`%${termo}%`);
        const indice = parametros.length;
        condicoes.push(`(
            service.name ILIKE $${indice}
            OR scenario.title ILIKE $${indice}
            OR scenario.summary ILIKE $${indice}
            OR scenario.slug ILIKE $${indice}
            OR EXISTS (
                SELECT 1 FROM scenario_steps AS step
                WHERE step.scenario_id = scenario.id
                  AND (step.title ILIKE $${indice} OR step.content ILIKE $${indice})
            )
        )`);
    });

    if (!condicoes.length) {
        condicoes.push('FALSE');
    }

    const resultado = await obterPoolBanco().query(
        `SELECT
            scenario.id,
            service.slug AS "serviceSlug",
            service.name AS "serviceName",
            scenario.slug,
            scenario.title,
            scenario.summary,
            COALESCE((
                SELECT json_agg(json_build_object(
                    'type', step.step_type,
                    'title', step.title,
                    'content', step.content
                ) ORDER BY
                    CASE step.step_type
                        WHEN 'check' THEN 1
                        WHEN 'action' THEN 2
                        ELSE 3
                    END,
                    step.position)
                FROM scenario_steps AS step
                WHERE step.scenario_id = scenario.id
            ), '[]'::json) AS steps,
            COALESCE((
                SELECT json_agg(json_build_object(
                    'title', reference.title,
                    'url', reference.url
                ) ORDER BY reference.title)
                FROM scenario_sources AS reference
                WHERE reference.scenario_id = scenario.id
            ), '[]'::json) AS sources
        FROM cost_scenarios AS scenario
        JOIN aws_services AS service ON service.id = scenario.service_id
        WHERE scenario.is_published = TRUE
          AND (${condicoes.join(' OR ')})
        LIMIT 30`,
        parametros
    );

    const resultadosPontuados = [];
    resultado.rows.forEach((linha) => {
        const textoLinha = normalizarTextoAdvisor([
            linha.serviceName,
            linha.title,
            linha.summary,
            linha.slug,
            ...(linha.steps || []).flatMap((step) => [step.title, step.content])
        ].join(' '));
        let pontuacao = 0;
        const tituloNormalizado = normalizarTextoAdvisor(linha.title);
        const consultaS3 = /\bs3\b/u.test(normalizada);
        if (normalizada.includes('aws budgets')
            && textoLinha.includes('aws budgets')) {
            pontuacao += 30;
        }
        if (normalizada.includes('aws budgets')) {
            if (/ausencia de alertas no aws budgets|falta de alertas.*aws budgets|alarmes cloudwatch no aws budgets/u.test(tituloNormalizado)) {
                pontuacao += 100;
            }
            if (/custo acumulado diario do cloudwatch/u.test(tituloNormalizado)) {
                pontuacao -= 100;
            }
        }
        if (normalizada.includes('cost explorer')
            && textoLinha.includes('cost explorer')) {
            pontuacao += 30;
        }
        const consultaEconomica = ['economizar', 'reduzir custos', 'gastos', 'custos', 'custo'].some((termo) =>
            normalizada.includes(termo)
        );
        if (consultaEconomica
            && consultaS3
            && /(intelligent tiering|manutencao de todos os arquivos|transicao|glacier|ciclo de vida|lifecycle|expiracao)/u.test(normalizarTextoAdvisor(linha.title))) {
            pontuacao += 100;
        }
        if (consultaEconomica
            && consultaS3
            && /versionamento ativado|replica.*cross region|download direto/u.test(normalizarTextoAdvisor(linha.title))) {
            pontuacao -= 100;
        }
        if (consultaEconomica
            && /(custo|economia|orcamento|budget|lifecycle|ciclo de vida|transferencia|armazenamento)/u.test(textoLinha)) {
            pontuacao += 12;
        }
        Object.entries(SERVICOS_ADVISOR).forEach(([chave, nomeServico]) => {
            const sinonimos = SINONIMOS_ADVISOR[chave] || [];
            const reconhecido = sinonimos.some((sinonimo) =>
                normalizada.includes(normalizarTextoAdvisor(sinonimo))
            );
            if (reconhecido
                && normalizarTextoAdvisor(linha.serviceName) === normalizarTextoAdvisor(nomeServico)) {
                pontuacao += 20;
            }
        });
        palavras.forEach((palavra) => {
            if (palavra.length >= 4) {
                if (textoLinha.includes(palavra)) {
                    pontuacao += 4;
                }
            }
        });
        if (textoLinha.includes(normalizada) && normalizada.length >= 8) {
            pontuacao += 12;
        }
        if (linha.title && normalizada.includes(normalizarTextoAdvisor(linha.title))) {
            pontuacao += 15;
        }
        if (pontuacao > 0) {
            resultadosPontuados.push({ linha, pontuacao });
        }
    });
    resultadosPontuados.sort((primeiro, segundo) =>
        segundo.pontuacao - primeiro.pontuacao
        || segundo.linha.title.localeCompare(primeiro.linha.title)
    );

    const melhoresResultados = resultadosPontuados
        .filter((resultadoPontuado, indice, lista) =>
            resultadoPontuado.pontuacao >= 8
            && indice < 5
            && lista.findIndex((item) => item.linha.id === resultadoPontuado.linha.id) === indice
        )
        .slice(0, 3);
    const melhorResultado = melhoresResultados[0];
    const melhor = melhorResultado?.linha || null;
    const melhorPontuacao = melhorResultado?.pontuacao || 0;

    if (!melhor || melhorPontuacao < 8) {
        return {
            encontrado: false,
            diagnostico: 'Não encontramos um diagnóstico específico.',
            verificacao: 'Revise o cenário no Cost Explorer e verifique utilização e dependências.',
            acao: 'Configure AWS Budgets e avalie recursos subutilizados antes de alterar.',
            cuidados: 'Não desligue recursos sem confirmar dependências e impacto.',
            documentacao: 'https://aws.amazon.com/aws-cost-management/',
            servico: null,
            topico: null,
            fonte: 'orientacao_padrao',
            confianca: 0,
            resultados: [],
            sugestoes: [
                'Como controlar gastos mensais na AWS',
                'Como configurar AWS Budgets',
                'Como encontrar recursos sem uso'
            ]
        };
    }

    const formatarResultado = (item) => {
        const porTipo = (tipo) => (item.linha.steps || []).find((step) => step.type === tipo);
        const verificacao = porTipo('check');
        const acao = porTipo('action');
        const cuidados = porTipo('caution');
        const fonte = (item.linha.sources || []).find((source) =>
            typeof source.url === 'string'
            && (source.url.startsWith('https://docs.aws.amazon.com/')
                || source.url.startsWith('https://aws.amazon.com/'))
        );
        const confianca = Math.min(
            0.95,
            Number((0.55 + item.pontuacao / 100).toFixed(2))
        );
        return {
            encontrado: true,
            diagnostico: item.linha.title,
            verificacao: verificacao?.content || item.linha.summary,
            acao: acao?.content || 'Revise o cenário com dados reais antes de realizar alterações.',
            cuidados: cuidados?.content || 'Confirme dependências e impacto antes da alteração.',
            documentacao: fonte?.url || 'https://docs.aws.amazon.com/',
            servico: item.linha.serviceName,
            topico: item.linha.title,
            fonte: 'banco',
            confianca
        };
    };

    const resultados = melhoresResultados.map(formatarResultado);
    const melhorFormatado = resultados[0];
    const sugestoes = [...new Set(resultados.map((resultado) =>
        `Como revisar ${resultado.servico}`
    ))].filter(Boolean).slice(0, 3);
    return {
        ...melhorFormatado,
        resultados,
        sugestoes
    };
}

async function listarServicosPublicados() {
    const resultado = await obterPoolBanco().query(
        `SELECT DISTINCT service.name
         FROM aws_services AS service
         JOIN cost_scenarios AS scenario ON scenario.service_id = service.id
         WHERE scenario.is_published = TRUE
         ORDER BY service.name
         LIMIT 100`
    );
    return resultado.rows.map((linha) => linha.name);
}

async function consultarFinbotComGroq(pergunta) {
    const chave = process.env.GROQ_API_KEY;
    if (!chave) {
        return null;
    }

    const ferramentas = [
        {
            type: 'function',
            function: {
                name: 'search_diagnostics',
                description: 'Busca diagnósticos AWS publicados no FinSlash por serviço, problema, título ou ação.',
                parameters: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description: 'Termos curtos da dúvida ou problema AWS.'
                        }
                    },
                    required: ['query'],
                    additionalProperties: false
                }
            }
        },
        {
            type: 'function',
            function: {
                name: 'list_services',
                description: 'Lista os nomes dos serviços AWS que possuem dados publicados no FinSlash.',
                parameters: {
                    type: 'object',
                    properties: {},
                    additionalProperties: false
                }
            }
        }
    ];

    const mensagens = [
        {
            role: 'system',
            content: `Você é o Finbot, um agente especializado em custos e diagnósticos AWS.
Use as ferramentas antes de responder. Não invente dados, procedimentos ou links.
Use somente diagnósticos retornados pela ferramenta search_diagnostics.
Quando não houver diagnóstico confiável, retorne encontrado=false e orientação geral.
Responda exclusivamente com um objeto JSON contendo:
encontrado (boolean), diagnostico (string), verificacao (string), acao (string),
cuidados (string), documentacao (URL HTTPS AWS segura), servico (string ou null),
topico (string ou null), confianca (numero entre 0 e 1), sugestoes (array de strings).`
        },
        { role: 'user', content: pergunta }
    ];

    for (let tentativa = 0; tentativa < 3; tentativa++) {
        const modelos = [
            process.env.GROQ_MODEL,
            'openai/gpt-oss-20b',
            'llama-3.1-8b-instant',
            'llama-3.3-70b-versatile'
        ].filter((modelo, indice, lista) =>
            modelo && lista.indexOf(modelo) === indice
        );

        let resposta;
        for (const modelo of modelos) {
            resposta = await fetch(GROQ_API_URL, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${chave}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: modelo,
                    messages: mensagens,
                    tools: ferramentas,
                    tool_choice: 'auto',
                    temperature: 0.1,
                    max_tokens: 700,
                    response_format: { type: 'json_object' }
                }),
                signal: AbortSignal.timeout(10000)
            });
            if (resposta.ok) {
                modeloUsado = modelo;
                break;
            }
        }

        if (!resposta?.ok) {
            throw new Error(`Groq respondeu com o status ${resposta?.status || 'desconhecido'}.`);
        }

        const payload = await resposta.json();
        const mensagem = payload.choices?.[0]?.message;
        if (!mensagem) {
            throw new Error('Groq devolveu uma resposta vazia.');
        }

        const chamadas = Array.isArray(mensagem.tool_calls) ? mensagem.tool_calls : [];
        if (!chamadas.length) {
            const texto = typeof mensagem.content === 'string' ? mensagem.content : '';
            try {
                return JSON.parse(texto);
            } catch {
                throw new Error('Groq devolveu JSON inválido.');
            }
        }

        mensagens.push(mensagem);
        for (const chamada of chamadas) {
            let resultadoFerramenta;
            if (chamada.function?.name === 'search_diagnostics') {
                let argumentos = {};
                try {
                    argumentos = JSON.parse(chamada.function.arguments || '{}');
                } catch {
                    argumentos = {};
                }
                const consulta = typeof argumentos.query === 'string'
                    ? argumentos.query
                    : '';
                resultadoFerramenta = consulta
                    ? await consultarAdvisor(consulta)
                    : await consultarAdvisor(pergunta);
            } else if (chamada.function?.name === 'list_services') {
                resultadoFerramenta = { services: await listarServicosPublicados() };
            } else {
                resultadoFerramenta = { error: 'Ferramenta não disponível.' };
            }
            mensagens.push({
                role: 'tool',
                tool_call_id: chamada.id,
                content: JSON.stringify(resultadoFerramenta)
            });
        }
    }

    throw new Error('O agente excedeu o limite de chamadas de ferramentas.');
}

function obterRota(url) {
    const rotasReescritas = url.searchParams.getAll('route');
    if (rotasReescritas.length !== 1) {
        return null;
    }
    return rotasReescritas[0];
}

async function obterDiagnostico(serviceSlug, scenarioSlug) {
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL não foi configurada para a API de diagnósticos.');
        return responder(500, { error: 'Não foi possível carregar o diagnóstico agora.' });
    }

    try {
        const resultado = await obterPoolBanco().query(
            `SELECT
                scenario.id,
                service.slug AS "serviceSlug",
                service.name AS "serviceName",
                scenario.slug,
                scenario.title,
                scenario.summary,
                COALESCE((
                    SELECT json_agg(json_build_object(
                        'type', step.step_type,
                        'title', step.title,
                        'content', step.content
                    ) ORDER BY
                        CASE step.step_type
                            WHEN 'check' THEN 1
                            WHEN 'action' THEN 2
                            ELSE 3
                        END,
                        step.position)
                    FROM scenario_steps AS step
                    WHERE step.scenario_id = scenario.id
                ), '[]'::json) AS steps,
                COALESCE((
                    SELECT json_agg(json_build_object(
                        'title', reference.title,
                        'url', reference.url,
                        'reviewedAt', reference.reviewed_at
                    ) ORDER BY reference.title)
                    FROM scenario_sources AS reference
                    WHERE reference.scenario_id = scenario.id
                ), '[]'::json) AS sources
            FROM cost_scenarios AS scenario
            JOIN aws_services AS service ON service.id = scenario.service_id
            WHERE service.slug = $1
                AND scenario.slug = $2
                AND scenario.is_published = TRUE`,
            [serviceSlug, scenarioSlug]
        );

        if (resultado.rowCount === 0) {
            return responder(404, { error: 'Este diagnóstico ainda não está disponível.' });
        }

        return Response.json(resultado.rows[0], {
            headers: {
                'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
                'X-Content-Type-Options': 'nosniff'
            }
        });
    } catch (error) {
        console.error('Falha ao consultar diagnóstico no PostgreSQL:', error);
        return responder(500, { error: 'Não foi possível carregar o diagnóstico agora.' });
    }
}

async function lerJsonLimitado(request) {
    const contentLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(contentLength) && contentLength > LIMITE_BYTES_FEEDBACK) {
        throw new RangeError('O envio excede o tamanho permitido.');
    }

    if (!request.body) {
        throw new TypeError('O corpo precisa ser um objeto JSON.');
    }

    const leitor = request.body.getReader();
    const partes = [];
    let tamanho = 0;
    try {
        while (true) {
            const { done, value } = await leitor.read();
            if (done) {
                break;
            }
            tamanho += value.byteLength;
            if (tamanho > LIMITE_BYTES_FEEDBACK) {
                await leitor.cancel();
                throw new RangeError('O envio excede o tamanho permitido.');
            }
            partes.push(value);
        }
    } finally {
        leitor.releaseLock();
    }

    const bytes = new Uint8Array(tamanho);
    let offset = 0;
    partes.forEach((parte) => {
        bytes.set(parte, offset);
        offset += parte.byteLength;
    });

    let json;
    try {
        json = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch (error) {
        throw new TypeError('O corpo precisa conter JSON UTF-8 válido.');
    }

    if (!json || typeof json !== 'object' || Array.isArray(json)) {
        throw new TypeError('O corpo precisa ser um objeto JSON.');
    }
    if (Object.keys(json).some((chave) => !['category', 'message'].includes(chave))) {
        throw new TypeError('O corpo contém campos não permitidos.');
    }
    if (!CATEGORIAS_FEEDBACK.has(json.category) || typeof json.message !== 'string') {
        throw new TypeError('Categoria ou mensagem inválida.');
    }

    const message = json.message.normalize('NFC').replace(/\r\n?/gu, '\n').trim();
    const quantidadeCaracteres = Array.from(message).length;
    if (
        quantidadeCaracteres < 10
        || quantidadeCaracteres > LIMITE_CARACTERES_FEEDBACK
        || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(message)
    ) {
        throw new TypeError('A mensagem deve ter de 10 a 1000 caracteres e não conter controles inválidos.');
    }

    return { category: json.category, message };
}

function obterHashOrigem(request, segredo, inicioJanela) {
    const enderecoEncaminhado = request.headers.get('x-forwarded-for');
    const endereco = enderecoEncaminhado ? enderecoEncaminhado.trim() : '';
    if (!endereco || !isIP(endereco)) {
        return null;
    }

    return createHmac('sha256', segredo)
        .update(`${inicioJanela.toISOString()}:${endereco}`)
        .digest('hex');
}

async function limparLimitesExpirados(request) {
    const segredo = process.env.CRON_SECRET;
    const autorizacaoRecebida = request.headers.get('authorization') || '';
    const autorizacaoEsperada = segredo ? `Bearer ${segredo}` : '';
    const recebido = Buffer.from(autorizacaoRecebida);
    const esperado = Buffer.from(autorizacaoEsperada);
    const autorizado = segredo
        && segredo.length >= 32
        && recebido.length === esperado.length
        && timingSafeEqual(recebido, esperado);

    if (!autorizado) {
        return responder(401, { error: 'Não autorizado.' });
    }
    if (request.method !== 'GET') {
        return responder(405, { error: 'Método não permitido.' }, { Allow: 'GET' });
    }
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL não foi configurada para limpar limites expirados.');
        return responder(500, { error: 'Não foi possível concluir a limpeza.' });
    }

    try {
        const resultado = await obterPoolBanco().query(
            'DELETE FROM feedback_rate_limits WHERE expires_at <= NOW()'
        );
        return responder(200, { removed: resultado.rowCount });
    } catch (error) {
        console.error('Falha ao remover limites de feedback expirados:', error);
        return responder(500, { error: 'Não foi possível concluir a limpeza.' });
    }
}

async function receberAdvisor(request, origemPermitida) {
    const cabecalhos = cabecalhosCors(request, origemPermitida, 'POST, OPTIONS');
    if (!origemPermitida || request.headers.get('origin') !== origemPermitida) {
        return responder(403, { error: 'Origem não permitida.' }, cabecalhos);
    }
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: cabecalhos });
    }
    if (request.method !== 'POST') {
        return responder(405, { error: 'Método não permitido.' }, {
            ...cabecalhos,
            Allow: 'POST, OPTIONS'
        });
    }
    if (!/^application\/json(?:\s*;|$)/iu.test(request.headers.get('content-type') || '')) {
        return responder(415, { error: 'Envie os dados no formato JSON.' }, cabecalhos);
    }

    let pergunta;
    try {
        pergunta = await lerJsonAdvisor(request);
    } catch (error) {
        const status = error instanceof RangeError ? 413 : 400;
        return responder(status, { error: error.message }, cabecalhos);
    }

    try {
        let resultado = await consultarAdvisor(pergunta);
        if (process.env.GROQ_API_KEY) {
            try {
                const resultadoAgente = await consultarFinbotComGroq(pergunta);
                if (resultadoAgente
                    && typeof resultadoAgente === 'object'
                    && typeof resultadoAgente.encontrado === 'boolean'
                    && typeof resultadoAgente.diagnostico === 'string') {
                    const resultadosLocais = Array.isArray(resultado.resultados)
                        ? resultado.resultados
                        : [];
                    let documentacao = resultadoAgente.documentacao;
                    try {
                        const url = new URL(documentacao);
                        const dominioPermitido = url.protocol === 'https:'
                            && (url.hostname === 'docs.aws.amazon.com'
                                || url.hostname === 'aws.amazon.com'
                                || url.hostname.endsWith('.amazonaws.com'));
                        if (!dominioPermitido) {
                            documentacao = 'https://docs.aws.amazon.com/';
                        }
                    } catch {
                        documentacao = 'https://docs.aws.amazon.com/';
                    }
                    resultado = {
                        ...resultadoAgente,
                        documentacao,
                        confianca: Number.isFinite(resultadoAgente.confianca)
                            ? Math.max(0, Math.min(1, resultadoAgente.confianca))
                            : resultado.confianca,
                        sugestoes: Array.isArray(resultadoAgente.sugestoes)
                            ? resultadoAgente.sugestoes.slice(0, 3)
                            : resultado.sugestoes,
                        resultados: resultadosLocais,
                        fonte: 'groq+banco'
                    };
                }
            } catch (erroAgente) {
                console.error('Falha no agente Groq; usando diagnóstico local:', erroAgente);
            }
        }
        return responder(200, resultado, cabecalhos);
    } catch (error) {
        console.error('Falha ao consultar o Finbot:', error);
        return responder(500, {
            error: 'Não foi possível consultar o Advisor agora.'
        }, cabecalhos);
    }
}

async function receberFeedback(request, origemPermitida) {
    const cabecalhos = cabecalhosCors(request, origemPermitida, 'POST, OPTIONS');
    if (!origemPermitida || request.headers.get('origin') !== origemPermitida) {
        return responder(403, { error: 'Origem não permitida.' }, cabecalhos);
    }
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: cabecalhos });
    }
    if (request.method !== 'POST') {
        return responder(405, { error: 'Método não permitido.' }, {
            ...cabecalhos,
            Allow: 'POST, OPTIONS'
        });
    }
    if (!/^application\/json(?:\s*;|$)/iu.test(request.headers.get('content-type') || '')) {
        return responder(415, { error: 'Envie os dados no formato JSON.' }, cabecalhos);
    }
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL não foi configurada para receber feedback.');
        return responder(500, { error: 'Não foi possível enviar o feedback agora.' }, cabecalhos);
    }

    const segredo = process.env.RATE_LIMIT_SECRET;
    if (!segredo || segredo.length < 32) {
        console.error('RATE_LIMIT_SECRET não está configurado corretamente.');
        return responder(500, { error: 'Não foi possível enviar o feedback agora.' }, cabecalhos);
    }

    let payload;
    try {
        payload = await lerJsonLimitado(request);
    } catch (error) {
        const status = error instanceof RangeError ? 413 : 400;
        return responder(status, { error: error.message }, cabecalhos);
    }

    const inicioJanela = new Date(Math.floor(Date.now() / 3600000) * 3600000);
    const addressHash = obterHashOrigem(request, segredo, inicioJanela);
    if (!addressHash) {
        return responder(503, {
            error: 'Não foi possível aplicar a proteção antispam. Tente novamente mais tarde.'
        }, cabecalhos);
    }

    let cliente;
    let transacaoAberta = false;
    try {
        cliente = await obterPoolBanco().connect();
        await cliente.query('BEGIN');
        transacaoAberta = true;
        await cliente.query('DELETE FROM feedback_rate_limits WHERE expires_at <= NOW()');

        const limite = await cliente.query(
            `INSERT INTO feedback_rate_limits (address_hash, window_start, request_count, expires_at)
             VALUES ($1, $2, 1, $2::timestamptz + INTERVAL '1 hour')
             ON CONFLICT (address_hash, window_start) DO UPDATE
             SET request_count = LEAST(feedback_rate_limits.request_count + 1, $3)
             RETURNING request_count`,
            [addressHash, inicioJanela, LIMITE_ENVIOS_POR_HORA + 1]
        );

        if (limite.rows[0].request_count > LIMITE_ENVIOS_POR_HORA) {
            await cliente.query('COMMIT');
            transacaoAberta = false;
            return responder(429, {
                error: 'Limite de envios atingido. Tente novamente mais tarde.'
            }, cabecalhos);
        }

        await cliente.query(
            'INSERT INTO feedback_entries (category, message) VALUES ($1, $2)',
            [payload.category, payload.message]
        );
        await cliente.query('COMMIT');
        transacaoAberta = false;
        return responder(201, {
            message: 'Feedback enviado. Obrigado por ajudar a melhorar o FinSlash!'
        }, cabecalhos);
    } catch (error) {
        if (transacaoAberta && cliente) {
            try {
                await cliente.query('ROLLBACK');
            } catch (erroRollback) {
                console.error('Falha ao desfazer a transação de feedback:', erroRollback);
            }
        }
        console.error('Falha ao armazenar feedback no PostgreSQL:', error);
        return responder(500, { error: 'Não foi possível enviar o feedback agora.' }, cabecalhos);
    } finally {
        if (cliente) {
            cliente.release();
        }
    }
}

// Mantém todos os endpoints em uma única função compatível com o Web Handler da Vercel.
export default {
    async fetch(request) {
        const url = new URL(request.url);
        const rota = obterRota(url);
        if (!rota) {
            return responder(404, { error: 'Rota não encontrada.' });
        }

        if (rota === '/api/internal/cleanup-rate-limits') {
            return limparLimitesExpirados(request);
        }

        const origemPermitida = obterOrigemPermitida();
        if (rota === '/api/v1/advisor') {
            return receberAdvisor(request, origemPermitida);
        }
        if (rota === '/api/v1/feedback') {
            return receberFeedback(request, origemPermitida);
        }

        const rotaDiagnostico = /^\/api\/v1\/services\/([a-z0-9]+(?:-[a-z0-9]+)*)\/scenarios\/([a-z0-9]+(?:-[a-z0-9]+)*)$/u.exec(rota);
        if (rotaDiagnostico) {
            const cabecalhos = cabecalhosCors(request, origemPermitida, 'GET, OPTIONS');
            if (request.method === 'OPTIONS') {
                return new Response(null, { status: 204, headers: cabecalhos });
            }
            if (request.method !== 'GET') {
                return responder(405, { error: 'Método não permitido.' }, {
                    ...cabecalhos,
                    Allow: 'GET, OPTIONS'
                });
            }
            const resposta = await obterDiagnostico(rotaDiagnostico[1], rotaDiagnostico[2]);
            if (resposta.status !== 200) {
                return new Response(resposta.body, {
                    status: resposta.status,
                    headers: { ...Object.fromEntries(resposta.headers), ...cabecalhos }
                });
            }
            return new Response(resposta.body, {
                status: resposta.status,
                headers: { ...Object.fromEntries(resposta.headers), ...cabecalhos }
            });
        }

        return responder(404, { error: 'Rota não encontrada.' });
    }
};
