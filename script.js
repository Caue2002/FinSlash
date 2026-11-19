// Dados estáticos dos personagens, serviços AWS e diagnósticos cadastrados.
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
    { nome: 'Vegeta', cores: ['#111827', '#2563eb'], imagem: 'imagens/personagem18.webp', gif: 'imagens/gif18.gif' },
    { nome: 'Creeper', cor: '#90ee90', imagem: 'imagens/personagem19.png', gif: 'imagens/gif19.gif' },
    { nome: 'Ryu', cores: ['#ffffff', '#ef4444'], imagem: 'imagens/personagem20.jpg', gif: 'imagens/gif20.gif' },
    { nome: 'Chun-Li', cor: '#87ceeb', imagem: 'imagens/personagem21.jpg', gif: 'imagens/gif21.gif' }
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
const topicosEC2 = [
    {
        titulo: 'Instâncias Superdimensionadas (Over-provisioning)',
        descricao: 'Engenheiros alocam instâncias gigantes (ex: m5.8xlarge) para processamento diário temendo estouro de memória, mas a utilização real raramente passa de 5% de CPU/RAM no dia a dia.'
    },
    {
        titulo: 'Ambientes de Staging/HML Rodando 24/7',
        descricao: 'Servidores de desenvolvimento, testes e homologação continuam ativos durante madrugadas e finais de semana. Em bancos, onde há dezenas de times, isso gera mais de 100 horas de cobrança inútil por semana.'
    },
    {
        titulo: 'Rodando Cargas Contínuas no Preço On-Demand',
        descricao: 'Manter aplicações do Core Bancário com uso estável o ano todo pagando a taxa cheia On-Demand, sem contratar Compute Savings Plans ou Reserved Instances, desperdiçando até 72% de desconto.'
    },
    {
        titulo: 'Compra de Savings Plan antes do Rightsizing',
        descricao: 'Comprar contratos de 1 a 3 anos da AWS para garantir desconto em uma frota de EC2 sem antes reduzir as instâncias ao tamanho certo. O banco fica preso pagando por capacidade inútil no longo prazo.'
    },
    {
        titulo: 'Execução de Banco de Dados Relacional em EC2',
        descricao: 'Instalar bancos de dados manuais (MySQL/PostgreSQL) dentro de instâncias EC2 em vez de usar serviços gerenciados (como Aurora ou RDS). Além de custos operacionais altos, exige instâncias imensas com IOPS caros provisionados sem automação.'
    },
    {
        titulo: 'Ignorar Famílias de Instâncias da Nova Geração',
        descricao: 'Manter instâncias antigas em execução (ex: famílias t2 ou m4) por medo de migração, pagando mais caro por menos desempenho em comparação às gerações atuais (como t3/t4g, m6i/m7g).'
    },
    {
        titulo: 'Processamento de Lotes (Batch) em Instâncias Dedicadas',
        descricao: 'Rodar liquidações financeiras noturnas ou relatórios de risco em instâncias On-Demand fixas, em vez de usar instâncias Spot (com até 90% de desconto) ou AWS Batch transitório.'
    },
    {
        titulo: 'Subutilização por Falta de Auto Scaling de Redução (Scale-In)',
        descricao: 'Configurar grupos de Auto Scaling para criar novas instâncias durante picos de transações (ex: horário do almoço no PIX), mas esquecer de configurar a política de encerramento quando o tráfego cai.'
    },
    {
        titulo: 'Arquivos de Log Armazenados em Discos Locais (EBS)',
        descricao: 'Gravar DEBUG logs do banco diretamente no disco da máquina em vez de enviar para o CloudWatch/S3, forçando o aumento constante e desnecessário do tamanho dos discos rígidos virtuais.'
    },
    {
        titulo: 'Uso do Processador x86 em Vez de Arquitetura ARM (Graviton)',
        descricao: 'Manter microsserviços rodando exclusivamente na arquitetura Intel/AMD sem avaliar a migração para os chips AWS Graviton (baseados em ARM), que entregam melhor desempenho com custo de até 20% a 40% menor.'
    },
    {
        titulo: 'Instâncias "Zumbis" (Orphaned Instances)',
        descricao: 'Instâncias ligadas para realizar testes temporários de integrações de parceiros ou validação de código que foram esquecidas pelos desenvolvedores e continuam cobrando por meses.'
    },
    {
        titulo: 'Endereços de IP Público (Elastic IP) Não Associados',
        descricao: 'Manter endereços de IP estáticos públicos (Elastic IPs) criados na conta, mas desalocados de instâncias ativas, o que gera cobrança por hora por IP ocioso.'
    },
    {
        titulo: 'Agendamento de Trabalhos (Cronjobs) em Servidores Permanentes',
        descricao: 'Manter uma instância EC2 dedicada 24 horas por dia apenas para rodar uma tarefa automática (script) que dura 30 segundos no final da noite, em vez de migrar para AWS Lambda ou EventBridge Scheduler.'
    },
    {
        titulo: 'Hospedagem de Front-end/Websites Estáticos em EC2',
        descricao: 'Subir servidores Web (Nginx/Apache) em instâncias EC2 para entregar interfaces estáticas do Internet Banking, em vez de usar Amazon S3 + CloudFront (que custa frações de centavos).'
    },
    {
        titulo: 'Discos EBS Não Excluídos ao Terminar a Instância',
        descricao: 'Encerrar instâncias EC2 sem marcar a opção DeleteOnTerminate no disco raiz, deixando volumes de disco rígido (EBS) "órfãos" gerando cobrança perpétua na fatura.'
    },
    {
        titulo: 'Tipo de Armazenamento de Disco Desatualizado (gp2 vs gp3)',
        descricao: 'Manter volumes de disco do tipo gp2 padrão em vez de atualizar para gp3. O gp3 é até 20% mais barato e permite configurar velocidade (IOPS/Throughput) sem precisar pagar por espaço em disco adicional.'
    },
    {
        titulo: 'Excesso de Discos Provisionados com IOPS Altos (io1/io2)',
        descricao: 'Dimensionar discos com IOPS garantidos (io1/io2) no nível máximo para aplicações de baixo impacto, pagando taxas altíssimas por throughput que a aplicação nunca atinge.'
    },
    {
        titulo: 'Falta de Restrição em Testes de Load Testing',
        descricao: 'Ambientes de teste de estresse que sobem centenas de instâncias EC2 gigantes para simular grandes volumes de acessos (ex: Black Friday) e permanecem ativos após a conclusão dos testes.'
    },
    {
        titulo: 'Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ)',
        descricao: 'Instâncias instaladas em zonas diferentes (us-east-1a e us-east-1b) comunicando-se intensamente entre si sem passar por rotas locais, gerando cobranças massivas por transferência de dados dentro da mesma VPC.'
    },
    {
        titulo: 'Snapshots de Disco sem Política de Retenção (EBS Snapshots)',
        descricao: 'Criar backups diários de discos EC2 para conformidade auditável de bancos, mas sem aplicar regras de expiração (como Data Lifecycle Manager), acumulando anos de fotos de discos inutilizadas.'
    },
    {
        titulo: 'Falta de Adesão a Planos de Savings Plans ou Instâncias Reservadas',
        descricao: 'Manter a frota principal de servidores de aplicação produtivos rodando 24/7 na modalidade On-Demand por anos, ignorando os descontos de até 72% oferecidos por compromissos de longo prazo da AWS.'
    }
];
const topicosPorServico = Object.assign(window.finSlashTopicos, {
    'Amazon EC2': { titulo: 'EC2', topicos: topicosEC2 }
});

// Limites e chaves usadas para salvar preferências e o histórico da Navi.
const quantidadeIconesServico = 48;
const chaveArmazenamentoAplicacao = 'finslash:preferencias';
const chaveHistoricoAdvisor = 'finslash:historico-navi';
const chavePreferenciaRespostaAdvisor = 'finslash:preferencia-resposta-navi';
const limiteMensagensHistoricoAdvisor = 40;
const limiteMensagensContextoAdvisor = 6;
const preferenciasRespostaAdvisor = new Set([
    'estilo_aprovado',
    'mais_completa',
    'mais_verificada',
    'mais_simples',
    'mais_direta'
]);
const preferenciasRespostaPorMotivoFeedback = {
    incompleta: 'mais_completa',
    incorreta: 'mais_verificada',
    confusa: 'mais_simples',
    fora_da_pergunta: 'mais_direta'
};

// Estado compartilhado da navegação, das animações e das consultas atuais.
let personagemSelecionado = null;
const dadosPersistidos = carregarDadosPersistidos();
let celebracaoAtiva = 0;
let timeoutCelebracao = null;
let inicioGestoVoltar = null;
let navegacaoVoltarPendente = false;
let alturaViewportAdvisorSemTeclado = null;
let larguraViewportAdvisorSemTeclado = null;
const gifsCelebracaoPrecarregados = new Map();

// Referências aos elementos da interface e aos controles principais.
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
const conteudoServicos = document.querySelector('#tela-servicos > .servicos-container');
const telaTopicosServico = document.getElementById('tela-topicos-servico');
const tituloTelaTopicosServico = document.getElementById('titulo-tela-topicos-servico');
const gridTopicosServico = document.getElementById('grid-topicos-servico');
const popupTopicoServico = document.getElementById('popup-topico-servico');
const tituloPopupTopicoServico = document.getElementById('titulo-popup-topico-servico');
const descricaoPopupTopicoServico = document.getElementById('descricao-popup-topico-servico');
const botaoFecharPopupTopicoServico = document.getElementById('fechar-popup-topico-servico');
const botaoVoltarTopicoServico = document.getElementById('botao-voltar-topico-servico');
const botaoSeguirTopicoServico = document.getElementById('botao-seguir-topico-servico');
const painelDiagnosticoTopico = document.getElementById('diagnostico-topico-servico');
const statusDiagnosticoTopico = document.getElementById('status-diagnostico-topico');
const conteudoDiagnosticoTopico = document.getElementById('conteudo-diagnostico-topico');
const botaoVoltarTelaTopicos = document.getElementById('botao-voltar-tela-topicos');
let servicoTopicosAtual = null;
let requisicaoDiagnosticoAtual = 0;
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
const sugestoesBuscaVoz = document.getElementById('sugestoes-busca-voz');
const navegacaoApp = document.getElementById('navegacao-app');
const botaoMenuApp = document.getElementById('botao-menu-app');
const botaoPesquisaApp = document.getElementById('botao-pesquisa-app');
const botaoPerfilApp = document.getElementById('botao-perfil-app');
const botaoAdvisorApp = document.getElementById('botao-advisor-app');
const popupAdvisor = document.getElementById('popup-advisor');
const botaoFecharAdvisor = document.getElementById('fechar-advisor');
const formularioAdvisor = document.getElementById('formulario-advisor');
const campoAdvisor = document.getElementById('campo-advisor');
const contadorAdvisor = document.getElementById('contador-advisor');
const botaoEnviarAdvisor = document.getElementById('botao-enviar-advisor');
const statusAdvisor = document.getElementById('status-advisor');
const cenariosAdvisor = document.getElementById('cenarios-advisor');
const mensagensAdvisor = document.getElementById('mensagens-advisor');
const boasVindasAdvisor = document.getElementById('boas-vindas-advisor');
let enviandoAdvisor = false;
const avatarNavegacaoApp = document.getElementById('avatar-navegacao-app');
const iconePerfilApp = document.getElementById('icone-perfil-app');
const popupPerfil = document.getElementById('popup-perfil');
const botaoFecharPerfil = document.getElementById('fechar-perfil');
const popupConquistaFinal = document.getElementById('popup-conquista-final');
const botaoFecharConquistaFinal = document.getElementById('fechar-conquista-final');
const botaoContinuarConquista = document.getElementById('botao-continuar-conquista');
const insigniaConquistaPerfil = document.getElementById('insignia-conquista-perfil');
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
const resumoMedalhasPerfil = document.getElementById('resumo-medalhas-perfil');
const campoFeedbackPerfil = document.getElementById('campo-feedback-perfil');
const categoriaFeedbackPerfil = document.getElementById('categoria-feedback-perfil');
const botaoEnviarFeedback = document.getElementById('botao-enviar-feedback');
const statusFeedbackPerfil = document.getElementById('status-feedback-perfil');
let enviandoFeedback = false;
const secoesPerfil = {
    historico: document.getElementById('conteudo-historico-perfil'),
    medalhas: document.getElementById('conteudo-medalhas-perfil'),
    feedback: document.getElementById('conteudo-feedback-perfil')
};

// Lê, valida e salva preferências locais sem interromper a navegação.
function carregarDadosPersistidos() {
    try {
        const armazenado = window.localStorage.getItem(chaveArmazenamentoAplicacao);
        if (!armazenado) {
            return {
                indicePersonagem: null,
                buscasRecentes: [],
                historicoServicos: [],
                servicosExplorados: [],
                nomePerfil: 'Meu perfil'
            };
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
        const servicosExploradosSalvos = Array.isArray(dados.servicosExplorados)
            ? dados.servicosExplorados.filter(nome =>
                typeof nome === 'string' && servicosAWS.some(servico => servico.nome === nome)
            )
            : [];
        const servicosExplorados = [...new Set([
            ...servicosExploradosSalvos,
            ...historicoServicos.map(item => item.nome)
        ])];
        const nomePerfil = typeof dados.nomePerfil === 'string' && dados.nomePerfil.trim()
            ? dados.nomePerfil.trim().slice(0, 40)
            : 'Meu perfil';

        return { indicePersonagem, buscasRecentes, historicoServicos, servicosExplorados, nomePerfil };
    } catch (error) {
        console.error('Nao foi possivel carregar as preferencias salvas do FinSlash.', error);
        return {
            indicePersonagem: null,
            buscasRecentes: [],
            historicoServicos: [],
            servicosExplorados: [],
            nomePerfil: 'Meu perfil'
        };
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
    const novoServicoExplorado = !dadosPersistidos.servicosExplorados.includes(servico.nome);
    if (novoServicoExplorado) {
        dadosPersistidos.servicosExplorados.push(servico.nome);
    }
    dadosPersistidos.historicoServicos = [
        { nome: servico.nome, data: Date.now() },
        ...dadosPersistidos.historicoServicos
    ].slice(0, 50);
    salvarDadosPersistidos();
    atualizarAvatarNavegacao();
    if (novoServicoExplorado && dadosPersistidos.servicosExplorados.length >= servicosAWS.length) {
        abrirPopupConquistaFinal();
    }
}

function atualizarAvatarNavegacao() {
    const conquistaFinalDesbloqueada = dadosPersistidos.servicosExplorados.length >= servicosAWS.length;
    insigniaConquistaPerfil.classList.toggle('hidden', !conquistaFinalDesbloqueada);
    botaoPerfilApp.setAttribute(
        'aria-label',
        conquistaFinalDesbloqueada ? 'Abrir perfil. Conquista Guardião AWS desbloqueada' : 'Abrir perfil'
    );
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

// Monta o perfil, o histórico de serviços e as conquistas da pessoa usuária.
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
    const total = dadosPersistidos.servicosExplorados.length;
    const conquistas = [
        { limite: 1, nome: 'Primeiro passo', descricao: 'Explore seu primeiro serviço AWS.', icone: '🌱' },
        { limite: 5, nome: 'Curioso', descricao: 'Explore 5 serviços AWS diferentes.', icone: '🧭' },
        { limite: 10, nome: 'Explorador', descricao: 'Explore 10 serviços AWS diferentes.', icone: '🥉' },
        { limite: 15, nome: 'Colecionador de serviços', descricao: 'Conheça 15 serviços AWS diferentes.', icone: '🥈' },
        { limite: 20, nome: 'Arquiteto da nuvem', descricao: 'Explore 20 serviços AWS diferentes.', icone: '🥇' },
        { limite: 30, nome: 'Mestre da nuvem', descricao: 'Descubra 30 serviços AWS diferentes.', icone: '🏆' },
        { limite: 40, nome: 'Lenda FinSlash', descricao: 'Explore 40 serviços AWS diferentes.', icone: '💎' },
        { limite: servicosAWS.length, nome: 'Guardião AWS', descricao: 'Explore todos os serviços AWS disponíveis.', icone: '👑' }
    ];
    listaMedalhasPerfil.replaceChildren();
    resumoMedalhasPerfil.textContent = `${conquistas.filter(conquista =>
        total >= conquista.limite
    ).length} de ${conquistas.length} conquistas desbloqueadas`;

    conquistas.forEach((conquista, indice) => {
        const conquistada = total >= conquista.limite;
        const item = document.createElement('div');
        item.className = `item-medalha-perfil${conquistada ? ' conquistada' : ''}`;
        item.style.setProperty('--indice-conquista', indice);
        const icone = document.createElement('span');
        icone.className = 'icone-medalha-perfil';
        icone.setAttribute('aria-hidden', 'true');
        icone.textContent = conquistada ? conquista.icone : '🔒';
        const detalhes = document.createElement('div');
        const nome = document.createElement('strong');
        nome.textContent = conquista.nome;
        const descricao = document.createElement('p');
        descricao.textContent = conquista.descricao;
        const estado = document.createElement('span');
        estado.className = 'estado-medalha-perfil';
        estado.textContent = conquistada ? 'Conquistada' : `${total} de ${conquista.limite} serviços`;
        const progresso = document.createElement('div');
        progresso.className = 'progresso-medalha-perfil';
        progresso.setAttribute('role', 'progressbar');
        progresso.setAttribute('aria-label', `Progresso: ${conquista.nome}`);
        progresso.setAttribute('aria-valuemin', '0');
        progresso.setAttribute('aria-valuemax', String(conquista.limite));
        progresso.setAttribute('aria-valuenow', String(Math.min(total, conquista.limite)));
        const barra = document.createElement('span');
        barra.style.width = `${Math.min(total / conquista.limite, 1) * 100}%`;
        progresso.appendChild(barra);
        detalhes.append(nome, descricao, estado, progresso);
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

// Abre e fecha a Navi, ajustando o foco e o histórico do navegador.
function abrirAdvisor() {
    fecharPerfil();
    popupAdvisor.classList.remove('hidden');
    alturaViewportAdvisorSemTeclado = window.visualViewport?.height ?? window.innerHeight;
    larguraViewportAdvisorSemTeclado = window.innerWidth;
    atualizarViewportVisualAdvisor();
    if (!mensagensAdvisor.childElementCount && dadosPersistidos.nomePerfil !== 'Meu perfil') {
        adicionarMensagemAdvisor(
            'assistant',
            `Olá! Sou a Navi. Notei que o nome cadastrado em seu perfil é ${dadosPersistidos.nomePerfil}. Deseja que eu lhe chame por esse nome?`
        );
    }
    const painelAdvisor = popupAdvisor.querySelector('.painel-advisor');
    painelAdvisor?.classList.toggle('advisor-consulta', mensagensAdvisor.childElementCount > 0);
    if (!mensagensAdvisor.childElementCount) {
        boasVindasAdvisor?.classList.remove('hidden');
    } else {
        boasVindasAdvisor?.classList.add('hidden');
    }
    rolarMensagensParaMaisRecente();
    if (window.history.state?.app === 'FinSlash' && window.history.state.tela !== 'advisor') {
        atualizarHistoricoAplicacao('advisor', {
            telaAnterior: window.history.state.tela
        });
    }
    window.setTimeout(() => campoAdvisor.focus(), 0);
}

function fecharAdvisor(retornarFoco = true) {
    if (!popupAdvisor.classList.contains('hidden')
        && window.history.state?.app === 'FinSlash'
        && window.history.state.tela === 'advisor') {
        window.history.back();
        return;
    }
    popupAdvisor.classList.add('hidden');
    if (retornarFoco && !botaoAdvisorApp.closest('.hidden')) {
        botaoAdvisorApp.focus();
    }
}

function fecharAdvisorVisual(retornarFoco = false) {
    popupAdvisor.classList.add('hidden');
    popupAdvisor.classList.remove('advisor-teclado');
    popupAdvisor.querySelector('.painel-advisor')?.classList.remove('advisor-digitando');
    alturaViewportAdvisorSemTeclado = null;
    larguraViewportAdvisorSemTeclado = null;
    if (retornarFoco && !botaoAdvisorApp.closest('.hidden')) {
        botaoAdvisorApp.focus();
    }
}

// Filtra links apresentados pela Navi e impede endereços externos inválidos.
function validarLinkAws(url) {
    try {
        const link = new URL(url);
        return link.protocol === 'https:' && !link.username && !link.password && (
            link.hostname === 'aws.amazon.com'
            || link.hostname.endsWith('.aws.amazon.com')
            || link.hostname.endsWith('.amazonaws.com')
        );
    } catch (error) {
        return false;
    }
}

function validarLinkHttps(url) {
    try {
        const link = new URL(url);
        const hostname = link.hostname.replace(/^\[|\]$/gu, '');
        return link.protocol === 'https:'
            && Boolean(link.hostname)
            && !link.username
            && !link.password
            && !/^(\d{1,3}\.){3}\d{1,3}$/u.test(hostname)
            && !hostname.includes(':')
            && hostname !== 'localhost'
            && !hostname.endsWith('.localhost');
    } catch (error) {
        return false;
    }
}

function perguntaSolicitaLinksAdvisor(pergunta) {
    const normalizada = pergunta
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase();
    return /\b(links?|urls?|fontes?|referencias?|documentacao)\b/u.test(normalizada)
        || /\b(?:sites?|paginas?) oficiais?\b/u.test(normalizada)
        || /\b(?:me )?(?:manda|mande|envia|envie|passa|passe|mostra|mostre|compartilha|compartilhe)\b.{0,50}\b(?:site|pagina)\b/u.test(normalizada)
        || /\bonde (?:posso|consigo) (?:ler|encontrar|consultar|acessar)\b/u.test(normalizada);
}

function removerLinksAdvisor(texto) {
    return texto
        .replace(/\[([^\]]+)\]\((?:https?:\/\/|www\.)[^)\s]+\)/giu, '$1')
        .replace(/\b(?:https?:\/\/|www\.)[^\s<>()]+/giu, '')
        .replace(/[ \t]{2,}/gu, ' ')
        .replace(/ *\n */gu, '\n')
        .trim();
}

function respostaEstruturadaAdvisor(resultado) {
    return removerLinksAdvisor([
        typeof resultado.diagnostico === 'string' ? resultado.diagnostico : '',
        typeof resultado.verificacao === 'string' ? `Verificação: ${resultado.verificacao}` : '',
        typeof resultado.acao === 'string' ? `Como proceder: ${resultado.acao}` : '',
        typeof resultado.cuidados === 'string' ? `Cuidados: ${resultado.cuidados}` : ''
    ].filter(Boolean).join('\n\n'));
}

function respostaTerminaComReferenciaAdvisor(texto) {
    const normalizada = texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/gu, '')
        .toLowerCase();
    return /^(?:consulte|acesse|veja|leia|confira|abra)(?:\s+(?:agora|a|o|os|as|na|no|nas|nos|fonte|fontes|documentacao|documento|link|site|pagina|aws|oficial|oficiais|para|mais|informacoes))*[\s.,!?;:…]*$/u.test(normalizada)
        || /\b(?:consulte|acesse|veja|leia|confira|documentacao|fonte|referencia)\b[\s.,!?;:…]*$/u.test(normalizada);
}

// Prepara respostas, valida fontes e desenha os indicadores de origem.
function obterRespostaAdvisor(resultado, mostrarLinks) {
    const respostaEstruturada = respostaEstruturadaAdvisor(resultado);
    const respostaOriginal = typeof resultado.resposta === 'string'
        && resultado.resposta.trim()
        ? resultado.resposta.trim()
        : respostaEstruturada;
    if (mostrarLinks) {
        return respostaOriginal;
    }

    const respostaSemLinks = removerLinksAdvisor(respostaOriginal);
    if (!respostaSemLinks || respostaTerminaComReferenciaAdvisor(respostaSemLinks)) {
        return respostaEstruturada
            || 'A Navi não recebeu detalhes suficientes para formular uma resposta completa sem o link. Reformule a pergunta ou peça a fonte.';
    }
    return respostaSemLinks;
}

function obterFontesAdvisor(resultado) {
    const permiteFontesExternas = [
        'gemini-geral-busca',
        'open-meteo',
        'horario-open-meteo'
    ].includes(resultado.fonte);
    const fontes = Array.isArray(resultado.sources)
        ? resultado.sources
            .filter((fonte) => fonte
                && typeof fonte === 'object'
                && typeof fonte.url === 'string'
                && (validarLinkAws(fonte.url)
                    || (permiteFontesExternas && validarLinkHttps(fonte.url))))
            .map((fonte) => ({
                title: typeof fonte.title === 'string' && fonte.title.trim()
                    ? fonte.title.trim()
                    : 'Fonte consultada',
                url: fonte.url
            }))
        : [];
    if (typeof resultado.documentacao === 'string'
        && validarLinkAws(resultado.documentacao)
        && !fontes.some((fonte) => fonte.url === resultado.documentacao)) {
        fontes.push({
            title: 'Documentação oficial da AWS',
            url: resultado.documentacao
        });
    }
    return fontes;
}

function criarFontesAdvisor(resultado, fontes) {
    const origens = new Map();
    fontes.forEach((fonte) => {
        const url = new URL(fonte.url);
        const ehAws = validarLinkAws(fonte.url);
        const mostrarLink = resultado.mostrarLinks || !ehAws;
        const chave = url.origin;
        const dominio = url.hostname.replace(/^www\./u, '');
        if (!origens.has(chave)) {
            origens.set(chave, {
                nome: ehAws ? 'AWS' : dominio,
                logo: ehAws ? 'imagens/aws-logo.ico' : null,
                inicial: dominio.charAt(0).toUpperCase(),
                url: mostrarLink ? fonte.url : null,
                titulo: fonte.title
            });
        }
    });

    const origemFinSlash = typeof resultado.validacao?.origem === 'string'
        && resultado.validacao.origem.toLowerCase().includes('finslash');
    const catalogoFinSlash = ['banco', 'banco-validado', 'gemini+banco-validado', 'orientacao_padrao']
        .includes(resultado.fonte);
    if (origemFinSlash || catalogoFinSlash) {
        origens.set('finslash', {
            nome: 'FinSlash',
            logo: 'imagens/logo.webp',
            inicial: 'F',
            url: null,
            titulo: 'FinSlash'
        });
    }
    if (!origens.size) {
        return null;
    }

    const secao = document.createElement('div');
    secao.className = 'fontes-mensagem-advisor';
    secao.setAttribute('role', 'group');
    secao.setAttribute('aria-label', 'Fontes da resposta');
    origens.forEach((origem) => {
        const identificacao = document.createElement(origem.url ? 'a' : 'span');
        identificacao.className = 'origem-mensagem-advisor';
        if (origem.nome === 'FinSlash') {
            identificacao.classList.add('origem-mensagem-advisor-finslash');
        }
        identificacao.title = origem.titulo || origem.nome;
        if (origem.url) {
            identificacao.href = origem.url;
            identificacao.target = '_blank';
            identificacao.rel = 'noopener noreferrer';
            identificacao.setAttribute('aria-label', `Abrir fonte: ${origem.titulo}`);
        } else {
            identificacao.setAttribute('role', 'img');
            identificacao.setAttribute('aria-label', origem.nome);
        }
        if (origem.logo) {
            const logo = document.createElement('img');
            logo.src = origem.logo;
            logo.alt = '';
            logo.loading = 'lazy';
            logo.decoding = 'async';
            logo.referrerPolicy = 'no-referrer';
            logo.addEventListener('error', () => {
                logo.hidden = true;
            });
            identificacao.appendChild(logo);
        } else {
            const inicial = document.createElement('span');
            inicial.className = 'origem-mensagem-advisor-inicial';
            inicial.textContent = origem.inicial;
            identificacao.appendChild(inicial);
        }
        secao.appendChild(identificacao);
    });
    return secao;
}

// Mantém o contexto recente da Navi e adapta o painel ao teclado móvel.
function salvarHistoricoAdvisor() {
    const historico = Array.from(mensagensAdvisor.children)
        .filter((mensagem) => !mensagem.classList.contains('mensagem-pensando-advisor'))
        .map((mensagem) => ({
            tipo: mensagem.dataset.tipo,
            texto: mensagem.querySelector('.texto-principal-mensagem-advisor')?.textContent || '',
            resultado: mensagem.resultadoAdvisor || null
        }))
        .slice(-limiteMensagensHistoricoAdvisor);
    try {
        window.sessionStorage.setItem(chaveHistoricoAdvisor, JSON.stringify(historico));
    } catch (error) {
        console.error('Não foi possível manter o histórico da Navi nesta aba.', error);
    }
}

function obterPreferenciaRespostaAdvisor() {
    try {
        const preferencia = window.sessionStorage.getItem(chavePreferenciaRespostaAdvisor);
        if (!preferencia) {
            return null;
        }
        if (!preferenciasRespostaAdvisor.has(preferencia)) {
            console.warn('A preferência de resposta inválida da Navi foi ignorada.');
            return null;
        }
        return preferencia;
    } catch (error) {
        console.error('Não foi possível ler a preferência de resposta da Navi nesta aba.', error);
        return null;
    }
}

function salvarPreferenciaRespostaAdvisor(preferencia) {
    if (!preferenciasRespostaAdvisor.has(preferencia)) {
        throw new TypeError('A preferência de resposta da Navi é inválida.');
    }
    try {
        window.sessionStorage.setItem(chavePreferenciaRespostaAdvisor, preferencia);
        return true;
    } catch (error) {
        console.error('Não foi possível manter a preferência da Navi nesta aba.', error);
        return false;
    }
}

function obterContextoHistoricoAdvisor() {
    const historico = Array.from(mensagensAdvisor.children)
        .filter((mensagem) => !mensagem.classList.contains('mensagem-pensando-advisor')
            && !mensagem.resultadoAdvisor?.repetirPergunta)
        .map((mensagem) => ({
            tipo: mensagem.dataset.tipo,
            texto: Array.from(
                mensagem.querySelector('.texto-principal-mensagem-advisor')?.textContent || ''
            ).slice(0, 300).join(''),
            resultado: mensagem.resultadoAdvisor || null
        }))
        .filter((mensagem) => ['user', 'assistant'].includes(mensagem.tipo) && mensagem.texto)
        .slice(-limiteMensagensContextoAdvisor);
    const ultimaMensagem = historico[historico.length - 1];
    return historico.map((mensagem, indice) => ({
        tipo: mensagem.tipo,
        texto: mensagem.texto,
        ...(indice === historico.length - 1
            && ultimaMensagem?.tipo === 'assistant'
            && mensagem.resultado?.conversa
            ? { conversa: mensagem.resultado.conversa }
            : {})
    }));
}

function restaurarHistoricoAdvisor() {
    try {
        const armazenado = window.sessionStorage.getItem(chaveHistoricoAdvisor);
        if (!armazenado) {
            return;
        }
        const historico = JSON.parse(armazenado);
        if (!Array.isArray(historico)) {
            throw new TypeError('O histórico da Navi precisa ser uma lista.');
        }
        let historicoAtualizado = false;
        historico.forEach((item) => {
            const resultadoValido = item?.resultado === null
                || (typeof item?.resultado === 'object' && !Array.isArray(item.resultado));
            if (!item
                || !['user', 'assistant'].includes(item.tipo)
                || typeof item.texto !== 'string'
                || !resultadoValido) {
                console.warn('Uma mensagem inválida do histórico da Navi foi ignorada.');
                return;
            }
            const textoAtualizado = item.tipo === 'assistant'
                && item.resultado
                && !item.resultado.repetirPergunta
                && item.resultado.mostrarLinks === false
                && (!item.texto.trim() || respostaTerminaComReferenciaAdvisor(item.texto))
                ? obterRespostaAdvisor(item.resultado, false)
                : item.texto;
            if (textoAtualizado !== item.texto) {
                historicoAtualizado = true;
            }
            adicionarMensagemAdvisor(item.tipo, textoAtualizado, item.resultado, false);
        });
        if (historicoAtualizado) {
            salvarHistoricoAdvisor();
        }
        boasVindasAdvisor?.classList.toggle('hidden', mensagensAdvisor.childElementCount > 0);
    } catch (error) {
        console.error('Não foi possível restaurar o histórico da Navi nesta aba.', error);
        try {
            window.sessionStorage.removeItem(chaveHistoricoAdvisor);
        } catch (erroRemocao) {
            console.error('Não foi possível remover o histórico inválido da Navi.', erroRemocao);
        }
    }
}

function rolarMensagensParaMaisRecente() {
    window.requestAnimationFrame(() => {
        mensagensAdvisor.scrollTop = mensagensAdvisor.scrollHeight;
    });
}

function atualizarViewportVisualAdvisor() {
    const viewport = window.visualViewport;
    const top = viewport?.offsetTop ?? 0;
    const height = viewport?.height ?? window.innerHeight;
    if (alturaViewportAdvisorSemTeclado === null
        || Math.abs(window.innerWidth - larguraViewportAdvisorSemTeclado) > 100) {
        alturaViewportAdvisorSemTeclado = height;
        larguraViewportAdvisorSemTeclado = window.innerWidth;
    }
    popupAdvisor.style.setProperty('--advisor-viewport-top', `${top}px`);
    popupAdvisor.style.setProperty('--advisor-viewport-height', `${height}px`);
    const tecladoVisivel = document.activeElement === campoAdvisor
        && height < alturaViewportAdvisorSemTeclado - 120;
    popupAdvisor.classList.toggle('advisor-teclado', tecladoVisivel);
    popupAdvisor.querySelector('.painel-advisor')?.classList.toggle('advisor-digitando', tecladoVisivel);
    if (tecladoVisivel) {
        rolarMensagensParaMaisRecente();
    }
}

// Registra feedback, cria as ações da resposta e envia novas perguntas.
async function enviarAvaliacaoAdvisor(mensagem, resultado, avaliacao, status, motivo = null) {
    if (mensagem.dataset.enviandoFeedback === 'true' || resultado.feedback?.enviado) {
        return;
    }

    const botoes = Array.from(mensagem.querySelectorAll('[data-avaliacao-advisor]'));
    const apiBase = typeof window.FINSLASH_API_BASE_URL === 'string'
        ? window.FINSLASH_API_BASE_URL.trim().replace(/\/+$/u, '')
        : window.location.origin;
    const tema = resultado.servico || resultado.diagnostico || 'resposta geral';
    const valorAvaliacao = avaliacao === 'util'
        ? 'útil'
        : 'não útil';
    const motivoTexto = {
        incompleta: 'faltou informação',
        incorreta: 'pode conter erro',
        confusa: 'ficou difícil de entender',
        fora_da_pergunta: 'não respondeu ao pedido'
    }[motivo];

    mensagem.dataset.enviandoFeedback = 'true';
    botoes.forEach((botao) => {
        botao.disabled = true;
    });
    status.textContent = 'Enviando avaliação...';

    try {
        const resposta = await fetch(`${apiBase}/api/v1/feedback`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category: 'content',
                message: `Avaliação da Navi: resposta ${valorAvaliacao}. Tema: ${tema}.${motivoTexto ? ` Motivo: ${motivoTexto}.` : ''}`,
                advisorSignal: {
                    rating: avaliacao,
                    reason: avaliacao === 'util' ? null : motivo
                }
            })
        });
        let respostaFeedback;
        try {
            respostaFeedback = await resposta.json();
        } catch (error) {
            throw new TypeError('A API devolveu uma resposta inválida.');
        }
        if (!respostaFeedback || typeof respostaFeedback !== 'object') {
            throw new TypeError('A API devolveu uma resposta inválida.');
        }
        if (!resposta.ok) {
            throw new Error(typeof respostaFeedback.error === 'string'
                ? respostaFeedback.error
                : `A API respondeu com o status ${resposta.status}.`);
        }

        const preferenciaResposta = avaliacao === 'util'
            ? 'estilo_aprovado'
            : preferenciasRespostaPorMotivoFeedback[motivo];
        const preferenciaSalva = preferenciaResposta
            ? salvarPreferenciaRespostaAdvisor(preferenciaResposta)
            : false;
        resultado.feedback = {
            avaliacao,
            ...(motivo ? { motivo } : {}),
            enviado: true
        };
        botoes.forEach((botao) => {
            const selecionado = botao.dataset.avaliacaoAdvisor === avaliacao;
            botao.setAttribute('aria-pressed', String(selecionado));
            botao.classList.toggle('acao-concluida', selecionado);
        });
        if (respostaFeedback.aprendizadoGlobal === 'registrado') {
            status.textContent = 'Avaliação enviada. A Navi pode ajustar o estilo global após volume mínimo de avaliações agregadas, sem usar o histórico.';
        } else if (respostaFeedback.aprendizadoGlobal === 'aguardando_migracao') {
            status.textContent = 'Avaliação enviada, mas a adaptação entre conversas ainda aguarda a configuração do banco.';
        } else if (preferenciaSalva && avaliacao === 'nao-util') {
            status.textContent = 'A Navi vai considerar esse ajuste nesta conversa e ao gerar outra resposta.';
        } else if (preferenciaSalva) {
            status.textContent = 'Obrigado! A Navi vai manter esse estilo nesta conversa.';
        } else {
            status.textContent = 'Avaliação enviada, mas não foi possível manter o ajuste nesta aba.';
        }
        salvarHistoricoAdvisor();
    } catch (error) {
        console.error('Não foi possível enviar a avaliação da Navi:', error);
        status.textContent = error instanceof Error
            ? `Não foi possível enviar. ${error.message}`
            : 'Não foi possível enviar. Tente novamente mais tarde.';
        mensagem.dataset.enviandoFeedback = 'false';
        botoes.forEach((botao) => {
            botao.disabled = false;
        });
    }
}

function adicionarMensagemAdvisor(tipo, texto, resultado = null, persistir = true) {
    const mensagem = document.createElement('article');
    mensagem.className = `mensagem-advisor mensagem-advisor-${tipo}`;
    mensagem.dataset.tipo = tipo;
    if (tipo === 'assistant' && resultado && !resultado.perguntaOriginal && !resultado.repetirPergunta) {
        const perguntaAnterior = [...mensagensAdvisor.children]
            .reverse()
            .find((item) => item.dataset.tipo === 'user');
        resultado.perguntaOriginal = perguntaAnterior
            ?.querySelector('.texto-principal-mensagem-advisor')
            ?.textContent
            ?.trim() || '';
    }
    mensagem.resultadoAdvisor = resultado;

    const bolha = document.createElement('div');
    bolha.className = 'bolha-mensagem-advisor';
    mensagem.appendChild(bolha);
    const textoPrincipal = document.createElement('p');
    textoPrincipal.className = 'texto-principal-mensagem-advisor';
    textoPrincipal.textContent = texto;
    bolha.appendChild(textoPrincipal);

    if (tipo === 'assistant' && resultado && !resultado.repetirPergunta) {
        const fontesAdvisor = obterFontesAdvisor(resultado);
        const painelFontes = criarFontesAdvisor(resultado, fontesAdvisor);
        if (Array.isArray(resultado.plan) && resultado.plan.length) {
            const plano = document.createElement('section');
            plano.className = 'plano-mensagem-advisor';
            const tituloPlano = document.createElement('h4');
            tituloPlano.textContent = 'Plano de ação';
            plano.appendChild(tituloPlano);
            resultado.plan.forEach((etapa) => {
                const item = document.createElement('div');
                item.className = 'etapa-plano-advisor';
                const fase = document.createElement('strong');
                fase.textContent = `${etapa.phase}: `;
                item.append(fase, document.createTextNode(etapa.content));
                plano.appendChild(item);
            });
            bolha.appendChild(plano);
        }

        if (Array.isArray(resultado.checklist) && resultado.checklist.length) {
            const checklist = document.createElement('section');
            checklist.className = 'checklist-mensagem-advisor';
            const tituloChecklist = document.createElement('h4');
            tituloChecklist.textContent = 'Checklist';
            checklist.appendChild(tituloChecklist);
            resultado.checklist.forEach((itemTexto) => {
                const linha = document.createElement('label');
                const caixa = document.createElement('input');
                caixa.type = 'checkbox';
                linha.append(caixa, document.createTextNode(itemTexto));
                checklist.appendChild(linha);
            });
            bolha.appendChild(checklist);
        }

        if (painelFontes) {
            bolha.appendChild(painelFontes);
        }

        if (Array.isArray(resultado.sugestoes) && resultado.sugestoes.length) {
            const sugestoesValidas = resultado.sugestoes
                .filter((sugestao) => typeof sugestao === 'string' && sugestao.trim())
                .slice(0, 3);
            if (sugestoesValidas.length) {
                const sugestoes = document.createElement('div');
                sugestoes.className = 'sugestoes-mensagem-advisor';
                sugestoes.setAttribute('role', 'group');
                sugestoes.setAttribute('aria-label', 'Sugestões de pergunta');
                sugestoesValidas.forEach((sugestao) => {
                    const botaoSugestao = document.createElement('button');
                    botaoSugestao.type = 'button';
                    botaoSugestao.textContent = sugestao.slice(0, 120);
                    botaoSugestao.addEventListener('click', () => {
                        void enviarPerguntaAdvisor(botaoSugestao.textContent);
                    });
                    sugestoes.appendChild(botaoSugestao);
                });
                bolha.appendChild(sugestoes);
            }
        }

        const acoes = document.createElement('div');
        acoes.className = 'acoes-mensagem-advisor';
        const statusAvaliacao = document.createElement('span');
        statusAvaliacao.className = 'status-avaliacao-advisor';
        statusAvaliacao.setAttribute('role', 'status');

        const avaliarUtil = document.createElement('button');
        avaliarUtil.type = 'button';
        avaliarUtil.className = 'acao-mensagem-advisor acao-feedback-advisor';
        avaliarUtil.dataset.avaliacaoAdvisor = 'util';
        avaliarUtil.setAttribute('aria-label', 'Marcar resposta como útil');
        avaliarUtil.setAttribute('aria-pressed', String(resultado.feedback?.avaliacao === 'util'));
        avaliarUtil.title = 'Resposta útil';
        avaliarUtil.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7"></path><path d="M4 10h3v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"></path></svg>';
        avaliarUtil.addEventListener('click', () => {
            void enviarAvaliacaoAdvisor(mensagem, resultado, 'util', statusAvaliacao);
        });
        acoes.appendChild(avaliarUtil);

        const avaliarNaoUtil = document.createElement('button');
        avaliarNaoUtil.type = 'button';
        avaliarNaoUtil.className = 'acao-mensagem-advisor acao-feedback-advisor';
        avaliarNaoUtil.dataset.avaliacaoAdvisor = 'nao-util';
        avaliarNaoUtil.setAttribute('aria-label', 'Marcar resposta como não útil');
        avaliarNaoUtil.setAttribute('aria-pressed', String(resultado.feedback?.avaliacao === 'nao-util'));
        avaliarNaoUtil.title = 'Resposta não útil';
        avaliarNaoUtil.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17"></path><path d="M20 14h-3V2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"></path></svg>';

        const opcoesFeedback = document.createElement('div');
        opcoesFeedback.className = 'opcoes-feedback-advisor';
        opcoesFeedback.hidden = true;
        opcoesFeedback.setAttribute('role', 'group');
        opcoesFeedback.setAttribute('aria-label', 'Motivo da avaliação');
        [
            ['incompleta', 'Faltou informação'],
            ['incorreta', 'Pode conter um erro'],
            ['confusa', 'Ficou difícil de entender'],
            ['fora_da_pergunta', 'Não respondeu ao pedido']
        ].forEach(([motivo, rotulo]) => {
            const opcao = document.createElement('button');
            opcao.type = 'button';
            opcao.className = 'opcao-feedback-advisor';
            opcao.dataset.motivoFeedback = motivo;
            opcao.textContent = rotulo;
            opcao.addEventListener('click', () => {
                resultado.feedback = {
                    avaliacao: 'nao-util',
                    motivo,
                    enviado: false
                };
                opcoesFeedback.hidden = true;
                void enviarAvaliacaoAdvisor(
                    mensagem,
                    resultado,
                    'nao-util',
                    statusAvaliacao,
                    motivo
                );
            });
            opcoesFeedback.appendChild(opcao);
        });
        avaliarNaoUtil.addEventListener('click', () => {
            if (resultado.feedback?.enviado) {
                return;
            }
            opcoesFeedback.hidden = !opcoesFeedback.hidden;
            statusAvaliacao.textContent = opcoesFeedback.hidden
                ? ''
                : 'O que não funcionou? A Navi usará esse motivo ao gerar outra resposta.';
        });
        acoes.appendChild(avaliarNaoUtil);

        const regenerar = document.createElement('button');
        regenerar.type = 'button';
        regenerar.className = 'acao-mensagem-advisor';
        regenerar.setAttribute('aria-label', 'Gerar outra resposta');
        regenerar.title = 'Gerar outra resposta';
        regenerar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 7v5h-5"></path><path d="M4.93 9A8 8 0 0 1 18.36 5.64L20 7M4 17v-5h5"></path><path d="M19.07 15A8 8 0 0 1 5.64 18.36L4 17"></path></svg>';
        regenerar.addEventListener('click', () => {
            void enviarPerguntaAdvisor(resultado.perguntaOriginal, {
                regenerar: true,
                motivoFeedback: resultado.feedback?.motivo || null,
                mensagemOrigem: mensagem
            });
        });
        acoes.appendChild(regenerar);

        const copiar = document.createElement('button');
        copiar.type = 'button';
        copiar.className = 'acao-mensagem-advisor';
        copiar.setAttribute('aria-label', 'Copiar resposta');
        copiar.title = 'Copiar resposta';
        copiar.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>';
        copiar.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(texto);
                copiar.classList.add('acao-concluida');
                window.setTimeout(() => {
                    copiar.classList.remove('acao-concluida');
                }, 1600);
                statusAvaliacao.textContent = 'Resposta copiada.';
            } catch (error) {
                console.error('Não foi possível copiar a resposta da Navi:', error);
                statusAvaliacao.textContent = 'Não foi possível copiar. Verifique a permissão do navegador.';
            }
        });
        acoes.appendChild(copiar);

        const menuAcoes = document.createElement('div');
        menuAcoes.className = 'menu-acoes-advisor';
        const maisOpcoes = document.createElement('button');
        maisOpcoes.type = 'button';
        maisOpcoes.className = 'acao-mensagem-advisor';
        maisOpcoes.setAttribute('aria-label', 'Mais opções');
        maisOpcoes.setAttribute('aria-expanded', 'false');
        maisOpcoes.title = 'Mais opções';
        maisOpcoes.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></svg>';
        const menu = document.createElement('div');
        menu.className = 'menu-opcoes-advisor';
        menu.hidden = true;
        menu.setAttribute('role', 'group');
        menu.setAttribute('aria-label', 'Opções da resposta');
        menuAcoes.append(maisOpcoes, menu);
        maisOpcoes.addEventListener('click', () => {
            const abrir = menu.hidden;
            document.querySelectorAll('.menu-opcoes-advisor').forEach((item) => {
                item.hidden = true;
                item.parentElement?.querySelector('[aria-expanded]')?.setAttribute('aria-expanded', 'false');
            });
            menu.hidden = !abrir;
            maisOpcoes.setAttribute('aria-expanded', String(abrir));
        });

        const exportar = document.createElement('button');
        exportar.type = 'button';
        exportar.className = 'item-menu-advisor';
        exportar.textContent = 'Exportar resposta';
        exportar.addEventListener('click', () => {
            const cabecalho = [
                'Navi - Resposta',
                '',
                texto,
                '',
                resultado.servico ? `Serviço: ${resultado.servico}` : '',
                resultado.diagnostico ? `Diagnóstico: ${resultado.diagnostico}` : '',
                Number.isFinite(resultado.confianca)
                    ? `Correspondência no catálogo: ${Math.round(resultado.confianca * 100)}%`
                    : '',
                ...(resultado.mostrarLinks
                    ? fontesAdvisor.map((fonte) => `Fonte oficial: ${fonte.url}`)
                    : [])
            ].filter(Boolean).join('\n');
            const blob = new Blob([cabecalho], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'navi-relatorio.txt';
            link.click();
            URL.revokeObjectURL(url);
            menu.hidden = true;
            maisOpcoes.setAttribute('aria-expanded', 'false');
        });
        menu.appendChild(exportar);

        const listaFontes = document.createElement('div');
        listaFontes.className = 'fontes-detalhadas-advisor';
        listaFontes.hidden = true;
        listaFontes.setAttribute('role', 'group');
        listaFontes.setAttribute('aria-label', 'Fontes consultadas');
        fontesAdvisor.forEach((fonte) => {
            const linkFonte = document.createElement('a');
            linkFonte.className = 'link-fonte-advisor';
            linkFonte.href = fonte.url;
            linkFonte.target = '_blank';
            linkFonte.rel = 'noopener noreferrer';
            linkFonte.textContent = fonte.title;
            listaFontes.appendChild(linkFonte);
        });
        if (fontesAdvisor.length) {
            const mostrarFontes = document.createElement('button');
            mostrarFontes.type = 'button';
            mostrarFontes.className = 'item-menu-advisor';
            mostrarFontes.textContent = 'Abrir fontes consultadas';
            mostrarFontes.addEventListener('click', () => {
                listaFontes.hidden = !listaFontes.hidden;
                menu.hidden = true;
                maisOpcoes.setAttribute('aria-expanded', 'false');
            });
            menu.appendChild(mostrarFontes);
        }
        acoes.appendChild(menuAcoes);
        bolha.appendChild(acoes);
        bolha.appendChild(opcoesFeedback);
        bolha.appendChild(listaFontes);

        if (resultado.feedback?.enviado) {
            [avaliarUtil, avaliarNaoUtil].forEach((botao) => {
                botao.disabled = true;
            });
            statusAvaliacao.textContent = resultado.feedback.avaliacao === 'nao-util'
                ? 'Avaliação enviada. Ao gerar outra resposta, a Navi vai considerar esse motivo.'
                : 'Avaliação enviada. Obrigado!';
        }
        bolha.appendChild(statusAvaliacao);
    } else if (tipo === 'assistant' && resultado?.repetirPergunta) {
        const tentarNovamente = document.createElement('button');
        tentarNovamente.type = 'button';
        tentarNovamente.className = 'tentar-novamente-advisor';
        tentarNovamente.textContent = 'Tentar novamente';
        tentarNovamente.addEventListener('click', () => {
            tentarNovamente.remove();
            void enviarPerguntaAdvisor(resultado.repetirPergunta);
        });
        bolha.appendChild(tentarNovamente);
    }

    mensagensAdvisor.appendChild(mensagem);
    if (persistir) {
        salvarHistoricoAdvisor();
    }
    rolarMensagensParaMaisRecente();
    return mensagem;
}

function exibirResultadoAdvisor(resultado, pergunta) {
    resultado.perguntaOriginal = pergunta;
    resultado.mostrarLinks = perguntaSolicitaLinksAdvisor(pergunta);
    const resposta = obterRespostaAdvisor(resultado, resultado.mostrarLinks);
    adicionarMensagemAdvisor('assistant', resposta, resultado);
}

async function enviarPerguntaAdvisor(pergunta, opcoes = {}) {
    const texto = typeof pergunta === 'string'
        ? pergunta.replace(/\s+/gu, ' ').trim()
        : '';
    const regenerar = opcoes.regenerar === true;
    if (!texto) {
        statusAdvisor.textContent = 'Digite uma pergunta.';
        campoAdvisor.focus();
        return;
    }
    if (texto.length > 300) {
        statusAdvisor.textContent = 'A pergunta deve ter no máximo 300 caracteres.';
        campoAdvisor.focus();
        return;
    }
    if (enviandoAdvisor) {
        return;
    }

    if (window.location.protocol === 'file:') {
        statusAdvisor.textContent = 'Para usar a Navi, abra o FinSlash pela API ou pela publicação na Vercel.';
        return;
    }

    enviandoAdvisor = true;
    const acoesOrigem = opcoes.mensagemOrigem
        ? Array.from(opcoes.mensagemOrigem.querySelectorAll('button'))
        : [];
    acoesOrigem.forEach((botao) => {
        botao.disabled = true;
    });
    const historico = obterContextoHistoricoAdvisor();
    const ultimaMensagem = mensagensAdvisor.lastElementChild;
    const perguntaRetentativa = ultimaMensagem?.resultadoAdvisor?.repetirPergunta === texto
        && historico[historico.length - 1]?.tipo === 'user'
        && historico[historico.length - 1]?.texto === texto;
    if (perguntaRetentativa) {
        historico.pop();
    }
    botaoEnviarAdvisor.disabled = true;
    campoAdvisor.disabled = true;
    statusAdvisor.textContent = regenerar
        ? 'A Navi está preparando outra resposta...'
        : 'A Navi está preparando uma resposta...';
    popupAdvisor.querySelector('.painel-advisor')?.classList.add('advisor-consulta');
    boasVindasAdvisor?.classList.add('hidden');
    if (!regenerar) {
        adicionarMensagemAdvisor('user', texto);
    }
    const pensando = adicionarMensagemAdvisor(
        'assistant',
        regenerar ? 'Gerando outra resposta...' : 'Pensando...',
        null,
        false
    );
    pensando.classList.add('mensagem-pensando-advisor');
    campoAdvisor.value = '';
    contadorAdvisor.textContent = '0/300';

    const controlador = new AbortController();
    const timeout = window.setTimeout(() => controlador.abort(), 20000);
    try {
        const baseUrl = typeof window.FINSLASH_API_BASE_URL === 'string'
            ? window.FINSLASH_API_BASE_URL.trim().replace(/\/+$/u, '')
            : window.location.origin;
        let timezone = 'UTC';
        try {
            timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
        } catch (error) {
            console.warn('Não foi possível detectar o fuso horário do navegador.', error);
        }
        const resposta = await fetch(`${baseUrl}/api/v1/advisor`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pergunta: texto,
                historico,
                timezone,
                regenerar,
                motivoFeedback: opcoes.motivoFeedback || null,
                preferenciaResposta: obterPreferenciaRespostaAdvisor()
            }),
            signal: controlador.signal
        });

        let resultado;
        try {
            resultado = await resposta.json();
        } catch (error) {
            throw new TypeError('A API devolveu uma resposta inválida.');
        }

        if (!resposta.ok) {
            throw new Error(typeof resultado.error === 'string'
                ? resultado.error
                : 'A Navi não conseguiu responder agora. Tente novamente.');
        }
        if (!resultado
            || typeof resultado !== 'object'
            || typeof resultado.encontrado !== 'boolean'
            || typeof resultado.diagnostico !== 'string') {
            throw new TypeError('O resultado da Navi está incompleto.');
        }

        if (resultado.fonte === 'pergunta_ambigua') {
            statusAdvisor.textContent = 'A Navi precisa de mais contexto para responder com precisão.';
        } else if (resultado.fonte === 'saudacao-local') {
            statusAdvisor.textContent = 'Saudação da Navi.';
        } else if (resultado.fonte === 'gemini-geral') {
            statusAdvisor.textContent = 'Resposta geral da Navi.';
        } else if (resultado.fonte === 'gemini-geral-busca') {
            statusAdvisor.textContent = 'Resposta geral verificada com Pesquisa Google.';
        } else if (resultado.fonte === 'gemini-sem-fontes') {
            statusAdvisor.textContent = 'A Navi não encontrou fontes confiáveis para confirmar a resposta.';
        } else if (resultado.fonte === 'open-meteo') {
            statusAdvisor.textContent = 'Condições meteorológicas consultadas no Open-Meteo.';
        } else if (resultado.fonte === 'relogio-local' || resultado.fonte === 'horario-open-meteo') {
            statusAdvisor.textContent = 'Data e hora calculadas para o fuso horário solicitado.';
        } else if (resultado.fonte === 'geral-indisponivel') {
            statusAdvisor.textContent = 'A conversa geral precisa do modo Gemini configurado.';
        } else if (resultado.encontrado) {
            statusAdvisor.textContent = 'Resposta baseada em diagnóstico AWS validado.';
        } else {
            statusAdvisor.textContent = 'Pergunta fora do alcance dos diagnósticos cadastrados.';
        }
        pensando.remove();
        exibirResultadoAdvisor(resultado, texto);
    } catch (error) {
        let mensagemErro = 'A Navi não conseguiu responder agora. Tente novamente.';
        if (error.name === 'AbortError') {
            mensagemErro = 'A resposta demorou demais. Você pode tentar novamente.';
        } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            mensagemErro = 'Não consegui conectar à Navi. Verifique sua conexão e tente novamente.';
        } else if (error instanceof Error) {
            mensagemErro = error.message;
        }
        statusAdvisor.textContent = '';
        pensando.remove();
        adicionarMensagemAdvisor('assistant', mensagemErro, { repetirPergunta: texto });
    } finally {
        window.clearTimeout(timeout);
        enviandoAdvisor = false;
        botaoEnviarAdvisor.disabled = false;
        campoAdvisor.disabled = false;
        acoesOrigem.forEach((botao) => {
            botao.disabled = false;
        });
    }
}

// Controla o perfil, as conquistas e a restauração das telas navegadas.
function abrirPopupConquistaFinal() {
    popupConquistaFinal.classList.remove('hidden');
    botaoFecharConquistaFinal.focus();
}

function fecharPopupConquistaFinal() {
    popupConquistaFinal.classList.add('hidden');
    if (!botaoPerfilApp.closest('.hidden')) {
        botaoPerfilApp.focus();
    }
}

function mostrarMenuPersonagens() {
    const indiceSalvo = dadosPersistidos.indicePersonagem;
    const temPersonagemSalvo = Number.isInteger(indiceSalvo) && Boolean(personagens[indiceSalvo]);
    fecharPerfil();
    fecharPopupBuscaVoz(false);
    popupAnimacao.classList.add('hidden');
    popupPersonagemSelecionado.classList.add('hidden');
    ocultarPopupCartaoServico();
    document.body.classList.remove('tela-servicos-ativa');
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

// Envia somente categoria e mensagem, sem nome, e-mail ou identificador de perfil.
async function enviarFeedbackPerfil() {
    const mensagem = campoFeedbackPerfil.value.trim();
    const categoria = categoriaFeedbackPerfil.value;
    const apiBase = window.FINSLASH_API_BASE_URL?.trim().replace(/\/+$/u, '');

    statusFeedbackPerfil.textContent = '';
    if (!apiBase) {
        console.warn('Feedback ainda indisponível: configure FINSLASH_API_BASE_URL para ativar o envio.');
        return;
    }
    if (Array.from(mensagem).length < 10 || Array.from(mensagem).length > 1000) {
        statusFeedbackPerfil.textContent = 'Escreva uma mensagem entre 10 e 1000 caracteres.';
        campoFeedbackPerfil.focus();
        return;
    }
    if (!['suggestion', 'issue', 'content'].includes(categoria)) {
        statusFeedbackPerfil.textContent = 'Selecione uma categoria válida.';
        return;
    }
    if (enviandoFeedback) {
        return;
    }

    enviandoFeedback = true;
    botaoEnviarFeedback.disabled = true;
    botaoEnviarFeedback.textContent = 'Enviando...';
    try {
        const resposta = await fetch(`${apiBase}/api/v1/feedback`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ category: categoria, message: mensagem })
        });
        const resultado = await resposta.json();
        if (!resposta.ok) {
            throw new Error(resultado.error || `A API respondeu com o status ${resposta.status}.`);
        }
        campoFeedbackPerfil.value = '';
        statusFeedbackPerfil.textContent = resultado.message || 'Feedback enviado. Obrigado por ajudar a melhorar o FinSlash!';
    } catch (error) {
        console.error('Falha ao enviar feedback:', error);
        statusFeedbackPerfil.textContent = error instanceof Error
            ? error.message
            : 'Não foi possível enviar agora. Tente novamente mais tarde.';
    } finally {
        enviandoFeedback = false;
        botaoEnviarFeedback.disabled = false;
        botaoEnviarFeedback.textContent = 'Enviar feedback';
    }
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
let indiceBuscaVozServicos = null;
let indiceBuscaVozTopicos = null;

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
    fecharAdvisorVisual();

    popupPersonagens.classList.add('hidden');
    popupPersonagemSelecionado.classList.add('hidden');
    ocultarPopupCartaoServico();
    popupTopicoServico.classList.add('hidden');
    popupConteudoSelecionado.style.background = '#ffffff';

    const mostrarServicos = ['servicos', 'cartao-servico', 'topicos-servico', 'topico-servico'].includes(tela);
    document.body.classList.toggle('tela-servicos-ativa', mostrarServicos);
    telaServicos.classList.toggle('hidden', !mostrarServicos);
    telaInicial.classList.toggle('hidden', mostrarServicos);
    navegacaoApp.classList.toggle('hidden', tela === 'inicio');
    const mostrarTelaTopicos = tela === 'topicos-servico' || tela === 'topico-servico';
    conteudoServicos.classList.toggle('hidden', mostrarTelaTopicos);
    telaTopicosServico.classList.toggle('hidden', !mostrarTelaTopicos);
    botaoVoltarTelaTopicos.classList.toggle('hidden', !mostrarTelaTopicos);
    servicoTopicosAtual = topicosPorServico[estado?.servicoTopicos] || null;
    tituloTelaTopicosServico.textContent = servicoTopicosAtual?.titulo || '';
    atualizarDisponibilidadePesquisaNavegacao();

    if (mostrarServicos) {
        fecharPopup();
        document.body.appendChild(canvasOnda);
        inicializarCanvasOnda();
        const indicePersonagem = Number.isInteger(estado?.indicePersonagem)
            ? estado.indicePersonagem
            : dadosPersistidos.indicePersonagem;
        if (personagens[indicePersonagem]) {
            personagemSelecionado = personagens[indicePersonagem];
            imagemPersonagemHeader.src = personagemSelecionado.imagem;
            imagemPersonagemHeader.alt = personagemSelecionado.nome;
        }
        atualizarDisponibilidadePesquisaNavegacao();
        atualizarAvatarNavegacao();
        if (!gridServicos.children.length) {
            gerarCartoesServicos();
        }
        if (tela === 'cartao-servico' && Number.isInteger(estado.indiceServico)) {
            abrirPopupCartaoServicoVisual(estado.indiceServico);
        }
        if (mostrarTelaTopicos && servicoTopicosAtual && !gridTopicosServico.children.length) {
            gerarCartoesTopicosServico();
        }
        if (tela === 'topico-servico' && Number.isInteger(estado.indiceTopico)) {
            abrirPopupTopicoServicoVisual(estado.indiceTopico);
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
    document.body.classList.remove('tela-servicos-ativa');
    telaInicial.appendChild(canvasOnda);
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
// Desenha e encerra as animações de onda usadas nos painéis da aplicação.
function inicializarCanvasOnda() {
    if (animacaoOnda) {
        redimensionarCanvasOnda?.();
        return;
    }

    const ctx = canvasOnda.getContext('2d');

    redimensionarCanvasOnda = () => {
        const largura = canvasOnda.clientWidth;
        const altura = canvasOnda.clientHeight;
        if (!largura || !altura) {
            return;
        }

        if (document.body.classList.contains('tela-servicos-ativa')
            && canvasOnda.width === largura
            && ondas.length > 0) {
            return;
        }

        const dimensoesMudaram = canvasOnda.width !== largura || canvasOnda.height !== altura;
        if (!dimensoesMudaram && ondas.length > 0) {
            return;
        }

        if (dimensoesMudaram) {
            canvasOnda.width = largura;
            canvasOnda.height = altura;
        }
        ondas = Array.from({ length: 5 }, () => new Onda(canvasOnda));
        desenharOndasCanvasOnda(ctx);
    };

    redimensionarCanvasOnda();
    window.addEventListener('resize', redimensionarCanvasOnda);

    // Funcao de animacao
    let ultimoDesenho = 0;
    function animar(tempoAtual) {
        if (document.hidden) {
            animacaoOnda = requestAnimationFrame(animar);
            return;
        }

        if (tempoAtual - ultimoDesenho >= 1000 / 30) {
            ultimoDesenho = tempoAtual;
            tempo += 1;
            desenharOndasCanvasOnda(ctx);
        }

        animacaoOnda = requestAnimationFrame(animar);
    }
    
    // Inicia a animacao
    animar();
}

function desenharOndasCanvasOnda(ctx) {
    ctx.clearRect(0, 0, canvasOnda.width, canvasOnda.height);
    ondas.forEach(onda => onda.desenhar(ctx, tempo, 1, 8));
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

// Apresenta personagens, seleção visual e animações de celebração.
function obterOrdemAleatoriaPersonagens() {
    const restantes = personagens.map((_, index) => index);
    const ordem = [];

    function compartilhamCor(indiceA, indiceB) {
        const coresA = personagens[indiceA].cores || [personagens[indiceA].cor];
        const coresB = personagens[indiceB].cores || [personagens[indiceB].cor];
        return coresA.some(corA => coresB.some(corB => corA.toLowerCase() === corB.toLowerCase()));
    }

    function buscarOrdem() {
        if (ordem.length === personagens.length) {
            return true;
        }

        const posicao = ordem.length;
        const vizinhos = [];
        if (posicao % 3 > 0) {
            vizinhos.push(ordem[posicao - 1]);
        }
        if (posicao >= 3) {
            vizinhos.push(ordem[posicao - 3]);
        }

        const candidatos = [...restantes];
        for (let indice = candidatos.length - 1; indice > 0; indice--) {
            const aleatorio = Math.floor(Math.random() * (indice + 1));
            [candidatos[indice], candidatos[aleatorio]] = [candidatos[aleatorio], candidatos[indice]];
        }

        for (const candidato of candidatos) {
            if (vizinhos.some(vizinho => compartilhamCor(candidato, vizinho))) {
                continue;
            }

            const indiceRestante = restantes.indexOf(candidato);
            restantes.splice(indiceRestante, 1);
            ordem.push(candidato);
            if (buscarOrdem()) {
                return true;
            }
            ordem.pop();
            restantes.splice(indiceRestante, 0, candidato);
        }

        return false;
    }

    if (!buscarOrdem()) {
        throw new Error('Nao foi possivel organizar os personagens sem cores repetidas lado a lado.');
    }
    return ordem;
}

// Funcao para gerar os cartoes de personagens no grid
function gerarCartoesPersonagens() {
    const cartoes = document.createDocumentFragment();
    
    obterOrdemAleatoriaPersonagens().forEach(index => {
        const personagem = personagens[index];
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

        areaImagem.appendChild(imagem);
        cartao.appendChild(areaImagem);
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
    document.body.classList.remove('tela-servicos-ativa');
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
    const corBrilhoCelebracao = personagemTemp.gif === 'imagens/gif20.gif' ? '#ef4444' : cores[0];
    const corBrilhoCelebracaoSecundaria = personagemTemp.gif === 'imagens/gif20.gif' ? '#b91c1c' : cores[1] || cores[0];
    gifCelebracao.style.setProperty('--cor-brilho-celebracao', corBrilhoCelebracao);
    gifCelebracao.style.setProperty('--cor-brilho-celebracao-secundaria', corBrilhoCelebracaoSecundaria);
    
    // Abre o popup de animacao
    popupAnimacao.classList.remove('hidden');
    
    const duracaoCrescimento = 1000;
    const gifsMenores = ['imagens/gif1.gif', 'imagens/gif2.gif', 'imagens/gif3.gif', 'imagens/gif8.gif', 'imagens/gif10.gif', 'imagens/gif12.gif'];
    const gifsMaiores = ['imagens/gif5.gif', 'imagens/gif11.gif'];
    const tamanhoFinal = personagemTemp.gif === 'imagens/gif18.gif'
        ? 4
        : personagemTemp.gif === 'imagens/gif19.gif'
            ? 2.4
        : personagemTemp.gif === 'imagens/gif20.gif'
            ? 2.1
        : personagemTemp.gif === 'imagens/gif21.gif'
            ? 2.1
        : ['imagens/gif8.gif', 'imagens/gif10.gif'].includes(personagemTemp.gif)
            ? 1.1
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
        : personagemTemp.gif === 'imagens/gif19.gif'
            ? -150
        : personagemTemp.gif === 'imagens/gif20.gif'
            ? -100
        : personagemTemp.gif === 'imagens/gif21.gif'
            ? -75
        : personagemTemp.gif === 'imagens/gif5.gif'
            ? 30
            : 0;
    const deslocamentoHorizontal = personagemTemp.gif === 'imagens/gif13.gif' ? -25 : 0;
    gifCelebracao.style.transform = `translate(${deslocamentoHorizontal}px, ${deslocamentoVertical}px) scale(0.5)`;
    const tempoExibicaoFinal = ['imagens/gif19.gif', 'imagens/gif20.gif', 'imagens/gif21.gif'].includes(personagemTemp.gif)
        ? 4000
        : ['imagens/gif12.gif', 'imagens/gif13.gif'].includes(personagemTemp.gif)
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
            // Mantem os GIFs 10 e 11 por cinco segundos, os novos por quatro e 12 e 13 por um.
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
// Renderiza o catálogo AWS e implementa as buscas por texto e por voz.
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
        
        cartao.addEventListener('click', () => abrirPopupCartaoServico(index));
    });

    gridServicos.replaceChildren(cartoes);
}

function gerarCartoesTopicosServico() {
    if (!servicoTopicosAtual) {
        console.error('Nao foi possivel gerar os topicos sem um servico selecionado.');
        return;
    }
    const cartoes = document.createDocumentFragment();

    servicoTopicosAtual.topicos.forEach((topico, index) => {
        const cartao = document.createElement('button');
        cartao.className = 'cartao-servico cartao-topico-servico';
        cartao.type = 'button';
        cartao.dataset.index = index;
        cartao.appendChild(adicionarTextoDiagnostico('span', 'categoria-topico-servico', 'Diagnóstico de custos'));
        cartao.appendChild(adicionarTextoDiagnostico('span', 'titulo-cartao-topico-servico', topico.titulo));
        cartao.appendChild(adicionarTextoDiagnostico('span', 'resumo-cartao-topico-servico', topico.descricao));
        cartao.appendChild(adicionarTextoDiagnostico('span', 'acao-cartao-topico-servico', 'Abrir tópico'));
        cartao.addEventListener('click', () => abrirPopupTopicoServico(index));
        cartoes.appendChild(cartao);
    });

    gridTopicosServico.replaceChildren(cartoes);
}

function criarIconeServico(servico, index) {
    if (index >= quantidadeIconesServico) {
        return criarIconeFallbackServico(servico, 'icone-servico');
    }

    const icone = document.createElement('img');
    icone.className = 'icone-servico';
    icone.decoding = 'async';
    icone.loading = 'lazy';
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

const palavrasIgnoradasBuscaVoz = new Set([
    'a', 'abra', 'acessar', 'amazon', 'aws', 'da', 'das', 'de', 'do', 'dos',
    'e', 'em', 'eu', 'favor', 'me', 'mostra', 'mostrar', 'na', 'nas', 'no',
    'nos', 'o', 'os', 'para', 'por', 'quero', 'servico', 'servicos', 'um', 'uma'
]);

function prepararIndiceBuscaVozTopicos() {
    if (indiceBuscaVozTopicos) {
        return;
    }

    indiceBuscaVozTopicos = Object.entries(topicosPorServico).flatMap(([nomeServico, dadosServico]) =>
        dadosServico.topicos.map((topico, indiceTopico) => {
            const variacoesTitulo = [
                topico.titulo,
                topico.titulo.replace(/\s*\([^)]*\)/gu, ''),
                ...Array.from(topico.titulo.matchAll(/\(([^)]*)\)/gu), correspondencia => correspondencia[1])
            ];
            const formasTitulo = [...new Set(variacoesTitulo.map(variacao =>
                normalizarPronunciaServico(variacao)
                    .replace(/[^a-z0-9]+/g, ' ')
                    .trim()
            ).filter(Boolean))];
            const variacoes = [...new Set(formasTitulo.flatMap(variacao =>
                [variacao, variacao.replace(/\s+/gu, '')]
            ))];
            const palavras = [...new Set(formasTitulo.flatMap(variacao =>
                variacao.split(/\s+/).filter(palavra =>
                    palavra && !palavrasIgnoradasBuscaVoz.has(palavra)
                )
            ))];

            return {
                nomeServico,
                indiceTopico,
                variacoes,
                palavras,
            };
        })
    );
}

function similaridadePalavraBuscaVoz(palavraFalado, palavraTitulo) {
    if (palavraFalado === palavraTitulo) {
        return 1;
    }

    const reduzirPlural = palavra => {
        if (palavra.length <= 4) {
            return palavra;
        }
        if (palavra.endsWith('oes') || palavra.endsWith('aes')) {
            return `${palavra.slice(0, -3)}ao`;
        }
        if (palavra.endsWith('eis')) {
            return `${palavra.slice(0, -3)}el`;
        }
        if (palavra.endsWith('ois')) {
            return `${palavra.slice(0, -3)}ol`;
        }
        if (palavra.endsWith('ns')) {
            return `${palavra.slice(0, -2)}m`;
        }
        if (palavra.endsWith('ões')) {
            return `${palavra.slice(0, -3)}ão`;
        }
        return palavra.replace(/(?:es|s)$/u, '');
    };
    if (reduzirPlural(palavraFalado) === reduzirPlural(palavraTitulo)) {
        return 0.94;
    }
    if (Math.min(palavraFalado.length, palavraTitulo.length) < 4
        || Math.abs(palavraFalado.length - palavraTitulo.length) > 2) {
        return 0;
    }

    let anterior = Array.from({ length: palavraTitulo.length + 1 }, (_, indice) => indice);
    for (let indiceFalado = 1; indiceFalado <= palavraFalado.length; indiceFalado += 1) {
        const atual = [indiceFalado];
        for (let indiceTitulo = 1; indiceTitulo <= palavraTitulo.length; indiceTitulo += 1) {
            atual[indiceTitulo] = Math.min(
                atual[indiceTitulo - 1] + 1,
                anterior[indiceTitulo] + 1,
                anterior[indiceTitulo - 1]
                    + (palavraFalado[indiceFalado - 1] === palavraTitulo[indiceTitulo - 1] ? 0 : 1)
            );
        }
        anterior = atual;
    }

    const distancia = anterior[palavraTitulo.length];
    return distancia <= 2
        ? 1 - distancia / Math.max(palavraFalado.length, palavraTitulo.length)
        : 0;
}

// Reconhece serviços e tópicos falados para sugerir resultados compatíveis.
function localizarTopicoPorVoz(texto, nomeServicoRestrito = null) {
    const palavrasFaladas = normalizarPronunciaServico(texto)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradasBuscaVoz.has(palavra));

    if (palavrasFaladas.length === 0) {
        return { certeza: false, sugestoes: [] };
    }

    prepararIndiceBuscaVozTopicos();
    const consulta = palavrasFaladas.join(' ');
    const correspondencias = [];

    indiceBuscaVozTopicos.forEach(topico => {
        if (nomeServicoRestrito && topico.nomeServico !== nomeServicoRestrito) {
            return;
        }

        let pontuacao = 0;
        let palavrasCorrespondentes = [];
        const variacaoCorrespondente = topico.variacoes
            .filter(variacao => variacao.includes(consulta))
            .sort((a, b) => a.length - b.length)[0];
        if (variacaoCorrespondente) {
            pontuacao = 1.1 + (consulta.length / variacaoCorrespondente.length) * 0.5;
        } else if (palavrasFaladas.length >= 2) {
            const pontuacoesPalavras = palavrasFaladas.map(palavraFalado =>
                Math.max(0, ...topico.palavras.map(palavraTitulo =>
                    similaridadePalavraBuscaVoz(palavraFalado, palavraTitulo)
                ))
            );
            palavrasCorrespondentes = pontuacoesPalavras.filter(pontuacaoPalavra =>
                pontuacaoPalavra >= 0.72
            );
            if (palavrasCorrespondentes.length === palavrasFaladas.length) {
                pontuacao = palavrasCorrespondentes.reduce((total, valor) => total + valor, 0)
                    / palavrasCorrespondentes.length;
                for (let inicio = 0; inicio <= topico.palavras.length - palavrasFaladas.length; inicio += 1) {
                    const trecho = palavrasFaladas.map((palavra, indice) =>
                        similaridadePalavraBuscaVoz(palavra, topico.palavras[inicio + indice])
                    );
                    if (trecho.every(similaridade => similaridade >= 0.72)) {
                        pontuacao = Math.min(
                            pontuacao + trecho.reduce((total, valor) => total + valor, 0)
                                / trecho.length * 0.08,
                            1
                        );
                        break;
                    }
                }
            }
        } else if (palavrasFaladas[0].length >= 5) {
            pontuacao = Math.max(0, ...topico.palavras.map(palavraTitulo =>
                similaridadePalavraBuscaVoz(palavrasFaladas[0], palavraTitulo)
            )) * 0.82;
        }

        if (pontuacao > 0) {
            correspondencias.push({
                topico,
                pontuacao,
                correspondenciaExata: Boolean(variacaoCorrespondente)
            });
        }
    });

    correspondencias.sort((a, b) => b.pontuacao - a.pontuacao);
    if (correspondencias.length === 0) {
        return { certeza: false, sugestoes: [] };
    }

    const primeira = correspondencias[0];
    const segunda = correspondencias[1];
    const margem = segunda ? primeira.pontuacao - segunda.pontuacao : 1;
    const certeza = primeira.pontuacao >= 0.92
        && margem >= 0.12
        && ((primeira.correspondenciaExata
                && (palavrasFaladas.length >= 2 || consulta.length >= 6))
            || palavrasFaladas.length >= 3);
    const limiteSugestao = Math.max(0.5, primeira.pontuacao - 0.18);
    const sugestoes = correspondencias
        .filter(correspondencia => correspondencia.pontuacao >= limiteSugestao)
        .slice(0, 8)
        .map(correspondencia => ({
            ...correspondencia.topico,
            pontuacao: correspondencia.pontuacao,
            tipo: 'topico'
        }));

    return {
        certeza,
        sugestoes: certeza ? [] : sugestoes,
        topico: certeza ? primeira.topico : null
    };
}

function localizarServicosSemelhantesPorVoz(texto) {
    if (!indiceBuscaVozServicos) {
        localizarServicoPorVoz(texto);
    }

    const palavrasFaladas = normalizarPronunciaServico(texto)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradasBuscaVoz.has(palavra));

    if (palavrasFaladas.length === 0) {
        return [];
    }

    const correspondencias = indiceBuscaVozServicos
        .map(({ index, palavrasServico }) => {
            const pontuacoes = palavrasFaladas.map(palavraFalado =>
                Math.max(0, ...palavrasServico.map(palavraServico =>
                    similaridadePalavraBuscaVoz(palavraFalado, palavraServico)
                ))
            );
            if (pontuacoes.some(pontuacao => pontuacao < 0.72)) {
                return null;
            }

            return {
                nomeServico: servicosAWS[index].nome,
                pontuacao: pontuacoes.reduce((total, valor) => total + valor, 0) / pontuacoes.length
            };
        })
        .filter(correspondencia => correspondencia && correspondencia.pontuacao >= 0.72)
        .sort((a, b) => b.pontuacao - a.pontuacao);

    if (correspondencias.length < 2) {
        return [];
    }

    const limiteSugestao = correspondencias[0].pontuacao - 0.2;
    return correspondencias
        .filter(correspondencia => correspondencia.pontuacao >= limiteSugestao)
        .slice(0, 5)
        .map(correspondencia => ({
            tipo: 'servico',
            nomeServico: correspondencia.nomeServico,
            pontuacao: correspondencia.pontuacao
        }));
}

function localizarServicoExatoPorVoz(texto) {
    if (!indiceBuscaVozServicos) {
        localizarServicoPorVoz(texto);
    }

    const palavrasFaladas = normalizarPronunciaServico(texto)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradasBuscaVoz.has(palavra));
    if (palavrasFaladas.length === 0) {
        return -1;
    }

    const formaFalado = palavrasFaladas.join('');

    const correspondencias = [];
    indiceBuscaVozServicos.forEach(({ index, formas }) => {
        if (formas.includes(formaFalado)) {
            correspondencias.push({ index, tamanho: formaFalado.length });
        }
    });
    correspondencias.sort((a, b) => b.tamanho - a.tamanho);

    if (!correspondencias.length
        || (correspondencias[1] && correspondencias[0].tamanho === correspondencias[1].tamanho)) {
        return -1;
    }
    return correspondencias[0].index;
}

function mostrarSugestoesBuscaVoz(sugestoes) {
    sugestoesBuscaVoz.replaceChildren();
    const sugestaoPrincipal = sugestoes.length === 1
        || (typeof sugestoes[0]?.pontuacao === 'number'
            && typeof sugestoes[1]?.pontuacao === 'number'
            && sugestoes[0].pontuacao - sugestoes[1].pontuacao >= 0.08);
    const titulo = document.createElement('p');
    titulo.className = 'titulo-sugestoes-busca-voz';
    titulo.textContent = 'Talvez você esteja procurando por:';
    sugestoesBuscaVoz.appendChild(titulo);

    sugestoes.forEach((sugestao, indice) => {
        const servico = servicosAWS.find(item => item.nome === sugestao.nomeServico);
        const topico = sugestao.tipo === 'topico'
            ? topicosPorServico[sugestao.nomeServico]?.topicos[sugestao.indiceTopico]
            : null;
        if (!servico || (sugestao.tipo === 'topico' && !topico)) {
            console.error(`Sugestao de voz invalida para o servico ${sugestao.nomeServico}.`);
            return;
        }

        const opcao = document.createElement('button');
        opcao.className = 'opcao-sugestao-busca-voz';
        opcao.type = 'button';
        opcao.dataset.servico = sugestao.nomeServico;
        if (topico) {
            opcao.dataset.indiceTopico = sugestao.indiceTopico;
        }
        if (indice === 0 && sugestaoPrincipal) {
            opcao.classList.add('opcao-sugestao-principal-busca-voz');
        }

        const tituloTopico = document.createElement('span');
        tituloTopico.className = 'titulo-opcao-sugestao-busca-voz';
        tituloTopico.textContent = topico ? topico.titulo : servico.nome;
        const nomeServico = document.createElement('span');
        nomeServico.className = 'servico-opcao-sugestao-busca-voz';
        nomeServico.textContent = topico ? servico.nome : 'Serviço AWS';
        opcao.append(tituloTopico, nomeServico);
        if (indice === 0 && sugestaoPrincipal) {
            const selo = document.createElement('span');
            selo.className = 'selo-sugestao-busca-voz';
            selo.textContent = 'Mais provável';
            opcao.appendChild(selo);
        }
        sugestoesBuscaVoz.appendChild(opcao);
    });

    popupBuscaVoz.classList.add('mostrando-sugestoes-voz');
    definirAtividadeBuscaVoz(false);
    definirStatusBuscaVoz(
        sugestoes.length
            ? 'Não escolhi um resultado automaticamente. Toque em uma opção para abrir:'
            : 'Não encontrei correspondências próximas. Tente dizer mais palavras do título.',
        !sugestoes.length
    );
    botaoFecharPopupBuscaVoz.focus();
}

function localizarServicoPorVoz(texto) {
    const palavrasFaladas = normalizarPronunciaServico(texto)
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .split(/\s+/)
        .filter(palavra => palavra && !palavrasIgnoradasBuscaVoz.has(palavra));

    if (palavrasFaladas.length === 0) {
        return -1;
    }

    const palavrasCompactadas = palavrasFaladas.join('');
    if (!indiceBuscaVozServicos) {
        const aliasesVoz = {
            'Amazon EC2': ['ec dois', 'e c dois', 'e c 2', 'i c dois', 'í ci tu', 'ec two', 'ee see two', 'easy two'],
            'AWS Lambda': ['lambida', 'lâmbida', 'lambada', 'lambda aws', 'lam b da', 'lamda', 'lamb duh'],
            'Amazon ECS': ['e c s', 'e c esse', 'e ce esse', 'é que esse', 'ecs amazon', 'ee see ess', 'amazon e c s'],
            'Amazon EKS': ['e k s', 'e k esse', 'e cá esse', 'eks amazon', 'ee kay ess', 'amazon e k s'],
            'AWS Batch': ['batchi', 'béti', 'batch aws', 'batch', 'béch', 'betch', 'match', 'batch job'],
            'Amazon Aurora': ['aurora', 'amazon aurora', 'a urora', 'uh roar uh'],
            'Amazon DynamoDB': ['dynamo db', 'dínamo db', 'dinamo de be', 'dynamo de be', 'dynamo d b', 'dynamo dee bee', 'dynamo database'],
            'Amazon RDS': ['r d s', 'erre de esse', 'r d esse', 'ar dee ess', 'relational database service'],
            'Amazon ElastiCache': ['elastic cache', 'elasti cache', 'elast cache', 'elastic cash', 'elasti cash'],
            'Amazon Redshift': ['red shift', 'redchift', 'redshit', 'red shift database'],
            'Amazon S3': ['s três', 'esse três', 's tree', 's 3'],
            'Amazon EBS': ['e b s', 'e bê esse', 'e b esse', 'ee bee ess', 'elastic block store'],
            'Amazon EFS': ['e f s', 'e efe esse', 'e f esse', 'ee eff ess', 'elastic file system'],
            'AWS Glue': ['glu', 'glue aws', 'blue', 'blu', 'gloo', 'glue', 'data glue'],
            'Amazon OpenSearch': ['open search', 'open circh', 'open surch', 'open search service'],
            'Amazon Bedrock': ['bed rock', 'bedróqui', 'bed rack', 'bedrock'],
            'Amazon SageMaker': ['sage maker', 'seij meiker', 'seige meiker', 'sage meiker', 'sagemaker'],
            'Amazon MSK': ['m s k', 'eme esse cá', 'em es kay', 'managed streaming kafka'],
            'Amazon EMR': ['e m r', 'e eme erre', 'ee em ar', 'elastic map reduce'],
            'Amazon Kinesis': ['quinesis', 'kinésis', 'kinezes', 'kinessas', 'kinesis'],
            'AWS Direct Connect': ['direct connect', 'dáirect connect', 'direct conéct', 'direct connection'],
            'Amazon CloudFront': ['cloud front', 'cláud front', 'cloud frant', 'cloudfront'],
            'AWS WAF': ['w a f', 'dábliu a efe', 'double u a f', 'web application firewall'],
            'NAT Gateway': ['net gateway', 'nat gateway', 'nat gueituei', 'network address translation gateway'],
            'Amazon API Gateway': ['api gateway', 'a p i gateway', 'ei pi ai gateway', 'api gueituei'],
            'Amazon CloudWatch': ['cloud watch', 'cláud uatch', 'cloud uotch', 'cloudwatch'],
            'AWS Config': ['config aws', 'confi', 'config', 'aws configuration'],
            'AWS Secrets Manager': ['secrets manager', 'secret manager', 'secrets maneger', 'secret manajer'],
            'AWS CloudTrail': ['cloud trail', 'cláud treil', 'cloud treil', 'cloudtrail'],
            'AWS KMS': ['k m s', 'cá eme esse', 'kay em ess', 'key management service'],
            'AWS Shield': ['shield aws', 'chield', 'shild', 'shield'],
            'AWS Trusted Advisor': ['trusted advisor', 'trusted adivisor', 'trusted advis er'],
            'Amazon SQS': ['s q s', 'esse que esse', 'ess cue ess', 'simple queue service'],
            'Amazon SNS': ['s n s', 'esse ene esse', 'ess en ess', 'simple notification service'],
            'Amazon EventBridge': ['event bridge', 'event brídge', 'event brige', 'eventbridge'],
            'AWS DMS': ['d m s', 'de eme esse', 'dee em ess', 'database migration service'],
            'Amazon Neptune': ['neptune', 'néptun', 'neptun', 'neptune database'],
            'Amazon DocumentDB': ['document db', 'document de be', 'document database', 'document d b'],
            'AWS MemoryDB for Redis': ['memory db redis', 'memory db for redis', 'memory de be redis', 'memory db four head', 'memory db 4head', 'memory db for red is', 'memory dee bee for red iss', 'memory database for redis'],
            'Amazon Athena': ['athena', 'atena', 'a thena', 'uh thee nuh'],
            'Amazon Cognito': ['cognito', 'cogníto', 'cog nito', 'cognito identity'],
            'AWS IAM Access Analyzer': ['iam access analyzer', 'i am access analyzer', 'access analyzer', 'eye am access analyzer'],
            'AWS Transit Gateway': ['transit gateway', 'trânsito gateway', 'transit gueituei'],
            'Amazon Macie': ['maci', 'massie', 'massy', 'mah see'],
            'AWS Direct Connect Gateway': ['direct connect gateway', 'dáirect connect gateway', 'direct conéct gueituei'],
            'AWS Storage Gateway': ['storage gateway', 'storage gueituei', 'storege get to', 'storage get to', 'stor age gateway', 'storage gateway service'],
            'Amazon WorkSpaces': ['work spaces', 'work speices', 'workspaces', 'work space'],
            'Amazon VPC': ['v p c', 'vê pê cê', 'vpc', 'vips', 'v p s', 'vee pee see', 'virtual private cloud']
        };

        indiceBuscaVozServicos = servicosAWS.map((servico, index) => {
            const nomes = [servico.nome, ...(aliasesVoz[servico.nome] || [])];
            const formas = nomes.map(nome => normalizarBuscaServico(nome)
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .split(/\s+/)
                .filter(palavra => palavra && !palavrasIgnoradasBuscaVoz.has(palavra))
                .join(''))
                .filter(Boolean);

            return {
                index,
                formas,
                formasAproximadas: formas.filter(forma => forma.length >= 5),
                palavrasServico: normalizarBuscaServico(servico.nome)
                    .split(/\s+/)
                    .filter(palavra => palavra !== 'aws')
            };
        });
    }

    const formasFaladas = new Set();
    for (let inicio = 0; inicio < palavrasFaladas.length; inicio += 1) {
        for (let tamanho = 1; tamanho <= Math.min(5, palavrasFaladas.length - inicio); tamanho += 1) {
            formasFaladas.add(palavrasFaladas.slice(inicio, inicio + tamanho).join(''));
        }
    }

    const correspondenciasExatas = [];
    indiceBuscaVozServicos.forEach(({ index, formas }) => {
        let maiorCorrespondencia = 0;
        formas.forEach(compacto => {
            if (compacto === palavrasCompactadas || formasFaladas.has(compacto)) {
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

    const servicosCorrespondentes = indiceBuscaVozServicos
        .map(({ index, palavrasServico, formasAproximadas }) => {
            const correspondePorSequencia = palavrasServico.some((_, inicio) =>
                palavrasServico.every((palavra, deslocamento) =>
                    palavrasFaladas[inicio + deslocamento] === palavra
                )
            );
            const correspondeCompactado = palavrasCompactadas === palavrasServico.join('');

            let pontuacao = correspondePorSequencia || correspondeCompactado ? palavrasServico.length : 0;
            formasAproximadas.forEach(forma => {
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
        const nomeServicoRestrito = !telaTopicosServico.classList.contains('hidden')
            && servicoTopicosAtual
            ? Object.keys(topicosPorServico).find(nome =>
                topicosPorServico[nome] === servicoTopicosAtual
            )
            : null;
        let textoFinal = '';
        let indiceServico = -1;
        let topicoCorrespondente = null;
        let sugestoesServicosCorrespondentes = [];
        let sugestoesCorrespondentes = [];
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
                if (nomeServicoRestrito) {
                    const correspondencia = localizarTopicoPorVoz(
                        textoAlternativo,
                        nomeServicoRestrito
                    );
                    if (correspondencia.certeza) {
                        topicoCorrespondente = correspondencia.topico;
                        textoFinal = textoAlternativo;
                        break;
                    }
                    if (correspondencia.sugestoes.length) {
                        sugestoesCorrespondentes = correspondencia.sugestoes;
                        textoFinal = textoAlternativo;
                        break;
                    }
                    continue;
                }

                const indiceServicoExato = localizarServicoExatoPorVoz(textoAlternativo);
                if (indiceServicoExato !== -1) {
                    indiceServico = indiceServicoExato;
                    textoFinal = textoAlternativo;
                    break;
                }

                const correspondencia = localizarTopicoPorVoz(textoAlternativo);
                if (correspondencia.certeza) {
                    topicoCorrespondente = correspondencia.topico;
                    textoFinal = textoAlternativo;
                    break;
                }

                const sugestoesServicos = localizarServicosSemelhantesPorVoz(textoAlternativo);
                if (sugestoesServicos.length) {
                    sugestoesServicosCorrespondentes = sugestoesServicos;
                    textoFinal = textoAlternativo;
                    break;
                }

                if (correspondencia.sugestoes.length) {
                    sugestoesCorrespondentes = correspondencia.sugestoes;
                    textoFinal = textoAlternativo;
                    break;
                }

                const indiceServicoCorrespondente = localizarServicoPorVoz(textoAlternativo);
                if (indiceServicoCorrespondente !== -1) {
                    indiceServico = indiceServicoCorrespondente;
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
        if (nomeServicoRestrito && !topicoCorrespondente) {
            if (sugestoesCorrespondentes.length) {
                mostrarSugestoesBuscaVoz(sugestoesCorrespondentes);
            } else {
                definirStatusBuscaVoz(
                    `Não encontrei tópicos de ${servicoTopicosAtual.titulo} próximos da fala. Tente novamente.`,
                    true
                );
            }
            return;
        }

        if (sugestoesServicosCorrespondentes.length) {
            mostrarSugestoesBuscaVoz(sugestoesServicosCorrespondentes);
            return;
        }
        if (topicoCorrespondente) {
            indiceServico = servicosAWS.findIndex(servico =>
                servico.nome === topicoCorrespondente.nomeServico
            );
        } else if (indiceServico === -1) {
            if (sugestoesCorrespondentes.length) {
                mostrarSugestoesBuscaVoz(sugestoesCorrespondentes);
            } else {
                definirStatusBuscaVoz('Não encontrei correspondências próximas. Tente novamente.', true);
            }
            return;
        }

        const servico = servicosAWS[indiceServico];
        campoBuscaServicos.value = servico.nome;
        registrarBuscaRecente(servico.nome);
        fecharPopupBuscaVoz(false);
        resultadosBuscaServicos.classList.add('hidden');
        campoBuscaServicos.setAttribute('aria-expanded', 'false');
        if (topicosPorServico[servico.nome]) {
            abrirTelaTopicosServico(servico.nome);
            if (topicoCorrespondente) {
                abrirPopupTopicoServico(topicoCorrespondente.indiceTopico);
            }
            return;
        }
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
            const estaNaTelaDeTopicos = !telaTopicosServico.classList.contains('hidden');
            definirStatusBuscaVoz(
                estaNaTelaDeTopicos
                    ? 'Não identifiquei um tópico deste serviço. Tente novamente.'
                    : 'Não identifiquei um serviço. Tente novamente.',
                true
            );
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
    sugestoesBuscaVoz.replaceChildren();
    popupBuscaVoz.classList.remove('mostrando-sugestoes-voz');
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
        if (topicosPorServico[servico.nome]) {
            abrirTelaTopicosServico(servico.nome);
            return;
        }
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

function abrirTelaTopicosServico(nomeServico) {
    const dadosServico = topicosPorServico[nomeServico];
    if (!dadosServico) {
        console.error(`Nao ha topicos cadastrados para ${nomeServico}.`);
        return;
    }
    const servico = servicosAWS.find(item => item.nome === nomeServico);
    if (servico && !dadosPersistidos.servicosExplorados.includes(nomeServico)) {
        registrarServicoNoHistorico(servico);
    }
    const indicePersonagem = personagens.indexOf(personagemSelecionado);
    servicoTopicosAtual = dadosServico;
    tituloTelaTopicosServico.textContent = dadosServico.titulo;
    atualizarHistoricoAplicacao('topicos-servico', {
        indicePersonagem,
        servicoTopicos: nomeServico
    }, true);
    ocultarPopupCartaoServico();
    conteudoServicos.classList.add('hidden');
    telaTopicosServico.classList.remove('hidden');
    botaoVoltarTelaTopicos.classList.remove('hidden');
    gerarCartoesTopicosServico();
    window.scrollTo(0, 0);
}

function abrirPopupTopicoServico(index) {
    const topico = servicoTopicosAtual?.topicos[index];
    if (!topico) {
        console.error(`Topico invalido para o servico ${servicoTopicosAtual?.titulo || 'desconhecido'}.`);
        return;
    }
    atualizarHistoricoAplicacao('topico-servico', {
        indicePersonagem: personagens.indexOf(personagemSelecionado),
        servicoTopicos: servicosAWS.find(servico => topicosPorServico[servico.nome] === servicoTopicosAtual)?.nome
            || Object.keys(topicosPorServico).find(nome => topicosPorServico[nome] === servicoTopicosAtual),
        indiceTopico: index
    });
    abrirPopupTopicoServicoVisual(index);
}

function abrirPopupTopicoServicoVisual(index) {
    const topico = servicoTopicosAtual?.topicos[index];
    if (!topico) {
        console.error(`Topico invalido para o indice ${index}.`);
        return;
    }
    requisicaoDiagnosticoAtual += 1;
    painelDiagnosticoTopico.classList.add('hidden');
    painelDiagnosticoTopico.setAttribute('aria-busy', 'false');
    statusDiagnosticoTopico.textContent = '';
    conteudoDiagnosticoTopico.replaceChildren();
    botaoSeguirTopicoServico.disabled = false;
    tituloPopupTopicoServico.textContent = topico.titulo;
    descricaoPopupTopicoServico.textContent = topico.descricao;
    popupTopicoServico.classList.remove('hidden');
    botaoFecharPopupTopicoServico.focus();
}

// Converte nomes e títulos em identificadores compatíveis com as rotas da API.
function gerarSlugDiagnostico(valor) {
    return valor
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function adicionarTextoDiagnostico(tag, classe, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = texto;
    return elemento;
}

// Exibe diagnósticos, passos de verificação e ações seguras do catálogo.
function renderizarDiagnosticoTopico(diagnostico) {
    const resumo = adicionarTextoDiagnostico('p', 'resumo-diagnostico-topico', diagnostico.summary);
    const etapas = document.createDocumentFragment();
    const rotulos = {
        check: 'O que conferir',
        action: 'Próxima ação',
        caution: 'Atenção'
    };

    etapas.appendChild(resumo);

    diagnostico.steps.forEach((etapa) => {
        const bloco = document.createElement('section');
        bloco.className = `etapa-diagnostico-topico etapa-${etapa.type}`;
        bloco.appendChild(adicionarTextoDiagnostico('span', 'rotulo-etapa-diagnostico', rotulos[etapa.type]));
        bloco.appendChild(adicionarTextoDiagnostico('h3', 'titulo-etapa-diagnostico', etapa.title));
        bloco.appendChild(adicionarTextoDiagnostico('p', 'texto-etapa-diagnostico', etapa.content));
        etapas.appendChild(bloco);
    });

    if (diagnostico.sources.length) {
        const fontes = document.createElement('section');
        fontes.className = 'fontes-diagnostico-topico';
        fontes.appendChild(adicionarTextoDiagnostico('h3', 'titulo-fontes-diagnostico', 'Fontes oficiais da AWS'));

        diagnostico.sources.forEach((fonte) => {
            const link = document.createElement('a');
            let url;
            try {
                url = new URL(fonte.url);
            } catch (error) {
                console.error('URL inválida em uma fonte do diagnóstico:', error);
                return;
            }
            if (
                url.protocol !== 'https:'
                || !['docs.aws.amazon.com', 'aws.amazon.com'].includes(url.hostname)
            ) {
                console.error('Fonte ignorada por não ser documentação oficial da AWS:', fonte.url);
                return;
            }
            link.href = url.href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = fonte.title;
            fontes.appendChild(link);
        });

        if (fontes.querySelector('a')) {
            etapas.appendChild(fontes);
        }
    }

    conteudoDiagnosticoTopico.replaceChildren(etapas);
}

async function carregarDiagnosticoTopicoServico() {
    const topico = servicoTopicosAtual?.topicos.find(
        (item) => item.titulo === tituloPopupTopicoServico.textContent
    );
    const nomeServico = Object.keys(topicosPorServico).find(
        (nome) => topicosPorServico[nome] === servicoTopicosAtual
    );
    const apiBase = window.FINSLASH_API_BASE_URL?.trim().replace(/\/+$/u, '');
    const requisicao = ++requisicaoDiagnosticoAtual;

    painelDiagnosticoTopico.classList.remove('hidden');
    conteudoDiagnosticoTopico.replaceChildren();
    if (!apiBase) {
        painelDiagnosticoTopico.setAttribute('aria-busy', 'false');
        painelDiagnosticoTopico.classList.add('hidden');
        console.warn('Diagnóstico ainda indisponível: configure FINSLASH_API_BASE_URL para carregar os roteiros.');
        return;
    }
    if (!topico || !nomeServico) {
        painelDiagnosticoTopico.setAttribute('aria-busy', 'false');
        statusDiagnosticoTopico.textContent = 'Não foi possível identificar este serviço e tópico.';
        console.error('Não foi possível identificar o tópico atual para consultar o diagnóstico.');
        return;
    }

    painelDiagnosticoTopico.setAttribute('aria-busy', 'true');
    botaoSeguirTopicoServico.disabled = true;
    statusDiagnosticoTopico.textContent = 'Buscando roteiro de verificação...';

    try {
        const url = `${apiBase}/api/v1/services/${gerarSlugDiagnostico(nomeServico)}` +
            `/scenarios/${gerarSlugDiagnostico(topico.titulo)}`;
        const resposta = await fetch(url, { headers: { Accept: 'application/json' } });
        const diagnostico = await resposta.json();
        if (!resposta.ok) {
            throw new Error(diagnostico.error || `A API respondeu com o status ${resposta.status}.`);
        }
        if (
            typeof diagnostico.summary !== 'string'
            || !Array.isArray(diagnostico.steps)
            || !Array.isArray(diagnostico.sources)
            || !diagnostico.steps.every((etapa) =>
                ['check', 'action', 'caution'].includes(etapa.type)
                && typeof etapa.title === 'string'
                && typeof etapa.content === 'string'
            )
            || !diagnostico.sources.every((fonte) =>
                typeof fonte.title === 'string'
                && typeof fonte.url === 'string'
            )
        ) {
            throw new Error('A API retornou um formato de diagnóstico inválido.');
        }
        if (requisicao !== requisicaoDiagnosticoAtual) {
            return;
        }
        renderizarDiagnosticoTopico(diagnostico);
        statusDiagnosticoTopico.textContent = '';
    } catch (error) {
        if (requisicao !== requisicaoDiagnosticoAtual) {
            return;
        }
        console.error('Falha ao carregar o diagnóstico do tópico:', error);
        statusDiagnosticoTopico.textContent = error instanceof Error
            ? error.message
            : 'Não foi possível carregar o diagnóstico agora.';
    } finally {
        if (requisicao === requisicaoDiagnosticoAtual) {
            painelDiagnosticoTopico.setAttribute('aria-busy', 'false');
            botaoSeguirTopicoServico.disabled = false;
        }
    }
}

function fecharPopupTopicoServico() {
    if (window.history.state?.app === 'FinSlash' && window.history.state.tela === 'topico-servico') {
        window.history.back();
        return;
    }
    popupTopicoServico.classList.add('hidden');
}

function voltarParaTelaServicos() {
    atualizarHistoricoAplicacao('servicos', {
        indicePersonagem: personagens.indexOf(personagemSelecionado)
    }, true);
    popupTopicoServico.classList.add('hidden');
    telaTopicosServico.classList.add('hidden');
    botaoVoltarTelaTopicos.classList.add('hidden');
    conteudoServicos.classList.remove('hidden');
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

// Liga a seleção de resultados às telas, aos tópicos e aos detalhes do serviço.
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
    });
    
    // Define a imagem do personagem no header da tela de servicos
    imagemPersonagemHeader.src = personagemTemp.imagem;
    imagemPersonagemHeader.alt = personagemTemp.nome;
    
    // Restaura a referencia ao personagem
    personagemSelecionado = personagemTemp;
    
    // Exibe a tela de servicos
    popupAnimacao.classList.add('hidden');
    conteudoServicos.classList.remove('hidden');
    telaTopicosServico.classList.add('hidden');
    botaoVoltarTelaTopicos.classList.add('hidden');
    popupTopicoServico.classList.add('hidden');
    telaServicos.classList.remove('hidden');
    document.body.classList.add('tela-servicos-ativa');
    document.body.appendChild(canvasOnda);
    inicializarCanvasOnda();
    atualizarDisponibilidadePesquisaNavegacao();
    
    console.log('Tela de servicos deve estar visivel agora');
    
    // Gera os cartoes de servicos
    if (!gridServicos.children.length) {
        gerarCartoesServicos();
    }
    
    console.log('Personagem selecionado:', personagemSelecionado.imagem);
}

// Eventos de interação, acessibilidade, pesquisa e envio de mensagens.
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
botaoAdvisorApp.addEventListener('click', abrirAdvisor);
botaoFecharAdvisor.addEventListener('click', () => fecharAdvisor());
popupAdvisor.addEventListener('click', event => {
    if (event.target === popupAdvisor) {
        fecharAdvisor();
    }
});
campoAdvisor.addEventListener('input', () => {
    contadorAdvisor.textContent = `${campoAdvisor.value.length}/300`;
    if (statusAdvisor.textContent && statusAdvisor.textContent !== 'Consultando diagnósticos...') {
        statusAdvisor.textContent = '';
    }
});
campoAdvisor.addEventListener('focus', atualizarViewportVisualAdvisor);
campoAdvisor.addEventListener('blur', () => {
    popupAdvisor.classList.remove('advisor-teclado');
    campoAdvisor.closest('.painel-advisor')?.classList.remove('advisor-digitando');
    window.requestAnimationFrame(atualizarViewportVisualAdvisor);
});
window.visualViewport?.addEventListener('resize', atualizarViewportVisualAdvisor);
window.visualViewport?.addEventListener('scroll', atualizarViewportVisualAdvisor);
window.addEventListener('resize', atualizarViewportVisualAdvisor);
campoAdvisor.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        formularioAdvisor.requestSubmit();
    }
});
formularioAdvisor.addEventListener('submit', event => {
    event.preventDefault();
    enviarPerguntaAdvisor(campoAdvisor.value);
});
cenariosAdvisor.addEventListener('click', event => {
    const botao = event.target.closest('[data-pergunta-advisor]');
    if (!botao) {
        return;
    }
    campoAdvisor.value = botao.dataset.perguntaAdvisor;
    contadorAdvisor.textContent = `${campoAdvisor.value.length}/300`;
    enviarPerguntaAdvisor(campoAdvisor.value);
});
botaoFecharConquistaFinal.addEventListener('click', fecharPopupConquistaFinal);
botaoContinuarConquista.addEventListener('click', fecharPopupConquistaFinal);
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
popupConquistaFinal.addEventListener('click', event => {
    if (event.target === popupConquistaFinal) {
        fecharPopupConquistaFinal();
    }
});
document.querySelectorAll('[data-aba-perfil]').forEach(botao => {
    botao.addEventListener('click', () => atualizarConteudoAbaPerfil(botao.dataset.abaPerfil));
});
botaoEnviarFeedback.addEventListener('click', enviarFeedbackPerfil);
botaoBuscaVoz.addEventListener('click', abrirPopupBuscaVoz);
botaoFecharPopupBuscaVoz.addEventListener('click', () => fecharPopupBuscaVoz());
botaoTentarNovamenteBuscaVoz.addEventListener('click', iniciarReconhecimentoVoz);
sugestoesBuscaVoz.addEventListener('click', event => {
    const opcao = event.target.closest('.opcao-sugestao-busca-voz');
    if (!opcao || !sugestoesBuscaVoz.contains(opcao)) {
        return;
    }

    const servico = servicosAWS.find(item => item.nome === opcao.dataset.servico);
    if (!servico) {
        console.error(`Servico invalido na sugestao de voz: ${opcao.dataset.servico}.`);
        return;
    }

    fecharPopupBuscaVoz(false);
    campoBuscaServicos.value = servico.nome;
    registrarBuscaRecente(servico.nome);
    if (opcao.dataset.indiceTopico !== undefined) {
        const indiceTopico = Number(opcao.dataset.indiceTopico);
        abrirTelaTopicosServico(servico.nome);
        abrirPopupTopicoServico(indiceTopico);
        return;
    }
    if (topicosPorServico[servico.nome]) {
        abrirTelaTopicosServico(servico.nome);
        return;
    }
    abrirPopupCartaoServico(servicosAWS.indexOf(servico));
});
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
botaoFecharPopupTopicoServico.addEventListener('click', fecharPopupTopicoServico);
botaoVoltarTopicoServico.addEventListener('click', fecharPopupTopicoServico);
botaoSeguirTopicoServico.addEventListener('click', carregarDiagnosticoTopicoServico);
botaoVoltarTelaTopicos.addEventListener('click', voltarParaTelaServicos);
popupTopicoServico.addEventListener('click', (event) => {
    if (event.target === popupTopicoServico) {
        fecharPopupTopicoServico();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popupAdvisor.classList.contains('hidden')) {
        fecharAdvisor();
        return;
    }
    if (event.key === 'Escape' && !popupConquistaFinal.classList.contains('hidden')) {
        fecharPopupConquistaFinal();
        return;
    }
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
        return;
    }
    if (event.key === 'Escape' && !popupTopicoServico.classList.contains('hidden')) {
        fecharPopupTopicoServico();
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

// Inicializa o histórico, os componentes visuais e os cartões da aplicação.
document.addEventListener('DOMContentLoaded', () => {
    window.history.replaceState({ app: 'FinSlash', tela: 'inicio' }, '', window.location.href);
    restaurarHistoricoAdvisor();
    atualizarAvatarNavegacao();
    atualizarDisponibilidadePesquisaNavegacao();
    gerarCartoesPersonagens();
    decodificarImagensPersonagens();
    inicializarCanvasOnda();
});
