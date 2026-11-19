# FinSlash

FinSlash é um projeto acadêmico de portfólio com uma interface interativa para explorar serviços da Amazon Web Services (AWS). A pessoa usuária escolhe um personagem e, em seguida, pode navegar pelos cartões de serviços e pesquisar serviços pelo nome.

## Funcionalidades

- Seleção entre 21 personagens, cada um com imagem, cor e animação de comemoração.
- Cartões com efeitos de brilho e cores personalizadas.
- Tela de serviços com cartões ilustrados e pesquisa por nome ou voz; a voz também localiza tópicos pelo título e por suas formas com e sem termos entre parênteses.
- Buscas recentes e retomada do personagem escolhido pelo avatar e botão Continuar no menu, salvas no navegador.
- Perfil com histórico de serviços, medalhas e envio de feedback sem cadastro.
- Visualização ampliada de um serviço selecionado.
- Diagnósticos objetivos com verificações, ações, cuidados e links para documentação oficial da AWS.
- Navi, agente gratuito que responde perguntas gerais e cruza dúvidas AWS com os diagnósticos cadastrados no PostgreSQL.
- O cabeçalho da Navi usa a logo própria do agente.
- Modo agente opcional com Gemini: o modelo gera respostas a partir dos diagnósticos publicados e das fontes oficiais cadastradas.
- Busca inteligente local com normalização, sinônimos AWS, correspondência por palavras e ranking por relevância.
- Até três diagnósticos relacionados por consulta, além de sugestões de perguntas comuns.
- Painel mobile em formato de cartão inferior, cenários rápidos em grade, resposta principal destacada e detalhes verificáveis em cards expansíveis.
- O modo compacto oculta descrições e cenários após a consulta para manter o diagnóstico legível em telas pequenas.
- Privacidade por padrão: sem `GEMINI_API_KEY`, perguntas gerais não são enviadas a IA externa; o histórico permanece apenas na sessão da aba atual.
- Barra inferior com atalhos para o menu, pesquisa de serviços e perfil; navegação de retorno compatível com dispositivos móveis.
- Botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

A interface não requer compilação. Para explorar as telas, abra `index.html` no navegador. Para usar diagnósticos e feedback, a API requer Node.js e PostgreSQL configurados.

## Navi

A Navi permite conversar sobre assuntos gerais e enviar dúvidas sobre serviços, custos e uso da AWS por um painel integrado à barra de navegação. Perguntas gerais usam o Gemini quando configurado. Perguntas sobre AWS passam pelo catálogo publicado no PostgreSQL e não são respondidas pelo modo geral.

Configure `GEMINI_API_KEY` e, opcionalmente, `GEMINI_MODEL` nas variáveis de ambiente para habilitar respostas gerais. Quando configurado, o Gemini recebe a pergunta; evite enviar dados pessoais sensíveis. Para perguntas AWS, o Gemini opcional só pode reformular informações encontradas nos diagnósticos publicados e nas fontes oficiais cadastradas. Sem a chave, a Navi continua funcionando para AWS no modo local e informa que a conversa geral está indisponível.

O histórico do chat fica somente na `sessionStorage` da aba atual: permanece ao fechar e reabrir a Navi ou recarregar a página, e é removido quando a aba é fechada. As mensagens não são enviadas ao servidor como histórico nem persistidas entre abas.

Saudações e perguntas gerais usam o Gemini quando disponível, com temperatura zero. O modo geral não fornece instruções ou dados específicos de AWS. Perguntas AWS continuam restritas ao fluxo de diagnósticos publicados e informações validadas no catálogo.

Quando existe um diagnóstico validado, a Navi apresenta:

- Plano em três etapas: verificar, agir e proteger.
- Checklist interativo da sessão.
- Fontes oficiais vinculadas ao cenário.
- Confiança baseada na correspondência com o catálogo.
- Exportação da resposta em arquivo de texto.
- Copiar a resposta para a área de transferência.
- Estado visual enquanto a Navi consulta os diagnósticos.
- Detecção de consultas ambíguas entre vários serviços.
- Perguntas de esclarecimento quando a mensagem não informa o serviço, o objetivo ou detalhes suficientes; a Navi aguarda contexto em vez de escolher um diagnóstico por suposição.
- Comparações explícitas entre dois serviços publicados usam apenas os contextos do catálogo e exibem as fontes oficiais cadastradas; para mais de dois serviços, a Navi pede que o usuário escolha dois.

Para evitar respostas AWS sem validação, perguntas que mencionam AWS, Amazon Web Services ou nomes reconhecidos de serviços seguem somente pelo fluxo de diagnósticos. O Gemini recebe apenas o contexto fechado do banco validado e pode reformular esses dados; título, resumo, etapas, confiança e documentação continuam vinculados ao PostgreSQL do FinSlash. Se não houver diagnóstico confiável, o sistema informa a ausência em vez de inventar uma causa.

Nas consultas com diagnóstico encontrado, a mensagem digitada é enviada ao Gemini junto de um contexto fechado contendo o diagnóstico, suas etapas e as fontes AWS cadastradas. A resposta textual exibida no chat é gerada pelo modelo, mas metadados, confiança, documentos e campos técnicos continuam vindo do banco validado.

A busca reconhece serviços e termos como EC2, S3, RDS, Lambda, CloudWatch, IAM, CloudFront, EBS, EKS, ECS, DynamoDB, NAT Gateway, AWS Budgets e Cost Explorer. O ranking considera correspondência com o serviço, título, resumo, slug e etapas cadastradas. A resposta principal vem acompanhada de até dois diagnósticos relacionados e sugestões da mesma área.

Endpoint:

```text
POST /api/v1/advisor
Content-Type: application/json

{"pergunta":"Estou gastando muito com EC2 ocioso"}
```

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

Perguntas gerais seguem para o Gemini quando configurado e retornam com `fonte: "gemini-geral"`; sem a chave, a API informa que esse modo está indisponível. Perguntas AWS nunca usam esse fluxo geral: se estiverem ambíguas, o endpoint pede contexto com `fonte: "pergunta_ambigua"`; se não houver diagnóstico confiável, retorna uma orientação segura com `encontrado: false` e até três sugestões. O servidor não persiste as perguntas; o navegador mantém o histórico temporariamente na sessão da aba atual.

A Navi usa `DATABASE_URL` e `ALLOWED_ORIGIN`, já necessárias pela API existente. A interface usa `window.FINSLASH_API_BASE_URL` e não fixa uma URL externa. O modo `file://` mostra instruções para abrir o projeto pela API ou pela publicação na Vercel.

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
