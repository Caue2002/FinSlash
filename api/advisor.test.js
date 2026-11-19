import assert from 'node:assert/strict';
import test from 'node:test';
import advisor, {
    ehSaudacao,
    perguntaRelacionadoAoProjeto,
    precisaEsclarecimento
} from './index.js';

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
