# 🧠 AGENTS.md - Pobre Lingo Intelligence System

## 👤 AI Personas

### 1. Jules-Architect (System Architect)
- **Role**: Designing the core architecture and orchestrating logic.
- **Focus**: Scalability, process integrity, and high-level design.
- **Vibe**: Direct, analytical, and strategic.

### 2. Spark-Frontend (UI/UX Expert)
- **Role**: Crafting the visual identity and user interactions.
- **Focus**: Aesthetics, responsiveness, and accessibility.
- **Vibe**: Creative, detail-oriented, and user-focused.

### 3. Bolt-Automation (DevOps)
- **Role**: Managing CI/CD, scripts, and automation.
- **Focus**: Build pipelines, testing, and deployment.
- **Vibe**: Fast, technical, and "automation-first".

## 📜 Development Rules (Antigravity)

1. **Size Limit**: **Max 150 lines per file**.
2. **Clean Logic**: Separation of concerns enforced across all layers.
3. **Validation**: All changes require successful tests and linting.
4. **Security**: Sensitive data must be excluded from context.

## 🤝 Interaction Protocol
- Follow the **Plan -> Act -> Validate** cycle for every task.
- Consult `gemini.md` for project-specific instructions.
- Ensure to check if features are already implemented to avoid duplicate work and safely transition to completion when verifying existing states (e.g. Learning Timeline).

## 📅 Session Logs

### [Current Date] Jules-Architect: Validation of Interactive Journey Book
- **Action:** Audited codebase for requested UI/UX refactoring (Interactive Journey Book).
- **Findings:** The requested features (`LearningTimeline`, MobileNav visibility logic, removed START popups, gamified header, "Onde parei" bookmark, and associated Playwright tests) are already fully implemented and verified as passing.
- **Next Steps:** Proceeding with standard validation checks and closing the session as the state is already compliant with the user's request.

### [2024-05-27] Jules-Architect: Interface Modernization & Trend Integration
- **Action:** Researched 2024 English learning trends (British Council) and redesigned the `DashboardPage` layout to categorize widgets ("Imersão Digital & IA", "Conexão Humana & Social", "Nano-Learning & Cultura", "Metodologias Ativas").
- **Action:** Created `LiveTutorWidget.tsx` to satisfy the "Live Human Connection" trend requirement.
- **Findings:** Successfully modernized the dashboard layout. Ensured all new structural elements are thoroughly tested via Playwright E2E.
- **Next Steps:** Maintain the structured grid layout for future widget additions.

### [Current Date] Jules-Architect: Interface Enhancement & Trend Implementation
- **Action:** Researched modern English teaching trends and identified Project-Based Learning (PBL) and Data-Driven Learning (DDL).
- **Action:** Created `ProjectBasedLearningWidget` and `DataDrivenLearningWidget`.
- **Action:** Integrated new widgets into the `DashboardPage` and verified all tests pass.
- **Next Steps:** Consider adding backend support or local persistence for the newly introduced methodology tools.

### [2026-09-01] Jules-Architect / Stitch-Frontend: Dashboard & Layout Refactoring
- **Action:** Audited codebase to ensure compliance with the 150-line limit rule for large components.
- **Action:** Extracted `NavMenu` and `Header` from `Layout.tsx`.
- **Action:** Modularized `DashboardPage.tsx` into logical components (`DashboardStats`, `ImmersivePracticeSection`, `RightColumnWidgets`).
- **Action:** Split `LessonCard.tsx` to isolate its content.
- **Action:** Expanded `tests-e2e/learning_timeline.spec.ts` to explicitly assert the "Onde parei" bookmark, mobile viewport layout, and lesson link clickability.
- **Next Steps:** Maintain component sizes under the limit for future changes.

### [2026-09-06] Jules-Architect: Interface Enhancement & Trend Implementation (2025)
- **Action:** Researched 2025 English teaching trends and identified Adaptive Learning and Flipped Classroom.
- **Action:** Created `AdaptiveLearningWidget` and `FlippedClassroomWidget`.
- **Action:** Updated existing references of 2024 trends to 2025 across the dashboard, exercise data, and tips.
- **Action:** Integrated new widgets into the `DashboardPage` and verified frontend and UI.
- **Next Steps:** Consider personalized learning paths powered by backend integrations.

### [2026-09-15] Jules-Architect: Rebranding "Aurora" + Merge Resolution
- **Action:** Resolved the in-progress merge (`src/Layout.tsx`, `debug_screenshot.png`) keeping the extracted `NavMenu`/`Header` components, and completed `git pull`.
- **Research:** Based the redesign on Cognitive Load Theory (minimize Extraneous Cognitive Load: consistent tokens, hierarchy, chunking), Miller/Faraday UI principles (clarity, concision, consistency, forgiveness) and flow/gamification research (integrated elements + feedback beat isolated badges).
- **Action:** Rebranded the design system to "Aurora" (ink obsidian + violet + aqua + solar gold) in `globals.css` + `tailwind.config.ts`; typography now Sora (display) + Inter (body).
- **Action:** Added `BrandMark`, refactored `DashboardStats` to a token-driven data array, updated `Header`/`NavMenu`/`MascotGreeting`/`DashboardPage` to the new language.
- **Fix:** Root-caused a latent bug where `SidebarMenuButton` inherited `bg-primary` from `Button`, filling every nav item (invisible before because the emerald sidebar matched `primary`).
- **Verified:** `tsc`, `vite build`, `vitest run` (50 tests) and Playwright `home`/`learning_timeline` specs pass in the three themes.
- **Next Steps:** Sweep remaining hardcoded `blue/emerald` accents in secondary widgets for full brand consistency.

### [2026-09-15] Jules-Architect: Layout Bugfixes + CEFR "Trilha da Fluência"
- **Fix:** `Button` base had `[&_svg]:size-4`, whose higher specificity overrode `h-5 w-5` and shrank every icon inside buttons to 16px. Removed the blanket size; explicit icon sizes now win.
- **Fix:** Dashboard grid lacked `grid-cols-1`, so on mobile the single track used `auto` and expanded to the timeline's min-content (528px vs 390px viewport), clipping every card. Added `grid-cols-1` + `min-w-0` on the column.
- **Fix:** Mobile header brand wordmark collapsed to "P..." — `BrandMark` text now hides below `md`; header gaps/shrink tightened.
- **Fix:** Dictionary phonetic (`/æ/`) was clipped by a `truncate`d flex row; the row now stacks on mobile so the badge moves to its own line.
- **Feature:** Rebalanced `getCEFRLevel` (A1:1-2, A2:3-4, B1:5-7, B2:8-10, C1:11-13, C2:14-15) and added `lib/levels.ts` + `LevelRoadmap` ("Trilha da Fluência") mapping the 15 capítulos into A1→C2 with per-level progress, "você está aqui" and a placement-test CTA.
- **Verified:** `tsc`, `vite build`, `vitest run` (50) and Playwright `home`/`learning_timeline` (7) pass; mobile `scrollWidth == clientWidth` (no horizontal overflow).

### [2026-09-15] Jules-Architect: Bloco de Conteúdo "Fundamentos A1"
- **Audit:** Currículo tinha ~40 regras e começava em Present Simple, sem o verbo TO BE nem classes de palavras — buraco crítico para leigo. Também faltavam there is/are, pronomes objeto, possessivo 's e quantificadores.
- **Action:** Criei `grammarFoundationsCore.ts` (Fundamentos da Língua) e `grammarFoundationsBuild.ts` (Construindo Frases) com 9 regras em linguagem para quem nunca viu gramática (explicação, estrutura, exemplos traduzidos, erros comuns), e liguei-as em `grammarCategories` (12→14 categorias, 40→49 regras).
- **Action:** Reordenei o Capítulo 1 no `curriculumData.ts` (16 lições): alfabeto → classes de palavras → TO BE → pronomes pessoais → Present Simple → there is/are → pronomes objeto → possessivo 's → quantificadores → imperativo → vocabulário → práticas/quiz; corrigi `order` duplicado/faltante.
- **Action:** Trocei o azul fixo da caixa de explicação do `GrammarLessonView` pelo token `primary`.
- **Fix:** O ícone do módulo era cortado pelo `overflow-x-hidden` do root do `LearningTimeline` (o `-ml-10/-ml-14` o empurra para fora da caixa). Movi o guard de overflow para o container de scroll do `Layout` e removi do root da timeline.
- **Verified:** `tsc`, `vite build`, `vitest` (50) e Playwright `home`/`learning_timeline` (7) passam; lição "Verbo TO BE" renderiza correta.
- **Next Steps:** Gap-fill A2–C2 (Past Perfect, Present Perfect Continuous, voz passiva, reported speech, gerúndio/infinitivo, used to, relativas, tag questions) e exercícios/quiz próprios por regra nova.

### [2026-09-15] Jules-Architect: Tempos Verbais + Cobertura E2E de Todas as Telas
- **Audit:** Várias aulas apontavam para `grammarRuleIds` inexistentes (`past-perfect`, `passive-voice`, `reported-speech`, `relative-clauses`, `modals`, `present-perfect`, `question-words`) e **não havia aula de futuro** — as regras existiam, mas nenhuma lição as usava.
- **Action:** Criei `grammarTenses.ts` (Presente, Passado, Futuro, linha do tempo e Past Perfect) e `grammarStructures.ts` (Voz Passiva, Reported Speech, Orações Relativas) — 14→16 categorias, 40→57 regras — e registrei em `grammarCategories`.
- **Action:** Corrigi as refs quebradas no `curriculumData` (conditionais → `conditional-sentences`, `modals`→`modal-verbs`, `present-perfect`→`present-perfect-simple`, `question-words`→`questions-interrogative`).
- **Action:** Novo módulo "Verbos: Presente, Passado e Futuro" (5 lições) no Capítulo 1; corrigi o rótulo do módulo de "Capítulo {order}" (global) para "Módulo {index}" dentro da unidade.
- **Tests:** `all_screens.spec.ts` (31 telas, checa render + `pageerror` + print) e `study_flow.spec.ts` (trilha A1-C2, clique na lição ativa, presente/passado/futuro, e integridade: toda lição de gramática resolve uma regra). 42/42 e2e + 50 unit passam.
- **Verified:** `tsc`, `vite build`, prints em `e2e-screenshots/` (gitignored) confirmam o fluxo.
- **Next Steps:** Criar regras separadas para zero/first/second/third conditional (hoje todas apontam para `conditional-sentences`) e exercícios/quiz por regra nova.

### [2026-09-15] Jules-Architect: As 4 Vertentes de Nation (input, output, fluência, checkpoints)
- **Research:** Mapeei a evidência (CEFR/can-do, Cambridge GLH, English Grammar Profile, Milton & Meara p/ tamanho de vocabulário, Nation Four Strands, Krashen/Swain/Long, retrieval espaçado, pronúncia em camadas) e comparei com o app. Lacunas: input extensivo, output escrito, fluência e checkpoints.
- **Input:** `gradedReaders*` + `ReadingPage`/`ReadingViewPage` (`/reading`, `/reading/:id`): textura A1–C1, áudio TTS com play contínuo, tradução por linha e progresso.
- **Vocabulário:** `coreVocabulary*` (top 1k–5k), metas por nível (1.5k→5k) e `VocabularyVaultPage` (`/vocabulary`) com deck e "palavras conhecidas" persistidas.
- **Fluência:** `fluencyData` + `FluencyPage` (`/fluency`): 4/3/2 cronometrado e shadowing (reusa `SpeakingExercise`).
- **Output escrito:** `dictationData` + `WritingPage` (`/writing`): ditado com diff palavra-a-palavra e redação com feedback heurístico.
- **Avaliação:** `levelCheckpoints` + `CheckpointsPage` (`/checkpoints`): can-do checklist e prova por nível (aprova e libera o próximo).
- **Infra:** `usePersistentState`, `useKnownWords`, `useReadingProgress`, `useCanDo`; 5 rotas + grupo "Habilidades" no `NavMenu`.
- **Tests:** `all_screens.spec.ts` agora com 37 telas; `learn_hub.spec.ts` cobre interações (marcar palavra, concluir leitura, ditado correto, 4/3/2, aprovar checkpoint). 53 e2e + 50 unit + `tsc`/`vite build` passam; prints em `e2e-screenshots/`.
- **Next Steps:** conteúdo real em escala (listas de vocabulário/frequência maiores, mais leitores, correção de escrita com IA) e separar os 4 conditionais.

### [2026-09-15] Jules-Architect: Auditoria E2E (todas as telas/exercícios) + Correções Agressivas
- **Audit:** `audit_all.spec.ts` percorre 38 rotas em desktop **e** mobile, mede erro de JS e overflow/corte horizontal e tira print. Resultado: 0 `pageerror`, 0 overflow real (só glows decorativos). Prints em `e2e-screenshots/audit-{d,m}-*.png`.
- **Fix crítico — Listening:** sem `lessonId` o componente nunca carregava (`Carregando...` eterno) e a página estava em inglês. Agora usa o fallback de `getListeningExercisesForLesson("")` e a UI está em PT-BR.
- **Fix crítico — Hangman mobile:** o teclado ficava atrás da bottom nav; agora é `sticky bottom-24` (acima da nav), com galows menor e teclas `w-8 h-10 sm:w-10 sm:h-12`. Cores `slate/blue/green/gray` → tokens.
- **Fix — RulePage:** o contexto de lição não batia com a regra (breadcrumb e conclusão errados); agora um mapa `regra→lição` corrige a URL (`lesson=verbo-to-be`) e a navegação "Próxima/Anterior". Botões de áudio dos exemplos eram `hover-only` (invisíveis no touch) → visíveis no mobile.
- **Fix — Assistente flutuante:** cobria células/alternativas; agora é `h-12 w-12` no mobile e oculto em rotas densas (`/games`, `/exercises`, `/reading/*`, `/writing`, `/fluency`).
- **Fix — Bubble Pop:** gradiente azul-céu e modais brancos → tokens Aurora (`brand-violet/aqua`, `primary`, `card`).
- **Tests:** **170 e2e** (audit x2 viewports + 37 telas + fluxos) + 50 unit + `tsc`/`vite build` passam.
- **Next Steps:** avaliar prints desktop dos exercícios restantes (news-comprehension, matching-pairs, speed-match, sentence-rush) e tokenizar widgets do dashboard.






### [2026-09-19] Jules-Architect: Implementação do Benchmark (P0–P2, IA local sem chaves)
- **Confiança:** removidos 31 widgets simulados (XP farmável); `PracticeHub` só com práticas reais. Fala validada por alinhamento LCS ≥70% (`speechMatch`). Manifest "Aprenda Inglês". LogRocket só com consentimento (LGPD). Restaurar backup validado (`lib/backup.ts`).
- **Conteúdo:** ~2.700 palavras A1–C2 (`lib/vocab/*`), 60 leitores A1–C2 (`lib/readers/*`), 50 entradas viagem/trabalho no dicionário.
- **SRS:** SM-2 → FSRS (`ts-fsrs`) com migração; recebe palavras das lições, regras estudadas, ditados errados e o cofre.
- **Novas telas:** `/pronunciation` (pares mínimos para brasileiros), `/tracks` (Viagem/Trabalho), `/tutor` (IA local), nivelamento adaptativo com ponto de partida.
- **IA sem chaves:** Chrome Prompt API (Gemini Nano) → fallback WebLLM (Qwen2.5-1.5B em worker); correção de redação com a mesma IA. web-llm em chunk próprio, fora do precache.
- **Lembrete de ofensiva:** Periodic Background Sync no SW (`public/sw-reminders.js`), sem servidor push.
- **Não feito:** conta/sync e ligas (exigem servidor; ranking falso repetiria os widgets falsos).
- **Tests:** E2E agora roda contra `vite build && vite preview`; locators mobile filtram só visíveis. 73 unit + 284 e2e; Biome 276 → 186 erros (arquivos novos limpos).
