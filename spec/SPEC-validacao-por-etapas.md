# Spec: validacao-por-etapas — Protocolo obrigatorio de testes antes de commit/push

Regra transversal do projeto (nao e um modulo de produto; vale para TODA alteracao).

## Objective

Garantir que nenhuma alteracao chegue ao repositorio com bugs, latencia ou codigo
quebrado. O ciclo de toda mudanca segue etapas de teste; commit e push so sao
permitidos quando todas as etapas passam sem nenhuma alteracao indevida.

## Protocolo obrigatorio

Toda tarefa que alterar codigo, prompt, estilo ou configuracao deve passar por
estas etapas, nesta ordem:

1. **Revisao de escopo** — `git status`/`git diff` para confirmar que so os
   arquivos pretendidos mudaram; nenhuma alteracao colateral ou segredo.
2. **Estatica** — `node --check` em todo `.js` alterado (frontend e API).
3. **Testes unitarios** — `npm test` (node:test, `api/advisor.test.js` +
   `api/model-router.test.js`) com 100% de aprovacao. Teste novo ou ajustado e
   obrigatorio quando o comportamento muda.
4. **Validacao funcional** — exercitar o fluxo alterado de ponta a ponta:
   - API: `curl` no endpoint `/api/v1/advisor` (producao ou `vercel dev`)
     cobrindo o cenario alterado (ex.: primeira mensagem, mensagem seguinte,
     fluxo de diagnostico AWS).
   - Frontend: verificar que a mudanca de renderizacao nao quebra a estrutura
     da bolha (mensagem, plano, checklist, fontes, acoes).
5. **Revisao de diff final** — reler o diff completo procurando codigo morto,
   promessas nao cumpridas e regressao de comportamento.

## Regras

- Se qualquer etapa falhar, NAO commitar: investigar a causa raiz, corrigir e
  reexecutar todas as etapas afetadas.
- Erros encontrados na validacao funcional sao bugs a corrigir na mesma tarefa,
  nao "melhorias futuras".
- Commits em portugues com titulo claro; `git push origin main` somente apos a
  ultima etapa verde.
- Atualizar `docs/CONTEXTO_ATUAL.md` (skill `atualizar-documentacao`) no mesmo
  commit quando o comportamento mudar.

## Verification

- `npm test` — suite completa verde.
- `node --check script.js api/index.js` — sem erro de sintaxe.
- Resposta real da API confirma o comportamento esperado do cenario testado.
