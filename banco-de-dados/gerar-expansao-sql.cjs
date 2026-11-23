// Gera o SQL de expansao do catalogo a partir dos arquivos
// novos-cenarios-dados-*.cjs. Fontes sao escolhidas das URLs ja
// validadas do proprio servico (fontes-por-servico.json).
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const fontesPorServico = JSON.parse(fs.readFileSync(path.join(DIR, 'fontes-por-servico.json'), 'utf8'));
const titulosExistentes = JSON.parse(fs.readFileSync(path.join(DIR, 'titulos-cenarios.json'), 'utf8'));

const arquivos = fs.readdirSync(DIR).filter((f) => /^novos-cenarios-dados-\d+\.cjs$/.test(f)).sort();
const dados = [];
for (const arquivo of arquivos) {
    dados.push(...require(path.join(DIR, arquivo)));
}

function esc(texto) {
    return `'${String(texto).replace(/'/g, "''")}'`;
}

function slugify(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// slugs de cenarios ja existentes por servico
const slugsExistentes = {};
for (const [svc, lista] of Object.entries(titulosExistentes)) {
    slugsExistentes[svc] = new Set(lista.map((c) => c.slug));
}

// escolhe fontes: match por keyword no titulo/url; fallback nas 2 primeiras
function escolherFontes(service, palavrasChave, quantidade = 2) {
    const fontes = fontesPorServico[service] || [];
    const escolhidas = [];
    const usadas = new Set();
    for (const palavra of palavrasChave) {
        const alvo = palavra.toLowerCase();
        const achada = fontes.find((f) =>
            !usadas.has(f.url) && (f.title.toLowerCase().includes(alvo) || f.url.toLowerCase().includes(alvo))
        );
        if (achada) {
            escolhidas.push(achada);
            usadas.add(achada.url);
        }
        if (escolhidas.length >= quantidade) break;
    }
    for (const fonte of fontes) {
        if (escolhidas.length >= quantidade) break;
        if (!usadas.has(fonte.url)) {
            escolhidas.push(fonte);
            usadas.add(fonte.url);
        }
    }
    return escolhidas;
}

const servicosCobertos = new Set(dados.map((s) => s.service));
const todosServicos = Object.keys(fontesPorServico);
const faltando = todosServicos.filter((s) => !servicosCobertos.has(s));
if (faltando.length) {
    console.error('Servicos sem novos cenarios:', faltando);
    process.exit(1);
}

let sql = `-- Expansao do catalogo de diagnosticos de custo AWS.
-- Adiciona novos cenarios aos 48 servicos existentes, reutilizando
-- fontes oficiais ja validadas do proprio servico.
-- Aplicar apos diagnosticos-postgresql.sql. Idempotente via ON CONFLICT.
BEGIN;

`;

const linhasCenarios = [];
const linhasSteps = [];
const linhasSources = [];
let totalCenarios = 0;

for (const bloco of dados) {
    const service = bloco.service;
    const existentes = slugsExistentes[service] || new Set();
    for (const cenario of bloco.cenarios) {
        if (existentes.has(cenario.slug)) {
            console.error(`Slug duplicado: ${service}/${cenario.slug}`);
            process.exit(1);
        }
        existentes.add(cenario.slug);
        totalCenarios += 1;
        linhasCenarios.push(
            `    (${esc(service)}, ${esc(cenario.slug)},\n        ${esc(cenario.titulo)}, ${esc(cenario.resumo)})`
        );
        const acao = cenario.acao || cenario.action;
        const steps = [
            ['check', 1, cenario.checks[0][0], cenario.checks[0][1]],
            ['check', 2, cenario.checks[1][0], cenario.checks[1][1]],
            ['action', 1, acao[0], acao[1]],
            ['caution', 1, cenario.caution[0], cenario.caution[1]]
        ];
        for (const [tipo, pos, titulo, conteudo] of steps) {
            linhasSteps.push(
                `    (${esc(service)}, ${esc(cenario.slug)}, ${esc(tipo)}, ${pos},\n        ${esc(titulo)}, ${esc(conteudo)})`
            );
        }
        for (const fonte of escolherFontes(service, cenario.fontes || [], 2)) {
            linhasSources.push(
                `    (${esc(service)}, ${esc(cenario.slug)},\n        ${esc(fonte.title)}, ${esc(fonte.url)})`
            );
        }
    }
}

sql += `INSERT INTO cost_scenarios (service_id, slug, title, summary)
SELECT service.id, scenario.slug, scenario.title, scenario.summary
FROM (VALUES
${linhasCenarios.join(',\n')}
) AS scenario(service_slug, slug, title, summary)
JOIN aws_services AS service ON service.slug = scenario.service_slug
ON CONFLICT (service_id, slug) DO UPDATE
SET title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    updated_at = NOW();

INSERT INTO scenario_steps (scenario_id, step_type, position, title, content)
SELECT scenario.id, step.step_type, step.position, step.title, step.content
FROM (VALUES
${linhasSteps.join(',\n')}
) AS step(service_slug, scenario_slug, step_type, position, title, content)
JOIN aws_services AS service ON service.slug = step.service_slug
JOIN cost_scenarios AS scenario
    ON scenario.service_id = service.id AND scenario.slug = step.scenario_slug
ON CONFLICT (scenario_id, step_type, position) DO UPDATE
SET title = EXCLUDED.title,
    content = EXCLUDED.content;

INSERT INTO scenario_sources (scenario_id, title, url)
SELECT scenario.id, source.title, source.url
FROM (VALUES
${linhasSources.join(',\n')}
) AS source(service_slug, scenario_slug, title, url)
JOIN aws_services AS service ON service.slug = source.service_slug
JOIN cost_scenarios AS scenario
    ON scenario.service_id = service.id AND scenario.slug = source.scenario_slug
ON CONFLICT (scenario_id, url) DO UPDATE
SET title = EXCLUDED.title,
    reviewed_at = CURRENT_DATE;

COMMIT;
`;

fs.writeFileSync(path.join(DIR, 'expansao-diagnosticos-custo-postgresql.sql'), sql);
console.log(`Cenarios gerados: ${totalCenarios}`);
console.log(`Steps: ${linhasSteps.length}, Sources: ${linhasSources.length}`);
console.log('Arquivo: banco-de-dados/expansao-diagnosticos-custo-postgresql.sql');
