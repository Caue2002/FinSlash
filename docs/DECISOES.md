# Decisoes

## 2026-11-23 — Cota diaria por requisicoes (RPD) em vez de tokens/dia

- **Decisao:** a guarda de cota do roteador passou a ser requisicoes/dia por modelo (`requests` em `gemini_model_usage`), com estimativas conservadoras por modelo e ajustes via `GEMINI_MODEL_LIMITS`/`GEMINI_MODEL_REQUEST_LIMIT`. `GEMINI_MODEL_TOKEN_LIMIT` virou teto opcional de tokens/dia (desligado por padrao).
- **Motivo:** o Google nao publica limites fixos de tokens/dia no free tier — as dimensoes documentadas sao RPM, TPM (tokens/minuto) e RPD, visiveis por projeto no AI Studio. O teto anterior de 1.000.000 tokens/dia era um valor inventado e nao refletia a cota real.
- **Trade-off:** requests so sao contadas em chamadas bem-sucedidas; limites por minuto continuam cobertos pelo fallback em 429.

## 2026-11-23 — Fila de modelos Gemini com fallback e contagem de tokens

- **Decisao:** `api/model-router.js` implementa fila ordenada (`GEMINI_MODELS`), cotas diarias por modelo e fallback transparente em erros 408/429/5xx, timeout e saida invalida.
- **Persistencia:** tabela `gemini_model_usage` no PostgreSQL do FinSlash, criada sob demanda (`CREATE TABLE IF NOT EXISTS`) para nao exigir migration manual; sem banco ou sem permissao de DDL, cai para contadores em memoria da instancia.
- **Motivo:** ambiente serverless na Vercel torna memoria por instancia insuficiente para limites confiaveis; Postgres ja existia e evita dependencia nova.
- **Trade-off:** uma query SELECT por chamada LLM e um upsert por sucesso; telemetria e best-effort e nunca bloqueia a resposta.

## 2026-11-23 — Autonomia conversacional com RAG estrito para AWS

- **Decisao:** o LLM conduz a conversa (inclusive reformulando esclarecimentos via `naturalizarEsclarecimentoNavi`); somente conteudo AWS/tecnico fica restrito ao contexto recuperado (catalogo + embeddings). Conversa geral so exige fontes Google quando o modelo declara `precisa_fontes`.
- **Motivo:** respostas engessadas prejudicavam a fluidez; a protecao anti-alucinacao permanece onde o dado e factual (AWS).
- **Trade-off:** uma chamada extra ao Gemini por pergunta de esclarecimento; sem Gemini, os templates locais continuam respondendo.
