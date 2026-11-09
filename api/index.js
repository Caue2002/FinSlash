import { createHmac, timingSafeEqual } from 'node:crypto';
import { isIP } from 'node:net';
import pg from 'pg';

let pool;
const { Pool } = pg;

const LIMITE_BYTES_FEEDBACK = 4096;
const LIMITE_CARACTERES_FEEDBACK = 1000;
const LIMITE_ENVIOS_POR_HORA = 5;
const CATEGORIAS_FEEDBACK = new Set(['suggestion', 'issue', 'content']);

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
