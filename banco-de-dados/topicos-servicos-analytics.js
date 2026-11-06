window.finSlashTopicos = Object.assign(window.finSlashTopicos || {}, {
    'AWS Glue': {
        titulo: 'Glue',
        topicos: `
Dimensionamento Excessivo de DPU (Data Processing Units) em Jobs	Usar DPUs em excesso para pequenos arquivos desperdiça computação serverless.
Uso da Versão Antiga do Glue (Glue Version 1.0 ou 2.0)	Versões antigas podem levar mais tempo e consumir DPUs adicionais para o mesmo ETL.
Falta de Uso de Glue Flex Execution para Cargas Tolerantes	Usar execução padrão em lotes noturnos tolerantes ignora descontos do Glue Flex.
Job de Glue Rodando em Loops Infinitos ou com Timeouts Longos	Jobs travados podem consumir DPUs até o limite máximo de execução.
Falta de Particionamento de Dados na Gravação em Data Lakes	Gravar sem partições faz Athena e Redshift Spectrum varrerem mais dados.
Leitura Completa de Arquivos Brutos em Vez de Consultas Incrementais	Reprocessar todo o histórico diariamente em vez de usar cargas incrementais e Bookmarks.
Armazenamento Excessivo de Logs no CloudWatch sem Limpeza	Logs de depuração sem retenção curta acumulam custos no CloudWatch.
Jobs de Glue Agendados com Alta Frequência sem Necessidade	Executar pipelines vazios a cada poucos minutos gera cobranças de jobs.
Falta de Uso de Formatos Colunares Compactados (Parquet/ORC)	Gravar CSV ou JSON sem compressão aumenta armazenamento e custo analítico.
Crawlers do Glue Executando Desnecessariamente em Escala	Escanear diariamente buckets inteiros com bilhões de arquivos consome recursos do catálogo.
Conexões de Rede Mal Configuradas via NAT Gateway para Fontes Locais	Roteamento do Glue via NAT para bancos ou APIs gera custos de tráfego.
Falta de Otimização de Memória e Shuffle Partitions no Spark	Problemas de memória levam a aumentar DPUs em vez de otimizar código e partições.
Ambientes de Desenvolvimento do Glue Interactive Sessions Ativos 24/7	Sessões interativas ociosas permanecem ativas por dias após os testes.
Catálogo de Dados do Glue (Data Catalog) Poluído com Tabelas Órfãs	Metadados e partições de pipelines antigos continuam acumulados no catálogo.
Duplicação de Pipelines de ETL por Diferentes Unidades de Negócio	Times repetem extração e transformação das mesmas tabelas e multiplicam custos.
Uso de Glue para Tarefas Simples que Poderiam Rodar em Lambda	Usar Spark para mover um arquivo simples custa mais que uma função Lambda.
Ausência de Tratamento de Erros e Retentativas Infinitas	Repetições sem limite após falhas geram loops de reprocessamento cobrados.
Falta de Limpeza de Arquivos Temporários de Trabalho (Glue Temp Directory)	Arquivos temporários do Spark no S3 sem expiração acumulam armazenamento.
Uso de Múltiplos Trabalhos Secundários Isolados em Vez de um DAG Consolidado	Jobs independentes e orquestração manual duplicam trabalho e dificultam execução eficiente.
Falta de Monitoramento de Custos e Alertas de Execução de DPUs	Sem orçamentos e alarmes, falhas de pipeline podem exceder o orçamento.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon OpenSearch': {
        titulo: 'OpenSearch',
        topicos: `
Manutenção de Todos os Índices no Armazenamento Quente (Hot Storage)	Manter históricos no armazenamento quente em vez de UltraWarm ou Cold eleva o custo.
Uso Exclusivo de Cobrança On-Demand sem Reserved Instances	Operar clusters estáveis On-Demand por anos ignora descontos reservados.
Falta de Uso da Camada UltraWarm e Cold Storage para Dados de Compliance	Manter logs regulatórios no cluster primário aumenta o custo por GB.
Sobredimensionamento do Tamanho e Quantidade de Nós do Cluster	Dimensionar nós para picos pontuais mantém CPU e disco ociosos no uso diário.
Configuração Ineficiente de Shards (Unbalanced or Over-sharding)	Shards pequenos ou excessivos consomem heap e podem exigir nós maiores.
Instâncias de Homologação, QA e Testes Rodando 24/7 em Multi-AZ	Manter clusters de teste altamente disponíveis durante noites e fins de semana.
Uso Inadequado de Nós Mestres Dedicados (Dedicated Master Nodes)	Superdimensionar masters pequenos ou desativá-los em clusters grandes gera custos e instabilidade.
Ingestão Massiva de Logs em Nível DEBUG/TRACE sem Filtragem	Enviar logs sem filtragem aumenta indexação e acelera uso de disco.
Ausência de Políticas de Gerenciamento do Ciclo de Vida do Índice (ISM)	Sem rollover e exclusão automática, índices antigos crescem indefinidamente.
Uso de Instâncias de Gerações Antigas (ex: t2, m4 ou r4.search)	Hardware legado entrega menos throughput por custo que instâncias Graviton modernas.
Duplicação de Armazenamento por Réplicas Excessivas (Replica Count)	Manter várias réplicas multiplica armazenamento EBS e tráfego interno.
Consultas Analíticas Ineficientes e Agregações Pesadas sem Limite	Consultas amplas e paginação profunda elevam heap e podem levar a upgrades.
Mapeamento Automático Dinâmico sem Schema Definido (Dynamic Mapping)	Mapeamentos automáticos duplicados aumentam o tamanho dos índices.
Tráfego Cruzado Entre Zonas de Disponibilidade (Cross-AZ) na Ingestão	Clientes em zonas diferentes geram transferência inter-AZ para replicação de shards.
Discos EBS no Formato gp2 em Vez do Otimizado gp3	Volumes gp2 custam mais e vinculam IOPS ao tamanho do disco.
Clusters Órfãos de Projetos e POCs de Busca Descontinuados	Clusters de testes abandonados continuam ativos e cobrando.
Desempenho Degradado por Falta de Otimização no Refresh Interval	Refresh de um segundo em ingestão massiva força flushes e uso constante de CPU.
Replicação Cross-Cluster (Cross-Cluster Replication - CCR) Desnecessária	Replicar índices de teste entre regiões multiplica transferência e armazenamento.
Armazenamento de Arquivos Grandes/Payloads Inteiros nos Documentos	Guardar binários e payloads extensos no índice aumenta armazenamento em vez de usar S3.
Ausência de Alertas de Capacidade de Disco e JVM Memory Pressure	Sem alarmes, equipes aumentam nós às pressas em vez de otimizar dados e índices.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    },
    'Amazon Bedrock': {
        titulo: 'Bedrock',
        topicos: `
Uso Inadequado de Modelos de Alta Performance para Tarefas Simples	Usar modelos caros para extração ou classificação simples quando modelos menores bastariam.
Ausência de Estratégia de Cache de Contexto (Prompt Caching)	Reenviar documentos longos em cada requisição paga novamente os tokens de entrada.
Falta de Otimização e Redução do Tamanho dos Prompts (Token Bloat)	Enviar históricos longos sem compactação eleva tokens e custos por interação.
Chamadas Excessivas e Contínuas sem Validação Prévia (Guardrails)	Invocar modelos para dados que regras de negócio poderiam filtrar primeiro desperdiça tokens.
Falta de Uso de Modelos Customizados (Fine-tuning) vs Prompts Extensos	Repetir instruções extensas em cada chamada pode ser menos eficiente que customizar o modelo.
Configuração Excessiva de Parâmetros de Resposta (Max Tokens / Temperature)	Limites máximos de resposta para mensagens curtas desperdiçam recursos e aumentam latência.
Ausência de Políticas de Retenção e Limpeza de Logs de Inferência	Logs sem expiração acumulam armazenamento e dados sensíveis no CloudWatch ou S3.
Arquiteturas de RAG Ineficientes sem Chunking Otimizado	Fornecer documentos inteiros aumenta tokens com conteúdo irrelevante.
Testes de Estresse e Homologação Descontrolados (Load Testing)	Testes em modelos caros de produção podem gerar picos acidentais de custo.
Uso de Regiões AWS Incorretas sem Suporte a Preços Otimizados	Escolher regiões sem considerar custos do modelo e transferência pode encarecer inferência.
Duplicação de Consultas Idênticas por Falta de Cache de Respostas	Repetir chamadas para perguntas frequentes gera cobranças evitáveis.
Falta de Configuração de Limites de Orçamento e Alertas de Custo	Loops de agentes sem alertas de orçamento podem exceder o gasto previsto.
Uso de Agentes do Bedrock (Bedrock Agents) para Tarefas Determinísticas	Usar agentes complexos em fluxos lineares que APIs ou Lambda resolveriam com menor custo.
Prototipagem e Desenvolvimento em Ambientes Produtivos	Testar prompts em endpoints produtivos com modelos caros aumenta os gastos.
Ingestão Excessiva de Dados Desestruturados em Bases de Conhecimento	Documentos desatualizados ou irrelevantes elevam contexto e uso de tokens.
Falta de Uso de Modelos Regionais ou Cross-Region Inference Otimizada	Ignorar distribuição de tráfego pode aumentar throttling, falhas e reexecuções.
Ausência de Filtragem de Conteúdo (Guardrails) na Origem	Entradas gigantes e inválidas consomem tokens antes de serem filtradas.
Retenção de Embeddings Redundantes em Bancos Vetoriais	Recriar embeddings integrais após pequenas alterações duplica processamento e armazenamento.
Falta de Monitoramento de Métricas de Latência e Taxa de Erro (Invocation Throttling)	Sem alertas de throughput, clientes repetem chamadas após throttling e falhas.
Uso de IA Generativa para Tarefas que Exigem Precisão Determinística	Usar modelos para cálculos exatos pode exigir reprocessamento e correções manuais.
        `.trim().split('\n').map(linha => {
            const [titulo, descricao] = linha.split('\t');
            return { titulo, descricao };
        })
    }
});
