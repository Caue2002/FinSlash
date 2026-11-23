// Novos cenarios de custo por servico AWS (lote 6: rede dedicada, dados e seguranca).
module.exports = [
    {
        service: 'aws-direct-connect',
        cenarios: [
            {
                slug: 'direct-connect-port-speed-acima-da-demanda',
                titulo: 'Direct Connect com Port Speed Acima da Demanda',
                resumo: 'Avalie se conexões Direct Connect estão provisionadas com capacidade maior que o tráfego real.',
                checks: [
                    ['Meça a utilização do circuito', 'Use as métricas do Direct Connect para comparar a taxa de transferência com a capacidade do port.'],
                    ['Identifique picos de tráfego', 'Avalie se os picos são previsíveis ou se a capacidade pode ser reduzida.']
                ],
                action: ['Reduza a velocidade do port', 'Para circuitos subutilizados, reduza a velocidade do port ou consolide múltiplas conexões.'],
                caution: ['Reduzir pode causar congestionamento', 'Em picos de tráfego, capacidade insuficiente causa latência; valide o percentil de uso.'],
                fontes: ['Direct Connect', 'Direct Connect pricing']
            },
            {
                slug: 'direct-connect-sem-virtual-interface-otimizada',
                titulo: 'Direct Connect sem Virtual Interface Otimizada',
                resumo: 'Verifique se múltiplas VIFs estão configuradas quando uma única com maior capacidade seria mais econômica.',
                checks: [
                    ['Liste VIFs por conexão', 'Identifique conexões com múltiplas VIFs e compare com o tráfego por VIF.'],
                    ['Avalie a necessidade de separação', 'Confirme se a separação por VIF é necessária para isolamento ou se pode ser consolidada.']
                ],
                action: ['Consolide VIFs quando possível', 'Para VIFs com tráfego baixo, consolide em uma única VIF com maior capacidade.'],
                caution: ['VIFs separadas isolam tráfego', 'Múltiplas VIFs podem ser necessárias para separar workloads; valide o isolamento antes de consolidar.'],
                fontes: ['Direct Connect VIF', 'Direct Connect pricing']
            },
            {
                slug: 'direct-connect-backup-link-sem-uso',
                titulo: 'Direct Connect com Backup Link sem Uso',
                resumo: 'Identifique conexões de backup que nunca são usadas para failover, gerando custo de port ocioso.',
                checks: [
                    ['Liste conexões por tipo', 'Identifique conexões de backup e verifique se houve failover nos últimos 12 meses.'],
                    ['Meça a utilização', 'Compare o tráfego nas conexões primárias versus backup para ver se o backup é usado.']
                ],
                action: ['Avalie necessidade do backup', 'Para backups nunca usados, considere remover ou reduzir para conexão de menor capacidade.'],
                caution: ['Backup é para DR', 'Conexões de backup são críticas para disaster recovery; não remova sem plano alternativo.'],
                fontes: ['Direct Connect resilience', 'Direct Connect pricing']
            }
        ]
    },
    {
        service: 'aws-direct-connect-gateway',
        cenarios: [
            {
                slug: 'dx-gateway-sem-vpcs-associadas-ativas',
                titulo: 'DX Gateway sem VPCs Associadas Ativas',
                resumo: 'Avalie se gateways estão associados a VPCs que não usam mais o Direct Connect, gerando custo sem benefício.',
                checks: [
                    ['Liste associações do gateway', 'Identifique VPCs associadas e verifique se ainda usam Direct Connect para tráfego.'],
                    ['Meça o tráfego por associação', 'Compare o tráfego nas VPCs associadas para ver quais são ativas.']
                ],
                action: ['Remova associações ociosas', 'Delete associações de VPCs que não usam mais Direct Connect e mantenha apenas as necessárias.'],
                caution: ['Associação pode ser para DR', 'VPCs podem estar associadas para failover mesmo sem tráfego regular; confirme antes de remover.'],
                fontes: ['DX Gateway associations', 'Direct Connect pricing']
            },
            {
                slug: 'dx-gateway-associations-demais-para-o-caso-de-uso',
                titulo: 'DX Gateway com Associações Demais para o Caso de Uso',
                resumo: 'Avalie se múltiplas associações estão configuradas quando uma única cobriria a necessidade.',
                checks: [
                    ['Conte associações por gateway', 'Liste gateways e o número de VPCs associadas a cada um.'],
                    ['Avalie a necessidade de múltiplos gateways', 'Confirme se a separação por gateway é necessária ou se pode ser consolidada.']
                ],
                action: ['Consolide gateways quando possível', 'Para associações que não precisam de isolamento, use um único gateway para múltiplas VPCs.'],
                caution: ['Múltiplos gateways isolam ambientes', 'Separação pode ser necessária para compliance ou segurança; valide antes de consolidar.'],
                fontes: ['DX Gateway', 'Direct Connect pricing']
            },
            {
                slug: 'dx-gateway-private-virtual-interface-sem-uso',
                titulo: 'DX Gateway com Private Virtual Interface sem Uso',
                resumo: 'Identifique PVIs configuradas que não transportam tráfego, gerando custo de interface ociosa.',
                checks: [
                    ['Liste PVIs por gateway', 'Identifique private virtual interfaces e verifique se há tráfego ativo.'],
                    ['Meça bytes transferidos', 'Compare BpsIngress e BpsEgress para ver se a PVI está sendo usada.']
                ],
                action: ['Remova PVIs ociosas', 'Delete PVIs sem tráfego e documente as que forem mantidas para integrações futuras.'],
                caution: ['PVI pode ser para DR', 'PVIs podem ser mantidas para failover mesmo sem uso regular; confirme antes de remover.'],
                fontes: ['DX virtual interfaces', 'Direct Connect pricing']
            }
        ]
    },
    {
        service: 'aws-dms',
        cenarios: [
            {
                slug: 'dms-replication-instance-subdimensionada',
                titulo: 'DMS com Replication Instance Subdimensionada',
                resumo: 'Avalie se instâncias de replicação estão com capacidade insuficiente, causando lag e retries que aumentam custo.',
                checks: [
                    ['Meça CPU e memória', 'Use as métricas do DMS para comparar utilização da replication instance com a capacidade.'],
                    ['Avalie o CDC lag', 'Compare o lag de replicação com o volume de mudanças para ver se há gargalo.']
                ],
                action: ['Aumente a replication instance', 'Para instâncias saturadas, migre para classe maior ou adicione endpoints para paralelizar.'],
                caution: ['Instância maior custa mais', 'Aumentar a instância aumenta custo fixo; avalie se o lag justifica o investimento.'],
                fontes: ['DMS monitoring', 'DMS pricing']
            },
            {
                slug: 'dms-tasks-com-full-load-desnecessario',
                titulo: 'DMS com Tasks Fazendo Full Load Desnecessário',
                resumo: 'Verifique se tasks estão configuradas para full load quando apenas CDC incremental seria necessário.',
                checks: [
                    ['Identifique tasks por tipo', 'Liste tasks e verifique se usam full load + CDC ou apenas CDC.'],
                    ['Avalie o volume de dados', 'Compare o tamanho dos dados com a frequência de full load para ver se é necessário.']
                ],
                action: ['Use CDC incremental', 'Para sincronização contínua, configure tasks para CDC apenas, evitando full load repetido.'],
                caution: ['Full load pode ser necessário', 'Migrações iniciais ou reconciliação podem exigir full load; use apenas quando necessário.'],
                fontes: ['DMS task types', 'DMS pricing']
            },
            {
                slug: 'dms-endpoints-sem-uso-apos-migracao',
                titulo: 'DMS com Endpoints sem Uso Após Migração',
                resumo: 'Identifique endpoints de origem e destino que ficaram configurados após a conclusão das migrações.',
                checks: [
                    ['Liste endpoints por status', 'Identifique endpoints e verifique se há tasks ativas usando-os.'],
                    ['Meça a última atividade', 'Compare a última execução de task com a data atual para endpoints ociosos.']
                ],
                action: ['Delete endpoints ociosos', 'Remova endpoints sem tasks associadas e documente os que forem mantidos para futuras migrações.'],
                caution: ['Endpoint pode ser para DR', 'Endpoints podem ser mantidos para replicação contínua; confirme antes de remover.'],
                fontes: ['DMS endpoints', 'DMS pricing']
            }
        ]
    },
    {
        service: 'aws-glue',
        cenarios: [
            {
                slug: 'glue-jobs-com-dpu-acima-da-demanda',
                titulo: 'Glue Jobs com DPU Acima da Demanda',
                resumo: 'Avalie se jobs estão usando mais DPUs que o necessário para o volume de dados processado.',
                checks: [
                    ['Meça DPU por job', 'Identifique jobs por número de DPUs e compare com o volume de dados processado.'],
                    ['Avalie a eficiência', 'Compare o tempo de execução com o número de DPUs para ver se há overprovisioning.']
                ],
                action: ['Reduza DPUs ou otimize código', 'Para jobs subutilizados, reduza DPU allocation ou otimize o código Spark para maior eficiência.'],
                caution: ['Menos DPUs aumenta tempo', 'Reduzir DPUs pode aumentar o tempo de execução; equilibre custo com SLA.'],
                fontes: ['Glue job bookmarks', 'Glue pricing']
            },
            {
                slug: 'glue-crawlers-agendados-sem-necessidade',
                titulo: 'Glue Crawlers Agendados sem Necessidade',
                resumo: 'Verifique se crawlers estão rodando em horários ou frequências maiores que o necessário para manter o catálogo atualizado.',
                checks: [
                    ['Identifique crawlers por schedule', 'Liste crawlers e seus agendamentos para ver a frequência de execução.'],
                    ['Avalie a necessidade de atualização', 'Confirme se os dados de origem mudam com frequência suficiente para justificar o schedule.']
                ],
                action: ['Reduza a frequência dos crawlers', 'Ajuste schedules para frequências menores onde a atualização diária ou semanal for suficiente.'],
                caution: ['Crawler frequente mantém catálogo atualizado', 'Dados que mudam frequentemente precisam de crawlers mais frequentes; valide o requisito.'],
                fontes: ['Glue crawlers', 'Glue pricing']
            },
            {
                slug: 'glue-catalog-sem-particionamento-de-tabelas',
                titulo: 'Glue Catalog sem Particionamento de Tabelas',
                resumo: 'Avalie se tabelas no Glue Data Catalog não têm particionamento, causando scans completos em queries Athena.',
                checks: [
                    ['Identifique tabelas sem partição', 'Liste tabelas no catálogo e verifique quais não têm colunas de partição.'],
                    ['Meça o custo de scan', 'Compare o DataScannedBytes em queries Athena para tabelas particionadas versus não.']
                ],
                action: ['Adicione particionamento', 'Reestruture tabelas com partições por data ou categoria e atualize as queries para filtrar por partição.'],
                caution: ['Particionamento exige manutenção', 'Novas partições precisam ser registradas; use crawlers ou jobs para manter atualizado.'],
                fontes: ['Glue partitions', 'Glue pricing']
            }
        ]
    },
    {
        service: 'aws-iam-access-analyzer',
        cenarios: [
            {
                slug: 'access-analyzer-sem-triagem-de-findings',
                titulo: 'Access Analyzer sem Triagem de Findings',
                resumo: 'Avalie se findings de segurança acumulam sem revisão, gerando custo de análise sem valor de remediação.',
                checks: [
                    ['Meça o volume de findings', 'Compare findings ativos versus resolvidos e o tempo médio de triagem.'],
                    ['Identifique padrões recorrentes', 'Agrupe findings por tipo para ver se há falsos positivos ou problemas sistêmicos.']
                ],
                action: ['Implemente triagem automatizada', 'Use EventBridge para rotear findings críticos e arquive ou resolva os de baixa severidade.'],
                caution: ['Findings podem ser críticos', 'Findings de segurança podem indicar exposição real; não arquive sem validar o impacto.'],
                fontes: ['Access Analyzer findings', 'Access Analyzer pricing']
            },
            {
                slug: 'access-analyzer-archive-rules-demais',
                titulo: 'Access Analyzer com Archive Rules Demais',
                resumo: 'Verifique se regras de arquivamento estão escondendo findings que deveriam ser revistos.',
                checks: [
                    ['Liste regras de archive', 'Identifique archive rules configuradas e o que elas estão suprimindo.'],
                    ['Avalie findings arquivados', 'Compare o volume de findings arquivados com os ativos para ver se há supressão excessiva.']
                ],
                action: ['Revise archive rules', 'Para regras muito amplas, refine os critérios ou remova as que não são mais necessárias.'],
                caution: ['Archive rules são para ruído', 'Arquivar findings repetitivos é válido; não remova regras que suprimem ruído real.'],
                fontes: ['Access Analyzer archive', 'Access Analyzer pricing']
            },
            {
                slug: 'access-analyzer-sem-escopo-de-analise-adequado',
                titulo: 'Access Analyzer sem Escopo de Análise Adequado',
                resumo: 'Avalie se analyzers estão configurados para escopo muito amplo ou muito restrito para o caso de uso.',
                checks: [
                    ['Identifique escopos de análise', 'Liste analyzers por tipo (account/organization) e escopo de recursos.'],
                    ['Avalie a relevância dos findings', 'Compare findings por analyzer para ver qual gera valor real.']
                ],
                action: ['Ajuste o escopo', 'Para analyzers com muitos falsos positivos, restrinja o escopo; para cobertura insuficiente, amplie.'],
                caution: ['Escopo amplo gera mais findings', 'Mais cobertura significa mais custo e mais ruído; equilibre com a capacidade de triagem.'],
                fontes: ['Access Analyzer scopes', 'Access Analyzer pricing']
            }
        ]
    },
    {
        service: 'aws-kms',
        cenarios: [
            {
                slug: 'kms-keys-sem-rotacao-automatica-habilitada',
                titulo: 'KMS Keys sem Rotação Automática Habilitada',
                resumo: 'Avalie se chaves KMS não têm rotação automática, criando risco de segurança e custo de rotação manual.',
                checks: [
                    ['Identifique chaves sem rotação', 'Liste chaves KMS e verifique se têm enable key rotation ativo.'],
                    ['Meça o uso de cada chave', 'Compare o número de requisições por chave para priorizar as mais críticas.']
                ],
                action: ['Habilite rotação automática', 'Para chaves simétricas, ative a rotação anual automática; para assimétricas, planeje rotação manual.'],
                caution: ['Rotação pode afetar aplicações', 'Algumas aplicações podem não suportar chaves rotacionadas; teste antes de habilitar.'],
                fontes: ['KMS rotation', 'KMS pricing']
            },
            {
                slug: 'kms-customer-managed-keys-sem-necessidade',
                titulo: 'KMS com Customer Managed Keys sem Necessidade',
                resumo: 'Avalie se chaves gerenciadas pelo cliente estão sendo usadas para casos que a AWS managed key cobriria.',
                checks: [
                    ['Identifique CMKs por serviço', 'Liste chaves e os serviços que as utilizam para criptografia.'],
                    ['Avalie a necessidade de controle', 'Confirme se o caso de uso exige controle de chave ou se AWS managed seria suficiente.']
                ],
                action: ['Use AWS managed keys quando possível', 'Para casos sem requisito de controle, AWS managed keys são gratuitas e simplificam a gestão.'],
                caution: ['CMK pode ser exigida por compliance', 'Regulamentações podem exigir chaves gerenciadas pelo cliente; confirme antes de migrar.'],
                fontes: ['KMS key types', 'KMS pricing']
            },
            {
                slug: 'kms-key-policy-sem-least-privilege',
                titulo: 'KMS com Key Policy sem Least Privilege',
                resumo: 'Verifique se key policies estão muito permissivas, aumentando superfície de ataque e custo de requisições não autorizadas.',
                checks: [
                    ['Audite políticas de chave', 'Revise as key policies para identificar permissões excessivas ou não utilizadas.'],
                    ['Meça requisições por principal', 'Compare o número de chamadas por IAM principal para ver quem realmente usa a chave.']
                ],
                action: ['Restrinja a key policy', 'Remova permissões desnecessárias e restrinja a principals específicos que precisam da chave.'],
                caution: ['Restrição pode quebrar aplicações', 'Remover permissões pode afetar serviços que usam a chave; teste antes de restringir.'],
                fontes: ['KMS key policies', 'KMS pricing']
            }
        ]
    },
    {
        service: 'aws-memorydb-for-redis',
        cenarios: [
            {
                slug: 'memorydb-nodes-abaixo-da-demanda-de-redis',
                titulo: 'MemoryDB com Nós Abaixo da Demanda de Redis',
                resumo: 'Avalie se clusters MemoryDB estão subdimensionados, causando evictions e latência que afetam aplicações.',
                checks: [
                    ['Meça memória e CPU', 'Use as métricas do MemoryDB para comparar utilização com capacidade dos nós.'],
                    ['Avalie a taxa de eviction', 'Compare evictions com o tamanho do dataset para ver se o cache é adequado.']
                ],
                action: ['Aumente nós ou ajuste TTL', 'Para alta taxa de eviction, adicione nós ou ajuste TTLs; para baixa utilização, considere reduzir.'],
                caution: ['MemoryDB é para durabilidade', 'Se o workload precisa apenas de cache, ElastiCache pode ser mais barato; valide o requisito.'],
                fontes: ['MemoryDB monitoring', 'MemoryDB pricing']
            },
            {
                slug: 'memorydb-cluster-multi-az-sem-necessidade',
                titulo: 'MemoryDB com Cluster Multi-AZ sem Necessidade',
                resumo: 'Avalie se clusters estão configurados com réplicas multi-AZ quando a aplicação tolera perda de dados.',
                checks: [
                    ['Identifique clusters multi-AZ', 'Liste clusters por configuração de réplicas e compare com o requisito de durabilidade.'],
                    ['Avalie o custo de replicação', 'Compare o custo de cluster single-AZ versus multi-AZ para o mesmo workload.']
                ],
                action: ['Use single-AZ quando possível', 'Para dados reconstruíveis, single-AZ pode ser significativamente mais barato; reserve multi-AZ para dados críticos.'],
                caution: ['Multi-AZ é para HA', 'Perda de dados em single-AZ pode afetar aplicações; valide o RPO aceitável.'],
                fontes: ['MemoryDB multi-AZ', 'MemoryDB pricing']
            },
            {
                slug: 'memorydb-snapshots-acumulados-sem-politica',
                titulo: 'MemoryDB com Snapshots Acumulados sem Política',
                resumo: 'Verifique se snapshots manuais ou automáticos acumulam storage sem política de retenção definida.',
                checks: [
                    ['Liste snapshots por idade', 'Identifique snapshots e verifique a data de criação e retenção.'],
                    ['Avalie a necessidade de cada snapshot', 'Confirme se cada snapshot é necessário para DR ou auditoria.']
                ],
                action: ['Configure retenção automática', 'Defina snapshot retention period adequado e remova snapshots manuais obsoletos.'],
                caution: ['Snapshot pode ser única cópia', 'Snapshots podem ser a única recuperação de dados; confirme antes de remover.'],
                fontes: ['MemoryDB snapshots', 'MemoryDB pricing']
            }
        ]
    }
];
