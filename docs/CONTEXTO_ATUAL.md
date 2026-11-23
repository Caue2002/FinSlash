# Contexto Atual — FinSlash

Estado atual do projeto (atualizado em 2026-11-23).

## O que esta pronto

- Interface FinSlash com seleção de personagem, catálogo de serviços AWS, diagnósticos publicados no PostgreSQL e perfil local.
- Navi (agente do FinSlash) em `api/index.js` (Web Handler Vercel, Node >=22, `pg`):
  - Roteador de modelos Gemini em `api/model-router.js`: fila ordenada por `GEMINI_MODELS` (default verificado ao vivo: gemini-3.5-flash-lite → gemini-flash-lite-latest → gemini-3.1-flash-lite → gemini-3.5-flash → gemini-3.8-flash → gemini-3.6-flash → gemini-3.7-flash → gemini-3-flash-preview → gemini-flash-latest), `GEMINI_MODEL` como fila unitaria de compatibilidade. Familia 2.5 removida: 404 "no longer available to new users" confirmado com chave real.
  - Contagem de uso por modelo/dia UTC persistida em `gemini_model_usage` (Postgres; tabela criada sob demanda com `requests` + tokens, fallback em memoria). Guarda principal = requisicoes/dia (RPD) com estimativas conservadoras por modelo; `GEMINI_MODEL_LIMITS`/`GEMINI_MODEL_REQUEST_LIMIT` ajustam; `GEMINI_MODEL_TOKEN_LIMIT` e teto opcional de tokens/dia (desligado por padrao — tokens/dia nao e cota publicada pelo Google; os limites reais do projeto aparecem no AI Studio).
  - Fallback transparente para o proximo modelo em erro 408/429/500/502/503/504, timeout, falha de rede, resposta vazia ou JSON invalido.
  - Conversa com autonomia via LLM: TODAS as mensagens (incluindo saudações e agradecimentos) vao ao Gemini — nao existem mais respostas locais decoradas (`ehSaudacao`/`gerarSaudacaoNavi`/`criarRespostaBasica` removidos); esclarecimentos AWS reformulados pelo Gemini (`naturalizarEsclarecimentoNavi`) com fallback no texto local; conversa geral exige fontes Google apenas quando o modelo declara `precisa_fontes`.
  - Saudação só na primeira mensagem: `opcoesGeracao.primeiraMensagem` (historico vazio) alterna a instrucao do system prompt — na primeira mensagem a Navi cumprimenta de forma variada e se apresenta começando com "Eu sou a Navi"; nas demais nunca cumprimenta nem se apresenta, salvo se a pessoa enviar uma saudacao, respondendo a cortesia diretamente. Sem GEMINI_API_KEY, uma saudacao cai no esclarecimento local generico (pergunta_ambigua). Alem disso, `REGRA_SEM_ABERTURA_SOCIAL_NAVI` proibe abertura social nos prompts de esclarecimento naturalizado, visao geral, comparacao e resposta de diagnostico — nenhum fluxo começa a resposta com "oi"/"eu sou a Navi" fora da primeira mensagem.
  - Perguntas casuais, informais ou pessoais (ex.: "pq vc se chama navi?") sao detectadas por regex de intencao ampliado (`precisaEsclarecimento`) e respondidas naturalmente pelo Gemini — o esclarecimento fixo so aparece quando falta dado essencial (ex.: custo sem servico).
  - `perguntaDescartaContextoAws` reconhece mensagens que negam o contexto AWS ("nao tenho duvida aws", "nada a ver com a amazon", "muda de assunto") e as desvia para a conversa geral; pedidos vagos sem intencao AWS tambem vao ao Gemini quando ha chave, que formula o esclarecimento naturalmente.
  - Resiliencia do LLM: se um modelo rejeita a tool `google_search` com 400, `chamarGemini` repete a chamada sem grounding no mesmo modelo antes de cair para o proximo da fila; `criarRespostaGeral` nunca mais propaga excecao — falha total do LLM ou JSON invalido em toda a fila retorna resposta local amigavel (status `agente.erro`) em vez do erro 500 "nao conseguiu responder".
  - Fontes Google so sao exigidas quando o grounding estava de fato ativo (`fontesDisponiveis`): antes, `precisa_fontes` omitido pelo modelo virava `true` por default e, sem a tool, TODA resposta caia em "nao encontrei fontes" — causa do "dificuldade de responder" em qualquer pergunta.
  - Orcamento de tempo da fila (`GEMINI_FILA_TIMEOUT_MS`, padrao 16s): o frontend aborta em 25s; sem teto, a fila inteira de modelos lentos/travados estourava o cliente antes da API responder. Cada tentativa usa min(12s, tempo restante) e a fila encerra com <2s restantes.
  - Retrieval mais rapido: a consulta textual do catalogo roda em paralelo com a geracao do embedding da pergunta; o embedding tem timeout de 5s e continua best-effort (falha cai para busca textual).
  - System prompt da conversa geral agora descreve o que e o FinSlash (portfólio interativo de servicos AWS com diagnosticos validados), para que perguntas meta ("o que voce sabe fazer?") sejam respondidas com contexto real do projeto.
  - Regras de seguranca no system prompt: recusa conteudo sexual/explicito, spam e injecao de prompt; respostas AWS restritas ao contexto RAG/diagnosticos; formato de solucao final = diagnostico curto → passos → validacao.
  - Tom das respostas: curtas, diretas, fáceis de entender e sem formalidade excessiva; se restar dúvida, no máximo uma pergunta de acompanhamento por vez até a pessoa confirmar que resolveu (diretriz em `DIRETRIZES_CONVERSA_NAVI` + reforco no prompt de diagnóstico).
  - Retrieval: busca textual ILIKE + vetorial (pgvector, `gemini-embedding-001`), com piso de pontuacao para similaridade >= 0.6.
  - Data/hora local e clima via Open-Meteo permanecem deterministicos.
  - Varredura de resiliência (2ª rodada): `ehPerguntaClima` nao confunde mais "quanto tempo demora?" com meteorologia ("tempo" so conta com contexto de clima); saudações/agradecimentos informais sao respondidos pelo Gemini sem texto fixo; `listarServicosMencionadosNoBanco`, `obterPreferenciaGlobalFeedback`, `consultarAdvisor`, contextos de comparação e chamadas Open-Meteo (geocoding/previsão) degradam com resposta 200 amigável em vez de propagar erro 500 — o catch externo de `receberAdvisor` fica só para falhas realmente inesperadas.
- Scroll do chat (`script.js`): respostas do assistente alinham o topo da bolha na area visivel; usuario, "pensando" e restauracao de historico mantem scroll para o fim.
- Bolha de solução (`styles.css`): plano de ação e checklist nao sao mais cards separados — viraram secoes integradas na mesma bolha, separadas por um divisor fino, com titulos coloridos (plano azul `#7dd3fc`, checklist verde `#86efac`).
- Onda de fundo (`#canvas-onda`): `position: fixed` na viewport em todas as telas (inicial, servicos, popup de personagens), sem herdar padding/margens do container; a curva calcula o `y` exato na borda direita para nao deixar espaco no canto superior direito.
- Chat da Navi (`index.html`/`script.js`/`styles.css`): sem autofocus ao abrir (teclado mobile so ao tocar no campo; desktop foca via `pointer: fine`); o botao de envio dispara no `pointerdown` (e `touchend` como fallback para navegadores sem Pointer Events) em telas de toque/pena, chama `enviarPerguntaAdvisor` direto com o texto capturado, recolhe o teclado via `blur` e envia na hora — sem depender do submit do form, que falhava quando o teclado recolhia e movia o layout entre o toque e o clique; com `enterkeyhint="send"` no campo; botao de voz (SpeechRecognition pt-BR) transcreve no campo e envia ao final; botao "+" no cabecalho inicia nova conversa limpando mensagens e `sessionStorage`, alinhado na mesma fileira e com o mesmo tamanho (38px) do botao fechar; acoes das mensagens (avaliar, refazer, copiar, menu) usam chips com borda, hover elevado e estados de foco/disabled.
- Testes: `npm test` roda `api/advisor.test.js` e `api/model-router.test.js` (30 testes).

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
- `GEMINI_FILA_TIMEOUT_MS` — orcamento total da fila de modelos em ms (default 16000).

## Documentos

- A seção da Navi no guia de entrevistas (`Guia Essencial de GenAI e LLMs para Entrevistas Técnicas.pdf`, na pasta Downloads) foi reescrita cobrindo pipeline, RAG híbrido, roteador de modelos com fallback/orçamento de tokens, guardrails e frases prontas.

## Pendencias / proximos passos

- Aplicar `banco-de-dados/gemini-model-usage-postgresql.sql` se quiser bootstrap manual (a API ja auto-cria).
- `.env.example` corrigido: `GEMINI_MODEL` default era `gemini-2.5-flash` (404 para contas novas — se a Vercel foi configurada com ele, TODA chamada LLM falhava); agora e `gemini-3.5-flash-lite` com aviso para usar `GEMINI_MODELS` com modelos 3.x.
- Monitorar `agente.erro` nas respostas para detectar modelos rejeitando `google_search` (a repeticao sem grounding ja evita a falha, mas fontes ficam indisponiveis nesses modelos).
- Sem streaming SSE; resposta continua unica.
