# PobreLingo - AI Coding Agent Instructions

## Project Overview
PobreLingo is a Portuguese language learning web app built with React, TypeScript, Vite, and Tailwind CSS. It provides grammar rules, exercises, dictionary, and gamified learning streaks. The app is client-side only with Firebase hosting—no backend API.

## Tech Stack & Key Dependencies
- **Build**: Vite + TypeScript + React 18
- **Package Manager**: pnpm (required)
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI components)
- **Routing**: React Router v6 with file-based naming convention
- **State**: React Context (ThemeContext), custom hooks, localStorage
- **Icons**: Lucide React + custom SVG components
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Hosting**: Firebase App Hosting (see `apphosting.yaml`)

## Architecture Patterns

### Routing Convention
Pages follow a Next.js-like structure in `src/pages/`:
- `page.tsx` files are route components
- Folder names with brackets like `[categoryId]` represent dynamic segments
- Example: `src/pages/rules/[categoryId]/[ruleId]/page.tsx` → `/rules/:categoryId/:ruleId`
- Actual routes defined in `src/Router.tsx` using React Router

### Component Organization
```
src/components/
  ui/          - shadcn/ui components (button, card, etc.) - DON'T modify structure
  exercises/   - Interactive exercise components
  grammar/     - Grammar-specific features (BookmarkButton)
  streaks/     - Learning streak display and sharing
  common/      - Shared layout components (PageContainer, SectionTitle)
  icons/       - Custom SVG icons
```

### Data Management
- **Grammar Rules**: `src/lib/grammarRules.ts` - Structured data with Portuguese/English content
- **Exercises**: `src/lib/exerciseData.ts` - Four exercise types with TypeScript interfaces
- **Dictionary**: `src/lib/dictionaryData.ts`
- **LocalStorage**: Always use `getLocalStorageItem`/`setLocalStorageItem` from `src/lib/localStorage.ts` for SSR safety

### Styling System
- **Custom Theme**: Three modes: `light`, `dark`, `pobre-lingo` (custom theme with educational colors)
- **Color Variables**: Defined in `src/globals.css` using HSL CSS variables
- **Primary Colors**: Soft blue (#64B5F6), yellow accent (#FFD54F), light gray background (#F0F4F7)
- **Always use `cn()` utility**: From `src/lib/utils.ts` for className merging (combines clsx + tailwind-merge)
- **shadcn/ui Pattern**: Components use `React.forwardRef`, `displayName`, and `cn()` for className composition

### State & Hooks Patterns
- **Learning Streaks**: `useLearningStreak` hook tracks consecutive days via localStorage + date-fns
- **Bookmarks**: `useBookmarkedRules` hook manages rule favorites
- **Toast Notifications**: Use `useToast` from `src/hooks/use-toast.ts`
- **Theme**: `useTheme` from `src/contexts/ThemeContext.tsx`

## Development Workflow

### Commands
```bash
pnpm install      # Install dependencies (NEVER use npm/yarn)
pnpm dev          # Start dev server (Vite) - http://localhost:5173
pnpm build        # TypeScript check + Vite build → dist/
pnpm preview      # Preview production build locally
pnpm lint         # ESLint with React hooks rules
```

### Exercise Component Pattern
All exercises follow this structure (see `src/components/exercises/SentenceOrdering.tsx`):
1. Import exercise data from `src/lib/exerciseData.ts`
2. Use `useState` for current exercise, user answers, validation state
3. `loadNewExercise()` function to randomize and reset
4. Display using Card components with visual feedback (CheckCircle/XCircle icons)
5. Show Portuguese translations on toggle
6. Use `useToast` for feedback messages

### Adding New Features

#### New Grammar Rule
1. Add to `grammarCategories` in `src/lib/grammarRules.ts`
2. Follow `GrammarRule` interface: `id`, `title_pt`, `title_en`, `explanation_pt`, `examples[]`, `tags[]`
3. Use HTML in `explanation_pt` and `structure_format_pt` for rich formatting
4. Existing pages automatically display new rules via dynamic routing

#### New Exercise Type
1. Define TypeScript interface in `src/lib/exerciseData.ts`
2. Create component in `src/components/exercises/`
3. Create page in `src/pages/exercises/{exercise-name}/page.tsx`
4. Add route in `src/Router.tsx`
5. Add navigation link in `src/Layout.tsx` (`initialNavItems`)

#### New UI Component
- Use existing shadcn/ui components from `src/components/ui/`
- Follow Radix UI + Tailwind pattern with `React.forwardRef` and variant props
- Never break the structure of existing shadcn components

## Key Files to Check

- `src/Router.tsx` - All routes
- `src/Layout.tsx` - Sidebar navigation, theme switcher, learning streak display
- `src/lib/grammarRules.ts` - Grammar content structure (748 lines of Portuguese/English rules)
- `src/lib/exerciseData.ts` - Exercise definitions and types
- `tailwind.config.ts` - Custom fonts (PT Sans), color system extensions
- `src/globals.css` - CSS variables for theming

## Important Conventions

1. **Always use TypeScript**: Strict typing for all data structures
2. **Portuguese Content**: All user-facing text in Portuguese (`_pt`), English content for learning (`_en`)
3. **Bilingual Data**: Grammar rules and examples include both PT and EN
4. **Import Alias**: Use `@/` for `src/` imports (configured in Vite)
5. **Client-Side Only**: No server-side rendering, no API calls—all data is static imports
6. **LocalStorage Keys**: Prefix with `pobrelingo_` (e.g., `pobrelingo_streak_count`)
7. **Date Handling**: Use `date-fns` for date formatting and comparisons

## Common Pitfalls

- ❌ Don't use `npm` or `yarn` - only `pnpm`
- ❌ Don't modify shadcn/ui component structure in `src/components/ui/`
- ❌ Don't access `localStorage` directly - use helper functions from `src/lib/localStorage.ts`
- ❌ Don't forget bilingual content (`_pt` and `_en` fields) in grammar rules
- ❌ Don't use inline styles - use Tailwind classes and `cn()` utility
- ❌ Don't add backend calls - this is a static SPA hosted on Firebase
