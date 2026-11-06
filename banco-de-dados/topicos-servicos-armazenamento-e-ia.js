window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
    'Amazon S3': {
        titulo: 'S3',
        topicos: `
Manutenção de Todos os Arquivos na Classe S3 Standard 24/7	Manter históricos e documentos antigos em Standard sem regras de transição Lifecycle eleva o custo.
Versionamento Ativado Sem Expiração de Versões Antigas (Noncurrent Versions)	Versões antigas e marcadores de exclusão sem expiração acumulam armazenamento cobrado.
Falta de Uso ou Uso Incorreto do S3 Intelligent-Tiering	Ignorar acesso imprevisível ou aplicar a classe a milhões de objetos minúsculos pode aumentar custos.
Retenção de Terabytes de Uploads Incompletos (Multipart Uploads)	Partes abandonadas de uploads incompletos ocupam espaço sem uma regra de limpeza.
Transferência de Dados via Internet em Vez de VPC Endpoints (Gateway)	Tráfego para S3 por internet ou NAT em vez de VPC Endpoint aumenta custos de rede.
Armazenamento de Milhões de Arquivos Minúsculos sem Compactação	Arquivos pequenos individuais elevam custos de requisições e dificultam a análise.
Taxas de Leitura e Resgate Inesperadas nas Classes Glacier	Resgates massivos ou expressos de arquivos Glacier podem elevar a fatura.
Erros de Aplicação Gerando Loops Infinitos de Requisições HTTP (4xx/5xx)	Loops de GET/HEAD para objetos inexistentes geram chamadas de API cobradas.
Réplica de Buckets Cross-Region (CRR) Desnecessária em Ambientes de Teste	Replicar dados de teste entre regiões duplica armazenamento e transferência.
Ausência de Transição para Glacier Instant Retrieval ou Deep Archive	Manter dados antigos em classes frequentes em vez de armazenamento de arquivo de baixo custo.
Leitura Direta de Arquivos Brutos em Data Lakes sem Particionamento	Varreduras de CSV/TXT sem partições e formatos colunares analisam dados desnecessários.
Buckets de Backups e Snapshots sem Regras de Limpeza	Backups sem expiração acumulam cópias redundantes por anos.
Ativação de S3 Request Metrics e CloudWatch Logging Excessivos	Métricas e logs detalhados em buckets com bilhões de objetos elevam custos de monitoramento.
Download Direto de Imagens e Estáticos sem CDN (CloudFront)	Entregar arquivos diretamente do S3 aumenta custos de saída comparado ao cache via CloudFront.
Sobrecarga de Requisições por Falta de S3 Express One Zone ou Caching	Acessos frequentes a arquivos pequenos geram chamadas excessivas sem cache adequado.
Desativação do Block Public Access e Custos por Tráfego Indevido	Downloads públicos indevidos podem gerar grandes custos de transferência de saída.
Duplicação de Buckets para Diferentes Equipes de TI	Copiar os mesmos dados entre equipes duplica armazenamento em vez de compartilhar acesso.
Faltas de Regras de Expiração para Arquivos Temporários de Importação	Arquivos temporários mantidos após processamento ocupam espaço indefinidamente.
Transições de Ciclo de Vida Ineficientes com Custos de Taxa por Objeto	Transicionar milhões de objetos pequenos pode custar mais do que a economia obtida.
Uso de Criptografia KMS (SSE-KMS) sem Bucket Keys em Alta Escala	Chamadas KMS por objeto sem Bucket Keys aumentam custos em operações de grande escala.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon EBS': {
        titulo: 'EBS',
        topicos: `
Manutenção de Discos no Tipo Legado gp2 em Vez do gp3	Manter volumes em gp2 quando gp3 reduz custo e separa configuração de IOPS do tamanho.
Discos EBS Órfãos sem Instância Conectada (Unattached Volumes)	Volumes não excluídos ao encerrar instâncias continuam sendo cobrados.
Provisionamento Excessivo de IOPS em Discos de Alto Desempenho (io1/io2)	Provisionar IOPS máximos para cargas que poderiam usar gp3 ajustado.
Sobredimensionamento do Tamanho do Disco (Over-provisioning Storage)	Alocar terabytes de disco para instâncias que usam apenas uma pequena parcela.
Snapshots Manuais Antigos sem Política de Expiração (Orphaned Snapshots)	Acumular snapshots manuais antigos sem ciclo de vida mantém armazenamento desnecessário.
Retenção Prolongada de Backups Automáticos do Amazon Data Lifecycle Manager (DLM)	Reter backups diários por anos em ambientes de teste aumenta armazenamento.
Espelhamento de Ambientes de Staging com Discos Idênticos aos de Produção	Copiar discos de produção para QA mesmo quando os dados ocupam pouco espaço.
Falta de Uso de Compressão em Logs Armazenados Diretamente em Disco	Guardar logs em texto no EBS sem compactação consome espaço rapidamente.
Discos de Dados Temporários (Scratch Space) Alocados Permanentemente	Manter volumes temporários ligados em vez de usar armazenamento efêmero disponível.
Falta de Monitoramento de IOPS e Latência de Disco (VolumeQueueLength)	Aumentar o tipo de disco para mascarar gargalos de código sem analisar métricas.
Clones de Bancos de Dados Legados Mantidos em Discos Separados	Manter cópias inteiras de volumes para homologação em vez de usar snapshots eficientes.
Falta de Criptografia em Discos Antigos (Impedindo Otimizações de Cópia)	Volumes sem criptografia exigida por compliance demandam migrações e snapshots extras.
Uso de Tipos de Instâncias EC2 que Exigem Volumes EBS Dedicados Extras	Escolher instâncias sem NVMe para dados temporários força a contratação de EBS adicional.
Fragmentação de Múltiplos Discos Pequenos em Vez de Um Volume Otimizado	Separar arquivos em muitos volumes multiplica snapshots e custos de gestão.
Ausência de Redimensionamento Dinâmico (Elastic Volumes)	Recriar instâncias para aumentar discos causa alocação preventiva e indisponibilidade.
Snapshots Incrementais Inflados por Alterações Constantes de Blocos	Gravações frequentes em blocos podem aumentar o tamanho dos snapshots incrementais.
Discos de Instâncias Desativadas (Stopped Instances) Cobrados Continuamente	Volumes EBS continuam sendo cobrados mesmo quando a instância está parada.
Faltas de Alertas de Capacidade de Espaço em Disco (FreeSpace Alarms)	Sem alarmes, emergências levam a dobrar discos sem planejamento.
Uso de EBS em Vez de Amazon EFS para Arquivos Compartilhados Entre Instâncias	Usar EBS para compartilhamento entre instâncias exige configurações caras e complexas.
Réplicas e Backups Cruzados entre Regiões sem Necessidade Regulatória	Copiar snapshots entre regiões em ambientes sem exigência de DR aumenta custos.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon EFS': {
        titulo: 'EFS',
        topicos: `
Uso da Classe de Armazenamento Padrão (EFS Standard) para Dados Frios	Manter dados raros em Standard em vez de movê-los para EFS IA eleva o custo.
Configuração Inadequada da Política de Ciclo de Vida (Lifecycle Policy)	Não habilitar a transição de arquivos inativos mantém o preço cheio do EFS Standard.
Modo de Desempenho (Performance Mode) Dimensionado Incorretamente	Escolher modo inadequado para a carga gera gargalos e custos de throughput.
Modo de Taxa de Transferência Provisionada (Provisioned Throughput) Excessiva	Provisionar alta taxa fixa para picos em vez de otimizar a carga ou usar bursting.
Montagem do EFS em Zonas de Disponibilidade Desnecessárias (Cross-AZ)	Criar mount targets em zonas sem clientes gera transferência inter-AZ.
Armazenamento de Arquivos de Logs e Temporários de Alta Frequência de Gravação	Gravações efêmeras intensas no EFS consomem créditos e elevam a fatura.
Falta de Limpeza de Arquivos Temporários de Importação de Lotes	Arquivos de lote mantidos após processamento fazem o armazenamento crescer.
Uso de EFS em Vez de Armazenamento Local (EBS ou NVMe) para Bancos de Dados	Hospedar bancos relacionais em EFS aumenta latência e pode exigir mais infraestrutura.
Falta de Monitoramento de Créditos de I/O (BurstCreditsBalance)	Sem monitorar créditos, provisionar throughput fixo para mascarar gargalos custa mais.
Sistemas de Arquivos EFS Órfãos de Aplicações Descontinuadas	Manter filesystems de projetos encerrados continua gerando cobrança.
Espelhamento de EFS de Produção em Ambientes de Homologação	Duplicar todos os arquivos produtivos em ambientes de teste sem necessidade de volume.
Backup Automático do EFS (AWS Backup) com Retenção Exagerada	Reter cópias diárias por anos sem exigência regulatória acumula custos.
Duplicação de Arquivos Entre Servidores em Vez de Compartilhamento Real	Copiar arquivos estáticos para cada instância duplica armazenamento que poderia ser compartilhado.
Compartilhamento de EFS Único para Múltiplos Domínios de Negócio não Relacionados	Misturar domínios dificulta políticas granulares de ciclo de vida e segurança.
Ausência de Uso de EFS Access Points para Isolamento de Aplicações	Permissões amplas à raiz do filesystem dificultam isolamento entre aplicações.
Criptografia com Chaves KMS Personalizadas sem Rotação Adequada	Usar chaves customizadas sem governança apropriada adiciona complexidade e custos.
Uso de Instâncias EC2 Pequenas com Gargalo de Rede no Acesso ao EFS	Rede limitada nas instâncias clientes pode forçar upgrades de hardware para atingir throughput.
Falta de Políticas de Expiração para Snapshots Manuais do EFS	Snapshots manuais esquecidos acumulam cópias estáticas redundantes.
Tráfego de Rede via Internet ou NAT Gateway para Acesso ao EFS	Rotas incorretas evitam Mount Targets locais e encaminham tráfego por NAT.
Ausência de Alertas de Crescimento de Armazenamento no CloudWatch	Sem alertas, acúmulos de arquivos podem exceder o orçamento mensal.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    }
});
