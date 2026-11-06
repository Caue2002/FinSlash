(() => {
    const criarTopicos = linhas => linhas.trim().split('\n').map(linha => {
        const [titulo, descricao] = linha.split('\t');
        return { titulo, descricao };
    });

    window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
        'AWS Lambda': {
            titulo: 'Lambda',
            topicos: criarTopicos(`
Provisionamento Excessivo de Memória RAM (Over-provisioning)	Configurar funções Lambda com o limite máximo de memória (ex: 10 GB) por padrão para executar scripts simples de validação, pagando mais caro pelo tempo de CPU associado sem necessidade real.
Falta de Configuração de Limites de Concorrência (Reserved Concurrency)	Deixar funções Lambda sem limite de concorrência máxima, permitindo que loops de software ou picos de tráfego exaurem o limite de instâncias da conta AWS e afetem outros serviços.
Erros de Inicialização a Frio (Cold Starts) em Rotas Críticas de Baixa Latência	Desenvolver funções Lambda pesadas com pacotes de dependências gigantescos em linguagens lentas para inicialização (como Java ou .NET mal estruturados) sem o uso de Provisioned Concurrency.
Falta de Uso de Provisioned Concurrency para Funções Críticas de Banco	Não provisionar instâncias quentes para funções Lambda que atendem ao Internet Banking ou autorização de cartões, gerando latência perceptível ao usuário nas primeiras chamadas.
Uso de Lambdas para Tarefas de Longa Duração (> 15 minutos)	Tentar executar processamentos pesados de relatórios ou migrações de dados que estouram o limite estrito de 15 minutos do Lambda, exigindo refatoração para AWS Batch ou ECS.
Falta de Tratamento de Retentativas Assíncronas e Ausência de DLQ	Funções Lambda acionadas de forma assíncrona (via S3, SNS ou EventBridge) que falham e tentam reexecutar em loop infinito sem configurar uma Dead Letter Queue (DLQ) ou destino de falha (Destination).
Conexões de Banco de Dados Não Pooladas Abertas a Cada Execução	Funções Lambda que abrem uma nova conexão TCP com o Aurora ou RDS dentro do handler da função a cada invocação, estourando o limite de conexões do banco de dados.
Tráfego de Rede Roteado Ineficientemente via NAT Gateway	Conectar funções Lambda a subredes privadas em VPCs sem configurar VPC Endpoints, fazendo todo o tráfego para S3, DynamoDB ou Secrets Manager passar por NAT Gateways pagos.
Retenção Prolongada e Indefinida de Logs no CloudWatch (Log Groups)	Manter grupos de logs de funções Lambda de desenvolvimento e homologação configurados sem política de expiração, acumulando custos massivos de armazenamento de logs.
Inclusão de Dados Sensíveis (PII) Diretamente nos Logs de Execução	Imprimir payloads inteiros de requisições de clientes (contendo CPFs, chaves Pix e dados bancários) no console (console.log / print), gerando graves falhas de compliance e segurança.
Falta de Otimização do Pacote de Deployment (Deployment Package Bloat)	Enviar arquivos ZIP gigantescos contendo node_modules inteiros ou bibliotecas de Machine Learning não utilizadas para o Lambda, aumentando o tempo de download e inicialização.
Uso de Versões Desatualizadas de Runtimes (Node.js, Python, Java)	Manter funções Lambda rodando em versões de runtime com fim de vida (End-of-Life) e sem suporte a patches de segurança da AWS.
Falta de Monitoramento de Falhas e Erros (InvocationsFailed / Errors)	Não configurar alarmes CloudWatch para taxas de erro em funções Lambda críticas de pagamento, resultando em falhas silenciosas de processamento.
Duplicação de Funções Lambda para Lógicas Semelhantes	Criar dezenas de funções Lambda separadas para pequenas variações de regras de negócio em vez de usar uma única função parametrizada por variáveis de ambiente ou eventos.
Uso de Lambda para Processamento Contínuo 24/7 de Fila (Polling Contínuo)	Manter funções Lambda acionadas por loops de polling em vez de usar os gatilhos nativos baseados em eventos (Event Source Mappings).
Falta de Alertas de Custo para Execuções Descontroladas (Invocation Storms)	Não configurar orçamentos no AWS Budgets para o volume de invocações e milissegundos computados, permitindo surpresas financeiras por loops de software.
Criação de Variáveis de Ambiente com Segredos em Texto Plano	Armazenar senhas de banco de dados e chaves de API diretamente nas variáveis de ambiente do Lambda em vez de usar o AWS Secrets Manager ou Parameter Store.
Falta de Configuração de Arquitetura de Processador Otimizada (x86 em vez de ARM Graviton)	Manter funções Lambda rodando em processadores x86 tradicionais em vez de migrar para a arquitetura AWS Graviton2, que reduz o custo de computação em até 20% com melhor desempenho.
Execução de Consultas pesadas de Athena/S3 Síncronas Bloqueantes	Funções Lambda que disparam consultas analíticas no Athena e ficam travadas esperando o resultado síncrono por minutos, esgotando o tempo limite de execução.
Falta de Testes de Carga de Concorrência em Ambientes Isolados	Validar o comportamento de escalabilidade do Lambda apenas em produção, enfrentando falhas de Throttling repentinas em picos de acesso.
            `)
        },
        'Amazon ECS': {
            titulo: 'ECS',
            topicos: criarTopicos(`
Uso de Tarefas Fargate Superdimensionadas sem Alinhamento de Carga	Configurar tarefas do ECS Fargate com cotas fixas elevadas de CPU e Memória (ex: 4 vCPUs e 16 GB de RAM) para microsserviços leves que consomem menos de 10% desses recursos.
Manutenção de Ambientes de ECS Fargate Ativos 24/7 sem Escala Automática	Manter serviços ECS em ambientes de homologação e desenvolvimento rodando com contagem fixa de tarefas (Desired Count > 0) ininterruptamente durante madrugadas e finais de semana.
Falta de Uso de Fargate Spot para Cargas Tolerantes a Falhas	Rodar serviços de processamento em segundo plano, filas de lote ou ambientes de QA utilizando exclusivamente capacidade Fargate On-Demand de preço cheio, perdendo descontos de até 70% com Fargate Spot.
Falta de Configuração de Auto Scaling Baseado em Métricas Reais (Target Tracking Scaling)	Manter o número de tarefas fixo em produção, gerando lentidão em picos de acesso (como abertura de mercado) ou desperdício de dinheiro nos horários de vale.
Uso de Instâncias EC2 em Modo Managed Instances sem Otimização de Empacotamento (Bin Packing)	Cluster ECS rodando em instâncias EC2 subutilizadas onde os containers ficam espalhados de forma ineficiente, exigindo mais máquinas físicas do que o necessário.
Tráfego de Rede Cruzado entre Zonas de Disponibilidade (Cross-AZ Task Placement)	Configurar serviços ECS sem restringir a distribuição de tarefas nas mesmas zonas de disponibilidade dos bancos de dados, gerando custos pesados de transferência inter-AZ.
Falta de Configuração de Limites de Recursos (Resource Limits) nas Definições de Tarefa	Omitir limites rígidos de memória e CPU no arquivo de definição de tarefa (Task Definition), permitindo que um microsserviço com vazamento de memória (Memory Leak) derrube os demais containers da mesma instância EC2.
Imagens Docker Gigantes e Não Otimizadas	Construir imagens de container pesadas (acima de 2 GB) contendo pacotes desnecessários de compilação, aumentando o tempo de deploy (Pull Time) e o consumo de armazenamento no Amazon ECR.
Retenção Descontrolada de Logs de Containers no CloudWatch	Configurar o driver de log do ECS (awslogs) para enviar fluxos massivos de texto de debug de centenas de microsserviços para o CloudWatch sem políticas de retenção curta.
Falta de Health Checks Adequados Configurados no Application Load Balancer (ALB)	Configurar verificações de saúde (Health Checks) genéricas ou com intervalos muito curtos, provocando reinicializações desnecessárias (Container Thrashing) em momentos de alta carga.
Serviços ECS Órfãos de Versões Anteriores de Deploy Não Removidos	Manter dezenas de versões antigas de serviços e Task Definitions ativas ou registradas acumulando metadados e confusão operacional na conta.
Falta de Criptografia e Gerenciamento Seguro de Variáveis de Ambiente	Inserir credenciais e chaves de API em texto plano diretamente nas variáveis de ambiente do ECS em vez de injetar de forma segura via Secrets Manager ou Parameter Store.
Uso de Armazenamento EBS ou EFS em Conflito com a Filosofia Efêmera de Containers	Anexar volumes persistentes de forma incorreta a tarefas Fargate sem planejar o ciclo de vida dos dados em caso de reinicialização da tarefa.
Falta de Monitoramento de Utilização de CPU e Memória dos Serviços ECS	Não configurar alarmes CloudWatch para estrangulamento de recursos (CPUUtilization > 85%), resultando em quedas repentinas de microsserviços bancários.
Uso de Registros de Imagens ECR sem Políticas de Ciclo de Vida (Lifecycle Policies)	Acumular milhares de tags antigas de imagens Docker no Amazon ECR sem limpeza automática, inflando a fatura de armazenamento de artefatos.
Tráfego de Entrada/Saída Roteado via NAT Gateway sem Endpoints	Containers acessando serviços AWS (S3, DynamoDB, SQS) através de NAT Gateways pagos em vez de usar VPC Endpoints locais.
Falta de Atualização de Agentes e Runtimes do ECS nas Instâncias EC2	Manter o ECS Container Agent desatualizado em nós EC2 gerenciados, expondo a infraestrutura a vulnerabilidades e falhas de compatibilidade.
Duplicação de Clusters ECS por Unidades de Negócio Sem Governança	Criar clusters ECS separados para cada microsserviço menor em vez de organizar os serviços em clusters compartilhados por domínio corporativo.
Falta de Testes de Resiliência e Recuperação de Tarefas (Task Recovery)	Nunca validar se o balanceador de carga redireciona o tráfego corretamente quando o ECS reinicia tarefas durante deploys contínuos (Rolling Update).
Ausência de Alertas de Custo para Escalabilidade Descontrolada de Fargate	Não configurar orçamentos no AWS Budgets para o consumo de vCPU e GB/hora do ECS Fargate, permitindo estouros financeiros em cenários de tráfego anômalo.
            `)
        }
    });
})();
