# Spec: model-router — V1

Modulo: `model-router` (ver `spec/capability-map.md`)

## Objective

Substituir o modelo Gemini unico (`GEMINI_MODEL`) por um roteador com fila de prioridade de modelos gratuitos, contagem persistente de tokens por modelo e fallback automatico — tanto por limite de tokens do ciclo quanto por erro de API (429, 500, 503, timeout, resposta vazia). O usuario nunca percebe a troca de modelo.

Criterios de aceite:
- Chamadas ao Gemini sempre tentam o modelo mais capaz disponivel primeiro.
- Quando o consumo diario do modelo atinge o teto configurado, ele e pulado e o proximo da fila atende.
- Em erro transiente (429/500/503/timeout/rede), o proximo modelo e tentado na mesma requisicao.
- Se todos falharem, o erro propaga para o fallback local ja existente (comportamento atual preservado).
- O consumo de tokens (`input + output` do `usageMetadata`) e persistido por modelo e por dia.

## Tech Stack

- Node.js >=22, Web Handler da Vercel (`api/index.js`), `pg` (Pool ja existente via `DATABASE_URL`).
- API Gemini `v1beta/models/{model}:generateContent` (chamada `fetch` nativa, ja existente em `chamarGemini`).
- Sem novas dependencias.

## Commands

- Dev local: `vercel dev` (ou servir `api/index.js` via handler)
- Testes: `npm test` (`node --test api/advisor.test.js`)
- Migration: aplicar manualmente o SQL em `banco-de-dados/gemini-model-usage-postgresql.sql`

## Project Structure

```
api/index.js                              → chamador do roteador (chamarGemini vira wrapper)
api/model-router.js (novo)                → fila, contadores, persistencia e fallback
banco-de-dados/gemini-model-usage-postgresql.sql (novo) → tabela de uso
api/advisor.test.js                       → testes do roteador
```

## Design

### Fila de modelos

- Nova env `GEMINI_MODELS`: lista separada por virgula, ordenada do mais capaz ao mais leve.
  Default: `gemini-2.5-pro,gemini-2.5-flash,gemini-2.5-flash-lite,gemini-2.0-flash,gemini-2.0-flash-lite`.
- `GEMINI_MODEL` (env atual) mantida por compatibilidade: se definida e `GEMINI_MODELS` ausente, a fila tem um unico modelo.
- Modelo de embedding (`gemini-embedding-001`) NAO entra na fila — nao retorna `usageMetadata` de geracao e tem precos/limites proprios.

### Persistencia de uso

- Nova tabela `gemini_model_usage`:
  `model TEXT`, `usage_date DATE` (dia UTC), `input_tokens BIGINT`, `output_tokens BIGINT`, `updated_at TIMESTAMPTZ`, PK `(model, usage_date)`.
- Janela = dia UTC (`(NOW() AT TIME ZONE 'UTC')::date`).
- Teto por modelo via env `GEMINI_MODEL_TOKEN_LIMIT` (default `1000000`), aplicado a `input + output` do dia.
- Leituras/escritas com `INSERT ... ON CONFLICT DO UPDATE` atomico; falha de banco degrada para contadores em memoria da instancia (best-effort) sem derrubar a requisicao.
- Erro de API nao consome tokens; somente respostas com `usageMetadata` contabilizam.

### Algoritmo do roteador

1. Monta a fila a partir de `GEMINI_MODELS`/`GEMINI_MODEL`.
2. Para cada modelo, em ordem: consulta consumo do dia; se `>= teto`, marca esgotado e pula.
3. Executa `generateContent` com timeout de 15s (inalterado).
4. Sucesso → soma `promptTokenCount` (input) e `candidatesTokenCount + thoughtsTokenCount` (output) do `usageMetadata`, persiste de forma assincrona (nao bloqueia a resposta), retorna o payload processado como hoje.
5. Erro HTTP 429/500/503, timeout (`AbortError`), erro de rede ou resposta vazia → registra em log, tenta o proximo modelo da fila.
6. Todos esgotados/indisponiveis → lanca erro; os callers atuais (`gerarRespostaNaviGemini`, `criarRespostaGeral`, etc.) ja degradam para fallback local — comportamento preservado.

### Code Style

- Manter o estilo do arquivo: funcoes puras pequenas, comentarios em pt-BR explicando o "por que", `const`/`let`, sem ponto-e-virgula obrigatorio fora do padrao existente (o arquivo usa `;`).
- `chamarGemini` mantem a mesma assinatura publica; internamente delega ao roteador.

## Testing Strategy

- `node --test api/advisor.test.js`: testes unitarios do roteador com `fetch` mockado — cobrem ordem da fila, pulo por limite, fallback em 429/503, contagem de tokens e esgotamento de todos os modelos.
- Sem framework novo; mocks via injecao de dependencia (pool/fetch) para nao exigir banco real.

## Boundaries

- Always: rodar `npm test` antes de commitar; nunca logar a API key; manter fallback local funcionando quando `GEMINI_API_KEY` ausente.
- Ask first: mudancas no schema alem da tabela nova; novos endpoints; alterar limites de request existentes.
- Never: commitar segredos; remover os fallbacks locais de resposta; bloquear a resposta por causa de telemetria de tokens (persistencia e best-effort).

## Success Criteria

- Com `GEMINI_MODELS` default e banco disponivel, uma falha 503 no modelo principal resulta em resposta vinda do proximo modelo sem erro visivel ao usuario.
- Atingido o teto diario de um modelo, a proxima chamada usa o seguinte da fila.
- `gemini_model_usage` reflete `input_tokens`/`output_tokens` acumulados por dia UTC.
- `npm test` passa; nenhum fluxo existente (visao geral, comparacao, clima, horario, feedback) quebra.

## Out of Scope (Deferred)

- Contadores por RPM/minuto (o teto e de tokens por dia, nao rate limit).
- Modelos pagos ou `gemini-embedding` na fila de fallback.
- Telemetria exposta ao frontend (status de qual modelo atendeu).
- Retentativa com backoff exponencial por modelo (uma tentativa por modelo por requisicao).

## Open Questions

- Nomes exatos dos modelos gratuitos podem mudar; a fila e configuravel por env para ajuste sem deploy de codigo.
