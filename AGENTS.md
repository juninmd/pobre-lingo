# AGENTS.md

Pobre Lingo: English-learning PWA (React + Vite + Tailwind 4) with a small Node/Postgres sync API in `server/`. Deploy via `apphosting.yaml`, the GitHub Pages workflow, and manifests in `juninmd/app-charts`.

## Roles

- **Architect**: structure, orchestration, process integrity. Direct and analytical.
- **Frontend**: visual identity, interaction, accessibility. Detail-oriented.
- **DevOps**: CI/CD, scripts, automation-first.

## Stack

- App: React, Vite, Tailwind 4, Biome, Vitest (`pool: "vmThreads"`), Playwright (`tests-e2e/`, config `playwright.config.ts`).
- Server (`server/`): Node + Postgres. Chat proxies LiteLLM; system prompts live only on the server.
- Package manager: pnpm 8 (`packageManager` field; `pnpm-lock.yaml` v6.0). CI `verify.yml` uses Node 22.x.

## Commands

```bash
pnpm dev          # Vite dev server
pnpm build        # production build (dist/)
pnpm lint         # biome check src/ config/
pnpm typecheck    # tsc --noEmit
pnpm test:run     # vitest run
pnpm check        # typecheck + lint + test:run
```

CI `verify.yml` runs `tsc --noEmit`, `biome lint src/`, `build`, and `test:run`. Playwright specs have no npm script; run them with `npx playwright test`.

## Structure

- `src/app/`: shell (`AppProviders`, `Router`, `routes.ts`, `Layout`).
- `src/components/`: UI by feature (`shell/`, `arcade/`, `buddy/`, `dashboard/`, `charts/`, `mascot/`, `common/`).
- `src/lib/`: logic (`cloudSync/`, `practice/`, `wordWheel/`, `baseUrl.ts`, `pageReload.ts`).
- `src/styles/`: `arcade.css`, `shell.css`, `motion.css`, `word-wheel*.css`.
- `config/`: Vite config split. `public/boot.js`: theme and preload before React. `server/`: sync API and chat proxy.
- `docs/`: `development.md` (scripts, layout, performance rules), `ui-prototype/` (design sources).

## Development rules

1. Plan, act, validate. Check first whether a feature already exists, to avoid duplicate work.
2. Max 150 lines per file. Split by responsibility.
3. Separation of concerns across all layers.
4. Every change needs passing tests and lint.
5. Sensitive data stays out of context, logs, and commits.

## Gotchas

- **Routes**: every static route must appear in the ⌘K catalog (`src/components/common/searchData.ts`) and light a tab. `src/components/shell/coverage.test.ts` enforces it.
- **Base path**: the app is served under `/pobre-lingo/` on GitHub Pages (`VITE_BASE`). Never hardcode `/`-rooted URLs; use `withBase()` from `src/lib/baseUrl.ts`. Pages sends no headers, so there is no CSP there. The Pages source must be GitHub Actions.
- **CSP**: the app CSP has `script-src 'self'`. Never add an inline `<script>` to `index.html`; extend `public/boot.js`.
- **Tests**: `window.location` cannot be stubbed under `vmThreads`. Go through `src/lib/pageReload.ts` (`reloadPage`, `hardNavigate`) and mock that module. Load matchers from `@testing-library/jest-dom/vitest`.
- **Tailwind v4**: `[data-theme=pobre-lingo]:` compiles to an empty `:is()` and does nothing. Do not use it.
- **Mobile**: fixed floating UI uses `.above-tabbar` so the bottom bar stays clickable.
- **Components**: `SidebarMenuButton` must stay a plain element, never wrap a `Button`. Do not set `shape-rendering` globally: a CSS rule on `svg` overrides the attribute.
- **Mascot**: render at multiples of 24 px so every pixel is the same size. Animations use `steps()` keyframes and stop under reduced motion.
- **Cloud sync** (`src/lib/cloudSync/`): `plsync_*` keys must stay outside `APP_STORAGE_PREFIXES`, or sync data leaks into backup files. Never push an empty snapshot.
- **Server secrets** (names only, values never in repo or logs): the API needs `pobre_lingo_api_database_password` in `sops-master-secret` before its first deploy; `LITELLM_API_KEY` must be set for the chat proxy.
- **Chat (Mika)**: the server enforces the goodbye after `MAX_TURNS`. The client sends only user and assistant turns, never system prompts.
- **Word wheel**: keep the selected path in a ref (`useSyncedPath`); `pointerup` can arrive before the last `pointermove` re-render.
- **Sandbox Playwright**: set `launchOptions.executablePath: /opt/pw-browsers/chromium` (the installed browser differs from the package).
- **Unused code**: `src/lib/practice/*Extra.ts` are not imported yet; kept as content. Root-level files in `src/components/dashboard/` (`LiveTutorWidget`, `ProjectBasedLearningWidget`, `DataDrivenLearningWidget`, `AdaptiveLearningWidget`, `FlippedClassroomWidget`) have no importers.

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
