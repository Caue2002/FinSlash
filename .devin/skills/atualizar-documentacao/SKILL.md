---
name: atualizar-documentacao
description: Protocolo de atualizacao da documentacao do Projeto Kora. Use ao final de qualquer tarefa que altere comportamento, arquitetura, comandos, dominio ou estado do projeto — antes de commitar. Garante que docs/CONTEXTO_ATUAL.md e docs/ relevantes reflitam a mudanca.
---

# Atualizacao de Documentacao (Kora)

## Regra principal

Nenhuma tarefa termina sem a documentacao em dia. Antes de commitar, revise se a
mudanca exige atualizacao dos arquivos abaixo e aplique as atualizacoes no mesmo
commit (ou em commit de docs imediatamente apos).

## O que atualizar e quando

1. **`docs/CONTEXTO_ATUAL.md`** — SEMPRE que a tarefa mudar qualquer um destes:
   - funcionalidade nova ou alterada (adicione bullet em "O que esta pronto")
   - estado atual, decisoes, pendencias ou handoff (secoes proprias)
   - comandos, endpoints, variaveis de ambiente ou fluxo de deploy
   - uma pendencia foi concluida → marque com ~~riscado~~ e "FEITO"

2. **`docs/DECISOES.md`** — somente quando houver uma decisao tecnica nova e
   duravel (nova dependencia, mudanca de arquitetura, trade-off assumido).
   Decisoes trivizas de UI/bugfix nao vao para ca.

3. **`AGENTS.md`** — somente se mudarem regras do projeto, comandos uteis ou
   o dominio de negocio.

4. **READMEs de pasta** (`api/`, `rag/`, `coherence/`, `shared/`, `frontend/`)
   — quando a mudanca alterar o contrato ou o papel do modulo.

## Formato

- Portugues, sem acentos nos arquivos existentes (seguir o estilo do arquivo).
- Bullets concisos dizendo O QUE mudou e POR QUE (nao cole codigo).
- Remova ou risque informacao que ficou obsoleta; nao acumule historico
  contraditorio — o arquivo registra o estado ATUAL, nao um diario.
- Ao atualizar "Em andamento"/"Pendencias", mantenha a ordem e o criterio
  de proximos passos.

## Verificacao final

Antes do commit, confirme:

- `docs/CONTEXTO_ATUAL.md` reflete o estado pos-mudanca
- nenhuma secao ficou contradizendo o codigo atual
- se a tarefa adicionou comando/script/config, ele esta documentado
