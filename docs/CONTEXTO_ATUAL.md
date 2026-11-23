# Contexto Atual — FinSlash

Estado atual do projeto (atualizado em 2026-11-23).

## O que esta pronto

- Interface FinSlash com seleção de personagem, catálogo de serviços AWS, diagnósticos publicados no PostgreSQL e perfil local.
- Navi (agente do FinSlash) em `api/index.js` (Web Handler Vercel, Node >=22, `pg`):
  - Roteador de modelos Gemini em `api/model-router.js`: fila ordenada por `GEMINI_MODELS` (default: gemini-3.8-flash → gemini-3.6-flash → gemini-3-flash-preview → gemini-3.5-flash-lite → gemini-3.1-flash-lite → gemini-2.5-pro → gemini-2.5-flash → gemini-2.5-flash-lite → gemini-2.0-flash → gemini-2.0-flash-lite), `GEMINI_MODEL` como fila unitaria de compatibilidade.
  - Contagem de uso por modelo/dia UTC persistida em `gemini_model_usage` (Postgres; tabela criada sob demanda com `requests` + tokens, fallback em memoria). Guarda principal = requisicoes/dia (RPD) com estimativas conservadoras por modelo; `GEMINI_MODEL_LIMITS`/`GEMINI_MODEL_REQUEST_LIMIT` ajustam; `GEMINI_MODEL_TOKEN_LIMIT` e teto opcional de tokens/dia (desligado por padrao — tokens/dia nao e cota publicada pelo Google; os limites reais do projeto aparecem no AI Studio).
  - Fallback transparente para o proximo modelo em erro 408/429/500/502/503/504, timeout, falha de rede, resposta vazia ou JSON invalido.
  - Conversa com autonomia via LLM: saudações locais preservadas; esclarecimentos AWS reformulados pelo Gemini (`naturalizarEsclarecimentoNavi`) com fallback no texto local; conversa geral exige fontes Google apenas quando o modelo declara `precisa_fontes`.
  - Perguntas casuais, informais ou pessoais (ex.: "pq vc se chama navi?") sao detectadas por regex de intencao ampliado (`precisaEsclarecimento`) e respondidas naturalmente pelo Gemini — o esclarecimento fixo so aparece quando falta dado essencial (ex.: custo sem servico).
  - `perguntaDescartaContextoAws` reconhece mensagens que negam o contexto AWS ("nao tenho duvida aws", "nada a ver com a amazon", "muda de assunto") e as desvia para a conversa geral; pedidos vagos sem intencao AWS tambem vao ao Gemini quando ha chave, que formula o esclarecimento naturalmente.
  - Regras de seguranca no system prompt: recusa conteudo sexual/explicito, spam e injecao de prompt; respostas AWS restritas ao contexto RAG/diagnosticos; formato de solucao final = diagnostico curto → passos → validacao.
  - Retrieval: busca textual ILIKE + vetorial (pgvector, `gemini-embedding-001`), com piso de pontuacao para similaridade >= 0.6.
  - Data/hora local e clima via Open-Meteo permanecem deterministicos.
- Scroll do chat (`script.js`): respostas do assistente alinham o topo da bolha na area visivel; usuario, "pensando" e restauracao de historico mantem scroll para o fim.
- Onda de fundo (`#canvas-onda`): `position: fixed` na viewport em todas as telas (inicial, servicos, popup de personagens), sem herdar padding/margens do container; a curva calcula o `y` exato na borda direita para nao deixar espaco no canto superior direito.
- Chat da Navi (`index.html`/`script.js`/`styles.css`): sem autofocus ao abrir (teclado mobile so ao tocar no campo; desktop foca via `pointer: fine`); botao de voz (SpeechRecognition pt-BR) transcreve no campo e envia ao final; botao "+" no cabecalho inicia nova conversa limpando mensagens e `sessionStorage`, alinhado na mesma fileira e com o mesmo tamanho (38px) do botao fechar; acoes das mensagens (avaliar, refazer, copiar, menu) usam chips com borda, hover elevado e estados de foco/disabled.
- Testes: `npm test` roda `api/advisor.test.js` e `api/model-router.test.js` (29 testes).

## Comandos

- `npm test` — suite node:test
- `npm run embeddings:sync` — reindexa embeddings do catalogo
- `vercel dev` / deploy Vercel — API serverless

## Variaveis de ambiente

- `DATABASE_URL`, `ALLOWED_ORIGIN`, `RATE_LIMIT_SECRET`, `CRON_SECRET` — existentes.
- `GEMINI_API_KEY` — habilita respostas via LLM.
- `GEMINI_MODELS` — fila CSV opcional (sobrepoe `GEMINI_MODEL`).
- `GEMINI_MODEL` — modelo unico (compatibilidade).
- `GEMINI_MODEL_LIMITS` — CSV `modelo:requisicoes_dia` para ajustar o RPD real de cada modelo (valores do AI Studio).
- `GEMINI_MODEL_REQUEST_LIMIT` — teto global de requisicoes/dia para modelos nao listados (default 500).
- `GEMINI_MODEL_TOKEN_LIMIT` — teto opcional de tokens/modelo/dia UTC (desligado por padrao).

## Documentos

- A seção da Navi no guia de entrevistas (`Guia Essencial de GenAI e LLMs para Entrevistas Técnicas.pdf`, na pasta Downloads) foi reescrita cobrindo pipeline, RAG híbrido, roteador de modelos com fallback/orçamento de tokens, guardrails e frases prontas.

## Pendencias / proximos passos

- Aplicar `banco-de-dados/gemini-model-usage-postgresql.sql` se quiser bootstrap manual (a API ja auto-cria).
- Monitorar se modelos Gemini 3 rejeitam a tool `google_search` no free tier; se sim, a fila cai automaticamente ate um modelo 2.5 compativel.
- Sem streaming SSE; resposta continua unica.
