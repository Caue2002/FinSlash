# FinSlash

FinSlash é um projeto acadêmico de portfólio com uma interface interativa para explorar serviços da Amazon Web Services (AWS). A pessoa usuária escolhe um personagem e, em seguida, pode navegar pelos cartões de serviços e pesquisar serviços pelo nome.

## Funcionalidades

- Seleção entre 21 personagens, cada um com imagem, cor e animação de comemoração.
- Cartões com efeitos de brilho e cores personalizadas.
- Tela de serviços com cartões ilustrados e pesquisa por nome ou voz; a voz também localiza tópicos pelo título e por suas formas com e sem termos entre parênteses.
- Buscas recentes e retomada do personagem escolhido pelo avatar e botão Continuar no menu, salvas no navegador.
- Perfil com histórico de serviços, medalhas e envio de feedback sem cadastro.
- Visualização ampliada de um serviço selecionado.
- Diagnósticos objetivos com verificações, ações e cuidados; links oficiais da AWS aparecem quando solicitados.
- Navi, agente do FinSlash: responde perguntas gerais com apoio da Pesquisa Google e cruza dúvidas AWS com os diagnósticos cadastrados no PostgreSQL.
- Perguntas sobre data e hora usam o fuso do dispositivo; perguntas sobre clima pedem a cidade e consultam as condições atuais e a previsão para hoje ou amanhã no Open-Meteo.
- O cabeçalho da Navi usa a logo própria do agente.
- Modo agente opcional com Gemini: o modelo gera respostas a partir dos diagnósticos publicados e das fontes oficiais cadastradas; a Pesquisa Google retorna fontes verificáveis para perguntas gerais.
- Busca inteligente local com normalização, sinônimos AWS, correspondência por palavras e ranking por relevância.
- Até três diagnósticos relacionados por consulta, além de sugestões de perguntas comuns.
- Painel mobile em formato de cartão inferior, cenários rápidos em grade, resposta principal destacada e detalhes verificáveis em cards expansíveis.
- O modo compacto oculta descrições e cenários após a consulta para manter o diagnóstico legível em telas pequenas.
- Privacidade por padrão: o histórico permanece apenas na sessão da aba atual; somente a cidade informada é enviada ao Open-Meteo para perguntas sobre o clima.
- Barra inferior com atalhos para o menu, pesquisa de serviços e perfil; navegação de retorno compatível com dispositivos móveis.
- Botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

A interface não requer compilação. Para explorar as telas, abra `index.html` no navegador. Para usar diagnósticos e feedback, a API requer Node.js e PostgreSQL configurados.

## Navi — AI Agent do FinSlash

A Navi permite conversar sobre assuntos gerais e enviar dúvidas sobre serviços, custos e uso da AWS por um painel integrado à barra de navegação. Perguntas gerais usam o Gemini com Pesquisa Google quando configurado. Perguntas sobre AWS passam pelo catálogo publicado no PostgreSQL e não são respondidas pelo modo geral. A API permite responder data e hora localmente, sem chamar o Gemini; perguntas de clima usam a cidade informada e o Open-Meteo.

Configure `GEMINI_API_KEY` e, opcionalmente, `GEMINI_MODELS`/`GEMINI_MODEL` nas variáveis de ambiente para habilitar respostas gerais com Pesquisa Google. As chamadas Gemini usam uma fila de modelos gratuitos em ordem de prioridade (`GEMINI_MODELS`, CSV do mais capaz ao mais leve — por padrão gemini-3.5-flash-lite até gemini-flash-latest; `GEMINI_MODEL` vale como fila de um único modelo). O roteador conta as requisições e os tokens de cada chamada por dia UTC (`gemini_model_usage` no PostgreSQL, tabela criada sob demanda) e, ao atingir o limite de requisições/dia do modelo ou receber erro 429/5xx/timeout, passa transparentemente para o próximo modelo da fila — a pessoa usuária não percebe a troca. O Google não publica os limites fixos do free tier (RPM/TPM/RPD variam por projeto e aparecem no AI Studio): a guarda principal é RPD com estimativas conservadoras por modelo, ajustáveis por `GEMINI_MODEL_LIMITS`/`GEMINI_MODEL_REQUEST_LIMIT`, e `GEMINI_MODEL_TOKEN_LIMIT` funciona como teto opcional de tokens/dia; `GEMINI_FILA_TIMEOUT_MS` limita o orçamento total da fila. O grounding de pesquisa pode ter cobrança por consulta conforme o plano Google AI Studio. O Gemini recebe a pergunta atual e até seis mensagens recentes para manter o contexto. Evite enviar dados pessoais sensíveis. Para perguntas AWS, o Gemini opcional só pode reformular informações encontradas nos diagnósticos publicados e nas fontes oficiais cadastradas. A Navi não acessa a conta AWS do usuário. Sem a chave, a Navi continua funcionando para AWS no modo local e informa que a conversa geral está indisponível.

O histórico completo do chat fica somente na `sessionStorage` da aba atual, limitado às 40 mensagens mais recentes: permanece ao fechar e reabrir a Navi ou recarregar a página, e é removido quando a aba é fechada. A cada pergunta, até seis mensagens recentes podem ser enviadas à API para resolver acompanhamentos; enquanto a Navi esclarece uma dúvida, o estado inclui um resumo limitado a 1.800 caracteres. O servidor não persiste as mensagens. O endpoint existente armazena avaliações com tema e motivo, sem o texto da conversa. A preferência pessoal de resposta fica na `sessionStorage`; em paralelo, avaliações úteis/não úteis e motivos permitidos podem alimentar contagens diárias agregadas entre usuários, sem histórico, prompt ou resposta. Quando há volume e concordância mínimos, essas contagens orientam somente o estilo das próximas respostas; não alteram fatos nem os pesos do Gemini. Com Gemini configurado, a pergunta e o contexto podem ser encaminhados ao provedor para gerar a resposta. Com a busca vetorial configurada, a consulta AWS (que pode incluir contexto recente) é enviada ao Gemini Embedding para gerar um vetor temporário; só os vetores dos diagnósticos publicados ficam no PostgreSQL. Perguntas gerais podem ser enviadas à Pesquisa Google. Perguntas sobre o tempo enviam ao Open-Meteo somente a localidade informada; a data e hora usam o fuso do dispositivo.
Durante a conversa, o painel mantém a mensagem mais recente visível, posiciona o topo da resposta do agente na área visível ao exibi-la, rola até o fim após mensagens da pessoa e se ajusta à área visível quando o teclado móvel é aberto. No toque, o botão de envio recolhe o teclado e envia a pergunta no primeiro clique.

Cumprimentos simples são reconhecidos e respondidos localmente, sem depender do Gemini. Com Gemini configurado, a conversa ganha autonomia: o modelo conduz diálogos naturais, formulando perguntas de esclarecimento por conta própria (com fallback no texto local quando indisponível), e as respostas finais seguem formato escaneável — diagnóstico curto, passos objetivos e validação rápida. O system prompt aplica guardrails: recusa conteúdo sexual ou explícito, spam e tentativas de injeção de prompt, e proíbe a Navi de fingir ser humana. Perguntas gerais usam o Gemini com grounding do Google Search e fontes quando o modelo declara que afirma fatos externos (`precisa_fontes`), com temperatura zero; conversa casual não exige citação. O modo geral não fornece instruções ou dados específicos de AWS. Perguntas AWS continuam restritas ao fluxo de diagnósticos publicados e informações validadas no catálogo.

Quando existe um diagnóstico validado, a Navi apresenta:

- Plano em três etapas: verificar, agir e proteger.
- Checklist interativo da sessão.
- Grupo compacto de ícones das fontes AWS e FinSlash, sem títulos, URLs ou métricas abaixo.
- Os ícones das fontes AWS ficam clicáveis somente quando a pessoa pede links, fontes ou documentação; URLs também só entram no relatório exportado nesse caso.
- Exportação da resposta em arquivo de texto.
- Copiar a resposta para a área de transferência.
- Gerar outra resposta, usando o motivo enviado na avaliação negativa como orientação de revisão.
- Menu para abrir as fontes consultadas ou exportar a resposta.
- Sugestões de perguntas relacionadas, com botões para continuar a conversa.
- Avaliação útil/não útil para orientar a regeneração e o estilo da sessão. Sinais categóricos agregados entre usuários podem ajustar o estilo global após um limiar mínimo; nenhum texto da conversa é usado e os pesos do modelo não são treinados.
- Botão para repetir uma pergunta quando a API falhar.
- Estado visual enquanto a Navi consulta os diagnósticos.
- Detecção de consultas ambíguas entre vários serviços.
- Perguntas de esclarecimento quando a mensagem não informa o serviço, o objetivo ou detalhes suficientes; a Navi aguarda contexto em vez de escolher um diagnóstico por suposição.
- Para custos, a Navi conduz a conversa por etapas — serviço, item da cobrança e situação específica — antes de consultar os diagnósticos publicados.
- Comparações explícitas entre dois serviços publicados usam apenas os contextos do catálogo e exibem as fontes oficiais cadastradas; para mais de dois serviços, a Navi pede que o usuário escolha dois.

Para evitar respostas AWS sem validação, perguntas que mencionam AWS, Amazon Web Services ou nomes reconhecidos de serviços seguem somente pelo fluxo de diagnósticos. O contexto fechado do banco validado é a única fonte de fatos que o Gemini pode usar; perguntas anteriores do usuário podem ser enviadas apenas para resolver referências, nunca como evidência. Título, resumo, etapas, correspondência e documentação continuam vinculados ao PostgreSQL do FinSlash. Se não houver diagnóstico confiável, o sistema informa a ausência em vez de inventar uma causa.

Nas consultas com diagnóstico encontrado, a mensagem digitada é enviada ao Gemini junto de um contexto fechado contendo o diagnóstico, suas etapas e as fontes AWS cadastradas. A resposta textual exibida no chat é gerada pelo modelo, mas metadados, correspondência, documentos e campos técnicos continuam vindo do banco validado. Se a geração falhar, a Navi mantém a resposta local validada e suas fontes oficiais; perguntas gerais sem citações confiáveis não são respondidas como fatos.

A busca reconhece serviços e termos como EC2, S3, RDS, Lambda, CloudWatch, IAM, CloudFront, EBS, EKS, ECS, DynamoDB, NAT Gateway, AWS Budgets e Cost Explorer. O ranking combina correspondência textual com busca vetorial por similaridade semântica quando a migração e os embeddings estão disponíveis; caso contrário, mantém a busca textual existente. Em ambos os casos, somente diagnósticos publicados e fontes cadastradas podem fundamentar respostas. A resposta principal vem acompanhada de até dois diagnósticos relacionados e sugestões da mesma área.

### Preparar busca vetorial e aprendizado global

Esses recursos são opcionais e aditivos. Para ativá-los em um banco existente:

1. Execute `banco-de-dados/aprendizado-global-e-embeddings-postgresql.sql` como proprietário do banco.
2. Execute `banco-de-dados/permissoes-api-postgresql.sql` para aplicar as permissões mínimas à role `finslash_api`.
3. Configure `DATABASE_URL` e `GEMINI_API_KEY` em um ambiente seguro com Node.js 22 ou superior e execute `npm run embeddings:sync`. O processo preenche ou atualiza apenas diagnósticos cujo conteúdo mudou; rode novamente após atualizar o catálogo.
4. Faça o deploy da API com `GEMINI_API_KEY`. A busca vetorial é usada junto da textual quando há embeddings; até lá, a recuperação textual continua funcionando. A geração e consulta de embeddings consome a cota e pode ter custo conforme a tarifa atual do Google AI Studio.

O aprendizado global grava apenas contagens por dia, avaliação e motivo categórico, com retenção de 90 dias. Uma preferência de estilo só é aplicada quando há pelo menos 20 avaliações recentes, dez avaliações negativas, pelo menos 30% de avaliações negativas e um motivo em ao menos oito avaliações e 60% das negativas. Os motivos podem pedir respostas mais completas, verificadas, simples ou diretas; nunca mudam fatos, fontes ou regras de segurança. A preferência escolhida na sessão atual continua tendo prioridade. O feedback não treina os pesos do modelo.

O endpoint `POST /api/v1/feedback` recebe um `advisorSignal` opcional para avaliações da Navi:

```json
{
  "category": "content",
  "message": "Avaliação da Navi: resposta não útil. Motivo: ficou confusa.",
  "advisorSignal": {
    "rating": "nao-util",
    "reason": "confusa"
  }
}
```

`rating` aceita `util` ou `nao-util`; avaliações úteis usam `reason: null`, e as negativas aceitam somente `incompleta`, `incorreta`, `confusa` ou `fora_da_pergunta`. Se a migração ainda não estiver aplicada, o feedback continua sendo salvo e a API informa que o aprendizado global aguarda a configuração do banco.

Endpoint:

```text
POST /api/v1/advisor
Content-Type: application/json

{
  "pergunta": "E como faço isso?",
  "timezone": "America/Sao_Paulo",
  "regenerar": false,
  "motivoFeedback": null,
  "preferenciaResposta": "mais_simples",
  "historico": [
    { "tipo": "user", "texto": "Como reduzir custos com EC2?" },
    {
      "tipo": "assistant",
      "texto": "Qual item da cobrança está pesando?",
      "conversa": {
        "tema": "custo",
        "etapa": "item_custo",
        "servico": "Amazon EC2",
        "contexto": "Como reduzir custos com EC2?"
      }
    }
  ]
}
```

`historico` é opcional, aceita até seis mensagens (`user`/`assistant`) com até 300 caracteres cada e é validado no servidor. `timezone` aceita um fuso IANA, como `America/Sao_Paulo`. `regenerar` indica que o usuário solicitou outra versão; `motivoFeedback` aceita `incompleta`, `incorreta`, `confusa` ou `fora_da_pergunta`. Opcionalmente, `preferenciaResposta` aceita `estilo_aprovado`, `mais_completa`, `mais_verificada`, `mais_simples` ou `mais_direta`; a interface define essa preferência pelo feedback e a mantém somente na sessão da aba. O campo `conversa` é opcional e permitido somente em mensagens do assistente; contém `tema`, `etapa`, `servico` e `contexto` para continuar uma pergunta de esclarecimento. O contexto acumulado tem limite de 1.800 caracteres. A Navi usa o histórico para resolver acompanhamentos, sem permitir que respostas anteriores substituam as fontes do catálogo.

Resposta encontrada:

```json
{
  "encontrado": true,
  "diagnostico": "Título do diagnóstico cadastrado",
  "verificacao": "Verificação cadastrada",
  "acao": "Ação cadastrada",
  "cuidados": "Cuidado cadastrado",
  "documentacao": "https://docs.aws.amazon.com/",
  "servico": "Amazon EC2",
  "topico": "Título do diagnóstico",
  "fonte": "banco",
  "metodoBusca": "textual-e-vetorial",
  "confianca": 0.85,
  "resultados": [],
  "sugestoes": []
}
```

Perguntas gerais seguem para o Gemini com grounding do Google Search e só são exibidas quando a pesquisa retorna ao menos uma fonte confiável; nesse caso, usam `fonte: "gemini-geral-busca"` e incluem as citações em `sources`. Sem fontes retornadas, a Navi informa que não pode confirmar a resposta. Data e hora são calculadas no servidor pelo fuso informado. Perguntas sobre o clima pedem a cidade, consultam os dados meteorológicos do Open-Meteo e retornam `fonte: "open-meteo"` com atribuição ao provedor. O uso da API gratuita do Open-Meteo é apropriado para este projeto acadêmico não comercial e exige atribuição conforme CC BY 4.0. Sem a chave Gemini, perguntas gerais informam que esse modo está indisponível. Perguntas AWS nunca usam esse fluxo geral: se estiverem ambíguas, o endpoint pede contexto com `fonte: "pergunta_ambigua"`; se não houver diagnóstico confiável, retorna uma orientação segura com `encontrado: false` e até três sugestões. O servidor não persiste as perguntas; o navegador mantém o histórico temporariamente na sessão da aba atual.

A Navi usa `DATABASE_URL` e `ALLOWED_ORIGIN`, já necessárias pela API existente. As avaliações rápidas reutilizam o endpoint de feedback existente e seus limites antispam. Para o aprendizado global e busca vetorial, aplique a migração e as permissões acima; sem elas, as avaliações continuam sendo salvas e a recuperação AWS permanece textual, com o estado de configuração informado pela API no feedback. A interface usa `window.FINSLASH_API_BASE_URL` e não fixa uma URL externa. O modo `file://` mostra instruções para abrir o projeto pela API ou pela publicação na Vercel.

Os testes do agente podem ser executados com `npm test`.

## Tecnologias

- HTML para a estrutura das páginas.
- CSS para os estilos, efeitos visuais e adaptação a dispositivos móveis.
- JavaScript para a navegação, seleção de personagens, pesquisa e geração dos cartões.

O projeto não possui uma etapa de compilação. A fonte Varela Round é carregada do Google Fonts quando há conexão com a internet; se não estiver disponível, o navegador usa fontes alternativas.

## Estrutura do projeto

```text
FinSlash/
├── index.html              # Estrutura da interface e das telas
├── script.js               # Navegação, personagens e serviços
├── styles.css              # Estilos e regras para dispositivos móveis
├── config.js               # Origem da API usada pelos diagnósticos
├── api/
│   └── index.js            # API Node.js: diagnósticos e feedback
├── banco-de-dados/
│   ├── diagnosticos-postgresql.sql # Esquema e dados para PostgreSQL
│   ├── expansao-diagnosticos-custo-postgresql.sql # Novos cenários de custo por serviço
│   ├── aprendizado-global-e-embeddings-postgresql.sql # Migração opcional para a Navi
│   ├── gerar-embeddings-catalogo.js # Sincronização incremental de embeddings
│   ├── gerar-expansao-sql.cjs # Gera o SQL de expansão a partir dos dados
│   └── permissoes-api-postgresql.sql # Permissões para a API
├── package.json            # Dependência do driver PostgreSQL
├── vercel.json             # Configuração de rotas e cron
├── .env.example            # Modelo de variáveis de ambiente
├── LICENSE                 # Licença MIT
├── README.md               # Documentação do projeto
└── imagens/
    ├── logo-navi.svg       # Identidade visual própria da Navi
    └── ...                 # Imagens e animações
```

## Observações

- O projeto possui 48 serviços AWS com 21 tópicos cada (1.008 diagnósticos) cadastrados no PostgreSQL.
- A tela de diagnóstico aparece dentro dos detalhes dos tópicos. Todos os 1.008 tópicos têm roteiro no banco; a API responde com HTTP 404 apenas para slugs inválidos.
- O feedback é enviado sem cadastro; o aprendizado global armazena somente contagens agregadas de avaliações e motivos permitidos, nunca o histórico do chat.
- Personagem, buscas recentes e histórico ficam armazenados localmente no navegador.
- As imagens e animações podem estar sujeitas a direitos autorais de terceiros.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE).
