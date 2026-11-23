# Contexto Atual — FinSlash

Estado atual do projeto (atualizado em 2026-11-23).

## O que esta pronto

- Interface FinSlash com seleção de personagem, catálogo de serviços AWS, diagnósticos publicados no PostgreSQL e perfil local.
- Navi (agente do FinSlash) em `api/index.js` (Web Handler Vercel, Node >=22, `pg`):
  - Roteador de modelos Gemini em `api/model-router.js`: fila ordenada por `GEMINI_MODELS` (default: gemini-3.8-flash → gemini-3.6-flash → gemini-3-flash-preview → gemini-3.5-flash-lite → gemini-3.1-flash-lite → gemini-2.5-pro → gemini-2.5-flash → gemini-2.5-flash-lite → gemini-2.0-flash → gemini-2.0-flash-lite), `GEMINI_MODEL` como fila unitaria de compatibilidade.
  - Contagem de tokens por modelo/dia UTC persistida em `gemini_model_usage` (Postgres; tabela criada sob demanda, fallback em memoria). Teto por `GEMINI_MODEL_TOKEN_LIMIT` (default 1.000.000).
  - Fallback transparente para o proximo modelo em erro 408/429/500/502/503/504, timeout, falha de rede, resposta vazia ou JSON invalido.
  - Conversa com autonomia via LLM: saudações locais preservadas; esclarecimentos AWS reformulados pelo Gemini (`naturalizarEsclarecimentoNavi`) com fallback no texto local; conversa geral exige fontes Google apenas quando o modelo declara `precisa_fontes`.
  - Regras de seguranca no system prompt: recusa conteudo sexual/explicito, spam e injecao de prompt; respostas AWS restritas ao contexto RAG/diagnosticos; formato de solucao final = diagnostico curto → passos → validacao.
  - Retrieval: busca textual ILIKE + vetorial (pgvector, `gemini-embedding-001`), com piso de pontuacao para similaridade >= 0.6.
  - Data/hora local e clima via Open-Meteo permanecem deterministicos.
- Scroll do chat (`script.js`): respostas do assistente alinham o topo da bolha na area visivel; usuario, "pensando" e restauracao de historico mantem scroll para o fim.
- Testes: `npm test` roda `api/advisor.test.js` e `api/model-router.test.js` (28 testes).

## Comandos

- `npm test` — suite node:test
- `npm run embeddings:sync` — reindexa embeddings do catalogo
- `vercel dev` / deploy Vercel — API serverless

## Variaveis de ambiente

- `DATABASE_URL`, `ALLOWED_ORIGIN`, `RATE_LIMIT_SECRET`, `CRON_SECRET` — existentes.
- `GEMINI_API_KEY` — habilita respostas via LLM.
- `GEMINI_MODELS` — fila CSV opcional (sobrepoe `GEMINI_MODEL`).
- `GEMINI_MODEL` — modelo unico (compatibilidade).
- `GEMINI_MODEL_TOKEN_LIMIT` — teto de tokens/modelo/dia UTC (default 1.000.000).

## Pendencias / proximos passos

- Aplicar `banco-de-dados/gemini-model-usage-postgresql.sql` se quiser bootstrap manual (a API ja auto-cria).
- Monitorar se modelos Gemini 3 rejeitam a tool `google_search` no free tier; se sim, a fila cai automaticamente ate um modelo 2.5 compativel.
- Sem streaming SSE; resposta continua unica.
