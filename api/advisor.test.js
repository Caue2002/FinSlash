import assert from 'node:assert/strict';
import test from 'node:test';
import pg from 'pg';
import advisor, {
    ehSaudacao,
    pedirComparacaoServicos,
    perguntaRelacionadoAoProjeto,
    precisaEsclarecimento
} from './index.js';

test('recognizes explicit service comparisons without treating every multi-service question as one', () => {
    assert.equal(pedirComparacaoServicos('Qual a diferença entre Amazon S3 e Amazon Athena?'), true);
    assert.equal(pedirComparacaoServicos('Compare Amazon S3 versus Amazon Athena'), true);
    assert.equal(pedirComparacaoServicos('O que é Amazon S3 e Amazon Athena?'), false);
});

test('asks for context when the user describes a generic cost concern', () => {
    assert.equal(precisaEsclarecimento('Meu custo está muito alto'), true);
    assert.equal(precisaEsclarecimento('O painel está diferente'), true);
});

test('asks for context when a service is named but the problem is vague', () => {
    assert.equal(precisaEsclarecimento('O S3 está muito caro'), true);
    assert.equal(precisaEsclarecimento('S3'), true);
});

test('does not interrupt a specific question with a clarification prompt', () => {
    assert.equal(precisaEsclarecimento('Como reduzir custos do S3?'), false);
    assert.equal(precisaEsclarecimento('Como funciona o S3?'), false);
    assert.equal(precisaEsclarecimento('Como resolver erro 403 ao ler objetos no S3?'), false);
});

test('separates AWS questions from general and personal questions', () => {
    assert.equal(perguntaRelacionadoAoProjeto('Como reduzir custos no Amazon S3?'), true);
    assert.equal(perguntaRelacionadoAoProjeto('Me fale sobre AWS Athena.'), true);
    assert.equal(perguntaRelacionadoAoProjeto('Me fale sobre Amazon Web Services.'), true);
    assert.equal(perguntaRelacionadoAoProjeto('Amazon Prime vale a pena?'), false);
    assert.equal(perguntaRelacionadoAoProjeto('Como você está hoje?'), false);
    assert.equal(perguntaRelacionadoAoProjeto('Meu servidor está lento.'), false);
    assert.equal(ehSaudacao('Oi, tudo bem?'), true);
    assert.equal(ehSaudacao('Oi, como reduzir custos no Amazon S3?'), false);
});

test('compares two published services using their catalog contexts and official sources', async (context) => {
    const chavesAmbiente = ['ALLOWED_ORIGIN', 'DATABASE_URL', 'GEMINI_API_KEY', 'GEMINI_MODEL'];
    const ambienteAnterior = Object.fromEntries(
        chavesAmbiente.map((chave) => [chave, process.env[chave]])
    );
    const fetchAnterior = globalThis.fetch;
    const queryAnterior = pg.Pool.prototype.query;
    let instrucaoGemini = '';
    let chamadasGemini = 0;
    context.after(() => {
        chavesAmbiente.forEach((chave) => {
            if (ambienteAnterior[chave] === undefined) {
                delete process.env[chave];
            } else {
                process.env[chave] = ambienteAnterior[chave];
            }
        });
        globalThis.fetch = fetchAnterior;
        pg.Pool.prototype.query = queryAnterior;
    });

    process.env.ALLOWED_ORIGIN = 'https://finslash.vercel.app';
    process.env.DATABASE_URL = 'postgres://localhost/finslash-test';
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.GEMINI_MODEL = 'gemini-test';
    pg.Pool.prototype.query = async function (sql, values = []) {
        if (sql.includes('SELECT DISTINCT service.name')) {
            return { rows: [{ name: 'Amazon Athena' }, { name: 'Amazon S3' }] };
        }
        if (sql.includes('FROM cost_scenarios AS scenario')) {
            const servico = values[0];
            const slug = servico === 'Amazon S3' ? 'AmazonS3' : 'Athena';
            return {
                rows: [{
                    title: `Cenário de ${servico}`,
                    summary: `Informações publicadas sobre ${servico}.`,
                    sources: [{
                        title: `Documentação de ${servico}`,
                        url: `https://docs.aws.amazon.com/${slug}/latest/ug/`
                    }]
                }]
            };
        }
        throw new Error(`Consulta inesperada no teste: ${sql}`);
    };
    globalThis.fetch = async (url, options) => {
        chamadasGemini += 1;
        instrucaoGemini = JSON.parse(options.body).systemInstruction.parts[0].text;
        return new Response(JSON.stringify({
            candidates: [{
                content: {
                    parts: [{ text: JSON.stringify({ resposta: 'Comparação baseada no catálogo.' }) }]
                }
            }]
        }), { status: 200 });
    };

    const response = await advisor.fetch(new Request(
        'https://api.finslash.test/?route=%2Fapi%2Fv1%2Fadvisor',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: 'https://finslash.vercel.app'
            },
            body: JSON.stringify({
                pergunta: 'Qual a diferença entre Amazon S3 e Amazon Athena?'
            })
        }
    ));
    const resultado = await response.json();

    assert.equal(response.status, 200);
    assert.equal(resultado.fonte, 'gemini+banco-validado');
    assert.equal(resultado.servico, 'Amazon Athena × Amazon S3');
    assert.equal(resultado.resposta, 'Comparação baseada no catálogo.');
    assert.equal(resultado.confianca, 0.9);
    assert.deepEqual(
        resultado.sources.map((fonte) => fonte.title),
        ['Documentação de Amazon Athena', 'Documentação de Amazon S3']
    );
    assert.match(instrucaoGemini, /Amazon Athena/u);
    assert.match(instrucaoGemini, /Amazon S3/u);
    assert.match(instrucaoGemini, /exclusivamente/u);

    const responseAmbigua = await advisor.fetch(new Request(
        'https://api.finslash.test/?route=%2Fapi%2Fv1%2Fadvisor',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: 'https://finslash.vercel.app'
            },
            body: JSON.stringify({ pergunta: 'O que é Amazon S3 e Amazon Athena?' })
        }
    ));
    const resultadoAmbiguo = await responseAmbigua.json();

    assert.equal(responseAmbigua.status, 200);
    assert.equal(resultadoAmbiguo.fonte, 'pergunta_ambigua');
    assert.match(resultadoAmbiguo.resposta, /Informe qual serviço/u);
    assert.equal(chamadasGemini, 1);
});

test('answers general questions with Gemini without requiring AWS diagnostics', async (context) => {
    const chavesAmbiente = ['ALLOWED_ORIGIN', 'DATABASE_URL', 'GEMINI_API_KEY', 'GEMINI_MODEL'];
    const ambienteAnterior = Object.fromEntries(
        chavesAmbiente.map((chave) => [chave, process.env[chave]])
    );
    const fetchAnterior = globalThis.fetch;
    const chamadasGemini = [];
    context.after(() => {
        chavesAmbiente.forEach((chave) => {
            if (ambienteAnterior[chave] === undefined) {
                delete process.env[chave];
            } else {
                process.env[chave] = ambienteAnterior[chave];
            }
        });
        globalThis.fetch = fetchAnterior;
    });

    process.env.ALLOWED_ORIGIN = 'https://finslash.vercel.app';
    process.env.GEMINI_API_KEY = 'test-key';
    process.env.GEMINI_MODEL = 'gemini-test';
    delete process.env.DATABASE_URL;
    globalThis.fetch = async (url, options) => {
        chamadasGemini.push({ url: String(url), body: JSON.parse(options.body) });
        return new Response(JSON.stringify({
            candidates: [{ content: { parts: [{ text: 'Uma caminhada pode ser um bom começo.' }] } }]
        }), { status: 200 });
    };

    const request = new Request(
        'https://api.finslash.test/?route=%2Fapi%2Fv1%2Fadvisor',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: 'https://finslash.vercel.app'
            },
            body: JSON.stringify({ pergunta: 'Qual hábito simples ajuda a começar bem o dia?' })
        }
    );
    const response = await advisor.fetch(request);
    const resultado = await response.json();

    assert.equal(response.status, 200);
    assert.equal(resultado.fonte, 'gemini-geral');
    assert.equal(resultado.resposta, 'Uma caminhada pode ser um bom começo.');
    assert.equal(chamadasGemini.length, 1);
    assert.match(chamadasGemini[0].url, /gemini-test/u);

    delete process.env.GEMINI_API_KEY;
    const respostaSemGemini = await advisor.fetch(new Request(
        'https://api.finslash.test/?route=%2Fapi%2Fv1%2Fadvisor',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: 'https://finslash.vercel.app'
            },
            body: JSON.stringify({ pergunta: 'Qual é o seu nome?' })
        }
    ));
    const resultadoSemGemini = await respostaSemGemini.json();

    assert.equal(respostaSemGemini.status, 200);
    assert.equal(resultadoSemGemini.fonte, 'geral-indisponivel');
    assert.equal(chamadasGemini.length, 1);
});
