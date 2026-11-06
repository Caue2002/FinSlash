const topicosAdicionaisPorServico = {
    'AWS Lambda': {
        titulo: 'Falta de Observabilidade Distribuída com AWS X-Ray',
        descricao: 'Executar arquiteturas complexas com dezenas de lambdas encadeadas sem ativar o rastreamento do X-Ray, tornando quase impossível diagnosticar a causa raiz de latências e falhas em transações financeiras.'
    },
    'Amazon ECS': {
        titulo: 'Estratégias de Deploy sem Capacidade Reserva (Rolling Update Ineficiente)',
        descricao: 'Configurar atualizações de serviços contêinerizados sem considerar o tempo de inicialização dos containers, causando lentidão temporária ou indisponibilidade parcial em picos de transações Pix.'
    },
    'Amazon EKS': {
        titulo: 'Ausência de Pod Disruption Budgets (PDBs) em Pods Críticos',
        descricao: 'Permitir que rotinas de manutenção automática de nós ou atualizações do Kubernetes encerrem múltiplos Pods de pagamento ao mesmo tempo, violando o SLA de alta disponibilidade do banco.'
    },
    'AWS Batch': {
        titulo: 'Falta de Limites de Tempo de Execução (Job Timeouts)',
        descricao: 'Deixar jobs de lote de reconciliação bancária sem timeout máximo configurado, fazendo com que scripts travados por arquivos corrompidos rodem por dias consumindo computação desnecessária.'
    },
    'Amazon Aurora': {
        titulo: 'Falta de Auto Scaling em Réplicas de Leitura',
        descricao: 'Manter uma quantidade fixa de nós de leitura no cluster Aurora, resultando em sobrecarga e travamento durante os picos sazonais de geração de relatórios de fechamento contábil.'
    },
    'Amazon DynamoDB': {
        titulo: 'Falta de Uso do DynamoDB Accelerator (DAX) para Altissima Frequência',
        descricao: 'Realizar chamadas contínuas de leitura direta à tabela NoSQL para validação de regras de antifraude em microssegundos, em vez de implementar uma camada de cache em memória dedicada.'
    },
    'Amazon RDS': {
        titulo: 'Janelas de Manutenção Automática (Maintenance Windows) Mal Agendadas',
        descricao: 'Deixar a AWS aplicar atualizações e patches de sistema operacional em horários comerciais ou de pico de operações bancárias, gerando quedas de conexão inesperadas.'
    },
    'Amazon ElastiCache': {
        titulo: 'Cluster Redis sem Criptografia em Trânsito e Repouso',
        descricao: 'Armazenar tokens de sessão de clientes do Internet Banking e dados de autorização temporária no cache em memória sem ativar a criptografia KMS e TLS exigida por compliance.'
    },
    'Amazon Redshift': {
        titulo: 'Falta de Configuração do Concurrency Scaling',
        descricao: 'Não habilitar a capacidade elástica do Redshift para absorver surtos pontuais de consultas concorrentes disparadas pelas equipes de auditoria, gerando filas de espera gigantescas nos relatórios.'
    },
    'Amazon S3': {
        titulo: 'Falta de Ativação do S3 Object Lock para Arquivos de Compliance',
        descricao: 'Armazenar comprovantes de transações e logs regulatórios exigidos pelo Banco Central sem a proteção WORM (Write Once, Read Many), ficando exposto à exclusão acidental ou maliciosa.'
    },
    'Amazon EBS': {
        titulo: 'Ausência de Automação de Snapshots via Amazon DLM',
        descricao: 'Confiar em procedimentos manuais para gerar backups de discos de bancos de dados legados, resultando em períodos sem pontos de restauração atualizados.'
    },
    'Amazon EFS': {
        titulo: 'Falta de Monitoramento de Estouro de Banda em Gravadores Simultâneos',
        descricao: 'Permitir que dezenas de instâncias gravem logs e arquivos no EFS simultaneamente sem monitorar os limites de throughput, provocando estrangulamento de I/O em toda a infraestrutura.'
    },
    'AWS Glue': {
        titulo: 'Não Utilização dos Bookmarks Nativos em Pipelines Diários',
        descricao: 'Executar jobs de ETL que varrem e reprocessam arquivos históricos no S3 que já haviam sido importados em execuções anteriores, multiplicando os custos de DPUs.'
    },
    'Amazon OpenSearch': {
        titulo: 'Falta de Ajuste nos Circuit Breakers de Memória JVM',
        descricao: 'Permitir que consultas analíticas com agregações profundas consumam toda a memória heap do Java, derrubando o nó principal e paralisando a busca do aplicativo móvel.'
    },
    'Amazon Bedrock': {
        titulo: 'Falta de Implementação de Guardrails de Segurança e Conteúdo',
        descricao: 'Expor o modelo de IA generativa no assistente virtual do banco sem filtros de proteção contra injecções de prompt (Prompt Injection), alucinações sobre tarifas ou vazamento de regras internas.'
    },
    'Amazon SageMaker': {
        titulo: 'Falta de Versionamento de Modelos no SageMaker Model Registry',
        descricao: 'Colocar modelos de scoring de crédito e propensão de vendas em produção sem registrar seus artefatos e métricas, impedindo auditorias de conformidade de IA.'
    },
    'Amazon MSK': {
        titulo: 'Configuração Inadequada da Regra de Unclean Leader Election',
        descricao: 'Permitir que réplicas desatualizadas de tópicos do Kafka assumam a liderança em momentos de falha, correndo o risco de perda ou corrupção de mensagens do fluxo Pix.'
    },
    'Amazon EMR': {
        titulo: 'Uso de Instâncias com Capacidade de Memória Insuficiente no Spark',
        descricao: 'Subir clusters EMR com instâncias focadas apenas em CPU para jobs analíticos pesados, gerando erros constantes de Out-Of-Memory e reexecuções de tarefas.'
    },
    'Amazon Kinesis': {
        titulo: 'Falta de Tratamento de Retenção Estourada em Consumidores Lentos',
        descricao: 'Aplicações leitoras que entram em gargalo e não conseguem acompanhar a taxa de ingestão do Kinesis, fazendo mensagens antigas expirarem e serem apagadas antes do processamento.'
    },
    'AWS Direct Connect': {
        titulo: 'Ignorar Erros de CRC (Interface Errors) na Porta Física',
        descricao: 'Não monitorar o surgimento de pacotes corrompidos no link dedicado de rede com o Data Center, gerando retransmissões silenciosas que degradam o desempenho das APIs financeiras.'
    },
    'Amazon CloudFront': {
        titulo: 'Ausência de Cabeçalhos de Segurança Essenciais na Borda',
        descricao: 'Entregar o aplicativo web e APIs sem injetar cabeçalhos como HSTS, Content-Security-Policy e X-Frame-Options diretamente nos Edge Locations do CloudFront.'
    },
    'AWS WAF': {
        titulo: 'Falta de Validação de Regras no Modo de Contagem (Count Mode)',
        descricao: 'Aplicar novas regras de bloqueio de bots ou fraudes direto no modo Block, gerando falsos positivos e bloqueando clientes legítimos de realizarem pagamentos no Internet Banking.'
    },
    'NAT Gateway': {
        titulo: 'Concentração de Saída de Internet em uma Única Zona de Disponibilidade',
        descricao: 'Rotear todo o tráfego de saída das subredes privadas de diversas AZs através de um único NAT Gateway, criando um ponto único de falha e custos inter-AZ desnecessários.'
    },
    'Amazon API Gateway': {
        titulo: 'Exposição de Pilhas de Exceção Cruas de Backend (Gateway Responses)',
        descricao: 'Deixar de configurar respostas de erro customizadas na borda, retornando mensagens de erro com detalhes de código e infraestrutura interna para os usuários do aplicativo.'
    },
    'Amazon CloudWatch': {
        titulo: 'Ausência de Alarmes Compostos (Composite Alarms)',
        descricao: 'Criar alarmes isolados para cada recurso de infraestrutura, gerando uma enxurrada de notificações redundantes para a equipe de plantão durante um único incidente de rede.'
    },
    'AWS Config': {
        titulo: 'Falta de Integração com AWS Systems Manager para Remediação Automatizada',
        descricao: 'Limitar o AWS Config a apenas apontar recursos fora de conformidade sem disparar rotinas automáticas de correção para reconfigurar os recursos inseguros.'
    },
    'AWS Secrets Manager': {
        titulo: 'Falta de Rotação Automática em Chaves de APIs de Terceiros',
        descricao: 'Manter credenciais estáticas de integração com arranjos de pagamento externos e parceiros sem utilizar rotinas automatizadas de renovação periódica.'
    },
    'AWS CloudTrail': {
        titulo: 'Falta de Replicação de Logs em uma Conta de Auditoria Isolada (Log Archive)',
        descricao: 'Armazenar a trilha de auditoria na própria conta de produção, permitindo que um invasor com acesso administrativo apague seus próprios rastros.'
    },
    'AWS KMS': {
        titulo: 'Falta de Monitoramento de Limites de Taxa por Segundo (KMS Throttling)',
        descricao: 'Não acompanhar a volumetria de requisições de criptografia em horários de pico, provocando falhas em cascata em microsserviços que usam o KMS para validar dados.'
    },
    'AWS Shield': {
        titulo: 'Falta de Ativação do Suporte do DDoS Response Team (DRT)',
        descricao: 'Assinar o Shield Advanced mas não conceder previamente as permissões IAM e canais de acesso para que a equipe de especialistas da AWS intervenha durante um ataque massivo.'
    },
    'AWS Trusted Advisor': {
        titulo: 'Falta de Automação no Envio dos Relatórios de Economia',
        descricao: 'Deixar as recomendações de redução de custos retidas no console da AWS sem enviar resumos executivos semanais para os gestores da área de FinOps.'
    },
    'Amazon SQS': {
        titulo: 'Falta de Monitoramento do Tempo de Permanência na Fila (Oldest Message Age)',
        descricao: 'Avaliar apenas a quantidade de mensagens no SQS e ignorar a idade da mensagem mais antiga, mascarando mensagens travadas no topo da fila.'
    },
    'Amazon SNS': {
        titulo: 'Publicação de Alertas Sensíveis sem Criptografia em Trânsito/Repouso',
        descricao: 'Enviar payloads com dados confidenciais de transações para tópicos SNS sem criptografia KMS ativada nos endpoints de entrega.'
    },
    'Amazon EventBridge': {
        titulo: 'Falta de Padronização e Versionamento dos Schemas de Eventos',
        descricao: 'Alterar o formato JSON dos objetos publicados no barramento corporativo sem atualizar o Schema Registry, provocando a quebra de múltiplos microsserviços consumidores.'
    },
    'AWS DMS': {
        titulo: 'Migração Final (Cutover) sem Validação de Performance Prévia',
        descricao: 'Executar a virada de chave do banco de dados legado para o Aurora na nuvem sem ter testado a replicação sob a carga real de transações do horário de pico bancário.'
    },
    'Amazon Neptune': {
        titulo: 'Consultas de Grafos sem Limite de Profundidade em Ambientes Antifraude',
        descricao: 'Executar varreduras abertas em redes de relacionamentos de suspeitos que percorrem múltiplos níveis de conexões, travando o consumo de memória do banco de grafos.'
    },
    'Amazon DocumentDB': {
        titulo: 'Falta de Índices Compostos em Coleções NoSQL de Alta Consulta',
        descricao: 'Realizar buscas por múltiplos critérios de perfil de usuário em documentos JSON sem criar índices compostos alinhados ao padrão das queries da aplicação.'
    },
    'AWS MemoryDB for Redis': {
        titulo: 'Falta de Dimensionamento de Escrita para o Mecanismo de Translog Durável',
        descricao: 'Desconsiderar o custo computacional do registro de transações persistentes do MemoryDB durante picos de gravação massiva em memória.'
    },
    'Amazon Athena': {
        titulo: 'Falta de Uso de Formatadores Modernos como Apache Iceberg no S3',
        descricao: 'Consultar e atualizar dados no Data Lake utilizando partições tradicionais em vez de tabelas Iceberg, exigindo reescritas completas de arquivos no S3 para pequenas alterações.'
    },
    'Amazon Cognito': {
        titulo: 'Falta de Restrição de Taxa em APIs de Recuperação de Senha',
        descricao: 'Deixar os endpoints do User Pool de "Esqueci minha senha" abertos sem rate-limiting, permitindo ataques de negação de serviço e disparo abusivo de e-mails/SMS.'
    },
    'AWS IAM Access Analyzer': {
        titulo: 'Falta de Automação para Bloqueio de Políticas IAM Inseguras',
        descricao: 'Notificar achados de permissões excessivas ou públicas apenas via e-mail sem utilizar regras do EventBridge para revogar acessos não autorizados em tempo real.'
    },
    'AWS Transit Gateway': {
        titulo: 'Uso de uma Única Tabela de Roteamento para Toda a Organização',
        descricao: 'Conectar VPCs de produção, desenvolvimento e redes parceiras à mesma tabela de rotas do TGW, eliminando a segmentação e o isolamento de tráfego.'
    },
    'Amazon Macie': {
        titulo: 'Falta de Identificadores Customizados (Regex) para Formatos Internos',
        descricao: 'Confiar apenas nas regras padrões do Macie e esquecer de cadastrar padrões para identificar números de cartões proprietários e chaves Pix internas nos buckets.'
    },
    'AWS Direct Connect Gateway': {
        titulo: 'Falta de Sumarização de Rotas BGP Anunciadas para a Nuvem',
        descricao: 'Anunciar centenas de rotas /24 da rede corporativa local para a AWS via DXGW em vez de sumarizar em blocos de IP maiores, estourando a tabela de roteamento.'
    },
    'AWS Storage Gateway': {
        titulo: 'Esgotamento do Disco de Buffer de Upload Local',
        descricao: 'Não monitorar o espaço em disco reservado para buffer de envio no Data Center local, fazendo o gateway pausar o recebimento de arquivos de backup direcionados ao S3.'
    },
    'Amazon WorkSpaces': {
        titulo: 'Falta de Desativação Automática de Sessões Inativas',
        descricao: 'Deixar áreas de trabalho virtuais conectadas por dias sem interação do usuário, mantendo instâncias ligadas e consumindo licenças e recursos de rede sem necessidade.'
    },
    'Amazon VPC': {
        titulo: 'Manutenção de Rotas Estáticas Incorretas para o Internet Gateway',
        descricao: 'Manter subredes que deveriam ser estritamente privadas conectadas a tabelas de roteamento com saída direta (0.0.0.0/0) para o IGW por erros de automação.'
    }
};

Object.entries(topicosAdicionaisPorServico).forEach(([nomeServico, topico]) => {
    const servico = window.finSlashTopicos[nomeServico];
    if (!servico || !Array.isArray(servico.topicos)) {
        throw new Error(`Nao foi possivel adicionar o topico para ${nomeServico}.`);
    }
    servico.topicos.push(topico);
});
