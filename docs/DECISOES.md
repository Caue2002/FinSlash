# Decisoes

## 2026-11-23 — Fila de modelos Gemini com fallback e contagem de tokens

- **Decisao:** `api/model-router.js` implementa fila ordenada (`GEMINI_MODELS`), teto diario de tokens por modelo (`GEMINI_MODEL_TOKEN_LIMIT`, janela UTC) e fallback transparente em erros 408/429/5xx, timeout e saida invalida.
- **Persistencia:** tabela `gemini_model_usage` no PostgreSQL do FinSlash, criada sob demanda (`CREATE TABLE IF NOT EXISTS`) para nao exigir migration manual; sem banco ou sem permissao de DDL, cai para contadores em memoria da instancia.
- **Motivo:** ambiente serverless na Vercel torna memoria por instancia insuficiente para limites confiaveis; Postgres ja existia e evita dependencia nova.
- **Trade-off:** uma query SELECT por chamada LLM e um upsert por sucesso; telemetria e best-effort e nunca bloqueia a resposta.

## 2026-11-23 — Autonomia conversacional com RAG estrito para AWS

- **Decisao:** o LLM conduz a conversa (inclusive reformulando esclarecimentos via `naturalizarEsclarecimentoNavi`); somente conteudo AWS/tecnico fica restrito ao contexto recuperado (catalogo + embeddings). Conversa geral so exige fontes Google quando o modelo declara `precisa_fontes`.
- **Motivo:** respostas engessadas prejudicavam a fluidez; a protecao anti-alucinacao permanece onde o dado e factual (AWS).
- **Trade-off:** uma chamada extra ao Gemini por pergunta de esclarecimento; sem Gemini, os templates locais continuam respondendo.
