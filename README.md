# FinSlash

FinSlash é um projeto acadêmico de portfólio com uma interface interativa para explorar serviços da Amazon Web Services (AWS). A pessoa usuária escolhe um personagem e, em seguida, pode navegar pelos cartões de serviços e pesquisar serviços pelo nome.

## Funcionalidades

- Seleção entre 18 personagens, cada um com imagem, cor e animação de comemoração.
- Cartões com efeitos de brilho e cores personalizadas.
- Tela de serviços com cartões ilustrados e pesquisa por nome.
- Visualização ampliada de um serviço selecionado.
- Navegação de retorno compatível com dispositivos móveis: botão voltar do aparelho ou do navegador e gesto de arrastar para a direita.
- Interface adaptável a diferentes tamanhos de tela.

## Como executar

O projeto não requer compilação nem instalação de dependências. Abra o arquivo `index.html` em um navegador atualizado.

Para executar um servidor local, abra um terminal na pasta do projeto e inicie um servidor HTTP estático. Por exemplo, com Python instalado:

```text
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

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
    ├── logo.png            # Logotipo
    ├── personagem*.png     # Imagens dos personagens
    ├── personagem*.jpg     # Imagens adicionais dos personagens
    ├── gif*.gif            # Animações dos personagens
    └── servicos/           # Ícones dos serviços
```

## Observações

- Os nomes e ícones dos serviços são usados para fins de navegação e demonstração. A integração com uma API de diagnóstico ainda não está implementada.
- As imagens, ilustrações e animações podem estar sujeitas a direitos autorais ou licenças de terceiros. A licença MIT do código deste projeto não concede direitos adicionais sobre esses materiais.

## Licença

O código-fonte é distribuído sob os termos da licença MIT. Consulte o arquivo [LICENSE](./LICENSE). A tradução nele contida é informativa.
