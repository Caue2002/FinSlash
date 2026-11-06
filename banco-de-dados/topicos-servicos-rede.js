(() => {
    const criarTopicos = linhas => linhas.trim().split('\n').map(linha => {
        const [titulo, descricao] = linha.split('\t');
        return { titulo, descricao };
    });

    window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
        'AWS Direct Connect': {
            titulo: 'Direct Connect',
            topicos: criarTopicos(`
Contratação de Portas Dedicadas de 10 Gbps para Tráfego Baixo	Provisionar conexões dedicadas de 10 ou 100 Gbps para tráfego que poderia ser atendido por Hosted Connections de 1 Gbps aumenta o custo do link.
Manutenção de Conexões de Backup Dedicadas Ociosas	Pagar mensalmente pela taxa de porta de links redundantes usados apenas para failover e com 0% de utilização contínua.
Tráfego de Dados de Saída sem Uso de Direct Connect Gateway (DXGW)	Roteiar tráfego inter-região por VPN na internet em vez de centralizar pelo Direct Connect Gateway perde descontos na tarifa de saída de dados.
Falta de Aproveitamento de Tarifas Reduzidas de DTO	Não encaminhar tráfego pesado da AWS ao Data Center local pelo Direct Connect pode deixar a tarifa de saída mais cara que a conexão dedicada.
Uso do Transit Gateway (TGW) sobre DX sem Otimização de Anexos	Conectar vários Direct Connects ao Transit Gateway sem consolidar redes duplica taxas por hora de anexos e por GB processado.
Manutenção de Conexões DX de Testes/PoCs Ativas	Manter portas contratadas para migrações ou provas de conceito após o término dos projetos gera cobrança desnecessária.
Alocação Ineficiente de Virtual Interfaces (VIFs)	Criar VIFs privadas individuais para cada VPC em vez de usar um Direct Connect Gateway compartilhado aumenta a complexidade de rede.
Transferência de Dados Inter-Região Não Planejada via DXGW	Roteiar dados de uma VPC na Virgínia pelo Data Center no Brasil pode gerar custos inesperados de tráfego inter-região.
Falta de Monitoramento de Banda e Tráfego Ocioso	Pagar por links parceiros de alta capacidade que transportam menos de 5% do tráfego previsto mantém capacidade ociosa.
Tráfego do S3/DynamoDB Roteado pela Internet em Vez de Public VIF	Transferir terabytes do Data Center para S3 pela internet em vez de Public VIF deixa de aproveitar a tarifa reduzida de saída.
Uso de Criptografia MACsec sem Avaliação de Hardware	Ativar MACsec em portas dedicadas pode exigir hardware mais caro do parceiro sem obrigação regulatória.
Sobrecarga de Custos com Links de Operadoras Parceiras (Partner Interconnects)	Não negociar planos de burst ou flexibilidade com a operadora que conecta o Data Center ao Direct Connect pode elevar os custos.
Falta de Resiliência Resultando em Redirecionamento por Internet	Redundância incorreta pode desviar tráfego para a internet durante falhas no Direct Connect, gerando tarifas maiores de saída.
Não Utilização do AWS Site-to-Site VPN como Backup Econômico	Contratar dois Direct Connects para sistemas não críticos pode custar mais do que combinar um link principal com VPN de backup.
Uso de Interconexões Multi-Cloud Sem Ponto Central de Troca	Manter conexões DX separadas para cada nuvem em vez de um Cloud Exchange centralizado aumenta custos e complexidade.
Falta de Tagging e Rateio de Custos da Porta DX	Não associar a porta a centros de custo impede o rateio correto da taxa fixa entre as unidades do banco.
Crescimento Descontrolado do Tráfego de Analytics pela Rede Local	Transferir dados brutos da AWS para on-premises em vez de processá-los na nuvem aumenta uso e custos de rede.
Manutenção de Links Legados em Conexões de Menor Velocidade	Acumular várias portas antigas de 1 Gbps em vez de consolidar a capacidade pode manter custos duplicados.
Ausência de Controle de MTU (Jumbo Frames)	Não configurar MTU 9001 aumenta a sobrecarga de pacotes e reduz a eficiência do tráfego.
Falta de Alarmes CloudWatch para Estado do Link (ConnectionState)	Não detectar a queda do link principal pode manter o tráfego em rotas de contingência mais caras por semanas.
            `)
        },
        'Amazon CloudFront': {
            titulo: 'CloudFront',
            topicos: criarTopicos(`
Servindo Arquivos Estáticos Direto do S3/EC2 sem Cache	Servir imagens, PDFs e arquivos JS diretamente da origem em vez de usar cache CloudFront aumenta a tarifa de saída de dados.
Uso da Classe de Preço Padrão (Price Class All) sem Necessidade	Manter todas as zonas de borda para público exclusivamente nacional pode custar mais que usar Price Class 100 ou 200.
Invalidações de Cache em Massa (*) em Alta Frequência	Invalidar todos os caminhos a cada deploy pode exceder os 1.000 caminhos gratuitos mensais e gerar cobrança adicional.
Respostas Dinâmicas de API sem Cache de Curta Duração	Enviar todas as consultas de APIs diretamente à origem sem micro-caching sobrecarrega os servidores de backend.
Repasses Ineficientes de Headers, Query Strings e Cookies	Repassar todos os headers, cookies e parâmetros invalida a reutilização do cache e faz cada requisição atingir a origem.
Entregando Mídias e Comprovantes sem Compressão Automática	Desativar Gzip ou Brotli transfere arquivos maiores e aumenta o custo por GB.
Ausência de Uso de CloudFront Functions / Edge@Lambda para Tarefas Simples	Usar EC2 ou containers para redirecionamentos, headers ou geoblocking pode custar mais que executá-los na borda.
Uso de Lambda@Edge para Lógicas Simples em Vez de CloudFront Functions	Usar Lambda@Edge para manipulação básica de headers pode custar mais e ter maior latência que CloudFront Functions.
Falta de Configuração do Origin Shield	Distribuições de alto tráfego sem Origin Shield podem fazer várias zonas de borda buscarem repetidamente o mesmo objeto na origem.
Falta de Integração Otimizada com o AWS WAF	Regras pesadas e sem filtro prévio em distribuições de alto tráfego elevam a inspeção por requisição.
Transferência de Origem (CloudFront para S3/ALB) em Regiões Diferentes	Manter a origem em outra região pode gerar tráfego inter-região entre o ponto de presença e o servidor.
Distribuições Órfãs de Ambientes de Testes Descontinuados	Manter distribuições ativas conectadas a ambientes de staging desligados continua gerando custos.
Upload de Arquivos Grandes via CloudFront sem Multipart Direto ao S3	Encaminhar uploads pesados pelo CloudFront em vez de URLs pré-assinadas para S3 pode adicionar tráfego e custo.
Ausência de Certificados SSL/TLS Gratuitos do AWS Certificate Manager (ACM)	Pagar por certificados de terceiros quando certificados gerenciados gratuitos do ACM atendem à distribuição aumenta os custos.
Configuração de TTLs Inadequados (TTL Mínimo/Máximo zerado)	TTL zero para arquivos estáticos força revalidação de cada requisição na origem.
Falta de Uso do CloudFront Security Savings Bundle	Não avaliar o Security Savings Bundle pode deixar de aproveitar descontos de tráfego associados ao compromisso mensal.
Acesso Direto à Origem Não Bloqueado (Falta de OAC/OAI)	Permitir acesso público direto ao S3 contorna o cache e pode gerar tráfego de saída não planejado.
Logs de Acesso em Tempo Real (Real-time Logs) Ativados sem Filtro	Enviar 100% dos logs ao Kinesis sem amostragem eleva os custos de ingestão.
Requisições de Preflight HTTP OPTIONS Passando para a Origem	Não responder OPTIONS no cache da borda envia cada checagem CORS ao backend.
Monitoramento com Alarmes Falsos Gerando Testes de Carga na Borda	Executar testes de estresse sem alinhamento com o suporte AWS pode gerar custos imprevistos de tráfego.
            `)
        },
        'AWS WAF': {
            titulo: 'WAF',
            topicos: criarTopicos(`
Excesso de Regras Personalizadas sem Necessidade (Cost per Rule)	Manter dezenas de regras simples em uma Web ACL pode custar mais do que consolidar condições em regras eficientes.
Inspeção de Requisições de Ativos Estáticos sem Filtro de Escopo	Inspecionar imagens, CSS e JavaScript inofensivos em vez de limitar o WAF a rotas relevantes gera cobranças por requisição.
Uso Indiscriminado de Regras Gerenciadas Pagas (AWS Managed Rules / Marketplace)	Assinar grupos de regras sem avaliação prévia acumula assinaturas e cobranças por requisições inspecionadas.
Uso da Regra de Proteção contra Bots (Bot Control) no Nível Avançado para Todo o Tráfego	Ativar Bot Control Targeted para todo o site em vez de restringi-lo a login e autenticação eleva os custos.
Proteção contra Restauração de Credenciais (Account Takeover Prevention - ATP) Desnecessária em APIs Internas	Aplicar ATP a endpoints internos cobra por tentativas de login que não precisam dessa proteção.
Web ACLs Duplicadas em Ambientes de Testes e Homologação	Manter regras pagas de produção inspecionando tráfego de desenvolvimento e QA duplica custos.
Falta de Uso da Regra de Restrição de Taxa (Rate-based Rules) na Origem	Sem limite de taxa, ataques de força bruta geram milhões de requisições cobradas por inspeção.
Logging de Requisições do WAF no CloudWatch sem Filtro (WAF Full Logging)	Exportar todos os logs de requisições permitidas e bloqueadas sem amostragem ou retenção curta aumenta a fatura.
Falta de Aproveitamento do CloudFront Security Savings Bundle	Deixar de usar créditos de WAF incluídos no compromisso do CloudFront perde oportunidade de reduzir custos.
Aplicações de Regras do WAF no ALB em Vez do CloudFront	Inspecionar no ALB tráfego de uma aplicação CloudFront pode permitir que requisições cheguem à VPC antes do filtro.
Regras de Inspeção de Body de Requisição com Limites Elevados	Inspecionar corpos enormes de uploads sem limitar a inspeção aos primeiros kilobytes aumenta processamento.
Falta de Uso do AWS Shield Standard (Incluso Nativamente)	Pagar por proteção personalizada de DDoS de camada 3/4 quando o Shield Standard já está incluído duplica custos.
Inspeção de Requisições Bloqueadas em Etapas Posteriores	Colocar bloqueios por IP no fim da Web ACL processa regras anteriores antes de descartar o tráfego.
Web ACLs Órfãs Não Associadas a Nenhum Recurso	Manter Web ACLs sem associação a CloudFront, ALB ou API Gateway continua gerando taxa mensal.
Uso da Regra de Proteção contra Fraude de Contas (Account Creation Fraud Prevention) sem Escopo	Aplicar verificações de fraude a todas as páginas em vez de restringi-las ao cadastro aumenta inspeções.
Regras com Expressões Regulares (Regex) Ineficientes	Regex complexas consomem WCU e podem exigir Web ACLs adicionais.
Falta de Integração com o AWS Firewall Manager	Gerenciar Web ACLs conta a conta em vez de centralizar políticas em organizações multi-conta aumenta esforço operacional.
Não Utilização de Ações de Desafio (Challenge / CAPTCHA) Eficientes	Bloquear clientes legítimos imediatamente pode fazê-los repetir chamadas e gerar novas inspeções.
Inspeção de Tráfego Interno de VPCs via WAF	Aplicar WAF em ALBs internos usados apenas por microsserviços confiáveis adiciona inspeção desnecessária.
Falta de Testes no Modo de Contagem (Count Mode) Antes do Deploy	Ativar novas regras diretamente em Block pode gerar falsos positivos e retrabalho de configuração.
            `)
        },
        'NAT Gateway': {
            titulo: 'NAT Gateway',
            topicos: criarTopicos(`
Transferência Massiva de Dados de Analytics/Logs pelo NAT Gateway	Enviar grandes volumes de logs ou backups pelo NAT custa por GB processado além da taxa por hora.
Tráfego para S3 e DynamoDB Passando pelo NAT Gateway	Sem VPC Gateway Endpoints gratuitos para S3 e DynamoDB, o tráfego passa pelo NAT e gera cobranças.
Provisionamento de NAT Gateways em Múltiplas AZs para Ambientes de Testes	Criar um NAT em cada AZ de dev e homologação em vez de centralizar pode aumentar custos por hora.
Falta de Uso de VPC Interface Endpoints (PrivateLink) para Serviços AWS	Acessar Kinesis, CloudWatch, SQS, SNS e Secrets Manager pelo NAT em vez de endpoints locais processa tráfego pelo NAT.
NAT Gateways Órfãos em VPCs Sem Instâncias Ativas	Excluir instâncias e containers de uma VPC temporária sem remover o NAT Gateway e seu EIP mantém cobrança horária.
Comunicação Inter-VPC Roteada pela Internet Pública	Conectar VPCs privadas por IPs públicos via NAT em vez de VPC Peering ou Transit Gateway gera tráfego e custos desnecessários.
Downloads de Atualizações de Pacotes (OS Updates) sem Servidor Local/Cache	Centenas de instâncias baixando atualizações separadamente pela internet via NAT repetem tráfego que poderia ser espelhado.
Tráfego de Comunicação com Data Center On-Premises via NAT Gateway	Roteiar tráfego interno pela internet via NAT em vez de Direct Connect ou VPN gera custos e percurso inadequados.
Falta de Monitoramento das Métricas BytesOutFromDestination e BytesOutToSource	Ignorar métricas e VPC Flow Logs dificulta localizar instâncias que geram maior volume no NAT.
Aplicações de Web Scraping ou Polling Externo em Loop pelo NAT	Consultas externas em alta frequência acumulam processamento de dados no NAT Gateway.
Uso de NAT Gateway em Vez de Instância NAT (NAT Instance) para Cenários Leves	Em ambientes dev com tráfego insignificante, um NAT Gateway pode custar mais do que uma alternativa dimensionada para carga leve.
Ausência de Restrição de Egress no Security Group	Permitir saída irrestrita para qualquer destino aumenta o risco de tráfego acidental ou malicioso através do NAT.
Falta de Centralização de Saída de Internet em Arquiteturas Multi-VPC	Criar NAT em cada VPC de uma organização em vez de centralizar e governar o egress pode multiplicar custos.
Tráfego Cruzado Entre Zonas de Disponibilidade no NAT Gateway	Instâncias em uma AZ usando NAT em outra pagam transferência inter-AZ além do processamento do NAT.
Envio de Metrics e Tracing (OpenTelemetry/Datadog) via NAT Gateway	Enviar observabilidade em grande volume a SaaS sem compressão ou amostragem aumenta os GB processados.
Falta de Alarmes CloudWatch no AWS Budgets para NAT Data Processing	Sem alertas de custo do processamento do NAT, aumentos de tráfego podem passar despercebidos.
Retenção de Arquivos de Build de CI/CD Baixados da Internet	Pipelines baixando dependências pela internet a cada execução repetem tráfego que poderia usar cache interno.
Uso de NAT Gateway para Comunicação de Aplicações com o CloudFront	Roteiar chamadas privadas ao CloudFront por NAT pode adicionar processamento desnecessário.
Não Limpeza de Elastic IPs Desassociados do NAT Gateway	Excluir NAT sem liberar EIP deixa IP público ocioso e sujeito a cobrança.
Falta de Análise de VPC Flow Logs para Identificação de Offenders	Ignorar Flow Logs impede encontrar microsserviços responsáveis pela maior parte do tráfego do NAT.
            `)
        }
    });
})();
