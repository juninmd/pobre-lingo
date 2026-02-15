# GEMINI.md - Architectural Context & Decisions

## 1. Project Overview
**Pobrelingo** is a language learning application designed with a gamified, story-driven approach. The core metaphor is a "Journey Book" where users progress through chapters (Modules) and pages (Lessons).

## 2. Recent Architectural Changes (The "Journey Book" Refactor)

### A. Navigation & Layout
- **Unified Navigation:** The desktop sidebar now handles all navigation. The bottom navigation bar is hidden on desktop screens (`lg:hidden`) to remove redundancy.
- **Vertical Spine:** A continuous vertical line (`w-1 bg-border/30`) connects all units visually, reinforcing the chronological progression.
- **Glassmorphism:** Applied `backdrop-blur-md` and translucent backgrounds to create depth and a modern aesthetic.

### B. Component Structure
- **`LearningTimeline`:** The main container component replacing the old `LessonMap`. It manages the vertical layout and scroll position.
- **`TimelineUnit`:** Represents a "Chapter" or Module. It contains a list of lessons.
- **`TimelineLessonCard`:** Represents a single lesson. It handles the "Bookmark" logic (auto-scroll) and visual state (locked, active, completed).

### C. Technical Implementation
- **Scroll Management:** The `TimelineLessonCard` uses `scrollIntoView({ behavior: 'smooth', block: 'center' })` when the `isFirstActive` prop is true. This ensures the user lands exactly where they left off.
- **Responsive Design:** The layout automatically switches from a single-column vertical stack on mobile to a more spacious layout on desktop, while maintaining the vertical timeline metaphor.
- **Testing:** E2E tests in `tests/e2e/test_timeline_journey.py` cover rendering, navigation, and the bookmark feature.
- **Validation:** Confirmed functionality with E2E test suite `test_timeline_journey.py`.

## 3. Current Tech Stack
- **Frontend:** Vite + React + TypeScript + Tailwind CSS
- **Testing:** Playwright (E2E), Vitest (Unit)
- **Package Manager:** `pnpm` (Node), `uv` (Python)

## 4. Key Conventions
- **File Limits:** Files should strictly be under 150 lines. Large components must be broken down.
- **Styling:** Use Tailwind utility classes. Avoid inline styles.
- **State Management:** Use React hooks (`useState`, `useEffect`, `useMemo`) for local state. Global state is managed via Context (e.g., `GamificationContext`).
