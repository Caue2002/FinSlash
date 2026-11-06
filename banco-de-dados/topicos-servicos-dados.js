window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
    'Amazon DynamoDB': {
        titulo: 'DynamoDB',
        topicos: `
Dimensionamento de Capacidade Provisionada sem Auto Scaling (Provisioned Throughput)	Manter RCUs e WCUs dimensionadas para picos durante todo o dia, mesmo na baixa demanda.
Uso Incorreto de Modo On-Demand em Tabelas com Tráfego Alto e Previsível	Usar On-Demand em tabelas estáveis pode custar mais que capacidade provisionada otimizada.
Falta de Uso do DynamoDB Standard-Infrequent Access (Standard-IA)	Manter históricos e logs raramente acessados na classe Standard em vez de Standard-IA.
Hot Partitions por Escolha Ruim de Chave de Partição (Partition Key)	Chaves com baixa cardinalidade concentram tráfego e levam a provisionar a tabela inteira em excesso.
Projeção Excessiva de Atributos em Índices Secundários Globais (GSIs)	Projetar todos os atributos duplica gravações e WCUs mesmo para campos nunca consultados.
Leitura Consistente Forte (Strongly Consistent Reads) sem Necessidade	Leituras fortes consomem o dobro de RCUs quando leituras eventualmente consistentes bastariam.
Consultas com Scan em Vez de Query em Tabelas Grandes	Scan lê a tabela inteira mesmo quando a aplicação precisa apenas de registros filtrados.
Falta de Filtros Pré-Invocação em DynamoDB Streams com AWS Lambda	Invocar Lambda para cada evento sem filtrar na origem cobra execuções irrelevantes.
Ausência de Política de Time To Live (TTL) para Limpeza Automática de Dados	Manter tokens, cotações e sessões expirados aumenta o armazenamento sem necessidade.
Tamanho Excessivo dos Itens (Item Size Overhead)	Guardar payloads grandes em um item eleva RCUs e WCUs cobradas por blocos de dados.
Escrita Individual em Lote em Vez de Operações Batch (BatchWriteItem)	Fazer PutItem separado em vez de operações em lote aumenta latência e chamadas.
Global Tables Multi-Região Ativas sem Necessidade Regulatória	Replicar tabelas de teste ou serviços sem exigência global duplica custos.
Snapshots e Point-In-Time Recovery (PITR) Mantidos em Ambientes de Testes	Manter backups contínuos e retenção longa para dados de teste recriáveis gera custos.
Filtros na Aplicação (Filter Expressions) Consumindo RCUs em Excesso	FilterExpression descarta resultados após a leitura e não reduz as RCUs consumidas.
Gravações Transacionais (TransactWriteItems) sem Necessidade	Usar transações onde não é necessária garantia ACID pode dobrar o consumo de WCUs.
Índices Secundários Globais (GSIs) Órfãos ou Sem Uso	Índices esquecidos continuam consumindo WCUs a cada gravação na tabela.
Leitura Ineficiente de Histórico sem Paging (Limit)	Carregar extratos inteiros em vez de paginar lê itens que o usuário ainda não visualizou.
Replicação manual de Cache no DynamoDB em Vez de usar DAX	Repetir leituras frequentes aumenta RCUs quando uma camada de cache DAX poderia atendê-las.
Armazenamento de Binários/Arquivos Grandes no Item do DynamoDB	Guardar comprovantes e PDFs no item em vez de usar S3 aumenta armazenamento e consumo.
Falta de Restrição em Testes de Carga Automatizados (Stress Test)	Testes On-Demand sem limites podem escalar milhares de requisições e inflar a conta.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon RDS': {
        titulo: 'RDS',
        topicos: `
Instâncias de Banco de Dados Superdimensionadas (Over-provisioning)	Manter grandes instâncias para picos raros apesar do uso médio de CPU abaixo de 10%.
Ambientes de Desenvolvimento e Homologação Rodando 24/7	Manter bancos de teste ligados à noite e nos fins de semana sem automação Stop/Start.
Frotas Estáveis Pagando Preço On-Demand sem Instâncias Reservadas	Pagar On-Demand por bancos estáveis durante anos sem descontos de Reserved Instances.
Provisionamento Excessivo de IOPS alocado (io1/io2)	Usar IOPS provisionados máximos em bancos que poderiam usar gp3 ajustado.
Manutenção de Discos no Padrão Antigo gp2 em Vez do gp3	Manter gp2 em vez de migrar para gp3, mais barato e com performance configurável.
Replicação Multi-AZ Ativada em Ambientes Não Críticos	Duplicar bancos de teste e sistemas secundários que não precisam de failover automático.
Snapshots Manuais de Banco de Dados Acumulados (Orphaned Snapshots)	Acumular snapshots manuais sem política de expiração ocupa armazenamento por anos.
Prazos de Retenção de Backups Automáticos Exagerados em Ambientes de Teste	Reter backups de dev e homologação pelo máximo de 35 dias sem necessidade.
Falta de Uso do RDS Proxy para Conexões de Microsserviços e Lambda	Conexões diretas em excesso pressionam memória e levam a upgrades de instância.
Uso de Famílias de Instâncias Antigas (ex: db.m4 ou db.r4)	Manter hardware legado custa mais que gerações modernas baseadas em Graviton.
Instâncias Órfãs Criadas para Projetos Descontinuados	Deixar bancos de migrações e projetos abandonados ativos e faturando.
Escrita e Leitura Não Separadas (Falta de Read Replicas)	Relatórios pesados na instância de gravação exigem um servidor maior.
Crescimento Descontrolado do Disco por Falta de Storage Auto-Scaling Limite	Ativar expansão sem limite máximo permite que logs e tabelas temporárias inflem o disco.
Armazenamento de Histórico e Logs Antigos sem Purge ou Arquivamento	Manter históricos antigos no RDS em vez de descarregá-los no S3 aumenta o armazenamento.
Consultas Analíticas Ineficientes sem Índices Adequados	Consultas sem índices elevam leituras e IOPS e mascaram problemas de código como falta de hardware.
Instâncias de Réplica de Leitura (Read Replicas) Superdimensionadas	Usar réplicas tão grandes quanto a primária para atender relatórios pontuais.
Logs de Ingestão de Auditoria e Queries Lentas Enviados sem Filtro	Exportar logs brutos ao CloudWatch sem retenção curta eleva custos.
Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ Data Transfer)	Conectar clientes e bancos em zonas diferentes gera cobrança contínua por GB.
Retenção Prolongada de Bancos Convertidos de Migração (DMS)	Manter instâncias antigas ativas após concluir a migração de dados.
Configurações de Parâmetros de Memória (Buffer Pool) Desajustadas	Parâmetros padrão desalinhados desperdiçam recursos e exigem mais CPU ou IOPS.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon ElastiCache': {
        titulo: 'ElastiCache',
        topicos: `
Instâncias de ElastiCache Superdimensionadas (Over-provisioning)	Manter nós grandes apesar de utilizar menos de 15% da memória na maior parte do tempo.
Uso Exclusivo de Preço On-Demand sem Reserved Nodes	Pagar On-Demand continuamente em clusters estáveis sem descontos de nós reservados.
Falta de Configuração de Política de Expiração de Chaves (Eviction Policy)	Chaves sem TTL acumulam até lotar a memória e forçar upgrades de nós.
Ambientes de Homologação e Testes (Staging) Rodando 24/7	Manter clusters multi-nó de desenvolvimento ligados durante noites e fins de semana.
Configuração Inadequada de Multi-AZ com Replica Groups Desnecessários	Manter réplicas e failover em caches secundários que poderiam ser recriados.
Armazenamento de Payloads Gigantes e Desestruturados no Cache	Guardar objetos de dezenas de megabytes em Redis consome RAM de forma ineficiente.
Uso de Instâncias de Gerações Antigas (Ex: Famílias cache.m4 ou cache.r4)	Manter hardware antigo em vez de gerações modernas baseadas em Graviton.
Conexões de Clientes Não Reutilizadas (Connection Storms)	Abrir conexão TCP nova a cada requisição esgota limites e exige instâncias maiores.
Tráfego de Rede Cruzado entre Zonas de Disponibilidade (Cross-AZ)	Conectar clientes e nós em zonas diferentes gera latência e custos de transferência.
Uso do Motor Memcached sem Necessidade de Arquitetura Específica	Usar Memcached em casos que exigem persistência, estruturas avançadas ou pub/sub.
Clusters de ElastiCache Órfãos de Migrações Antigas	Manter clusters de migração ou versões descontinuadas ativos e esquecidos.
Falta de Uso de Cluster Mode em Volumes Massivos de Dados	Concentrar grandes conjuntos de dados em um único nó em vez de distribuí-los em shards.
Snapshots e Backups Automáticos Exagerados em Ambientes de Teste	Reter snapshots diários longos de clusters de QA ocupa espaço e gera overhead.
Ausência de Monitoramento de Uso de Memória via CloudWatch	Sem alertas de memória livre e swap, gargalos levam a upgrades para mascarar o problema.
Duplicação de Chaves e Caching Redundante entre Microsserviços	Guardar a mesma informação em chaves ou clusters diferentes multiplica memória usada.
Monitoramento com Métricas Avançadas Excessivas e Sem Limite	Coletar métricas e Slow Log sem limpeza gera logs excessivos e afeta o cache.
Falta de Política de Auto Scaling de ElastiCache Redis	Não escalar réplicas para acompanhar picos sazonais de acesso.
Uso de Redis para Armazenamento de Dados de Longo Prazo	Usar cache como banco principal exige infraestrutura e persistência desnecessárias.
Fragmentação de Memória Elevada sem Planejamento de Reinicialização	Fragmentação alta desperdiça RAM que o sistema não consegue reutilizar.
Tráfego de Dados Não Criptografados ou Sem Restrição de Rede (Security Groups)	Clusters sem isolamento e Security Groups rigorosos ficam expostos a tráfego indevido.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon Redshift': {
        titulo: 'Redshift',
        topicos: `
Dimensionamento Excessivo de Nós (Node Over-provisioning)	Manter nós grandes para picos mensais embora CPU e armazenamento sejam pouco utilizados no restante do mês.
Clusters de Produção e Homologação Rodando 24/7 Sem Pausa	Manter clusters de dev e QA ligados sem usar Pause/Resume.
Uso Ineficiente do Redshift Serverless com Base de RPUs Elevada	Manter RPUs mínimas altas mesmo quando nenhuma consulta analítica executa.
Falta de Otimização de Chaves de Distribuição e Ordenação (DistKey e SortKey)	Chaves inadequadas provocam varreduras completas e exigem nós maiores.
Inserções de Dados Linha por Linha em Vez de Carga em Lote (COPY Command)	Usar INSERT unitário em vez de carregar arquivos compactados do S3 com COPY.
Acúmulo de Dados Históricos Antigos Diretamente no Armazenamento do Redshift	Manter dados frios em SSD em vez de arquivá-los no S3 e consultá-los via Spectrum.
Falta de Adesão a Contratos de Longo Prazo (Reserved Nodes)	Pagar On-Demand por clusters produtivos estáveis sem descontos de nós reservados.
Ausência de Uso de Visualizações Materializadas (Materialized Views)	Recalcular agregações pesadas de relatórios em toda consulta em vez de pré-calculá-las.
Concorrência Descontrolada e Falta de Gerenciamento de Carga (WLM)	Consultas simultâneas sem regras de WLM geram filas elásticas e custos desnecessários.
Tabelas Sem Manutenção de Limpeza de Registros Deletados (Falta de VACUUM)	UPDATE e DELETE sem rotinas VACUUM e ANALYZE fragmentam e desperdiçam disco.
Uso Incorreto de Tipos de Dados Inflados (VARCHAR(MAX))	Colunas maiores que os dados reais aumentam armazenamento e I/O.
Redshift Spectrum Varrendo Terabytes de Dados no S3 sem Particionamento	Arquivos sem partição ou compressão geram varreduras e cobranças por terabytes.
Duplicação de Clusters Redshift por Silos Departamentais (Data Silos)	Manter clusters separados por equipe em vez de centralizar e usar Data Sharing.
Snapshots Automáticos e Manuais Acumulados sem Política de Retenção	Acumular cópias redundantes de dados sem prazo de expiração.
Ferramentas de BI e Conexões Mantidas Abertas Ociosamente	Manter sessões de ferramentas de análise abertas 24 horas sem atividade.
Tráfego de Rede Cruzado (Cross-AZ) na Ingestão de Dados	Fontes e clusters em zonas ou regiões diferentes geram custos contínuos de transferência.
Exportação Excessiva de Logs de Auditoria para o CloudWatch sem Retenção	Armazenar logs detalhados sem prazo de expiração aumenta a fatura.
Tabelas e Esquemas Órfãos de Cientistas de Dados	Manter estruturas de testes e PoCs abandonadas ocupa espaço e processamento.
Ausência de Codificação de Colunas (ENCODE / Auto Compression)	Sem compressão, o armazenamento cresce e as leituras ficam mais lentas.
Ambientes de Teste Espelhando a Topologia de Produção Completa	Manter homologação com a mesma quantidade de nós caros que produção sem necessidade.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    }
});
