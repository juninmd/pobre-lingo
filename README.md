# Pobre Lingo

English learning PWA with a pt-BR interface (grammar rules, exercises, games, dictionary, dashboard). Local-first: all progress lives in the browser's localStorage. No backend, no accounts, no API keys.

- **AI tutor**: runs in the browser. Uses Chrome's built-in Prompt API when available, otherwise the open model via WebLLM (WebGPU). See `src/lib/ai/selectProvider.ts`.
- **Analytics**: LogRocket, started only with user consent (`src/lib/analyticsConsent.ts`).
- **Deploy**: Netlify (`netlify.toml`, publishes `dist/`).

## Stack

Versions as declared in `package.json`:

- React `^19.2.7`, react-dom `^19.2.7`
- react-router-dom `^7.18.4`
- Vite `^8.0.16`, vite-plugin-pwa `^1.3.0`
- TypeScript `^6.0.3`
- Tailwind CSS `^4.3.0`, Radix UI and shadcn-style components in `src/components/ui/`
- `@mlc-ai/web-llm` `0.2.85` (pinned), `ts-fsrs` `5.4.2` (pinned)
- Biome `2.4.16`, Vitest `^4.1.8`, Playwright `^1.60.0`
- Package manager: pnpm (`packageManager`: `pnpm@8.14.3`). Do not use npm or yarn.

## Scripts

| Command | What it does |
|---------|--------------|
| `pnpm install` | Install dependencies (CI uses `--frozen-lockfile`) |
| `pnpm dev` | Vite dev server (default port, no custom `server` config) |
| `pnpm build` | `vite build` to `dist/` (no separate `tsc` step) |
| `pnpm preview` | Serve `dist/` |
| `pnpm lint` | `biome check src/` |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest, single run (used by CI) |

E2E: `pnpm exec playwright test`. `playwright.config.ts` sets `webServer` to run `vite build` and then `vite preview --port 5187 --strictPort`, so specs always run against the production bundle. Projects: `chromium` (Desktop Chrome) and `Mobile Chrome` (Pixel 5). Specs live in `tests-e2e/`.

PWA icons: `node scripts/generate-pwa-icons.mjs` regenerates the PNGs in `public/` from `public/pwa-512x512.svg` (needs the Playwright Chromium install).

CI (`.github/workflows/verify.yml`, runs on `master`): `pnpm install --frozen-lockfile`, `pnpm exec tsc --noEmit`, `pnpm exec biome lint src/`, `pnpm run build`, `pnpm run test:run`. It does not run e2e.

## Layout

```
src/
  main.tsx          entry; wraps the app in providers
  Router.tsx        createBrowserRouter; mounts pageRoutes under Layout
  pageRoutes.ts     route table: path -> lazy page component
  pages/            route components (lazy-loaded)
  components/       feature folders (dashboard, exercises, layout, ...); ui/ is vendored shadcn
  contexts/         ThemeContext, GamificationContext, NotificationContext, ActiveLessonContext
  hooks/            custom hooks (streaks, progress, SRS, tutor, ...)
  lib/              domain data, storage helpers, SRS, AI providers (lib/ai/)
tests-e2e/          Playwright specs
tests/              Vitest component tests (tests/components/)
```

Unit tests are colocated as `*.test.ts(x)` under `src/` or in `tests/`. Vitest runs with jsdom and `src/setupTests.ts`. `tests/e2e/*.py` are standalone Python scripts; neither runner executes them.

## Conventions

- Lint and format: Biome (`biome.json`: tabs, double quotes). `pnpm lint` must pass for changed files.
- Code size: target is 150 lines per file for new and touched files. Static data modules (`src/lib/vocab/`, `curriculumData.ts`, `grammarRules.ts`, `exerciseData.ts`, `dictionaryData.ts`, `quizData.ts`, `achievementsData.ts`) and vendored `src/components/ui/` are exempt.
- Content is bilingual: Portuguese and English fields (`*_pt`, `*_en`).
- Use the `src/lib/localStorage.ts` helpers, not raw `localStorage`. Keys are prefixed `pobrelingo_`.
- Agent and contributor rules: see `AGENTS.md` and `.github/copilot-instructions.md`.

## Known lint noise on Windows

With `core.autocrlf=true`, `pnpm lint` reports many CRLF formatter errors on Windows. Judge a change by comparing the lint output against a clean `master`, not against zero errors.

## Route table

Add a page to `src/pageRoutes.ts` (path and lazy component), then add its nav entry in `src/components/layout/navigationData.ts`. Dynamic segments use `:param` (e.g. `rules/:categoryId`).
