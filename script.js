// Dados dos 18 personagens com cores imagens e gifs
const personagens = [
    { nome: 'Killua', cor: '#9ca3af', imagem: 'imagens/personagem1.webp', gif: 'imagens/gif1.gif' },
    { nome: 'Gon', cor: '#22c55e', imagem: 'imagens/personagem2.webp', gif: 'imagens/gif2.gif' },
    { nome: 'Jinx', cor: '#1e40af', imagem: 'imagens/personagem3.webp', gif: 'imagens/gif3.gif' },
    { nome: 'Satoru Gojo', cor: '#93c5fd', imagem: 'imagens/personagem4.webp', gif: 'imagens/gif4.gif' },
    { nome: 'Gato Banana', cores: ['#ffffff', '#facc15'], imagem: 'imagens/personagem5.webp', gif: 'imagens/gif5.gif' },
    { nome: 'Vi', cor: '#ec4899', imagem: 'imagens/personagem6.webp', gif: 'imagens/gif6.gif' },
    { nome: 'Denji', cor: '#c2410c', imagem: 'imagens/personagem7.webp', gif: 'imagens/gif7.gif' },
    { nome: 'Luffy', cor: '#fca5a5', imagem: 'imagens/personagem8.webp', gif: 'imagens/gif8.gif' },
    { nome: 'Invencível', cor: '#fbbf24', imagem: 'imagens/personagem9.webp', gif: 'imagens/gif9.gif' },
    { nome: 'Hello Kitty', cor: '#dc2626', imagem: 'imagens/personagem10.webp', gif: 'imagens/gif10.gif' },
    { nome: 'Goku', cor: '#f97316', imagem: 'imagens/personagem11.webp', gif: 'imagens/gif11.gif' },
    { nome: 'Itachi', cor: '#374151', imagem: 'imagens/personagem12.webp', gif: 'imagens/gif12.gif' },
    { nome: 'Homem-Aranha', cores: ['#ef4444', '#3b82f6'], imagem: 'imagens/personagem13.webp', gif: 'imagens/gif13.gif' },
    { nome: 'Mabel', cor: '#ec4899', imagem: 'imagens/personagem14.webp', gif: 'imagens/gif14.gif' },
    { nome: 'Finn', cores: ['#2563eb', '#ffffff'], imagem: 'imagens/personagem15.webp', gif: 'imagens/gif15.gif' },
    { nome: 'Nezuko', cor: '#f9a8d4', imagem: 'imagens/personagem16.webp', gif: 'imagens/gif16.gif' },
    { nome: 'Kakashi', cor: '#3949ab', imagem: 'imagens/personagem17.webp', gif: 'imagens/gif17.gif' },
    { nome: 'Vegeta', cores: ['#111827', '#2563eb'], imagem: 'imagens/personagem18.webp', gif: 'imagens/gif18.gif' }
];

// Dados dos servicos AWS
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
    { nome: 'AWS Trusted Advisor', icone: '✅' },
    // Servicos adicionais
    { nome: 'Amazon SQS', icone: '📨' },
    { nome: 'Amazon SNS', icone: '📣' },
    { nome: 'Amazon EventBridge', icone: '🔀' },
    { nome: 'AWS DMS', icone: '🔄' },
    { nome: 'Amazon Neptune', icone: '🕸️' },
    { nome: 'Amazon DocumentDB', icone: '📄' },
    { nome: 'AWS MemoryDB for Redis', icone: '🧠' },
    { nome: 'Amazon Athena', icone: '🌊' },
    { nome: 'Amazon Cognito', icone: '👤' },
    { nome: 'AWS IAM Access Analyzer', icone: '🔍' },
    { nome: 'AWS Transit Gateway', icone: '🤖' },
    { nome: 'Amazon Macie', icone: '🕵️' },
    { nome: 'AWS Direct Connect Gateway', icone: '🌐' },
    { nome: 'AWS Storage Gateway', icone: '🗄️' },
    { nome: 'Amazon WorkSpaces', icone: '🖥️' },
    { nome: 'Amazon VPC', icone: '☁️' }
];
const quantidadeIconesServico = 48;
const chaveArmazenamentoAplicacao = 'finslash:preferencias';

// Variavel para armazenar o personagem selecionado
let personagemSelecionado = null;
const dadosPersistidos = carregarDadosPersistidos();
let celebracaoAtiva = 0;
let timeoutCelebracao = null;
let inicioGestoVoltar = null;
let navegacaoVoltarPendente = false;
const gifsCelebracaoPrecarregados = new Map();

// Elementos do DOM
const cartaoCentral = document.getElementById('cartao-central');
const popupPersonagens = document.getElementById('popup-personagens');
const popupPersonagemSelecionado = document.getElementById('popup-personagem-selecionado');
const personagemMenuAtual = document.getElementById('personagem-menu-atual');
const avatarPersonagemMenu = document.getElementById('avatar-personagem-menu');
const botaoContinuarMenu = document.getElementById('botao-continuar-menu');
const popupAnimacao = document.getElementById('popup-animacao');
const popupConteudoSelecionado = document.querySelector('.popup-conteudo-selecionado');
const gridPersonagens = document.getElementById('grid-personagens');
const imagemPersonagemSelecionado = document.getElementById('imagem-personagem-selecionado');
const nomePersonagemSelecionado = document.getElementById('nome-personagem-selecionado');
const gifCelebracao = document.getElementById('gif-celebracao');
const botaoSeguirSelecionado = document.getElementById('botao-seguir-selecionado');
const botaoVoltarSelecionado = document.getElementById('botao-voltar-selecionado');
const telaInicial = document.getElementById('tela-inicial');
const telaServicos = document.getElementById('tela-servicos');
const gridServicos = document.getElementById('grid-servicos');
const canvasOnda = document.getElementById('canvas-onda');
const imagemPersonagemHeader = document.getElementById('imagem-personagem-header');
const buscaServicos = document.getElementById('busca-servicos');
const campoBuscaServicos = document.getElementById('campo-busca-servicos');
const resultadosBuscaServicos = document.getElementById('resultados-busca-servicos');
const popupCartaoServico = document.getElementById('popup-cartao-servico');
const cartaoAmpliadoServico = document.getElementById('cartao-ampliado-servico');
const botaoFecharPopupCartaoServico = document.getElementById('fechar-popup-cartao-servico');
const canvasOndaPopupServico = document.getElementById('canvas-onda-popup-servico');
const botaoBuscaVoz = document.getElementById('botao-busca-voz');
const popupBuscaVoz = document.getElementById('popup-busca-voz');
const canvasOndaVoz = document.getElementById('canvas-onda-voz');
const botaoFecharPopupBuscaVoz = document.getElementById('fechar-popup-busca-voz');
const statusBuscaVoz = document.getElementById('status-busca-voz');
const transcricaoBuscaVoz = document.getElementById('transcricao-busca-voz');
const botaoTentarNovamenteBuscaVoz = document.getElementById('tentar-novamente-busca-voz');
const navegacaoApp = document.getElementById('navegacao-app');
const botaoMenuApp = document.getElementById('botao-menu-app');
const botaoPesquisaApp = document.getElementById('botao-pesquisa-app');
const botaoPerfilApp = document.getElementById('botao-perfil-app');
const avatarNavegacaoApp = document.getElementById('avatar-navegacao-app');
const iconePerfilApp = document.getElementById('icone-perfil-app');
const popupPerfil = document.getElementById('popup-perfil');
const botaoFecharPerfil = document.getElementById('fechar-perfil');
const avatarPerfil = document.getElementById('avatar-perfil');
const tituloPerfil = document.getElementById('titulo-perfil');
const botaoEditarTituloPerfil = document.getElementById('editar-titulo-perfil');
const popupEditarNomePerfil = document.getElementById('popup-editar-nome-perfil');
const formularioEditarNomePerfil = document.getElementById('formulario-editar-nome-perfil');
const campoNomePerfil = document.getElementById('campo-nome-perfil');
const erroNomePerfil = document.getElementById('erro-nome-perfil');
const botaoCancelarEdicaoNomePerfil = document.getElementById('cancelar-edicao-nome-perfil');
const nomePersonagemPerfil = document.getElementById('nome-personagem-perfil');
const listaHistoricoPerfil = document.getElementById('lista-historico-perfil');
const listaMedalhasPerfil = document.getElementById('lista-medalhas-perfil');
const secoesPerfil = {
    historico: document.getElementById('conteudo-historico-perfil'),
    medalhas: document.getElementById('conteudo-medalhas-perfil'),
    feedback: document.getElementById('conteudo-feedback-perfil')
};

function carregarDadosPersistidos() {
    try {
        const armazenado = window.localStorage.getItem(chaveArmazenamentoAplicacao);
        if (!armazenado) {
            return { indicePersonagem: null, buscasRecentes: [], historicoServicos: [], nomePerfil: 'Meu perfil' };
        }

        const dados = JSON.parse(armazenado);
        if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
            throw new TypeError('Os dados salvos do FinSlash nao possuem o formato esperado.');
        }

        const indicePersonagem = Number.isInteger(dados.indicePersonagem)
            && personagens[dados.indicePersonagem]
            ? dados.indicePersonagem
            : null;
        const buscasRecentes = Array.isArray(dados.buscasRecentes)
            ? dados.buscasRecentes.filter(busca => typeof busca === 'string' && busca.trim()).slice(0, 5)
            : [];
        const historicoServicos = Array.isArray(dados.historicoServicos)
            ? dados.historicoServicos
                .filter(item => item && typeof item.nome === 'string'
                    && servicosAWS.some(servico => servico.nome === item.nome)
                    && Number.isFinite(item.data)
                    && Number.isFinite(new Date(item.data).getTime()))
                .slice(0, 50)
            : [];
        const nomePerfil = typeof dados.nomePerfil === 'string' && dados.nomePerfil.trim()
            ? dados.nomePerfil.trim().slice(0, 40)
            : 'Meu perfil';

        return { indicePersonagem, buscasRecentes, historicoServicos, nomePerfil };
    } catch (error) {
        console.error('Nao foi possivel carregar as preferencias salvas do FinSlash.', error);
        return { indicePersonagem: null, buscasRecentes: [], historicoServicos: [], nomePerfil: 'Meu perfil' };
    }
}

function salvarDadosPersistidos() {
    try {
        window.localStorage.setItem(chaveArmazenamentoAplicacao, JSON.stringify(dadosPersistidos));
    } catch (error) {
        console.error('Nao foi possivel salvar as preferencias do FinSlash neste navegador.', error);
    }
}

function salvarPersonagemSelecionado(index) {
    dadosPersistidos.indicePersonagem = index;
    salvarDadosPersistidos();
    atualizarAvatarNavegacao();
}

function registrarBuscaRecente(busca) {
    const texto = busca.trim();
    if (!texto) {
        return;
    }

    dadosPersistidos.buscasRecentes = [
        texto,
        ...dadosPersistidos.buscasRecentes.filter(item =>
            normalizarBuscaServico(item) !== normalizarBuscaServico(texto)
        )
    ].slice(0, 5);
    salvarDadosPersistidos();
}

function registrarServicoNoHistorico(servico) {
    dadosPersistidos.historicoServicos = [
        { nome: servico.nome, data: Date.now() },
        ...dadosPersistidos.historicoServicos
    ].slice(0, 50);
    salvarDadosPersistidos();
}

function atualizarAvatarNavegacao() {
    const personagem = personagens[dadosPersistidos.indicePersonagem];
    if (!personagem) {
        avatarNavegacaoApp.classList.add('hidden');
        iconePerfilApp.classList.remove('hidden');
        return;
    }

    avatarNavegacaoApp.src = personagem.imagem;
    avatarNavegacaoApp.alt = 'Abrir perfil';
    avatarNavegacaoApp.classList.remove('hidden');
    iconePerfilApp.classList.add('hidden');
}

function atualizarDisponibilidadePesquisaNavegacao() {
    const personagemDisponivel = Boolean(
        personagemSelecionado || personagens[dadosPersistidos.indicePersonagem]
    );
    botaoPesquisaApp.disabled = telaServicos.classList.contains('hidden') && !personagemDisponivel;
}

function renderizarHistoricoPerfil() {
    listaHistoricoPerfil.replaceChildren();
    if (!dadosPersistidos.historicoServicos.length) {
        const vazio = document.createElement('p');
        vazio.className = 'mensagem-perfil-vazia';
        vazio.textContent = 'Os serviços que você visitar aparecerão aqui.';
        listaHistoricoPerfil.appendChild(vazio);
        return;
    }

    dadosPersistidos.historicoServicos.forEach(item => {
        const servico = servicosAWS.find(({ nome }) => nome === item.nome);
        const indice = servicosAWS.indexOf(servico);
        const botao = document.createElement('button');
        botao.className = 'item-historico-perfil';
        botao.type = 'button';

        const nome = document.createElement('span');
        nome.textContent = item.nome;
        const data = document.createElement('time');
        data.dateTime = new Date(item.data).toISOString();
        data.textContent = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        }).format(item.data);
        botao.append(nome, data);
        botao.addEventListener('click', () => {
            fecharPerfil();
            campoBuscaServicos.value = item.nome;
            abrirPopupCartaoServico(indice);
        });
        listaHistoricoPerfil.appendChild(botao);
    });
}

function renderizarMedalhasPerfil() {
    const total = new Set(dadosPersistidos.historicoServicos.map(item => item.nome)).size;
    const conquistas = [
        { limite: 1, nome: 'Primeiro passo', descricao: 'Explore seu primeiro serviço AWS.' },
        { limite: 5, nome: 'Curioso', descricao: 'Explore 5 serviços AWS diferentes.' },
        { limite: 10, nome: 'Explorador', descricao: 'Explore 10 serviços AWS diferentes.' }
    ];
    listaMedalhasPerfil.replaceChildren();

    conquistas.forEach(conquista => {
        const item = document.createElement('div');
        item.className = `item-medalha-perfil${total >= conquista.limite ? ' conquistada' : ''}`;
        const icone = document.createElement('span');
        icone.className = 'icone-medalha-perfil';
        icone.setAttribute('aria-hidden', 'true');
        icone.textContent = total >= conquista.limite ? '🏅' : '🔒';
        const detalhes = document.createElement('div');
        const nome = document.createElement('strong');
        nome.textContent = conquista.nome;
        const descricao = document.createElement('p');
        descricao.textContent = conquista.descricao;
        const estado = document.createElement('span');
        estado.textContent = total >= conquista.limite ? 'Conquistada' : 'Ainda não conquistada';
        detalhes.append(nome, descricao, estado);
        item.append(icone, detalhes);
        listaMedalhasPerfil.appendChild(item);
    });
}

function abrirPerfil() {
    tituloPerfil.textContent = dadosPersistidos.nomePerfil;
    const personagem = personagens[dadosPersistidos.indicePersonagem];
    if (personagem) {
        avatarPerfil.src = personagem.imagem;
        avatarPerfil.alt = personagem.nome;
        avatarPerfil.classList.remove('hidden');
        nomePersonagemPerfil.textContent = personagem.nome;
    } else {
        avatarPerfil.removeAttribute('src');
        avatarPerfil.classList.add('hidden');
        nomePersonagemPerfil.textContent = 'Escolha um personagem para começar';
    }
    renderizarHistoricoPerfil();
    renderizarMedalhasPerfil();
    popupPerfil.classList.remove('hidden');
    botaoFecharPerfil.focus();
}

function editarNomePerfil() {
    campoNomePerfil.value = dadosPersistidos.nomePerfil;
    campoNomePerfil.removeAttribute('aria-invalid');
    erroNomePerfil.textContent = '';
    erroNomePerfil.classList.add('hidden');
    popupEditarNomePerfil.classList.remove('hidden');
    campoNomePerfil.focus();
    campoNomePerfil.select();
}

function fecharEdicaoNomePerfil() {
    popupEditarNomePerfil.classList.add('hidden');
}

function salvarNomePerfil(event) {
    event.preventDefault();
    const nome = campoNomePerfil.value.trim();
    if (!nome) {
        campoNomePerfil.setAttribute('aria-invalid', 'true');
        erroNomePerfil.textContent = 'Digite um nome para continuar.';
        erroNomePerfil.classList.remove('hidden');
        campoNomePerfil.focus();
        return;
    }

    campoNomePerfil.removeAttribute('aria-invalid');
    dadosPersistidos.nomePerfil = nome.slice(0, 40);
    tituloPerfil.textContent = dadosPersistidos.nomePerfil;
    salvarDadosPersistidos();
    fecharEdicaoNomePerfil();
}

function fecharPerfil() {
    popupPerfil.classList.add('hidden');
}

function mostrarMenuPersonagens() {
    const indiceSalvo = dadosPersistidos.indicePersonagem;
    const temPersonagemSalvo = Number.isInteger(indiceSalvo) && Boolean(personagens[indiceSalvo]);
    fecharPerfil();
    fecharPopupBuscaVoz(false);
    popupAnimacao.classList.add('hidden');
    popupPersonagemSelecionado.classList.add('hidden');
    ocultarPopupCartaoServico();
    popupPersonagens.appendChild(canvasOnda);
    popupPersonagens.classList.remove('hidden');
    telaInicial.classList.add('hidden');
    telaServicos.classList.add('hidden');
    navegacaoApp.classList.remove('hidden');
    personagemSelecionado = temPersonagemSalvo ? personagens[indiceSalvo] : null;
    atualizarDisponibilidadePesquisaNavegacao();
    atualizarAvatarNavegacao();
    if (!gridPersonagens.children.length) {
        gerarCartoesPersonagens();
    }

    personagemMenuAtual.classList.toggle('hidden', !temPersonagemSalvo);
    if (temPersonagemSalvo) {
        avatarPersonagemMenu.src = personagemSelecionado.imagem;
    } else {
        avatarPersonagemMenu.removeAttribute('src');
    }
    inicializarCanvasOnda();
}

function atualizarConteudoAbaPerfil(abaAtiva) {
    document.querySelectorAll('[data-aba-perfil]').forEach(botao => {
        const ativo = botao.dataset.abaPerfil === abaAtiva;
        botao.classList.toggle('ativa', ativo);
        botao.setAttribute('aria-selected', String(ativo));
        botao.tabIndex = ativo ? 0 : -1;
    });
    Object.entries(secoesPerfil).forEach(([nome, secao]) => {
        const ativa = nome === abaAtiva;
        secao.hidden = !ativa;
        secao.classList.toggle('hidden', !ativa);
    });
}

// Variaveis para sistema de onda azul
let ondas = [];
let animacaoOnda = null;
let redimensionarCanvasOnda = null;
let tempo = 0;
let ondasPopupServico = [];
let animacaoOndaPopupServico = null;
let tempoOndaPopupServico = 0;
let animacaoOndaVoz = null;
let tempoOndaVoz = 0;
let nivelAudioVoz = 0;
let nivelAlvoOndaVoz = 0;
let reconhecimentoVoz = null;

function atualizarHistoricoAplicacao(tela, dados = {}, substituir = false) {
    const estado = { app: 'FinSlash', tela, ...dados };
    const metodo = substituir ? 'replaceState' : 'pushState';
    window.history[metodo](estado, '', window.location.href);
}

function cancelarAnimacaoCelebracao() {
    celebracaoAtiva += 1;
    if (timeoutCelebracao !== null) {
        window.clearTimeout(timeoutCelebracao);
        timeoutCelebracao = null;
    }
    popupAnimacao.classList.add('hidden');
}

function renderizarTelaHistorico(estado) {
    const tela = estado?.app === 'FinSlash' ? estado.tela : 'inicio';
    cancelarAnimacaoCelebracao();
    fecharPopupBuscaVoz(false);
    fecharPerfil();

    popupPersonagens.classList.add('hidden');
    popupPersonagemSelecionado.classList.add('hidden');
    ocultarPopupCartaoServico();
    popupConteudoSelecionado.style.background = '#ffffff';

    const mostrarServicos = tela === 'servicos' || tela === 'cartao-servico';
    telaServicos.classList.toggle('hidden', !mostrarServicos);
    telaInicial.classList.toggle('hidden', mostrarServicos);
    navegacaoApp.classList.toggle('hidden', tela === 'inicio');
    atualizarDisponibilidadePesquisaNavegacao();

    if (mostrarServicos) {
        fecharPopup();
        const indicePersonagem = Number.isInteger(estado?.indicePersonagem)
            ? estado.indicePersonagem
            : dadosPersistidos.indicePersonagem;
        if (personagens[indicePersonagem]) {
            personagemSelecionado = personagens[indicePersonagem];
            imagemPersonagemHeader.src = personagemSelecionado.imagem;
        }
        atualizarDisponibilidadePesquisaNavegacao();
        atualizarAvatarNavegacao();
        if (!gridServicos.children.length) {
            gerarCartoesServicos();
        }
        if (tela === 'cartao-servico' && Number.isInteger(estado.indiceServico)) {
            abrirPopupCartaoServicoVisual(estado.indiceServico);
        }
        return;
    }

    if (tela === 'personagens' || tela === 'personagem' || tela === 'celebracao') {
        popupPersonagens.appendChild(canvasOnda);
        popupPersonagens.classList.remove('hidden');
        inicializarCanvasOnda();
        if (!gridPersonagens.children.length) {
            gerarCartoesPersonagens();
        }
        gridPersonagens.classList.remove('hidden');
        if ((tela === 'personagem' || tela === 'celebracao')
            && Number.isInteger(estado?.indicePersonagem)
            && personagens[estado.indicePersonagem]) {
            prepararPopupPersonagemSelecionado(estado.indicePersonagem);
            popupPersonagemSelecionado.classList.remove('hidden');
        } else if (tela === 'personagens' && personagens[dadosPersistidos.indicePersonagem]) {
            personagemSelecionado = personagens[dadosPersistidos.indicePersonagem];
            imagemPersonagemHeader.src = personagemSelecionado.imagem;
            mostrarMenuPersonagens();
        }
        if (tela === 'celebracao') {
            popupPersonagemSelecionado.classList.add('hidden');
            popupAnimacao.classList.remove('hidden');
        }
        return;
    }

    fecharPopup();
    personagemSelecionado = null;
    inicializarCanvasOnda();
}

function voltarPelaNavegacao() {
    const tela = window.history.state?.app === 'FinSlash' ? window.history.state.tela : 'inicio';
    if (tela === 'inicio' || navegacaoVoltarPendente) {
        return;
    }
    navegacaoVoltarPendente = true;
    window.history.back();
    window.setTimeout(() => {
        navegacaoVoltarPendente = false;
    }, 500);
}

window.addEventListener('popstate', (event) => {
    inicioGestoVoltar = null;
    navegacaoVoltarPendente = false;
    renderizarTelaHistorico(event.state);
});

document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) {
        inicioGestoVoltar = null;
        return;
    }
    if (event.target instanceof Element
        && event.target.closest('input, textarea, select, [contenteditable="true"]')) {
        inicioGestoVoltar = null;
        return;
    }
    const toque = event.touches[0];
    inicioGestoVoltar = { x: toque.clientX, y: toque.clientY };
}, { passive: true });

document.addEventListener('touchend', (event) => {
    if (!inicioGestoVoltar || event.changedTouches.length !== 1) {
        inicioGestoVoltar = null;
        return;
    }
    const toque = event.changedTouches[0];
    const deslocamentoX = toque.clientX - inicioGestoVoltar.x;
    const deslocamentoY = Math.abs(toque.clientY - inicioGestoVoltar.y);
    inicioGestoVoltar = null;
    if (deslocamentoX >= 80 && deslocamentoY <= 60) {
        voltarPelaNavegacao();
    }
}, { passive: true });

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

    desenhar(ctx, tempo, intensidade = 1, intervalo = 5) {
        ctx.beginPath();
        ctx.moveTo(0, this.canvas.height);
        
        for (let x = 0; x <= this.canvas.width; x += intervalo) {
            const y = this.alturaBase + 
                      Math.sin(x * this.frequencia + tempo * this.velocidade + this.fase) * this.amplitude * intensidade +
                      Math.sin(x * this.frequencia * 2 + tempo * this.velocidade * 1.5) * this.amplitude * 0.5 * intensidade;
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
    if (animacaoOnda) {
        return;
    }

    const ctx = canvasOnda.getContext('2d');
    
    redimensionarCanvasOnda = () => {
        canvasOnda.width = window.innerWidth;
        canvasOnda.height = window.innerHeight;
    };
    
    redimensionarCanvasOnda();
    window.addEventListener('resize', redimensionarCanvasOnda);
    
    // Cria varias ondas
    for (let i = 0; i < 5; i++) {
        ondas.push(new Onda(canvasOnda));
    }
    
    // Funcao de animacao
    let ultimoDesenho = 0;
    function animar(tempoAtual) {
        if (document.hidden) {
            animacaoOnda = requestAnimationFrame(animar);
            return;
        }

        if (tempoAtual - ultimoDesenho >= 1000 / 30) {
            ultimoDesenho = tempoAtual;
            ctx.clearRect(0, 0, canvasOnda.width, canvasOnda.height);
            tempo += 1;

            ondas.forEach(onda => {
                onda.desenhar(ctx, tempo, 1, 8);
            });
        }

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
    if (redimensionarCanvasOnda) {
        window.removeEventListener('resize', redimensionarCanvasOnda);
        redimensionarCanvasOnda = null;
    }
    ondas = [];
}

function redimensionarCanvasOndaPopupServico() {
    const areaPopup = canvasOndaPopupServico.parentElement;
    canvasOndaPopupServico.width = areaPopup.clientWidth;
    canvasOndaPopupServico.height = areaPopup.clientHeight;

    if (animacaoOndaPopupServico) {
        ondasPopupServico = Array.from({ length: 5 }, () => new Onda(canvasOndaPopupServico));
    }
}

function iniciarAnimacaoOndaPopupServico() {
    if (animacaoOndaPopupServico) {
        return;
    }

    const ctx = canvasOndaPopupServico.getContext('2d');
    if (!ctx) {
        console.error('Nao foi possivel inicializar a animacao do popup de servico.');
        return;
    }

    redimensionarCanvasOndaPopupServico();
    window.addEventListener('resize', redimensionarCanvasOndaPopupServico);
    ondasPopupServico = Array.from({ length: 5 }, () => new Onda(canvasOndaPopupServico));

    function animar() {
        ctx.clearRect(0, 0, canvasOndaPopupServico.width, canvasOndaPopupServico.height);
        tempoOndaPopupServico += 1;
        ondasPopupServico.forEach(onda => onda.desenhar(ctx, tempoOndaPopupServico));
        animacaoOndaPopupServico = requestAnimationFrame(animar);
    }

    animar();
}

function pararAnimacaoOndaPopupServico() {
    if (animacaoOndaPopupServico) {
        cancelAnimationFrame(animacaoOndaPopupServico);
        animacaoOndaPopupServico = null;
    }
    window.removeEventListener('resize', redimensionarCanvasOndaPopupServico);
    ondasPopupServico = [];
}

function redimensionarCanvasOndaVoz() {
    const tamanho = canvasOndaVoz.clientWidth;
    const escala = window.devicePixelRatio || 1;
    canvasOndaVoz.width = Math.round(tamanho * escala);
    canvasOndaVoz.height = Math.round(tamanho * escala);
}

function iniciarAnimacaoOndaVoz() {
    if (animacaoOndaVoz) {
        return;
    }

    const ctx = canvasOndaVoz.getContext('2d');
    if (!ctx) {
        console.error('Nao foi possivel inicializar a animacao de ondas da busca por voz.');
        return;
    }

    redimensionarCanvasOndaVoz();
    window.addEventListener('resize', redimensionarCanvasOndaVoz);
    function animar() {
        const largura = canvasOndaVoz.width;
        const altura = canvasOndaVoz.height;
        const centroX = largura / 2;
        const centroY = altura / 2;
        const escala = window.devicePixelRatio || 1;
        nivelAudioVoz += (nivelAlvoOndaVoz - nivelAudioVoz) * 0.12;
        const nivel = nivelAudioVoz;

        ctx.clearRect(0, 0, largura, altura);
        ctx.save();
        ctx.lineWidth = 2 * escala;
        tempoOndaVoz += 1;

        for (let anel = 0; anel < 3; anel += 1) {
            const raioBase = (42 + anel * 19 + Math.sin(tempoOndaVoz * 0.035 - anel) * 2) * escala;
            const amplitude = (2 + nivel * 12) * escala;
            ctx.beginPath();

            for (let ponto = 0; ponto <= 120; ponto += 1) {
                const angulo = (ponto / 120) * Math.PI * 2;
                const ondulacao = Math.sin(angulo * 5 + tempoOndaVoz * 0.07 + anel) * (0.35 + nivel * 0.55);
                const raio = raioBase + ondulacao * amplitude;
                const x = centroX + Math.cos(angulo) * raio;
                const y = centroY + Math.sin(angulo) * raio;

                if (ponto === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.closePath();
            ctx.strokeStyle = anel % 2 === 0
                ? `rgba(37, 99, 235, ${0.72 - anel * 0.12})`
                : `rgba(255, 255, 255, ${0.95 - anel * 0.12})`;
            ctx.stroke();
        }

        ctx.restore();
        animacaoOndaVoz = requestAnimationFrame(animar);
    }

    animar();
}

function pararAnimacaoOndaVoz() {
    if (animacaoOndaVoz) {
        cancelAnimationFrame(animacaoOndaVoz);
        animacaoOndaVoz = null;
    }
    window.removeEventListener('resize', redimensionarCanvasOndaVoz);
    nivelAudioVoz = 0;
    nivelAlvoOndaVoz = 0;
    const ctx = canvasOndaVoz.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, canvasOndaVoz.width, canvasOndaVoz.height);
    }
}

function definirAtividadeBuscaVoz(ativa) {
    nivelAlvoOndaVoz = ativa ? 1 : 0;
    popupBuscaVoz.classList.toggle('ouvindo-voz', ativa);
}

// Funcao para gerar os cartoes de personagens no grid
function gerarCartoesPersonagens() {
    const cartoes = document.createDocumentFragment();
    
    personagens.forEach((personagem, index) => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-personagem';
        cartao.setAttribute('aria-label', `Selecionar ${personagem.nome}`);
        const cores = personagem.cores || [personagem.cor];
        const coresRGB = cores.map(cor => cor.match(/[0-9a-f]{2}/gi).map(valor => parseInt(valor, 16)));
        const corBrilhoNome = coresRGB.find(cor => Math.min(...cor) < 225) || coresRGB[0];
        cartao.style.background = cores.length > 1
            ? `linear-gradient(90deg, ${cores[0]} 50%, ${cores[1]} 50%)`
            : cores[0];
        cartao.style.setProperty('--cor-brilho-nome', corBrilhoNome.join(', '));
        if (cores.length > 1) {
            cartao.classList.add('cartao-personagem-bicolor');
        }
        const corRGB = coresRGB[0];
        const corBrilho = corRGB.map(valor => Math.round(valor + (255 - valor) * 0.2)).join(', ');
        cartao.style.setProperty('--cor-brilho-personagem', `rgba(${corBrilho}, 1)`);
        cartao.style.setProperty('--cor-halo-personagem', `rgba(${corRGB.join(', ')}, 0.65)`);
        cartao.style.setProperty(
            '--gradiente-brilho-personagem',
            `linear-gradient(90deg, ${cores[0]} 50%, ${cores[1] || cores[0]} 50%)`
        );
        cartao.dataset.index = index;
        
        const areaImagem = document.createElement('div');
        areaImagem.className = 'area-imagem-personagem';

        const imagem = document.createElement('img');
        imagem.className = 'imagem-personagem';
        if (index === 6) {
            imagem.classList.add('imagem-personagem-sete');
        } else if (index === 8) {
            imagem.classList.add('imagem-personagem-nove');
        } else if (index === 12) {
            imagem.classList.add('imagem-personagem-treze');
        } else if (index === 13) {
            imagem.classList.add('imagem-personagem-catorze');
        }
        imagem.loading = index < 9 ? 'eager' : 'lazy';
        imagem.decoding = 'async';
        imagem.alt = personagem.nome;
        imagem.src = personagem.imagem;

        const nome = document.createElement('span');
        nome.className = 'nome-personagem-cartao';
        if (personagem.nome === 'Homem-Aranha') {
            nome.classList.add('nome-personagem-cartao-longo');
        }
        nome.setAttribute('aria-hidden', 'true');
        const textoNome = document.createElement('span');
        textoNome.textContent = personagem.nome;
        nome.appendChild(textoNome);
        
        areaImagem.appendChild(imagem);
        cartao.appendChild(areaImagem);
        cartao.appendChild(nome);
        cartoes.appendChild(cartao);
        
        // Adiciona evento de clique para selecionar personagem
        cartao.addEventListener('click', () => abrirPopupPersonagemSelecionado(index));
    });

    gridPersonagens.replaceChildren(cartoes);
}

function decodificarImagensPersonagens() {
    gridPersonagens.querySelectorAll('img[loading="eager"]').forEach(imagem => {
        imagem.decode().catch(error => {
            console.warn(`Nao foi possivel decodificar a imagem do personagem ${imagem.alt}.`, error);
        });
    });
}

// Funcao para abrir o popup de personagem selecionado
function abrirPopupPersonagemSelecionado(index) {
    if (!personagens[index]) {
        console.error(`Personagem invalido para o indice ${index}.`);
        return;
    }
    atualizarHistoricoAplicacao('personagem', { indicePersonagem: index });
    prepararPopupPersonagemSelecionado(index);
}

function prepararPopupPersonagemSelecionado(index) {
    const personagem = personagens[index];
    precarregarGifCelebracao(personagem);
    const cores = personagem.cores || [personagem.cor];
    const coresRGB = cores.map(cor => cor.match(/[0-9a-f]{2}/gi).map(valor => parseInt(valor, 16)));
    const corBrilhoNome = coresRGB.find(cor => Math.min(...cor) < 225) || coresRGB[0];
    nomePersonagemSelecionado.replaceChildren();
    const textoNomeSelecionado = document.createElement('span');
    textoNomeSelecionado.textContent = personagem.nome;
    nomePersonagemSelecionado.appendChild(textoNomeSelecionado);
    nomePersonagemSelecionado.style.setProperty('--cor-brilho-nome', corBrilhoNome.join(', '));
    
    // Limpa e adiciona a imagem do personagem selecionado
    imagemPersonagemSelecionado.innerHTML = '';
    const imagem = document.createElement('img');
    if (index === 6) {
        imagem.classList.add('imagem-personagem-sete');
    }
    imagem.decoding = 'async';
    imagem.src = personagem.imagem;
    imagem.alt = personagem.nome;
    imagemPersonagemSelecionado.appendChild(imagem);
    
    // Define a cor de fundo do popup
    popupConteudoSelecionado.style.background = cores.length > 1
        ? `linear-gradient(90deg, ${cores[0]} 50%, ${cores[1]} 50%)`
        : cores[0];
    
    // Armazena o personagem selecionado
    personagemSelecionado = personagem;
    atualizarDisponibilidadePesquisaNavegacao();
    
    // Abre o popup de personagem selecionado
    popupPersonagemSelecionado.classList.remove('hidden');
}

function precarregarGifCelebracao(personagem) {
    if (gifsCelebracaoPrecarregados.has(personagem.gif)) {
        return;
    }

    const imagem = new Image();
    imagem.decoding = 'async';
    imagem.fetchPriority = 'low';
    imagem.src = personagem.gif;
    gifsCelebracaoPrecarregados.set(personagem.gif, imagem);
    imagem.decode().catch(error => {
        if (gifsCelebracaoPrecarregados.get(personagem.gif) === imagem) {
            gifsCelebracaoPrecarregados.delete(personagem.gif);
        }
        console.error(`Nao foi possivel preparar a animacao ${personagem.gif}.`, error);
    });
}

// Funcao para fechar o popup de personagem selecionado
function fecharPopupPersonagemSelecionado() {
    popupPersonagemSelecionado.classList.add('hidden');
    popupConteudoSelecionado.style.background = '#ffffff';
}

// Funcao para abrir o popup de personagens
function abrirPopup() {
    atualizarHistoricoAplicacao('personagens');
    navegacaoApp.classList.remove('hidden');
    popupPersonagens.appendChild(canvasOnda);
    popupPersonagens.classList.remove('hidden');
    mostrarMenuPersonagens();
}

// Funcao para fechar o popup de personagens
function fecharPopup() {
    popupPersonagens.classList.add('hidden');
    telaInicial.appendChild(canvasOnda);
}

// Funcao para iniciar animacao de celebracao com GIF
function iniciarAnimacaoCelebracao() {
    console.log('Iniciando animacao de celebracao');
    console.log('Personagem selecionado:', personagemSelecionado);
    
    // Salva a referencia ao personagem antes de fechar o popup
    const personagemTemp = personagemSelecionado;
    const indicePersonagem = personagens.indexOf(personagemTemp);
    if (indicePersonagem === -1) {
        console.error('Nao foi possivel iniciar a jornada sem um personagem valido.');
        return;
    }
    salvarPersonagemSelecionado(indicePersonagem);
    atualizarHistoricoAplicacao('personagem', { indicePersonagem });
    cancelarAnimacaoCelebracao();
    const idCelebracao = ++celebracaoAtiva;
    
    // Fecha o popup de personagem selecionado
    fecharPopupPersonagemSelecionado();
    
    // Define o GIF do personagem selecionado
    gifCelebracao.src = personagemTemp.gif;
    const cores = personagemTemp.cores || [personagemTemp.cor];
    gifCelebracao.style.setProperty('--cor-brilho-celebracao', cores[0]);
    gifCelebracao.style.setProperty('--cor-brilho-celebracao-secundaria', cores[1] || cores[0]);
    
    // Abre o popup de animacao
    popupAnimacao.classList.remove('hidden');
    
    const duracaoCrescimento = 1000;
    const gifsMenores = ['imagens/gif1.gif', 'imagens/gif2.gif', 'imagens/gif3.gif', 'imagens/gif8.gif', 'imagens/gif10.gif', 'imagens/gif12.gif'];
    const gifsMaiores = ['imagens/gif5.gif', 'imagens/gif11.gif'];
    const tamanhoFinal = personagemTemp.gif === 'imagens/gif18.gif'
        ? 4
        : personagemTemp.gif === 'imagens/gif13.gif'
            ? 1.3
        : personagemTemp.gif === 'imagens/gif16.gif'
            ? 0.8
        : personagemTemp.gif === 'imagens/gif14.gif'
            ? 1
        : personagemTemp.gif === 'imagens/gif7.gif'
        ? 2.5
        : personagemTemp.gif === 'imagens/gif12.gif'
            ? 1
        : personagemTemp.gif === 'imagens/gif5.gif'
        ? 2.5
        : gifsMenores.includes(personagemTemp.gif)
            ? 1.3
            : gifsMaiores.includes(personagemTemp.gif)
                ? 1.7
                : 1.5;
    const deslocamentoVertical = personagemTemp.gif === 'imagens/gif18.gif'
        ? -120
        : personagemTemp.gif === 'imagens/gif5.gif'
            ? 30
            : 0;
    const deslocamentoHorizontal = personagemTemp.gif === 'imagens/gif13.gif' ? -25 : 0;
    gifCelebracao.style.transform = `translate(${deslocamentoHorizontal}px, ${deslocamentoVertical}px) scale(0.5)`;
    const tempoExibicaoFinal = personagemTemp.gif === 'imagens/gif12.gif'
        ? 1000
        : ['imagens/gif10.gif', 'imagens/gif11.gif'].includes(personagemTemp.gif)
            ? 5000
            : 2000;
    let inicioAnimacao;

    const animar = (tempoAtual) => {
        if (idCelebracao !== celebracaoAtiva) {
            return;
        }
        if (inicioAnimacao === undefined) {
            inicioAnimacao = tempoAtual;
        }

        const progresso = Math.min((tempoAtual - inicioAnimacao) / duracaoCrescimento, 1);
        const tamanho = 0.5 + progresso * (tamanhoFinal - 0.5);
        gifCelebracao.style.transform = `translate(${deslocamentoHorizontal}px, ${deslocamentoVertical}px) scale(${tamanho})`;

        if (progresso < 1) {
            requestAnimationFrame(animar);
        } else {
            // Mantem os GIFs 10 e 11 por cinco segundos; os demais, por dois.
            timeoutCelebracao = window.setTimeout(() => {
                if (idCelebracao !== celebracaoAtiva) {
                    return;
                }
                timeoutCelebracao = null;
                popupAnimacao.classList.add('hidden');
                irParaJornada();
            }, tempoExibicaoFinal);
        }
    };

    requestAnimationFrame(animar);
}

// Funcao para gerar os cartoes de servicos AWS
function gerarCartoesServicos() {
    const cartoes = document.createDocumentFragment();
    
    servicosAWS.forEach((servico, index) => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-servico';
        cartao.dataset.index = index;
        
        const icone = criarIconeServico(servico, index);

        const nome = document.createElement('p');
        nome.className = 'nome-servico';
        nome.textContent = servico.nome;
        
        cartao.appendChild(icone);
        cartao.appendChild(nome);
        cartoes.appendChild(cartao);
        
        // Adiciona evento de clique para selecionar servico
        cartao.addEventListener('click', () => selecionarServico(servico));
    });

    gridServicos.replaceChildren(cartoes);
}

function criarIconeServico(servico, index) {
    if (index >= quantidadeIconesServico) {
        return criarIconeFallbackServico(servico, 'icone-servico');
    }

    const icone = document.createElement('img');
    icone.className = 'icone-servico';
    icone.decoding = 'async';
    icone.src = `imagens/servicos/servico${String(index + 1).padStart(2, '0')}.webp`;
    icone.alt = servico.nome;
    icone.addEventListener('error', () => {
        icone.replaceWith(criarIconeFallbackServico(servico, icone.className));
    }, { once: true });
    return icone;
}

function criarIconeFallbackServico(servico, className) {
    const fallback = document.createElement('span');
    fallback.className = `${className} icone-servico-fallback`;
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', servico.nome);
    fallback.textContent = servico.icone;
    return fallback;
}

function normalizarBuscaServico(texto) {
    return texto
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('pt-BR')
        .replace(/\b(?:amazon|aws)\b/g, 'aws');
}

function normalizarPronunciaServico(texto) {
    return normalizarBuscaServico(texto)
        .replace(/\blamb[iy]d[ae]\b/g, 'lambda')
        .replace(/\blambada\b/g, 'lambda');
}

function localizarServicoPorVoz(texto) {
    const palavrasIgnoradas = new Set([
        'a', 'abra', 'acessar', 'amazon', 'aws', 'da', 'das', 'de', 'do', 'dos',
        'eu', 'favor', 'me', 'mostra', 'mostrar', 'o', 'por', 'quero', 'servico',
        'servicos', 'um', 'uma'
    ]);
    const palavrasFaladas = normalizarPronunciaServico(texto)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradas.has(palavra));

    if (palavrasFaladas.length === 0) {
        return -1;
    }

    const palavrasCompactadas = palavrasFaladas.join('');
    const aliasesVoz = {
        'Amazon EC2': ['ec dois', 'e c dois', 'e c 2', 'i c dois', 'í ci tu', 'ec two'],
        'AWS Lambda': ['lambida', 'lâmbida', 'lambada', 'lambda aws'],
        'Amazon ECS': ['e c s', 'e c esse', 'e ce esse', 'é que esse', 'ecs amazon'],
        'Amazon EKS': ['e k s', 'e k esse', 'e cá esse', 'eks amazon'],
        'AWS Batch': ['batchi', 'béti', 'batch aws'],
        'Amazon Aurora': ['aurora', 'amazon aurora'],
        'Amazon DynamoDB': ['dynamo db', 'dínamo db', 'dinamo de be', 'dynamo de be'],
        'Amazon RDS': ['r d s', 'erre de esse', 'r d esse'],
        'Amazon ElastiCache': ['elastic cache', 'elasti cache', 'elast cache'],
        'Amazon Redshift': ['red shift', 'redchift'],
        'Amazon S3': ['s três', 'esse três', 's tree', 's 3'],
        'Amazon EBS': ['e b s', 'e bê esse', 'e b esse'],
        'Amazon EFS': ['e f s', 'e efe esse', 'e f esse'],
        'AWS Glue': ['glu', 'glue aws'],
        'Amazon OpenSearch': ['open search', 'open circh'],
        'Amazon Bedrock': ['bed rock', 'bedróqui'],
        'Amazon SageMaker': ['sage maker', 'seij meiker', 'seige meiker'],
        'Amazon MSK': ['m s k', 'eme esse cá'],
        'Amazon EMR': ['e m r', 'e eme erre'],
        'Amazon Kinesis': ['quinesis', 'kinésis', 'kinezes'],
        'AWS Direct Connect': ['direct connect', 'dáirect connect'],
        'Amazon CloudFront': ['cloud front', 'cláud front'],
        'AWS WAF': ['w a f', 'dábliu a efe'],
        'NAT Gateway': ['net gateway', 'nat gateway'],
        'Amazon API Gateway': ['api gateway', 'a p i gateway'],
        'Amazon CloudWatch': ['cloud watch', 'cláud uatch'],
        'AWS Config': ['config aws', 'confi'],
        'AWS Secrets Manager': ['secrets manager', 'secret manager'],
        'AWS CloudTrail': ['cloud trail', 'cláud treil'],
        'AWS KMS': ['k m s', 'cá eme esse'],
        'AWS Shield': ['shield aws', 'chield'],
        'AWS Trusted Advisor': ['trusted advisor', 'trusted adivisor'],
        'Amazon SQS': ['s q s', 'esse que esse'],
        'Amazon SNS': ['s n s', 'esse ene esse'],
        'Amazon EventBridge': ['event bridge', 'event brídge'],
        'AWS DMS': ['d m s', 'de eme esse'],
        'Amazon Neptune': ['neptune', 'néptun'],
        'Amazon DocumentDB': ['document db', 'document de be'],
        'AWS MemoryDB for Redis': ['memory db redis', 'memory db for redis', 'memory de be redis'],
        'Amazon Athena': ['athena', 'atena'],
        'Amazon Cognito': ['cognito', 'cogníto'],
        'AWS IAM Access Analyzer': ['iam access analyzer', 'i am access analyzer', 'access analyzer'],
        'AWS Transit Gateway': ['transit gateway', 'trânsito gateway'],
        'Amazon Macie': ['maci', 'massie'],
        'AWS Direct Connect Gateway': ['direct connect gateway', 'dáirect connect gateway'],
        'AWS Storage Gateway': ['storage gateway', 'storage gueituei'],
        'Amazon WorkSpaces': ['work spaces', 'work speices'],
        'Amazon VPC': ['v p c', 'vê pê cê', 'vpc']
    };
    const palavrasIgnoradasAlias = palavrasIgnoradas;
    const formasFaladas = [];
    for (let inicio = 0; inicio < palavrasFaladas.length; inicio += 1) {
        for (let tamanho = 1; tamanho <= Math.min(5, palavrasFaladas.length - inicio); tamanho += 1) {
            formasFaladas.push(palavrasFaladas.slice(inicio, inicio + tamanho).join(''));
        }
    }

    const correspondenciasExatas = [];
    servicosAWS.forEach((servico, index) => {
        const nomes = [
            servico.nome,
            ...(aliasesVoz[servico.nome] || [])
        ];
        let maiorCorrespondencia = 0;
        nomes.forEach(nome => {
            const palavrasNome = normalizarBuscaServico(nome)
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .split(/\s+/)
                .filter(palavra => palavra && !palavrasIgnoradasAlias.has(palavra));
            const compacto = palavrasNome.join('');
            if (compacto && (compacto === palavrasCompactadas || formasFaladas.includes(compacto))) {
                maiorCorrespondencia = Math.max(maiorCorrespondencia, compacto.length);
            }
        });
        if (maiorCorrespondencia > 0) {
            correspondenciasExatas.push({ index, pontuacao: maiorCorrespondencia });
        }
    });

    correspondenciasExatas.sort((a, b) => b.pontuacao - a.pontuacao);
    if (correspondenciasExatas.length > 0
        && (correspondenciasExatas.length === 1
            || correspondenciasExatas[0].pontuacao > correspondenciasExatas[1].pontuacao)) {
        return correspondenciasExatas[0].index;
    }
    if (correspondenciasExatas.length > 1
        && correspondenciasExatas[0].pontuacao === correspondenciasExatas[1].pontuacao) {
        return -1;
    }

    const servicosCorrespondentes = servicosAWS
        .map((servico, index) => {
            const palavrasServico = normalizarBuscaServico(servico.nome)
                .split(/\s+/)
                .filter(palavra => palavra !== 'aws');
            const correspondePorSequencia = palavrasServico.some((_, inicio) =>
                palavrasServico.every((palavra, deslocamento) =>
                    palavrasFaladas[inicio + deslocamento] === palavra
                )
            );
            const correspondeCompactado = palavrasCompactadas === palavrasServico.join('');

            let pontuacao = correspondePorSequencia || correspondeCompactado ? palavrasServico.length : 0;
            const formasServico = [
                servico.nome,
                ...(aliasesVoz[servico.nome] || [])
            ].map(nome => normalizarBuscaServico(nome)
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .split(/\s+/)
                .filter(palavra => palavra && !palavrasIgnoradasAlias.has(palavra))
                .join(''))
                .filter(forma => forma.length >= 5);
            formasServico.forEach(forma => {
                formasFaladas.forEach(formaFalada => {
                    if (Math.min(forma.length, formaFalada.length) < 5
                        || Math.abs(forma.length - formaFalada.length) > 2) {
                        return;
                    }
                    let anterior = Array.from({ length: formaFalada.length + 1 }, (_, posicao) => posicao);
                    for (let letra = 1; letra <= forma.length; letra += 1) {
                        const atual = [letra];
                        for (let posicao = 1; posicao <= formaFalada.length; posicao += 1) {
                            atual[posicao] = Math.min(
                                atual[posicao - 1] + 1,
                                anterior[posicao] + 1,
                                anterior[posicao - 1] + (forma[letra - 1] === formaFalada[posicao - 1] ? 0 : 1)
                            );
                        }
                        anterior = atual;
                    }
                    const similaridade = 1 - anterior[formaFalada.length] / Math.max(forma.length, formaFalada.length);
                    if (similaridade >= 0.72) {
                        pontuacao = Math.max(pontuacao, similaridade);
                    }
                });
            });

            return {
                index,
                pontuacao
            };
        })
        .filter(({ pontuacao }) => pontuacao > 0)
        .sort((a, b) => b.pontuacao - a.pontuacao);

    if (servicosCorrespondentes.length === 0
        || (servicosCorrespondentes.length > 1
            && servicosCorrespondentes[0].pontuacao - servicosCorrespondentes[1].pontuacao < 0.08)) {
        return -1;
    }

    return servicosCorrespondentes[0].pontuacao >= 0.72 ? servicosCorrespondentes[0].index : -1;
}

function definirStatusBuscaVoz(status, permitirNovaTentativa = false) {
    statusBuscaVoz.textContent = status;
    botaoTentarNovamenteBuscaVoz.classList.toggle('hidden', !permitirNovaTentativa);
}

function iniciarReconhecimentoVoz() {
    const Reconhecimento = window.SpeechRecognition || window.webkitSpeechRecognition;
    transcricaoBuscaVoz.textContent = '';
    definirAtividadeBuscaVoz(false);

    if (reconhecimentoVoz) {
        const reconhecimentoAnterior = reconhecimentoVoz;
        reconhecimentoVoz = null;
        reconhecimentoAnterior.stop();
    }

    if (!window.isSecureContext) {
        definirStatusBuscaVoz('O microfone exige HTTPS ou acesso pelo endereço localhost.');
        botaoTentarNovamenteBuscaVoz.classList.add('hidden');
        return;
    }

    if (!Reconhecimento) {
        definirStatusBuscaVoz('Este navegador não oferece suporte à busca por voz. Use Chrome ou Edge.');
        botaoTentarNovamenteBuscaVoz.classList.add('hidden');
        return;
    }

    definirStatusBuscaVoz('Solicitando acesso ao microfone...', false);

    let reconhecimento;
    try {
        reconhecimento = new Reconhecimento();
        reconhecimento.lang = 'pt-BR';
        reconhecimento.interimResults = true;
        reconhecimento.continuous = false;
        reconhecimento.maxAlternatives = 5;
    } catch (error) {
        console.error('Nao foi possivel preparar o reconhecimento de voz.', error);
        definirStatusBuscaVoz('Não foi possível preparar a busca por voz.', true);
        return;
    }

    reconhecimentoVoz = reconhecimento;
    reconhecimento.onstart = () => {
        if (reconhecimentoVoz === reconhecimento) {
            definirStatusBuscaVoz('Ouvindo...', false);
        }
    };
    reconhecimento.onspeechstart = () => {
        if (reconhecimentoVoz === reconhecimento) {
            definirAtividadeBuscaVoz(true);
        }
    };
    reconhecimento.onspeechend = () => {
        if (reconhecimentoVoz === reconhecimento) {
            definirAtividadeBuscaVoz(false);
        }
    };
    reconhecimento.onresult = (event) => {
        if (reconhecimentoVoz !== reconhecimento) {
            return;
        }

        definirAtividadeBuscaVoz(true);
        let textoFinal = '';
        let indiceServico = -1;
        for (let indice = event.resultIndex; indice < event.results.length; indice += 1) {
            const resultado = event.results[indice];
            const texto = resultado[0].transcript.trim();
            if (!resultado.isFinal) {
                transcricaoBuscaVoz.textContent = texto;
                continue;
            }

            textoFinal = texto;
            for (let alternativa = 0; alternativa < resultado.length; alternativa += 1) {
                const textoAlternativo = resultado[alternativa].transcript.trim();
                const correspondencia = localizarServicoPorVoz(textoAlternativo);
                if (correspondencia !== -1) {
                    indiceServico = correspondencia;
                    textoFinal = textoAlternativo;
                    break;
                }
            }
        }

        if (!textoFinal) {
            return;
        }

        definirAtividadeBuscaVoz(false);
        transcricaoBuscaVoz.textContent = textoFinal;
        if (indiceServico === -1) {
            definirStatusBuscaVoz('Não encontrei esse serviço. Tente dizer o nome novamente.', true);
            return;
        }

        campoBuscaServicos.value = servicosAWS[indiceServico].nome;
        registrarBuscaRecente(servicosAWS[indiceServico].nome);
        fecharPopupBuscaVoz(false);
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
        abrirPopupCartaoServico(indiceServico);
    };
    reconhecimento.onerror = (event) => {
        if (reconhecimentoVoz !== reconhecimento) {
            return;
        }

        const mensagensErro = {
            'audio-capture': 'Não foi possível acessar o microfone deste dispositivo.',
            'network': 'Falha no serviço de reconhecimento de voz. Verifique a conexão e tente novamente.',
            'not-allowed': 'Permita o acesso ao microfone nas configurações do navegador.',
            'service-not-allowed': 'O serviço de reconhecimento de voz foi bloqueado pelo navegador.',
            'no-speech': 'Não ouvi nenhuma fala. Tente novamente.'
        };
        reconhecimentoVoz = null;
        definirAtividadeBuscaVoz(false);
        definirStatusBuscaVoz(
            mensagensErro[event.error] || 'Ocorreu um erro no reconhecimento de voz.',
            event.error !== 'not-allowed' && event.error !== 'service-not-allowed'
        );
    };
    reconhecimento.onnomatch = () => {
        if (reconhecimentoVoz === reconhecimento) {
            definirAtividadeBuscaVoz(false);
            definirStatusBuscaVoz('Não identifiquei um serviço. Tente novamente.', true);
        }
    };
    reconhecimento.onend = () => {
        if (reconhecimentoVoz !== reconhecimento) {
            return;
        }

        reconhecimentoVoz = null;
        definirAtividadeBuscaVoz(false);
        if (statusBuscaVoz.textContent === 'Ouvindo...') {
            definirStatusBuscaVoz('Não ouvi nenhuma fala. Tente novamente.', true);
        }
    };

    try {
        definirStatusBuscaVoz('Solicitando acesso ao microfone...', false);
        reconhecimento.start();
    } catch (error) {
        reconhecimentoVoz = null;
        definirAtividadeBuscaVoz(false);
        console.error('Nao foi possivel iniciar o reconhecimento de voz.', error);
        definirStatusBuscaVoz('Não foi possível iniciar o reconhecimento de voz. Tente novamente.', true);
    }
}

function abrirPopupBuscaVoz() {
    resultadosBuscaServicos.classList.add('hidden');
    campoBuscaServicos.setAttribute('aria-expanded', 'false');
    popupBuscaVoz.classList.remove('hidden');
    iniciarAnimacaoOndaVoz();
    iniciarReconhecimentoVoz();
    botaoFecharPopupBuscaVoz.focus();
}

function fecharPopupBuscaVoz(retornarFoco = true) {
    if (reconhecimentoVoz) {
        const reconhecimentoAtual = reconhecimentoVoz;
        reconhecimentoVoz = null;
        reconhecimentoAtual.stop();
    }
    definirAtividadeBuscaVoz(false);
    popupBuscaVoz.classList.add('hidden');
    pararAnimacaoOndaVoz();
    if (retornarFoco && !botaoBuscaVoz.closest('.hidden')) {
        botaoBuscaVoz.focus();
    }
}

function renderizarBuscasRecentes() {
    resultadosBuscaServicos.replaceChildren();
    if (!dadosPersistidos.buscasRecentes.length) {
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
        return;
    }

    const titulo = document.createElement('p');
    titulo.className = 'titulo-buscas-recentes';
    titulo.textContent = 'Buscas recentes';
    resultadosBuscaServicos.appendChild(titulo);
    dadosPersistidos.buscasRecentes.forEach(busca => {
        const resultado = document.createElement('button');
        resultado.className = 'resultado-busca-recente';
        resultado.type = 'button';
        resultado.setAttribute('role', 'option');
        resultado.dataset.buscaRecente = busca;
        const icone = document.createElement('span');
        icone.className = 'icone-busca-recente';
        icone.setAttribute('aria-hidden', 'true');
        icone.textContent = '↺';
        const texto = document.createElement('span');
        texto.textContent = busca;
        resultado.append(icone, texto);
        resultadosBuscaServicos.appendChild(resultado);
    });

    resultadosBuscaServicos.classList.remove('hidden');
    campoBuscaServicos.setAttribute('aria-expanded', 'true');
}

function atualizarResultadosBuscaServicos() {
    const consulta = normalizarBuscaServico(campoBuscaServicos.value);

    fecharPopupCartaoServico();
    resultadosBuscaServicos.innerHTML = '';

    if (!consulta) {
        renderizarBuscasRecentes();
        return;
    }

    const servicosEncontrados = servicosAWS
        .map((servico, index) => ({ servico, index }))
        .filter(({ servico }) => normalizarBuscaServico(servico.nome).includes(consulta));

    if (servicosEncontrados.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.className = 'mensagem-busca-servicos';
        mensagem.textContent = 'Nenhum serviço encontrado';
        resultadosBuscaServicos.appendChild(mensagem);
    } else {
        servicosEncontrados.forEach(({ servico, index }) => {
            const resultado = document.createElement('button');
            resultado.className = 'resultado-busca-servico';
            resultado.type = 'button';
            resultado.setAttribute('role', 'option');
            resultado.dataset.index = index;

            const icone = criarIconeServico(servico, index);
            icone.className = 'icone-resultado-busca';

            const nome = document.createElement('span');
            nome.textContent = servico.nome;

            resultado.append(icone, nome);
            resultadosBuscaServicos.appendChild(resultado);
        });
    }

    const servicoExato = servicosAWS.findIndex(servico => normalizarBuscaServico(servico.nome) === consulta);

    if (servicoExato !== -1) {
        registrarBuscaRecente(servicosAWS[servicoExato].nome);
        abrirPopupCartaoServico(servicoExato);
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
        return;
    }

    resultadosBuscaServicos.classList.remove('hidden');
    campoBuscaServicos.setAttribute('aria-expanded', 'true');
}

function abrirPopupCartaoServico(index) {
    if (!servicosAWS[index]) {
        console.error(`Servico invalido para o indice ${index}.`);
        return;
    }
    registrarServicoNoHistorico(servicosAWS[index]);
    atualizarHistoricoAplicacao('cartao-servico', {
        indicePersonagem: personagens.indexOf(personagemSelecionado),
        indiceServico: index
    });
    abrirPopupCartaoServicoVisual(index);
}

function abrirPopupCartaoServicoVisual(index) {
    const servico = servicosAWS[index];
    const cartaoOriginal = gridServicos.querySelector(`[data-index="${index}"]`);
    if (!cartaoOriginal) {
        console.error(`Cartao do servico nao encontrado para o indice ${index}.`);
        return;
    }
    const cartaoAmpliado = cartaoOriginal.cloneNode(true);

    cartaoAmpliado.classList.add('cartao-servico-ampliado');
    cartaoAmpliado.setAttribute('role', 'button');
    cartaoAmpliado.setAttribute('tabindex', '0');
    cartaoAmpliado.setAttribute('aria-label', `Selecionar ${servico.nome}`);
    cartaoAmpliado.addEventListener('click', () => {
        fecharPopupCartaoServico();
        selecionarServico(servico);
    });
    cartaoAmpliado.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            cartaoAmpliado.click();
        }
    });

    cartaoAmpliadoServico.replaceChildren(cartaoAmpliado);
    popupCartaoServico.classList.remove('hidden');
    iniciarAnimacaoOndaPopupServico();
    botaoFecharPopupCartaoServico.focus();
}

function fecharPopupCartaoServico() {
    if (window.history.state?.app === 'FinSlash' && window.history.state.tela === 'cartao-servico') {
        window.history.back();
        return;
    }
    ocultarPopupCartaoServico();
}

function ocultarPopupCartaoServico() {
    popupCartaoServico.classList.add('hidden');
    pararAnimacaoOndaPopupServico();
    cartaoAmpliadoServico.replaceChildren();
}

function selecionarResultadoBusca(event) {
    const resultadoRecente = event.target.closest('.resultado-busca-recente');
    if (resultadoRecente) {
        campoBuscaServicos.value = resultadoRecente.dataset.buscaRecente;
        atualizarResultadosBuscaServicos();
        campoBuscaServicos.focus();
        return;
    }

    const resultado = event.target.closest('.resultado-busca-servico');
    if (!resultado) {
        return;
    }

    const index = Number(resultado.dataset.index);
    const servico = servicosAWS[index];
    const cartao = gridServicos.querySelector(`[data-index="${index}"]`);

    campoBuscaServicos.value = servico.nome;
    registrarBuscaRecente(servico.nome);
    resultadosBuscaServicos.classList.add('hidden');
    campoBuscaServicos.setAttribute('aria-expanded', 'false');
    cartao.scrollIntoView({ behavior: 'smooth', block: 'center' });
    abrirPopupCartaoServico(index);
}

// Funcao para selecionar um servico
function selecionarServico(servico) {
    registrarServicoNoHistorico(servico);
    if (!popupPerfil.classList.contains('hidden')) {
        renderizarHistoricoPerfil();
        renderizarMedalhasPerfil();
    }
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
    const personagemTemp = personagemSelecionado
        || personagens[dadosPersistidos.indicePersonagem];
    if (!personagemTemp) {
        console.error('Nao foi possivel abrir os servicos sem um personagem selecionado.');
        return;
    }
    personagemSelecionado = personagemTemp;
    salvarPersonagemSelecionado(personagens.indexOf(personagemTemp));
    
    // Para a animacao de onda
    pararAnimacaoOnda();
    
    // Fecha o popup de personagens
    fecharPopup();
    
    // Esconde a tela inicial
    telaInicial.classList.add('hidden');
    fecharPerfil();
    navegacaoApp.classList.remove('hidden');
    
    // Salva a referencia ao personagem antes de limpar
    atualizarHistoricoAplicacao('servicos', {
        indicePersonagem: personagens.indexOf(personagemTemp)
    }, true);
    
    // Define a imagem do personagem no header da tela de servicos
    imagemPersonagemHeader.src = personagemTemp.imagem;
    
    // Restaura a referencia ao personagem
    personagemSelecionado = personagemTemp;
    
    // Exibe a tela de servicos
    popupAnimacao.classList.add('hidden');
    telaServicos.classList.remove('hidden');
    atualizarDisponibilidadePesquisaNavegacao();
    
    console.log('Tela de servicos deve estar visivel agora');
    
    // Gera os cartoes de servicos
    if (!gridServicos.children.length) {
        gerarCartoesServicos();
    }
    
    console.log('Personagem selecionado:', personagemSelecionado.imagem);
    console.log('Preparado para integracao com API Java Spring Boot');
}

// Event Listeners
cartaoCentral.addEventListener('click', abrirPopup);

botaoMenuApp.addEventListener('click', () => {
    atualizarHistoricoAplicacao('personagens', {
        indicePersonagem: dadosPersistidos.indicePersonagem
    });
    mostrarMenuPersonagens();
});
botaoPesquisaApp.addEventListener('click', () => {
    if (!telaServicos.classList.contains('hidden')) {
        campoBuscaServicos.focus();
        campoBuscaServicos.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    if (!personagemSelecionado && personagens[dadosPersistidos.indicePersonagem]) {
        personagemSelecionado = personagens[dadosPersistidos.indicePersonagem];
    }
    if (!personagemSelecionado) {
        return;
    }
    if (!popupPersonagemSelecionado.classList.contains('hidden')) {
        botaoSeguirSelecionado.click();
        return;
    }
    irParaJornada();
});
botaoContinuarMenu.addEventListener('click', irParaJornada);
botaoVoltarSelecionado.addEventListener('click', voltarPelaNavegacao);
botaoPerfilApp.addEventListener('click', abrirPerfil);
botaoFecharPerfil.addEventListener('click', fecharPerfil);
botaoEditarTituloPerfil.addEventListener('click', editarNomePerfil);
formularioEditarNomePerfil.addEventListener('submit', salvarNomePerfil);
botaoCancelarEdicaoNomePerfil.addEventListener('click', fecharEdicaoNomePerfil);
campoNomePerfil.addEventListener('input', () => {
    campoNomePerfil.removeAttribute('aria-invalid');
    erroNomePerfil.textContent = '';
    erroNomePerfil.classList.add('hidden');
});
popupEditarNomePerfil.addEventListener('click', event => {
    if (event.target === popupEditarNomePerfil) {
        fecharEdicaoNomePerfil();
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !popupEditarNomePerfil.classList.contains('hidden')) {
        fecharEdicaoNomePerfil();
        botaoEditarTituloPerfil.focus();
    }
});
popupPerfil.addEventListener('click', event => {
    if (event.target === popupPerfil) {
        fecharPerfil();
    }
});
document.querySelectorAll('[data-aba-perfil]').forEach(botao => {
    botao.addEventListener('click', () => atualizarConteudoAbaPerfil(botao.dataset.abaPerfil));
});
botaoBuscaVoz.addEventListener('click', abrirPopupBuscaVoz);
botaoFecharPopupBuscaVoz.addEventListener('click', () => fecharPopupBuscaVoz());
botaoTentarNovamenteBuscaVoz.addEventListener('click', iniciarReconhecimentoVoz);
popupBuscaVoz.addEventListener('click', (event) => {
    if (event.target === popupBuscaVoz) {
        fecharPopupBuscaVoz();
    }
});

campoBuscaServicos.addEventListener('input', atualizarResultadosBuscaServicos);
campoBuscaServicos.addEventListener('focus', () => {
    if (!campoBuscaServicos.value.trim()) {
        renderizarBuscasRecentes();
    }
});
resultadosBuscaServicos.addEventListener('click', selecionarResultadoBusca);
campoBuscaServicos.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
        fecharPopupCartaoServico();
    }
});

botaoFecharPopupCartaoServico.addEventListener('click', fecharPopupCartaoServico);
popupCartaoServico.addEventListener('click', (event) => {
    if (event.target === popupCartaoServico) {
        fecharPopupCartaoServico();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popupPerfil.classList.contains('hidden')) {
        fecharPerfil();
        return;
    }
    if (event.key === 'Escape' && !popupBuscaVoz.classList.contains('hidden')) {
        fecharPopupBuscaVoz();
        return;
    }
    if (event.key === 'Escape' && !popupCartaoServico.classList.contains('hidden')) {
        fecharPopupCartaoServico();
    }
});

document.addEventListener('click', (event) => {
    if (!buscaServicos.contains(event.target)) {
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
    }
});

botaoSeguirSelecionado.addEventListener('click', iniciarAnimacaoCelebracao);

// Fechar popup ao clicar fora do conteudo
popupPersonagens.addEventListener('click', (event) => {
    if (event.target === popupPersonagens) {
        voltarPelaNavegacao();
    }
});

popupPersonagemSelecionado.addEventListener('click', (event) => {
    if (event.target === popupPersonagemSelecionado) {
        voltarPelaNavegacao();
    }
});

// Inicializacao
document.addEventListener('DOMContentLoaded', () => {
    window.history.replaceState({ app: 'FinSlash', tela: 'inicio' }, '', window.location.href);
    atualizarAvatarNavegacao();
    atualizarDisponibilidadePesquisaNavegacao();
    gerarCartoesPersonagens();
    decodificarImagensPersonagens();
    inicializarCanvasOnda();
});
