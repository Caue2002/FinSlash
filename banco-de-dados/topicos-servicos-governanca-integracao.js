window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
    "Amazon API Gateway": {
        titulo: "API Gateway",
        topicos: [
            {
                titulo: "Uso de HTTP APIs em Vez de REST APIs para Cenários Simples",
                descricao: "Pagar o valor integral de REST APIs (que custam até 3,5x mais) em microsserviços que não exigem recursos legados como chaves de API avançadas, cache nativo ou transformações complexas de payload."
            },
            {
                titulo: "Falta de Ativação de Cache no API Gateway",
                descricao: "Não habilitar o cache nativo de respostas nas etapas (Stages) do API Gateway para consultas frequentes de leitura (ex: cotações, dados cadastrais), forçando o backend a processar e reprocessar chamadas idênticas."
            },
            {
                titulo: "Tráfego Excessivo de Logs de Execução no CloudWatch (Execution Logs)",
                descricao: "Habilitar logs detalhados e rastreamento completo de payload para todas as rotas e métodos em produção sem filtro, gerando milhões de requisições de gravação no CloudWatch Logs."
            },
            {
                titulo: "Falta de Uso de VPC Links para APIs Privadas",
                descricao: "Expor APIs diretamente pela internet pública via NAT Gateway ou IPs públicos em vez de utilizar VPC Links seguros para roteamento interno entre microsserviços."
            },
            {
                titulo: "Chamadas de APIs sem Autorizadores Personalizados ou AWS IAM",
                descricao: "Deixar endpoints expostos sem validação adequada na borda, permitindo requisições não autorizadas que consomem computação do backend antes de serem rejeitadas."
            },
            {
                titulo: "Invocações Massivas por Erros de Retry de Clientes (Retry Storms)",
                descricao: "Clientes mobile sem backoff exponencial enviando milhares de requisições falhas em loop para o API Gateway após breves instabilidades de rede."
            },
            {
                titulo: "APIs \"Órfãs\" de Ambientes de Teste Descontinuados",
                descricao: "Manter estágios (Stages) de APIs antigas criadas por desenvolvedores para testes que continuam ativas e recebendo tráfego residual de bots."
            },
            {
                titulo: "Falta de Configuração de Limites de Taxa (Throttling / Rate Limiting)",
                descricao: "Não estabelecer limites de requisições por segundo por cliente ou chave de API, ficando vulnerável a picos de tráfego indevido ou ataques de negação de serviço na aplicação."
            },
            {
                titulo: "Uso de API Gateway para Transferência de Arquivos Grandes",
                descricao: "Fazer upload de documentos pesados de clientes e imagens de comprovantes diretamente pelo API Gateway (que possui limite de payload de 10 MB e cobra por processamento de dados) em vez de usar URLs pré-assinadas do S3."
            },
            {
                titulo: "Respostas de Erro sem Cache na Borda",
                descricao: "Retornar erros genéricos de validação de payload sem aplicar cache de curta duração na borda, fazendo chamadas inválidas repetidas baterem na computação interna."
            },
            {
                titulo: "Configuração de Mappings Complexos no API Gateway em Vez de Lógica no Backend",
                descricao: "Realizar transformações pesadas de formato de dados (Velocity Template Language - VTL) diretamente no API Gateway em vez de deixar o processamento para o microsserviço backend."
            },
            {
                titulo: "Uso de WebSockets do API Gateway Mantidos Abertos Indefinidamente",
                descricao: "Conexões WebSocket ativas em background consumindo contagem de minutos de conexão e requisições sem fluxo real de mensagens de chat ou notificação."
            },
            {
                titulo: "Falta de Monitoramento de Latência de Integração (IntegrationLatency)",
                descricao: "Ignorar métricas de desempenho entre o API Gateway e o backend, mascarando gargalos de banco de dados ou redes internas."
            },
            {
                titulo: "Duplicação de APIs por Diferentes Unidades de Negócio",
                descricao: "Criar múltiplos endpoints de API idênticos em contas separadas para serviços de cartão e conta corrente em vez de centralizar em uma API Gateway corporativa."
            },
            {
                titulo: "Uso de Custom Domain Names sem Certificados ACM Válidos Associados",
                descricao: "Configurações incorretas de mapeamento de domínios gerando falhas de SSL e retentativas massivas de clientes corporativos."
            },
            {
                titulo: "Falta de Uso de WAF Integrado para Proteção de Endpoints Críticos",
                descricao: "Expor APIs de transações financeiras (Pix/TED) sem associar uma Web ACL do AWS WAF para filtragem de bots e fraudes."
            },
            {
                titulo: "Ambientes de Homologação com Throttling Liberado sem Limites",
                descricao: "Deixar chaves de testes de homologação sem limites de requisições, permitindo que scripts de QA estourem os limites de cota da conta."
            },
            {
                titulo: "Inclusão de Dados Sensíveis em Query Strings de Logs",
                descricao: "Expor tokens de sessão ou dados de clientes nas URLs das requisições, gerando registros de dados sensíveis nos logs do CloudWatch."
            },
            {
                titulo: "Falta de Uso de AWS PrivateLink para Integração com Load Balancers Internos",
                descricao: "Configurar integrações complexas via rede pública para acessar ALBs internos em vez de usar VPC Links diretos."
            },
            {
                titulo: "Ausência de Alertas de Custo para Chamadas de API Excedentes",
                descricao: "Não configurar orçamentos no AWS Budgets para o volume de requisições do API Gateway, permitindo estouros de faturamento por tráfego inesperado."
            }
        ]
    },
    "Amazon CloudWatch": {
        titulo: "CloudWatch",
        topicos: [
            {
                titulo: "Ingestão Excessiva de Logs de Aplicação sem Filtro de Severidade",
                descricao: "Enviar todos os logs de aplicações (incluindo níveis DEBUG e VERBOSE) de centenas de microsserviços para o CloudWatch Logs, disparando os custos de ingestão e armazenamento por gigabyte."
            },
            {
                titulo: "Falta de Definição de Políticas de Retenção (Retention Period) em Log Groups",
                descricao: "Manter grupos de logs configurados para \"Never Expire\" (retenção infinita) em ambientes de desenvolvimento, QA e logs de infraestrutura temporária."
            },
            {
                titulo: "Criação de Milhões de Métricas Customizadas sem Governança",
                descricao: "Microsserviços enviando métricas customizadas para o CloudWatch contendo dimensões dinâmicas (como IDs de transação ou IPs de clientes), gerando cobranças exorbitantes por métrica ativa (Active Metric)."
            },
            {
                titulo: "Alarmes do CloudWatch com Períodos de Avaliação Excessivamente Curtos",
                descricao: "Configurar alarmes de alta sensibilidade verificando métricas a cada 10 segundos, gerando falsos positivos e consumo excessivo de chamadas de API de verificação."
            },
            {
                titulo: "Uso de Continous Metric Streams sem Ajuste de Amostragem",
                descricao: "Enviar fluxos contínuos de métricas para plataformas externas (como Datadog ou New Relic) via CloudWatch Metric Streams sem filtrar as métricas essenciais."
            },
            {
                titulo: "Retenção Prolongada de Exportações para o S3 Sem Ciclo de Vida",
                descricao: "Exportar logs históricos do CloudWatch para buckets S3 para fins de auditoria e esquecer de aplicar regras de transição para Glacier ou expiração de dados frios."
            },
            {
                titulo: "Falta de Uso de AWS Systems Manager Agent para Coleta Unificada",
                descricao: "Configurar agentes customizados pesados de monitoramento em instâncias EC2 em vez de aproveitar o CloudWatch Agent otimizado nativamente."
            },
            {
                titulo: "Consultas de Logs Pesadas e Ineficientes no CloudWatch Logs Insights",
                descricao: "Executar buscas complexas e sem escopo de tempo (Full-Scan) em petabytes de logs de auditoria no Insights, consumindo recursos de varredura e aumentando o custo de análise."
            },
            {
                titulo: "Alarmes de Custos Desconfigurados no AWS Budgets / CloudWatch Cost Anomaly",
                descricao: "Não estabelecer alertas automáticos para desvios repentinos de orçamento em contas AWS com grande volume de serviços serverless."
            },
            {
                titulo: "Duplicação de Coleta de Métricas entre Promoters e CloudWatch",
                descricao: "Manter agentes do Prometheus rodando em clusters EKS/ECS coletando exatamente as mesmas métricas coletadas nativamente pelo Container Insights do CloudWatch."
            },
            {
                titulo: "Falta de Limpeza de Log Groups Órfãos de Recursos Descontinuados",
                descricao: "Manter grupos de logs de clusters de testes, lambdas e instâncias EC2 que foram excluídos há meses, acumulando cobranças residuais de armazenamento."
            },
            {
                titulo: "Configuração Incorreta de Alvos de Notificação de Alarme (SNS Topics Órfãos)",
                descricao: "Disparar alarmes para tópicos do SNS que não possuem assinantes ativos, gerando reprocessamentos internos e falhas de entrega."
            },
            {
                titulo: "Monitoramento de Contêineres com Container Insights Habilitado Desnecessariamente",
                descricao: "Ativar o Container Insights em clusters de desenvolvimento de baixo impacto onde o monitoramento básico de nós seria suficiente."
            },
            {
                titulo: "Uso de Synthetics Canaries em Frequência Excessiva",
                descricao: "Executar testes sintéticos de disponibilidade (CloudWatch Synthetics) a cada 1 minuto para aplicações internas de uso restrito, gerando chamadas de navegador e custos desnecessários."
            },
            {
                titulo: "Falta de Uso de Contributor Insights para Identificar Gargalos de Rede",
                descricao: "Não ativar o CloudWatch Contributor Insights em VPC Flow Logs para identificar quais IPs ou portas estão consumindo mais banda no NAT Gateway."
            },
            {
                titulo: "Logs de Acesso de Balanceadores (ALB) sem Retenção Curta",
                descricao: "Habilitar logs de acesso detalhados de ALBs gravados diretamente no S3 e gerenciados de forma ineficiente sem políticas de expiração."
            },
            {
                titulo: "Criação Manual de Dashboards Redundantes por Equipes",
                descricao: "Desenvolver dashboards personalizados duplicados para cada microsserviço em vez de usar templates padronizados de infraestrutura como código (Terraform/CloudFormation)."
            },
            {
                titulo: "Alarmes Sem Ações Automatizadas (Apenas Notificações por E-mail)",
                descricao: "Configurar centenas de alarmes que apenas enviam e-mails para equipes de plantão em vez de disparar rotinas de autocorreção (Auto Remediation via Systems Manager)."
            },
            {
                titulo: "Falta de Agrupamento de Logs por Aplicação (Log Streams Desestruturados)",
                descricao: "Enviar logs desordenados de múltiplas instâncias para o mesmo stream, dificultando a auditoria e exigindo varreduras mais custosas no Insights."
            },
            {
                titulo: "Ausência de Alerta para o Custo Acumulado Diário do CloudWatch",
                descricao: "Não monitorar o crescimento diário da fatura do CloudWatch Logs, permitindo que falhas de código gerem surpresas financeiras no final do mês."
            }
        ]
    },
    "AWS Config": {
        titulo: "Config",
        topicos: [
            {
                titulo: "Gravação de Histórico para Todos os Tipos de Recursos sem Filtragem",
                descricao: "Configurar o AWS Config para gravar eventos de alteração de todos os recursos suportados na conta (incluindo tags e metadados irrelevantes de segurança), gerando um volume gigantesco de gravações no S3."
            },
            {
                titulo: "Falta de Regras Customizadas Otimizadas (AWS Config Rules)",
                descricao: "Utilizar centenas de regras personalizadas baseadas em AWS Lambda pesadas que executam a cada alteração de configuração em vez de usar regras gerenciadas nativas da AWS."
            },
            {
                titulo: "Conexão de Múltiplas Contas sem Agregação Centralizada (Config Aggregators)",
                descricao: "Configurar o AWS Config isoladamente em cada conta de uma organização bancária sem centralizar no Management Account via Aggregator, duplicando o armazenamento de dados de auditoria."
            },
            {
                titulo: "Retenção Prolongada e Ineficiente no S3 sem Regras de Ciclo de Vida",
                descricao: "Armazenar dados de histórico de configuração no S3 sem regras de transição para classes mais baratas (como S3 Standard-IA ou Glacier) após 30 dias."
            },
            {
                titulo: "Execução Frequente de Remediações Automáticas sem Testes Prévios",
                descricao: "Configurar sistemas de remediação automática (AWS Systems Manager Automation) vinculados a regras do Config que desfazem alterações legítimas de engenheiros em ambientes de homologação."
            },
            {
                titulo: "Falta de Exclusão de Recursos Temporários das Regras de Compliance",
                descricao: "Avaliar recursos efêmeros criados em pipelines de CI/CD (como instâncias de teste e pods) contra regras rígidas de conformidade de longo prazo, gerando alertas falsos em massa."
            },
            {
                titulo: "Uso do AWS Config para Auditoria de Dados de Aplicação em Vez de Infraestrutura",
                descricao: "Tentar utilizar o Config para rastrear alterações em dados transacionais de bancos de dados em vez de focar estritamente no inventário e compliance da infraestrutura de nuvem."
            },
            {
                titulo: "Ausência de Alertas para Falhas de Gravação do Recorder (Config Recorder Stopped)",
                descricao: "Não monitorar se o gravador de configurações do Config foi interrompido acidentalmente por scripts de automação, deixando a instituição sem auditoria regulatória exigida."
            },
            {
                titulo: "Entrega de Notificações de Mudança via SNS sem Consumidor Ativo",
                descricao: "Enviar cada evento de alteração de configuração para tópicos do SNS em tempo real sem microsserviços inscritos para processar os dados, gerando falhas de entrega."
            },
            {
                titulo: "Conexões de S3 com Permissões Inadequadas para Armazenamento de Configs",
                descricao: "Buckets de destino do Config configurados sem criptografia rigorosa ou com acesso público acidental, expondo metadados confidenciais da topologia de rede do banco."
            },
            {
                titulo: "Avaliação Contínua de Contas de Desenvolvimento com Regras de Produção",
                descricao: "Aplicar o mesmo nível estrito de regras de segurança e conformidade do ambiente produtivo em contas de sandbox e testes de desenvolvedores."
            },
            {
                titulo: "Falta de Uso do AWS Config Advanced Queries para Auditorias Rápidas",
                descricao: "Executar varreduras manuais complexas em relatórios exportados do Config em vez de usar consultas estruturadas nativas via Config Query."
            },
            {
                titulo: "Duplicação de Ferramentas de Inventário (Config + CMDB Própria)",
                descricao: "Manter o AWS Config ativo gerando custos massivos de registros enquanto a equipe de operações mantém uma CMDB manual desatualizada."
            },
            {
                titulo: "Falta de Agendamento de Revisões Periódicas de Conformance Packs",
                descricao: "Manter pacotes de conformidade regulatória (PCI-DSS, ISO 27001) ativos com dezenas de regras desnecessárias para o escopo real do aplicativo."
            },
            {
                titulo: "Uso de Contas AWS de Sandbox sem Isenção de Regras de Config",
                descricao: "Gerar milhares de alertas diários no Config para contas de estudo de IA e testes que não possuem impacto produtivo."
            },
            {
                titulo: "Falta de Monitoramento de Custos por Número de Itens de Configuração Evaluated",
                descricao: "Não acompanhar o crescimento do número de itens de configuração avaliados (Configuration Items), que escalam linearmente com a criação de recursos efêmeros."
            },
            {
                titulo: "Retenção Desnecessária de Snapshots Manuais de Configuração no S3",
                descricao: "Gerar exportações manuais completas do inventário e armazená-las no S3 sem política de expiração."
            },
            {
                titulo: "Associação de Regras de Config em Regiões AWS Inativas",
                descricao: "Habilitar o AWS Config em regiões geográficas onde o banco não possui nenhuma carga de trabalho ativa, gerando cobranças desnecessárias de gravação."
            },
            {
                titulo: "Falta de Integração com o AWS Security Hub",
                descricao: "Analisar os achados de conformidade do Config isoladamente em vez de centralizar a visibilidade de segurança no Security Hub da organização."
            },
            {
                titulo: "Ausência de Limpeza de Registros de Recursos Excluídos",
                descricao: "Manter o histórico de recursos que já foram destruídos há anos acumulando espaço no armazenamento de auditoria do Config."
            }
        ]
    },
    "AWS Secrets Manager": {
        titulo: "Secrets Manager",
        topicos: [
            {
                titulo: "Rotação Automática de Segredos Configurada com Intervalos Excessivos",
                descricao: "Executar rotinas de rotação automática (Secret Rotation) via Lambda a cada poucos dias sem necessidade de compliance, gerando chamadas excessivas e reconfigurações desnecessárias nos bancos de dados."
            },
            {
                titulo: "Chamadas de API Repetidas para Obter Credenciais a Cada Requisição de Microsserviço",
                descricao: "Microsserviços consultando o Secrets Manager via API para buscar a senha do banco a cada transação em vez de implementar cache local em memória (com TTL seguro)."
            },
            {
                titulo: "Armazenamento de Dados Não Confidenciais ou Configurações Estáticas no Secrets Manager",
                descricao: "Utilizar o Secrets Manager para guardar strings de configuração pública ou variáveis de ambiente que poderiam ser armazenadas no AWS Systems Manager Parameter Store (que é gratuito no nível standard)."
            },
            {
                titulo: "Falta de Uso do Parameter Store Standard para Dados sem Exigência de Rotação",
                descricao: "Pagar pela tarifa mensal fixa de segredos no Secrets Manager para chaves que nunca expiram e não exigem criptografia por KMS personalizado ou rotação automática."
            },
            {
                titulo: "Segredos \"Órfãos\" de Sistemas Descontinuados Mantidos Ativos na Conta",
                descricao: "Manter credenciais de bancos de dados legados, APIs de parceiros e sistemas de homologação desativados que continuam gerando a cobrança mensal fixa por segredo ativo."
            },
            {
                titulo: "Exposição de Segredos em Logs por Tratamento Inadequado de Erros no Código",
                descricao: "Microsserviços capturando exceções de conexão e imprimindo o objeto completo de credenciais obtido do Secrets Manager diretamente nos logs do CloudWatch."
            },
            {
                titulo: "Falta de Rotação de Segredos Críticos de Produção por Falta de Automação",
                descricao: "Deixar credenciais de bancos de dados produtivos sem rotação automática por anos devido à complexidade de scripts Lambda de integração."
            },
            {
                titulo: "Replicação Cross-Region Desnecessária de Segredos em Ambientes de Teste",
                descricao: "Habilitar a replicação multi-região de segredos para ambientes de homologação ou aplicações que operam em região única."
            },
            {
                titulo: "Uso de Chaves KMS Customizadas Caras para Criptografia de Segredos",
                descricao: "Configurar chaves do AWS KMS gerenciadas pelo cliente (CMK) com rotação cara para segredos de baixo valor corporativo em vez de usar a chave padrão gerenciada pela AWS (aws/secretsmanager)."
            },
            {
                titulo: "Permissões IAM Amplas (Wildcard) para Acesso aos Segredos",
                descricao: "Conceder políticas IAM permissivas (secretsmanager:GetSecretValue) permitindo que qualquer microsserviço da conta acesse segredos de outras áreas de negócios."
            },
            {
                titulo: "Falta de Monitoramento de Chamadas Falhas de Recuperação de Segredos",
                descricao: "Não configurar alarmes para falhas de autenticação causadas por credenciais dessincronizadas após tentativas de rotação automática."
            },
            {
                titulo: "Uso do Secrets Manager para Armazenamento de Arquivos Binários ou Certificados Gigantescos",
                descricao: "Tentar guardar certificados SSL ou arquivos binários pesados como segredos (que possuem limite de tamanho de 64 KB), gerando erros de payload."
            },
            {
                titulo: "Múltiplos Segredos Separados para Instâncias da Mesma Aplicação",
                descricao: "Criar um segredo individual para cada instância EC2 de um cluster em vez de usar uma credencial compartilhada e controlada por grupo de acesso."
            },
            {
                titulo: "Falta de Uso de AWS PrivateLink (VPC Endpoints) para Consulta de Segredos",
                descricao: "Microsserviços consultando o Secrets Manager trafegando dados pela internet pública ou NAT Gateway em vez de usar endpoints locais privados."
            },
            {
                titulo: "Manutenção de Versões Antigas Excessivas de Segredos (Staging Labels)",
                descricao: "Acumular dezenas de versões rotuladas de segredos antigos sem expurgar o histórico de rotações anteriores."
            },
            {
                titulo: "Falta de Testes de Rotação em Ambientes Isolados",
                descricao: "Executar scripts de rotação automática diretamente em segredos de produção sem validar a lógica de alteração de senha no banco de homologação primeiro."
            },
            {
                titulo: "Duplicação de Segredos entre Contas da Organização",
                descricao: "Cadastrar manualmente a mesma chave de API externa em 10 contas AWS diferentes em vez de usar compartilhamento seguro via AWS Resource Access Manager (RAM)."
            },
            {
                titulo: "Ausência de Alertas de Custo para Aumento do Número de Segredos Ativos",
                descricao: "Não monitorar o crescimento no número de segredos gerenciados, permitindo que scripts automatizados de CI/CD criem milhares de segredos lixo."
            },
            {
                titulo: "Uso de Senhas Fracas ou Padrão em Segredos Gerenciados Manualmente",
                descricao: "Cadastrar senhas geradas manualmente sem requisitos de complexidade criptográfica nas credenciais iniciais."
            },
            {
                titulo: "Falta de Integração com o AWS CloudTrail para Auditoria de Acesso",
                descricao: "Não monitorar quem acessou qual segredo e em qual horário através dos logs de auditoria do CloudTrail."
            }
        ]
    },
    "AWS CloudTrail": {
        titulo: "CloudTrail",
        topicos: [
            {
                titulo: "Criação de Múltiplas Trilhas (Multi-Region Trails) Redundantes na Mesma Conta",
                descricao: "Configurar várias trilhas de auditoria globais e regionais simultaneamente, gravando exatamente os mesmos eventos de API e multiplicando os custos de armazenamento e processamento."
            },
            {
                titulo: "Inclusão de Eventos de Dados (Data Events) sem Filtragem em Buckets S3 de Alto Tráfego",
                descricao: "Habilitar a gravação de eventos de dados de leitura e escrita (GetObject/PutObject) para todos os buckets S3 da empresa, gerando bilhões de eventos diários e faturas astronômicas de log."
            },
            {
                titulo: "Inclusão Desnecessária de Eventos de Gestão de Leitura (Read-only Management Events)",
                descricao: "Registrar todas as chamadas de API de leitura (ex: DescribeInstances, ListBuckets) realizadas por ferramentas de monitoramento e desenvolvedores, acumulando ruído desnecessário na trilha de auditoria."
            },
            {
                titulo: "Retenção Prolongada de Logs do CloudTrail no S3 sem Políticas de Ciclo de Vida",
                descricao: "Manter arquivos de log brutos do CloudTrail armazenados indefinidamente na classe S3 Standard sem transpor para Glacier ou aplicar regras de expiração após o período regulatório."
            },
            {
                titulo: "Falta de Integração com CloudWatch Logs para Alertas em Tempo Real",
                descricao: "Gravar logs apenas no S3 sem direcionar eventos críticos de segurança para o CloudWatch Logs, impedindo a criação de alarmes imediatos para ações suspeitas (ex: exclusão de VPCs ou criação de chaves IAM)."
            },
            {
                titulo: "Armazenamento de Trilhas em Buckets S3 sem Criptografia e Bloqueio de Acesso Público",
                descricao: "Buckets de armazenamento do CloudTrail configurados com permissões permissivas, expondo logs confidenciais de auditoria de toda a infraestrutura corporativa."
            },
            {
                titulo: "Falta de Uso de Trail Insights para Detecção de Anomalias",
                descricao: "Não habilitar o recurso CloudTrail Insights, que analisa automaticamente padrões anômalos de chamadas de API (como picos de exclusão de recursos ou acessos de IPs incomuns)."
            },
            {
                titulo: "Trilhas CloudTrail Isoladas em Contas de Desenvolvimento sem Governança",
                descricao: "Deixar de centralizar o CloudTrail da organização em um bucket consolidado na conta de auditoria (Log Archive Account), dificultando a análise forense."
            },
            {
                titulo: "Falta de Verificação de Integridade de Logs (Log File Validation)",
                descricao: "Não habilitar a assinatura criptográfica dos arquivos de log do CloudTrail, perdendo a garantia legal de que os registros de auditoria não foram adulterados."
            },
            {
                titulo: "Consultas de Auditoria Pesadas e Sem Particionamento no Amazon Athena",
                descricao: "Analisar gigabytes de logs brutos do CloudTrail no S3 via Athena sem utilizar tabelas particionadas ou formato colunar, gerando custos altos de varredura a cada busca de segurança."
            },
            {
                titulo: "Duplicação de Logs entre CloudTrail e AWS Config",
                descricao: "Registrar eventos de alteração de infraestrutura duplicados e detalhados tanto no CloudTrail quanto no AWS Config sem otimização de escopo."
            },
            {
                titulo: "Falta de Exclusão de Contas Desativadas das Trilhas Organizacionais",
                descricao: "Manter trilhas ativas coletando eventos de contas AWS que foram encerradas ou desativadas pela empresa."
            },
            {
                titulo: "Uso de Chaves KMS Customizadas com Custos Elevados para Criptografia de Logs",
                descricao: "Criptografar arquivos do CloudTrail com chaves KMS dedicadas e rotacionadas agressivamente, gerando um alto volume de chamadas pagas ao serviço KMS."
            },
            {
                titulo: "Falta de Monitoramento de Falhas de Gravação de Log (CloudTrail Lake / S3 Delivery Failures)",
                descricao: "Não configurar alarmes para falhas na entrega de logs de auditoria, o que viola requisitos regulatórios de compliance bancário."
            },
            {
                titulo: "Uso do CloudTrail Lake para Armazenamento de Dados de Aplicação",
                descricao: "Tentar utilizar o CloudTrail Lake como banco de dados analítico para logs de transações de negócios em vez de focar estritamente em auditoria de APIs da AWS."
            },
            {
                titulo: "Falta de Alertas para Alterações nas Configurações das Próprias Trilhas",
                descricao: "Não monitorar tentativas de desativar ou modificar o CloudTrail por usuários não autorizados na conta."
            },
            {
                titulo: "Retenção Descontrolada de Arquivos Temporários de Query do Athena no S3",
                descricao: "Executar centenas de consultas de auditoria no Athena gerando arquivos temporários de resultados no S3 sem política de limpeza automática."
            },
            {
                titulo: "Inclusão de Eventos de Gestão de Contêineres sem Necessidade",
                descricao: "Registrar chamadas internas de API de agentes de orquestração de containers que geram milhões de eventos repetitivos por dia."
            },
            {
                titulo: "Falta de Treinamento e Automação para Resposta a Incidentes Baseada em CloudTrail",
                descricao: "Coletar terabytes de logs de auditoria que nunca são analisados proativamente por ferramentas de SIEM ou segurança."
            },
            {
                titulo: "Ausência de Orçamento para Custos de Ingestão e Armazenamento do CloudTrail",
                descricao: "Não dimensionar o impacto financeiro do crescimento linear de chamadas de API da empresa sobre a fatura mensal do CloudTrail."
            }
        ]
    },
    "AWS KMS": {
        titulo: "KMS",
        topicos: [
            {
                titulo: "Uso de Chaves Gerenciadas pelo Cliente (CMK) para Criptografia de Dados Irrelevantes",
                descricao: "Criar chaves customizadas caras e gerenciar rotações manuais/automáticas para proteger dados efêmeros ou logs de baixo valor em vez de usar as chaves gerenciadas padrão da AWS (aws/service-name)."
            },
            {
                titulo: "Chamadas Excessivas e Desnecessárias de Criptografia por API (Encrypt/Decrypt)",
                descricao: "Aplicações criptografando ou descriptografando dados de campo a campo diretamente via API do KMS para cada transação em vez de usar criptografia de envelope (Envelope Encryption com chaves locais em cache)."
            },
            {
                titulo: "Falta de Ativação de S3 Bucket Keys em Buckets Criptografados com KMS",
                descricao: "Realizar milhões de operações de leitura/gravação em buckets S3 protegidos por KMS sem habilitar S3 Bucket Keys, gerando uma chamada paga individual ao KMS para cada objeto manipulado."
            },
            {
                titulo: "Rotação Automática de Chaves CMK Não Habilitada para Dados Sensíveis",
                descricao: "Deixar de habilitar a rotação anual automática de chaves gerenciadas pelo cliente exigida por normas rigorosas de compliance e segurança bancária."
            },
            {
                titulo: "Políticas de Chave KMS Excessivamente Permissivas (Principal:  ou AWS: )",
                descricao: "Conceder acesso amplo de uso de chaves criptográficas para contas externas ou perfis IAM genéricos, violando o princípio do privilégio mínimo."
            },
            {
                titulo: "Uso de Chaves Multi-Região (Multi-Region Keys) sem Justificativa Operacional",
                descricao: "Criar chaves multi-região replicadas quando os dados protegidos operam estritamente em uma única região geográfica da AWS."
            },
            {
                titulo: "Falta de Monitoramento de Limites de Taxa de Requisição (KMS Throttling)",
                descricao: "Não configurar alarmes para estouros de limites de transações por segundo (TPS) do KMS, o que causa falhas em cascata em bancos de dados e sistemas de armazenamento."
            },
            {
                titulo: "Exclusão Agendada de Chaves Ativas (Pending Deletion) por Erro Operacional",
                descricao: "Agendar a exclusão de chaves de criptografia em uso por engano, resultando na perda irreversível de acesso a bancos de dados e volumes criptografados."
            },
            {
                titulo: "Duplicação de Chaves KMS entre Contas sem Uso de AWS RAM",
                descricao: "Criar chaves idênticas em dezenas de contas separadas da organização em vez de compartilhar o acesso a uma chave centralizada via Resource Access Manager."
            },
            {
                titulo: "Criptografia de Bancos de Dados RDS/Aurora com Chaves Personalizadas Sem Necessidade Regulatória",
                descricao: "Utilizar CMKs customizadas para instâncias de desenvolvimento e homologação de bancos de dados que processam apenas dados fictícios."
            },
            {
                titulo: "Falta de Auditoria de Uso de Chaves via CloudTrail",
                descricao: "Não monitorar regularmente quais entidades IAM estão utilizando chaves de criptografia sensíveis e em quais horários."
            },
            {
                titulo: "Uso de Chaves Assimétricas para Criptografia de Grandes Volumes de Dados",
                descricao: "Tentar criptografar arquivos binários pesados diretamente com chaves assimétricas do KMS (que possuem limites rígidos de tamanho de payload) em vez de usar chaves simétricas."
            },
            {
                titulo: "Falta de Rotação de Credenciais de Acesso a Chaves de Terceiros",
                descricao: "Manter políticas de chave antigas que concedem acesso a aplicações externas que já foram desativadas ou migradas."
            },
            {
                titulo: "Criação de Múltiplas Chaves para Microsserviços da Mesma Família de Negócio",
                descricao: "Criar uma chave KMS separada para cada microsserviço menor em vez de agrupar o controle de criptografia por domínio corporativo."
            },
            {
                titulo: "Uso de Parâmetros de Criptografia Obsoletos em Integrações Legadas",
                descricao: "Manter bibliotecas de criptografia antigas que geram chamadas ineficientes e custosas ao KMS."
            },
            {
                titulo: "Falta de Alertas de Custo para Aumento no Volume de Chamadas de KMS",
                descricao: "Não monitorar o crescimento no número de requisições de API de criptografia, permitindo que loops de software estourem o orçamento."
            },
            {
                titulo: "Desativação Indevida de Chaves de Backup Antigas",
                descricao: "Inativar chaves KMS associadas a snapshots antigos de bancos de dados, tornando a restauração de backups históricos impossível em cenários de auditoria."
            },
            {
                titulo: "Uso de HSMs Dedicados (CloudHSM) para Cargas que Seriam Atendidas pelo KMS",
                descricao: "Contratar clusters complexos e caros do AWS CloudHSM para aplicações que poderiam ser protegidas com segurança pelo KMS gerenciado."
            },
            {
                titulo: "Falta de Documentação de Dependências de Chaves Criptográficas",
                descricao: "Não mapear quais recursos (S3, RDS, EBS, Secrets Manager) dependem de cada chave KMS específica, dificultando planos de recuperação de desastres."
            },
            {
                titulo: "Ausência de Testes de Recuperação com Chaves KMS de Backup",
                descricao: "Nunca validar se os procedimentos de importação e recuperação de chaves externas (Imported Key Material) funcionam em ambientes de homologação."
            }
        ]
    },
    "AWS Shield": {
        titulo: "Shield",
        topicos: [
            {
                titulo: "Contratação Desnecessária do AWS Shield Advanced para Recursos sem Exposição Pública",
                descricao: "Assinar o plano pago do AWS Shield Advanced (US$ 3.000/mês por organização mais taxas de uso) para proteger arquiteturas internas isoladas em VPCs privadas sem acesso à internet."
            },
            {
                titulo: "Falta de Associação de Recursos Críticos às Proteções do Shield Advanced",
                descricao: "Pagar pela assinatura do Shield Advanced mas esquecer de associar explicitamente (Resource Association) os Application Load Balancers ou distribuições CloudFront de produção ao serviço."
            },
            {
                titulo: "Ausência de Configuração de Alertas e Resposta do DDoS Response Team (DRT)",
                descricao: "Não configurar canais de contato, permissões e planos de suporte para acionar a equipe de engenharia da AWS (DRT) durante um ataque de negação de serviço em andamento."
            },
            {
                titulo: "Uso de Proteção Básica (Shield Standard) em Sistemas de Missão Crítica sem WAF Integrado",
                descricao: "Confiar apenas na proteção padrão gratuita para portais bancários de alto volume sem combiná-la com regras customizadas do AWS WAF e CloudFront."
            },
            {
                titulo: "Falta de Monitoramento de Métricas de Ataque (DDoSDetected)",
                descricao: "Não configurar alarmes CloudWatch para notificar a equipe de segurança quando o Shield detectar volumetria anômala de tráfego na borda."
            },
            {
                titulo: "Contratação do Shield Advanced para Ambientes de Staging ou Dev",
                descricao: "Ativar assinaturas e proteções avançadas em contas de teste e homologação que não possuem relevância pública ou financeira."
            },
            {
                titulo: "Desconsideração do Crédito de WAF Inclusos na Assinatura do Shield Advanced",
                descricao: "Não aproveitar os benefícios de isenção de custos de WAF e CloudFront que acompanham o pacote corporativo do Shield Advanced."
            },
            {
                titulo: "Falta de Testes de Resiliência (Game Days / DDoS Simulation)",
                descricao: "Nunca realizar simulações controladas de ataque DDoS para validar se as defesas do Shield e do WAF respondem conforme o planejado."
            },
            {
                titulo: "Associação Incorreta de Elastic IPs (EIP) Protegidos sem Tráfego Real",
                descricao: "Pagar por proteções avançadas em IPs elásticos órfãos ou servidores EC2 que foram desativados."
            },
            {
                titulo: "Falta de Configuração de Limites de Taxa (Rate Limiting) em Conjunto com o Shield",
                descricao: "Confiar unicamente na mitigação de camada 3/4 do Shield sem implementar regras de limitação de taxa de camada 7 para proteger APIs bancárias."
            },
            {
                titulo: "Desatualização de Contatos de Emergência na Console do Shield",
                descricao: "Manter e-mails e telefones de alerta desatualizados na configuração do Shield Advanced, impedindo a comunicação rápida com o suporte em incidentes."
            },
            {
                titulo: "Uso de Arquiteturas sem CDN (CloudFront) Exponendo ALBs Diretamente ao Shield",
                descricao: "Proteger Application Load Balancers expostos diretamente à internet em vez de ocultar a infraestrutura atrás de distribuições CloudFront protegidas."
            },
            {
                titulo: "Falta de Análise de Relatórios Pós-Ataque (DDoS Assessment Reports)",
                descricao: "Não revisar relatórios detalhados fornecidos pela AWS após eventos de tráfego anômalo para aprimorar as regras de segurança."
            },
            {
                titulo: "Desconhecimento da Cobertura de Custos de Escalabilidade Induzida por DDoS",
                descricao: "Não ativar a proteção contra custos extras (Cost Protection) do Shield Advanced para picos de tráfego gerados por ataques volumétricos."
            },
            {
                titulo: "Uso de Firewalls Tradicionais de Terceiros em Conflito com o Shield",
                descricao: "Sobrecarregar a arquitetura de rede com appliances virtuais de terceiros para inspeção DDoS que geram gargalos de latência superiores à proteção nativa."
            },
            {
                titulo: "Falta de Proteção em DNS (Route 53) Associada ao Shield",
                descricao: "Proteger apenas os servidores web e esquecer de garantir que as zonas hospedadas do Route 53 possuam resiliência contra ataques de inundação de DNS."
            },
            {
                titulo: "Criação de Alertas Falsos Positivos em Equipes de Plantão",
                descricao: "Configurar notificações excessivas e não calibradas para pequenas flutuações de tráfego legítimo interpretadas como ameaças."
            },
            {
                titulo: "Falta de Governança de Custos da Assinatura Mensal Fixa do Shield Advanced",
                descricao: "Não ratear o custo fixo de US$ 3.000 mensais do Shield entre os centros de custo das aplicações beneficiadas."
            },
            {
                titulo: "Inclusão de Tráfego Interno de Parceiros no Escopo de Monitoramento Avançado do Shield",
                descricao: "Configurar proteções voltadas para a internet em endpoints privados acessados exclusivamente por redes dedicadas (Direct Connect)."
            },
            {
                titulo: "Ausência de Plano de Resposta a Incidentes Documentado para Equipes de Operação",
                descricao: "Deixar a mitigação de ataques DDoS inteiramente a cargo da AWS sem um procedimento interno de comunicação e acompanhamento executivo."
            }
        ]
    },
    "AWS Trusted Advisor": {
        titulo: "Trusted Advisor",
        topicos: [
            {
                titulo: "Ignorar Alertas Críticos de Segurança e Portas Expostas",
                descricao: "Desconsiderar os relatórios do Trusted Advisor que apontam chaves IAM expostas, grupos de segurança com portas abertas para a internet (0.0.0.0/0) e buckets S3 públicos."
            },
            {
                titulo: "Falta de Integração com AWS Health Dashboard e Notificações Automatizadas",
                descricao: "Deixar os relatórios de recomendação de economia e falhas de infraestrutura mofando na console sem enviar resumos automáticos para canais do Slack ou e-mails das equipes técnicas."
            },
            {
                titulo: "Não Utilização da API do Trusted Advisor para Governança Centralizada",
                descricao: "Analisar recomendações manualmente conta por conta em vez de agregar os relatórios de custos e segurança para toda a organização via API/Lambda."
            },
            {
                titulo: "Desconsideração das Recomendações de Otimização de Custos (Cost Optimization Checks)",
                descricao: "Ignorar alertas sobre instâncias EC2 ociosas, volumes EBS não anexados e instâncias subutilizadas que geram desperdício financeiro mensal."
            },
            {
                titulo: "Falta de Acompanhamento de Limites de Serviço (Service Limits / Quotas)",
                descricao: "Não monitorar os alertas de proximidade de limites de recursos da AWS indicados pelo Trusted Advisor, resultando em falhas repentinas de deploy em produção."
            },
            {
                titulo: "Contratação de Ferramentas Caras de Terceiros para FinOps sem Usar o Trusted Advisor",
                descricao: "Pagar por softwares externos complexos de auditoria de nuvem para obter recomendações básicas que já são entregues nativamente e de graça (ou no plano Business/Enterprise) pelo Trusted Advisor."
            },
            {
                titulo: "Ignorar Alertas de Confiabilidade (Fault Tolerance)",
                descricao: "Deixar de corrigir avisos sobre recursos críticos configurados em zona única de disponibilidade (Single-AZ) sem redundância para alta disponibilidade."
            },
            {
                titulo: "Falta de Ativação de Verificações Avançadas (Full Trusted Advisor Checks)",
                descricao: "Operar com o suporte básico (Basic Support) que restringe o acesso à maioria das verificações avançadas de segurança e desempenho do Trusted Advisor."
            },
            {
                titulo: "Tratar Alertas do Trusted Advisor como \"Ruído\" sem Investigação",
                descricao: "Criar uma cultura interna onde as recomendações de otimização são sistematicamente ignoradas pelos desenvolvedores."
            },
            {
                titulo: "Ausência de Atribuição de Responsáveis para Resolução de Alertas",
                descricao: "Não designar engenheiros específicos para auditar e resolver os itens vermelhos e amarelos apontados no painel semanalmente."
            },
            {
                titulo: "Falta de Integração com Sistemas de Chamados (Jira/ServiceNow)",
                descricao: "Analisar recomendações visualmente na console em vez de automatizar a abertura de tickets para correções de infraestrutura apontadas pelo serviço."
            },
            {
                titulo: "Ignorar Recomendações de Performance Relacionadas a Limites de I/O",
                descricao: "Desprezar avisos sobre limites de largura de banda de instâncias e discos que causam lentidão intermitente em sistemas bancários."
            },
            {
                titulo: "Uso de Contas de Sandbox sem Limpeza Baseada nas Diretrizes do Advisor",
                descricao: "Acumular recursos ociosos em ambientes de testes ignorando os relatórios de economia gerados pela ferramenta."
            },
            {
                titulo: "Falta de Verificação de Conformidade com Licenciamento de Software (BYOL)",
                descricao: "Não revisar alertas sobre utilização de licenças em instâncias dedicadas apontadas pelo Advisor."
            },
            {
                titulo: "Ignorar Alertas de Certificados SSL Próximos da Expiração no IAM/ACM",
                descricao: "Perder prazos de renovação de certificados apontados nas verificações de segurança do Trusted Advisor."
            },
            {
                titulo: "Falta de Personalização de Exceções de Alertas (Suppression)",
                descricao: "Deixar alertas legítimos e intencionais poluindo o painel sem utilizar a função de supressão para itens justificados pela arquitetura."
            },
            {
                titulo: "Desconhecimento dos Custos de Chamadas de API do Trusted Advisor em Contas Multi-Conta",
                descricao: "Realizar consultas automatizadas excessivas via script sem respeitar limites de taxa (Throttling)."
            },
            {
                titulo: "Falta de Acompanhamento da Evolução do Score de Otimização Mensal",
                descricao: "Não utilizar as métricas consolidadas do Advisor para cobrar melhorias de eficiência das equipes de engenharia."
            },
            {
                titulo: "Ignorar Alertas de Desatualização de Versões de Runtime (Lambda/RDS)",
                descricao: "Manter motores de banco de dados ou runtimes de código com fim de vida (End-of-Life) ignorando os avisos de segurança."
            },
            {
                titulo: "Ausência de Relatórios Executivos para a Diretoria Financeira (CFO)",
                descricao: "Não traduzir as recomendações de economia de custos do Trusted Advisor em painéis executivos de ROI para a gestão do banco."
            }
        ]
    },
    "Amazon SQS": {
        titulo: "SQS",
        topicos: [
            {
                titulo: "Uso Exclusivo de Standard Queues em Vez de FIFO para Transações Críticas",
                descricao: "Utilizar filas padrão (Standard SQS) em fluxos bancários que exigem ordem estrita de processamento (ex: extratos e transferências), gerando inconsistências por entrega fora de ordem."
            },
            {
                titulo: "Falta de Configuração de Dead Letter Queues (DLQ) para Mensagens Falhas",
                descricao: "Enviar mensagens para filas sem associar uma DLQ, resultando em loops infinitos de processamento (Poison Pills) ou perda definitiva de dados de transações com erro."
            },
            {
                titulo: "Consultas de Fila Vazia Excessivas (Long Polling Desconfigurado)",
                descricao: "Configurar aplicações consumidoras para fazer chamadas de busca (ReceiveMessage) sem habilitar o Long Polling (espera longa), disparando milhões de chamadas vazias e cobradas à toa (Empty Receives)."
            },
            {
                titulo: "Visibilidade Excessiva (Visibility Timeout) Mal Dimensionada para Tarefas Longas",
                descricao: "Definir um tempo de visibilidade muito curto (ex: 30 segundos) para uma função Lambda ou worker que leva 2 minutos para processar um lote, fazendo a mesma mensagem ser duplicada e processada várias vezes."
            },
            {
                titulo: "Tamanho de Payload Inadequado (Tentativa de Enviar Arquivos Grandes no SQS)",
                descricao: "Tentar enviar payloads gigantescos (como PDFs e relatórios de 50 MB) diretamente no SQS (cujo limite é 256 KB) em vez de armazenar o arquivo no S3 e enviar apenas o ponteiro na mensagem."
            },
            {
                titulo: "Falta de Agrupamento de Mensagens em Lotes (Batching Operations)",
                descricao: "Enviar ou deletar mensagens individualmente via chamada de API unitária em vez de usar lotes de até 10 mensagens (SendMessageBatch), multiplicando os custos de chamadas."
            },
            {
                titulo: "Filas SQS \"Órfãs\" de Sistemas Antigos Acumulando Mensagens",
                descricao: "Manter filas criadas para microsserviços desativados que continuam recebendo mensagens órfãs sem nenhum consumidor ativo."
            },
            {
                titulo: "Falta de Monitoramento de Mensagens Atrasadas na Fila (ApproximateNumberOfMessagesVisible)",
                descricao: "Não configurar alarmes CloudWatch para o acúmulo de mensagens não processadas, resultando em lentidão silenciosa no processamento de pagamentos."
            },
            {
                titulo: "Uso de Filas SQS Standard para Eventos de Alta Concorrência sem Tratamento de Idempotência",
                descricao: "Processar a mesma mensagem duas vezes devido a entregas at-least-once do SQS Standard sem garantir idempotência no banco de dados receptor."
            },
            {
                titulo: "Retenção de Mensagens Exagerada (4 Dias a 14 Dias) em Filas de Teste",
                descricao: "Manter o prazo máximo de retenção de mensagens ativado em filas de homologação onde mensagens antigas de testes corrompem execuções futuras."
            },
            {
                titulo: "Falta de Criptografia com KMS em Filas que Tratam Dados Pessoais (LGPD/Compliance)",
                descricao: "Deixar filas SQS sem criptografia gerenciada por chave KMS para processamento de dados confidenciais de clientes bancários."
            },
            {
                titulo: "Uso de SQS FIFO com Message Group ID Inadequado (Gargalo de Concorrência)",
                descricao: "Utilizar um único ID de grupo de mensagens em uma fila FIFO, estrangulando o processamento paralelo e reduzindo a fila a uma execução estritamente sequencial."
            },
            {
                titulo: "Tráfego de Mensagens Roteado pela Internet Pública sem VPC Endpoints",
                descricao: "Microsserviços enviando dados para o SQS pela internet pública ou NAT Gateway em vez de usar VPC Endpoints (Interface) gratuitos/locais."
            },
            {
                titulo: "Processamento Síncrono Bloqueante em Vez de Consumo Assíncrono Otimizado",
                descricao: "Aplicações EC2 travando threads inteiras aguardando resposta de filas SQS em vez de usar ouvintes baseados em eventos (Event Source Mappings)."
            },
            {
                titulo: "Falta de Limpeza de Mensagens na DLQ (Dead Letter Queue Accumulation)",
                descricao: "Permitir que milhares de mensagens com erro fiquem acumuladas na DLQ por meses sem investigação de causa raiz pela equipe de engenharia."
            },
            {
                titulo: "Duplicação de Filas por Microsserviços para a Mesma Finalidade de Negócio",
                descricao: "Criar filas separadas para cada pequena variação de um serviço de notificação em vez de usar uma fila centralizada com roteamento por atributos."
            },
            {
                titulo: "Falta de Configuração de Retentativas (MaxReceiveCount) Adequadas na DLQ",
                descricao: "Definir um limite de tentativas muito alto (ex: 50 vezes) para mensagens corrompidas, travando os workers em loop antes de enviar para a DLQ."
            },
            {
                titulo: "Uso de SQS para Logs de Baixo Valor Operacional",
                descricao: "Enviar trilhas completas de rastreamento de infraestrutura para o SQS em vez de usar ferramentas dedicadas de log como CloudWatch ou Kinesis."
            },
            {
                titulo: "Falta de Alertas de Custo para Uso Excessivo de Requisições de SQS (API Requests)",
                descricao: "Não monitorar o volume de chamadas de API cobradas, dado que o SQS cobra por milhão de requisições após o tier gratuito."
            },
            {
                titulo: "Ausência de Documentação dos Contratos de Mensagem (Payload Schemas)",
                descricao: "Enviar dados sem validação de schema para o SQS, gerando falhas em cascata em microsserviços consumidores que recebem formatos inesperados."
            }
        ]
    },
    "Amazon SNS": {
        titulo: "SNS",
        topicos: [
            {
                titulo: "Uso de Tópicos SNS para Entrega Direta de Alta Frequência a Clientes Finais",
                descricao: "Utilizar o SNS para disparar SMS ou notificações push em massa para milhões de clientes bancários sem controle de custos por mensagem enviada."
            },
            {
                titulo: "Falta de Uso de Filtros de Assinatura (Subscription Filter Policies)",
                descricao: "Enviar todas as mensagens de um tópico para todos os subscritores (Lambdas, SQS, HTTP endpoints), fazendo cada microsserviço processar eventos irrelevantes e pagar chamadas desnecessárias."
            },
            {
                titulo: "Tópicos SNS \"Órfãos\" sem Assinantes Ativos (Dead Topics)",
                descricao: "Publicar eventos em tópicos que não possuem nenhum endpoint ou fila inscrita, resultando em descarte silencioso de dados sem rastreabilidade de negócio."
            },
            {
                titulo: "Falta de Configuração de DLQ para Entregas HTTP/S de Webhooks",
                descricao: "Enviar notificações via SNS para APIs de parceiros externos sem configurar uma fila de falhas (Delivery Status / DLQ), perdendo eventos críticos de integração quando o servidor externo cai."
            },
            {
                titulo: "Uso de SNS Standard para Eventos que Exigem Ordem Estrita de Entrega",
                descricao: "Utilizar tópicos SNS padrão onde a ordem de chegada das mensagens aos assinantes não é garantida, gerando falhas em fluxos de auditoria e saldo."
            },
            {
                titulo: "Exposição de Dados Sensíveis (PII/Financeiros) em Mensagens Não Criptografadas",
                descricao: "Publicar payloads contendo CPFs, saldos e senhas mascaradas em tópicos SNS sem criptografia KMS rigorosa ou sem mascaramento na origem."
            },
            {
                titulo: "Falta de Monitoramento de Taxas de Falha de Entrega (NumberOfNotificationsFailed)",
                descricao: "Não configurar alarmes CloudWatch para falhas de publicação em endpoints HTTP externos ou filas SQS assinadas."
            },
            {
                titulo: "Duplicação de Tópicos para Eventos Semelhantes entre Sistemas",
                descricao: "Criar múltiplos tópicos SNS para notificar eventos de pagamento em vez de usar um único tópico com filtragem por atributos de cabeçalho."
            },
            {
                titulo: "Uso de SNS para Comunicação Interna Ponto a Ponto (Point-to-Point)",
                descricao: "Utilizar SNS para ligar um único produtor a um único consumidor, quando a arquitetura deveria usar uma fila SQS direta ou chamada síncrona."
            },
            {
                titulo: "Falta de Configuração de Delivery Status Logging para Auditoria",
                descricao: "Não habilitar logs de status de entrega para endpoints HTTP e SMS, impossibilitando a comprovação de envio de notificações regulatórias aos clientes."
            },
            {
                titulo: "Disparos em Massa de SMS sem Validação de Custos Prévios",
                descricao: "Enviar campanhas de marketing ou códigos OTP via SMS pelo SNS sem monitorar o custo por país e operadora, gerando faturas elevadas inesperadas."
            },
            {
                titulo: "Uso de Assinaturas de E-mail (SMTP) para Alertas de Produção em Escala",
                descricao: "Cadastrar centenas de e-mails individuais diretamente em assinaturas SNS para alertas de infraestrutura em vez de enviar para uma fila SQS ou ferramenta de centralização de chamados."
            },
            {
                titulo: "Falta de Restrição de Permissões de Publicação nas Políticas do Tópico (Access Policy)",
                descricao: "Permitir que qualquer conta externa ou perfil IAM publique mensagens arbitrárias em tópicos corporativos confidenciais."
            },
            {
                titulo: "Uso de SNS FIFO com Configurações Inadecoradas de Message Deduplication ID",
                descricao: "Enviar eventos duplicados em tópicos FIFO por falha na geração de IDs de deduplicação na origem, bloqueando o fluxo de processamento."
            },
            {
                titulo: "Tráfego de Publicação Roteado via Internet Pública sem VPC Endpoints",
                descricao: "Microsserviços publicando eventos no SNS pela internet ou NAT Gateway em vez de usar VPC Endpoints (Interface) locais."
            },
            {
                titulo: "Falta de Limpeza de Assinaturas Inativas ou Endpoints HTTP Inexistentes",
                descricao: "Manter subscritores apontando para servidores de homologação antigos que retornam erro HTTP 404/500 continuamente."
            },
            {
                titulo: "Uso de SNS para Logs de Aplicação de Baixo Valor",
                descricao: "Enviar trilhas inteiras de logs de depuração para tópicos SNS, gerando sobrecarga de processamento nos assinantes."
            },
            {
                titulo: "Falta de Alertas de Custo para Chamadas de API e SMS Excedentes",
                descricao: "Não monitorar o crescimento no volume de requisições de publicação e envio de mensagens de texto na fatura mensal."
            },
            {
                titulo: "Ausência de Tratamento de Exceções de Throttling na Publicação",
                descricao: "Microsserviços que encontram limites de taxa (Throttling) ao publicar no SNS e falham sem tentar reenvio com backoff exponencial."
            },
            {
                titulo: "Falta de Documentação dos Formatos de Notificação Publicados",
                descricao: "Alterar a estrutura JSON do payload enviado em tópicos SNS sem alinhar com as equipes consumidoras, quebrando os parsers downstream."
            }
        ]
    },
    "Amazon EventBridge": {
        titulo: "EventBridge",
        topicos: [
            {
                titulo: "Uso de Eventos Customizados sem Schema Registry Ativo",
                descricao: "Publicar eventos em barramentos customizados sem registrar seus schemas (EventBridge Schema Registry), dificultando a governança e gerando quebras em microsserviços consumidores."
            },
            {
                titulo: "Criação de Múltiplos Barramentos Customizados Desnecessários",
                descricao: "Criar um barramento de eventos separado para cada microsserviço pequeno em vez de centralizar no barramento padrão da conta e usar regras de roteamento por padrão de conteúdo."
            },
            {
                titulo: "Regras do EventBridge com Padrões de Evento (Event Patterns) Excessivamente Amplos",
                descricao: "Criar regras que capturam todos os eventos do barramento (detail-type: [““]) e enviar para alvos genéricos, forçando o alvo a processar e filtrar 99% de dados irrelevantes."
            },
            {
                titulo: "Falta de Configuração de DLQ para Alvos de Regras do EventBridge",
                descricao: "Direcionar eventos para funções Lambda ou APIs de destino sem configurar uma DLQ SQS para captura de falhas quando o destino está indisponível."
            },
            {
                titulo: "Uso de EventBridge para Ingestão de Dados de Alta Frequência e Baixo Valor",
                descricao: "Enviar milhões de eventos de telemetria de infraestrutura por segundo para o EventBridge (cujo modelo de cobrança é por milhão de eventos publicados), quando a ferramenta ideal seria Kinesis ou MSK."
            },
            {
                titulo: "Barramentos \"Órfãos\" de Aplicações Descontinuadas Custando Tarifa Fixa",
                descricao: "Manter barramentos de eventos customizados criados para testes que cobram taxa fixa mensal de manutenção por barramento ativo."
            },
            {
                titulo: "Falta de Roteamento Eficiente com Parâmetros de Transformação de Entrada (Input Transformer)",
                descricao: "Enviar o payload JSON completo de 20 KB do evento original para uma função Lambda que precisa apenas de 2 campos, desperdiçando largura de banda e processamento."
            },
            {
                titulo: "Tráfego Inter-Conta Mal Configurado em Barramentos de Eventos",
                descricao: "Conectar barramentos entre contas AWS diferentes sem regras restritas de permissão baseadas em chaves KMS e source accounts, abrindo brechas de segurança."
            },
            {
                titulo: "Falta de Monitoramento de Invocação de Alvos com Falha (InvocationsFailed)",
                descricao: "Não configurar alarmes CloudWatch para falhas de entrega de eventos para os alvos configurados nas regras."
            },
            {
                titulo: "Uso de EventBridge Scheduler sem Política de Limpeza de Tarefas Executadas",
                descricao: "Criar milhares de tarefas agendadas de uso único (One-time schedules) que não são expurgadas automaticamente após a execução."
            },
            {
                titulo: "Duplicação de Regras para o Mesmo Padrão de Evento",
                descricao: "Configurar múltiplas regras capturando exatamente o mesmo evento para disparar ações separadas em vez de direcionar para um tópico SNS ou fila SQS intermediária."
            },
            {
                titulo: "Uso de Polling e Rotinas Cron complexas em Vez de EventBridge Scheduler",
                descricao: "Manter instâncias EC2 rodando scripts cron em background para disparar tarefas quando o EventBridge Scheduler gerenciado resolveria a execução a custo zero de servidor."
            },
            {
                titulo: "Falta de Criptografia com Chaves KMS Personalizadas em Barramentos Customizados",
                descricao: "Deixar barramentos que transportam dados confidenciais de transações sem criptografia dedicada KMS."
            },
            {
                titulo: "Inclusão de Dados Sensíveis (PII) Diretamente nos Atributos de Eventos",
                descricao: "Inserir dados confidenciais de clientes no campo detail do evento sem mascaramento, expondo informações em logs de barramento."
            },
            {
                titulo: "Falta de Tratamento de Throttling em Alvos de Lambda Disparados pelo EventBridge",
                descricao: "Enviar picos de eventos para funções Lambda que estouram a concorrência máxima permitida (Concurrency Limit), gerando falhas de entrega."
            },
            {
                titulo: "Uso de Padrões de Expressão Cron Incorretos no Scheduler",
                descricao: "Configurar agendamentos com sintaxe incorreta que resultam em execuções repetidas em horários de pico indesejados."
            },
            {
                titulo: "Falta de Integração com APIs de Terceiros via Partner Event Sources Configurada Corretamente",
                descricao: "Erros na configuração de fontes de eventos de SaaS parceiros (como Datadog, PagerDuty, Salesforce), gerando perda de telemetria."
            },
            {
                titulo: "Ausência de Alertas de Custo para Contagem de Eventos Publicados",
                descricao: "Não monitorar o crescimento exponencial no volume de eventos publicados em barramentos customizados."
            },
            {
                titulo: "Uso de EventBridge para Comunicação Síncrona Bloqueante",
                descricao: "Tentar usar o barramento de eventos para fluxos que exigem resposta imediata e síncrona do receptor, violando o design assíncrono do EventBridge."
            },
            {
                titulo: "Falta de Documentação de Versionamento de Schemas de Eventos",
                descricao: "Modificar a estrutura dos objetos de evento publicados no barramento sem atualizar o Schema Registry, quebrando os consumidores downstream."
            }
        ]
    },
    "AWS DMS": {
        titulo: "DMS",
        topicos: [
            {
                titulo: "Manutenção de Instâncias de Replicação (Replication Instance) Ativas Pós-Migração",
                descricao: "Concluir a migração de bases de dados legadas para a nuvem e esquecer de desligar e excluir as instâncias de replicação do DMS, gerando faturas mensais contínuas por hora de máquina."
            },
            {
                titulo: "Uso de Instâncias de Replicação Superdimensionadas para Cargas Leves",
                descricao: "Provisionar instâncias gigantes de DMS (ex: dms.c5.9xlarge) para migrar bancos pequenos, desperdiçando orçamento com capacidade ociosa de CPU e RAM."
            },
            {
                titulo: "Falta de Uso do DMS Serverless para Tarefas Sazonais ou Migrações Pontuais",
                descricao: "Utilizar instâncias provisionadas fixas para migrações que rodam apenas em finais de semana, em vez de optar pelo DMS Serverless, que escala automaticamente e cobra apenas durante a execução."
            },
            {
                titulo: "Configuração Inadequada de LOBs (Large Objects) Causando Gargalo de Performance",
                descricao: "Configurar migração de colunas LOB (TEXT/BLOB) sem definir o modo Limited LOB ou tamanho adequado, forçando o DMS a processar dados byte a byte e estourar a memória."
            },
            {
                titulo: "Falta de Otimização de Tarefas de Carga Completa (Full Load) Paralelas",
                descricao: "Executar a carga inicial de tabelas gigantescas em uma única task sequencial sem particionar as tabelas por chave, demorando dias para finalizar."
            },
            {
                titulo: "Manutenção de Tarefas de Change Data Capture (CDC) Órfãs Rodando Indefinidamente",
                descricao: "Deixar a replicação contínua de CDC ativa após a virada de chave do sistema (Cutover), gerando consumo de rede e logs desnecessários na origem."
            },
            {
                titulo: "Falta de Monitoramento de Atraso na Replicação (CDCLatency)",
                descricao: "Não configurar alarmes CloudWatch para o lag de replicação do DMS, resultando em dessincronização silenciosa entre a base legada e o banco Aurora na nuvem."
            },
            {
                titulo: "Uso de Configurações de Rede sem VPC Endpoints para S3 ou Redshift",
                descricao: "Tarefas do DMS gravando dados migrados para o S3 ou Redshift trafegando pela internet pública ou NAT Gateway em vez de usar conexões locais."
            },
            {
                titulo: "Falta de Limpeza de Tabelas de Erro e Metadados do DMS (Table Statistics)",
                descricao: "Acumular gigabytes de registros de erro e tabelas temporárias geradas pelo DMS no banco de destino durante tentativas falhas de migração."
            },
            {
                titulo: "Migração de Dados Históricos Inúteis sem Filtragem Prévia (Transformation Rules)",
                descricao: "Migrar 10 anos de logs de auditoria mortos do banco legado para o novo banco na nuvem em vez de filtrar apenas dados ativos."
            },
            {
                titulo: "Uso de Instâncias de Gerações Antigas do DMS (ex: dms.t2 ou dms.c4)",
                descricao: "Manter tarefas de replicação rodando em hardware legado por falta de atualização, pagando mais caro por menor desempenho."
            },
            {
                titulo: "Falta de Criptografia em Trânsito e Repouso nas Conexões de Origem e Destino",
                descricao: "Configurar endpoints do DMS sem exigir SSL/TLS nas conexões com bancos de dados locais, violando normas de segurança."
            },
            {
                titulo: "Uso do DMS para Sincronização Contínua de Longo Prazo em Vez de Arquiteturas de Mensageria",
                descricao: "Utilizar o DMS como ferramenta de integração permanente entre microsserviços de produção em vez de usar MSK, Kinesis ou SQS."
            },
            {
                titulo: "Falta de Configuração de Alertas de Custo para Tarefas de Longa Duração",
                descricao: "Não monitorar o custo acumulado de instâncias de replicação mantidas ativas por erros em scripts de mapeamento."
            },
            {
                titulo: "Execução de Múltiplas Tarefas de Migração Concorrentes na Mesma Instância Fraca",
                descricao: "Sobrecarregar uma única instância de replicação com dezenas de tasks simultâneas de grandes bancos de dados, provocando esgotamento de memória e falhas."
            },
            {
                titulo: "Falta de Testes de Carga de CDC em Ambientes de Homologación",
                descricao: "Validar a replicação contínua apenas em produção, enfrentando surpresas de latência de rede e estouros de log no banco legado durante o corte."
            },
            {
                titulo: "Uso de Permissões Excessivas para o Usuário do Banco de Dados no DMS",
                descricao: "Conceder privilégios de superusuário irrestrito nas origines e destinos para conexões do DMS em vez de usar perfis com escopo limitado."
            },
            {
                titulo: "Falta de Planejamento de Espaço em Disco para Logs de Transação na Origem",
                descricao: "O processo de leitura de CDC do DMS gerando retenção excessiva de logs de transação (Archived Redo Logs / Binlogs) na origem, travando o banco legado."
            },
            {
                titulo: "Duplicação de Tarefas de Carga para a Mesma Tabela por Erro de Mapeamento",
                descricao: "Configurar regras de transformação redundantes que migram a mesma tabela duas vezes para schemas diferentes no destino."
            },
            {
                titulo: "Ausência de Documentação dos Mapeamentos de Tipos de Dados Heterogêneos",
                descricao: "Migrar dados entre bancos de motores diferentes (ex: Oracle para Aurora PostgreSQL) sem validar conversões de tipos numéricos e datas, gerando corrupção silenciosa de dados."
            }
        ]
    },
    "Amazon Neptune": {
        titulo: "Neptune",
        topicos: [
            {
                titulo: "Uso de Instâncias Superdimensionadas para Cargas de Grafos com Baixo Tráfego",
                descricao: "Provisionar clusters Neptune robustos (como instâncias db.r5.12xlarge) sem dimensionar o perfil real de consultas (Gremlin/SPARQL), gerando ociosidade financeira."
            },
            {
                titulo: "Falta de Utilização de Instâncias Reservadas para Cargas Estáveis",
                descricao: "Operar clusters Neptune de produção 24/7 na modalidade sob demanda (On-Demand), ignorando descontos de instâncias reservadas de 1 a 3 anos."
            },
            {
                titulo: "Consultas de Grafos Mal Otimizadas (Full Graph Scans)",
                descricao: "Executar traversals e consultas Gremlin sem índices adequados ou limitadores de profundidade, consumindo 100% da CPU do cluster e travando o banco."
            },
            {
                titulo: "Falta de Configuração de Réplicas de Leitura para Distribuição de Carga",
                descricao: "Direcionar tanto gravações transacionais quanto consultas analíticas complexas de grafos para a mesma instância primária do Neptune."
            },
            {
                titulo: "Manutenção de Clusters de Homologación e Testes Ativos 24/7",
                descricao: "Deixar instâncias multi-AZ de desenvolvimento do Neptune ligadas ininterruptamente aos finais de semana sem execuções de testes."
            },
            {
                titulo: "Falta de Uso de Neptune ML com Instâncias de GPU Desligadas Pós-Treinamento",
                descricao: "Manter instâncias de computação pesada de Machine Learning (Graph Neural Networks) ativas após a conclusão da geração de modelos preditivos de fraude."
            },
            {
                titulo: "Armazenamento de Dados Históricos Irrelevantes na Base de Grafos",
                descricao: "Inserir nós e arestas em excesso sem política de expiração, inchando o tamanho do banco de dados e degradando a velocidade de navegação no grafo."
            },
            {
                titulo: "Falta de Monitoramento de Métricas de Memória JVM (BufferCacheHitRatio)",
                descricao: "Ignorar o cache de memória do Neptune, resultando em leituras constantes de disco (Disk Swaps) e lentidão sistêmica."
            },
            {
                titulo: "Uso de Instâncias de Gerações Antigas (ex: db.r4)",
                descricao: "Manter o cluster rodando em hardware legado por falta de atualização para gerações modernas baseadas em Graviton (db.r6g)."
            },
            {
                titulo: "Tráfego de Rede Inter-AZ sem Otimização de Conexão com Clientes",
                descricao: "Microsserviços consultando o Neptune a partir de zonas de disponibilidade diferentes, gerando latência e custos de transferência interna."
            },
            {
                titulo: "Falta de Uso de Snapshots Automatizados com Política de Limpeza",
                descricao: "Acumular centenas de snapshots manuais e automáticos antigos do Neptune sem retenção planejada no S3."
            },
            {
                titulo: "Cargas de Dados em Massa (Bulk Load) Ineficientes via API Individual",
                descricao: "Inserir milhões de nós de grafos um a um via comandos individuais de API em vez de usar o utilitário nativo de Bulk Load direto do S3."
            },
            {
                titulo: "Clusters \"Órfãos\" de Provas de Conceito (PoCs) Descontinuadas",
                descricao: "Manter instâncias do Neptune criadas para testes de motores de recomendação que já foram cancelados."
            },
            {
                titulo: "Falta de Criptografia com KMS Personalizado para Dados Sensíveis de Grafos",
                descricao: "Deixar de criptografar volumes de armazenamento do Neptune com chaves gerenciadas de segurança adequadas."
            },
            {
                titulo: "Uso de Modelagem de Dados de Grafos Inadequada (Supernodes)",
                descricao: "Criar nós com milhões de conexões de entrada/saída (Supernodes), travando o motor de travessia do Neptune durante consultas."
            },
            {
                titulo: "Falta de Alertas de Custo para Escalabilidade de Armazenamento e Computação",
                descricao: "Não monitorar o crescimento do volume de armazenamento alocado dinamicamente pelo Neptune."
            },
            {
                titulo: "Exportações e Backups Frequentes sem Necessidade Regulatória",
                descricao: "Executar cópias completas redundantes da base de grafos para o S3 em horários de pico de transações."
            },
            {
                titulo: "Ausência de Testes de Recuperação de Desastres (Failover Testing)",
                descricao: "Nunca validar se o processo de failover multi-AZ do Neptune ocorre sem perda de sessão nas aplicações consumidoras."
            },
            {
                titulo: "Falta de Integração com CloudWatch Logs para Auditoria de Consultas",
                descricao: "Não exportar logs de auditoria de consultas lentas ou tentativas de acesso não autorizadas para o CloudWatch."
            },
            {
                titulo: "Uso do Neptune para Tarefas Relacionais Simples",
                descricao: "Tentar modelar dados estritamente relacionais em um banco de grafos sem justificativa de valor analítico de conexões, encarecendo a infraestrutura."
            }
        ]
    },
    "Amazon DocumentDB": {
        titulo: "DocumentDB",
        topicos: [
            {
                titulo: "Uso de Instâncias Provisionadas Excessivas sem Auto Scaling de Leitura",
                descricao: "Provisionar clusters DocumentDB gigantes sem dimensionar adequadamente as instâncias de leitura para picos de consulta."
            },
            {
                titulo: "Falta de Criação de Índices Adequados para Consultas Frequentes (Missing Indexes)",
                descricao: "Executar buscas e filtros sem índices criados nas coleções, forçando o DocumentDB a fazer varreduras completas em disco (COLLSCAN), elevando o uso de CPU."
            },
            {
                titulo: "Manutenção de Ambientes de Teste e Staging Rodando 24/7",
                descricao: "Deixar clusters DocumentDB de homologación ligados ininterruptamente sem uso noturno ou aos finais de semana."
            },
            {
                titulo: "Uso de Instâncias de Gerações Antigas (ex: db.r5 em Vez de db.r6g Graviton)",
                descricao: "Manter instâncias rodando em hardware x86 antigo, perdendo performance e pagando tarifas mais altas por hora."
            },
            {
                titulo: "Retenção Prolongada de Snapshots e Backups Automáticos Exagerados",
                descricao: "Configurar prazos de retenção de backup de até 35 dias em coleções de testes ou dados efêmeros."
            },
            {
                titulo: "Falta de Uso de Instâncias Reservadas para Frotas de Produção Estáveis",
                descricao: "Operar clusters produtivos principais sob regime On-Demand por anos sem contratação de instâncias reservadas."
            },
            {
                titulo: "Conexões de Aplicação Não Pooladas Estourando o Limite do Banco",
                descricao: "Microsserviços abrindo novas conexões TCP diretamente com o DocumentDB a cada requisição sem usar connection pooling."
            },
            {
                titulo: "Tráfego de Rede Cruzado entre Zonas de Disponibilidade (Cross-AZ)",
                descricao: "Aplicações conectadas ao DocumentDB em AZs diferentes da instância primária, gerando latência e tráfego inter-AZ pago."
            },
            {
                titulo: "Armazenamento de Payloads Gigantes e Desestruturados sem Limpeza",
                descricao: "Inserir documentos JSON massivos e logs inteiros sem política de expiração (TTL Indexes), inflando o armazenamento em disco."
            },
            {
                titulo: "Falta de Monitoramento de Métricas de CPU e Memória (CPUUtilization / FreeableMemory)",
                descricao: "Não configurar alarmes para picos de consumo de recursos, resultando em quedas repentinas de serviço por falta de RAM."
            },
            {
                titulo: "Clusters \"Órfãos\" de Migrações Antigas Esquecidos na Conta",
                descricao: "Manter bancos DocumentDB subidos para testes de migração de MongoDB legado que já foram concluídos."
            },
            {
                titulo: "Execução de Consultas Analíticas Pesadas na Instância Primária de Produção",
                descricao: "Rodar agregações e relatórios gerenciais pesados ($aggregate) diretamente no nó Writer em vez de usar réplicas de leitura."
            },
            {
                titulo: "Falta de Criptografia em Repouso com Chaves Adequadas",
                descricao: "Deixar de ativar criptografia KMS em clusters que armazenam dados cadastrais de clientes."
            },
            {
                titulo: "Uso de DocumentDB para Transações Financeiras Estritamente Relacionais",
                descricao: "Tentar forçar transações ACID complexas e relacionalmente normalizadas em um banco NoSQL de documentos, gerando ineficiência de código."
            },
            {
                titulo: "Falta de Configuração de Alertas de Custo para Armazenamento Alocado Dinamicamente",
                descricao: "Não monitorar o crescimento do volume de armazenamento em disco do DocumentDB."
            },
            {
                titulo: "Exportações e Importações Massivas via mongodump Ineficientes",
                descricao: "Realizar cópias completas de bancos pesados pela rede sem otimização de thread e compressão."
            },
            {
                titulo: "Falta de Testes de Failover Multi-AZ em Horário Comercial",
                descricao: "Nunca validar a resiliência do cluster em cenários de queda da instância primária."
            },
            {
                titulo: "Uso de Parâmetros de Cluster Padrão sem Ajuste de Memória (Parameter Groups)",
                descricao: "Manter configurações padrão de cache e pool de conexões que não aproveitam a capacidade da máquina."
            },
            {
                titulo: "Duplicação de Bases de Dados entre Equipes sem Isolamento por Collection",
                descricao: "Criar clusters DocumentDB separados para cada microsserviço pequeno em vez de usar coleções isoladas no mesmo cluster."
            },
            {
                titulo: "Ausência de Logs de Auditoria Habilitados para Compliance (Audit Logs)",
                descricao: "Não exportar logs de acesso e alteração de dados para o CloudWatch Logs em ambientes regulados."
            }
        ]
    },
    "AWS MemoryDB for Redis": {
        titulo: "MemoryDB for Redis",
        topicos: [
            {
                titulo: "Uso de Instâncias Superdimensionadas para Cache/Sessões com Baixo Uso de Memória",
                descricao: "Provisionar clusters MemoryDB robustos (como instâncias db.r6g.4xlarge) quando o volume de dados em cache ocupa menos de 10% da RAM."
            },
            {
                titulo: "Falta de Definição de Políticas de Expiração (Eviction Policy / TTL)",
                descricao: "Armazenar dados no MemoryDB sem configurar TTL ou política de remoção (volatile-lru), fazendo o cluster esgotar a memória e travar novas gravações."
            },
            {
                titulo: "Manutenção de Clusters de Homologação Ativos 24/7 com Multi-AZ",
                descricao: "Manter ambientes de testes do MemoryDB estruturados com múltiplos nós em alta disponibilidade ligados ininterruptamente."
            },
            {
                titulo: "Falta de Utilização de Instâncias Reservadas para Produção Estável",
                descricao: "Operar clusters produtivos ininterruptamente na modalidade On-Demand sem contratação de nós reservados."
            },
            {
                titulo: "Armazenamento de Payloads Gigantescos no MemoryDB",
                descricao: "Guardar objetos JSON inteiros de dezenas de megabytes no cache, consumindo RAM veloz de forma ineficiente e gerando gargalos de serialização."
            },
            {
                titulo: "Conexões de Clientes Não Pooladas (Connection Storms)",
                descricao: "Microsserviços e Lambdas abrindo novas conexões TCP com o MemoryDB a cada requisição, esgotando o limite de conexões do cluster."
            },
            {
                titulo: "Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ) na Leitura/Escrita",
                descricao: "Aplicações conectadas a nós do MemoryDB em AZs diferentes da instância primária, gerando latência e tráfego inter-AZ."
            },
            {
                titulo: "Falta de Monitoramento de Uso de Memória via CloudWatch (FreeableMemory)",
                descricao: "Não configurar alarmes para o consumo de RAM, resultando em falhas de gravação e uso de swap quando a memória enche."
            },
            {
                titulo: "Uso de Instâncias de Gerações Antigas (ex: db.r5 em Vez de db.r6g Graviton)",
                descricao: "Manter clusters rodando em hardware x86 legado, pagando mais caro por menor throughput."
            },
            {
                titulo: "Clusters \"Órfãos\" de Migrações ou Testes de POC Esquecidos na Conta",
                descricao: "Manter clusters MemoryDB criados para testes de performance que já foram encerrados mas continuam gerando fatura."
            },
            {
                titulo: "Falta de Configuração de Snapshots Diários e Retenção Exagerada",
                descricao: "Configurar backups automáticos diários com retenção longa em clusters efêmeros de sessão, ocupando espaço no S3."
            },
            {
                titulo: "Uso de MemoryDB para Armazenamento de Longo Prazo sem Migração",
                descricao: "Tratar o cache durável como banco de dados relacional principal para dados históricos frios."
            },
            {
                titulo: "Falta de Uso de Cluster Mode para Bases de Dados Massivas",
                descricao: "Forçar o uso de um único nó gigante (Non-cluster mode) quando os dados ultrapassam a RAM física da máquina, em vez de particionar (shards)."
            },
            {
                titulo: "Fragmentação Elevada de Memória sem Rotinas de Manutenção",
                descricao: "Clusters rodando por meses com alta razão de fragmentação de memória, desperdiçando GBs de RAM não reaproveitados."
            },
            {
                titulo: "Falta de Criptografia em Trânsito e Repouso para Dados Sensíveis de Sessão",
                descricao: "Deixar de ativar TLS e criptografia KMS para dados confidenciais armazenados em cache."
            },
            {
                titulo: "Falta de Alertas de Custo para Aumento do Tamanho do Cluster e Nós",
                descricao: "Não monitorar o crescimento de nós alocados dinamicamente em expansões de cluster."
            },
            {
                titulo: "Uso de Comandos Bloqueantes Pesados no Redis (KEYS  / SMEMBERS)",
                descricao: "Desenvolvedores executando comandos bloqueantes na produção que travam a única thread do Redis, paralisando o sistema."
            },
            {
                titulo: "Falta de Testes de Failover e Recuperação do Translog",
                descricao: "Nunca validar o tempo de recuperação e re-sincronização do MemoryDB em falhas de nó primário."
            },
            {
                titulo: "Duplicação de Chaves de Cache entre Microsserviços Diferentes",
                descricao: "Equipes gravando as mesmas informações cadastrais em chaves separadas no mesmo cluster sem padronização."
            },
            {
                titulo: "Ausência de Logs de Slow Commands Habilitados para Diagnóstico",
                descricao: "Não monitorar comandos lentos no MemoryDB para identificar gargalos de código de aplicação."
            }
        ]
    },
    "Amazon Athena": {
        titulo: "Athena",
        topicos: [
            {
                titulo: "Consultas a Arquivos Brutos Não Particionados no S3 (Full Scans)",
                descricao: "Executar queries SQL no Athena sobre petabytes de arquivos CSV ou JSON brutos sem particionamento por data ou organização, fazendo o Athena escanear 100% dos dados e disparar custos massivos (US$ 5,00 por TB escaneado)."
            },
            {
                titulo: "Falta de Conversão de Dados para Formatos Colunares Compactados (Parquet/ORC)",
                descricao: "Manter tabelas do Data Lake armazenadas em formatos pesados de texto plano em vez de usar Apache Parquet, que reduz o volume de dados escaneados em até 90%."
            },
            {
                titulo: "Uso de Consultas sem Cláusula LIMIT ou Filtros de Partição em Tabelas Gigantescas",
                descricao: "Analistas de dados executando SELECT  FROM transacoes sem filtros de data (WHERE ano/mes/dia), escaneando terabytes desnecessários por descuido."
            },
            {
                titulo: "Falta de Limpeza de Resultados Temporários de Consultas no S3",
                descricao: "Executar milhares de queries no Athena sem configurar regras de expiração no bucket S3 de resultados gerados automaticamente (Athena Results Bucket), acumulando lixo digital."
            },
            {
                titulo: "Uso do Athena para Relatórios Operacionais Transacionais de Alta Frequência",
                descricao: "Consultar dados no S3 via Athena em tempo real para alimentar telas de aplicativos móveis em vez de usar bancos de dados transacionais rápidos (DynamoDB ou Aurora)."
            },
            {
                titulo: "Falta de Uso de Workgroups com Limites de Custo de Consulta (Query Result Location / Data Scanned Limits)",
                descricao: "Não configurar limites rígidos de gigabytes escaneados por consulta nos Workgroups do Athena, permitindo que usuários executem queries mal estruturadas sem teto de gasto."
            },
            {
                titulo: "Consultas Complexas com JOIN e Subqueries Aninhadas sem Otimização de Ordem",
                descricao: "Escrever SQLs ineficientes que forçam o motor Presto a realizar barramentos massivos de dados na memória, gerando erros de Query Exhausted Resources."
            },
            {
                titulo: "Falta de Utilização de Partições Automáticas via Glue Data Catalog (MSCK REPAIR TABLE)",
                descricao: "Não automatizar a recuperação de partições de novos dados que chegam ao S3, exigindo varreduras manuais e custosas."
            },
            {
                titulo: "Uso de Contas de Cientistas de Dados sem Governança de Workgroups Isolados",
                descricao: "Permitir que todas as equipes compartilhem o mesmo Workgroup sem rastreabilidade de quem consumiu qual orçamento de escaneamento de dados."
            },
            {
                titulo: "Duplicação de Consultas Idênticas sem Estratégia de Caching de Resultados",
                descricao: "Reexecutar exatas mesmas queries analíticas várias vezes ao dia por falta de cache de resultados ou painéis consolidados em BI."
            },
            {
                titulo: "Falta de Particionamento por Hashing ou Bucketing em Tabelas Massivas",
                descricao: "Organizar tabelas grandes apenas por data sem aplicar particionamento secundário para consultas filtradas por ID de cliente ou agência."
            },
            {
                titulo: "Uso do Athena para Tarefas de ETL Pesadas que Deveriam Rodar no Glue/Spark",
                descricao: "Tentar transformar e limpar bases de dados inteiras usando apenas comandos complexos de INSERT INTO via Athena em vez de usar pipelines Spark no Glue."
            },
            {
                titulo: "Falta de Monitoramento de Falhas de Consulta (QueryFailed)",
                descricao: "Não configurar alarmes para erros recorrentes de sintaxe ou estouros de limites de memória em queries agendadas de BI."
            },
            {
                titulo: "Tráfego de Resultados de Consulta Roteado Ineficientemente",
                descricao: "Ferramentas de BI externas baixando resultados brutos gigantescos do Athena pela internet sem compactação ou paginação."
            },
            {
                titulo: "Uso de Tipos de Dados Inflados em Tabelas Externas do S3 (ex: STRING em vez de INT/TIMESTAMP)",
                descricao: "Definir colunas numéricas ou de data como STRING no catálogo do Glue, degradando a performance de filtragem e aumentando o custo de processamento do Presto."
            },
            {
                titulo: "Falta de Alertas de Custo Diário para o Consumo do Athena",
                descricao: "Não monitorar o acumulado diário de TBs escaneados por consultas, permitindo surpresas financeiras no fechamento do mês."
            },
            {
                titulo: "Criação de Vistas (Views) Complexas Aninhadas em Cascata",
                descricao: "Desenvolver dezenas de views virtuais umas sobre as outras no Athena, gerando planos de execução de consulta ineficientes e lentos."
            },
            {
                titulo: "Falta de Uso de Athena Prepared Statements para Consultas Repetitivas",
                descricao: "Recompilar planos de execução para consultas parametrizadas idênticas executadas em alta frequência por aplicações analíticas."
            },
            {
                titulo: "Uso de Athena com Permissões IAM Excessivas para Usuários Finais",
                descricao: "Conceder acesso irrestrito de leitura a todos os buckets do Data Lake corporativo para qualquer usuário que utilize o console do Athena."
            },
            {
                titulo: "Ausência de Documentação do Dicionário de Dados das Tabelas Externas",
                descricao: "Consultar o S3 sem metadados claros, resultando em reexecuções constantes de queries exploratórias de alto custo financeiro."
            }
        ]
    }
});
