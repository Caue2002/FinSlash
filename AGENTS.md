# AGENTS.md — Projeto FinSlash

Leia `docs/CONTEXTO_ATUAL.md` primeiro: ele registra o estado atual, decisoes e
pendencias do projeto.

## Regras do projeto

- Commits em portugues, titulo claro; `git push origin main` ao final da tarefa.
- Nunca commitar `.env` ou segredos.

## Protocolo de validacao (obrigatorio — spec/SPEC-validacao-por-etapas.md)

Toda alteracao deve ser testada por etapas antes de commit/push:

1. `git status`/`git diff` — so os arquivos pretendidos, sem segredos.
2. `node --check` em todo `.js` alterado.
3. `npm test` — 100% verde; ajustar/criar testes quando o comportamento muda.
4. Validacao funcional — `curl` no `/api/v1/advisor` para cenarios alterados;
   checar renderizacao do frontend quando UI mudar.
5. Reler o diff final — sem codigo morto nem alteracao indevida.

Se qualquer etapa falhar: NAO commitar; achar a causa raiz, corrigir e
reexecutar as etapas afetadas. So depois de tudo verde: commit + push.

## Comandos uteis

- `npm test` — suite node:test (api/advisor.test.js + api/model-router.test.js)
- `npm run embeddings:sync` — reindexa embeddings do catalogo
- `vercel dev` / deploy Vercel — API serverless

## Dominio

Portfolio interativo de servicos AWS com diagnosticos validados no PostgreSQL.
A Navi e a agente de IA do chat (Gemini via `api/model-router.js`): conversa
geral com autonomia, AWS restrita ao catalogo/diagnosticos, clima e data/hora
deterministicos via Open-Meteo.
