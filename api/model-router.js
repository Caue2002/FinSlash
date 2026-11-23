// Roteador de modelos Gemini: fila de prioridade, cotas diarias por modelo e
// fallback transparente entre modelos. A contagem persistida fica em
// gemini_model_usage (Postgres); sem banco, usa contadores em memoria da
// instancia — sempre em modo best-effort para nunca bloquear a resposta.
//
// Sobre cotas: o Google nao publica numeros fixos de free tier — RPM, TPM e
// RPD variam por projeto e aparecem no AI Studio. A guarda principal aqui e
// RPD (requisicoes/dia), a dimensao documentada de cota diaria; limites por
// minuto sao cobertos pelo fallback em 429. GEMINI_MODEL_LIMITS permite
// ajustar o RPD de cada modelo com os valores reais do projeto.

const MODELOS_GEMINI_PADRAO = [
    'gemini-3.8-flash',
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3-flash-preview',
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite'
];

// Estimativas conservadoras de RPD free tier publicadas historicamente pela
// Google para a familia 2.x. Modelos 3.x e desconhecidos usam o padrao.
// Ajuste com GEMINI_MODEL_LIMITS usando os valores reais do AI Studio.
const LIMITE_REQUISICOES_PADRAO_MODELO = 500;
const LIMITE_REQUISICOES_POR_MODELO = {
    'gemini-2.5-pro': 100,
    'gemini-2.5-flash': 250,
    'gemini-2.5-flash-lite': 1000,
    'gemini-2.0-flash': 1500,
    'gemini-2.0-flash-lite': 1500
};

// Teto diario de tokens e opcional: tokens/dia nao e uma cota publicada pela
// Google. Sem GEMINI_MODEL_TOKEN_LIMIT, fica desligado (Infinity).
const LIMITE_TOKENS_PADRAO_MODELO = Number.POSITIVE_INFINITY;
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

// Limite de requisicoes/dia por modelo. GEMINI_MODEL_LIMITS aceita CSV no
// formato "modelo:limite,modelo:limite"; GEMINI_MODEL_REQUEST_LIMIT define um
// teto global para modelos nao listados; sem nada, usa o mapa padrao.
function obterLimiteRequisicoesModelo(modelo) {
    const configurados = new Map(
        (process.env.GEMINI_MODEL_LIMITS || '')
            .split(',')
            .map((par) => par.trim())
            .filter(Boolean)
            .map((par) => {
                const separador = par.lastIndexOf(':');
                if (separador <= 0) {
                    return null;
                }
                const nome = par.slice(0, separador).trim();
                const limite = Number(par.slice(separador + 1).trim());
                return nome && Number.isFinite(limite) && limite > 0
                    ? [nome, Math.floor(limite)]
                    : null;
            })
            .filter(Boolean)
    );
    if (configurados.has(modelo)) {
        return configurados.get(modelo);
    }
    const limiteGlobal = Number(process.env.GEMINI_MODEL_REQUEST_LIMIT);
    if (Number.isFinite(limiteGlobal) && limiteGlobal > 0) {
        return Math.floor(limiteGlobal);
    }
    return LIMITE_REQUISICOES_POR_MODELO[modelo] ?? LIMITE_REQUISICOES_PADRAO_MODELO;
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
    return consumoMemoria.get(chaveMemoria(modelo)) || { tokens: 0, requests: 0 };
}

function somarConsumoMemoria(modelo, tokens, requests) {
    const atual = consumoMemoriaModelo(modelo);
    consumoMemoria.set(chaveMemoria(modelo), {
        tokens: atual.tokens + tokens,
        requests: atual.requests + requests
    });
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
                requests BIGINT NOT NULL DEFAULT 0,
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                PRIMARY KEY (model, usage_date)
            )`
        );
        await banco.query(
            `ALTER TABLE gemini_model_usage
             ADD COLUMN IF NOT EXISTS requests BIGINT NOT NULL DEFAULT 0`
        );
    } catch (error) {
        persistenciaIndisponivel = true;
        console.warn('Contagem de tokens Gemini sem persistencia: usando memoria da instancia.', error?.message || error);
    }
}

// Retorna um Map modelo -> { tokens, requests } do dia UTC corrente.
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
                    COALESCE(input_tokens, 0) + COALESCE(output_tokens, 0) AS tokens,
                    COALESCE(requests, 0) AS requests
             FROM gemini_model_usage
             WHERE usage_date = $1::date`,
            [dataUtcAtual()]
        );
        return new Map(resultado.rows.map((linha) => [
            linha.model,
            {
                tokens: Number(linha.tokens) || 0,
                requests: Number(linha.requests) || 0
            }
        ]));
    } catch (error) {
        persistenciaIndisponivel = true;
        console.warn('Leitura do consumo Gemini falhou; usando memoria da instancia.', error?.message || error);
        return null;
    }
}

// Persiste o consumo de um modelo apos uma chamada bem-sucedida: uma
// requisicao e os tokens informados pelos metadados. Best-effort: nunca deve
// derrubar nem atrasar a resposta alem de uma query simples.
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
    if (!banco || persistenciaIndisponivel) {
        somarConsumoMemoria(modelo, inputTokens + outputTokens, 1);
        return;
    }
    try {
        await garantirTabelaUso(banco);
        if (persistenciaIndisponivel) {
            somarConsumoMemoria(modelo, inputTokens + outputTokens, 1);
            return;
        }
        await banco.query(
            `INSERT INTO gemini_model_usage
                (model, usage_date, input_tokens, output_tokens, requests, updated_at)
             VALUES ($1, $2::date, $3, $4, 1, NOW())
             ON CONFLICT (model, usage_date) DO UPDATE SET
                input_tokens = gemini_model_usage.input_tokens + EXCLUDED.input_tokens,
                output_tokens = gemini_model_usage.output_tokens + EXCLUDED.output_tokens,
                requests = gemini_model_usage.requests + 1,
                updated_at = NOW()`,
            [modelo, dataUtcAtual(), inputTokens, outputTokens]
        );
    } catch (error) {
        persistenciaIndisponivel = true;
        somarConsumoMemoria(modelo, inputTokens + outputTokens, 1);
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

// Percorre a fila do modelo mais capaz ao mais leve. `executar(modelo,
// timeoutMs)` deve retornar { resultado, usage } ou lancar erro; qualquer
// falha (ou geracao invalida) passa para o proximo modelo. Retorna o
// resultado do primeiro modelo saudavel.
//
// Orcamento total: o frontend desiste em ~20s, entao a fila inteira tem um
// teto de tempo (GEMINI_FILA_TIMEOUT_MS, padrao 16s). Sem isso, uma sequencia
// de modelos lentos/travados estourava o timeout do cliente antes da API
// conseguir responder — o usuario via "nao conseguiu responder" mesmo com
// modelos saudaveis mais atras na fila.
async function chamarGeminiComFallback({ banco = null, executar, orcamentoMs }) {
    const fila = obterFilaModelosGemini();
    const limiteTokens = obterLimiteTokensModelo();
    const inicio = Date.now();
    const orcamento = Number.isFinite(orcamentoMs) && orcamentoMs > 0
        ? orcamentoMs
        : 16000;
    // A leitura de consumo tambem consome o orcamento: banco lento nao pode
    // deixar a fila comear ja estourada
    const consumoPersistido = await obterConsumoDiario(banco);
    const consumo = consumoPersistido || new Map(
        fila.map((modelo) => [modelo, consumoMemoriaModelo(modelo)])
    );
    let ultimoErro = null;
    for (const modelo of fila) {
        const restante = orcamento - (Date.now() - inicio);
        // Menos de ~2s restantes nao da tempo nem de handshake: encerra a
        // fila e deixa o chamador usar o fallback local
        if (restante < 2000) {
            console.warn('Orçamento da fila Gemini esgotado; encerrando tentativas.');
            break;
        }
        const { tokens: consumidoTokens, requests: consumidoRequests } = consumo.get(modelo)
            || { tokens: 0, requests: 0 };
        const limiteRequests = obterLimiteRequisicoesModelo(modelo);
        if (consumidoRequests >= limiteRequests || consumidoTokens >= limiteTokens) {
            console.warn(
                `Modelo Gemini ${modelo} esgotado no ciclo atual `
                + `(${consumidoRequests}/${limiteRequests} requisicoes, ${consumidoTokens}/${limiteTokens} tokens).`
            );
            continue;
        }
        try {
            // Timeout por tentativa limitado ao orcamento restante: um modelo
            // pendurado nao pode consumir a fila inteira
            const timeoutTentativa = Math.min(12000, restante);
            const { resultado, usage } = await executar(modelo, timeoutTentativa);
            await registrarConsumoModelo(banco, modelo, usage);
            return resultado;
        } catch (erro) {
            ultimoErro = erro;
            // Erro fatal (ex.: chave de API invalida) atinge todos os modelos
            // igualmente: parar a fila na primeira ocorrencia
            if (erro?.fatal) {
                console.error('Erro fatal na fila Gemini; encerrando tentativas.', erro?.message || erro);
                break;
            }
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
    obterLimiteRequisicoesModelo,
    obterLimiteTokensModelo,
    registrarConsumoModelo
};
