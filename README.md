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

Configure `GEMINI_API_KEY` e, opcionalmente, `GEMINI_MODEL` nas variáveis de ambiente para habilitar respostas gerais com Pesquisa Google. O grounding de pesquisa pode ter cobrança por consulta conforme o plano Google AI Studio. O Gemini recebe a pergunta atual e até seis mensagens recentes para manter o contexto. Evite enviar dados pessoais sensíveis. Para perguntas AWS, o Gemini opcional só pode reformular informações encontradas nos diagnósticos publicados e nas fontes oficiais cadastradas. A Navi não acessa a conta AWS do usuário. Sem a chave, a Navi continua funcionando para AWS no modo local e informa que a conversa geral está indisponível.

O histórico completo do chat fica somente na `sessionStorage` da aba atual, limitado às 40 mensagens mais recentes: permanece ao fechar e reabrir a Navi ou recarregar a página, e é removido quando a aba é fechada. A cada pergunta, até seis mensagens recentes podem ser enviadas à API para resolver acompanhamentos; enquanto a Navi esclarece uma dúvida, o estado inclui um resumo limitado a 1.800 caracteres. O servidor não persiste as mensagens. O endpoint existente armazena avaliações com tema e motivo, sem o texto da conversa; a preferência de resposta (por exemplo, explicar de forma mais simples) fica na `sessionStorage` e somente esse valor controlado é enviado nas próximas chamadas e ao Gemini para orientar a geração, quando configurado. Isso não altera os pesos do Gemini. Com Gemini configurado, o contexto também pode ser encaminhado ao provedor para gerar a resposta. Perguntas gerais podem ser enviadas à Pesquisa Google. Perguntas sobre o tempo enviam ao Open-Meteo somente a localidade informada; a data e hora usam o fuso do dispositivo.
Durante a conversa, o painel mantém a mensagem mais recente visível, rola até o fim após cada nova mensagem e se ajusta à área visível quando o teclado móvel é aberto.

Cumprimentos simples são reconhecidos e respondidos localmente, sem depender do Gemini, com um convite para a pessoa dizer como a Navi pode ajudar. Se a mensagem combinar uma saudação com uma dúvida, ela segue para o fluxo normal da pergunta. Perguntas gerais usam o Gemini com grounding do Google Search e fontes quando disponível, com temperatura zero. O modo geral não fornece instruções ou dados específicos de AWS. Perguntas AWS continuam restritas ao fluxo de diagnósticos publicados e informações validadas no catálogo.

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
- Avaliação útil/não útil para ajudar a revisar as respostas; em uma resposta negativa, o motivo também orienta a regeneração e define o estilo das próximas respostas da mesma aba. A preferência não treina os pesos do modelo e o feedback não inclui o texto da conversa.
- Botão para repetir uma pergunta quando a API falhar.
- Estado visual enquanto a Navi consulta os diagnósticos.
- Detecção de consultas ambíguas entre vários serviços.
- Perguntas de esclarecimento quando a mensagem não informa o serviço, o objetivo ou detalhes suficientes; a Navi aguarda contexto em vez de escolher um diagnóstico por suposição.
- Para custos, a Navi conduz a conversa por etapas — serviço, item da cobrança e situação específica — antes de consultar os diagnósticos publicados.
- Comparações explícitas entre dois serviços publicados usam apenas os contextos do catálogo e exibem as fontes oficiais cadastradas; para mais de dois serviços, a Navi pede que o usuário escolha dois.

Para evitar respostas AWS sem validação, perguntas que mencionam AWS, Amazon Web Services ou nomes reconhecidos de serviços seguem somente pelo fluxo de diagnósticos. O contexto fechado do banco validado é a única fonte de fatos que o Gemini pode usar; perguntas anteriores do usuário podem ser enviadas apenas para resolver referências, nunca como evidência. Título, resumo, etapas, correspondência e documentação continuam vinculados ao PostgreSQL do FinSlash. Se não houver diagnóstico confiável, o sistema informa a ausência em vez de inventar uma causa.

Nas consultas com diagnóstico encontrado, a mensagem digitada é enviada ao Gemini junto de um contexto fechado contendo o diagnóstico, suas etapas e as fontes AWS cadastradas. A resposta textual exibida no chat é gerada pelo modelo, mas metadados, correspondência, documentos e campos técnicos continuam vindo do banco validado. Se a geração falhar, a Navi mantém a resposta local validada e suas fontes oficiais; perguntas gerais sem citações confiáveis não são respondidas como fatos.

A busca reconhece serviços e termos como EC2, S3, RDS, Lambda, CloudWatch, IAM, CloudFront, EBS, EKS, ECS, DynamoDB, NAT Gateway, AWS Budgets e Cost Explorer. O ranking considera correspondência com o serviço, título, resumo, slug e etapas cadastradas. A resposta principal vem acompanhada de até dois diagnósticos relacionados e sugestões da mesma área.

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
  "confianca": 0.85,
  "resultados": [],
  "sugestoes": []
}
```

Perguntas gerais seguem para o Gemini com grounding do Google Search e só são exibidas quando a pesquisa retorna ao menos uma fonte confiável; nesse caso, usam `fonte: "gemini-geral-busca"` e incluem as citações em `sources`. Sem fontes retornadas, a Navi informa que não pode confirmar a resposta. Data e hora são calculadas no servidor pelo fuso informado. Perguntas sobre o clima pedem a cidade, consultam os dados meteorológicos do Open-Meteo e retornam `fonte: "open-meteo"` com atribuição ao provedor. O uso da API gratuita do Open-Meteo é apropriado para este projeto acadêmico não comercial e exige atribuição conforme CC BY 4.0. Sem a chave Gemini, perguntas gerais informam que esse modo está indisponível. Perguntas AWS nunca usam esse fluxo geral: se estiverem ambíguas, o endpoint pede contexto com `fonte: "pergunta_ambigua"`; se não houver diagnóstico confiável, retorna uma orientação segura com `encontrado: false` e até três sugestões. O servidor não persiste as perguntas; o navegador mantém o histórico temporariamente na sessão da aba atual.

A Navi usa `DATABASE_URL` e `ALLOWED_ORIGIN`, já necessárias pela API existente. As avaliações rápidas reutilizam o endpoint de feedback existente e seus limites antispam. A interface usa `window.FINSLASH_API_BASE_URL` e não fixa uma URL externa. O modo `file://` mostra instruções para abrir o projeto pela API ou pela publicação na Vercel.

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
- O feedback é enviado sem cadastro e não coleta dados pessoais além da mensagem.
- Personagem, buscas recentes e histórico ficam armazenados localmente no navegador.
- As imagens e animações podem estar sujeitas a direitos autorais de terceiros.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE).
