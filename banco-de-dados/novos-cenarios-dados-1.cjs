// Novos cenarios de custo por servico AWS (lote 1).
// Fontes sao escolhidas das URLs ja validadas do proprio servico.
module.exports = [
    {
        "service": "amazon-ec2",
        "cenarios": [
            {
                "slug": "licencas-de-sistema-operacional-windows-e-rhel-incluidas",
                "titulo": "Licenças de Sistema Operacional Windows e RHEL Incluídas no Preço",
                "resumo": "Avalie se instâncias Linux com licenças pagas agregadas são necessárias ou se a troca para imagens base reduz o custo sem perder conformidade.",
                "checks": [
                    [
                        "Mapeie as imagens em uso",
                        "Liste as AMIs por instância e identifique Windows, RHEL ou outras com licença agregada versus Linux sem custo de licença."
                    ],
                    [
                        "Confira exigências de licença",
                        "Valide com o time de segurança e compras se as licenças BYOL ou agregadas são contratualmente necessárias para cada carga."
                    ]
                ],
                "action": [
                    "Considere imagens sem licença agregada",
                    "Para cargas compatíveis, teste migração para AL2023 ou Ubuntu e compare o preço horário com e sem licença antes de migrar frota."
                ],
                "caution": [
                    "Licença pode ser obrigatória",
                    "Aplicações com suporte de fornecedor que exigem Windows ou RHEL podem ter restrições contratuais; não remova licenças sem aprovação."
                ],
                "fontes": [
                    "instance types",
                    "EC2 pricing"
                ]
            },
            {
                "slug": "instancias-dedicadas-para-cargas-de-ia-e-ml",
                "titulo": "Instâncias Dedicadas para Cargas de IA e ML Sem Otimização",
                "resumo": "Verifique se GPUs e instâncias otimizadas para IA estão ociosas ou subutilizadas fora dos janelas de treinamento e inferência.",
                "checks": [
                    [
                        "Meça uso de GPU e CPU",
                        "Use CloudWatch e CUDA utilization para avaliar o uso real de instâncias p4d, p5, g5 e similares ao longo de 24 horas."
                    ],
                    [
                        "Mapeie janelas de uso",
                        "Identifique horários de treino, fine-tuning e inferência e se a instância fica ligada sem trabalho entre eles."
                    ]
                ],
                "action": [
                    "Agende ou migre para Spot",
                    "Para treino tolerante a falhas, avalie Spot Instances ou instâncias otimizadas com agendamento; para inferência constante, compare preços de famílias diferentes."
                ],
                "caution": [
                    "Checkpointing é obrigatório",
                    "Interrupções em Spot ou parada de instância podem perder progresso de treino; garanta checkpoint e retomada antes de mexer."
                ],
                "fontes": [
                    "GPU instances",
                    "Spot Instances"
                ]
            },
            {
                "slug": "elastic-ip-publico-com-custo-por-hora-ocioso",
                "titulo": "Elastic IPs Ociosos Gerando Cobrança por Hora",
                "resumo": "Identifique Elastic IPs não associados ou subutilizados que passam a ter custo após o período de gratuidade.",
                "checks": [
                    [
                        "Liste EIPs por status",
                        "No console EC2, filtre Elastic IPs não associados e os associados a instâncias paradas ou desligadas."
                    ],
                    [
                        "Confira o motivo de cada IP",
                        "Confirme com as equipes se o IP é necessário para DNS, whitelist de parceiros ou failover antes de liberar."
                    ]
                ],
                "action": [
                    "Desassocie ou libere EIPs",
                    "Libere EIPs sem função definida e documente os que forem mantidos; considere NLB ou DNS para cenários de IP estável."
                ],
                "caution": [
                    "IP fixo pode ser contrato",
                    "Parceiros e integrações legadas podem depender do mesmo IP; valide antes de liberar para não quebrar allowlists."
                ],
                "fontes": [
                    "Elastic IP addresses",
                    "EC2 pricing"
                ]
            }
        ]
    },
    {
        "service": "amazon-rds",
        "cenarios": [
            {
                "slug": "read-replicas-multi-az-sem-demanda-de-leitura",
                "titulo": "Read Replicas Multi-AZ sem Demanda de Leitura Real",
                "resumo": "Avalie se réplicas de leitura estão provisionadas sem consultas distribuídas, gerando custo duplicado de instância e armazenamento.",
                "checks": [
                    [
                        "Meça a distribuição de leituras",
                        "No Performance Insights e nas métricas do RDS, compare leituras na primária versus réplicas por período representativo."
                    ],
                    [
                        "Identifique consumidores das réplicas",
                        "Liste aplicações e jobs que deveriam usar o endpoint de leitura e verifique se estão de fato conectados."
                    ]
                ],
                "action": [
                    "Reduza ou reagende réplicas",
                    "Para réplicas sem consumidores, promova uma a primária ou reduza a janela de disponibilidade; ajuste para instâncias menores quando a carga justificar."
                ],
                "caution": [
                    "Lag de replicação afeta decisões",
                    "Remover réplicas pode aumentar a carga na primária e o lag; valide picos e capacidade antes de reduzir."
                ],
                "fontes": [
                    "RDS read replicas",
                    "RDS pricing"
                ]
            },
            {
                "slug": "storage-autoscaling-aurora-iops-nao-utilizados",
                "titulo": "Storage e IOPS Aurora Provisionados Acima do Consumo",
                "resumo": "Compare o consumo real de I/O e armazenamento do cluster Aurora com a capacidade provisionada para identificar folga ociosa.",
                "checks": [
                    [
                        "Acompanhe IOPS e storage",
                        "Use as métricas ServerlessDatabaseCapacity, IOPS e consumo de GB do cluster para mapear picos e média."
                    ],
                    [
                        "Revise a configuração Serverless",
                        "Confira ACU mínimo/máximo e a estratégia de escala para ver se a capacidade mínima está acima do uso típico."
                    ]
                ],
                "action": [
                    "Ajuste a capacidade mínima",
                    "Reduza ACU mínimo ou o tamanho do storage provisionado quando os dados mostrarem folga; teste em horário de pico antes de consolidar."
                ],
                "caution": [
                    "ACU mínimo afeta latência",
                    "Capacidade baixa demais pode gerar throttling em picos; mantenha margem para o workload crítico."
                ],
                "fontes": [
                    "Aurora Serverless",
                    "Aurora monitoring"
                ]
            },
            {
                "slug": "backups-automatizados-rds-sem-politica-de-retencao",
                "titulo": "Backups Automatizados do RDS sem Política de Retenção Definida",
                "resumo": "Verifique períodos de retenção de backups e snapshots manuais que acumulam armazenamento cobrado indefinidamente.",
                "checks": [
                    [
                        "Audite a retenção configurada",
                        "Confira backup retention period por instância e liste snapshots manuais antigos no console RDS."
                    ],
                    [
                        "Alinhe com requisitos",
                        "Confirme com compliance e negócio a janela mínima de recuperação exigida para cada ambiente."
                    ]
                ],
                "action": [
                    "Ajuste retenção e remova snapshots",
                    "Reduza a retenção para o mínimo exigido e remova snapshots manuais obsoletos após confirmar que não são necessários."
                ],
                "caution": [
                    "Snapshot pode ser única cópia",
                    "Snapshots manuais podem ser a única recuperação de migrações ou incidentes; valide antes de excluir."
                ],
                "fontes": [
                    "RDS backups",
                    "RDS pricing"
                ]
            }
        ]
    },
    {
        "service": "amazon-s3",
        "cenarios": [
            {
                "slug": "s3-inventory-e-storage-lens-sem-acao-sobre-custos",
                "titulo": "S3 Inventory e Storage Lens Ativos sem Ação sobre os Dados",
                "resumo": "Verifique se relatórios de inventário e métricas de storage estão gerando custo sem gerar decisões de ciclo de vida ou redução.",
                "checks": [
                    [
                        "Liste recursos de análise",
                        "Identifique buckets com Inventory, Storage Lens e métricas ativados e compare o custo gerado com as decisões tomadas."
                    ],
                    [
                        "Avalie a frequência dos relatórios",
                        "Para cada recurso, confira se o inventário diário e as métricas detalhadas são realmente usados por alguém."
                    ]
                ],
                "action": [
                    "Reduza frequência ou desative",
                    "Ajuste inventários para semanal ou desative os não utilizados; mantenha apenas os que alimentam decisões de lifecycle reais."
                ],
                "caution": [
                    "Inventário é base para compliance",
                    "Setores regulados podem exigir inventário contínuo para auditoria; confirme antes de reduzir."
                ],
                "fontes": [
                    "S3 Inventory",
                    "S3 Storage Lens",
                    "S3 pricing"
                ]
            },
            {
                "slug": "transferencia-de-dados-para-fora-da-aws-sem-vpc-endpoint",
                "titulo": "Transferência de Dados para Fora da AWS sem VPC Endpoint",
                "resumo": "Avalie se o acesso a buckets S3 a partir de VPCs públicas está gerando custos de data transfer que um endpoint eliminaria.",
                "checks": [
                    [
                        "Meça o volume transferido",
                        "Use o S3 Storage Lens e métricas de rede para estimar GB transferidos entre VPC e S3 fora da AWS."
                    ],
                    [
                        "Verifique o caminho atual",
                        "Confirme se as aplicações acessam o S3 pela internet pública ou já usam endpoint de gateway/interface."
                    ]
                ],
                "action": [
                    "Crie VPC endpoints de gateway",
                    "Para tráfego S3 dentro da VPC, crie um endpoint de gateway gratuito e ajuste as route tables das sub-redes privadas."
                ],
                "caution": [
                    "Endpoint não elimina todos os custos",
                    "Transferência intra-região via endpoint ainda pode ter custo de dados; valide o cenário completo antes de prometer economia."
                ],
                "fontes": [
                    "S3 VPC endpoints",
                    "VPC endpoints",
                    "S3 pricing"
                ]
            },
            {
                "slug": "s3-access-points-e-replicacao-de-excesso",
                "titulo": "S3 Access Points e Replicação Configurados sem Uso Efetivo",
                "resumo": "Identifique access points e regras de replicação criados para cenários que não existem mais ou nunca foram usados.",
                "checks": [
                    [
                        "Audite access points",
                        "Liste access points por bucket e verifique métricas de requisições para identificar os sem tráfego."
                    ],
                    [
                        "Revise regras de replicação",
                        "Confira replication rules ativas e se os destinos ainda recebem objetos ou ficaram defasados."
                    ]
                ],
                "action": [
                    "Remova o que não é usado",
                    "Delete access points sem consumidores e replique apenas o que a política de recuperação exige; documente as remoções."
                ],
                "caution": [
                    "Access point pode ser contrato",
                    "Aplicações podem referenciar access points por ARN; confirme consumidores antes de remover."
                ],
                "fontes": [
                    "S3 access points",
                    "S3 replication",
                    "S3 pricing"
                ]
            }
        ]
    },
    {
        "service": "aws-lambda",
        "cenarios": [
            {
                "slug": "funcoes-lambda-com-erro-recorrente-gerando-custo-de-retry",
                "titulo": "Funções Lambda com Erro Recorrente Gerando Custo de Retry",
                "resumo": "Avalie funções que falham e são retentadas automaticamente, multiplicando invocações e custo sem entregar resultado.",
                "checks": [
                    [
                        "Meça taxa de erro por função",
                        "No CloudWatch, compare Invocations, Errors e DeadLetterErrors para identificar funções com falha acima de 1%."
                    ],
                    [
                        "Identifique a causa raiz",
                        "Revise logs das funções com mais erros e verifique se a falha é de código, permissão ou dependência externa."
                    ]
                ],
                "action": [
                    "Corrija ou desative a função",
                    "Corrija o bug, ajuste a configuração ou desative funções obsoletas; configure DLQ e alarmes para falhas futuras."
                ],
                "caution": [
                    "Retry pode ser intencional",
                    "Algumas funções precisam de retry para consistência; ajuste MaxReceiveCount e backoff em vez de remover."
                ],
                "fontes": [
                    "Lambda error handling",
                    "Lambda pricing"
                ]
            },
            {
                "slug": "lambda-snapstart-sem-beneficio-de-cold-start",
                "titulo": "Lambda SnapStart Ativado sem Benefício de Cold Start",
                "resumo": "Verifique se SnapStart está habilitado em funções onde o custo adicional de snapshot não se paga em latência.",
                "checks": [
                    [
                        "Identifique funções com SnapStart",
                        "Liste funções com SnapStart ativo e compare init duration antes e depois da ativação."
                    ],
                    [
                        "Avalie a criticidade de latência",
                        "Para cada função, verifique se o cold start impacta SLA ou se a latência extra é irrelevante."
                    ]
                ],
                "action": [
                    "Desative onde não compensa",
                    "Para funções assíncronas ou não críticas, desative SnapStart e compare custo; mantenha apenas onde a latência é requisito."
                ],
                "caution": [
                    "SnapStart tem custo por snapshot",
                    "O armazenamento de snapshots é cobrado; desativar pode aumentar cold starts em funções críticas."
                ],
                "fontes": [
                    "Lambda SnapStart",
                    "Lambda pricing"
                ]
            },
            {
                "slug": "funcoes-lambda-duplicadas-por-equipes-diferentes",
                "titulo": "Funções Lambda Duplicadas por Equipes Diferentes",
                "resumo": "Identifique funções com lógica semelhante criadas por equipes distintas, gerando custo e manutenção duplicados.",
                "checks": [
                    [
                        "Agrupe funções por similaridade",
                        "Liste funções por runtime, memória e tags para identificar duplicatas prováveis."
                    ],
                    [
                        "Mapeie os consumidores",
                        "Para cada par de duplicatas, identifique quais aplicações chamam cada função e se podem ser consolidadas."
                    ]
                ],
                "action": [
                    "Consolide em função compartilhada",
                    "Crie uma função única com parâmetros ou use Lambda Layers para código comum; migre consumidores gradualmente."
                ],
                "caution": [
                    "Acoplamento entre equipes",
                    "Funções compartilhadas criam dependência entre times; documente ownership e versionamento."
                ],
                "fontes": [
                    "Lambda layers",
                    "Lambda pricing"
                ]
            }
        ]
    },
    {
        "service": "amazon-ecs",
        "cenarios": [
            {
                "slug": "servicos-ecs-com-desired-count-fixo-sem-escala",
                "titulo": "Serviços ECS com Desired Count Fixo sem Auto Scaling",
                "resumo": "Avalie serviços com número fixo de tarefas que ficam ociosos fora do horário de pico ou durante baixas temporadas.",
                "checks": [
                    [
                        "Meça CPU e memória por serviço",
                        "Use Container Insights para identificar serviços com utilização média abaixo de 30%."
                    ],
                    [
                        "Mapeie o padrão de tráfego",
                        "Compare requisições por hora e dia da semana para definir janelas de escala."
                    ]
                ],
                "action": [
                    "Configure Application Auto Scaling",
                    "Ative target tracking por CPU/memória ou scheduled scaling para reduzir tarefas em horários de baixo uso."
                ],
                "caution": [
                    "Escala mínima afeta disponibilidade",
                    "Defina desired count mínimo que garanta SLA; testes de carga devem validar o comportamento."
                ],
                "fontes": [
                    "ECS service auto scaling",
                    "ECS pricing"
                ]
            },
            {
                "slug": "clusters-ecs-com-tasks-de-homologacao-24-7",
                "titulo": "Clusters ECS com Tasks de Homologação Ativas 24/7",
                "resumo": "Verifique se ambientes de desenvolvimento e staging consomem Fargate ou EC2 continuamente sem uso fora do expediente.",
                "checks": [
                    [
                        "Separe produção de não-produção",
                        "Use tags para identificar clusters e serviços de dev/hml e compare o custo horário."
                    ],
                    [
                        "Confirme janelas de uso",
                        "Valide com as equipes os horários de testes e se a disponibilidade 24/7 é realmente necessária."
                    ]
                ],
                "action": [
                    "Agende start/stop ou reduza capacidade",
                    "Para Fargate, reduza desired count fora do horário; para EC2, use instâncias Spot ou agende stop/start."
                ],
                "caution": [
                    "Dados efêmeros em Fargate",
                    "Parar tasks pode perder dados em containers; use EFS ou S3 para estado persistente."
                ],
                "fontes": [
                    "ECS scheduled tasks",
                    "ECS pricing"
                ]
            },
            {
                "slug": "imagens-ecr-sem-lifecycle-policy-acumulando-custo",
                "titulo": "Imagens ECR sem Lifecycle Policy Acumulando Custo de Storage",
                "resumo": "Verifique repositórios ECR sem regras de expiração que acumulam imagens antigas e aumentam o custo de armazenamento.",
                "checks": [
                    [
                        "Liste repositórios sem lifecycle",
                        "No console ECR, identifique repositórios sem lifecycle policy e estime o tamanho acumulado."
                    ],
                    [
                        "Mapeie imagens em uso",
                        "Confirme quais tags de imagem estão referenciadas por task definitions e quais são obsoletas."
                    ]
                ],
                "action": [
                    "Crie lifecycle policies",
                    "Configure regras para manter apenas as últimas N imagens ou imagens com menos de X dias; teste em repositório de homologação."
                ],
                "caution": [
                    "Rollback pode precisar de imagem antiga",
                    "Mantenha imagens de versões estáveis para rollback; não apague tags referenciadas em produção."
                ],
                "fontes": [
                    "ECR lifecycle policies",
                    "ECR pricing"
                ]
            }
        ]
    },
    {
        "service": "amazon-cloudwatch",
        "cenarios": [
            {
                "slug": "metricas-customizadas-de-alta-cardinalidade",
                "titulo": "Métricas Customizadas de Alta Cardinalidade Gerando Custo Excessivo",
                "resumo": "Avalie métricas customizadas com muitas dimensões únicas que multiplicam o custo por métrica publicada.",
                "checks": [
                    [
                        "Identifique métricas com alta cardinalidade",
                        "No CloudWatch, liste custom namespaces e conte dimensões únicas por métrica."
                    ],
                    [
                        "Meça o custo por namespace",
                        "Use Cost Explorer para comparar o custo de métricas customizadas versus métricas padrão do AWS."
                    ]
                ],
                "action": [
                    "Agregue ou remova dimensões",
                    "Reduza dimensões desnecessárias, use aggregate metrics ou migre para Embedded Metric Format com sampling."
                ],
                "caution": [
                    "Métricas podem ser usadas em alarmes",
                    "Antes de remover dimensões, verifique se alarmes ou dashboards dependem delas."
                ],
                "fontes": [
                    "CloudWatch metrics",
                    "CloudWatch pricing"
                ]
            },
            {
                "slug": "logs-de-aplicacao-sem-amostragem-em-producao",
                "titulo": "Logs de Aplicação sem Amostragem em Produção",
                "resumo": "Verifique se aplicações emitem logs em nível DEBUG/TRACE em produção, gerando ingestão e armazenamento desnecessários.",
                "checks": [
                    [
                        "Meça a ingestão por log group",
                        "Compare IncomingBytes por log group e identifique os com maior volume."
                    ],
                    [
                        "Revise o nível de log configurado",
                        "Confirme se DEBUG ou TRACE estão ativos em produção e se são necessários para troubleshooting."
                    ]
                ],
                "action": [
                    "Ajuste nível e adicione sampling",
                    "Mude para INFO/WARN em produção, implemente sampling para logs de debug e use Log Insights para consultas pontuais."
                ],
                "caution": [
                    "Logs podem ser exigidos por compliance",
                    "Setores regulados podem exigir retenção e nível específico; valide antes de reduzir."
                ],
                "fontes": [
                    "CloudWatch Logs",
                    "CloudWatch pricing"
                ]
            },
            {
                "slug": "alarms-de-custo-sem-acao-automatizada",
                "titulo": "Alarmes de Custo sem Ação Automatizada Gerando Apenas Notificação",
                "resumo": "Verifique alarmes de billing que notificam mas não disparam ações, resultando em custo acumulado sem resposta.",
                "checks": [
                    [
                        "Liste alarmes de custo",
                        "Identifique alarmes baseados em EstimatedCharges ou métricas de billing e suas ações configuradas."
                    ],
                    [
                        "Avalie o tempo de resposta",
                        "Compare o momento do alarme com a ação tomada para medir a eficácia do processo."
                    ]
                ],
                "action": [
                    "Adicione ações automatizadas",
                    "Integre com SNS, Lambda ou Systems Manager para executar runbooks automáticos quando o custo exceder thresholds."
                ],
                "caution": [
                    "Ações automáticas podem ser arriscadas",
                    "Parar recursos automaticamente pode afetar produção; comece com notificações e ações em homologação."
                ],
                "fontes": [
                    "CloudWatch billing alarms",
                    "CloudWatch pricing"
                ]
            }
        ]
    }
];
