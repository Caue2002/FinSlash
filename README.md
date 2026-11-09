# FinSlash

FinSlash é um projeto acadêmico de portfólio com uma interface interativa para explorar serviços da Amazon Web Services (AWS). A pessoa usuária escolhe um personagem e, em seguida, pode navegar pelos cartões de serviços e pesquisar serviços pelo nome.

## Funcionalidades

- Seleção entre 21 personagens, cada um com imagem, cor e animação de comemoração.
- Cartões com efeitos de brilho e cores personalizadas.
- Tela de serviços com cartões ilustrados e pesquisa por nome ou voz; a voz também localiza tópicos pelo título e por suas formas com e sem termos entre parênteses.
- Buscas recentes e retomada do personagem escolhido pelo avatar e botão Continuar no menu, salvas no navegador.
- Perfil com histórico de serviços, medalhas e envio de feedback sem cadastro.
- Visualização ampliada de um serviço selecionado.
- Diagnósticos objetivos com verificações, ações, cuidados e links para documentação oficial da AWS (quando o roteiro estiver cadastrado).
- Barra inferior com atalhos para o menu, pesquisa de serviços e perfil; navegação de retorno compatível com dispositivos móveis.
- Botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

A interface não requer compilação. Para explorar somente as telas, abra `index.html` no navegador. A API e o feedback precisam de Node.js, dependências, PostgreSQL e variáveis de ambiente; veja as instruções de desenvolvimento abaixo. Para usar o microfone, acesse por HTTPS ou `localhost`. A busca por voz também depende de um navegador compatível, das permissões do microfone e da conexão com o serviço de reconhecimento de fala.

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
│   └── index.js            # API Node.js: diagnósticos, feedback e limpeza
├── banco-de-dados/
│   ├── diagnosticos-postgresql.sql # Esquema e dados iniciais para PostgreSQL
│   └── permissoes-api-postgresql.sql # Permissões mínimas para a API
├── package.json            # Dependência do driver PostgreSQL da API
├── vercel.json             # Rotas da API e limpeza diária dos limites
├── .env.example            # Modelo de variáveis locais (sem segredos reais)
├── LICENSE                 # Tradução informativa da licença MIT
├── README.md               # Documentação do projeto
└── imagens/
    ├── logo.webp           # Logotipo otimizado sem perdas
    ├── personagem*.webp    # Imagens otimizadas sem perdas
    ├── gif*.gif            # Animações dos personagens
    └── servicos/           # Ícones dos serviços otimizados sem perdas
```

Os arquivos PNG e JPEG originais são mantidos; a interface usa versões WebP sem perdas para reduzir o carregamento.

A estrutura separa o código do handler em `api/` dos scripts SQL em `banco-de-dados/`. Os arquivos de configuração ficam na raiz porque a Vercel e o npm os procuram nesse local; `config.js` ajusta a origem usada pelo navegador e `.env.example` é apenas um modelo, sem segredos. Não é necessário criar pastas extras para hospedar esta primeira versão.

## Observações

- Os nomes e ícones dos serviços são usados para fins de navegação e demonstração. A interface atualmente mostra 21 tópicos para cada um dos 48 serviços (1.008 tópicos); vinte e dois diagnósticos com referências oficiais estão cadastrados no PostgreSQL e são servidos pelo endpoint Node.js.
- A tela de diagnóstico aparece dentro dos detalhes dos tópicos. Para os outros 986 tópicos sem roteiro no banco, a API responde com HTTP 404; o conteúdo não é substituído por recomendações genéricas. Portanto, a cobertura diagnóstica ainda não está completa para publicação como catálogo abrangente.
- `banco-de-dados/diagnosticos-postgresql.sql` cria as tabelas normalizadas e insere os roteiros iniciais. Execute o arquivo no PostgreSQL antes de publicar a API. Os dados incluem verificações, ações, cuidados e URLs oficiais da AWS.
- A API é `GET /api/v1/services/:serviceSlug/scenarios/:scenarioSlug`. A resposta contém `summary`, `steps` (`check`, `action` ou `caution`) e `sources`. A consulta usa parâmetros SQL e retorna apenas roteiros publicados.
- O feedback é enviado por `POST /api/v1/feedback` com apenas `category` (`suggestion`, `issue` ou `content`) e `message` (10 a 1000 caracteres). Ele não pede login, nome ou e-mail e não oferece uma rota pública para ler as mensagens. Para revisar, use o painel privado do PostgreSQL, por exemplo: `SELECT category, message, submitted_at FROM feedback_entries ORDER BY submitted_at DESC LIMIT 50;`.
- A API usa um único Web Handler da Vercel, com roteamento explícito em `vercel.json`. A conexão PostgreSQL é criada sob demanda, limitada a duas conexões por instância e exige TLS com validação do certificado. Parâmetros TLS na `DATABASE_URL` são ignorados para impedir que desativem essa proteção; são aceitos certificados confiáveis pelo armazenamento padrão do Node.js. Bancos que exigem CA ou certificado de cliente personalizados precisam de configuração TLS explícita antes de serem usados.
- O endpoint de feedback valida a origem configurada, JSON, categoria, tamanho e caracteres; usa parâmetros SQL, limita envios a 5 por IP a cada hora e armazena somente um HMAC por janela, nunca o IP em texto claro. Uma tarefa agendada da Vercel remove esses hashes expirados diariamente. O texto submetido fica no PostgreSQL até ser removido pelo responsável; apague mensagens antigas depois de avaliá-las.
- O limite por IP depende do cabeçalho `X-Forwarded-For` fornecido pelo proxy de confiança do Vercel. A documentação do Vercel informa que ele sobrescreve esse cabeçalho para evitar falsificação de IP. Se o endpoint for movido para outro provedor, valide como o proxy define esse cabeçalho; se não houver IP confiável, a API falha fechado.
- Nenhum sistema público sem login é imune a spam ou abuso. Configure também limitação de tráfego no firewall/WAF do provedor, monitore consumo de funções e conexões do PostgreSQL e restrinja o usuário do banco às permissões mínimas. A mensagem livre pode conter dados pessoais mesmo com o aviso; não publique informações enviadas nem credenciais do banco.
- Referência de recursos gratuitos consultada em 08/11/2026: o plano Hobby da Vercel documenta até 2 GB de memória por função; o plano Free da Neon inclui 100 CU-horas e 1 GB de armazenamento por projeto, suspende o compute após 5 minutos sem atividade e permite autoscaling de até 2 CU (8 GB de memória). São limites e cotas diferentes: o teto de memória não garante que as cotas mensais gratuitas bastem para qualquer tráfego, e os planos podem mudar. A API limita cada pool a duas conexões por instância; em produção serverless, use a URL de conexão com pooler do provedor e acompanhe compute, armazenamento, transferência e conexões no painel. As medições locais não substituem o monitoramento da hospedagem real. Consulte os limites atuais da [Vercel](https://vercel.com/docs/functions/limitations#memory-size-limits) e os planos da [Neon](https://neon.com/docs/introduction/plans) antes de publicar.
- Antes da publicação, execute `diagnosticos-postgresql.sql` com o usuário administrador do PostgreSQL. Crie o login `finslash_api` com uma senha forte e execute `permissoes-api-postgresql.sql` como proprietário do banco para dar à API apenas leitura dos cenários, inclusão de feedback e manutenção dos limites.
- Configure `DATABASE_URL`, `ALLOWED_ORIGIN` (origem exata com HTTPS, sem caminho), `RATE_LIMIT_SECRET` e `CRON_SECRET` (segredos aleatórios distintos, cada um com pelo menos 32 caracteres) nas variáveis de ambiente da Vercel. Publique a API e a interface no mesmo domínio; se usar outro domínio para a API, defina também `window.FINSLASH_API_BASE_URL` com sua URL base. Para enviar feedback em uma URL de preview, configure `ALLOWED_ORIGIN` no ambiente Preview com a origem exata desse preview ou use um domínio de preview estável; não use curingas. A limpeza dos limites usa um Cron Job diário da Vercel, autenticado com `CRON_SECRET`.
- Para desenvolvimento local, copie `.env.example` para `.env.local`, configure um PostgreSQL de teste e use uma origem `http://localhost:<porta>` em `ALLOWED_ORIGIN`. Para testar sem publicar, instale/autentique a CLI da Vercel e execute `npx vercel dev`; abrir `index.html` diretamente não inicia a API.
- Instale as dependências da API com `npm install`. O front-end continua sem etapa de compilação.
- Personagem, buscas recentes e histórico ficam armazenados localmente no navegador e podem ser apagados ao limpar os dados do site.
- `banco-de-dados/diagnosticos-postgresql.sql` é idempotente para as tabelas e roteiros iniciais e cria também as tabelas de feedback e controle de envios.
- As imagens, ilustrações e animações podem estar sujeitas a direitos autorais ou licenças de terceiros. A licença MIT do código deste projeto não concede direitos adicionais sobre esses materiais.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE). A tradução nele contida é informativa.
