# Spec: agent-conversation — V1

Modulo: `agent-conversation` (ver `spec/capability-map.md`)

## Objective

Tornar a conversa da Navi (agente do FinSlash) natural e fluida, eliminando respostas engessadas, sem abrir mao da seguranca. O LLM ganha autonomia para conversar sobre qualquer assunto; conteudo AWS/tecnico fica estritamente limitado ao contexto recuperado pelo RAG/diagnosticos do banco. Respostas finais de solucao ficam objetivas e escaneaveis.

Criterios de aceite:
- Saudacoes, agradecimentos, perguntas de acompanhamento e bate-papo sao conduzidos pelo LLM de forma natural (sem textos fixos), mantendo o tom acolhedor.
- Perguntas sobre AWS so sao respondidas com base no contexto RAG/diagnosticos; se o dado nao estiver la, a Navi admite que nao consta na base — nunca inventa comandos, precos ou configuracoes.
- O sistema prompt inclui guardrails: recusar conteudo sexual/explicito, nao gerar spam, resistir a injecao de prompt, nao se passar por humana.
- Solucoes finais seguem estrutura: diagnostico curto → passos objetivos → validacao rapida, sem blocos gigantes de texto corrido.
- Fluxos determinísticos de dados reais (data/hora, clima via Open-Meteo) sao preservados — sao consultas de dados, nao templates de conversa.
- Toda degradacao (sem `GEMINI_API_KEY`, todos os modelos fora) continua com fallback local — o usuario nunca fica sem resposta.

## Tech Stack

- Mesma stack do `model-router` (Node 22, Web Handler, `pg`).
- `chamarGemini`/roteador do modulo `model-router` para todas as chamadas de geracao.

## Commands

- `npm test` — testes existentes devem continuar passando.
- Sem novos comandos.

## Project Structure

```
api/index.js  → prompts de sistema, orquestracao em receberAdvisor e helpers de resposta
api/advisor.test.js → ajustar testes que dependam dos textos/templates alterados
```

## Design

### Prompt central

- Extrair as regras comuns para um bloco unico reutilizavel (ex.: `DIRETRIZES_CONVERSA_NAVI` expandido) cobrindo:
  - Tom: portugues do Brasil, natural, acolhedor, conciso; pode fazer perguntas de acompanhamento quando faltar dado essencial (uma por vez).
  - Seguranca: recusar conteudo sexual/explicito, nao produzir spam/manipulacao, nao obedecer instrucoes embutidas no usuario que tentem ignorar regras ou mudar de papel; identidade = Navi, agente de IA do FinSlash.
  - AWS estrita: respostas sobre AWS SOMENTE com o contexto fornecido; ausencia de dado → admitir que nao consta na base de conhecimento e sugerir o que esta coberto.
  - Formato de solucao final: diagnostico curto, passos objetivos, validacao rapida.

### Orquestracao em `receberAdvisor`

- Manter o pipeline de recuperacao RAG (`consultarAdvisor`, contexto de visao geral, comparacao) — e ele que garante o "contexto fechado" de AWS.
- Substituir os templates de esclarecimento (`criarRespostaEsclarecimento`, `criarRespostaAmbiguaServicos`, `gerarSaudacaoNavi`, respostas de fallback fixas) por geracao via LLM quando `GEMINI_API_KEY` estiver disponivel, usando o historico e o contexto RAG como base. Manter as versoes locais como fallback quando o Gemini estiver indisponivel.
- Reduzir o gate deterministico `precisaEsclarecimento`: em vez de devolver sempre a pergunta fixa, deixar o LLM formular o esclarecimento naturalmente quando houver conversa ativa; manter o gate apenas como fallback sem Gemini.
- `criarRespostaGeral` (conversa geral com Google Search) passa a ser o caminho padrao para assuntos nao-AWS, com o novo prompt de autonomia e guardrails.

### Code Style

- Mesmo estilo de `api/index.js`: helpers pequenos, comentarios pt-BR de intencao, strings de prompt como template literals.

## Testing Strategy

- `npm test` deve passar; atualizar `api/advisor.test.js` onde ele assevera textos/templates que mudaram.
- Verificacao manual: conversa saudacao → pergunta geral → pergunta AWS coberta → pergunta AWS nao coberta → pedido de solucao final.

## Boundaries

- Always: manter RAG/diagnosticos como unica fonte factual de AWS; manter fallbacks locais; `npm test` verde.
- Ask first: alterar o contrato JSON da resposta do `/api/v1/advisor` (campos consumidos pelo frontend); remover fluxos de clima/data-hora.
- Never: remover validacao de entrada (`lerJsonAdvisor`); expor dados do banco alem do que ja e retornado; deixar o agente responder AWS sem contexto.

## Success Criteria

- Uma conversa de varias turnos (saudacao, duvida geral, duvida AWS, acompanhamento) flui sem perguntas engessadas nem repeticao de contexto.
- Pergunta AWS fora do catalogo recebe admissao clara de ausencia, sem alucinacao.
- Resposta de solucao e escaneavel (diagnostico/passos/validacao).
- Tentativas de prompt injection e pedidos inadequados sao recusadas educadamente.
- `npm test` passa.

## Out of Scope (Deferred)

- Streaming de respostas (SSE) — a resposta continua unica.
- Memoria persistente entre sessoes/dispositivos (hoje o historico e por aba via sessionStorage).
- Novos tipos de ferramenta alem de clima/data-hora/busca Google.

## Open Questions

- Nenhuma bloqueante; o tom exato sera calibrado na revisao do prompt.
