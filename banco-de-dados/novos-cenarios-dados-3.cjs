// Novos cenarios de custo por servico AWS (lote 3: rede, borda e integracao).
module.exports = [
    {
        service: 'amazon-api-gateway',
        cenarios: [
            {
                slug: 'api-gateway-rest-sem-cache-em-endpoints-de-leitura',
                titulo: 'API Gateway REST sem Cache em Endpoints de Leitura',
                resumo: 'Avalie se endpoints de leitura intensiva do API Gateway poderiam usar cache para reduzir invocações e custo de processamento.',
                checks: [
                    ['Identifique endpoints de leitura', 'Liste métodos GET com alto volume de requisições e baixa mutação de dados.'],
                    ['Meça a taxa de acerto potencial', 'Estime quantas requisições retornariam a mesma resposta dentro do TTL de cache aceitável.']
                ],
                action: ['Habilite cache por endpoint', 'Configure cache em métodos de leitura com TTL adequado e invalide por chave quando dados mudarem.'],
                caution: ['Cache pode servir dados velhos', 'Respostas cacheadas ficam obsoletas até o TTL; use invalidação para dados que precisam de consistência.'],
                fontes: ['API Gateway caching', 'API Gateway pricing']
            },
            {
                slug: 'api-gateway-http-vs-rest-custo-por-requisicao',
                titulo: 'API Gateway REST vs HTTP API sem Justificativa de Custo',
                resumo: 'Verifique se APIs REST estão sendo usadas para casos simples onde HTTP APIs teriam custo por requisição menor.',
                checks: [
                    ['Compare os tipos de API', 'Liste APIs REST e HTTP e identifique quais usam recursos REST que a HTTP API não oferece.'],
                    ['Avalie features utilizadas', 'Verifique se as APIs REST usam request validation, usage plans ou outras features exclusivas.']
                ],
                action: ['Migre para HTTP API quando possível', 'Para APIs simples sem validação complexa, HTTP API pode ter custo até 70% menor por requisição.'],
                caution: ['REST tem features exclusivas', 'Usage plans, API keys e request validation são exclusivos de REST; migre apenas o que for compatível.'],
                fontes: ['API Gateway types', 'API Gateway pricing']
            },
            {
                slug: 'api-gateway-usage-plans-sem-controle-de-cota',
                titulo: 'Usage Plans do API Gateway sem Controle de Cota Eficaz',
                resumo: 'Verifique se usage plans estão configurados mas não limitam o consumo de clientes, resultando em custo de requisições acima do previsto.',
                checks: [
                    ['Audite quotas por cliente', 'Liste usage plans e compare as cotas configuradas com o consumo real por API key.'],
                    ['Identifique clientes acima da cota', 'Use métricas do API Gateway para ver quais chaves excedem consistentemente o limite.']
                ],
                action: ['Ajuste cotas ou implemente throttling', 'Reduza cotas para clientes que excedem ou configure throttling por método para limitar picos de custo.'],
                caution: ['Cota muito baixa afeta clientes', 'Clientes legítimos podem ser bloqueados; ajuste com base em dados de consumo e comunicação prévia.'],
                fontes: ['API Gateway usage plans', 'API Gateway pricing']
            }
        ]
    },
    {
        service: 'amazon-athena',
        cenarios: [
            {
                slug: 'athena-consultas-sem-particionamento-varrendo-dados',
                titulo: 'Consultas Athena sem Particionamento Varrendo Dados Desnecessários',
                resumo: 'Avalie se tabelas no Athena não usam particionamento, fazendo scans completos em vez de filtrar por partição.',
                checks: [
                    ['Identifique tabelas sem partição', 'Liste tabelas Glue/Athena e verifique quais não têm colunas de partição configuradas.'],
                    ['Meça bytes escaneados por consulta', 'Use as métricas de DataScannedBytes para ver consultas que varrem mais dados que o necessário.']
                ],
                action: ['Adicione particionamento', 'Reestruture tabelas com partições por data ou categoria e atualize as queries para filtrar por partição.'],
                caution: ['Particionamento exige manutenção', 'Novas partições precisam ser registradas; use crawlers ou MSCK REPAIR TABLE para manter atualizado.'],
                fontes: ['Athena partitioning', 'Athena pricing']
            },
            {
                slug: 'athena-workgroup-sem-limite-de-custo-por-consulta',
                titulo: 'Workgroups Athena sem Limite de Custo por Consulta',
                resumo: 'Verifique se workgroups não têm cutoffs de bytes escaneados, permitindo consultas custosas sem controle.',
                checks: [
                    ['Audite configurações de workgroup', 'Liste workgroups e verifique se têm bytes scanned cutoff configurado.'],
                    ['Identifique consultas custosas', 'Use o query history para encontrar consultas que escanearam volumes anormais de dados.']
                ],
                action: ['Configure cutoffs e alertas', 'Defina bytes scanned cutoff por workgroup e crie alarmes para consultas que excedem o limite.'],
                caution: ['Cutoff muito baixo quebra queries', 'Consultas legítimas podem falhar se o cutoff for muito restritivo; ajuste por workgroup conforme o uso.'],
                fontes: ['Athena workgroups', 'Athena pricing']
            },
            {
                slug: 'athena-resultados-sem-expiracao-acumulando-storage',
                titulo: 'Resultados Athena sem Expiração Acumulando Storage no S3',
                resumo: 'Verifique se o bucket de resultados do Athena acumula arquivos de saída sem lifecycle policy, aumentando custo de storage.',
                checks: [
                    ['Localize o bucket de resultados', 'Identifique o local de saída configurado nos workgroups e verifique o volume de dados.'],
                    ['Avalie a política de lifecycle', 'Confirme se há regras de expiração para resultados antigos ou se acumulam indefinidamente.']
                ],
                action: ['Configure lifecycle no bucket', 'Adicione regras de expiração para resultados com mais de X dias, mantendo apenas os necessários para auditoria.'],
                caution: ['Resultados podem ser auditados', 'Compliance pode exigir retenção de resultados; confirme o período mínimo antes de expirar.'],
                fontes: ['Athena query results', 'S3 lifecycle', 'Athena pricing']
            }
        ]
    },
    {
        service: 'amazon-bedrock',
        cenarios: [
            {
                slug: 'bedrock-modelos-premium-para-tarefas-simples',
                titulo: 'Modelos Bedrock Premium para Tarefas Simples',
                resumo: 'Avalie se modelos mais caros estão sendo usados para tarefas que modelos menores resolveriam com qualidade suficiente.',
                checks: [
                    ['Mapeie modelos por caso de uso', 'Identifique quais modelos estão sendo invocados para cada tipo de tarefa (resumo, classificação, geração).'],
                    ['Compare custo por token', 'Estime o custo por 1K tokens de cada modelo e o volume de uso mensal.']
                ],
                action: ['Teste modelos menores', 'Para tarefas simples, avalie modelos mais baratos como Claude Haiku ou Llama e compare qualidade versus custo.'],
                caution: ['Qualidade pode degradar', 'Modelos menores podem ter pior desempenho em tarefas complexas; teste com dados reais antes de migrar.'],
                fontes: ['Bedrock models', 'Bedrock pricing']
            },
            {
                slug: 'bedrock-knowledge-bases-sem-uso-efetivo',
                titulo: 'Knowledge Bases Bedrock sem Uso Efetivo',
                resumo: 'Verifique se knowledge bases estão indexando documentos que não são consultados, gerando custo de storage e embedding.',
                checks: [
                    ['Liste knowledge bases ativas', 'Identifique knowledge bases criadas e verifique se há consultas registradas.'],
                    ['Meça o volume de documentos', 'Compare o tamanho dos dados indexados com a frequência de uso da base.']
                ],
                action: ['Remova ou pause bases ociosas', 'Para bases sem consultas recentes, pause a sincronização ou remova se não houver plano de uso.'],
                caution: ['Sincronização pode ser manual', 'Knowledge bases podem precisar de re-sync periódico; desativar pode causar dados desatualizados.'],
                fontes: ['Bedrock knowledge bases', 'Bedrock pricing']
            },
            {
                slug: 'bedrock-provisioned-throughput-sem-demanda-estavel',
                titulo: 'Bedrock Provisioned Throughput sem Demanda Estável',
                resumo: 'Avalie se provisioned throughput está contratado para demandas variáveis que seriam mais econômicas em on-demand.',
                checks: [
                    ['Meça a utilização do throughput', 'Compare o consumo real de tokens com a capacidade provisionada para ver a taxa de utilização.'],
                    ['Avalie a previsibilidade', 'Identifique se o padrão de uso é estável o suficiente para justificar o compromisso de provisioned throughput.']
                ],
                action: ['Migre para on-demand ou ajuste', 'Para demanda variável, use on-demand; para demanda estável alta, provisioned throughput pode ser mais barato.'],
                caution: ['Provisioned tem custo fixo', 'Mesmo sem uso, provisioned throughput é cobrado; avalie o break-even point com on-demand.'],
                fontes: ['Bedrock provisioned throughput', 'Bedrock pricing']
            }
        ]
    },
    {
        service: 'amazon-cloudfront',
        cenarios: [
            {
                slug: 'cloudfront-distribuicoes-sem-otimizacao-de-preco-classe',
                titulo: 'Distribuições CloudFront sem Otimização de Classe de Preço',
                resumo: 'Avalie se distribuições estão usando todas as classes de preço quando o tráfego não exige a cobertura global completa.',
                checks: [
                    ['Identifique a classe de preço', 'Liste distribuições por price class (All, 200, 100) e compare com a distribuição geográfica do tráfego.'],
                    ['Meça o tráfego por região', 'Use relatórios do CloudFront para ver de onde vêm as requisições e se regiões caras são usadas.']
                ],
                action: ['Reduza a classe de preço', 'Para distribuições com tráfego concentrado em regiões principais, use PriceClass_100 ou PriceClass_200 para reduzir custo.'],
                caution: ['Menos cobertura pode afetar latência', 'PriceClass menor exclui edges distantes; valide se a latência para usuários remotos é aceitável.'],
                fontes: ['CloudFront pricing', 'CloudFront price classes']
            },
            {
                slug: 'cloudfront-logs-de-acesso-sem-retencao-definida',
                titulo: 'Logs de Acesso CloudFront sem Retenção Definida',
                resumo: 'Verifique se logs de acesso estão sendo entregues ao S3 sem lifecycle policy, acumulando dados indefinidamente.',
                checks: [
                    ['Identifique distribuições com logging', 'Liste distribuições com logging habilitado e o bucket de destino configurado.'],
                    ['Avalie a política de lifecycle', 'Verifique se o bucket de logs tem regras de expiração para dados antigos.']
                ],
                action: ['Configure lifecycle no bucket de logs', 'Adicione regras de expiração para logs com mais de X dias, mantendo apenas o período necessário para análise.'],
                caution: ['Logs podem ser exigidos por compliance', 'Setores regulados podem exigir retenção de logs de acesso; confirme o período mínimo.'],
                fontes: ['CloudFront logging', 'S3 lifecycle', 'CloudFront pricing']
            },
            {
                slug: 'cloudfront-invalidacoes-excessivas-sem-cache-hit',
                titulo: 'Invalidações CloudFront Excessivas sem Cache Hit',
                resumo: 'Avalie se invalidações frequentes estão anulando o benefício do cache, aumentando requisições à origem e custo.',
                checks: [
                    ['Meça a taxa de invalidação', 'Compare Invalidation requests com total de requests para ver a proporção de invalidações.'],
                    ['Identifique o padrão de uso', 'Verifique se as invalidações são por path específico ou wildcard que afeta todo o conteúdo.']
                ],
                action: ['Otimize a estratégia de cache', 'Use versionamento de arquivos em vez de invalidação, aumente TTL para conteúdo estável e use tags para invalidação seletiva.'],
                caution: ['Invalidação é necessária para updates', 'Conteúdo dinâmico pode precisar de invalidação; balanceie frequência com benefício de cache.'],
                fontes: ['CloudFront invalidations', 'CloudFront caching', 'CloudFront pricing']
            }
        ]
    },
    {
        service: 'amazon-cognito',
        cenarios: [
            {
                slug: 'cognito-user-pools-sem-mfa-obrigatorio-mas-com-custo',
                titulo: 'User Pools Cognito sem MFA Obrigatório com Custo de SMS',
                resumo: 'Avalie se MFA por SMS está habilitado sem necessidade, gerando custo por mensagem quando TOTP seria gratuito.',
                checks: [
                    ['Verifique o método de MFA', 'Identifique user pools com SMS MFA habilitado e compare com TOTP ou software token.'],
                    ['Meça o volume de SMS', 'Estime o custo mensal de SMS MFA versus o benefício de segurança adicional.']
                ],
                action: ['Prefira TOTP para MFA', 'Para usuários que podem usar app autenticador, TOTP é gratuito e mais seguro que SMS; ofereça SMS apenas quando necessário.'],
                caution: ['SMS pode ser necessário para alguns usuários', 'Usuários sem smartphone ou com restrições podem precisar de SMS; ofereça ambos os métodos.'],
                fontes: ['Cognito MFA', 'Cognito pricing']
            },
            {
                slug: 'cognito-identity-pools-sem-limite-de-sessoes-anonimas',
                titulo: 'Identity Pools Cognito sem Limite de Sessões Anônimas',
                resumo: 'Verifique se identity pools permitem acesso anônimo ilimitado, gerando custo de credenciais temporárias para bots ou abuso.',
                checks: [
                    ['Audite políticas de identidade', 'Revise as políticas de IAM role para identidades não autenticadas e autenticadas.'],
                    ['Meça o volume de sessões', 'Compare o número de sessões temporárias emitidas com o número de usuários reais esperados.']
                ],
                action: ['Implemente limites e monitoramento', 'Configure limites de taxa, adicione CAPTCHA para acesso anônimo e monitore picos de sessões.'],
                caution: ['Limites podem afetar usuários legítimos', 'Picos de tráfego legítimo podem ser bloqueados; ajuste limites com base em dados históricos.'],
                fontes: ['Cognito identity pools', 'Cognito pricing']
            },
            {
                slug: 'cognito-user-pool-sem-limpeza-de-usuarios-inativos',
                titulo: 'User Pool Cognito sem Limpeza de Usuários Inativos',
                resumo: 'Avalie se usuários inativos acumulam no user pool, gerando custo de MAU (Monthly Active Users) sem valor.',
                checks: [
                    ['Identifique usuários inativos', 'Use o console ou API para listar usuários sem login há mais de X dias.'],
                    ['Meça o MAU cobrado', 'Compare o número de usuários ativos cobrados com o número de usuários que realmente acessam.']
                ],
                action: ['Implemente limpeza programada', 'Crie job para desativar ou remover usuários inativos após período de inatividade definido pela política.'],
                caution: ['Usuários podem voltar', 'Remover usuários pode impedir reativação; use status INACTIVE em vez de DELETE para permitir reversão.'],
                fontes: ['Cognito user pools', 'Cognito pricing']
            }
        ]
    },
    {
        service: 'amazon-emr',
        cenarios: [
            {
                slug: 'emr-cluster-com-master-node-superdimensionado',
                titulo: 'Cluster EMR com Master Node Superdimensionado',
                resumo: 'Avalie se o master node do EMR está com capacidade maior que o necessário para gerenciar o cluster.',
                checks: [
                    ['Meça CPU e memória do master', 'Use as métricas do EMR para comparar a utilização do master node com sua capacidade.'],
                    ['Avalie o número de core nodes', 'Verifique se o master precisa gerenciar muitos core nodes ou se a carga é leve.']
                ],
                action: ['Reduza o master node', 'Para clusters pequenos, use m5.xlarge ou menor; reserve instâncias maiores para clusters com muitas core nodes.'],
                caution: ['Master node é crítico', 'Master node down afeta todo o cluster; não reduza demais em produção sem HA.'],
                fontes: ['EMR master node', 'EMR pricing']
            },
            {
                slug: 'emr-cluster-spot-sem-estrategia-de-diversificacao',
                titulo: 'Cluster EMR Spot sem Estratégia de Diversificação',
                resumo: 'Verifique se core nodes Spot estão usando apenas um tipo de instância, aumentando o risco de interrupção e custo de retry.',
                checks: [
                    ['Identifique tipos de instância Spot', 'Liste os tipos de instância configurados para core nodes e se há diversificação.'],
                    ['Meça a taxa de interrupção', 'Compare spot interruption rates por tipo de instância para ver quais são mais estáveis.']
                ],
                action: ['Diversifique tipos de instância', 'Use múltiplos tipos de instância compatíveis para reduzir interrupções e melhorar a capacidade Spot.'],
                caution: ['Diversificação pode aumentar custo', 'Tipos diferentes têm preços diferentes; equilibre economia Spot com risco de interrupção.'],
                fontes: ['EMR Spot', 'EMR pricing']
            },
            {
                slug: 'emr-cluster-sem-auto-termination-aplicativo',
                titulo: 'Cluster EMR sem Auto Termination Após Aplicativo',
                resumo: 'Verifique se clusters EMR ficam ativos após a conclusão dos jobs, gerando custo de EC2 ocioso.',
                checks: [
                    ['Identifique clusters ativos', 'Liste clusters EMR em estado WAITING ou RUNNING e verifique se há steps em execução.'],
                    ['Meça o tempo ocioso', 'Compare o tempo desde o último step com o tempo total de vida do cluster.']
                ],
                action: ['Configure auto-termination', 'Use auto-termination policy para encerrar o cluster X minutos após o último step completar.'],
                caution: ['Auto-termination pode matar jobs longos', 'Se houver steps longos entre execuções, ajuste o timeout ou use clusters separados por workload.'],
                fontes: ['EMR auto termination', 'EMR pricing']
            }
        ]
    },
    {
        service: 'amazon-eventbridge',
        cenarios: [
            {
                slug: 'eventbridge-rules-sem-filtro-gerando-invocacoes-desnecessarias',
                titulo: 'EventBridge Rules sem Filtro Gerando Invocações Desnecessárias',
                resumo: 'Avalie se regras do EventBridge estão capturando todos os eventos de uma fonte quando um filtro mais específico reduziria custos.',
                checks: [
                    ['Identifique regras sem filtro', 'Liste regras que usam event pattern genérico ou sem filtro de campos específicos.'],
                    ['Meça a taxa de match', 'Compare o número de eventos recebidos com o número que realmente disparam ações.']
                ],
                action: ['Adicione filtros às regras', 'Refine event patterns para filtrar por source, detail-type ou campos específicos, reduzindo invocações desnecessárias.'],
                caution: ['Filtro muito restritivo perde eventos', 'Testar filtros em modo de contagem antes de aplicar para não perder eventos legítimos.'],
                fontes: ['EventBridge filtering', 'EventBridge pricing']
            },
            {
                slug: 'eventbridge-scheduler-sem-justificativa-de-frequencia',
                titulo: 'EventBridge Scheduler com Frequência Sem Justificativa',
                resumo: 'Verifique se schedules estão configurados com frequências mais altas que o necessário para o caso de uso.',
                checks: [
                    ['Liste schedules por frequência', 'Identifique schedules que executam a cada minuto ou hora quando o negócio exige menos.'],
                    ['Avalie o impacto da redução', 'Para cada schedule, confirme se reduzir a frequência afetaria SLAs ou processos críticos.']
                ],
                action: ['Reduza a frequência dos schedules', 'Ajuste cron expressions para frequências menores onde o caso de uso permitir, reduzindo invocações.'],
                caution: ['Freqüência pode ser requisito', 'Processos batch ou monitoramento podem exigir alta frequência; valide com o time antes de reduzir.'],
                fontes: ['EventBridge Scheduler', 'EventBridge pricing']
            },
            {
                slug: 'eventbridge-custom-bus-sem-uso-efetivo',
                titulo: 'Custom Event Bus sem Uso Efetivo',
                resumo: 'Identifique custom event buses criados para integrações que não estão mais ativas ou nunca foram usadas.',
                checks: [
                    ['Liste custom buses', 'Identifique event buses além do default e verifique se há regras e targets associados.'],
                    ['Meça o tráfego de eventos', 'Compare PutEvents com Invocations para ver se o bus está sendo usado ativamente.']
                ],
                action: ['Remova buses ociosos', 'Delete custom buses sem regras ou targets e documente os que forem mantidos para integrações futuras.'],
                caution: ['Bus pode ser usado por parceiros', 'Integrações externas podem depender do bus; confirme antes de remover.'],
                fontes: ['EventBridge buses', 'EventBridge pricing']
            }
        ]
    }
];
