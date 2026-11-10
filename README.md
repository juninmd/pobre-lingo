# Pobre Lingo

English learning PWA with a pt-BR interface (grammar rules, exercises, games, dictionary, dashboard). Local-first: all progress lives in the browser's localStorage and works offline (installable PWA). Optionally it syncs to a small API (`server/`, Postgres in the k8s cluster) with no accounts: a secret sync code identifies the data.

- **AI tutor**: runs in the browser. Uses Chrome's built-in Prompt API when available, otherwise the open model via WebLLM (WebGPU). See `src/lib/ai/selectProvider.ts`.
- **Conversa com a Mika** (`/buddy`): personagem VRM 3D (three + `@pixiv/three-vrm`, chunk `three` carregado sob demanda) que puxa assunto, conversa ~4 turnos e se despede com "Bye! Tchau!", corrigindo o texto em tempo real. A IA é o LiteLLM (`cloud/auto`), acessado só pelo `server/` (`POST /v1/chat`, `POST /v1/correct`, limite por IP); a chave nunca vai ao navegador. Server env: `LITELLM_API_KEY` (obrigatória, sem ela as rotas dão 503), `LITELLM_BASE_URL` (padrão `http://litellm.ai.svc.cluster.local:4000/v1`), `LITELLM_MODEL` (padrão `cloud/auto`). Modelo VRM: `VITE_VRM_URL` em build (padrão: amostra do pixiv/three-vrm) ou upload na página; falha de WebGL/VRM cai no mascote pixel art.
- **Fonts**: Inter and Sora are self-hosted variable fonts (`@fontsource-variable/*`, latin subsets, `src/styles/fonts.css`); no request to Google Fonts.
- **Analytics**: LogRocket, started only with user consent (`src/lib/analyticsConsent.ts`).
- **Deploy**: Netlify (`netlify.toml`, publishes `dist/`) and GitHub Pages (`.github/workflows/pages.yml`, see "GitHub Pages" below). The API image is built by `.github/workflows/api-image.yml`; its manifests live in `juninmd/app-charts` (`pobre-lingo-api/`).

## Stack

Versions as declared in `package.json`:

- React `^19.3.0`, react-dom `^19.3.0`
- react-router-dom `^7.18.4`
- Vite `^8.3.4`, vite-plugin-pwa `^2.0.0`
- TypeScript `^7.0.2` (native compiler: `tsc` has no programmatic JS API until 7.1)
- Tailwind CSS `^4.3.3`, Radix UI and shadcn-style components in `src/components/ui/`
- `@mlc-ai/web-llm` `0.2.85` (pinned), `ts-fsrs` `5.4.2` (pinned)
- Biome `2.5.15`, Vitest `^5.0.3`, jsdom `^30.1.2`, Playwright `^1.64.0`
- Node 22.22.2 or newer (jsdom 30); Netlify builds with Node 22
- Package manager: pnpm (`packageManager`: `pnpm@8.14.3`). Do not use npm or yarn.

## Scripts

| Command | What it does |
|---------|--------------|
| `pnpm install` | Install dependencies (CI uses `--frozen-lockfile`) |
| `pnpm dev` | Vite dev server (default port, no custom `server` config) |
| `pnpm build` | `vite build` to `dist/` (no separate `tsc` step) |
| `pnpm preview` | Serve `dist/` |
| `pnpm lint` | `biome check src/ config/` |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm check` | typecheck, lint and tests in one go |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest, single run (used by CI) |

E2E: `pnpm exec playwright test`. `playwright.config.ts` sets `webServer` to run `vite build` and then `vite preview --port 5187 --strictPort`, so specs always run against the production bundle. Projects: `chromium` (Desktop Chrome) and `Mobile Chrome` (Pixel 5). Specs live in `tests-e2e/`.

PWA icons: `node scripts/generate-pwa-icons.mjs` regenerates the PNGs in `public/` from `public/pwa-512x512.svg` (needs the Playwright Chromium install).

CI (`.github/workflows/verify.yml`, triggers on `master`, but its job is switched off with `if: false`): `pnpm install --frozen-lockfile`, `pnpm exec tsc --noEmit`, `pnpm exec biome lint src/`, `pnpm run build`, `pnpm run test:run`. It does not run e2e.

## Progress sync API

Opt-in, from Settings > Sincronização na nuvem. The browser keeps working offline; sync only moves the same snapshot that the file backup uses (`collectBackupData`).

- `VITE_API_URL` (build time) sets the API base URL; defaults to `https://pobre-lingo-api.antonio-code.duckdns.org`. Set it to an empty string to hide the feature.
- Client: `src/lib/cloudSync/` (`client.ts` HTTP, `engine.ts` reconcile/conflicts, `meta.ts` sync code and last-synced version). `useBackgroundSync` (mounted in `Layout`) syncs on open, on `online`, on focus and every 5 min. `plsync_*` keys are outside the backup prefixes on purpose.
- Conflicts: a version number gives optimistic concurrency. If both sides changed, the user picks cloud or this device; an empty local state is never pushed.
- Server: `server/` (Node 22, `pg`). Run with `DATABASE_URL=postgres://... node server/index.mjs` (`PORT`, `ALLOWED_ORIGIN` optional). Table `progress` is created on start; only the SHA-256 of the sync code is stored.

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | Pings the database |
| GET | `/v1/progress` | `Authorization: Bearer <code>`; 404 if none |
| PUT | `/v1/progress` | `{ data, baseVersion }`; 409 with `current` on version mismatch |
| DELETE | `/v1/progress` | Removes the snapshot |
| POST | `/v1/chat` | `{ messages, level }` -> `{ reply, done }`; empty `messages` makes Mika open the chat |
| POST | `/v1/correct` | `{ text }` -> `{ corrected, note }` |

Server tests run with the rest (`pnpm test:run`, `server/*.test.mjs`).

## Layout

```
index.html          static app shell (painted before JS) + boot.js
public/boot.js      saved theme and home-route preload, before first paint (external: CSP forbids inline scripts)
config/             build config split out of vite.config.ts: chunks.ts, pwa.ts, preloadHomeRoute.ts
src/
  main.tsx          entry; AppProviders + Router
  app/              app shell: AppProviders, Router, routes.ts (route table), Layout, ShellExtras (lazy search, mascot, install prompt)
  pages/            route components, one lazy chunk each; every file is `<Name>Page.tsx`
  components/       feature folders (dashboard, charts, exercises, layout, ...); ui/ is vendored shadcn
  contexts/         ThemeContext, GamificationContext, NotificationContext
  hooks/            custom hooks (`useX.ts`)
  lib/              domain data, storage helpers, SRS, AI providers (lib/ai/), cloud sync (lib/cloudSync/)
  styles/           globals.css imports these: tokens, base, surfaces, motion, mascot, skeleton, ...
  test-utils/       shared test helpers
server/             progress sync API (Node + Postgres), own package.json and Dockerfile
scripts/            audit-page.mjs, capture-screens.mjs (before/after screenshots), generate-pwa-icons.mjs
tests-e2e/          Playwright specs
tests/              Vitest component tests (tests/components/)
```

Unit tests are colocated as `*.test.ts(x)` under `src/` or in `tests/`. Vitest runs with jsdom (`pool: "vmThreads"`, one jsdom per worker) and `src/test-utils/setup.ts`. `tests/e2e/*.py` are standalone Python scripts; neither runner executes them.

## Conventions

- Lint and format: Biome (`biome.json`: tabs, double quotes). `pnpm lint` must pass for changed files.
- Code size: target is 150 lines per file for new and touched files. Static data modules (`src/lib/vocab/`, `curriculumData.ts`, `grammarRules.ts`, `exerciseData.ts`, `dictionaryData.ts`, `quizData.ts`, `achievementsData.ts`) and vendored `src/components/ui/` are exempt.
- Content is bilingual: Portuguese and English fields (`*_pt`, `*_en`).
- Use the `src/lib/localStorage.ts` helpers, not raw `localStorage`. Keys are prefixed `pobrelingo_`.
- Agent and contributor rules: see `AGENTS.md` and `.github/copilot-instructions.md`.

## Known lint noise on Windows

With `core.autocrlf=true`, `pnpm lint` reports many CRLF formatter errors on Windows. Judge a change by comparing the lint output against a clean `master`, not against zero errors.

## Performance rules

These keep the first load small; `pnpm build` prints chunk sizes to check them.

- Heavy data stays out of the shell. `lib/cefr.ts` and `lib/coreVocabularyMeta.ts` hold the small constants; import `lib/curriculumData.ts`, `lib/coreVocabulary.ts` or `lib/grammarRules.ts` only from the page that renders that data, or load them with `import()` (see `hooks/useWordOfTheDay.ts`).
- `lib/srsCards.ts` is the read side of the SRS (no `ts-fsrs`); the shell uses it to count due reviews. Scheduling lives in `lib/srs.ts`.
- Vendor chunks are grouped by exact package name in `config/chunks.ts`. Only what the shell uses on every screen is grouped; the rest is left to the bundler.
- Animate only `transform` and `opacity`, with the classes in `src/styles/motion.css` (`reveal`, `reveal-stagger`, `grow-x`, `grow-y`, `draw-stroke`, `pop-in`). The reduced-motion rule turns them all off.
- No `backdrop-filter` or large `blur()` on repeated elements (cards, list rows).
- Charts are plain SVG in `src/components/charts/`, drawn at the real pixel width. Series colours are the `--series-N` tokens, in fixed order, validated for colour-blind separation in both themes.

## GitHub Pages

`.github/workflows/pages.yml` builds and publishes `dist/` on every push to `master` (and on demand) to `https://juninmd.github.io/pobre-lingo/`. One-time setup: **Settings > Pages > Build and deployment > Source: GitHub Actions**.

- **Sub-path.** A project site lives under `/pobre-lingo/`, so the build takes `VITE_BASE` (default `/`, used by Netlify and local dev). The workflow gets it from `actions/configure-pages`, which returns an empty base when a custom domain is set. To try it locally: `VITE_BASE=/pobre-lingo/ pnpm build`.
- **Everything that reaches the browser directly goes through the base**: the router gets `basename` (`src/lib/baseUrl.ts`), `hardNavigate` and the notification click add it, the service worker reads it from its own scope, and `config/pwa.ts` and `config/preloadHomeRoute.ts` take it as a parameter. New code must not write `window.location.href = "/x"` or `src="/x.png"`; use `withBase("/x")`.
- **Deep links.** Pages has no rewrite rules, so `config/spaFallback.ts` copies `index.html` to `404.html`. A direct visit to `/pobre-lingo/review` gets that file (with HTTP status 404) and the router takes over. Netlify keeps using `public/_redirects`.
- **Not available on Pages**: response headers. `public/_headers` (CSP, frame and referrer policies) only applies on Netlify, so the Pages site runs without the CSP.
- **Cloud sync**: the API sends `Access-Control-Allow-Origin` from `ALLOWED_ORIGIN` (default `*`). If the cluster pins it to the Netlify origin, add `https://juninmd.github.io`.
- `localStorage` is per origin, and every project site of the account shares `juninmd.github.io`. Keys are prefixed `pobrelingo_`, so there is no clash, but the data is shared with any other app on that origin.

## Route table

Add a page to `src/app/routes.ts` (path and lazy component), then add its nav entry in `src/components/layout/navigationData.ts`. Dynamic segments use `:param` (e.g. `rules/:categoryId`).
