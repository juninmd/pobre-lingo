# 🧠 GEMINI.md - System Context & Architectural State

## Application State
- **Identity**: Pobrelingo (Gamified English Learning Platform)
- **Stack**: Vite + React + TypeScript + Tailwind CSS

## Architectural Decisions
1. **Interactive Journey Book (Learning Timeline)**
   - Replaced legacy `LessonMap` with `LearningTimeline`.
   - Organizes content linearly from top to bottom.
   - Includes "Onde parei" auto-scroll bookmark using `useEffect` and `scrollIntoView`.
   - Uses `LessonCard` with direct navigation (bypassing extra start popups) and explicit states (locked, active, completed).
2. **Navigation Structure**
   - Unificiation complete: `MobileNav` is hidden on desktop (`md:hidden`), and `Sidebar` is shown exclusively on desktop screens.
3. **Gamification Header**
   - Uses `lucide-react` icons (Coins, GraduationCap) and elegant UI (Glassmorphism, backdrop-blur) to highlight Pobrecoins and Levels natively within the `Layout` header.
4. **Methodologies**
   - Implements TPRS (Storytelling), CLIL (Content integrated texts), and Translanguaging elements, PBL (Project-Based Learning), and DDL (Data-Driven Learning).

## Testing & Automation
- 100% unit test coverage required.
- E2E tests powered by Playwright covering main flow, navigation layout adaptiveness, and the Learning Timeline.
## Recent Refactoring (File Size Limits)
- Refactored `Layout.tsx` by extracting `NavMenu` and `Header` to comply with the 150-line size limit rule.
- Refactored `DashboardPage.tsx` by extracting `DashboardStats`, `ImmersivePracticeSection`, and `RightColumnWidgets`.
- Refactored `LessonCard.tsx` by extracting `LessonCardContent`.
