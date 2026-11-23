// Novos cenarios de custo por servico AWS (lote 4: dados e analytics).
module.exports = [
    {
        service: 'amazon-kinesis',
        cenarios: [
            {
                slug: 'kinesis-streams-com-shards-excesso-sem-trafego',
                titulo: 'Kinesis Streams com Shards em Excesso sem Tráfego',
                resumo: 'Avalie se streams estão provisionados com mais shards que o necessário para o volume atual de dados.',
                checks: [
                    ['Meça IncomingRecords por shard', 'Use as métricas do Kinesis para comparar a taxa de escrita com a capacidade de cada shard.'],
                    ['Identifique streams ociosos', 'Liste streams com IncomingBytes próximo de zero ou sem consumidores ativos.']
                ],
                action: ['Reduza o número de shards', 'Use UpdateShardCount para reduzir shards em streams subutilizados ou delete streams sem uso.'],
                caution: ['Reduzir shards pode causar throttling', 'Se o tráfego crescer, shards insuficientes causam throttling; mantenha margem para picos.'],
                fontes: ['Kinesis scaling', 'Kinesis pricing']
            },
            {
                slug: 'kinesis-firehose-sem-transformacao-otimizada',
                titulo: 'Kinesis Firehose sem Transformação Otimizada',
                resumo: 'Verifique se Firehose está configurado sem compressão ou com Lambda desnecessária, aumentando custo de processamento e storage.',
                checks: [
                    ['Audite configurações de transformação', 'Liste delivery streams e verifique se usam compressão, Lambda e buffering adequados.'],
                    ['Meça o custo por GB processado', 'Compare o custo de processamento com o volume de dados entregue ao destino.']
                ],
                action: ['Otimize compressão e buffering', 'Habilite compressão GZIP ou Snappy, ajuste o buffer interval e remova transformações Lambda desnecessárias.'],
                caution: ['Compressão pode afetar compatibilidade', 'Destinos como Elasticsearch podem não suportar certos formatos; valide antes de alterar.'],
                fontes: ['Firehose settings', 'Kinesis pricing']
            },
            {
                slug: 'kinesis-data-streams-retention-acima-do-necessario',
                titulo: 'Kinesis Data Streams com Retenção Acima do Necessário',
                resumo: 'Avalie se streams estão configurados com retenção de 168 horas quando o caso de uso requer menos.',
                checks: [
                    ['Liste períodos de retenção', 'Identifique streams por retention period e compare com o tempo máximo de reprocessamento necessário.'],
                    ['Meça o custo de armazenamento', 'Estime o custo de dados retidos por stream e se a retenção longa é justificada.']
                ],
                action: ['Reduza a retenção', 'Ajuste o retention period para o mínimo necessário, mantendo margem para reprocessamento e DR.'],
                caution: ['Retenção longa pode ser exigida', 'Compliance ou auditoria pode exigir retenção estendida; confirme antes de reduzir.'],
                fontes: ['Kinesis retention', 'Kinesis pricing']
            }
        ]
    },
    {
        service: 'amazon-macie',
        cenarios: [
            {
                slug: 'macie-classificacao-de-buckets-sem-dados-sensiveis',
                titulo: 'Macie Classificando Buckets sem Dados Sensíveis',
                resumo: 'Avalie se buckets estão sendo classificados pelo Macie sem conter dados que justifiquem o custo de análise de conteúdo.',
                checks: [
                    ['Identifique buckets classificados', 'Liste buckets com Macie habilitado e verifique se contêm PII ou dados sensíveis.'],
                    ['Meça o volume processado', 'Compare o GB processado pelo Macie com o valor dos dados protegidos.']
                ],
                action: ['Desative Macie para buckets irrelevantes', 'Para buckets sem dados sensíveis, desative a classificação ou use discovery jobs seletivos.'],
                caution: ['Macie pode ser exigido por compliance', 'Regulamentações como LGPD podem exigir classificação contínua; valide requisitos antes de desativar.'],
                fontes: ['Macie buckets', 'Macie pricing']
            },
            {
                slug: 'macie-custom-data-identifiers-sem-uso',
                titulo: 'Macie Custom Data Identifiers sem Uso',
                resumo: 'Verifique se identificadores personalizados estão sendo usados para classificar dados que não existem mais nos buckets.',
                checks: [
                    ['Liste identificadores customizados', 'Identifique custom data identifiers criados e seu uso em jobs de classificação.'],
                    ['Avalie a relevância', 'Confirme se os padrões definidos ainda correspondem a dados reais nos buckets monitorados.']
                ],
                action: ['Remova identificadores obsoletos', 'Delete custom identifiers que não correspondem mais a dados reais e simplifique os jobs de classificação.'],
                caution: ['Identificadores podem ser contratados', 'Times de compliance podem depender de identificadores específicos; confirme antes de remover.'],
                fontes: ['Macie custom identifiers', 'Macie pricing']
            },
            {
                slug: 'macie-findings-sem-triagem-gerando-alertas-excessivos',
                titulo: 'Macie Findings sem Triagem Gerando Alertas Excessivos',
                resumo: 'Avalie se findings do Macie acumulam sem triagem, gerando custo de notificação e ruído operacional.',
                checks: [
                    ['Meça o volume de findings', 'Compare findings abertos versus resolvidos e o tempo médio de triagem.'],
                    ['Identifique padrões recorrentes', 'Agrupe findings por tipo para ver se há falsos positivos ou problemas sistêmicos.']
                ],
                action: ['Implemente triagem automatizada', 'Use EventBridge para rotear findings críticos e arquive ou resolva os de baixa severidade automaticamente.'],
                caution: ['Findings podem ser regulatórios', 'Findings de compliance podem ter prazos de resolução; não arquive sem validar o impacto.'],
                fontes: ['Macie findings', 'Macie pricing']
            }
        ]
    },
    {
        service: 'amazon-msk',
        cenarios: [
            {
                slug: 'msk-brokers-subdimensionados-para-o-volume-de-mensagens',
                titulo: 'MSK com Brokers Subdimensionados para o Volume de Mensagens',
                resumo: 'Avalie se brokers estão com CPU ou memória insuficiente para o throughput, causando lag e retries que aumentam custo.',
                checks: [
                    ['Meça CPU e memória dos brokers', 'Use as métricas do MSK para comparar utilização com capacidade provisionada.'],
                    ['Avalie o consumer lag', 'Compare o lag dos consumers com o volume de produção para ver se há gargalo.']
                ],
                action: ['Aumente brokers ou ajuste partições', 'Para brokers saturados, adicione brokers ou ajuste partições; para subutilizados, reduza a frota.'],
                caution: ['Partições limitam paralelismo', 'Aumentar partições não resolve se o broker está saturado; identifique o gargalo correto.'],
                fontes: ['MSK monitoring', 'MSK pricing']
            },
            {
                slug: 'msk-topics-com-retencao-excessiva-de-mensagens',
                titulo: 'MSK com Tópicos com Retenção Excessiva de Mensagens',
                resumo: 'Verifique se tópicos estão configurados com retenção maior que o necessário, acumulando dados em storage.',
                checks: [
                    ['Liste retenções por tópico', 'Identifique tópicos por retention.ms e compare com o tempo máximo de reprocessamento.'],
                    ['Meça o volume armazenado', 'Estime o custo de storage por tópico e se a retenção longa é justificada.']
                ],
                action: ['Reduza a retenção', 'Ajuste retention.ms para o mínimo necessário, mantendo margem para DR e reprocessamento.'],
                caution: ['Retenção pode ser exigida', 'Compliance ou auditoria pode exigir retenção estendida; confirme antes de reduzir.'],
                fontes: ['MSK topic retention', 'MSK pricing']
            },
            {
                slug: 'msk-provisioned-vs-serverless-sem-analise-de-custo',
                titulo: 'MSK Provisioned vs Serverless sem Análise de Custo',
                resumo: 'Avalie se clusters estão no modo errado: provisioned para cargas variáveis ou serverless para cargas estáveis.',
                checks: [
                    ['Identifique o tipo de cluster', 'Liste clusters por tipo (provisioned/serverless) e compare o custo por GB processado.'],
                    ['Avalie a previsibilidade', 'Para serverless, verifique se o uso é estável o suficiente para provisioned ser mais barato.']
                ],
                action: ['Escolha o modelo correto', 'Para carga estável e alta, provisioned pode ser mais barato; para carga variável, serverless elimina overprovisioning.'],
                caution: ['Migração entre tipos é complexa', 'Migrar de serverless para provisioned requer recriar o cluster; planeje com cuidado.'],
                fontes: ['MSK serverless', 'MSK pricing']
            }
        ]
    },
    {
        service: 'amazon-neptune',
        cenarios: [
            {
                slug: 'neptune-cluster-instance-size-acima-da-demanda',
                titulo: 'Cluster Neptune com Instância Acima da Demanda',
                resumo: 'Avalie se instâncias Neptune estão provisionadas com capacidade maior que o necessário para o volume de queries.',
                checks: [
                    ['Meça CPU e memória', 'Use CloudWatch para comparar CPUUtilization e DatabaseConnections com a capacidade da instância.'],
                    ['Avalie a latência de queries', 'Identifique se há queries lentas que poderiam ser otimizadas em vez de aumentar a instância.']
                ],
                action: ['Redimensione ou otimize queries', 'Para instâncias subutilizadas, reduza o tamanho; para gargalos, otimize índices e queries.'],
                caution: ['Resize causa downtime', 'Mudança de classe de instância requer reboot; planeje janela de manutenção.'],
                fontes: ['Neptune monitoring', 'Neptune pricing']
            },
            {
                slug: 'neptune-storage-optimization-desabilitado',
                titulo: 'Neptune com Storage Optimization Desabilitado',
                resumo: 'Verifique se a otimização de storage está desabilitada, fazendo o cluster armazenar dados de forma menos eficiente.',
                checks: [
                    ['Verifique a configuração', 'Confirme se storage optimization está habilitado no cluster Neptune.'],
                    ['Meça o uso de storage', 'Compare o tamanho dos dados com a capacidade provisionada para ver se há ineficiência.']
                ],
                action: ['Habilite storage optimization', 'Ative a otimização para reduzir o custo de storage sem impacto na performance.'],
                caution: ['Otimização pode ter custo inicial', 'A otimização pode exigir processamento adicional; avalie o trade-off para clusters grandes.'],
                fontes: ['Neptune storage', 'Neptune pricing']
            },
            {
                slug: 'neptune-reader-instances-sem-demanda-de-leitura',
                titulo: 'Neptune com Reader Instances sem Demanda de Leitura',
                resumo: 'Avalie se reader instances estão provisionadas sem consultas distribuídas, gerando custo duplicado.',
                checks: [
                    ['Meça leituras por instância', 'Compare ReadIOPS e queries por instância para ver se readers estão sendo usados.'],
                    ['Identifique consumidores', 'Liste aplicações que deveriam usar readers e verifique se estão conectados.']
                ],
                action: ['Reduza ou remova readers', 'Para readers sem consumidores, promova a primária ou reduza a janela de disponibilidade.'],
                caution: ['Readers melhoram disponibilidade', 'Readers podem ser necessários para HA e leitura escalável; valide antes de remover.'],
                fontes: ['Neptune readers', 'Neptune pricing']
            }
        ]
    },
    {
        service: 'amazon-opensearch',
        cenarios: [
            {
                slug: 'opensearch-dominio-com-instancias-grandes-demais',
                titulo: 'Domínio OpenSearch com Instâncias Grandes Demais',
                resumo: 'Avalie se nós de dados estão com capacidade maior que o necessário para o volume de indexação e busca.',
                checks: [
                    ['Meça JVM memory e CPU', 'Use as métricas do OpenSearch para comparar utilização de memória e CPU por nó.'],
                    ['Avalie o tamanho dos índices', 'Compare o volume de dados indexados com a capacidade total do cluster.']
                ],
                action: ['Redimensione nós de dados', 'Para domínios subutilizados, reduza o tipo de instância ou o número de nós; para gargalos, otimize mappings e queries.'],
                caution: ['Reduzir nós afeta redundância', 'Menos nós pode reduzir a tolerância a falhas; mantenha réplicas adequadas.'],
                fontes: ['OpenSearch sizing', 'OpenSearch pricing']
            },
            {
                slug: 'opensearch-ultrawarm-storage-sem-acesso-frequente',
                titulo: 'OpenSearch com UltraWarm Storage sem Acesso Frequente',
                resumo: 'Verifique se índices estão em UltraWarm sem padrão de acesso que justifique o custo intermediário.',
                checks: [
                    ['Identifique índices UltraWarm', 'Liste índices por storage type e compare com a frequência de busca.'],
                    ['Meça o custo por GB', 'Compare o custo de UltraWarm versus S3 snapshot para os mesmos dados.']
                ],
                action: ['Mova para S3 ou hot', 'Para índices com acesso raro, use S3 snapshots; para acesso frequente, mantenha em hot storage.'],
                caution: ['UltraWarm tem latência intermediária', 'Queries em UltraWarm são mais lentas que hot; valide se a latência é aceitável.'],
                fontes: ['OpenSearch UltraWarm', 'OpenSearch pricing']
            },
            {
                slug: 'opensearch-dedicated-masters-sem-necessidade',
                titulo: 'OpenSearch com Dedicated Masters sem Necessidade',
                resumo: 'Avalie se dedicated master nodes estão provisionados para domínios que não precisam de gestão dedicada.',
                checks: [
                    ['Identifique domínios com dedicated masters', 'Liste domínios por configuração de master nodes e compare com o tamanho do cluster.'],
                    ['Avalie a carga de gestão', 'Para domínios pequenos, verifique se o master dedicado está ocioso.']
                ],
                action: ['Use dedicated masters sob demanda', 'Para domínios pequenos, use master nodes compartilhados ou sob demanda; reserve dedicados para clusters grandes.'],
                caution: ['Dedicated masters melhoram estabilidade', 'Em produção, dedicated masters evitam contenção; avalie o trade-off para domínios críticos.'],
                fontes: ['OpenSearch dedicated masters', 'OpenSearch pricing']
            }
        ]
    },
    {
        service: 'amazon-redshift',
        cenarios: [
            {
                slug: 'redshift-cluster-sem-auto-pause-em-dev',
                titulo: 'Cluster Redshift sem Auto Pause em Desenvolvimento',
                resumo: 'Avalie se clusters de desenvolvimento e homologação ficam ligados 24/7 sem uso fora do expediente.',
                checks: [
                    ['Identifique clusters não produtivos', 'Use tags para separar clusters de dev/hml e compare o custo horário.'],
                    ['Confirme janelas de uso', 'Valide com as equipes os horários de desenvolvimento e se a disponibilidade 24/7 é necessária.']
                ],
                action: ['Configure auto pause', 'Ative auto pause para clusters de dev/hml com timeout de inatividade adequado.'],
                caution: ['Auto pause afeta conexões', 'Conexões ativas impedem o pause; ajuste o timeout conforme o padrão de uso.'],
                fontes: ['Redshift pause', 'Redshift pricing']
            },
            {
                slug: 'redshift-serverless-com-rls-acima-da-demanda',
                titulo: 'Redshift Serverless com RPU Acima da Demanda',
                resumo: 'Avalie se a capacidade máxima de RPU está configurada acima do necessário para o workload.',
                checks: [
                    ['Meça o uso de RPU', 'Use as métricas do Serverless para comparar RPU consumido com o máximo configurado.'],
                    ['Identifique picos de uso', 'Avalie se os picos são previsíveis ou se a capacidade pode ser reduzida.']
                ],
                action: ['Ajuste a capacidade máxima', 'Reduza maxRPU para o percentil de uso real, mantendo margem para picos excepcionais.'],
                caution: ['RPU baixo causa throttling', 'Queries podem ser mais lentas com menos RPU; valide o impacto na performance.'],
                fontes: ['Redshift serverless', 'Redshift pricing']
            },
            {
                slug: 'redshift-tabelas-sem-sort-e-dist-sem-otimizacao',
                titulo: 'Tabelas Redshift sem Sort e Dist Keys Otimizadas',
                resumo: 'Avalie se tabelas não têm sort/dist keys configuradas, causando scans completos e custo de processamento maior.',
                checks: [
                    ['Identifique tabelas sem otimização', 'Liste tabelas sem sortkey ou distkey e compare com o volume de dados.'],
                    ['Meça o custo por query', 'Use o query history para identificar queries que escaneiam mais dados que o necessário.']
                ],
                action: ['Configure sort e dist keys', 'Adicione sortkey para colunas de filtro frequente e distkey para joins, reduzindo o custo de processamento.'],
                caution: ['Recriar tabelas é necessário', 'Alterar sortkey/distkey em tabela existente requer recriação; planeje migração.'],
                fontes: ['Redshift table design', 'Redshift pricing']
            }
        ]
    },
    {
        service: 'amazon-sagemaker',
        cenarios: [
            {
                slug: 'sagemaker-notebook-instances-sem-uso',
                titulo: 'Sagemaker Notebook Instances sem Uso',
                resumo: 'Identifique notebooks que ficam ligados sem uso, gerando custo de EC2 e EBS sem processamento.',
                checks: [
                    ['Liste notebooks por status', 'Identifique notebook instances em status InService e verifique a última atividade.'],
                    ['Meça CPU e memória', 'Use as métricas do notebook para ver se há processamento ativo ou se está ocioso.']
                ],
                action: ['Pare ou delete notebooks ociosos', 'Stop notebook instances sem uso e delete os que não são mais necessários; configure auto-stop.'],
                caution: ['Dados podem estar no volume', 'Notebook instances podem ter dados no volume EBS; faça snapshot antes de deletar.'],
                fontes: ['Sagemaker notebooks', 'Sagemaker pricing']
            },
            {
                slug: 'sagemaker-processing-jobs-sem-otimizacao-de-instancia',
                titulo: 'Sagemaker Processing Jobs sem Otimização de Instância',
                resumo: 'Avalie se processing jobs usam instâncias maiores que o necessário ou não aproveitam Spot Instances.',
                checks: [
                    ['Mapeie instâncias por job', 'Liste processing jobs por tipo de instância e compare com o volume de dados processados.'],
                    ['Identifique jobs longos', 'Encontre jobs que rodam por horas e poderiam usar instâncias menores ou Spot.']
                ],
                action: ['Otimize instâncias e use Spot', 'Para jobs tolerantes a falhas, use Spot Instances; para jobs curtos, use instâncias menores.'],
                caution: ['Spot pode interromper jobs', 'Jobs longos em Spot podem ser interrompidos; use checkpointing ou instâncias On-Demand para críticos.'],
                fontes: ['Sagemaker processing', 'Sagemaker pricing']
            },
            {
                slug: 'sagemaker-endpoints-sem-auto-scaling',
                titulo: 'Sagemaker Endpoints sem Auto Scaling',
                resumo: 'Avalie se endpoints de inferência estão com capacidade fixa, gerando custo de instâncias ociosas ou lentidão em picos.',
                checks: [
                    ['Meça a utilização dos endpoints', 'Use as métricas do endpoint para comparar CPU/memória com a capacidade provisionada.'],
                    ['Identifique picos de inferência', 'Avalie se o volume de requests varia o suficiente para justificar auto scaling.']
                ],
                action: ['Configure auto scaling', 'Ative auto scaling por CPU/memória ou número de requests pendentes para ajustar a capacidade automaticamente.'],
                caution: ['Cold start em scale-up', 'Novas instâncias demoram para ficar prontas; ajuste o cooldown para balancear custo e latência.'],
                fontes: ['Sagemaker endpoints', 'Sagemaker pricing']
            }
        ]
    }
];
