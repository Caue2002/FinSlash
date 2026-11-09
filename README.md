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
- Barra inferior com atalhos para o menu, pesquisa de serviços e perfil; navegação de retorno compatível com dispositivos móveis.
- Botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

A interface não requer compilação. Para explorar as telas, abra `index.html` no navegador. Para usar diagnósticos e feedback, a API requer Node.js e PostgreSQL configurados.

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
└── imagens/                # Imagens e animações
```

## Observações

- O projeto possui 48 serviços AWS com 21 tópicos cada (1.008 diagnósticos) cadastrados no PostgreSQL.
- A tela de diagnóstico aparece dentro dos detalhes dos tópicos. Todos os 1.008 tópicos têm roteiro no banco; a API responde com HTTP 404 apenas para slugs inválidos.
- O feedback é enviado sem cadastro e não coleta dados pessoais além da mensagem.
- Personagem, buscas recentes e histórico ficam armazenados localmente no navegador.
- As imagens e animações podem estar sujeitas a direitos autorais de terceiros.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE).
