// Novos cenarios de custo por servico AWS (lote 7: seguranca, rede e utilitarios).
module.exports = [
    {
        service: 'aws-secrets-manager',
        cenarios: [
            {
                slug: 'secrets-manager-rotacao-desabilitada-em-segredos-criticos',
                titulo: 'Secrets Manager com Rotação Desabilitada em Segredos Críticos',
                resumo: 'Avalie se segredos de banco de dados e APIs estão sem rotação automática, criando risco de segurança e custo de rotação manual.',
                checks: [
                    ['Identifique segredos sem rotação', 'Liste segredos e verifique quais têm rotação automática configurada.'],
                    ['Priorize por criticidade', 'Para segredos sem rotação, avalie o impacto de segurança e a frequência de uso.']
                ],
                action: ['Configure rotação automática', 'Para segredos de banco de dados, ative rotação com Lambda function; para APIs, use rotação manual programada.'],
                caution: ['Rotação pode quebrar aplicações', 'Aplicações que cacheiam segredos podem falhar após rotação; teste o processo de refresh.'],
                fontes: ['Secrets Manager rotation', 'Secrets Manager pricing']
            },
            {
                slug: 'secrets-manager-segredos-replicados-sem-necessidade',
                titulo: 'Secrets Manager com Segredos Replicados sem Necessidade',
                resumo: 'Avalie se segredos estão sendo replicados para regiões que não precisam, gerando custo de storage duplicado.',
                checks: [
                    ['Identifique segredos multi-região', 'Liste segredos com replicação e verifique se todas as regiões são necessárias.'],
                    ['Avalie o uso por região', 'Compare o número de acessos por região para ver onde os segredos são realmente usados.']
                ],
                action: ['Remova replicações desnecessárias', 'Delete réplicas em regiões sem uso e mantenha apenas as exigidas por DR ou baixa latência.'],
                caution: ['Replicação pode ser para DR', 'Segredos replicados podem ser necessários para disaster recovery; confirme antes de remover.'],
                fontes: ['Secrets Manager replication', 'Secrets Manager pricing']
            },
            {
                slug: 'secrets-manager-segredos-obsoletos-acumulados',
                titulo: 'Secrets Manager com Segredos Obsoletos Acumulados',
                resumo: 'Identifique segredos de projetos encerrados ou credenciais que não são mais usadas, gerando custo de storage.',
                checks: [
                    ['Liste segredos por última rotação', 'Identifique segredos sem rotação ou acesso há mais de 90 dias.'],
                    ['Verifique dependências', 'Para cada segredo obsoleto, confirme se ainda há aplicações ou processos usando-o.']
                ],
                action: ['Delete segredos obsoletos', 'Após confirmar que não há dependências, delete segredos sem uso e documente a remoção.'],
                caution: ['Segredo pode ser backup', 'Segredos podem ser mantidos para recuperação de desastre; confirme antes de deletar.'],
                fontes: ['Secrets Manager secrets', 'Secrets Manager pricing']
            }
        ]
    },
    {
        service: 'aws-shield',
        cenarios: [
            {
                slug: 'shield-advanced-sem-eventos-de-ddos-recentes',
                titulo: 'Shield Advanced sem Eventos de DDoS Recentes',
                resumo: 'Avalie se a assinatura Shield Advanced está sendo mantida sem incidentes que justifiquem o custo premium.',
                checks: [
                    ['Revisar eventos DDoS', 'Verifique o histórico de eventos DDoS detectados pelo Shield nos últimos 12 meses.'],
                    ['Avaliar o valor do serviço', 'Compare o custo do Shield Advanced com o impacto de um ataque sem proteção.']
                ],
                action: ['Avalie downgrade para Standard', 'Se não houver eventos significativos, considere Shield Standard (gratuito) ou proteção apenas em recursos críticos.'],
                caution: ['Shield Advanced tem SLA', 'Em caso de ataque, a resposta do Shield Advanced é mais rápida; avalie o risco para aplicações críticas.'],
                fontes: ['Shield Advanced', 'Shield pricing']
            },
            {
                slug: 'shield-protected-resources-sem-necessidade',
                titulo: 'Shield com Recursos Protegidos sem Necessidade',
                resumo: 'Verifique se recursos estão sendo protegidos pelo Shield Advanced sem serem críticos o suficiente para justificar o custo.',
                checks: [
                    ['Liste recursos protegidos', 'Identifique quais recursos têm proteção Shield Advanced habilitada.'],
                    ['Avalie a criticidade', 'Para cada recurso, confirme se o impacto de um ataque justificaria a proteção premium.']
                ],
                action: ['Restrinja proteção a recursos críticos', 'Desabilite Shield Advanced para recursos não críticos e mantenha apenas para aplicações de alta disponibilidade.'],
                caution: ['Proteção ampla é mais segura', 'Restringir proteção pode deixar recursos vulneráveis; avalie o risco para cada caso.'],
                fontes: ['Shield protection', 'Shield pricing']
            },
            {
                slug: 'shield-ddos-response-team-sem-uso',
                titulo: 'Shield com DDoS Response Team sem Uso',
                resumo: 'Avalie se o acesso ao DRT está sendo mantido sem incidentes que justificariam o custo de resposta dedicada.',
                checks: [
                    ['Revisar uso do DRT', 'Verifique se houve engajamento com o DDoS Response Team nos últimos 12 meses.'],
                    ['Avaliar o plano de resposta', 'Confirme se há plano de resposta a incidentes que justifique o acesso ao DRT.']
                ],
                action: ['Avalie necessidade do DRT', 'Se não houver uso, considere remover o acesso e implementar resposta interna ou via suporte padrão.'],
                caution: ['DRT é para ataques complexos', 'Em ataques sofisticados, o DRT é essencial; mantenha para aplicações críticas.'],
                fontes: ['Shield DRT', 'Shield pricing']
            }
        ]
    },
    {
        service: 'aws-storage-gateway',
        cenarios: [
            {
                slug: 'storage-gateway-sem-cache-otimizado',
                titulo: 'Storage Gateway sem Cache Otimizado',
                resumo: 'Avalie se o cache do gateway está dimensionado adequadamente para o padrão de acesso dos dados.',
                checks: [
                    ['Meça a taxa de cache hit', 'Use as métricas do gateway para comparar cache hits versus misses.'],
                    ['Avalie o tamanho do cache', 'Compare o tamanho configurado com o volume de dados acessados frequentemente.']
                ],
                action: ['Ajuste o tamanho do cache', 'Para baixa taxa de hit, aumente o cache; para alta utilização, verifique se o cache é suficiente.'],
                caution: ['Cache maior custa mais', 'Disco local maior para cache aumenta custo da instância; equilibre com o benefício.'],
                fontes: ['Storage Gateway cache', 'Storage Gateway pricing']
            },
            {
                slug: 'storage-gateway-tape-gateway-sem-uso',
                titulo: 'Storage Gateway Tape Gateway sem Uso',
                resumo: 'Identifique tape gateways configurados que não estão sendo usados para backup ou archive.',
                checks: [
                    ['Liste tape gateways', 'Identifique tape gateways e verifique se há volumes ou fitas sendo criadas.'],
                    ['Meça a atividade', 'Compare a última atividade de cada tape gateway com a data atual.']
                ],
                action: ['Delete tape gateways ociosos', 'Remova tape gateways sem uso e documente os que forem mantidos para backup futuro.'],
                caution: ['Tape gateway pode ser para DR', 'Tape gateways podem ser mantidos para disaster recovery; confirme antes de remover.'],
                fontes: ['Storage Gateway tape', 'Storage Gateway pricing']
            },
            {
                slug: 'storage-gateway-volume-gateway-sem-otimizacao',
                titulo: 'Storage Gateway Volume Gateway sem Otimização',
                resumo: 'Avalie se volumes iSCSI estão configurados sem cache ou com configurações subótimas.',
                checks: [
                    ['Identifique volumes por gateway', 'Liste volume gateways e seus volumes iSCSI configurados.'],
                    ['Avalie o uso de cache', 'Compare a taxa de cache hit com o padrão de acesso dos volumes.']
                ],
                action: ['Otimize configurações de cache', 'Ajuste o tamanho do cache e as políticas de escrita para volumes com padrões de acesso conhecidos.'],
                caution: ['Cache afeta consistência', 'Configurações de cache podem afetar a consistência de dados; valide com o caso de uso.'],
                fontes: ['Storage Gateway volumes', 'Storage Gateway pricing']
            }
        ]
    },
    {
        service: 'aws-transit-gateway',
        cenarios: [
            {
                slug: 'transit-gateway-attachments-sem-uso',
                titulo: 'Transit Gateway com Attachments sem Uso',
                resumo: 'Identifique attachments de VPC ou VPN que não transportam tráfego, gerando custo por attachment.',
                checks: [
                    ['Liste attachments por TGW', 'Identifique attachments e verifique se há tráfego ativo.'],
                    ['Meça bytes por attachment', 'Compare BytesIn e BytesOut para ver quais attachments estão ociosos.']
                ],
                action: ['Delete attachments ociosos', 'Remova attachments sem tráfego e documente os que forem mantidos para failover.'],
                caution: ['Attachment pode ser para DR', 'Attachments podem ser mantidos para disaster recovery; confirme antes de remover.'],
                fontes: ['Transit Gateway attachments', 'Transit Gateway pricing']
            },
            {
                slug: 'transit-gateway-sem-route-table-otimizada',
                titulo: 'Transit Gateway sem Route Table Otimizada',
                resumo: 'Avalie se route tables estão propagando rotas desnecessárias, aumentando custo de processamento.',
                checks: [
                    ['Identifique route tables', 'Liste route tables e verifique se há propagação de rotas não utilizadas.'],
                    ['Meça o número de rotas', 'Compare o número de rotas por table com o número de attachments.']
                ],
                action: ['Otimize a propagação de rotas', 'Para route tables com muitas rotas não usadas, ajuste a propagação para incluir apenas as necessárias.'],
                caution: ['Rotas podem ser necessárias', 'Propagação ampla pode ser necessária para conectividade; valide antes de restringir.'],
                fontes: ['Transit Gateway routing', 'Transit Gateway pricing']
            },
            {
                slug: 'transit-gateway-peering-sem-trafego',
                titulo: 'Transit Gateway Peering sem Tráfego',
                resumo: 'Verifique se peerings entre TGWs estão configurados mas não transportam tráfego, gerando custo sem benefício.',
                checks: [
                    ['Liste peerings', 'Identifique TGW peerings e verifique se há tráfego ativo.'],
                    ['Meça bytes por peering', 'Compare o tráfego nas conexões de peering para ver se estão sendo usadas.']
                ],
                action: ['Delete peerings ociosos', 'Remova peerings sem tráfego e documente os que forem mantidos para conectividade multi-região.'],
                caution: ['Peering pode ser para DR', 'Peerings podem ser mantidos para disaster recovery cross-region; confirme antes de remover.'],
                fontes: ['Transit Gateway peering', 'Transit Gateway pricing']
            }
        ]
    },
    {
        service: 'aws-trusted-advisor',
        cenarios: [
            {
                slug: 'trusted-advisor-sem-integracao-com-sistemas-de-ticket',
                titulo: 'Trusted Advisor sem Integração com Sistemas de Ticket',
                resumo: 'Avalie se recomendações do Trusted Advisor não estão sendo integradas a Jira ou ServiceNow, resultando em ações não rastreadas.',
                checks: [
                    ['Verifique a integração', 'Confirme se há integração entre Trusted Advisor e sistemas de tickets.'],
                    ['Meça a taxa de resolução', 'Compare recomendações emitidas com as resolvidas para ver a eficácia do processo.']
                ],
                action: ['Implemente integração com tickets', 'Configure integração via API ou EventBridge para criar tickets automáticos para recomendações críticas.'],
                caution: ['Integração pode gerar ruído', 'Muitas recomendações podem sobrecarregar o sistema de tickets; filtre por severidade.'],
                fontes: ['Trusted Advisor API', 'Trusted Advisor pricing']
            },
            {
                slug: 'trusted-advisor-full-checks-sem-uso-dos-resultados',
                titulo: 'Trusted Advisor Full Checks sem Uso dos Resultados',
                resumo: 'Verifique se checks completos estão sendo executados mas os resultados não estão sendo usados para ação.',
                checks: [
                    ['Identifique checks habilitados', 'Liste checks do Trusted Advisor e verifique se estão sendo revisados.'],
                    ['Meça a taxa de ação', 'Compare recomendações emitidas com as que resultaram em mudanças.']
                ],
                action: ['Revise checks e resultados', 'Para checks sem ação, avalie se devem ser desabilitados ou se o processo de revisão precisa melhorar.'],
                caution: ['Checks podem ser gratuitos', 'Alguns checks são gratuitos; desabilitar pode perder visibilidade sem economia.'],
                fontes: ['Trusted Advisor checks', 'Trusted Advisor pricing']
            },
            {
                slug: 'trusted-advisor-sem-alertas-automaticos-de-custo',
                titulo: 'Trusted Advisor sem Alertas Automáticos de Custo',
                resumo: 'Avalie se recomendações de economia não estão gerando alertas automáticos, resultando em custo não otimizado.',
                checks: [
                    ['Identifique recomendações de custo', 'Liste recomendações de cost optimization e verifique se geram alertas.'],
                    ['Meça o impacto potencial', 'Estime a economia potencial das recomendações não implementadas.']
                ],
                action: ['Configure alertas automáticos', 'Use EventBridge ou Lambda para criar alertas quando novas recomendações de economia forem emitidas.'],
                caution: ['Alertas podem ser frequentes', 'Muitas recomendações podem gerar ruído; agrupe por impacto e prioridade.'],
                fontes: ['Trusted Advisor cost', 'Trusted Advisor pricing']
            }
        ]
    },
    {
        service: 'aws-waf',
        cenarios: [
            {
                slug: 'waf-rate-based-rules-sem-tuning-para-o-trafego',
                titulo: 'WAF com Rate-Based Rules sem Tuning para o Tráfego',
                resumo: 'Avalie se regras de rate limit estão muito restritivas ou permissivas para o padrão de tráfego real.',
                checks: [
                    ['Meça falsos positivos', 'Compare o número de requisições bloqueadas com o número de falsos positivos identificados.'],
                    ['Avalie o padrão de tráfego', 'Identifique picos de tráfego legítimo que podem estar sendo bloqueados.']
                ],
                action: ['Ajuste thresholds das regras', 'Para falsos positivos, aumente o threshold; para ataques, reduza ou adicione regras mais específicas.'],
                caution: ['Threshold muito alto permite ataques', 'Aumentar muito o threshold pode permitir ataques de DDoS; equilibre com a capacidade.'],
                fontes: ['WAF rate rules', 'WAF pricing']
            },
            {
                slug: 'waf-logging-full-sem-filtro-de-campos',
                titulo: 'WAF Logging Full sem Filtro de Campos',
                resumo: 'Verifique se logs do WAF estão capturando todos os campos quando apenas headers ou URI são necessários.',
                checks: [
                    ['Identifique configuração de logging', 'Liste web ACLs com logging habilitado e verifique quais campos são capturados.'],
                    ['Meça o volume de logs', 'Compare o volume de logs com o valor da análise de segurança que fornecem.']
                ],
                action: ['Reduza campos logados', 'Configure logging para capturar apenas campos essenciais, reduzindo volume e custo de storage.'],
                caution: ['Logs completos podem ser necessários', 'Para forense ou compliance, logs completos podem ser exigidos; confirme antes de reduzir.'],
                fontes: ['WAF logging', 'WAF pricing']
            },
            {
                slug: 'waf-web-acls-sem-otimizacao-de-regras',
                titulo: 'WAF com Web ACLs sem Otimização de Regras',
                resumo: 'Avalie se web ACLs têm regras redundantes ou desnecessárias que aumentam custo por regra e latência.',
                checks: [
                    ['Identifique regras redundantes', 'Liste regras em web ACLs e verifique se há sobreposição ou duplicação.'],
                    ['Meça o custo por regra', 'Compare o custo de web ACLs com o número de regras configuradas.']
                ],
                action: ['Otimize regras', 'Remova regras redundantes, consolide regras similares e use managed rule groups quando possível.'],
                caution: ['Remover regras pode reduzir proteção', 'Regras aparentemente redundantes podem ter propósito específico; teste antes de remover.'],
                fontes: ['WAF rules', 'WAF pricing']
            }
        ]
    },
    {
        service: 'nat-gateway',
        cenarios: [
            {
                slug: 'nat-gateway-por-az-sem-necessidade-de-alta-disponibilidade',
                titulo: 'NAT Gateway por AZ sem Necessidade de Alta Disponibilidade',
                resumo: 'Avalie se NAT Gateways estão provisionados em múltiplas AZs quando a aplicação tolera failover mais lento.',
                checks: [
                    ['Identifique NATs por AZ', 'Liste NAT Gateways e compare com o número de AZs usadas pelas subnets privadas.'],
                    ['Avalie o requisito de HA', 'Confirme se a aplicação precisa de failover instantâneo ou se uma única AZ seria suficiente.']
                ],
                action: ['Reduza NATs por AZ', 'Para aplicações que toleram failover, use um único NAT Gateway ou avalie VPC endpoints para serviços AWS.'],
                caution: ['NAT por AZ é para HA', 'Sem NAT em cada AZ, falha de uma AZ afeta toda a conectividade; valide o RTO aceitável.'],
                fontes: ['NAT Gateway HA', 'NAT Gateway pricing']
            },
            {
                slug: 'nat-gateway-sem-vpc-endpoints-para-servicos-aws',
                titulo: 'NAT Gateway sem VPC Endpoints para Serviços AWS',
                resumo: 'Verifique se tráfego para S3 e DynamoDB está passando pelo NAT quando endpoints de gateway eliminariam o custo.',
                checks: [
                    ['Identifique tráfego NAT para AWS', 'Use as métricas do NAT para ver quanto tráfego vai para serviços AWS como S3 e DynamoDB.'],
                    ['Verifique endpoints existentes', 'Confirme se já existem gateway endpoints para S3 e DynamoDB nas route tables.']
                ],
                action: ['Crie gateway endpoints', 'Para tráfego S3 e DynamoDB, crie endpoints de gateway gratuitos e ajuste as route tables.'],
                caution: ['Endpoint não elimina todos os custos', 'Transferência intra-região ainda pode ter custo; valide o cenário completo.'],
                fontes: ['VPC endpoints', 'NAT Gateway pricing']
            },
            {
                slug: 'nat-gateway-idle-processing-sem-trafego',
                titulo: 'NAT Gateway Idle Processing sem Tráfego',
                resumo: 'Identifique NAT Gateways que estão provisionados mas não processam tráfego significativo.',
                checks: [
                    ['Meça bytes processados', 'Compare BytesIn e BytesOut por NAT Gateway para ver quais estão ociosos.'],
                    ['Identifique subnets associadas', 'Liste subnets privadas que usam cada NAT Gateway e se há instâncias ativas.']
                ],
                action: ['Delete ou consolide NATs ociosos', 'Remova NAT Gateways sem tráfego e consolide os necessários em menos AZs quando possível.'],
                caution: ['NAT pode ser standby', 'NATs podem ser mantidos para failover mesmo sem uso regular; confirme antes de remover.'],
                fontes: ['NAT Gateway monitoring', 'NAT Gateway pricing']
            }
        ]
    }
];
