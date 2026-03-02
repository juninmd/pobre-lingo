# GEMINI.md - Architectural Context & Decisions

## 1. Project Overview
**Pobrelingo** is a language learning application designed with a gamified, story-driven approach. The core metaphor is a "Journey Book" where users progress through chapters (Modules) and pages (Lessons).

## 2. Recent Architectural Changes (The "Journey Book" Refactor & Optimization)

### A. Navigation & Layout
- **Unified Navigation:** The desktop sidebar now handles all navigation. The bottom navigation bar is hidden on desktop screens (`lg:hidden`).
- **Mobile Access:** The `Sidebar` is accessible on mobile via a hamburger menu in the header (opening as a Sheet overlay), supplementing the bottom `MobileNav`. This ensures full access to all navigation items (like "Dictionary").
- **Modular Layout:** `Layout.tsx` was refactored to extract `Header.tsx` and `SidebarNav.tsx` components, adhering to the 150-line limit.

### B. Component Structure
- **`LearningTimeline`:** The main container component managing the vertical layout. Updated to accept an optional `units` prop (`UnitWithModules[]`) for explicit data injection, defaulting to internal `curriculumData`.
- **`TimelineUnit`:** Represents a "Chapter" or Module. It contains a list of modules/lessons.
- **`TimelineLessonCard`:** Represents a single lesson. It handles the "Bookmark" logic (auto-scroll) and visual state (locked, active, completed).
- **`Header`:** Updated with minimalist Lucide icons (`strokeWidth={1.5}`) and `font-headline` typography for gamification stats (Level, Coins).

### C. Technical Implementation
- **Scroll Management:** The `TimelineLessonCard` uses `scrollIntoView({ behavior: 'smooth', block: 'center' })` when the `isFirstActive` prop is true.
- **State Management Optimization:** `useCurriculumProgress` hook was refactored to reduce complexity. Core logic was moved to `src/lib/progressUtils.ts` and types to `src/lib/progressTypes.ts`.
- **Responsive Design:** Confirmed correct behavior on Desktop (Sidebar visible) and Mobile (Bottom Nav + Hamburger Menu).
- **Testing & CI:** E2E tests in `tests/e2e/test_timeline_journey.py` cover rendering, navigation, responsiveness, bookmark feature, and data injection. GitHub Actions Pipeline ensures quality (`Lint` -> `Test` -> `Build` -> `Semantic-Release`).

## 3. Current Tech Stack
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Testing:** Playwright (E2E), Vitest (Unit)
- **CI/CD Pipeline:** GitHub Actions (`pnpm` setup, Lint, Test, Build, `semantic-release`)
- **Package Manager:** `pnpm` (Node), `uv` (Python)

## 4. Key Conventions
- **File Limits:** Files should strictly be under 150 lines. Large components must be broken down.
- **Styling:** Use Tailwind utility classes. Avoid inline styles.
- **State Management:** Use React hooks (`useState`, `useEffect`, `useMemo`) for local state. Global state is managed via Context (e.g., `GamificationContext`).
