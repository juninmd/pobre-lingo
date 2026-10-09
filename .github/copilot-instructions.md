# PobreLingo - AI Coding Agent Instructions

## Project Overview
English learning PWA with a pt-BR UI: grammar rules, interactive exercises, dictionary, gamified streaks. **Client-side only**: no backend API, all progress in localStorage, AI tutor runs in the browser (Chrome Prompt API, falling back to WebLLM). Deployed on Netlify (`netlify.toml`, publishes `dist/`).

## Tech Stack
- **Build**: Vite 8 + TypeScript 7 + React 19 | **Package Manager**: pnpm only (`packageManager` field; never npm/yarn)
- **Styling**: Tailwind CSS 4 + shadcn/ui (Radix), config in `components.json` | **Routing**: react-router-dom 7
- **Lint/format**: Biome 2 (`biome.json`, tabs, double quotes) | **Tests**: Vitest (unit), Playwright (e2e)
- **State**: React Context (`src/contexts/`), custom hooks (`src/hooks/`), localStorage | **Icons**: lucide-react

## Commands
```bash
pnpm install        # install (pnpm 8.14.3 per packageManager)
pnpm dev            # Vite dev server
pnpm build          # vite build -> dist/ (no separate tsc step)
pnpm lint           # biome check src/
pnpm test:run       # vitest run (unit tests)
```
Playwright e2e (`tests-e2e/`) builds and serves the production bundle on port 5187 (see `playwright.config.ts`).

## Architecture

### Routing (`src/pageRoutes.ts`, `src/Router.tsx`)
- `src/pageRoutes.ts` is the route table: each entry maps a `path` to a lazy-loaded `Component`.
- `src/Router.tsx` builds the browser router from that table, under `Layout`, with a Suspense fallback.
- Pages live in `src/pages/`; dynamic segments use `:param` (e.g. `rules/[categoryId]` -> `rules/:categoryId`).

### Data Layer (static modules, no API)
| File | Lines | Content |
|------|-------|---------|
| `src/lib/grammarRules.ts` | 1631 | Bilingual grammar rules (`GrammarCategory[]`) |
| `src/lib/exerciseData.ts` | 1310 | Exercise types (`SentenceOrderingExercise`, `FindIncorrectWordsExercise`, `NewsComprehensionExercise`, ...) |
| `src/lib/curriculumData.ts` | 2638 | Learning path: modules, lessons, XP |
| `src/lib/dictionaryData.ts` | 1127 | Dictionary entries |

Line counts from `wc -l`; these modules are exempt from the 150-line target.

### Key Hooks (`src/hooks/`)
- `useLearningStreak()`: consecutive-day tracking
- `useCurriculumProgress()`: XP, levels, lesson completion
- `useBookmarkedRules()`: grammar rule favorites
- `useToast()` (`use-toast.ts`): feedback notifications

### Component Patterns
Exercise components live in `src/components/exercises/` (see `SentenceOrdering.tsx`). Use `Card`, lucide icons and `useToast` for feedback.

**shadcn/ui components** (`src/components/ui/`): vendored; use as-is with the `cn()` utility.

## Conventions

### Bilingual Content
Content carries Portuguese and English fields (`*_pt` / `*_en`), e.g. `title_pt`, `title_en`, `explanation_pt`.

### Styling
- Use `cn()` from `src/lib/utils.ts` for className merging
- Theme colors are CSS variables in `src/globals.css`
- Theme modes (`src/contexts/ThemeContext.tsx`): `light`, `dark`, `pobre-lingo`

### LocalStorage
Use the helpers, never raw `localStorage`:
```typescript
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
// Keys are prefixed "pobrelingo_" (e.g. streak and course progress)
```

### Adding Features

**New grammar rule**: add to `grammarCategories` in `src/lib/grammarRules.ts`; the rule pages render via the dynamic routes.

**New exercise type**:
1. Define the interface in `src/lib/exerciseData.ts`
2. Create the component in `src/components/exercises/`
3. Create the page in `src/pages/exercises/{name}/page.tsx`
4. Add the route to `src/pageRoutes.ts` and the nav entry to `src/components/layout/navigationData.ts`

## Don'ts
- `npm`/`yarn`: use `pnpm`
- Raw `localStorage` access: use `src/lib/localStorage.ts` helpers
- Backend API calls: this is a static SPA
- Changing the structure of `src/components/ui/`
- Inline styles: use Tailwind + `cn()`
