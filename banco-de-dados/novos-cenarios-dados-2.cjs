// Novos cenarios de custo por servico AWS (lote 2: dados e containers).
module.exports = [
    {
        service: 'amazon-eks',
        cenarios: [
            {
                slug: 'node-groups-com-instancias-grandes-para-pods-pequenos',
                titulo: 'Node Groups com Instâncias Grandes para Pods Pequenos',
                resumo: 'Avalie se instâncias grandes do EKS estão subutilizadas porque os pods não preenchem a capacidade, gerando custo por recurso ocioso.',
                checks: [
                    ['Meça a alocação por nó', 'Use kubectl top nodes e as métricas do Container Insights para comparar CPU/memória alocada versus usada.'],
                    ['Avalie o bin packing', 'Verifique se requests e limits dos pods permitem empacotar mais cargas por nó ou se instâncias menores seriam mais eficientes.']
                ],
                action: ['Redimensione ou divida node groups', 'Crie node groups com instâncias menores para cargas leves e reserve as grandes para pods que realmente precisam; ajuste requests para melhorar o empacotamento.'],
                caution: ['Requests afetam o escalonamento', 'Requests muito baixos causam contenção; valide o comportamento do cluster autoscaler após o redimensionamento.'],
                fontes: ['EKS best practices', 'Compute and Autoscaling', 'EKS pricing']
            },
            {
                slug: 'control-plane-eks-com-taxa-de-suporte-extendido',
                titulo: 'Control Plane EKS com Taxa de Suporte Estendido por Versão Desatualizada',
                resumo: 'Verifique se o cluster roda versão fora do suporte padrão, gerando cobrança adicional de suporte estendido da AWS.',
                checks: [
                    ['Confira a versão do cluster', 'No console EKS, verifique a versão do Kubernetes e se está dentro da janela de suporte padrão.'],
                    ['Mapeie o plano de atualização', 'Liste as versões disponíveis e o esforço necessário para sair da versão com taxa estendida.']
                ],
                action: ['Atualize para versão suportada', 'Planeje a atualização do control plane e dos node groups para a versão padrão mais recente, testando em homologação antes.'],
                caution: ['Atualização pode quebrar workloads', 'Mudanças de versão do Kubernetes podem afetar APIs depreciadas; revise changelogs e faça testes de regressão.'],
                fontes: ['EKS versioning', 'EKS pricing']
            },
            {
                slug: 'fargate-perfis-sem-justificativa-de-custo',
                titulo: 'Perfis Fargate sem Justificativa de Custo para Cargas Variáveis',
                resumo: 'Avalie se todos os namespaces usam Fargate quando instâncias EC2 spot ou managed nodes seriam mais econômicos para a mesma carga.',
                checks: [
                    ['Compare custo por perfil', 'Some o custo do Fargate por vCPU/hora e memória versus o custo equivalente em node groups EC2 Spot.'],
                    ['Identifique cargas adequadas', 'Liste namespaces com uso constante que se beneficiariam de nós EC2 em vez de Fargate.']
                ],
                action: ['Migre cargas estáveis para EC2', 'Para workloads com uso previsível, mova para node groups EC2 Spot ou On-Demand e compare o custo total mensal.'],
                caution: ['Fargate elimina gestão de nós', 'A migração adiciona complexidade de patching e capacidade; pondere custo versus esforço operacional.'],
                fontes: ['EKS Fargate', 'EKS pricing']
            }
        ]
    },
    {
        service: 'amazon-ebs',
        cenarios: [
            {
                slug: 'volumes-gp2-legados-sem-migracao-para-gp3',
                titulo: 'Volumes GP2 Legados sem Migração para GP3',
                resumo: 'Identifique volumes EBS ainda na geração gp2 que pagam mais por IOPS e throughput que o equivalente gp3 sem custo adicional de migração.',
                checks: [
                    ['Liste volumes por tipo', 'No console EC2, filtre volumes gp2 e compare a quantidade e tamanho com os demais tipos.'],
                    ['Valide compatibilidade', 'Confirme que as instâncias suportam gp3 e que o workload não depende de comportamento específico do gp2.']
                ],
                action: ['Migre para gp3', 'Use a modificação de tipo de volume para converter gp2 em gp3 sem downtime; aproveite IOPS e throughput baseline maiores.'],
                caution: [' gp3 tem baseline diferente', 'Volumes gp3 têm 3.000 IOPS e 125 MB/s baseline; se o workload precisa de mais, provisionar adicionalmente tem custo.'],
                fontes: ['EBS volume types', 'EBS pricing']
            },
            {
                slug: 'snapshots-ebs-acumulados-sem-catalogacao',
                titulo: 'Snapshots EBS Acumulados sem Catalogação nem Política',
                resumo: 'Avalie snapshots manuais criados para migrações ou testes que ficaram armazenados indefinidamente sem dono ou propósito.',
                checks: [
                    ['Liste snapshots por idade', 'No console EC2, ordene snapshots por data e identifique os com mais de 90 dias sem descrição.'],
                    ['Verifique o volume de origem', 'Para cada snapshot, confirme se o volume original ainda existe e se o snapshot é incremental de uma cadeia ativa.']
                ],
                action: ['Aplique lifecycle e remova obsoletos', 'Use Data Lifecycle Manager para snapshots automáticos e remova manuais sem dono confirmado após backup validado.'],
                caution: ['Snapshot pode ser única cópia', 'Snapshots podem ser a única recuperação de dados apagados; confirme com o dono antes de excluir.'],
                fontes: ['EBS snapshots', 'DLM', 'EBS pricing']
            },
            {
                slug: 'volumes-io2-block-express-sem-necessidade-de-latencia',
                titulo: 'Volumes io2 Block Express sem Necessidade de Latência Extrema',
                resumo: 'Verifique se volumes io2 com provisionamento de IOPS alto estão em workloads que não exigem a latência submilissegundo do Block Express.',
                checks: [
                    ['Compare IOPS provisionado versus usado', 'Use métricas de VolumeQueueLength e IOPS do CloudWatch para ver se o volume usa a capacidade provisionada.'],
                    ['Avalie o tipo de workload', 'Identifique se o volume suporta banco de dados crítico ou se é storage geral que rodaria em gp3.']
                ],
                action: ['Reduza IOPS ou mude para gp3', 'Para workloads que não precisam de 64.000 IOPS, reduza o provisionamento ou migre para gp3 com IOPS adicionais sob demanda.'],
                caution: ['io2 tem SLA de durabilidade', 'Workloads críticos podem exigir a durabilidade do io2; valide RPO/RTO antes de migrar.'],
                fontes: ['EBS io2', 'EBS pricing']
            }
        ]
    },
    {
        service: 'amazon-efs',
        cenarios: [
            {
                slug: 'efs-infrequent-access-sem-analise-de-padrao-de-acesso',
                titulo: 'EFS Infrequent Access Ativado sem Análise de Padrão de Acesso',
                resumo: 'Verifique se dados marcados como IA no EFS realmente têm padrão de acesso compatível ou se a taxa de leitura anulou a economia.',
                checks: [
                    ['Meça leituras em dados IA', 'Use as métricas do EFS para comparar leituras em storage IA versus Standard por período.'],
                    ['Avalie o custo de retrieval', 'Calcule o custo de retrieval de IA comparado ao que seria pago em Standard para o mesmo volume.']
                ],
                action: ['Revise a política de IA', 'Ajuste as regras de transição ou desative IA para datasets com acesso frequente; monitore o custo por GB por 30 dias.'],
                caution: ['Retrieval tem custo por GB', 'Cada leitura de dados IA cobra retrieval; workloads com acesso aleatório podem sair mais caros que Standard.'],
                fontes: ['EFS storage classes', 'EFS pricing']
            },
            {
                slug: 'efs-semplificado-sem-throughput-provisionado-adequado',
                titulo: 'EFS Sem Throughput Provisionado para Workloads de Alta Performance',
                resumo: 'Avalie se file systems em modo Bursting estão limitando performance e se provisioned throughput seria mais econômico que o burst credit esgotado.',
                checks: [
                    ['Meça o burst credit balance', 'Acompanhe a métrica BurstCreditBalance para identificar file systems que esgotam créditos regularmente.'],
                    ['Compare custo de provisioned vs burst', 'Estime o custo de provisioned throughput versus o custo de performance degradada e retries.']
                ],
                action: ['Migre para provisioned throughput', 'Para file systems com burst credit consistentemente baixo, mude para provisioned throughput dimensionado ao pico real.'],
                caution: ['Provisioned tem custo fixo', 'Throughput provisionado é cobrado mesmo sem uso; dimensione pela média de pico, não pelo máximo absoluto.'],
                fontes: ['EFS throughput modes', 'EFS pricing']
            },
            {
                slug: 'acesso-efs-por-mount-targets-em-muitas-azs',
                titulo: 'Mount Targets EFS em Muitas AZs sem Uso Efetivo',
                resumo: 'Identifique mount targets criados em zonas de disponibilidade que não têm instâncias consumindo o file system, gerando custo por AZ.',
                checks: [
                    ['Liste mount targets por AZ', 'No console EFS, verifique em quantas AZs existem mount targets e se há ENIs ativos.'],
                    ['Confirme as instâncias consumidoras', 'Cruze com as instâncias EC2/ECS que montam o EFS para ver quais AZs realmente precisam.']
                ],
                action: ['Remova mount targets ociosos', 'Delete mount targets em AZs sem consumidores e documente a topologia mínima necessária para HA.'],
                caution: ['HA pode exigir multi-AZ', 'Workloads críticos podem precisar de acesso em múltiplas AZs para failover; não remova sem validar a arquitetura.'],
                fontes: ['EFS mount targets', 'EFS pricing']
            }
        ]
    },
    {
        service: 'amazon-dynamodb',
        cenarios: [
            {
                slug: 'dynamodb-global-tables-sem-leitura-global-efetiva',
                titulo: 'DynamoDB Global Tables sem Leitura Global Efetiva',
                resumo: 'Avalie se tabelas globais estão replicando para regiões que não servem leituras, gerando custo de storage e escrita duplicado.',
                checks: [
                    ['Meça leituras por região', 'Compare consumed read capacity units por região para identificar réplicas sem tráfego de leitura.'],
                    ['Revise a arquitetura de failover', 'Confirme se a replicação global é para DR ou se leituras poderiam ficar na região primária.']
                ],
                action: ['Remova réplicas desnecessárias', 'Delete réplicas em regiões sem consumo real e mantenha apenas as exigidas por RPO/RTO ou leitura local.'],
                caution: ['Failover pode precisar de réplica', 'Remover réplica elimina a capacidade de failover rápido; valide requisitos de disaster recovery.'],
                fontes: ['DynamoDB Global Tables', 'DynamoDB pricing']
            },
            {
                slug: 'dynamodb-dax-sem-beneficio-de-cache-medido',
                titulo: 'DynamoDB DAX Ativado sem Benefício de Cache Medido',
                resumo: 'Verifique se o DAX está cacheando dados que não são relidos com frequência, gerando custo de cluster sem redução de latência.',
                checks: [
                    ['Meça o hit rate do DAX', 'Use as métricas do DAX para avaliar cache hits versus misses e a taxa de acerto real.'],
                    ['Compare latência com e sem cache', 'Avalie se a latência de leitura melhorou significativamente ou se o workload já era rápido o suficiente.']
                ],
                action: ['Desative ou redimensione o DAX', 'Para workloads com baixa taxa de acerto ou tolerância a latência maior, remova o DAX e compare custo total.'],
                caution: ['DAX tem custo por nó', 'Cada nó do cluster é cobrado; reduzir nós pode afetar a capacidade de cache para picos.'],
                fontes: ['DynamoDB DAX', 'DynamoDB pricing']
            },
            {
                slug: 'dynamodb-streams-sem-consumidor-processando-eventos',
                titulo: 'DynamoDB Streams sem Consumidor Processando Eventos',
                resumo: 'Identifique streams ativados cujos eventos não são consumidos por Lambda, Kinesis ou outras aplicações, acumulando custo de leitura.',
                checks: [
                    ['Liste streams ativos', 'Identifique tabelas com streams habilitados e verifique se há consumidores registrados.'],
                    ['Meça o volume de eventos', 'Compare GetRecords e IteratorAge para ver se os eventos estão sendo lidos ou acumulando.']
                ],
                action: ['Desative streams não utilizados', 'Para tabelas sem consumidores, desative o stream e remova configurações obsoletas de event source mapping.'],
                caution: ['Stream pode ser usado para auditoria', 'Algumas aplicações usam streams para CDC ou auditoria; confirme antes de desativar.'],
                fontes: ['DynamoDB Streams', 'DynamoDB pricing']
            }
        ]
    },
    {
        service: 'amazon-aurora',
        cenarios: [
            {
                slug: 'aurora-iops-provisionados-acima-do-consumo-real',
                titulo: 'Aurora IOPS Provisionados Acima do Consumo Real',
                resumo: 'Compare a capacidade de I/O provisionada do cluster Aurora com o consumo real para identificar folga ociosa cobrada.',
                checks: [
                    ['Meça IOPS por instância', 'Use as métricas de VolumeReadIOPs e VolumeWriteIOPs para comparar provisionado versus consumido.'],
                    ['Avalie o padrão de I/O', 'Identifique se o workload é consistente ou se tem picos que justificam a provisão atual.']
                ],
                action: ['Ajuste a provisão de IOPS', 'Reduza IOPS provisionados para instâncias com folga consistentemente alta; use I/O-Optimized se o padrão for favorável.'],
                caution: ['IOPS afetam latência de escrita', 'Reduzir IOPS pode causar throttling em picos; valide com teste de carga antes de consolidar.'],
                fontes: ['Aurora I/O optimization', 'Aurora pricing']
            },
            {
                slug: 'aurora-backtrack-habilitado-sem-uso',
                titulo: 'Aurora Backtrack Habilitado sem Uso Operacional',
                resumo: 'Verifique se o recurso de backtrack está ativo em clusters que nunca são usados para rollback, gerando custo de armazenamento de alterações.',
                checks: [
                    ['Liste clusters com backtrack', 'Identifique clusters Aurora com backtrack habilitado e verifique se houve restaurações recentes.'],
                    ['Avalie a janela de backtrack', 'Compare a janela configurada com o tempo médio de detecção e resolução de incidentes.']
                ],
                action: ['Desative ou reduza a janela', 'Para clusters sem uso de backtrack, desative o recurso ou reduza a janela para o mínimo necessário.'],
                caution: ['Backtrack é mais rápido que restore', 'Em incidentes críticos, backtrack pode ser a única recuperação rápida; não desative sem alternativa testada.'],
                fontes: ['Aurora backtrack', 'Aurora pricing']
            },
            {
                slug: 'aurora-cluster-de-dev-sem-schedule-de-parada',
                titulo: 'Cluster Aurora de Desenvolvimento sem Agendamento de Parada',
                resumo: 'Avalie clusters de homologação e desenvolvimento que ficam ligados 24/7 sem uso noturno ou em fins de semana.',
                checks: [
                    ['Identifique clusters não produtivos', 'Use tags para separar clusters de dev/hml e compare o custo horário com produção.'],
                    ['Confirme janelas de uso', 'Valide com as equipes os horários de desenvolvimento e se a disponibilidade 24/7 é necessária.']
                ],
                action: ['Agende start/stop do cluster', 'Use AWS Lambda ou Systems Manager para parar e retomar clusters fora do horário, com notificação às equipes.'],
                caution: ['Parada afeta backups e réplicas', 'Parar o cluster pode afetar a replicação e o backup; valide a política de recuperação antes de agendar.'],
                fontes: ['Aurora stop/start', 'Aurora pricing']
            }
        ]
    },
    {
        service: 'amazon-elasticache',
        cenarios: [
            {
                slug: 'elasticache-nodes-pequenos-demais-para-o-padrao-de-acesso',
                titulo: 'ElastiCache com Nós Pequenos Demais para o Padrão de Acesso',
                resumo: 'Avalie se nós menores estão sendo usados com alta taxa de evicção ou CPU, indicando subdimensionamento que afeta performance e custo de retry.',
                checks: [
                    ['Meça evictions e CPU', 'Use as métricas do ElastiCache para comparar Evictions, CPUUtilization e CurrConnections por nó.'],
                    ['Avalie o hit rate', 'Compare CacheHits versus CacheMisses para ver se o tamanho do cache é adequado ao working set.']
                ],
                action: ['Aumente o nó ou ajuste TTL', 'Para alta taxa de evicção, migre para nó maior ou ajuste TTLs; para baixa utilização, considere nó menor ou ElastiCache Serverless.'],
                caution: ['Eviction pode ser aceitável', 'Algumas aplicações toleram evicção como parte do design; valide o impacto na latência antes de aumentar.'],
                fontes: ['ElastiCache monitoring', 'ElastiCache pricing']
            },
            {
                slug: 'elasticache-valkey-para-cargas-que-nao-usam-funcionalidades',
                titulo: 'ElastiCache Valkey para Cargas que Não Usam Funcionalidades Avançadas',
                resumo: 'Verifique se clusters Valkey estão sendo usados apenas como cache simples quando o Memcached seria mais econômico para o mesmo caso.',
                checks: [
                    ['Identifique o engine em uso', 'Liste clusters por engine (Redis, Valkey, Memcached) e compare o custo por GB de memória.'],
                    ['Avalie os comandos usados', 'Para workloads Valkey/Redis, verifique se usam estruturas de dados avançadas ou apenas GET/SET simples.']
                ],
                action: ['Considere Memcached para cache simples', 'Para casos de cache key-value sem persistência ou estruturas complexas, Memcached pode ser mais barato por GB.'],
                caution: ['Memcached não tem persistência', 'Se o workload precisa de durabilidade ou estruturas de dados, Redis/Valkey são necessários.'],
                fontes: ['ElastiCache engines', 'ElastiCache pricing']
            },
            {
                slug: 'elasticache-cluster-de-teste-sem-ttl-configurado',
                titulo: 'Cluster ElastiCache de Teste sem TTL Configurado',
                resumo: 'Identifique clusters de desenvolvimento ou teste que acumulam chaves sem expiração, desperdiçando memória e custo.',
                checks: [
                    ['Liste clusters por ambiente', 'Use tags para identificar clusters de dev/hml e verifique se têm TTL configurado nas chaves.'],
                    ['Meça a taxa de crescimento', 'Compare o uso de memória ao longo do tempo para clusters sem política de expiração.']
                ],
                action: ['Configure TTL ou reduza cluster', 'Implemente TTL padrão para chaves de teste ou reduza o tamanho do cluster fora do horário de uso.'],
                caution: ['TTL pode afetar testes', 'Chaves expiradas durante testes podem causar falhas intermitentes; ajuste o TTL conforme o ciclo de teste.'],
                fontes: ['ElastiCache TTL', 'ElastiCache pricing']
            }
        ]
    },
    {
        service: 'amazon-documentdb',
        cenarios: [
            {
                slug: 'documentdb-instance-size-acima-da-demanda-de-leitura',
                titulo: 'DocumentDB com Instância Acima da Demanda de Leitura',
                resumo: 'Avalie se instâncias DocumentDB estão provisionadas com capacidade maior que o necessário para o volume de consultas.',
                checks: [
                    ['Meça CPU e conexões', 'Use CloudWatch para comparar CPUUtilization e DatabaseConnections com a capacidade da instância.'],
                    ['Avalie o padrão de queries', 'Identifique se há queries lentas ou scans que poderiam ser otimizados em vez de aumentar a instância.']
                ],
                action: ['Redimensione ou otimize queries', 'Para instâncias subutilizadas, reduza o tamanho; para gargalos, otimize índices e queries antes de escalar.'],
                caution: ['Resize causa downtime breve', 'Mudança de classe de instância requer reboot; planeje janela de manutenção.'],
                fontes: ['DocumentDB monitoring', 'DocumentDB pricing']
            },
            {
                slug: 'documentdb-backups-retention-acima-do-necessario',
                titulo: 'DocumentDB com Retenção de Backup Acima do Necessário',
                resumo: 'Verifique se clusters DocumentDB mantêm backups por períodos maiores que o exigido por compliance ou negócio.',
                checks: [
                    ['Audite a retenção configurada', 'Liste clusters por backup retention period e identifique os com valores elevados.'],
                    ['Confirme requisitos', 'Valide com compliance e negócio a janela mínima de recuperação para cada ambiente.']
                ],
                action: ['Ajuste a retenção', 'Reduza o retention period para o mínimo exigido e remova snapshots manuais obsoletos.'],
                caution: ['Backups são cobrados por GB', 'Reduzir retenção diminui custo de storage mas também a janela de recuperação; equilibre com o RPO.'],
                fontes: ['DocumentDB backups', 'DocumentDB pricing']
            },
            {
                slug: 'documentdb-compatibilidade-mongodb-desnecessaria',
                titulo: 'DocumentDB com Compatibilidade MongoDB 5.0 Desnecessária',
                resumo: 'Avalie se clusters estão configurados com versão de compatibilidade superior à necessária pelas aplicações.',
                checks: [
                    ['Liste versões de compatibilidade', 'Identifique clusters por versão de engine e compatibilidade MongoDB configurada.'],
                    ['Verifique features utilizadas', 'Confirme se as aplicações usam recursos exclusivos da versão mais recente ou se uma mais antiga atende.']
                ],
                action: ['Avalie downgrade de compatibilidade', 'Se não houver uso de features novas, avalie compatibilidade mais antiga que pode ter custo diferente.'],
                caution: ['Downgrade pode quebrar queries', 'Aplicações podem usar comandos da versão atual; teste em homologação antes de alterar.'],
                fontes: ['DocumentDB versions', 'DocumentDB pricing']
            }
        ]
    }
];
