# PobreLingo - AI Coding Agent Instructions

## Project Overview
Portuguese language learning SPA: grammar rules, interactive exercises, dictionary, gamified streaks. **Client-side only** with Firebase hosting—no backend API.

## Tech Stack
- **Build**: Vite + TypeScript + React 18 | **Package Manager**: pnpm only (never npm/yarn)
- **Styling**: Tailwind CSS + shadcn/ui (Radix) | **Routing**: React Router v6
- **State**: React Context, custom hooks, localStorage | **Icons**: Lucide React

## Commands
```bash
pnpm install && pnpm dev    # Dev server at localhost:5173
pnpm build                  # TypeScript check + production build → dist/
pnpm lint                   # ESLint
```

## Architecture

### Routing (`src/Router.tsx`)
Pages in `src/pages/` follow Next.js-like naming with React Router underneath:
- `[categoryId]` folders → `:categoryId` params (e.g., `rules/[categoryId]/page.tsx` → `/rules/:categoryId`)
- All routes defined explicitly in `src/Router.tsx`

### Data Layer (static imports, no API)
| File | Content |
|------|---------|
| `src/lib/grammarRules.ts` | 748 lines of bilingual grammar rules with `GrammarCategory[]` |
| `src/lib/exerciseData.ts` | Four exercise types: `SentenceOrdering`, `CorrectSentenceIdentification`, `FindIncorrectWords`, `NewsComprehension` |
| `src/lib/curriculumData.ts` | Progressive learning path with modules, lessons, XP rewards |
| `src/lib/dictionaryData.ts` | Dictionary entries |

### Key Hooks
- `useLearningStreak()` - Consecutive day tracking via localStorage + date-fns
- `useCurriculumProgress()` - XP, levels, lesson completion state
- `useBookmarkedRules()` - Grammar rule favorites
- `useToast()` - Feedback notifications

### Component Patterns

**Exercise Component Template** (see [SentenceOrdering.tsx](src/components/exercises/SentenceOrdering.tsx)):
```tsx
const [currentExercise, setCurrentExercise] = useState<ExerciseType | null>(null);
const loadNewExercise = () => { /* randomize from exerciseData */ };
// Use Card, CheckCircle/XCircle icons, useToast for feedback
```

**shadcn/ui Components** (`src/components/ui/`): Don't modify structure—use as-is with `cn()` utility.

## Conventions

### Bilingual Content
All content requires Portuguese + English fields:
```typescript
{ title_pt: 'Present Simple', title_en: 'Present Simple', explanation_pt: '...', examples: [{ sentence_en: '...', translation_pt: '...' }] }
```

### Styling
- Use `cn()` from `src/lib/utils.ts` for className merging
- Theme colors in `src/globals.css` (HSL variables)
- Three theme modes: `light`, `dark`, `pobre-lingo`

### LocalStorage
Always use helpers for SSR safety:
```typescript
import { getLocalStorageItem, setLocalStorageItem } from '@/lib/localStorage';
// Keys prefixed: 'pobrelingo_streak_count', 'pobrelingo_curriculum_progress'
```

### Adding Features

**New Grammar Rule**: Add to `grammarCategories` in `grammarRules.ts`—pages auto-display via dynamic routing.

**New Exercise Type**:
1. Define interface in `exerciseData.ts`
2. Create component in `src/components/exercises/`
3. Create page in `src/pages/exercises/{name}/page.tsx`
4. Add route in `Router.tsx` + nav link in `Layout.tsx` (`navGroups`)

## Don'ts
- ❌ `npm`/`yarn` → use `pnpm`
- ❌ Direct `localStorage` access → use `src/lib/localStorage.ts` helpers
- ❌ Backend API calls → this is a static SPA
- ❌ Modify `src/components/ui/` structure
- ❌ Inline styles → use Tailwind + `cn()`
