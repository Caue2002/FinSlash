// Aplica os SQLs do catalogo no banco usando DATABASE_URL do .env.
// Uso: node aplicar-sql.cjs <arquivo.sql> [arquivo2.sql ...]
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function carregarEnv(caminho) {
    const env = {};
    for (const linha of fs.readFileSync(caminho, 'utf8').split(/\r?\n/)) {
        const m = linha.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
    return env;
}

async function main() {
    const env = carregarEnv(path.join(__dirname, '.env'));
    const url = env.DATABASE_URL_ADMIN || env.DATABASE_URL;
    if (!url) {
        console.error('DATABASE_URL ausente no .env');
        process.exit(1);
    }
    // Supabase pooler exige usuario no formato "role.PROJECT_REF".
    // Se a URL admin vier so com "postgres", copia o ref da DATABASE_URL.
    let connectionString = url;
    try {
        const u = new URL(url);
        const uNormal = new URL(env.DATABASE_URL || 'postgresql://x@x/x');
        const refNormal = uNormal.username.split('.').pop();
        if (u.hostname.includes('pooler.supabase.com')
            && !u.username.includes('.')
            && /^[a-z0-9]{10,}$/.test(refNormal)) {
            u.username = `${u.username}.${refNormal}`;
            connectionString = u.toString();
            console.log('usuario do pooler ajustado para role.' + refNormal.slice(0, 6) + '...');
        }
    } catch {
        // mantem a URL original se o parse falhar
    }
    const arquivos = process.argv.slice(2);
    if (!arquivos.length) {
        console.error('Informe ao menos um arquivo .sql');
        process.exit(1);
    }
    const client = new Client({ connectionString });
    await client.connect();
    try {
        const existe = await client.query(
            "SELECT to_regclass('public.cost_scenarios') IS NOT NULL AS ok"
        );
        console.log('tabela cost_scenarios existe:', existe.rows[0].ok);
        for (const arquivo of arquivos) {
            const sql = fs.readFileSync(arquivo, 'utf8');
            console.log(`aplicando ${arquivo} (${sql.length} bytes)...`);
            await client.query(sql);
            console.log(`ok: ${arquivo}`);
        }
    } finally {
        await client.end();
    }
}

main().catch((erro) => {
    console.error('ERRO:', erro.message);
    process.exit(1);
});
