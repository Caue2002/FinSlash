# FinSlash

FinSlash é um projeto acadêmico de portfólio com uma interface interativa para explorar serviços da Amazon Web Services (AWS). A pessoa usuária escolhe um personagem e, em seguida, pode navegar pelos cartões de serviços e pesquisar serviços pelo nome.

## Funcionalidades

- Seleção entre 18 personagens, cada um com imagem, cor e animação de comemoração.
- Cartões com efeitos de brilho e cores personalizadas.
- Tela de serviços com cartões ilustrados e pesquisa por nome.
- Buscas recentes e retomada do personagem escolhido pelo avatar e botão Continuar no menu, salvas no navegador.
- Perfil com histórico de serviços, medalhas e uma área reservada para feedback futuro.
- Visualização ampliada de um serviço selecionado.
- Barra inferior com atalhos para o menu, pesquisa de serviços e perfil; navegação de retorno compatível com dispositivos móveis.
- Botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

O projeto não requer compilação nem instalação de dependências. Abra `index.html` no navegador para explorar a interface. Para usar o microfone, acesse por um contexto seguro: HTTPS ou `localhost`. A busca por voz também depende de um navegador compatível, como Chrome ou Edge, das permissões do microfone e da conexão com o serviço de reconhecimento de fala.

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
├── LICENSE                 # Tradução informativa da licença MIT
├── README.md               # Documentação do projeto
└── imagens/
    ├── logo.webp           # Logotipo otimizado sem perdas
    ├── personagem*.webp    # Imagens otimizadas sem perdas
    ├── gif*.gif            # Animações dos personagens
    └── servicos/           # Ícones dos serviços otimizados sem perdas
```

Os arquivos PNG e JPEG originais são mantidos; a interface usa versões WebP sem perdas para reduzir o carregamento.

## Observações

- Os nomes e ícones dos serviços são usados para fins de navegação e demonstração. A integração com uma API de diagnóstico ainda não está implementada.
- Personagem, buscas recentes e histórico ficam armazenados localmente no navegador e podem ser apagados ao limpar os dados do site.
- O envio de feedback está temporariamente desativado; será integrado junto com a futura API e o banco de dados.
- As imagens, ilustrações e animações podem estar sujeitas a direitos autorais ou licenças de terceiros. A licença MIT do código deste projeto não concede direitos adicionais sobre esses materiais.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE). A tradução nele contida é informativa.
