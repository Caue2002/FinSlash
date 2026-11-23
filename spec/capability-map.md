# Capability Map: Navi — Roteador de Modelos, Conversacao e Scroll

| Module id | Responsibility | Depends on |
|---|---|---|
| model-router | Fila ordenada de modelos Gemini gratuitos, contagem persistente de tokens por modelo/janela, fallback por limite de tokens e por erro (429/500/503/timeout) | — |
| agent-conversation | System prompts e orquestracao do agente: autonomia conversacional, guardrails de seguranca, RAG estrito para AWS, respostas concisas | model-router |
| chat-scroll | Correcao do scroll do chat para alinhar o topo da bolha do assistente | — |

Build order: model-router → agent-conversation; chat-scroll independente (pode ir em paralelo).

Decisoes assumidas (confirmadas com o responsavel):
- Contadores de tokens persistidos em PostgreSQL (mesmo banco do FinSlash), janela diaria UTC.
- O LLM tem autonomia para conversar sobre qualquer assunto; somente conteudo AWS fica restrito ao contexto fechado do RAG/diagnosticos do banco.
- Se todos os modelos falharem, a API devolve fallback gracioso sem travar o usuario.
