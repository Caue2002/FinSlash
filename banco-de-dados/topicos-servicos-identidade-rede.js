window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
    "Amazon Cognito": {
        titulo: "Cognito",
        topicos: [
            {
                titulo: "Uso de User Pools Provisionados para Milhares de Usuários Inativos",
                descricao: "Manter contas de usuários que não acessam o aplicativo bancário há anos sem aplicar políticas de expiração ou desativação, inflando a contagem de Monthly Active Users (MAU) faturados."
            },
            {
                titulo: "Ativação Inadequada de Recursos Avançados de Segurança (Advanced Security Features)",
                descricao: "Habilitar a proteção avançada contra fraudes de login (como verificação de credenciais comprometidas) para todo o volume de acessos sem filtrar endpoints ou regras de escopo, gerando cobranças adicionais por MAU."
            },
            {
                titulo: "Envio Masivo de SMS de Verificação/OTP sem Otimização de Custos",
                descricao: "Disparar códigos de autenticação em duas etapas (2FA) e confirmações de cadastro via SMS diretamente pelo Cognito sem validar operadoras ou sem priorizar e-mail/push/TOTP, gerando custos pesados de mensagens de texto."
            },
            {
                titulo: "Falta de Validação de Permissões no Identity Pool (Tokens IAM Não Restritos)",
                descricao: "Conceder perfis IAM (Unauthenticated / Authenticated Roles) com permissões excessivas para o Identity Pool do Cognito, permitindo que usuários do app móvel acessem recursos da AWS diretamente sem passar pelas APIs backend."
            },
            {
                titulo: "Configuração Incorreta de Tokens de Acesso (Access / ID Tokens) com TTLs Longos",
                descricao: "Definir o tempo de expiração dos tokens de acesso para o limite máximo (ex: 1 dia) em aplicações financeiras sensíveis, aumentando a janela de ataque em caso de roubo de dispositivo."
            },
            {
                titulo: "Falta de Uso de Cognito Triggers para Bloqueio de Cadastros Falsos",
                descricao: "Deixar de utilizar funções Lambda nos gatilhos pré-cadastro (Pre-sign-up) para validar CPFs e barrar a criação automatizada de contas por bots antes da emissão de tokens."
            },
            {
                titulo: "Personalização Ineficiente da Interface de Login (Hosted UI)",
                descricao: "Tentar utilizar a tela padrão hospedada pela AWS para fluxos complexos de onboarding bancário em vez de usar as SDKs nativas para montar a experiência no aplicativo, gerando falhas de experiência e desativações."
            },
            {
                titulo: "Falta de Monitoramento de Tentativas de Força Bruta (SignInThrottling)",
                descricao: "Não configurar alarmes CloudWatch para surtos de falhas de autenticação, o que indica ataques de credential stuffing direcionados às contas dos clientes."
            },
            {
                titulo: "Federação SAML/OIDC sem Mapeamento Incorreto de Atributos",
                descricao: "Integrar o Cognito com provedores de identidade externos (como Azure AD ou Okta) para colaboradores internos sem sincronizar corretamente as permissões de acesso, concedendo privilégios indevidos."
            },
            {
                titulo: "Tráfego de Autenticação Roteado Ineficientemente sem CDN",
                descricao: "Permitir que chamadas de autenticação do aplicativo móvel batam diretamente no endpoint regional do Cognito em vez de otimizar a conexão de rede via distribuições locais."
            },
            {
                titulo: "Falta de Criptografia e Proteção de Atributos Personalizados (Custom Attributes)",
                descricao: "Salvar dados sensíveis em texto plano como atributos customizados no perfil do usuário do Cognito sem aplicar mascaramento ou criptografia."
            },
            {
                titulo: "Uso do Cognito em Vez de Provedores Específicos para Integrações B2B",
                descricao: "Tentar adaptar User Pools tradicionais para integrar sistemas de parceiros corporativos de grande porte que exigiam arquiteturas de OpenID Connect dedicadas."
            },
            {
                titulo: "Falta de Limpeza de Usuários Não Confirmados (Unconfirmed Users)",
                descricao: "Acumular milhares de cadastros incompletos gerados por tentativas de abertura de conta abandonadas que poluem a base de dados do User Pool."
            },
            {
                titulo: "Duplicação de User Pools por Silos de Aplicação",
                descricao: "Criar um User Pool isolado para cada pequeno microsserviço ou aplicativo secundário do banco em vez de centralizar a gestão de identidades com grupos e escopos (Scopes)."
            },
            {
                titulo: "Ausência de Logs de Auditoria Habilitados para Alterações de Perfil",
                descricao: "Deixar de exportar eventos do Cognito para o CloudWatch/CloudTrail, impedindo a rastreabilidade em investigações de fraudes em contas de clientes."
            },
            {
                titulo: "Falta de Suporte a Multi-Fator Flexível (MFA Obrigatório sem Exceção de Dispositivo Confioso)",
                descricao: "Exigir MFA completo em 100% dos cliques do usuário sem guardar dispositivos confiáveis (Remember Device), gerando reclamações na loja de aplicativos e desistência de uso."
            },
            {
                titulo: "Migração Ineficiente de Usuários de Bases Legadas (User Migration Lambda Trigger)",
                descricao: "Forçar a redefinição de senha para milhões de clientes em migrações de sistemas em vez de usar a migração transparente via gatilho Lambda."
            },
            {
                titulo: "Uso de E-mail/SMS para Recuperação de Senha sem Restrição de Taxa",
                descricao: "Permitir solicitações ilimitadas de \"Esqueci minha senha\", gerando custos de infraestrutura e sobrecarga nos canais de comunicação do banco."
            },
            {
                titulo: "Falta de Rotação de Segredos em Clientes de Aplicação (App Client Secrets)",
                descricao: "Manter credenciais estáticas de integração entre o backend do banco e os clientes de aplicação do Cognito sem políticas de renovação."
            },
            {
                titulo: "Ausência de Alertas de Custo para Ultrapassagem da Faixa Gratuita de MAU",
                descricao: "Não monitorar o crescimento no número de usuários ativos mensais, sendo surpreendido por cobranças escalonadas no modelo de preço do Cognito."
            }
        ]
    },
    "AWS IAM Access Analyzer": {
        titulo: "IAM Access Analyzer",
        topicos: [
            {
                titulo: "Ignorar Achados Críticos de Acesso Público (Public Findings)",
                descricao: "Desconsiderar os alertas do Access Analyzer que indicam buckets S3, filas SQS ou chaves KMS com acesso exposto para a internet ou para toda a AWS."
            },
            {
                titulo: "Falta de Integração com a Organização (Multi-Account Delegated Admin)",
                descricao: "Ativar o Access Analyzer apenas na conta principal em vez de delegar a administração de segurança e analisar todas as contas da organização bancária de forma centralizada."
            },
            {
                titulo: "Uso de Análises Apenas Manuais no Console sem Automação",
                descricao: "Analisar relatórios de acessos de forma esporádica e manual em vez de automatizar a notificação de novos achados via EventBridge e Security Hub."
            },
            {
                titulo: "Falta de Geração de Políticas de Privilégio Mínimo baseadas em Logs (Policy Generation)",
                descricao: "Continuar escrevendo políticas IAM manuais e permissivas () em vez de utilizar o recurso do Access Analyzer que gera políticas exatas com base no histórico real de chamadas do CloudTrail."
            },
            {
                titulo: "Tratar Achados Intencionais como Erros sem Aplicar Correção de Escopo (Archive Rules)",
                descricao: "Deixar alertas legítimos (como um bucket público de imagens do app) poluindo a lista de achados ativos sem criar regras de arquivamento automático (Archive Rules)."
            },
            {
                titulo: "Análise Restrita a Recursos em Vez de Validar Identidades IAM",
                descricao: "Focar a auditoria apenas nos buckets S3 e esquecer de auditar os perfis IAM (IAM Roles) e usuários que possuem permissões acumuladas há anos."
            },
            {
                titulo: "Falta de Validação de Políticas IAM no Pipeline de CI/CD (Unused Access Analysis)",
                descricao: "Não integrar a validação de código de infraestrutura (Terraform/CloudFormation) com o Access Analyzer para barrar deploys de políticas inseguras antes de subirem para produção."
            },
            {
                titulo: "Inclusão de Contas de Sandbox e Testes no Escopo de Auditoria Crítica",
                descricao: "Misturar os alertas de conformidade de contas de estudos de desenvolvedores com a conta de produção bancária, gerando sobrecarga nas equipes de SOC."
            },
            {
                titulo: "Ignorar Alertas de Troca de Chaves KMS ou Filas SQS Compartilhadas",
                descricao: "Desconsiderar acessos concedidos a contas de parceiros terceiros que foram descontinuados mas continuam listados no Access Analyzer."
            },
            {
                titulo: "Falta de Auditoria de Acessos Não Utilizados (Unused Access)",
                descricao: "Ignorar os relatórios que indicam perfis IAM, credenciais e permissões que não são utilizados há mais de 90 dias por microsserviços."
            },
            {
                titulo: "Ausência de Notificações Automáticas no Slack/Teams para o SOC",
                descricao: "Manter os achados do Access Analyzer restritos ao console AWS sem enviar alertas imediatos para os canais da equipe de resposta a incidentes."
            },
            {
                titulo: "Falta de Revisão Periódica das Regras de Arquivamento (Archived Findings)",
                descricao: "Deixar regras de arquivamento antigas ativas que podem estar ocultando novas vulnerabilidades de segurança criadas recentemente."
            },
            {
                titulo: "Uso de Políticas Genéricas de Supressão que Ocultam Riscos Reais",
                descricao: "Criar regras de supressão de alertas abrangentes demais (ex: ocultar todos os alertas da região us-east-1), deixando brechas de segurança abertas."
            },
            {
                titulo: "Não Avaliar Conexões de Confiança com Organizações Parceiras",
                descricao: "Focar apenas no ambiente interno do banco e ignorar a análise de acessos concedidos a contas de parceiros corporativos e consultorias."
            },
            {
                titulo: "Ausência de Rateio e Responsabilização de Correção entre Equipes",
                descricao: "O SOC receber os alertas do Access Analyzer mas não conseguir atribuir a responsabilidade de correção aos times de desenvolvimento proprietários do recurso."
            },
            {
                titulo: "Falta de Uso do Access Analyzer para Validar Alterações em Trocas de Região",
                descricao: "Desativar a análise ao migrar recursos entre regiões AWS, deixando novas subredes ou buckets sem auditoria de acesso."
            },
            {
                titulo: "Ignorar Alertas de Escalação de Privilégios (Privilege Escalation Paths)",
                descricao: "Desconsiderar avisos sobre perfis IAM secundários que permitem que um usuário comum assuma o papel de administrador da conta."
            },
            {
                titulo: "Falta de Integração com Ferramentas de SIEM Externas (Splunk/Datadog)",
                descricao: "Analisar achados isoladamente sem exportar os dados de conformidade para a ferramenta de inteligência de segurança central do banco."
            },
            {
                titulo: "Não Documentar Exceções Regulatória de Acesso Externo",
                descricao: "Conceder acessos externos por motivos de auditoria ou integrações de dados bancários sem registrar justificativas formais vinculadas ao achado do Access Analyzer."
            },
            {
                titulo: "Falta de Treinamento das Equipes de Engenharia sobre Leitura dos Achados",
                descricao: "Desenvolvedores corrigindo alertas do Access Analyzer aplicando exclusões de recursos em vez de redefinir as políticas IAM para o privilégio mínimo."
            }
        ]
    },
    "AWS Transit Gateway": {
        titulo: "Transit Gateway",
        topicos: [
            {
                titulo: "Cobranças Elevadas por Hora de Anexo (TGW Attachment Hours)",
                descricao: "Conectar dezenas de VPCs de microsserviços pequenos diretamente ao Transit Gateway, acumulando taxas fixas por hora por anexo em cada VPC em vez de consolidar subredes."
            },
            {
                titulo: "Transferência Massiva de Dados Processados pelo TGW (Data Processing Charges)",
                descricao: "Rotear terabytes de tráfego pesado de ingestão de logs ou backups entre VPCs através do Transit Gateway, pagando tarifas por GB processado no hub em vez de usar VPC Peering direto para rotas de alto volume."
            },
            {
                titulo: "Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ Traffic via TGW)",
                descricao: "Enviar dados de uma instância na AZ-a para uma VPC destino apontando para o anexo do TGW alocado na AZ-b, gerando cobranças duplicadas de transferência de rede."
            },
            {
                titulo: "Falta de Segmentação por Tabelas de Roteamento (Route Tables)",
                descricao: "Conectar ambientes de desenvolvimento, homologação e produção à mesma tabela de roteamento do TGW sem isolamento estrito, permitindo comunicação indevida entre redes."
            },
            {
                titulo: "Uso de TGW para Tráfego para S3 e DynamoDB em Vez de VPC Gateway Endpoints",
                descricao: "Permitir que o tráfego de dados para os serviços de armazenamento da AWS passe pelo Transit Gateway antes de sair pela internet ou NAT Gateway, gerando custos desnecessários por GB."
            },
            {
                titulo: "Centralização Ineficiente de Saída de Internet (Egress VPC)",
                descricao: "Concentrar todo o tráfego de saída para a internet de dezenas de contas bancárias em uma única VPC de Egress via TGW sem dimensionar a capacidade dos NAT Gateways, gerando gargalos de banda."
            },
            {
                titulo: "Falta de Compartilhamento via AWS RAM (Resource Access Manager)",
                descricao: "Criar e provisionar Transit Gateways independentes em contas AWS separadas da organização em vez de centralizar a gestão na conta de redes e compartilhar os anexos via RAM."
            },
            {
                titulo: "Anexos de TGW \"Órfãos\" de VPCs Excluídas",
                descricao: "Excluir VPCs de testes ou microsserviços desativados mas esquecer de remover o anexo correspondente no Transit Gateway, continuando a pagar a taxa por hora de anexo."
            },
            {
                titulo: "Falta de Uso do Transit Gateway Connect para SD-WAN",
                descricao: "Conectar appliances de rede virtuais (SD-WAN/Firewalls) utilizando múltiplas VPNs IPSec lentas e limitadas em vez de utilizar o anexo otimizado TGW Connect de alta performance."
            },
            {
                titulo: "Duplicação de Roteamento com Direct Connect sem Direct Connect Gateway",
                descricao: "Ligar o Transit Gateway diretamente a múltiplas portas locais de Direct Connect sem usar um Direct Connect Gateway (DXGW), multiplicando complexidades e custos de rotas."
            },
            {
                titulo: "Falta de Monitoramento de Métricas de Estrangulamento (PacketDropCount)",
                descricao: "Não configurar alarmes CloudWatch para perda de pacotes ou estouros de largura de banda nos anexos do Transit Gateway em horários de pico financeiro."
            },
            {
                titulo: "Uso de TGW Inter-Region (Peering de TGW) para Dados de Alta Volumetria",
                descricao: "Conectar Transit Gateways em regiões geográficas diferentes para transferência contínua de grandes volumes de dados analíticos sem avaliar o custo acumulado de transferência inter-região."
            },
            {
                titulo: "Falta de Uso do Network Manager para Visibilidade da Topologia",
                descricao: "Gerenciar redes complexas de centenas de VPCs e filiais bancárias manualmente sem utilizar o AWS Transit Gateway Network Manager para monitorar a saúde dos links."
            },
            {
                titulo: "Inspeção de Tráfego de Rede Ineficiente (Inline Firewalls sem Appliance Mode)",
                descricao: "Rotear pacotes para VPCs de inspeção de segurança com firewalls de terceiros sem ativar o recurso Appliance Mode no TGW, gerando roteamento assimétrico e quedas de conexão."
            },
            {
                titulo: "Limites de Rotas Excedidos nas Tabelas de Roteamento do TGW",
                descricao: "Atingir o limite máximo de rotas estáticas ou dinâmicas (BGP) no TGW devido à falta de sumarização de redes CIDR corporativas."
            },
            {
                titulo: "Falta de Alertas de Custo no AWS Budgets para o Processamento de Dados do TGW",
                descricao: "Não monitorar o crescimento no volume de gigabytes processados pelo Transit Gateway na fatura mensal de infraestrutura."
            },
            {
                titulo: "Configuração de Subredes Inadequadas para os Anexos do TGW (ENIs)",
                descricao: "Alocar os anexos do TGW em subredes pequenas com escassez de IPs disponíveis, impedindo a expansão de recursos dentro da VPC."
            },
            {
                titulo: "Não Utilização do Multicast no TGW quando Exigido por Plataformas Financeiras",
                descricao: "Tentar replicar dados de cotações de mercado via requisições unicast individuais em vez de utilizar o suporte nativo a Multicast do Transit Gateway."
            },
            {
                titulo: "Falta de Auditoria de Alterações nas Tabelas de Roteamento",
                descricao: "Não integrar as modificações de rotas do TGW com o CloudTrail/AWS Config, dificultando o diagnóstico de quedas de rede causadas por erros operacionais."
            },
            {
                titulo: "Ausência de Ambientes de Homologação de Rede (TGW de Testes)",
                descricao: "Testar alterações de rotas globais diretamente no Transit Gateway de produção, correndo o risco de isolar microsserviços críticos de pagamento."
            }
        ]
    },
    "Amazon Macie": {
        titulo: "Macie",
        topicos: [
            {
                titulo: "Varredura Completa e Contínua em Buckets de Logs sem Filtro (Over-scanning)",
                descricao: "Configurar o Macie para escanear petabytes de logs de aplicação brutos ou arquivos temporários que não contêm dados de clientes, gerando custos astronômicos de análise por GB."
            },
            {
                titulo: "Falta de Definição de Escopo nos Trabalhos de Descoberta de Dados (Discovery Jobs)",
                descricao: "Executar varreduras gerais sem aplicar filtros por prefixo, data de modificação ou tamanho de arquivo, analisando novamente dados históricos que nunca mudaram."
            },
            {
                titulo: "Manutenção do Macie Ativado em Contas de Sandbox e Testes sem Dados Reais",
                descricao: "Habilitar a descoberta contínua de dados em contas de desenvolvimento onde só existem dados fictícios (Mock Data), desperdiçando o orçamento de segurança."
            },
            {
                titulo: "Ignorar Achados de Exposição de Dados Sensíveis (PII / CPFs Expôs)",
                descricao: "Notificações do Macie indicando arquivos com cartões de crédito ou documentos de clientes em buckets desprotegidos que não são investigadas nem corrigidas pelas equipes de produto."
            },
            {
                titulo: "Falta de Uso do Recurso de Amostragem de Dados (Sampling Depth)",
                descricao: "Escanear 100% dos objetos de buckets gigantescos em vez de utilizar amostragens estatísticas configuradas para identificar se uma base contém dados sensíveis."
            },
            {
                titulo: "Falta de Integração com o AWS Security Hub e EventBridge",
                descricao: "Analisar achados de dados expostos manualmente no console do Macie sem enviar eventos automáticos para a plataforma de resposta a incidentes de segurança."
            },
            {
                titulo: "Armazenamento de Resultados do Macie sem Criptografia no S3",
                descricao: "Gravar os relatórios de descoberta de dados sensíveis em buckets de destino sem criptografia KMS rigorosa ou com acesso restrito."
            },
            {
                titulo: "Falta de Criação de Identificadores de Dados Customizados (Custom Data Identifiers)",
                descricao: "Confiar apenas nos padrões nativos do Macie e esquecer de cadastrar expressões regulares (Regex) para identificar formatos específicos do banco (ex: número da conta corrente, código de cliente interno)."
            },
            {
                titulo: "Não Utilização da Avaliação Automatizada de Inventário de Buckets (Bucket-level Automated Discovery)",
                descricao: "Pagar por trabalhos de descoberta individuais e complexos em vez de utilizar o recurso gerenciado de avaliação contínua de nível de bucket para mapear riscos de segurança."
            },
            {
                titulo: "Desativação do Macie por Medo de Custos sem Avaliação de Risco",
                descricao: "Desligar totalmente a ferramenta de segurança por falta de controle de gastos, deixando a instituição financeira vulnerável a vazamentos e sanções de privacidade (LGPD)."
            },
            {
                titulo: "Falta de Regras de Supressão para Achados Conhecidos e Justificados",
                descricao: "Permitir que alertas recorrentes de arquivos contendo dados de teste poluam o painel de segurança por falta de regras de arquivamento configuradas."
            },
            {
                titulo: "Escaneamento de Arquivos Compactados Grandes ou Não Suportados",
                descricao: "Enviar arquivos ZIP/TAR de dezenas de gigabytes para varredura do Macie, gerando falhas de processamento e consumindo recursos de cota de análise."
            },
            {
                titulo: "Falta de Governança Multi-Conta (Macie Delegated Administrator)",
                descricao: "Operar o Macie de forma isolada em cada conta AWS em vez de centralizar a administração e os custos na conta do time de segurança da informação."
            },
            {
                titulo: "Não Monitorar a Ingestão Diária de Novos Objetos no S3",
                descricao: "Permitir que novas pipelines de dados despejem terabytes de arquivos sem prever o impacto financeiro na varredura automatizada do Macie."
            },
            {
                titulo: "Falta de Ações de Automação para Remediação (Auto-remediation)",
                descricao: "Não disparar lambdas automatizadas para alterar as permissões de um bucket para privado imediatamente quando o Macie detectar dados sensíveis expostos."
            },
            {
                titulo: "Ignorar Achados de Alteração de Criptografia ou Acesso Público",
                descricao: "Focar apenas na busca de PII e ignorar os alertas nativos do Macie sobre alterações na política de acesso dos buckets do Data Lake."
            },
            {
                titulo: "Escaneamento de Dados Criptografados com Chaves KMS sem Permissão",
                descricao: "Configurar trabalhos do Macie para buckets protegidos por chaves KMS sem conceder as permissões necessárias na política da chave, gerando erros de execução repetidos."
            },
            {
                titulo: "Falta de Alertas de Custo no AWS Budgets para o Consumo do Macie",
                descricao: "Não estabelecer um teto de gastos mensal para o processamento de dados do Macie na conta de segurança."
            },
            {
                titulo: "Não Documentar o Processo de Resposta a Incidentes de Vazamento",
                descricao: "Notificar a equipe de segurança sobre um achado de dados sensíveis mas não possuir um fluxo claro de quem deve excluir ou mascarar o arquivo no S3."
            },
            {
                titulo: "Falta de Revisão Periódica das Regras de Descoberta Automatizada",
                descricao: "Deixar configurações de escaneamento ativas para buckets que já foram migrados ou descontinuados pela engenharia de dados."
            }
        ]
    },
    "AWS Direct Connect Gateway": {
        titulo: "Direct Connect Gateway",
        topicos: [
            {
                titulo: "Uso do DXGW sem Agregação de VPCs por Região (Roteamento Ineficiente)",
                descricao: "Conectar dezenas de VPCs individualmente ao Direct Connect Gateway sem utilizar um Transit Gateway (TGW) intermediário para consolidar as redes da mesma região."
            },
            {
                titulo: "Transferência de Dados Inter-Região Não Planejada via DXGW",
                descricao: "Rotear tráfego pesado do Data Center local no Brasil para VPCs na Virgínia através do DXGW sem prever as tarifas de transferência de dados inter-região (Cross-Region Data Transfer)."
            },
            {
                titulo: "Falta de Configuração de Redundância com Múltiplas Portas DX (Single Point of Failure)",
                descricao: "Conectar o Direct Connect Gateway a apenas uma porta física de Direct Connect, deixando a conectividade de todas as VPCs e regiões dependentes de um único link de rede."
            },
            {
                titulo: "Falta de Filtros de Prefixos BGP (Allowed Prefixes)",
                descricao: "Anunciar redes CIDR amplas ou incorretas do Data Center para a AWS via DXGW, gerando conflitos de roteamento e interrupção de tráfego entre VPCs."
            },
            {
                titulo: "Uso de Interfaces Virtuais Privadas (Private VIFs) Redundantes sem Necessidade",
                descricao: "Criar conexões de VIFs privadas individuais para cada conta corporativa no DXGW em vez de compartilhar uma estrutura centralizada de rede."
            },
            {
                titulo: "Desconsideração dos Limites de Rotas do DXGW (Maximum 200 Routes)",
                descricao: "Exceder o limite máximo de rotas anunciadas da rede local para a AWS via BGP no DXGW, provocando a queda da sessão de roteamento."
            },
            {
                titulo: "Falta de Monitoramento de Estado das Sessões BGP (BGPPeerStatus)",
                descricao: "Não configurar alarmes CloudWatch para notificar a equipe de redes quando uma sessão BGP no Direct Connect Gateway cair ou entrar em degradação."
            },
            {
                titulo: "Uso de Public VIFs no DXGW sem Necessidade de Acesso a Serviços Públicos",
                descricao: "Configurar interfaces públicas no DXGW para aplicações que deveriam trafegar estritamente por redes privadas (Private VIF / Transit VIF)."
            },
            {
                titulo: "Falta de Alinhamento de MTU (Múltiplos Tamanhos de Pacote)",
                descricao: "Misturar configurações de MTU padrão (1500 bytes) e Jumbo Frames (9001 bytes) nas conexões associadas ao DXGW, causando fragmentação de pacotes e lentidão."
            },
            {
                titulo: "Associação do DXGW a Transit Gateways em Regiões Não Suportadas",
                descricao: "Tentar conectar o DXGW a topologias de TGW com configurações de rede incompatíveis ou com latências de roteamento elevadas."
            },
            {
                titulo: "Falta de Rateio de Custos da Porta e Tráfego do DXGW por Conta",
                descricao: "Não utilizar tags de alocação de custos nas associações do DXGW para distribuir as despesas de tráfego de rede entre as unidades de negócio do banco."
            },
            {
                titulo: "Manutenção de Associações de VPCs \"Órfãs\" de Ambientes Encerrados",
                descricao: "Deixar VPCs de projetos finalizados conectadas ao DXGW, poluindo as tabelas de roteamento globais da instituição."
            },
            {
                titulo: "Uso de VPN de Contingência Roteada pelo DXGW sem Testes de Failover",
                descricao: "Manter uma VPN IPsec de backup conectada ao DXGW sem realizar simulações periódicas para validar se o tráfego comuta automaticamente na queda do link principal."
            },
            {
                titulo: "Tráfego de Big Data/Analytics Trafegando sem Controle pelo DXGW",
                descricao: "Permitir que pipelines de dados puxem terabytes de arquivos do Data Center físico para a nuvem via DXGW em horários de pico transacional bancário."
            },
            {
                titulo: "Ausência de Sumarização de Rotas da AWS para o Data Center Local",
                descricao: "Enviar centenas de rotas de subredes de VPCs individuais para a rede interna em vez de sumarizar em blocos de IP contíguos."
            },
            {
                titulo: "Falta de Criptografia MACsec em Conexões Sensíveis do DXGW",
                descricao: "Conectar dados de transações financeiras bancárias sem ativar a criptografia em camada de enlace em portas dedicadas compatíveis."
            },
            {
                titulo: "Desalinhamento de ASN BGP (Autonomous System Number) na Configuração",
                descricao: "Configurar ASNs BGP conflitantes no DXGW e nos roteadores locais, impedindo a estabilização da adjacência de rede."
            },
            {
                titulo: "Uso do DXGW para Tráfego Inter-VPC Direto sem Transit Gateway",
                descricao: "Tentar usar o DXGW como uma ponte para comunicação direta entre duas VPCs (o que não é suportado nativamente sem passar pela rede local ou sem um TGW)."
            },
            {
                titulo: "Falta de Governança na Aprovação de Associações de Contas Externa ao DXGW",
                descricao: "Permitir que contas de desenvolvedores solicitem associação ao DXGW corporativo sem aprovação prévia do time de arquitetura de redes."
            },
            {
                titulo: "Ausência de Documentação da Topologia de Roteamento Global do DXGW",
                descricao: "Não manter um diagrama atualizado das conexões do DXGW com as VPCs e data centers locais, dificultando a resolução de incidentes graves de rede."
            }
        ]
    },
    "AWS Storage Gateway": {
        titulo: "Storage Gateway",
        topicos: [
            {
                titulo: "Uso do File Gateway sem Regras de Ciclo de Vida no S3 (Standard Lifecycle)",
                descricao: "Gravar arquivos locais continuadamente no bucket S3 via File Gateway sem aplicar regras de transição para S3 Glacier ou Intelligent-Tiering, acumulando terabytes de dados caros."
            },
            {
                titulo: "Dimensionamento Inadequado do Cache Local (Local Cache Disk Oversizing/Undersizing)",
                descricao: "Alocar discos SSD locais muito pequenos no Data Center (causando estouro de cache e lentidão) ou excessivamente grandes (gerando custos inúteis de infraestrutura local)."
            },
            {
                titulo: "Manutenção de Volume Gateway no Modo Stored sem Necessidade",
                descricao: "Utilizar o modo Stored Volumes (que mantém 100% dos dados no Data Center local e copia para a AWS) em vez do modo Cached Volumes (que mantém apenas os dados frequentes localmente), desperdiçando discos no Data Center."
            },
            {
                titulo: "Falta de Limpeza do Cache Local do File Gateway após Atualizações",
                descricao: "Não renovar o cache do gateway local quando arquivos no S3 são modificados diretamente por outras aplicações na nuvem, gerando dessincronização de dados."
            },
            {
                titulo: "Uso do Tape Gateway sem Política de Arquivamento de Fitas no Glacier Flexible/Deep Archive",
                descricao: "Criar fitas virtuais de backup que permanecem no status ativo do Tape Gateway em vez de enviá-las para o S3 Glacier Deep Archive (onde a retenção de longo prazo custa frações de centavos)."
            },
            {
                titulo: "Transferência Masiva de Dados pela Internet em Vez do Direct Connect",
                descricao: "Sincronizar arquivos locais pesados com a AWS através da internet pública ou VPNs lentas em vez de direcionar o tráfego do Storage Gateway pelo link dedicado do Direct Connect."
            },
            {
                titulo: "Falta de Monitoramento de Créditos e Métricas de Upload Buffer (UploadBufferFree)",
                descricao: "Ignorar o esgotamento do disco de Upload Buffer local, fazendo o Storage Gateway travar o recebimento de novos arquivos do Data Center."
            },
            {
                titulo: "Appliance Virtual do Storage Gateway (VMware/Hyper-V) com Recursos Subdimensionados",
                descricao: "Alocar menos CPU ou RAM do que o recomendado na máquina virtual do gateway local, provocando lentidão na gravação de arquivos de relatórios."
            },
            {
                titulo: "Falta de Criptografia KMS na Gravação de Arquivos no S3 via Gateway",
                descricao: "Enviar arquivos locais de auditoria bancária para o S3 através do File Gateway sem configurar a criptografia do lado do servidor (SSE-KMS) com chaves gerenciadas."
            },
            {
                titulo: "File Gateways \"Órfãos\" de Projetos de Migração Concluídos",
                descricao: "Encerrar um projeto de migração de dados mas manter a máquina virtual do Storage Gateway ativa e conectada na AWS faturando taxas de serviço."
            },
            {
                titulo: "Falta de Uso de SMB Active Directory Integration para Controle de Acesso",
                descricao: "Configurar compartilhamentos de arquivos SMB no File Gateway sem integrar com o Active Directory corporativo, utilizando permissões genéricas de rede."
            },
            {
                titulo: "Criação de Milhões de Arquivos Minúsculos no File Gateway",
                descricao: "Salvar pequenos arquivos de logs de 1 KB continuadamente via NFS/SMB no gateway, gerando um volume absurdo de chamadas de API PUT no S3 e custos de metadata."
            },
            {
                titulo: "Falta de Ativação do Auto-Notify para Alterações no Bucket S3",
                descricao: "Modificar dados diretamente no bucket S3 e não configurar a notificação automática para o File Gateway, fazendo os usuários locais lerem dados desatualizados."
            },
            {
                titulo: "Uso de Volumes EBS com Discos Legados no Cache do Storage Gateway na Nuvem",
                descricao: "Alocar discos EBS do tipo gp2 nas instâncias EC2 do Storage Gateway na nuvem em vez do formato mais barato e eficiente gp3."
            },
            {
                titulo: "Falta de Testes de Recuperação de Desastres com Tape/Volume Gateway",
                descricao: "Nunca testar a montagem e restauração de volumes ou fitas virtuais de backup em uma conta AWS de homologação em cenários de simulação de sinistro."
            },
            {
                titulo: "Operações de Backup Local sem Janelas de Agendamento de Upload",
                descricao: "Permitir que a sincronização de arquivos pesados com a AWS ocorra durante o horário de maior tráfego transacional da rede local."
            },
            {
                titulo: "Falta de Restrição de Segurança nos Compartilhamentos NFS/SMB (Export Rules)",
                descricao: "Expor exportações NFS do File Gateway para blocos inteiros de IP da rede corporativa (0.0.0.0/0) sem restringir aos servidores autorizados."
            },
            {
                titulo: "Ausência de Alertas no CloudWatch para Status de Conectividade do Gateway (GatewayState)",
                descricao: "Não monitorar a perda de conexão entre a máquina virtual local do Storage Gateway e os endpoints da AWS."
            },
            {
                titulo: "Falta de Governança de Custos no Rateio de Armazenamento por Departamento",
                descricao: "Não etiquetar (tagging) os buckets e volumes conectados aos gateways para distribuir os gastos entre as áreas de TI."
            },
            {
                titulo: "Ausência de Configuração de Bandwidth Rate Limits",
                descricao: "Permitiu que o gateway consuma 100% da largura de banda da rede de saída do Data Center durante uploads massivos de arquivos."
            }
        ]
    },
    "Amazon WorkSpaces": {
        titulo: "WorkSpaces",
        topicos: [
            {
                titulo: "Uso de Modalidade de Cobrança Mensal (AutoStop vs AlwaysOn) Inadequada",
                descricao: "Manter WorkSpaces configurados no modo AlwaysOn (pago por taxa fixa mensal alta) para usuários que acessam o sistema apenas algumas horas por semana em vez do modo AutoStop (pago por hora)."
            },
            {
                titulo: "Manutenção de WorkSpaces no Modo AlwaysOn para Prestadores de Serviço Temporários",
                descricao: "Pagar a assinatura mensal cheia de VDIs para terceiros e consultores que já finalizaram seus projetos e não se conectam há meses."
            },
            {
                titulo: "Superdimensionamento de Hardware dos WorkSpaces (Over-provisioning Bundles)",
                descricao: "Provisionar pacotes de alta performance (como instâncias Power ou Graphics) para funcionários administrativos que utilizam apenas navegador web e planilhas simples."
            },
            {
                titulo: "Falta de Automação para Desativação de WorkSpaces Inativos (Orphaned VDIs)",
                descricao: "Não utilizar ferramentas de automação (como o WorkSpaces Cost Optimizer) para identificar e desligar/excluir áreas de trabalho virtuais não utilizadas há mais de 30 dias."
            },
            {
                titulo: "Armazenamento de Dados de Usuários em Discos Locais sem Backup (User Volumes)",
                descricao: "Permitir que colaboradores salvem arquivos críticos de trabalho no disco local da máquina virtual sem redirecionamento de pastas para o Amazon S3 ou WorkDocs."
            },
            {
                titulo: "Falta de Integração Otimizada com o Active Directory Local (AD Connector)",
                descricao: "Configurar o acesso dos WorkSpaces sem um AWS Directory Service / AD Connector bem dimensionado, gerando falhas e lentidão no login dos funcionários."
            },
            {
                titulo: "Tráfego de Conexão Roteado Ineficientemente sem WorkSpaces Gateway Proxies",
                descricao: "Usuários remotos acessando os WorkSpaces por rotas de rede de alta latência por falta de seleção automática da região AWS mais próxima."
            },
            {
                titulo: "Falta de Uso do Protocolo PCoIP / WSP (Amazon WorkSpaces Streaming Protocol) Otimizado",
                descricao: "Não atualizar a configuração de streaming das máquinas virtuais para o protocolo WSP, que reduz o consumo de banda e melhora a experiência em conexões de internet fracas."
            },
            {
                titulo: "Ausência de Políticas de Grupo (GPO) para Bloqueio de Redirecionamento de Lixeira/Clipboard",
                descricao: "Permitir que usuários copiem dados sensíveis e arquivos bancários da máquina virtual para seus computadores pessoais via área de transferência (Clipboard)."
            },
            {
                titulo: "Imagens Base (Custom Images) Desatualizadas e com Vulnerabilidades de Segurança",
                descricao: "Criar imagens customizadas de WorkSpaces e não aplicar rotinas de atualização de sistema operacional e antivírus antes de provisionar novos usuários."
            },
            {
                titulo: "Falta de Autenticação Multifator (MFA) Exigida no Login do WorkSpaces",
                descricao: "Permitir que funcionários acessem o ambiente corporativo interno utilizando apenas usuário e senha simples, sem validação de token TOTP/RADIUS."
            },
            {
                titulo: "Uso de Volumes de Disco Fixos Excessivamente Grandes (Root/User Volume Sizing)",
                descricao: "Alocar 175 GB ou mais de disco para cada WorkSpace por padrão em vez de iniciar com o mínimo necessário e expandir dinamicamente conforme o uso real."
            },
            {
                titulo: "Falta de Configuração de IP Access Control Groups",
                descricao: "Permitir que colaboradores se conectem aos WorkSpaces a partir de qualquer endereço IP da internet sem restringir a IPs públicos confiáveis ou VPN corporativa."
            },
            {
                titulo: "WorkSpaces Desligados sem Aplicar Patches de Segurança Automatizados",
                descricao: "Configurar o tempo de AutoStop muito curto (ex: 1 hora) sem janelas de manutenção agendadas, impedindo que o System Center / Systems Manager aplique atualizações durante a noite."
            },
            {
                titulo: "Manutenção de Licenças de Software (Microsoft Office / Windows) Duplicadas",
                descricao: "Pagar pelo licenciamento de software incluído no bundle da AWS para usuários que já possuem licenças corporativas elegíveis para uso na nuvem (BYOL)."
            },
            {
                titulo: "Falta de Monitoramento da Métrica UserConnected e Tempo de Sessão",
                descricao: "Não acompanhar dashboards de uso real dos WorkSpaces para tomar decisões de redimensionamento e encerramento de contratos."
            },
            {
                titulo: "Criação Manual de WorkSpaces sem Uso de Automação (Terraform / API)",
                descricao: "Provisionar áreas de trabalho virtuais manualmente no console para cada novo funcionário em vez de automatizar a criação via fluxos de RH e API."
            },
            {
                titulo: "Uso de Instâncias em Zonas de Disponibilidade sem Redundância de Rede",
                descricao: "Alocar o pool de WorkSpaces em uma única subrede/AZ da VPC, deixando todos os funcionários inacessíveis em caso de falha física na zona."
            },
            {
                titulo: "Falta de Criptografia nos Volumes de Disco Root e User (KMS Encryption)",
                descricao: "Provisionar WorkSpaces sem criptografia de disco obrigatória para máquinas que manipulam relatórios financeiros confidenciais."
            },
            {
                titulo: "Falta de Rateio do Custo Individual por Centro de Custo no Faturamento",
                descricao: "Não etiquetar os WorkSpaces com as tags de departamento dos funcionários, impedindo o envio das faturas para as respectivas áreas de negócio."
            }
        ]
    },
    "Amazon VPC": {
        titulo: "VPC",
        topicos: [
            {
                titulo: "Uso de Blocos CIDR de IP Sobrepostos com a Rede On-Premises (IP Overlap)",
                descricao: "Criar VPCs utilizando faixas de IP privadas (ex: 10.0.0.0/16) que já são utilizadas no Data Center físico do banco, impedindo a conexão via Direct Connect ou VPN."
            },
            {
                titulo: "Superdimensionamento de Subredes (Subnet CIDR Over-provisioning)",
                descricao: "Alocar blocos CIDR gigantescos (ex: /18) para subredes de testes ou serviços pequenos, esgotando a faixa de endereçamento IP privado disponível para a empresa."
            },
            {
                titulo: "Falta de Uso de VPC Endpoints (Gateway e Interface) para Serviços AWS",
                descricao: "Fazer todo o tráfego interno para S3, DynamoDB, SQS e Secrets Manager sair pela internet pública ou NAT Gateway em vez de usar VPC Endpoints gratuitos ou locais."
            },
            {
                titulo: "Subredes Públicas Utilizadas para Hospedar Bancos de Dados ou Backend",
                descricao: "Alocar instâncias do RDS, Aurora ou microsserviços internos em subredes com rotas diretas para o Internet Gateway (0.0.0.0/0), expondo os recursos a ataques externos."
            },
            {
                titulo: "Grupos de Segurança (Security Groups) com Regras Permissivas (0.0.0.0/0)",
                descricao: "Configurar regras de entrada (Inbound Rules) nos Security Groups permitindo acesso de qualquer IP da internet para portas de administração (como SSH 22, RDP 3389 ou MySQL 3306)."
            },
            {
                titulo: "Uso de Network ACLs (NACLs) Complexas e Ingerenciáveis em Vez de Security Groups",
                descricao: "Tentar implementar toda a lógica de segurança de rede através de regras estáticas e com estado (Stateful vs Stateless) nas NACLs, gerando bloqueios acidentais e difícil diagnóstico."
            },
            {
                titulo: "Tráfego de Dados Cruzado entre Zonas de Disponibilidade (Cross-AZ Traffic)",
                descricao: "Construir arquiteturas onde instâncias de uma subrede na AZ-a conversam continuadamente com bancos de dados alocados na subrede da AZ-b, acumulando altos custos de transferência inter-AZ."
            },
            {
                titulo: "Falta de Habilitação do VPC Flow Logs para Auditoria de Rede",
                descricao: "Não ativar a gravação de logs de fluxo de rede (VPC Flow Logs) em VPCs de produção, impedindo análises forenses de segurança e identificação de vilões de tráfego."
            },
            {
                titulo: "Gravação de VPC Flow Logs sem Filtro e sem Retenção Curta no CloudWatch",
                descricao: "Ativar o VPC Flow Logs para 100% dos pacotes (aceitos e rejeitados) enviando dados brutos para o CloudWatch Logs sem amostragem ou expiração, gerando faturas altíssimas de log."
            },
            {
                titulo: "Acúmulo de Elastic IPs (EIPs) Desassociados e Ociosos",
                descricao: "Reservar dezenas de endereços IP públicos estáticos e não os conectar a nenhum NAT Gateway ou instância EC2 ativa, pagando cobranças por hora de EIP ocioso."
            },
            {
                titulo: "Alocação de Subredes Pequenas com Escassez de IPs para Clusters EKS/Containers",
                descricao: "Criar subredes com blocos CIDR pequenos (ex: /28 - 16 IPs), impedindo que os nós do Kubernetes (EKS) aloquem novas interfaces de rede (ENIs) para os Pods."
            },
            {
                titulo: "Uso de VPC Peering em Grande Escala sem Transit Gateway (Malha Mesh Ingerenciável)",
                descricao: "Criar conexões ponto a ponto (VPC Peering) entre dezenas de VPCs de forma desordenada em vez de centralizar o roteamento no AWS Transit Gateway."
            },
            {
                titulo: "Falta de Configuração do DNS Resolution / Hostnames na VPC",
                descricao: "Desativar a resolução de DNS interna na VPC, forçando as aplicações a se conectarem via endereços IP estáticos no código em vez de nomes de domínio privados."
            },
            {
                titulo: "Manutenção de VPCs Padrão (Default VPCs) Ativas e Não Utilizadas",
                descricao: "Deixar as VPCs padrão criadas automaticamente pela AWS ativas com subredes públicas em todas as regiões, abrindo brechas para deploys acidentais e desprotegidos."
            },
            {
                titulo: "Uso de Internet Gateways (IGW) em VPCs Estritamente Privadas",
                descricao: "Anexar um Internet Gateway a uma VPC que deveria ser 100% isolada e conectada apenas ao Data Center via Direct Connect."
            },
            {
                titulo: "Falta de Uso do AWS Network Firewall para Inspeção Avançada de Tráfego",
                descricao: "Tentar filtrar tráfego de saída da VPC para a internet usando apenas Security Groups em vez de usar o AWS Network Firewall para inspeção profunda de pacotes (DPI/URL Filtering)."
            },
            {
                titulo: "Desalinhamento de Tabelas de Roteamento (Route Tables) entre Subredes",
                descricao: "Associar subredes privadas a tabelas de roteamento que contêm rotas diretas para o Internet Gateway por erro de automação."
            },
            {
                titulo: "Falta de Monitoramento da Métrica PeeringBytesIngress / Egress",
                descricao: "Não acompanhar o crescimento do volume de tráfego transacionado entre VPCs via VPC Peering ou Transit Gateway."
            },
            {
                titulo: "VPCs Órfãs Criadas por Testes de Engenheiros que Nunca Foram Excluídas",
                descricao: "Acumular dezenas de VPCs de homologação contendo subredes, tabelas de roteamento e endpoints que já não hospedam nenhuma carga de trabalho."
            },
            {
                titulo: "Falta de Automação para Criação de VPCs Padronizadas (Infraestrutura como Código)",
                descricao: "Criar VPCs, subredes e rotas manualmente pelo console AWS em vez de utilizar templates reutilizáveis e auditados de Terraform ou CloudFormation."
            }
        ]
    }
});
