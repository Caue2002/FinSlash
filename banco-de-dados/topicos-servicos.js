window.finSlashTopicos = {
    'Amazon EKS': {
        titulo: 'EKS',
        topicos: `
Superdimensionamento de Nós do Cluster (Node Over-provisioning)	Provisionar nós EC2 grandes para o cluster mesmo quando o consumo real de CPU e memória dos pods é inferior a 15%.
Falta de Configuração de Horizontal Pod Autoscaler (HPA) e Cluster Autoscaler	Manter uma frota fixa de nós para suportar picos eventuais, pagando por nós ociosos durante o restante do dia.
Ausência de Definições de Requests e Limits nos Pods	Implantar pods sem limites de CPU e memória impede o scheduler de otimizar a densidade por nó e desperdiça capacidade.
Uso Exclusivo de Instâncias On-Demand nos Nós do EKS	Usar apenas instâncias On-Demand nos grupos de nós e ignorar instâncias Spot para cargas tolerantes a falhas.
Cargas de Homologação e Testes Rodando 24/7	Manter clusters de desenvolvimento, staging e homologação ligados durante noites e fins de semana sem uso.
Tráfego de Rede Excessivo Entre Pods de Zonas Diferentes (Cross-AZ)	Pods em zonas distintas trocam dados intensamente sem respeitar a topologia, gerando custos de transferência inter-AZ.
Sobrecarga e Acúmulo de Logs no Fluentbit / CloudWatch	Enviar eventos DEBUG de centenas de microsserviços ao CloudWatch sem filtragem aumenta os custos de ingestão.
Provisionamento Ineficiente de Volumes Persistentes (EBS PVCs)	Criar volumes maiores que o necessário e manter discos órfãos após remover aplicações do cluster.
Ociosidade em Load Balancers (AWS Load Balancer Controller)	Criar ALB/NLB dedicados para pequenos serviços em vez de compartilhar balanceadores com rotas direcionadas.
Versões Desatualizadas do Kubernetes com Custos de Suporte Estendidos	Manter versões EKS fora do suporte padrão pode gerar taxas adicionais de suporte estendido da control plane.
Falta de Otimização da Control Plane com EKS Auto Mode ou Fargate	Executar cargas leves em nós EC2 gerenciados manualmente em vez de usar opções serverless ou modos otimizados.
Acúmulo de Imagens de Contêineres Órfãs nos Nós	Manter imagens Docker antigas em cache local por falta de políticas de limpeza do kubelet.
Uso de Tipos de Instâncias Incompatíveis com a Arquitetura da Aplicação	Usar nós x86 para cargas que poderiam rodar em instâncias AWS Graviton baseadas em ARM.
Escalonamento Incorreto de DaemonSets	DaemonSets pesados em muitos nós pequenos consomem recursos que deveriam atender às aplicações de negócio.
Falta de Uso de Spot Instances para Workers de Processamento em Lote	Rodar processamento financeiro noturno em nós fixos em vez de usar Node Groups Spot dedicados.
Excesso de Monitoramento com Container Insights Sem Filtros	Coletar métricas detalhadas de milhares de pods efêmeros aumenta a cobrança por métricas customizadas.
Falta de Governança em Namespaces de Desenvolvedores	Manter pods de teste criados por equipes em namespaces após o fim das validações.
Configuração Excessiva de Réplicas por Falta de Teste de Carga	Manter réplicas fixas em aplicações de baixa criticidade mesmo fora dos horários de pico.
Duplicação de Componentes de Rede e Service Mesh Pesados	Usar service mesh com alto consumo em microsserviços simples que não precisam dessa complexidade.
Tráfego de Saída Excessivo via NAT Gateway a partir dos Pods	Microsserviços em sub-redes privadas consultam APIs externas sem endpoints VPC locais, elevando o custo do NAT.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'AWS Batch': {
        titulo: 'Batch',
        topicos: `
Uso Exclusivo de Instâncias On-Demand em Filas de Lote (Batch Queues)	Processar faturas e fechamentos apenas em instâncias EC2 On-Demand, ignorando instâncias Spot.
Falta de Uso de Instâncias Spot com Estratégia de Diversificação	Usar um único tipo de instância Spot pode interromper trabalhos longos e exigir reinício, consumindo computação adicional.
Alocação de Instâncias Gigantes para Trabalhos Leves	Usar instâncias grandes para muitos scripts pequenos que poderiam rodar em máquinas menores ou AWS Lambda.
Falta de Configuração de Limites de Tempo (Timeouts) em Jobs	Jobs travados sem limite de tempo ficam ativos indefinidamente e acumulam custos.
Configuração Inadequada de MinvCpus em Ambientes de Computação	Manter muitas CPUs mínimas ativas mesmo quando as janelas de processamento ocorrem apenas à noite.
Armazenamento EBS Excessivo em Cada Instância do Compute Environment	Anexar discos grandes para arquivos temporários que são apagados ao terminar o processamento.
Envio Excessivo de Logs de Baixo Nível para o CloudWatch	Gerar gigabytes de logs por job aumenta ingestão e armazenamento no CloudWatch.
Falta de Separação de Filas por Prioridade e Tamanho de Carga	Misturar trabalhos críticos e testes leves na mesma fila causa contenção e desperdício de escala.
Falta de Tratamento de Retentativas (Retries) Inteligentes	Repetir falhas sem backoff sobrecarrega APIs e cria instâncias desnecessárias.
Uso de Contêineres Pesados com Imagens Não Otimizadas	Baixar imagens Docker enormes em cada nó desperdiça tempo de rede e largura de banda.
Manutenção de Instâncias Ociosas Após o Término dos Jobs	Deixar instâncias ligadas por muito tempo sem jobs na fila antes do encerramento.
Execução de Tarefas Únicas (Cronjobs Simples) via AWS Batch	Usar Batch para scripts curtos que poderiam rodar mais barato via EventBridge e Lambda.
Falta de Monitoramento do Uso Real de Recursos por Job (vCPU/Memory)	Reservar 4 GB de memória quando o script usa apenas 300 MB impede o agendamento eficiente de jobs.
Duplicação de Processamento por Falta de Idempotência	Reiniciar jobs do início após falhas sem verificar o que já foi processado duplica consultas e transações.
Tráfego Cruzado Entre Zonas de Disponibilidade nos Trabalhos	Jobs consultam bancos em outra AZ e geram custos de transferência inter-AZ em grandes volumes.
Falta de Uso de Armazenamento Compartilhado Adequado (Amazon EFS vs EBS)	Copiar dados do S3 para cada container em toda execução desperdiça tráfego e armazenamento temporário.
Uso de Arquitetura x86 Antiga em vez de Graviton para Processamento Massivo	Usar processadores Intel antigos perde a oportunidade de reduzir custos com AWS Graviton.
Falta de Limites de Concorrência por Definição de Job (Job Definition)	Permitir milhares de jobs simultâneos pode inundar o cluster e elevar os custos rapidamente.
Ambientes de Batch de Homologação Ativos sem Governança	Manter ambientes de teste com capacidade ativa ou prontos para simulações nunca executadas consome orçamento.
Falta de Integração com S3 Event Notifications para Disparo de Lotes	Fazer polling periódico em buckets em vez de iniciar jobs quando eventos S3 ocorrem desperdiça recursos.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon Aurora': {
        titulo: 'Aurora',
        topicos: `
Instâncias Aurora Serverless v2 dimensionadas com ACUs Mínimas Elevadas	Manter ACUs mínimas altas 24 horas por dia cobra capacidade mesmo em períodos de baixa atividade.
Uso Exclusivo de Instâncias Provisionadas Aurora Server vCPU Fixo 24/7	Manter instâncias provisionadas no pico de capacidade sem auto scaling ou redução fora dos horários de pico.
Falta de Configuração de Leitura em Réplicas (Aurora Replicas) Desnecessárias	Manter várias réplicas de leitura pesadas para consultas esporádicas ou cargas atendidas por uma réplica menor.
Ausência de Otimização em Consultas Pesadas (Falta de Índices Adequados)	Full Table Scans em tabelas grandes elevam CPU e IOPS e provocam upgrades desnecessários.
Custos Elevados de E/S (Aurora I/O-Optimized vs Standard)	Pagar por cada operação de E/S em bases de alta transacionalidade quando o modelo I/O-Optimized poderia reduzir custos.
Ambientes de Staging, Homologation e QA Ativos 24/7 com Instâncias de Produção	Manter ambientes de teste com topologia e instâncias grandes de produção ligados continuamente.
Armazenamento Fantasma e Acúmulo de Dados Históricos Sem Política de Arquivamento	Manter anos de logs e dados temporários no Aurora sem arquivamento no S3 ou políticas de retenção.
Falta de Aproveitamento de Reserved Instances (RI) para Aurora	Pagar On-Demand por instâncias provisionadas estáveis durante anos sem usar Reserved Instances.
Conexões de Banco de Dados Não Pooladas (Connection Spikes)	Abrir milhares de conexões novas por transação pode exigir instâncias maiores e dispensar o RDS Proxy.
Uso Desnecessário de Multi-Region (Aurora Global Database) em Ambientes Secundários	Replicar globalmente ambientes que não precisam de redundância cross-region duplica custos.
Snapshots de Banco de Dados Sem Política de Retenção (Automated & Manual Snapshots)	Acumular snapshots manuais e retenção longa de backups em ambientes de homologação.
Tráfego de Rede Cruzado entre Zonas de Disponibilidade (Cross-AZ I/O)	Conectar aplicações em outra AZ à instância primária gera custos de transferência e latência.
Uso de Famílias de Instâncias Antigas (Ex: Gerações db.r4 ou db.r5)	Manter hardware antigo custa mais por desempenho inferior às famílias Graviton e atuais.
Falta de Monitoramento de Performance via Performance Insights Desajustado	Reter métricas avançadas além do necessário ou configurar consultas que aumentam overhead do banco.
Consultas SELECT * e Carregamento de Payloads Gigantes na Memória	Carregar tabelas inteiras na aplicação eleva RAM e força upgrades de instância.
Duplicação de Bancos de Dados por Falta de Isolamento por Schema	Criar clusters separados para serviços pequenos multiplica custos fixos que schemas isolados poderiam evitar.
Uso de Aurora PostgreSQL/MySQL com Configurações de Log Excessivas	Enviar cada comando SQL e logs detalhados ao CloudWatch eleva custos de armazenamento.
Falta de Uso de Reader Endpoints para Consultas Analíticas	Executar relatórios pesados no Writer aumenta a CPU e exige instâncias maiores.
Migrações de Dados Incompletas com Recursos Órfãos Ativos	Manter clusters temporários de migração ativos após concluir a troca do sistema.
Ausência de Limites de Alocação de Memória (Buffer Pool Size)	Parâmetros de memória desalinhados deixam o banco ineficiente e exigem computação extra.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    }
};
