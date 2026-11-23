import assert from 'node:assert/strict';
import test from 'node:test';
import {
    chamarGeminiComFallback,
    obterFilaModelosGemini,
    obterLimiteTokensModelo
} from './model-router.js';

const CHAVES_AMBIENTE = ['GEMINI_MODELS', 'GEMINI_MODEL', 'GEMINI_MODEL_TOKEN_LIMIT'];

function preservarAmbiente(context) {
    const anterior = Object.fromEntries(
        CHAVES_AMBIENTE.map((chave) => [chave, process.env[chave]])
    );
    context.after(() => {
        CHAVES_AMBIENTE.forEach((chave) => {
            if (anterior[chave] === undefined) {
                delete process.env[chave];
            } else {
                process.env[chave] = anterior[chave];
            }
        });
    });
}

test('resolve a fila de modelos por GEMINI_MODELS, GEMINI_MODEL ou padrao', (context) => {
    preservarAmbiente(context);

    delete process.env.GEMINI_MODELS;
    delete process.env.GEMINI_MODEL;
    const padrao = obterFilaModelosGemini();
    assert.ok(padrao.length >= 5);
    assert.equal(padrao[0], 'gemini-3.8-flash');
    assert.equal(new Set(padrao).size, padrao.length);

    process.env.GEMINI_MODEL = 'gemini-2.5-flash';
    assert.deepEqual(obterFilaModelosGemini(), ['gemini-2.5-flash']);

    process.env.GEMINI_MODELS = ' gemini-3.8-flash , gemini-2.5-flash , gemini-3.8-flash ';
    assert.deepEqual(obterFilaModelosGemini(), ['gemini-3.8-flash', 'gemini-2.5-flash']);

    delete process.env.GEMINI_MODELS;
    process.env.GEMINI_MODEL_TOKEN_LIMIT = '250000';
    assert.equal(obterLimiteTokensModelo(), 250000);
    process.env.GEMINI_MODEL_TOKEN_LIMIT = 'invalido';
    assert.equal(obterLimiteTokensModelo(), 1000000);
});

test('falls back to the next model on retryable errors and records usage', async (context) => {
    preservarAmbiente(context);
    process.env.GEMINI_MODELS = 'modelo-um,modelo-dois';

    const tentativas = [];
    const inserts = [];
    const banco = {
        async query(sql, values = []) {
            if (sql.includes('CREATE TABLE')) {
                return { rows: [] };
            }
            if (sql.includes('FROM gemini_model_usage')) {
                return { rows: [] };
            }
            if (sql.includes('INSERT INTO gemini_model_usage')) {
                inserts.push(values);
                return { rows: [] };
            }
            throw new Error(`SQL inesperado: ${sql}`);
        }
    };

    const resultado = await chamarGeminiComFallback({
        banco,
        executar: async (modelo) => {
            tentativas.push(modelo);
            if (modelo === 'modelo-um') {
                const erro = new Error('indisponivel');
                erro.status = 503;
                throw erro;
            }
            return {
                resultado: `resposta de ${modelo}`,
                usage: { promptTokenCount: 100, candidatesTokenCount: 40, thoughtsTokenCount: 10 }
            };
        }
    });

    assert.equal(resultado, 'resposta de modelo-dois');
    assert.deepEqual(tentativas, ['modelo-um', 'modelo-dois']);
    assert.equal(inserts.length, 1);
    assert.equal(inserts[0][0], 'modelo-dois');
    assert.equal(inserts[0][2], 100);
    assert.equal(inserts[0][3], 50);
});

test('skips models that reached the daily token limit', async (context) => {
    preservarAmbiente(context);
    process.env.GEMINI_MODELS = 'modelo-cheio,modelo-livre';
    process.env.GEMINI_MODEL_TOKEN_LIMIT = '1000';

    const tentativas = [];
    const banco = {
        async query(sql) {
            if (sql.includes('CREATE TABLE')) {
                return { rows: [] };
            }
            if (sql.includes('FROM gemini_model_usage')) {
                return {
                    rows: [{
                        model: 'modelo-cheio',
                        total: 1500
                    }]
                };
            }
            return { rows: [] };
        }
    };

    const resultado = await chamarGeminiComFallback({
        banco,
        executar: async (modelo) => {
            tentativas.push(modelo);
            return { resultado: 'ok', usage: null };
        }
    });

    assert.equal(resultado, 'ok');
    assert.deepEqual(tentativas, ['modelo-livre']);
});

test('uses in-memory counters when the database is unavailable', async (context) => {
    preservarAmbiente(context);
    process.env.GEMINI_MODELS = 'modelo-sem-banco';
    process.env.GEMINI_MODEL_TOKEN_LIMIT = '10';

    const banco = {
        async query() {
            throw new Error('banco fora do ar');
        }
    };

    const primeiro = await chamarGeminiComFallback({
        banco,
        executar: async () => ({
            resultado: 'primeira',
            usage: { promptTokenCount: 8, candidatesTokenCount: 5 }
        })
    });
    assert.equal(primeiro, 'primeira');

    await assert.rejects(
        chamarGeminiComFallback({
            banco,
            executar: async () => {
                throw new Error('nao deveria tentar: modelo esgotado em memoria');
            }
        }),
        /esgotado|indisponivel|Nenhum modelo/iu
    );
});

test('propagates the last error when every model fails', async (context) => {
    preservarAmbiente(context);
    process.env.GEMINI_MODELS = 'modelo-a,modelo-b';

    const tentativas = [];
    await assert.rejects(
        chamarGeminiComFallback({
            executar: async (modelo) => {
                tentativas.push(modelo);
                const erro = new Error(`falha ${modelo}`);
                erro.status = 429;
                throw erro;
            }
        }),
        /falha modelo-b/u
    );
    assert.deepEqual(tentativas, ['modelo-a', 'modelo-b']);
});
