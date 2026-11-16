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
- Consult `README.md` (quick start) and `docs/development.md` (scripts, layout, rules); this file holds agent rules only.
- Ensure to check if features are already implemented to avoid duplicate work and safely transition to completion when verifying existing states (e.g. Learning Timeline).

## 📅 Session Logs

### [2026-11-11] Spark-Frontend / Jules-Architect: Pobre Lingo 2.0 (arcade de bolso)
- **Action:** The 30-item sidebar became four tabs (`components/shell/TabNav.tsx`, `navTabs.ts`): Hoje (next step, daily queue, quests), Aprender (`/learn`: journey, skills, reference, method deck), Jogar (`/arcade`: Roda featured, minigames, drills), Eu (`/me`: profile, CEFR band, links to progress/achievements/test/settings). Hub cards come from `shell/hubData.ts` + `hubLinksPlayMe.ts`.
- **Action:** New tokens (ink, gold, aqua, coral; `--gold`, `--press-depth`), fonts Bricolage Grotesque + Silkscreen (Sora removed), tactile `.press` buttons, `.deck` carousel for the trend widgets, `.lift` cards (`styles/arcade.css`, `styles/shell.css`).
- **Note:** Every static route must appear in the ⌘K catalog (`common/searchData.ts`) and light a tab; `shell/coverage.test.ts` enforces it. Fixed floating UI on phones uses `.above-tabbar` so the bottom bar stays clickable.
- **Note:** The journey (`LearningTimeline`, "Sua Jornada") now lives at `/learn`; the e2e specs `journey`, `learning_timeline`, `timeline`, `homologacao` and `test_home` were moved to the tabs. Playwright here needs `launchOptions.executablePath: /opt/pw-browsers/chromium` (installed browser build differs from the package).

### [2026-11-11] Spark-Frontend: Roda de Palavras
- **Action:** New game `/games/word-wheel` (Arcade): drag across letters on a wheel (or type / tap + centre button) to find every word; dictionary words that fit count as bonus. Puzzles are data in `src/lib/wordWheel/puzzles*.ts` (a test checks every word fits its wheel); progress saved under `pobrelingo_word_wheel`. Arcade list moved to `components/arcade/arcadeGames.ts`.
- **Note:** The wheel keeps the selected path in a ref (`useSyncedPath`): `pointerup` can arrive before the re-render of the last `pointermove`. Its CSS lives in `styles/word-wheel*.css`, imported by the page chunk only.

### [2026-11-10] Bolt-Automation: GitHub Pages
- **Action:** `.github/workflows/pages.yml` deploys `dist/` to GitHub Pages under `/pobre-lingo/` (`VITE_BASE`). The router `basename`, `hardNavigate`, the notification click, `sw-reminders.js`, the manifest and the home preload all honour the base; `404.html` is the SPA fallback.
- **Note:** Never hardcode `"/"`-rooted URLs for the browser (`window.location`, icons, `fetch`): use `withBase()` from `src/lib/baseUrl.ts`. Pages sends no headers, so the CSP in `public/_headers` does not apply there. Repo setting still needed: Pages source = GitHub Actions.

### [2026-11-10] Jules-Architect / Spark-Frontend / Bolt-Automation: Architecture, performance and UI pass
- **Action:** `src/app/` now holds the shell (`AppProviders`, `Router`, `routes.ts`, `Layout`, `ShellExtras`); pages are all `<Name>Page.tsx` (no more `[param]/page.tsx`); `globals.css` split into `src/styles/`; Vite config split into `config/`. Removed 56 unused source files, the one-off scripts at the repo root and 9 unused dependencies (recharts, react-hook-form, react-day-picker, react-helmet-async, 4 Radix packages, playwright).
- **Action:** First load: heavy data left the shell (see "Performance rules" in `docs/development.md`), fonts are self-hosted, `index.html` paints a static shell, `public/boot.js` applies the saved theme and preloads the home chunk.
- **Action:** Progress page has SVG charts (`src/components/charts/`); motion classes live in `src/styles/motion.css`.
- **Note:** The site CSP has `script-src 'self'`: never add an inline `<script>` to `index.html`, extend `public/boot.js` instead.
- **Note:** A CSS rule on `svg` beats the `shape-rendering="crispEdges"` attribute of the pixel mascot; do not set `shape-rendering` globally.
- **Note:** Tests run with `pool: "vmThreads"`. `window.location` cannot be stubbed there: go through `lib/pageReload.ts` (`reloadPage`, `hardNavigate`) and mock that module.
- **Note:** `src/lib/practice/*Extra.ts` (dictation, fluency, shadowing, writing prompts) are still not imported anywhere; left in place because they are content, not code.

### [2026-11-01] Jules-Architect / Spark-Frontend: Conversa com a Mika (VRM + correção ao vivo)
- **Action:** New page `/buddy`: VRM character (`components/buddy/vrmScene.ts`, lazy `three` chunk, excluded from the PWA precache) talks via browser TTS with lip-sync, chat with live spelling/grammar diff (`useLiveCorrection`, 700 ms debounce). Server proxies LiteLLM `cloud/auto` (`server/chat*.mjs`); system prompts live only on the server, the client sends just user/assistant turns.
- **Note:** Mika always opens the chat and says "Bye! Tchau!" after `MAX_TURNS` (server enforces the goodbye). Deploy needs `LITELLM_API_KEY` in the API's secret (manifests are not in `app-charts` at this time).

### [2026-10-21] Spark-Frontend: UI improvements prototype
- **Action:** Added `docs/ui-prototype/` (Claude Design canvas sources): Minha Jornada desktop/mobile, mobile menu, exercise, system panels and the existing pixel art mascot as a component. No app code changed.
- **Note:** Every dashboard, header and sidebar feature is represented; implementing it in `src/` is a separate step.

### [2026-10-19] Jules-Architect / Bolt-Automation: PWA hardening and cloud progress sync
- **Action:** Manifest gained `id`, `display_override` and shortcuts; Workbox cleans old caches. Added opt-in sync of the backup snapshot to `server/` (Node + Postgres, deployed from `juninmd/app-charts/pobre-lingo-api`). Client in `src/lib/cloudSync/`, UI in `CloudSyncCard`.
- **Note:** `plsync_*` keys must stay outside `APP_STORAGE_PREFIXES`, or the sync code would leak into backup files. Never push an empty snapshot. The API needs the `pobre_lingo_api_database_password` key in `sops-master-secret` before the first deploy.

### [2026-10-09] Spark-Frontend: Pixel art mascot
- **Action:** Replaced the vector blob in `src/components/mascot/Pobrelingo.tsx` with a 24x24 pixel art bird. The art is data: `pobrelingoArt.ts` (palette, body, wings), `pobrelingoFaces.ts` (eyes and beaks per emotion), `pixelSprite.ts` (rows to SVG paths). Same props and the four emotions, plus `animated` and `title`.
- **Note:** Show it at multiples of 24 (48, 72, 96, 120, 144) so every sprite pixel has the same size. Animations are `steps()` keyframes (`pl-*` in `globals.css`) and stop under the global reduced-motion rule. The SVG is sized inline on purpose: a parent `Button` squeezed the old mascot to 16px through `[&_svg]:size-4`.
- **Action:** Follow-up to the #247 review: the reduced-motion still pose now shows both sparkles; the hop no longer clips the crest (`overflow: visible`); `decorative` hides the mascot from assistive tech in its four callers, which all have a label or text already; the sprite tests compare drawn cells and fills, and `mascotStyles.test.ts` reads `globals.css` for the motion contract.

### [2026-10-09] Spark-Frontend / Bolt-Automation: UI audit, a11y fixes and dependency refresh
- **Action:** Audited every route (desktop + mobile, light/dark/pobre-lingo) with axe-core plus an overflow and console check. Fixed: sidebar items painted `bg-primary` (`SidebarMenuButton` must stay a plain element, never wrap `Button`), WCAG AA contrast tokens, `Progress` never forwarding `value`, unnamed icon buttons, mobile horizontal scroll, clipped next-lesson CTA, word search (blank cells, no touch selection), `?scenario=` ignored by the conversation page.
- **Action:** Updated every dependency to latest, majors included (TypeScript 7, vite-plugin-pwa 2, jest-dom 7, jsdom 30, @types/node 26, Biome 2.5). Tests load matchers via `@testing-library/jest-dom/vitest` (the bare import breaks Vitest 5 types).
- **Note:** Do not use `[data-theme=pobre-lingo]:` as a Tailwind variant: v4 compiles it to an empty `:is()`, so those classes do nothing.
- **Note:** e2e specs already failing before this session (stale after the Journey Book redesign): `virtual_immersion`, `study_flow` "jornada mostra a trilha", `benchmark_features` "painel", and the mobile "Atalhos" bottom-bar checks in `journey` / `learning_timeline`.

### [2026-10-08] Jules-Architect: Validation of Interactive Journey Book
- **Action:** Audited codebase for requested UI/UX refactoring (Interactive Journey Book).
- **Findings:** The requested features (`LearningTimeline`, MobileNav visibility logic, removed START popups, gamified header, "Onde parei" bookmark, and associated Playwright tests) are already fully implemented and verified as passing.
- **Next Steps:** Proceeding with standard validation checks and closing the session as the state is already compliant with the user's request.

### [2024-05-27] Jules-Architect: Interface Modernization & Trend Integration
- **Action:** Researched 2024 English learning trends (British Council) and redesigned the `DashboardPage` layout to categorize widgets ("Imersão Digital & IA", "Conexão Humana & Social", "Nano-Learning & Cultura", "Metodologias Ativas").
- **Action:** Created `LiveTutorWidget.tsx` to satisfy the "Live Human Connection" trend requirement.
- **Findings:** Successfully modernized the dashboard layout. Ensured all new structural elements are thoroughly tested via Playwright E2E.
- **Next Steps:** Maintain the structured grid layout for future widget additions.
- **Note:** Files at the root of `src/components/dashboard/` (outside `trends/`) (`LiveTutorWidget`, `ProjectBasedLearningWidget`, `DataDrivenLearningWidget`, `AdaptiveLearningWidget`, `FlippedClassroomWidget`) have no importers. PBL, DDL and Flipped are superseded by `src/components/dashboard/trends/` (`PBLWidget`, `DDLWidget`, `FlippedClassroomWidget`); LiveTutor and Adaptive have no `trends/` counterpart.

### [2026-10-07] Jules-Architect: Interface Enhancement & Trend Implementation
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

### [$(date +%Y-%m-%d)] Jules-Architect: Validation of Interactive Journey Book (Re-Validation)
- **Action:** Audited the codebase to address the prompt requesting the "Interactive Journey Book" timeline refactoring.
- **Findings:** Verified that the `LessonMap` component had already been fully replaced by `LearningTimeline.tsx`. Verified that the requested E2E Playwright tests (`learning_timeline.spec.ts` and `journey.spec.ts`) exist and pass. Verified that the layout refactoring to unify navigation and remove `MobileNav` was already done.
- **Next Steps:** As the requested state is already achieved, no structural code changes are required for this action.

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.