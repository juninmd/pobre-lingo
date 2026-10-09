# Do zero à comunicação avançada

## Objetivo e critérios de conclusão

Transformar o PobreLingo em um curso utilizável por um brasileiro que não conhece
inglês, com progressão até comunicação avançada. A conclusão depende de evidência
de aprendizagem e de fluxos reais funcionando, além do build.

- Entrada Pré-A1 explicada em português, sem exigir nivelamento.
- Aulas com objetivo comunicativo, explicação, exemplos, prática, correção e tarefa.
- Conteúdo suficiente e sequenciado para as competências A1–C2, com pré-requisitos.
- Compreensão oral e escrita, produção oral e escrita e prática de fluência.
- Revisão espaçada e retorno a dificuldades antes de avançar.
- Avaliação de compreensão e produção, com limites explícitos dos métodos locais.
- Progresso persistido, retomada, estados de erro e recuperação de dados inválidos.
- Navegação acessível em desktop/mobile e validação no build de produção.
- Testes, lint e integridade do currículo aprovados; arquivos novos até 150 linhas.

## Referências pedagógicas

- [CEFR: abordagem orientada à ação](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-in-the-classroom).
  Os objetivos devem descrever tarefas que o aluno consegue realizar.
- [Descritores CEFR, incluindo Pré-A1](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search).
  Um iniciante absoluto precisa de uma entrada anterior às tarefas independentes A1.
- [Nation: Four Strands](https://www.wgtn.ac.nz/lals/resources/paul-nations-resources/paul-nations-publications/publications/documents/2007-Four-strands.pdf).
  Distribuir oportunidades entre compreensão, produção, estudo deliberado e fluência.

A aplicação dessas referências é uma decisão de design pedagógico. Não constitui
validação científica do resultado do aplicativo nem certificação CEFR.

## Diagnóstico após o pull de 2026-09-30

Base atualizada de `401e344` para `f19c67c`, sem conflitos de merge.

- Imports quebrados no dashboard, header e timeline impediam a compilação.
- Arquivos de leitores, vocabulário, pronúncia, IA e persistência foram removidos,
  embora páginas que dependiam deles ainda existissem.
- Rotas de habilidades desapareceram do roteador.
- Regras fundamentais deixaram de ser registradas no catálogo de gramática.
- A revisão voltou a SM-2; recuperado o motor FSRS e seus testes anteriores.
- A coleta de sessão voltou a iniciar sem consentimento; recuperado o opt-in.
- A sidebar usava larguras CSS inválidas para variáveis e cobria ações no desktop.
- O pull reintroduziu widgets de tendências com XP por clique e domínio fixo.
- Havia testes desses widgets que não correspondiam às implementações atuais.

## Implementado nesta etapa

- Recuperação dos arquivos de aprendizagem removidos do estado anterior ao pull.
- Recuperação das rotas de leitura, escrita, fluência, tutor e outras habilidades.
- Separação do catálogo de rotas e do roteador.
- Novo curso em `/course` e aulas em `/course/:lessonId`.
- 14 aulas essenciais, 42 exemplos e 70 exercícios escritos com correção.
- Duas aulas Pré-A1: cumprimentos/apresentação e pedidos de ajuda.
- Temas A1–C2: be, rotina, passado, planos, experiências, conselhos, hipóteses,
  argumentação, cautela, registro profissional, mediação e precisão.
- Prática assistida separada da checagem sem dicas.
- Checagem exige todas as respostas corretas; erro mantém a próxima aula bloqueada.
- Missão comunicativa exige registrar a produção escrita ou transcrever o ensaio.
- Portfólio por aula com tentativas, dúvidas, retomada do rascunho e download TXT;
  registros não recebem nota automática de correção ou pronúncia.
- Retomada da sessão, validação de dados salvos e sincronização do progresso.
- Revisões em 1/3/7/14/30 dias; reabrir não adia uma revisão pendente.
- Erro visível quando não é possível persistir a conclusão.
- Entrada do dashboard/onboarding direcionada à primeira aula para quem sabe zero.
- Correção das larguras da sidebar, contraste da marca, botões no mobile e
  rolagem ao trocar de rota para manter o título visível.
- Menu de habilidades recuperado; busca usa o mesmo catálogo, com navegação
  por teclado consistente com a ordem dos resultados e componentes menores.

- Remoção de 77 módulos sem uso ou substituídos do dashboard e 82 testes
  específicos dos componentes aposentados, após rastrear imports e rotas.
- Dicas e prática de fala direcionam ao estudo, sem recompensa por clique.
- Palavra do dia usa o vocabulário da próxima aula e permite tentar lembrar,
  revelar significado e ouvir; nenhuma declaração automática de domínio.
- Nivelamento adaptativo agora sugere conteúdo a partir de reconhecimento,
  exige uma cadeia contínua de faixas CEFR e não equivale a certificado.
- Questões de áudio só contam quando a fala termina; sem voz disponível o aluno
  pode pular sem receber acerto ou erro inventado.
- Checkpoints separam autoavaliação can-do de checagem de conteúdo e não liberam
  um nível CEFR por si só; palavras só entram como conhecidas quando marcadas.

## Trabalho necessário para concluir o objetivo integral

1. Expandir as aulas guiadas para cobrir o currículo completo. As 14 aulas atuais
   são introdutórias, não um curso suficiente para atingir fluência avançada.
2. Criar tarefas graduadas de escuta e produção para cada unidade, vinculadas ao
   conteúdo estudado; evitar abrir práticas genéricas em níveis inadequados.
3. Associar os erros às revisões de palavras, estruturas e habilidades específicas.
4. Ampliar o portfólio com gravações e rubricas específicas por competência,
   preservando a distinção entre autoavaliação, feedback e avaliação externa.
5. Ampliar checkpoints e nivelamento com mais tarefas de produção, mantendo a
   distinção entre sugestão de conteúdo, autoavaliação e certificação externa.
6. Auditar recompensas e declarações de domínio nos demais fluxos. Os widgets
   de tendências foram aposentados; novas práticas têm cobertura no navegador.
7. Resolver a dívida de lint e auditar a suíte E2E completa; modularizar arquivos
   herdados acima de 150 linhas sem perder conteúdo.
8. Auditar todas as rotas, inclusive aulas avançadas, nas três opções de tema,
   por teclado e no mobile; verificar áudio real e os provedores locais de IA.

## Evidência e limites

- TypeScript e build de produção aprovados durante a implementação.
- Testes de domínio cobrem acertos, erros, bloqueio, retomada e revisão.
- Teste de integração reproduziu e corrigiu progresso desatualizado entre hooks.
- Playwright testa o build de produção, com porta isolada e sem reutilizar dev server.
- Testes E2E e lint geral devem ser registrados pelo resultado terminal de cada
  execução; a dívida de lint herdada ainda impede declarar validação geral.
- Áudio TTS depende de vozes do navegador; qualidade de pronúncia e aprendizagem
  de longo prazo ainda precisam de avaliação real com alunos.

O objetivo integral permanece em andamento.

### Resultado desta etapa

- 35 testes focados aprovados na última execução serial (curso, nivelamento,
  proficiência, checkpoints, persistência e revisão).
- 28 E2E aprovados em desktop/mobile no build de produção, incluindo as 14 aulas
  completas em sequência, retomada, bloqueio, exportação do portfólio, falha de
  armazenamento e descoberta por teclado.
- Lint dos 52 arquivos do curso, navegação, dashboard e configuração aprovado.
- 128 testes unitários da suíte geral aprovados em 24 arquivos.
- Seis E2E de dashboard/portfólio repetidos e aprovados após corrigir a rolagem.
- Lint geral: 105 erros e 61 avisos restantes em arquivos herdados/configuração.
- Os testes dos widgets aposentados foram removidos junto com os componentes
  sem imports; a aprovação unitária não resolve a dívida de lint.
- Prints do plano e portfólio em `e2e-screenshots/portfolio-*.png` e `e2e-screenshots/course-plan-*.png` (artefatos locais).
