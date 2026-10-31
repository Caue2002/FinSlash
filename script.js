// Dados dos 12 personagens com cores imagens e gifs
const personagens = [
    { cor: '#9ca3af', imagem: 'imagens/personagem1.png', gif: 'imagens/gif1.gif' },
    { cor: '#22c55e', imagem: 'imagens/personagem2.png', gif: 'imagens/gif2.gif' },
    { cor: '#1e40af', imagem: 'imagens/personagem3.png', gif: 'imagens/gif3.gif' },
    { cor: '#93c5fd', imagem: 'imagens/personagem4.png', gif: 'imagens/gif4.gif' },
    { cor: '#fa8072', imagem: 'imagens/personagem5.png', gif: 'imagens/gif5.gif' },
    { cor: '#ec4899', imagem: 'imagens/personagem6.png', gif: 'imagens/gif6.gif' },
    { cor: '#166534', imagem: 'imagens/personagem7.png', gif: 'imagens/gif7.gif' },
    { cor: '#fca5a5', imagem: 'imagens/personagem8.png', gif: 'imagens/gif8.gif' },
    { cor: '#fbbf24', imagem: 'imagens/personagem9.png', gif: 'imagens/gif9.gif' },
    { cor: '#dc2626', imagem: 'imagens/personagem10.png', gif: 'imagens/gif10.gif' },
    { cor: '#f97316', imagem: 'imagens/personagem11.png', gif: 'imagens/gif11.gif' },
    { cor: '#374151', imagem: 'imagens/personagem12.png', gif: 'imagens/gif12.gif' }
];

// Dados dos 30 servicos AWS
const servicosAWS = [
    // Fileira 1 - Computacao Bancaria
    { nome: 'Amazon EC2', icone: '🖥️' },
    { nome: 'AWS Lambda', icone: '⚡' },
    { nome: 'Amazon ECS', icone: '🐳' },
    { nome: 'Amazon EKS', icone: '☸️' },
    { nome: 'AWS Batch', icone: '📦' },
    // Fileira 2 - Banco de Dados & Caching
    { nome: 'Amazon Aurora', icone: '🌟' },
    { nome: 'Amazon DynamoDB', icone: '💾' },
    { nome: 'Amazon RDS', icone: '🗄️' },
    { nome: 'Amazon ElastiCache', icone: '⚡' },
    { nome: 'Amazon Redshift', icone: '📊' },
    // Fileira 3 - Storage & Data Lake
    { nome: 'Amazon S3', icone: '🪣' },
    { nome: 'Amazon EBS', icone: '💿' },
    { nome: 'Amazon EFS', icone: '📁' },
    { nome: 'AWS Glue', icone: '🔗' },
    { nome: 'Amazon OpenSearch', icone: '🔍' },
    // Fileira 4 - IA, ML & Eventos
    { nome: 'Amazon Bedrock', icone: '🤖' },
    { nome: 'Amazon SageMaker', icone: '🧠' },
    { nome: 'Amazon MSK', icone: '📡' },
    { nome: 'Amazon EMR', icone: '📈' },
    { nome: 'Amazon Kinesis', icone: '🔄' },
    // Fileira 5 - Redes & Integracoes
    { nome: 'AWS Direct Connect', icone: '🔌' },
    { nome: 'Amazon CloudFront', icone: '🌐' },
    { nome: 'AWS WAF', icone: '🛡️' },
    { nome: 'NAT Gateway', icone: '🚪' },
    { nome: 'Amazon API Gateway', icone: '🔗' },
    // Fileira 6 - Governanca & Seguranca
    { nome: 'Amazon CloudWatch', icone: '👁️' },
    { nome: 'AWS Config', icone: '⚙️' },
    { nome: 'AWS Secrets Manager', icone: '🔐' },
    { nome: 'AWS CloudTrail', icone: '👣' },
    { nome: 'AWS KMS', icone: '🔑' },
    // Fileira 7 - Seguranca Adicional
    { nome: 'AWS Shield', icone: '🛡️' },
    { nome: 'AWS Trusted Advisor', icone: '✅' }
];

// Variavel para armazenar o personagem selecionado
let personagemSelecionado = null;

// Elementos do DOM
const cartaoCentral = document.getElementById('cartao-central');
const popupPersonagens = document.getElementById('popup-personagens');
const popupPersonagemSelecionado = document.getElementById('popup-personagem-selecionado');
const popupAnimacao = document.getElementById('popup-animacao');
const popupConteudoSelecionado = document.querySelector('.popup-conteudo-selecionado');
const gridPersonagens = document.getElementById('grid-personagens');
const imagemPersonagemSelecionado = document.getElementById('imagem-personagem-selecionado');
const gifCelebracao = document.getElementById('gif-celebracao');
const botaoVoltarSelecionado = document.getElementById('botao-voltar-selecionado');
const botaoSeguirSelecionado = document.getElementById('botao-seguir-selecionado');
const telaInicial = document.getElementById('tela-inicial');
const telaServicos = document.getElementById('tela-servicos');
const gridServicos = document.getElementById('grid-servicos');
const canvasOnda = document.getElementById('canvas-onda');
const imagemPersonagemHeader = document.getElementById('imagem-personagem-header');

// Variaveis para sistema de onda azul
let ondas = [];
let animacaoOnda = null;
let tempo = 0;

// Classe para representar uma onda azul
class Onda {
    constructor(canvas) {
        this.canvas = canvas;
        this.alturaBase = canvas.height * 0.5 + (Math.random() - 0.5) * canvas.height * 0.3;
        this.amplitude = 30 + Math.random() * 50;
        this.frequencia = 0.01 + Math.random() * 0.02;
        this.velocidade = 0.02 + Math.random() * 0.03;
        this.fase = Math.random() * Math.PI * 2;
        this.opacidade = 0.1 + Math.random() * 0.2;
        this.cor = `rgba(59, 130, 246, ${this.opacidade})`;
    }

    desenhar(ctx, tempo) {
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);
        
        for (let x = 0; x <= this.canvas.width; x += 5) {
            const y = this.alturaBase + 
                      Math.sin(x * this.frequencia + tempo * this.velocidade + this.fase) * this.amplitude +
                      Math.sin(x * this.frequencia * 2 + tempo * this.velocidade * 1.5) * this.amplitude * 0.5;
            ctx.lineTo(x, y);
        }
        
        ctx.lineTo(this.canvas.width, this.canvas.height);
        ctx.closePath();
        ctx.fillStyle = this.cor;
        ctx.fill();
    }
}

// Funcao para inicializar o canvas de onda azul
function inicializarCanvasOnda() {
    const ctx = canvasOnda.getContext('2d');
    
    function redimensionarCanvas() {
        canvasOnda.width = window.innerWidth;
        canvasOnda.height = window.innerHeight;
    }
    
    redimensionarCanvas();
    window.addEventListener('resize', redimensionarCanvas);
    
    // Cria varias ondas
    for (let i = 0; i < 5; i++) {
        ondas.push(new Onda(canvasOnda));
    }
    
    // Funcao de animacao
    function animar() {
        ctx.clearRect(0, 0, canvasOnda.width, canvasOnda.height);
        tempo += 1;
        
        // Desenha todas as ondas
        ondas.forEach(onda => {
            onda.desenhar(ctx, tempo);
        });
        
        animacaoOnda = requestAnimationFrame(animar);
    }
    
    // Inicia a animacao
    animar();
}

// Funcao para parar a animacao de onda
function pararAnimacaoOnda() {
    if (animacaoOnda) {
        cancelAnimationFrame(animacaoOnda);
        animacaoOnda = null;
    }
    ondas = [];
}

// Funcao para gerar os cartoes de personagens no grid
function gerarCartoesPersonagens() {
    gridPersonagens.innerHTML = '';
    
    personagens.forEach((personagem, index) => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-personagem';
        cartao.style.backgroundColor = personagem.cor;
        cartao.dataset.index = index;
        
        const imagem = document.createElement('img');
        imagem.className = 'imagem-personagem';
        imagem.src = personagem.imagem;
        imagem.alt = 'Personagem';
        
        cartao.appendChild(imagem);
        gridPersonagens.appendChild(cartao);
        
        // Adiciona evento de clique para selecionar personagem
        cartao.addEventListener('click', () => abrirPopupPersonagemSelecionado(index));
    });
}

// Funcao para abrir o popup de personagem selecionado
function abrirPopupPersonagemSelecionado(index) {
    const personagem = personagens[index];
    
    // Limpa e adiciona a imagem do personagem selecionado
    imagemPersonagemSelecionado.innerHTML = '';
    const imagem = document.createElement('img');
    imagem.src = personagem.imagem;
    imagem.alt = 'Personagem selecionado';
    imagemPersonagemSelecionado.appendChild(imagem);
    
    // Define a cor de fundo do popup
    popupConteudoSelecionado.style.backgroundColor = personagem.cor;
    
    // Armazena o personagem selecionado
    personagemSelecionado = personagem;
    
    // Abre o popup de personagem selecionado
    popupPersonagemSelecionado.classList.remove('hidden');
}

// Funcao para fechar o popup de personagem selecionado
function fecharPopupPersonagemSelecionado() {
    popupPersonagemSelecionado.classList.add('hidden');
    popupConteudoSelecionado.style.backgroundColor = '#ffffff';
}

// Funcao para abrir o popup de personagens
function abrirPopup() {
    popupPersonagens.classList.remove('hidden');
    gerarCartoesPersonagens();
}

// Funcao para fechar o popup de personagens
function fecharPopup() {
    popupPersonagens.classList.add('hidden');
}

// Funcao para iniciar animacao de celebracao com GIF
function iniciarAnimacaoCelebracao() {
    console.log('Iniciando animacao de celebracao');
    console.log('Personagem selecionado:', personagemSelecionado);
    
    // Salva a referencia ao personagem antes de fechar o popup
    const personagemTemp = personagemSelecionado;
    
    // Fecha o popup de personagem selecionado
    fecharPopupPersonagemSelecionado();
    
    // Define o GIF do personagem selecionado
    gifCelebracao.src = personagemTemp.gif;
    
    // Abre o popup de animacao
    popupAnimacao.classList.remove('hidden');
    
    const duracaoCrescimento = 1000;
    const gifsMenores = ['imagens/gif1.gif', 'imagens/gif2.gif', 'imagens/gif3.gif', 'imagens/gif8.gif', 'imagens/gif10.gif', 'imagens/gif12.gif'];
    const gifsMaiores = ['imagens/gif5.gif', 'imagens/gif11.gif'];
    const tamanhoFinal = personagemTemp.gif === 'imagens/gif5.gif'
        ? 1.8
        : gifsMenores.includes(personagemTemp.gif)
            ? 1.3
            : gifsMaiores.includes(personagemTemp.gif)
                ? 1.7
                : 1.5;
    const deslocamentoVertical = personagemTemp.gif === 'imagens/gif5.gif' ? -160 : 0;
    gifCelebracao.style.transform = `translateY(${deslocamentoVertical}px) scale(0.5)`;
    const tempoExibicaoFinal = ['imagens/gif10.gif', 'imagens/gif11.gif'].includes(personagemTemp.gif)
        ? 5000
        : 2000;
    let inicioAnimacao;

    const animar = (tempoAtual) => {
        if (inicioAnimacao === undefined) {
            inicioAnimacao = tempoAtual;
        }

        const progresso = Math.min((tempoAtual - inicioAnimacao) / duracaoCrescimento, 1);
        const tamanho = 0.5 + progresso * (tamanhoFinal - 0.5);
        gifCelebracao.style.transform = `translateY(${deslocamentoVertical}px) scale(${tamanho})`;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        } else {
            // Mantem os GIFs 10 e 11 por cinco segundos; os demais, por dois.
            window.setTimeout(() => {
                popupAnimacao.classList.add('hidden');
                irParaJornada();
            }, tempoExibicaoFinal);
        }
    };

    requestAnimationFrame(animar);
}

// Funcao para gerar os cartoes de servicos AWS
function gerarCartoesServicos() {
    gridServicos.innerHTML = '';
    
    servicosAWS.forEach((servico, index) => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-servico';
        cartao.dataset.index = index;
        
        const icone = document.createElement('div');
        icone.className = 'icone-servico';
        icone.textContent = servico.icone;
        
        const nome = document.createElement('p');
        nome.className = 'nome-servico';
        nome.textContent = servico.nome;
        
        cartao.appendChild(icone);
        cartao.appendChild(nome);
        gridServicos.appendChild(cartao);
        
        // Adiciona evento de clique para selecionar servico
        cartao.addEventListener('click', () => selecionarServico(servico));
    });
}

// Funcao para selecionar um servico
function selecionarServico(servico) {
    // AQUI: Implementar funil de diagnostico de reducao de custos
    console.log('Servico selecionado:', servico.nome);
    console.log('Preparado para integracao com API Java Spring Boot para diagnostico');
    
    // AQUI: Implementar chamada a API Java Spring Boot para diagnostico
    /*
    fetch('/api/diagnostico/' + servico.nome, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Renderizar diagnostico de reducao de custos
        renderizarDiagnostico(data);
    })
    .catch(error => {
        console.error('Erro ao carregar diagnostico:', error);
    });
    */
}

// Funcao para transicionar para a tela de servicos AWS
function irParaJornada() {
    console.log('Iniciando transicao para tela de servicos');
    
    // Para a animacao de onda
    pararAnimacaoOnda();
    
    // Fecha o popup de personagens
    fecharPopup();
    
    // Esconde a tela inicial
    telaInicial.classList.add('hidden');
    
    // Salva a referencia ao personagem antes de limpar
    const personagemTemp = personagemSelecionado;
    
    // Define a imagem do personagem no header da tela de servicos
    imagemPersonagemHeader.src = personagemTemp.imagem;
    
    // Restaura a referencia ao personagem
    personagemSelecionado = personagemTemp;
    
    // Exibe a tela de servicos
    telaServicos.classList.remove('hidden');
    
    console.log('Tela de servicos deve estar visivel agora');
    
    // Gera os cartoes de servicos
    gerarCartoesServicos();
    
    console.log('Personagem selecionado:', personagemSelecionado.imagem);
    console.log('Preparado para integracao com API Java Spring Boot');
}

// Event Listeners
cartaoCentral.addEventListener('click', abrirPopup);

botaoVoltarSelecionado.addEventListener('click', fecharPopupPersonagemSelecionado);

botaoSeguirSelecionado.addEventListener('click', iniciarAnimacaoCelebracao);

// Fechar popup ao clicar fora do conteudo
popupPersonagens.addEventListener('click', (event) => {
    if (event.target === popupPersonagens) {
        fecharPopup();
    }
});

popupPersonagemSelecionado.addEventListener('click', (event) => {
    if (event.target === popupPersonagemSelecionado) {
        fecharPopupPersonagemSelecionado();
    }
});

// Inicializacao
document.addEventListener('DOMContentLoaded', () => {
    inicializarCanvasOnda();
});
