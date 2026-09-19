# Benchmark PobreLingo — setembro/2026

Comparação com apps globais, cursos brasileiros e a base de evidência, e o que falta no PobreLingo.
Fontes nas seções; itens marcados *(não verificado)* vieram de agregadores.

## 1. Onde o PobreLingo está hoje (inventário do código)

| Área | Estado | Evidência |
|---|---|---|
| Currículo | 121 lições, ~45 h nominais (A1→C2) | `src/lib/curriculumData.ts` |
| Gramática | 57 regras / 16 categorias, ~281 exemplos, conteúdo correto | `src/lib/grammar*.ts` |
| Vocabulário núcleo | **94 palavras** (meta declarada: 1.500–5.000) | `coreVocabularyA1A2.ts`, `coreVocabularyB1B2.ts` |
| Leitores graduados | **7 textos, ~400 palavras**, nenhum C2 | `gradedReaders*.ts` |
| Nivelamento | 12 questões (2 por nível); resultado não muda a trilha | `proficiencyQuestions.ts` |
| SRS | SM-2 real, mas só recebe erros de 3 exercícios + caderno | `src/lib/srs.ts` |
| Fala | Web Speech; aceita resposta se `target.includes(spoken)`: transcrição vazia ou uma palavra passa | `SpeakingExercise.tsx:67-68` |
| IA | **Nenhuma**. 18 widgets "IA/tutor/AR/social" são `setTimeout` + XP grátis | `LiveTutorWidget.tsx:23`, `ImmersivePracticeSection.tsx` |
| Adaptatividade | Todos os módulos desbloqueados, sem sequenciamento | `useCurriculumProgress.ts:171` |
| Conta/sync | Só localStorage; Firebase instalado e não usado; export sem import | `SettingsPage.tsx` |
| PWA | Offline real; manifest diz **"Aprenda Português"** | `vite.config.ts:19-21` |
| Privacidade | `LogRocket.init` sem consentimento (LGPD) | `src/main.tsx:11` |
| Acessibilidade | 41 atributos ARIA em ~34k linhas; 1 handler de teclado | grep |

Carga real estimada: 15–20 h de conteúdo único. A Cambridge estima ~200 h até o A2 e ~1.000–1.200 h até o C2.

## 2. Concorrentes: o que cada um vende

| Produto | O que vende | Preço | Lição para nós |
|---|---|---|---|
| Duolingo | Hábito (streak, ligas, hearts) + Max com vídeo-chamada IA | Super ~US$13/mês; Max US$168/ano | Retenção vem do loop diário; a crítica é pouca produção oral. O backlash "AI-first" de 2025 mostra que conteúdo raso gerado por IA destrói confiança |
| Babbel | Diálogos CEFR; trocou aula ao vivo por IA (Babbel Speak) | ~US$8–18/mês | O humano está saindo; a IA virou o padrão |
| Busuu | Correção por nativos + certificado | US$6–14/mês | Feedback humano em escrita, via comunidade |
| Memrise | SRS + 33 mil vídeos de nativos | ~US$23/mês | Input autêntico em vídeo |
| Speak / Praktika / Loora / Langua | Conversa com IA por voz, em tempo real | US$8–30/mês | Parceiro de conversa virou item básico em 2025–26 |
| ELSA Speak | Nota de pronúncia por fonema | ~US$160/ano | Pronúncia dirigida ao L1 é um nicho pago |
| LingQ | Importar qualquer texto e clicar para traduzir | ~US$10/mês | Input extensivo ilimitado |
| Anki | SRS com FSRS-6 | Grátis | 20–30% menos revisões que o SM-2 |
| Fluency Academy | "Hacks", gamificação; conversa é upsell | R$1.200–3.000/ano | 1.069 reclamações em 6 meses (upsell, reembolso) |
| Método Mairo Vergara | Autoestudo + repetição espaçada | R$597, pagamento único | Nota 9.9; queixa nº 1: **não tem prática de fala** |
| Open English / Cambly / Wise Up | Aula ao vivo, conversa 1:1 | R$74–220/mês | O brasileiro paga por **falar com alguém** |

Fontes: duoplanet.com, babbel.com/press, busuu.com, languatalk.com, trancy.org, github.com/open-spaced-repetition, reclameaqui.com.br (Fluency Academy, Mairo Vergara), eurodicas.com.br, support.cambridgeenglish.org (guided learning hours), ef.edu/epi (Brasil), cnnbrasil.com.br (pesquisa Pearson 2025).

## 3. O aluno brasileiro

- EF EPI 2025: Brasil em **75º**, proficiência baixa. Escrita (442) e fala (464) são as habilidades mais fracas.
- Barreiras: falta de tempo (33%) e de dinheiro (33%). Motivação nº 1: **viagem (46%)**, à frente de carreira (42%).
- **Medo de falar** é a principal causa psicológica de desistência; 67% não se sentem capazes de conduzir uma reunião em inglês.
- Erros típicos de pronúncia (transferência do português): TH, schwa, -ed final, "i" epentético ("clubi"), tonicidade, duração vogal.

## 4. Posicionamento

> **O curso completo que o brasileiro compraria, grátis, com foco em perder o medo de falar.**

O que já nos diferencia: grátis de verdade, sem anúncio, explicação em português para leigo, as 4 vertentes de Nation e funcionamento offline.
Nenhum concorrente grátis cobre as 4 vertentes em português. O buraco do mercado é **prática de fala barata**.

## 5. O que aprimorar (priorizado)

### P0: confiança (barato, esta semana)
1. **Remover ou tornar reais os 31 widgets decorativos** do dashboard (18 simulados + 13 cards de dica que dão XP). Hoje o XP pode ser farmado sem estudar, e "IA" falsa é exatamente o que derrubou a confiança no Duolingo.
2. **Corrigir a validação de fala**: exigir cobertura mínima de palavras (ex.: ≥70% por alinhamento) e rejeitar transcrição vazia.
3. **Corrigir o manifest** ("Aprenda Inglês").
4. **LGPD**: LogRocket só com consentimento explícito, ou remover.
5. Consertar os tópicos de vocabulário vazios (`airport`, `travel-documents`, `hotel`, `business-writing`).
6. **Importar backup** (o export já existe).

### P1: valor de aprendizado (client-side, sem custo de servidor)
7. **Profundidade de conteúdo**: vocabulário de 94 → 3.000 palavras usando lista aberta (NGSL, CC BY-SA *(verificar licença)*); frases de exemplo do Tatoeba (CC BY *(verificar)*); 7 → 60+ leitores graduados A1–C1.
8. **Tudo alimenta o SRS**: palavras das lições, regras, ditado e leitura. Migrar SM-2 → FSRS (`ts-fsrs`, *(verificar licença/manutenção)*).
9. **Nivelamento adaptativo** com banco de 60+ itens, que define o ponto de partida e desbloqueia a trilha, com sequenciamento sugerido ("próxima lição").
10. **Pronúncia para brasileiros**: pares mínimos (ship/sheep, think/sink, walked /t/), treino de tonicidade e do schwa, e discriminação auditiva antes de produzir. Faz a parte gratuita do nicho da ELSA.
11. **Trilhas por objetivo**: Viagem (motivação nº 1) e Trabalho (entrevista, reunião, e-mail), montadas a partir das lições que já existem.
12. **Conversas ramificadas com feedback em PT-BR** para A1–A2 (hoje o feedback vem em inglês).
13. Acessibilidade: foco, teclado e rótulos nos jogos e exercícios.

### P2: exige servidor ou custo (decidir modelo)
14. **Parceiro de conversa com IA** (voz + correção), o item básico de 2025–26. Opções, da mais barata para a mais cara:
    (a) BYOK: o aluno cola a própria chave;
    (b) proxy serverless com cota diária por usuário e modelo pequeno;
    (c) LLM no dispositivo via WebGPU, pesado para mobile.
15. **Correção de redação com IA**, trocando o feedback heurístico atual.
16. **Conta + sync** (o Firebase já está nas dependências), habilitando ligas semanais e desafios entre amigos.
17. **Push de streak** (web push precisa de servidor), o maior motor de retenção do Duolingo.

## 6. Métricas de sucesso sugeridas
- D1/D7/D30 de retenção e streak mediano (hoje sem medição; usar evento local + analytics opt-in).
- Minutos de produção oral por semana por usuário (a queixa central do mercado).
- Palavras conhecidas por nível contra a meta (1.5k/2.5k/3.5k/5k).

## 7. Status da implementação (19/09/2026)

| # | Item | Status |
|---|---|---|
| 1 | Widgets decorativos do dashboard | Removidos (31); `PracticeHub` aponta só para práticas reais; dica do dia não dá mais moedas |
| 2 | Validação de fala | `lib/speechMatch.ts`: alinhamento em ordem (LCS), ≥70%, rejeita vazio |
| 3 | Manifest | "Aprenda Inglês" |
| 4 | LGPD / LogRocket | Carregado sob demanda, só com consentimento em Configurações (desligado por padrão) |
| 5 | Tópicos de vocabulário vazios | 50 entradas de viagem/trabalho em `dictionaryTravelWork.ts` |
| 6 | Restaurar backup | Validado (`lib/backup.ts`), só chaves do app, substitui o progresso |
| 7 | Profundidade de conteúdo | ~2.700 palavras A1–C2 (listas próprias, sem cópia de listas proprietárias); 60 leitores A1–C2 |
| 8 | SRS | FSRS (`ts-fsrs` 5.4.2, MIT) com migração dos cards SM-2; recebe palavras das lições, regras estudadas, ditados errados e o cofre |
| 9 | Nivelamento adaptativo | Escada adaptativa (72 itens, ≤20 questões) + ponto de partida recomendado no dashboard |
| 10 | Pronúncia para brasileiros | `/pronunciation`: 8 focos, 72 pares mínimos, tonicidade |
| 11 | Trilhas por objetivo | `/tracks`: Viagem e Trabalho |
| 12 | Conversas em PT-BR | Feedback em português, 6 cenários novos, acesso direto por `?scenario=` |
| 13 | Acessibilidade | Jogos e exercícios: 16 → 0 diagnósticos `lint/a11y` |
| 14 | Parceiro de conversa com IA | `/tutor`: IA do Chrome (Prompt API) ou Qwen2.5-1.5B via WebLLM (Apache-2.0); sem chave, sem servidor |
| 15 | Correção de redação com IA | Botão no editor de redação, mesma IA local |
| 16 | Conta + sync | **Não feito**: exige servidor e credenciais. Substituído por exportar/restaurar backup |
| 17 | Lembrete de ofensiva | Periodic Background Sync no Service Worker (PWA instalado, Chromium); sem servidor push |
| — | Ligas semanais | **Não feito**: sem servidor não há ranking real, e ranking falso repetiria o problema do item 1 |
