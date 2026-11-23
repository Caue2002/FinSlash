# Plan: Navi — Roteador de Modelos, Conversacao e Scroll

Specs: `spec/capability-map.md`, `spec/SPEC-model-router.md`, `spec/SPEC-agent-conversation.md`, `spec/SPEC-chat-scroll.md`

## Ordem de implementacao

1. **model-router** (base para tudo que chama LLM)
   - Novo `api/model-router.js`: fila `GEMINI_MODELS`/`GEMINI_MODEL`, teto `GEMINI_MODEL_TOKEN_LIMIT` (default 1M/dia), contadores em `gemini_model_usage` (Postgres, dia UTC) com auto-migration (`CREATE TABLE IF NOT EXISTS`, uma vez por instancia) e fallback em memoria.
   - `api/index.js`: `chamarGemini` delega ao router; `executar(modelo)` monta URL/body por modelo e devolve resultado + `usageMetadata`.
   - DDL de referencia em `banco-de-dados/gemini-model-usage-postgresql.sql`.
   - Testes unitarios em `api/model-router.test.js` (fetch/pool mockados); `package.json` roda os dois arquivos.

2. **agent-conversation**
   - Expandir `DIRETRIZES_CONVERSA_NAVI` com seguranca (sexual/spam/injecao), regra AWS estrita e formato de solucao final — sem a frase "AI Agent do FinSlash" (contrato de teste).
   - `criarRespostaGeral`: JSON ganha `precisa_fontes` opcional; fontes so sao exigidas quando o modelo declara que afirma fatos externos.
   - Novo helper `naturalizarEsclarecimentoNavi`: reformula via LLM as perguntas de esclarecimento (`criarRespostaEsclarecimento`), mantendo `conversa`/fallback local intactos.
   - `gerarRespostaNaviGemini`/visao geral/comparacao: prompts com formato diagnostico→passos→validacao.
   - Retrieval: piso de pontuacao para matches vetoriais fortes (similaridade >= 0.65).

3. **chat-scroll**
   - `script.js`: nova `rolarParaInicioMensagem`; `adicionarMensagemAdvisor` alinha o topo da bolha quando `tipo==='assistant' && resultado && persistir`; demais casos mantem scroll para o fim.

4. **Docs**
   - Criar `docs/CONTEXTO_ATUAL.md` e `docs/DECISOES.md` (skill atualizar-documentacao); `.env.example` documenta `GEMINI_MODELS`/`GEMINI_MODEL_TOKEN_LIMIT`.

## Riscos

- Modelos Gemini 3 nao tem Google Search grounding no free tier → chamadas com `google_search` podem falhar e cair na fila ate um modelo 2.5 que suporte; falhas sao baratas (HTTP 400) e o router ja cobre.
- Telemetria nunca bloqueia resposta: todo acesso a banco no router e try/catch com fallback em memoria.
- Testes existentes assumem 1 chamada Gemini por request com `GEMINI_MODEL` unitario — preservado.

## Verificacao

- `npm test` (advisor + model-router).
- Manual: conversa multi-turno, pergunta AWS fora do catalogo, prompt injection, resposta longa com scroll.
