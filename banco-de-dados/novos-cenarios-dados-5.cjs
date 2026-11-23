// Novos cenarios de custo por servico AWS (lote 5: mensageria, rede e governanca).
module.exports = [
    {
        service: 'amazon-sns',
        cenarios: [
            {
                slug: 'sns-topicos-com-muitos-subscribers-sem-filtro',
                titulo: 'Tópicos SNS com Muitos Subscribers sem Filtro',
                resumo: 'Avalie se tópicos SNS estão enviando mensagens para subscribers que não precisam, gerando custo de entrega desnecessária.',
                checks: [
                    ['Mapeie subscribers por tópico', 'Liste tópicos e seus subscribers para identificar os que recebem mensagens irrelevantes.'],
                    ['Avalie o volume de mensagens', 'Compare o número de publicações com o número de deliveries por subscriber.']
                ],
                action: ['Aplique filtros de mensagem', 'Configure filter policies nos subscribers para receber apenas mensagens relevantes, reduzindo deliveries.'],
                caution: ['Filtro pode bloquear mensagens necessárias', 'Testar filtros em modo de contagem antes de aplicar para não perder notificações críticas.'],
                fontes: ['SNS filtering', 'SNS pricing']
            },
            {
                slug: 'sns-sms-sem-limite-de-taxa-por-endpoint',
                titulo: 'SNS SMS sem Limite de Taxa por Endpoint',
                resumo: 'Verifique se SMS estão sendo enviados sem throttling, gerando custo de mensagens duplicadas ou excessivas.',
                checks: [
                    ['Identifique endpoints SMS', 'Liste subscriptions SMS e compare o volume de mensagens enviadas.'],
                    ['Meça duplicatas', 'Avalie se há reenvios automáticos ou retries que multiplicam o custo de SMS.']
                ],
                action: ['Configure throttling e deduplicação', 'Implemente limites de taxa por endpoint e deduplicação para evitar SMS duplicados.'],
                caution: ['SMS pode ser crítico', 'Notificações SMS podem ser para alertas urgentes; não limite de forma que atrase entregas importantes.'],
                fontes: ['SNS SMS', 'SNS pricing']
            },
            {
                slug: 'sns-topicos-de-teste-sem-limpeza',
                titulo: 'Tópicos SNS de Teste sem Limpeza',
                resumo: 'Identifique tópicos criados para testes ou integrações antigas que continuam recebendo publicações.',
                checks: [
                    ['Liste tópicos por nome', 'Identifique tópicos com nomes de teste, dev ou de projetos encerrados.'],
                    ['Verifique atividade recente', 'Compare o número de publicações nos últimos 30 dias para tópicos suspeitos.']
                ],
                action: ['Delete tópicos ociosos', 'Remova tópicos sem publicações recentes e documente os que forem mantidos para integrações futuras.'],
                caution: ['Tópico pode ser usado por parceiro', 'Integrações externas podem depender do tópico; confirme antes de remover.'],
                fontes: ['SNS topics', 'SNS pricing']
            }
        ]
    },
    {
        service: 'amazon-sqs',
        cenarios: [
            {
                slug: 'sqs-filas-com-mensagens-grandes-demais',
                titulo: 'Filas SQS com Mensagens Grandes Demais',
                resumo: 'Avalie se mensagens estão próximos do limite de 256KB, gerando custo de transferência e possível necessidade de S3.',
                checks: [
                    ['Meça o tamanho médio', 'Use as métricas do SQS para estimar o tamanho médio das mensagens por fila.'],
                    ['Identifique payloads grandes', 'Liste filas que transportam arquivos ou dados que poderiam ir direto ao S3.']
                ],
                action: ['Use S3 para payloads grandes', 'Para mensagens grandes, envie apenas a referência S3 no SQS e o conteúdo no bucket, reduzindo custo de transferência.'],
                caution: ['Referência S3 adiciona complexidade', 'Consumidores precisam buscar o conteúdo no S3; implemente retry e tratamento de erro.'],
                fontes: ['SQS message size', 'SQS pricing']
            },
            {
                slug: 'sqs-fifo-sem-necessidade-de-ordenacao',
                titulo: 'Filas SQS FIFO sem Necessidade de Ordenação',
                resumo: 'Avalie se filas FIFO estão sendo usadas para casos que não exigem ordenação estrita, pagando mais por requisição.',
                checks: [
                    ['Identifique filas FIFO', 'Liste filas por tipo e compare com o requisito de ordenação do caso de uso.'],
                    ['Avalie o custo por requisição', 'Compare o custo de FIFO versus Standard para o mesmo volume de mensagens.']
                ],
                action: ['Migre para Standard quando possível', 'Para casos que toleram reordenação, Standard é mais barato e tem maior throughput.'],
                caution: ['FIFO garante ordenação e deduplicação', 'Aplicações que dependem de ordem estrita precisam de FIFO; valide o requisito antes de migrar.'],
                fontes: ['SQS FIFO', 'SQS pricing']
            },
            {
                slug: 'sqs-long-polling-desabilitado-gerando-consultas-vazias',
                titulo: 'SQS com Long Polling Desabilitado Gerando Consultas Vazias',
                resumo: 'Verifique se consumers estão fazendo polling curto, gerando requisições vazias que aumentam custo sem processar mensagens.',
                checks: [
                    ['Identifique consumidores', 'Liste aplicações que consomem SQS e verifique se usam WaitTimeSeconds > 0.'],
                    ['Meça a taxa de consultas vazias', 'Compare ReceiveMessage calls com mensagens recebidas para ver a eficiência do polling.']
                ],
                action: ['Habilite long polling', 'Configure WaitTimeSeconds entre 10-20 para reduzir requisições vazias e custo de API.'],
                caution: ['Long polling aumenta latência', 'Aguardar até 20s pode atrasar o processamento; ajuste conforme o SLA.'],
                fontes: ['SQS long polling', 'SQS pricing']
            }
        ]
    },
    {
        service: 'amazon-vpc',
        cenarios: [
            {
                slug: 'vpc-flow-logs-sem-filtro-gerando-volume-excessivo',
                titulo: 'VPC Flow Logs sem Filtro Gerando Volume Excessivo',
                resumo: 'Avalie se flow logs estão capturando todo o tráfego sem filtros, gerando ingestão e storage desnecessários.',
                checks: [
                    ['Identifique flow logs ativos', 'Liste flow logs por VPC e verifique se têm filtros de tráfego configurados.'],
                    ['Meça o volume de dados', 'Compare o volume de logs com o valor da auditoria ou troubleshooting que eles fornecem.']
                ],
                action: ['Aplique filtros de tráfego', 'Configure filtros para capturar apenas tráfego rejeitado ou de portas específicas, reduzindo o volume.'],
                caution: ['Filtro pode perder dados necessários', 'Para auditoria completa, filtros podem ser inaceitáveis; valide com compliance.'],
                fontes: ['VPC Flow Logs', 'VPC pricing']
            },
            {
                slug: 'vpc-endpoints-de-interface-sem-uso-efetivo',
                titulo: 'VPC Endpoints de Interface sem Uso Efetivo',
                resumo: 'Verifique se interface endpoints estão provisionados para serviços que não são mais acessados via VPC.',
                checks: [
                    ['Liste endpoints por serviço', 'Identifique interface endpoints e compare com os serviços realmente usados pelas aplicações.'],
                    ['Meça o tráfego por endpoint', 'Use as métricas do endpoint para ver se há dados sendo transferidos.']
                ],
                action: ['Remova endpoints ociosos', 'Delete interface endpoints sem tráfego e documente os que forem mantidos para serviços críticos.'],
                caution: ['Endpoint pode ser usado intermitentemente', 'Serviços podem ser acessados raramente mas ainda necessários; confirme antes de remover.'],
                fontes: ['VPC endpoints', 'VPC pricing']
            },
            {
                slug: 'subnets-publicas-com-recursos-que-deveriam-ser-privados',
                titulo: 'Subnets Públicas com Recursos que Deveriam ser Privados',
                resumo: 'Identifique recursos em subnets públicas que não precisam de acesso à internet, aumentando superfície de ataque e custo.',
                checks: [
                    ['Mapeie recursos por subnet', 'Liste instâncias e serviços por tipo de subnet (pública/privada) e identifique os mal posicionados.'],
                    ['Avalie a necessidade de IP público', 'Para cada recurso em subnet pública, confirme se precisa de acesso direto à internet.']
                ],
                action: ['Migre para subnets privadas', 'Para recursos sem necessidade de IP público, mova para subnets privadas com NAT Gateway ou VPC endpoints.'],
                caution: ['Migração pode afetar conectividade', 'Recursos podem depender de IP público para integrações; teste antes de mover.'],
                fontes: ['VPC subnets', 'VPC pricing']
            }
        ]
    },
    {
        service: 'amazon-workspaces',
        cenarios: [
            {
                slug: 'workspaces-desktops-sem-auto-stop',
                titulo: 'WorkSpaces Desktops sem Auto Stop',
                resumo: 'Avalie se desktops estão configurados para desligar automaticamente fora do horário de trabalho.',
                checks: [
                    ['Identifique desktops sempre ligados', 'Liste WorkSpaces por status e verifique se há desktops InUse fora do expediente.'],
                    ['Meça o tempo de uso', 'Compare o tempo de uso com o horário comercial para ver se há ociosidade.']
                ],
                action: ['Configure auto stop', 'Defina auto stop para horários fora do expediente e implemente AlwaysOn apenas para casos específicos.'],
                caution: ['Auto stop pode perder trabalho', 'Usuários podem perder trabalho não salvo; configure timeout adequado e oriente a equipe.'],
                fontes: ['WorkSpaces auto stop', 'WorkSpaces pricing']
            },
            {
                slug: 'workspaces-bundles-com-mais-recursos-que-o-necessario',
                titulo: 'WorkSpaces Bundles com Mais Recursos que o Necessário',
                resumo: 'Avalie se bundles estão configurados com vCPU e memória acima do necessário para as aplicações dos usuários.',
                checks: [
                    ['Mapeie bundles por uso', 'Identifique bundles e compare com o uso real de CPU e memória dos desktops.'],
                    ['Avalie as aplicações', 'Confirme se as aplicações justificam os recursos do bundle ou se um menor seria suficiente.']
                ],
                action: ['Reduza o bundle', 'Para usuários com baixo uso, migre para bundles menores e monitore a satisfação.'],
                caution: ['Bundle menor pode afetar performance', 'Usuários podem sentir lentidão; teste com grupo piloto antes de migrar todos.'],
                fontes: ['WorkSpaces bundles', 'WorkSpaces pricing']
            },
            {
                slug: 'workspaces-sempre-ligados-para-usuarios-eventuais',
                titulo: 'WorkSpaces Sempre Ligados para Usuários Eventuais',
                resumo: 'Identifique desktops AlwaysOn para usuários que acessam raramente, gerando custo de compute contínuo.',
                checks: [
                    ['Liste desktops AlwaysOn', 'Identifique WorkSpaces com modo AlwaysOn e verifique a frequência de uso real.'],
                    ['Compare com AutoStop', 'Estime a economia de mudar para AutoStop para usuários com acesso esporádico.']
                ],
                action: ['Mude para AutoStop quando possível', 'Para usuários que não precisam de disponibilidade imediata, AutoStop reduz significativamente o custo.'],
                caution: ['AlwaysOn tem boot rápido', 'Usuários que precisam de acesso imediato podem preferir AlwaysOn; avalie o trade-off.'],
                fontes: ['WorkSpaces modes', 'WorkSpaces pricing']
            }
        ]
    },
    {
        service: 'aws-batch',
        cenarios: [
            {
                slug: 'batch-compute-environment-sem-spot-diversification',
                titulo: 'Compute Environment Batch sem Spot Diversification',
                resumo: 'Avalie se compute environments estão usando apenas um tipo de instância Spot, aumentando o risco de interrupção.',
                checks: [
                    ['Identifique tipos de instância', 'Liste compute environments e os tipos de instância configurados para Spot.'],
                    ['Meça a taxa de interrupção', 'Compare spot interruption rates por tipo para ver quais são mais estáveis.']
                ],
                action: ['Diversifique tipos de instância', 'Configure múltiplos tipos de instância compatíveis para reduzir interrupções e melhorar capacidade.'],
                caution: ['Diversificação pode aumentar custo', 'Tipos diferentes têm preços diferentes; equilibre economia com risco.'],
                fontes: ['Batch compute environments', 'Batch pricing']
            },
            {
                slug: 'batch-jobs-sem-timeout-configurado',
                titulo: 'Jobs Batch sem Timeout Configurado',
                resumo: 'Verifique se jobs não têm timeout definido, podendo rodar indefinidamente e acumular custo.',
                checks: [
                    ['Liste jobs sem timeout', 'Identifique job definitions sem timeout ou com timeout muito alto.'],
                    ['Identifique jobs travados', 'Use o console para ver jobs em RUNNABLE ou STARTING por tempo excessivo.']
                ],
                action: ['Configure timeouts adequados', 'Defina timeout por job definition baseado no tempo esperado de execução mais margem.'],
                caution: ['Timeout muito baixo mata jobs válidos', 'Jobs longos legítimos podem ser interrompidos; ajuste por tipo de job.'],
                fontes: ['Batch job timeout', 'Batch pricing']
            },
            {
                slug: 'batch-compute-environment-minvcpus-alto-demais',
                titulo: 'Compute Environment Batch com MinvCpus Alto Demais',
                resumo: 'Avalie se minvCpus está configurado alto, mantendo instâncias ativas mesmo sem jobs na fila.',
                checks: [
                    ['Identifique minvCpus por ambiente', 'Liste compute environments e seus valores de minvCpus.'],
                    ['Meça a utilização', 'Compare o número de vCPUs em uso com o mínimo configurado para ver ociosidade.']
                ],
                action: ['Reduza minvCpus', 'Para ambientes com jobs esporádicos, reduza minvCpus para 0 ou valor baixo e deixe o scale-up automático.'],
                caution: ['MinvCpus alto reduz latência', 'Jobs podem esperar mais por instâncias; equilibre custo com tempo de espera.'],
                fontes: ['Batch scaling', 'Batch pricing']
            }
        ]
    },
    {
        service: 'aws-cloudtrail',
        cenarios: [
            {
                slug: 'cloudtrail-logs-de-leitura-sem-necessidade-de-auditoria',
                titulo: 'CloudTrail com Logs de Leitura sem Necessidade de Auditoria',
                resumo: 'Avalie se trails estão configurando data events e read events quando apenas write events são necessários.',
                checks: [
                    ['Audite a configuração de eventos', 'Liste trails e verifique se capturam read events ou data events desnecessários.'],
                    ['Meça o volume de logs', 'Compare o volume de eventos por tipo para ver o que gera mais custo.']
                ],
                action: ['Restrinja tipos de eventos', 'Para trails que não precisam de auditoria completa, desabilite read events ou data events.'],
                caution: ['Read events podem ser exigidos', 'Compliance pode exigir log de leitura; confirme requisitos antes de desabilitar.'],
                fontes: ['CloudTrail event selectors', 'CloudTrail pricing']
            },
            {
                slug: 'cloudtrail-logs-sem-lifecycle-policy',
                titulo: 'CloudTrail Logs sem Lifecycle Policy',
                resumo: 'Verifique se logs do CloudTrail acumulam no S3 sem expiração, aumentando custo de storage indefinidamente.',
                checks: [
                    ['Identifique buckets de logs', 'Liste buckets de destino do CloudTrail e verifique se têm lifecycle policy.'],
                    ['Meça a retenção atual', 'Estime quantos dias de logs estão armazenados e o custo mensal.']
                ],
                action: ['Configure lifecycle no bucket', 'Adicione regras de expiração para logs com mais de X dias, mantendo o período exigido por compliance.'],
                caution: ['Logs podem ser auditados', 'Compliance pode exigir retenção de longo prazo; confirme o período mínimo.'],
                fontes: ['CloudTrail S3', 'S3 lifecycle', 'CloudTrail pricing']
            },
            {
                slug: 'cloudtrail-multi-region-sem-necessidade',
                titulo: 'CloudTrail Multi-Region sem Necessidade',
                resumo: 'Avalie se trails multi-region estão ativos em contas que operam em uma única região.',
                checks: [
                    ['Identifique trails multi-region', 'Liste trails e verifique se são multi-region ou single-region.'],
                    ['Confirme regiões em uso', 'Verifique em quantas regiões a conta realmente opera e se todas precisam de auditoria.']
                ],
                action: ['Restrinja a regiões usadas', 'Para contas single-region, desabilite multi-region trail e crie trails específicos apenas onde necessário.'],
                caution: ['Multi-region é boa prática', 'Segurança pode exigir visibilidade global; avalie o trade-off para contas críticas.'],
                fontes: ['CloudTrail multi-region', 'CloudTrail pricing']
            }
        ]
    },
    {
        service: 'aws-config',
        cenarios: [
            {
                slug: 'config-recorder-todos-os-recursos-sem-filtro',
                titulo: 'Config Recorder Registrando Todos os Recursos sem Filtro',
                resumo: 'Avalie se recorders estão capturando todos os tipos de recurso quando apenas alguns são relevantes para compliance.',
                checks: [
                    ['Identifique recorders ativos', 'Liste configuration recorders e verifique se usam allSupported ou recursos específicos.'],
                    ['Meça o volume de configurações', 'Compare o número de configuration items com o valor da auditoria.']
                ],
                action: ['Restrinja tipos de recurso', 'Para compliance específico, configure recorders apenas para os tipos de recurso relevantes.'],
                caution: ['Restringir pode perder visibilidade', 'Novos recursos podem não ser capturados; revise periodicamente a cobertura.'],
                fontes: ['Config recorders', 'Config pricing']
            },
            {
                slug: 'config-rules-sem-remediacao-automaticamente',
                titulo: 'Config Rules sem Remediação Automática',
                resumo: 'Verifique se regras de compliance estão apenas notificando sem auto-remediação, gerando trabalho manual recorrente.',
                checks: [
                    ['Identifique regras sem remediação', 'Liste config rules e verifique quais têm remediation action configurada.'],
                    ['Meça violações recorrentes', 'Compare o número de violações por regra para ver quais são sistêmicas.']
                ],
                action: ['Implemente auto-remediação', 'Para violações recorrentes e de baixo risco, configure auto-remediation via SSM Automation.'],
                caution: ['Auto-remediação pode ser arriscada', 'Ações automáticas podem afetar produção; teste em homologação e comece com regras de baixo risco.'],
                fontes: ['Config remediation', 'Config pricing']
            },
            {
                slug: 'config-conformance-pack-sem-uso',
                titulo: 'Config Conformance Pack sem Uso',
                resumo: 'Identifique conformance packs habilitados para frameworks que não são mais usados ou necessários.',
                checks: [
                    ['Liste conformance packs', 'Identifique packs habilitados e verifique se estão sendo usados para auditoria.'],
                    ['Avalie o compliance score', 'Compare o score de conformidade com os requisitos atuais do negócio.']
                ],
                action: ['Desabilite packs ociosos', 'Para packs sem uso, desabilite a gravação de conformidade e remova se não houver plano.'],
                caution: ['Conformance pack pode ser exigido', 'Auditorias podem exigir packs específicos; confirme antes de desabilitar.'],
                fontes: ['Config conformance packs', 'Config pricing']
            }
        ]
    }
];
