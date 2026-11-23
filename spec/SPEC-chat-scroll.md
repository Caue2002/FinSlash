# Spec: chat-scroll — V1

Modulo: `chat-scroll` (ver `spec/capability-map.md`)

## Objective

Corrigir o comportamento de scroll do chat da Navi: ao chegar a resposta do assistente, o container de mensagens deve posicionar o TOPO da nova bolha visivel, em vez de rolar ate o rodape dela (o que escondia o inicio de respostas longas).

Criterios de aceite:
- Ao exibir uma mensagem `assistant`, o scroll alinha o topo da bolha na area visivel do container.
- Mensagens `user` e o placeholder "Pensando..." mantem o comportamento atual (rolar para o fim).
- Restauração de historico e abertura do painel nao mudam de comportamento.

## Tech Stack

- Frontend estatico: `script.js` + `index.html` + `styles.css` (sem framework, sem build).

## Commands

- Nenhum build; validacao manual abrindo `index.html`/preview e inspecionando `mensagensAdvisor`.

## Project Structure

```
script.js → funcoes de scroll e adicao de mensagens do advisor (~linhas 949-1380)
index.html / styles.css → container .mensagens-advisor (sem mudanca esperada)
```

## Design

- `rolarMensagensParaMaisRecente()` (hoje rola para `scrollHeight`) continua existindo para user/pensando/teclado.
- Nova funcao `rolarParaInicioMensagem(mensagem)` que, dentro de `requestAnimationFrame`, alinha o topo do elemento ao topo da area visivel do container `mensagensAdvisor` (ex.: `scrollIntoView({ block: 'start' })` com offset do padding do container, ou calculo manual de `scrollTop`), com comportamento suave quando suportado.
- `adicionarMensagemAdvisor` passa a chamar a nova funcao quando `tipo === 'assistant'` e a mensagem nao for o placeholder de "pensando" (classe `mensagem-pensando-advisor`); demais casos seguem em `rolarMensagensParaMaisRecente()`.
- Considerar a altura util do container (o painel e um popup com viewport proprio) — usar o bounding do container, nao da janela.

## Testing Strategy

- Sem testes automatizados no frontend hoje; verificacao manual: enviar pergunta cuja resposta do agente seja longa e confirmar que o inicio da bolha fica visivel ao fim da renderizacao.
- Conferir que mensagens curtas e o fluxo de "pensando → resposta" nao produzem salto indevido.

## Boundaries

- Always: nao alterar o contrato com a API; manter acessibilidade (foco/ARIA) intacta.
- Ask first: mudancas em `styles.css` que afetem o layout do painel.
- Never: introduzir dependencia de scroll-snap ou biblioteca externa.

## Success Criteria

- Resposta longa do agente exibe o topo da bolha ao completar; usuario nao precisa rolar para cima para comecar a leitura.
- Nenhum outro fluxo de scroll (abertura do painel, teclado virtual, historico) regride.

## Out of Scope (Deferred)

- Scroll animado durante streaming (nao ha streaming).
- "Botao voltar ao fim" ou indicadores de novas mensagens.

## Open Questions

- Nenhuma.
