(() => {
    const criarTopicos = linhas => linhas.trim().split('\n').map(linha => {
        const [titulo, descricao] = linha.split('\t');
        return { titulo, descricao };
    });

    window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
        'Amazon SageMaker': {
            titulo: 'SageMaker',
            topicos: criarTopicos(`
Instâncias de Notebooks e Endpoints de Produção Ativos 24/7 sem Uso	Manter instâncias do SageMaker Notebook Instances, Studio Apps ou Endpoints rodando ininterruptamente 24/7 em desenvolvimento e homologação, cobrando pelo poder computacional mesmo quando os cientistas de dados não estão trabalhando.
Superdimensionamento de Instâncias de Treinamento (Training Over-provisioning)	Provisionar instâncias de GPU pesadas, como p4d ou p3.8xlarge de múltiplos nós, para treinar modelos simples de Machine Learning que poderiam rodar em CPU ou GPUs menores como g4dn.
Falta de Uso de Instâncias Spot para Treinamento de Modelos (Managed Spot Training)	Realizar treinamentos longos de redes neurais e modelos de scoring de crédito exclusivamente em On-Demand, ignorando o Managed Spot Training, que reduz o custo de computação do treinamento em até 70%.
Endpoints de Inferência em Tempo Real sem Política de Auto Scaling	Manter capacidade fixa em endpoints de produção sem Application Auto Scaling para reduzir nós nos horários de baixo movimento.
Uso Excessivo de Instâncias em Tempo Real para Inferências em Lote (Batch Transform)	Manter endpoints de inferência ativos 24 horas por dia para processar uma base de score uma vez ao dia em vez de usar Batch Transform, que desliga a computação ao terminar.
Armazenamento Excessivo em Volumes EBS Anexados a Notebooks e Endpoints	Alocar volumes EBS de 500 GB a 1 TB em notebooks ou endpoints por precaução e acumular datasets temporários que nunca são limpos.
Falta de Limpeza de Modelos, Artefatos e Endpoints Órfãos	Acumular versões antigas no Model Registry, artefatos no S3 e endpoints de testes descontinuados que continuam gerando custos.
Uso de Instâncias Desatualizadas ou Ineficientes para Processamento	Manter gerações antigas no SageMaker Processing para pré-processamento e engenharia de features, pagando mais por hora.
Processamento de Dados Pesados no SageMaker em Vez de Glue ou Athena	Usar instâncias SageMaker para transformar petabytes de dados brutos que poderiam ser processados a custo menor no Glue ou Athena.
Falta de Monitoramento de Desvios de Dados (Model Monitor) sem Limite	Coletar métricas frequentes de qualidade e Data Drift sem retenção curta no S3 aumenta custos de armazenamento e processamento.
Pipelines de CI/CD de Machine Learning Rodando Testes Descontrolados	Disparar retreinamentos completos a cada pequeno commit e consumir DPUs e instâncias de GPU sem necessidade.
Falta de Uso de Serverless Inference para Cargas com Baixo Volume	Manter endpoints tradicionais ativos 24/7 para modelos com poucas requisições em vez de pagar por requisição com Serverless Inference.
Duplicação de Ambientes de Trabalho por Cientista de Dados	Permitir que cada cientista mantenha seu próprio ambiente independente e superdimensionado no SageMaker Studio multiplica custos fixos.
Logs de Inferência e Depuração Enviados em Massa para o CloudWatch	Habilitar Data Capture detalhado em produção e enviar payloads brutos ao CloudWatch sem filtragem ou expiração rápida.
Treinamento de Modelos Sem Uso de Bibliotecas Otimizadas	Usar frameworks sem paralelismo de hardware ou bibliotecas aceleradas aumenta o tempo de job e o custo computacional.
Múltiplos Testes e Experimentos Redundantes sem Centralização (SageMaker Experiments)	Reexecutar treinamentos manualmente para ajustar hiperparâmetros em vez de controlar experimentos e usar Automatic Model Tuning.
Jobs de Processamento com Conexões de Rede via NAT Gateway Sem Otimização	Roteiar tráfego massivo de preparação de dados através de NAT Gateways para buckets ou bancos mal posicionados na VPC.
Retenção Prolongada de Imagens Docker Personalizadas no ECR	Acumular versões de imagens Docker de Deep Learning no ECR sem políticas de ciclo de vida para remover versões obsoletas.
Falta de Governança e Alertas de Custo por Projeto de IA	Não definir orçamentos AWS Budgets por equipe de Machine Learning permite que experimentos excedam o orçamento sem aviso.
Uso de Abordagens de Deep Learning Completo para Problemas Lineares	Usar redes neurais pesadas para problemas simples que poderiam ser resolvidos com modelos lineares de baixo custo.
            `)
        },
        'Amazon MSK': {
            titulo: 'MSK',
            topicos: criarTopicos(`
Dimensionamento Excessivo de Brokers Kafka (Broker Over-provisioning)	Provisionar brokers kafka.m5.4xlarge para picos raros mesmo com CPU e memória abaixo de 15% na maior parte do tempo.
Retenção Prolongada de Mensagens em Disco sem Necessidade (Log Retention Period)	Manter log.retention.hours por dias ou semanas nos brokers em vez de arquivar eventos antigos no S3 e reter poucas horas localmente.
Frotas Estáveis Pagando Preço On-Demand sem Contratos Reservados	Operar clusters MSK estáveis em On-Demand por anos sem compromissos ou reservas que reduzem o custo de infraestrutura.
Uso de Armazenamento Provisionado Excessivo nos Brokers (EBS Volume Sizing)	Alocar 2 TB a 5 TB de EBS por broker preventivamente em vez de usar armazenamento elástico ou Tiered Storage.
Falta de Uso do Amazon MSK Tiered Storage para Eventos Frios	Manter históricos em SSD local caro em vez de mover partições antigas para armazenamento em camadas baseado em S3.
Clusters MSK de Homologação e Testes Rodando 24/7 com Multi-AZ	Manter clusters de desenvolvimento, staging e QA com três AZs e múltiplos brokers durante noites e fins de semana sem uso.
Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ Data Transfer)	Produtores e consumidores trocando mensagens com brokers em AZs diferentes geram taxas de transferência inter-AZ.
Subparticionamento Excessivo de Tópicos (Over-partitioning)	Criar milhares de partições sem planejamento aumenta memória, piora a recuperação e força upgrades de brokers.
Desbalanceamento de Carga e Partições Quentes (Hot Partitions)	Chaves com baixa cardinalidade concentram gravações em uma partição e obrigam a dimensionar o cluster inteiro.
Uso do Amazon MSK Provisionado para Cargas Intermitentes em Vez do MSK Serverless	Manter clusters provisionados de múltiplos nós para microsserviços esporádicos em vez de pagar pelo throughput e armazenamento usados.
Produção de Mensagens sem Compressão de Dados	Enviar payloads JSON sem snappy, lz4 ou zstd aumenta armazenamento e tráfego de rede.
Consumidores Lentos Gerando Acúmulo de Dados (Consumer Lag)	Gargalos dos consumidores atrasam a leitura, impedem a rotação de logs e aumentam o uso de disco.
Uso de Instâncias de Gerações Antigas (ex: kafka.m5 em Vez de kafka.m6g)	Manter brokers x86 antigos custa mais por throughput do que famílias Graviton modernas.
Ingestão Massiva de Logs e Eventos de Baixo Valor sem Filtragem	Enviar todos os logs DEBUG sem filtragem aumenta o I/O de disco e o uso de banda.
Duplicação de Clusters MSK por Silos de Engenharia	Manter clusters isolados por equipe quando poderiam compartilhar um cluster governado por tópicos e ACLs duplica custos.
Configuração do Fator de Replicação (Replication Factor) Exagerado	Usar fator 4 ou 5 em tópicos não críticos multiplica armazenamento e tráfego entre brokers.
Monitoramento com CloudWatch Open Monitoring (Prometheus) Ativado sem Restrição	Coletar métricas JMX para centenas de tópicos sem filtrar o essencial aumenta métricas customizadas.
Falta de Uso de Conectores Gerenciados (MSK Connect) para Ingestão Externa	Hospedar EC2 para ler Kafka e gravar em S3 ou DynamoDB em vez de usar MSK Connect gerenciado.
Retenção de Clusters Órfãos de Migrações de Mensageria Legada	Manter clusters de migração de IBM MQ ou RabbitMQ ativos após a conclusão ou abandono dos projetos.
Tráfego de Produção e Consumo Roteado via Internet / Public Subnets	Usar brokers públicos em vez de PrivateLink ou Transit Gateway aumenta a exposição e os custos de saída.
            `)
        },
        'Amazon EMR': {
            titulo: 'EMR',
            topicos: criarTopicos(`
Clusters EMR Permanentes e Ociosos (24/7)	Manter clusters EMR o dia todo para jobs batch que duram apenas duas horas à noite, em vez de usar clusters transitórios.
Uso Exclusivo de Instâncias On-Demand para Nós de Trabalhadores (Core/Task Nodes)	Não usar Spot nos Task Nodes do Spark pode custar até 70% a mais em computação analítica.
Desativação do EMR Managed Scaling	Manter número fixo de instâncias força o cluster a ficar na capacidade máxima durante todo o job.
Falta de Migração para EFS/S3 (EMRFS)	Manter HDFS em EBS pesado em vez de acessar dados no S3 pelo EMRFS aumenta o custo de armazenamento em bloco.
Jobs com Garbage Collection (GC) e OOM no Spark	Scripts mal otimizados que causam falta de memória levam a adicionar nós em vez de corrigir o código.
Uso de Instâncias de Gerações Antigas	Manter x86 antigo em vez de c6g ou r6g perde throughput por custo menor com Graviton.
Clusters Órfãos de Cientistas de Dados	Deixar clusters EMR interativos com notebooks Jupyter ociosos nos fins de semana e feriados.
Falta de Uso do EMR Serverless	Gerenciar clusters completos para cargas pequenas ou sazonais em vez de pagar por segundo com EMR Serverless.
Leitura de Dados Não Particionados no S3	Varrer terabytes brutos em vez de usar partições e formatos colunares Parquet ou ORC.
Volumes EBS Root Excessivamente Grandes	Anexar discos de sistema enormes a todos os nós sem necessidade de espaço local.
Retenção Descontrolada de Spark Event Logs	Acumular terabytes de logs de execução no S3 e CloudWatch sem expiração curta.
Execução de Tráfego Inter-AZ na Ingestão	Ler dados de buckets ou bancos em zonas ou regiões diferentes sem alinhamento de rede gera transferência adicional.
Falta de Ajuste Dinâmico de Alocação de Recursos (spark.dynamicAllocation)	Desativar alocação dinâmica mantém nós ocupados mesmo quando etapas do pipeline estão ociosas.
Duplicação de Clusters por Equipes de Dados	Manter clusters isolados para processar as mesmas bases em crédito, risco e fraude duplica custos.
Uso de Discos EBS gp2 em Vez de gp3 nos Core Nodes	Usar gp2 para dados temporários de shuffle custa mais e oferece menos IOPS que gp3.
Falta de Utilização de EMR Runtime Optimization	Usar EMR 5.x em vez de releases modernos 6.x ou 7.x perde otimizações de execução do Spark.
Ambientes de Teste com Mesma Escala de Produção	Subir centenas de nós de QA apenas para testar sintaxe ou regras de negócio desperdiça recursos.
Falta de Integração com o AWS Glue Data Catalog	Manter metastores Hive em instâncias RDS pagas em vez do Glue Data Catalog gera custos duplicados.
Ausência de Alertas no AWS Budgets para Consumo de EMR	Sem alertas, erros de código podem manter clusters ativos e exceder o orçamento.
Leitura de Arquivos Minúsculos (Small Files Problem)	Processar milhões de arquivos de 1 KB aumenta chamadas GET/PUT e degrada a execução.
            `)
        },
        'Amazon Kinesis': {
            titulo: 'Kinesis',
            topicos: criarTopicos(`
Provisionamento Excessivo de Shards no Kinesis Data Streams	Manter muitos shards fixos para picos sazonais em vez de usar On-Demand ou automatizar divisão e mesclagem.
Uso do Modo Provisionado para Cargas Intermitentes	Manter streams provisionados 24/7 com pouco tráfego quando On-Demand cobraria pelo uso.
Gravando Payloads Descompactados no Stream	Enviar JSON sem Gzip ou Snappy aumenta o número de shards necessários para a largura de banda.
Falta de Agrupamento de Registros na Origem (KPL Aggregation)	Enviar registros de 1 KB em chamadas PutRecord separadas em vez de agrupar eventos aumenta chamadas de API.
Retenção Prolongada de Mensagens no Kinesis Data Streams	Reter mensagens por sete dias ou mais sem necessidade gera custos adicionais por shard e hora.
Kinesis Data Firehose com Buffer Ineficiente	Buffers pequenos geram milhões de objetos S3 e chamadas PUT.
Consumidores sem Enhanced Fan-Out (EFO) Sofrendo Throttling	Múltiplos consumidores no modo tradicional podem forçar a criação de shards duplicados.
Uso Desnecessário do Enhanced Fan-Out (EFO)	Pagar EFO por consumidor e shard quando a latência padrão atende à aplicação.
Processamento de Conversão de Formatos Ineficiente no Firehose	Usar Lambda complexa para conversão quando dados poderiam ser gravados nativamente em Parquet ou ORC.
Falta de Monitoramento de Shards Quentes (Hot Shards)	Chaves de baixa cardinalidade concentram tráfego e levam a aumentar todo o stream.
Duplicação de Streams por Silos de Aplicação	Criar streams diferentes para transportar os mesmos dados em vez de compartilhar um stream.
Streams de QA e Staging Ativos com Múltiplos Shards	Manter shards provisionados em desenvolvimento mesmo sem tráfego de teste.
Uso do Kinesis Data Analytics (Flink) sem Desligamento Automático	Manter KPUs altas para relatórios que poderiam rodar em lote aumenta o custo.
Ingestão Massiva de Logs de Baixa Relevância	Enviar logs de debug e métricas sem filtro desperdiça capacidade do Kinesis.
Chamadas Excessivas de GetRecords por Pollers Mal Configurados	Consumidores consultando repetidamente sem novos dados pagam chamadas de API desnecessárias.
Tráfego de Ingestão via Internet Pública	Enviar dados por internet ou NAT em vez de VPC Endpoints PrivateLink aumenta os custos de rede.
Falta de Regras de Retry com Backoff Exponencial	Consumidores em loop de falha sem backoff e DLQ desperdiçam capacidade.
Leitura de Dados do Firehose sem Criptografia KMS com Bucket Keys	Gravações no S3 sem Bucket Keys geram chamadas KMS pagas por objeto.
Descarte Ineficiente de Erros no Firehose	Sem destino S3 para falhas de transformação, os dados podem ser reprocessados indefinidamente.
Falta de Alertas para a Métrica ReadProvisionedThroughputExceeded	Sem alertas de throughput, equipes duplicam infraestrutura sem identificar o gargalo.
            `)
        }
    });
})();
