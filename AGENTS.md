# AGENTS.md - Operational Logs & Instructions

## 🧠 Active Persona: Jules-DevOps Prime

### 📅 Session Log
- **Task:** Refactor Interface to "Journey Book" Metaphor.
- **Agent:** Stitch (UI/UX) & Spark (Logic).
- **Status:** Completed.
- **Key Actions:**
    - Replaced `LessonMap` with `LearningTimeline`.
    - Implemented Vertical Spine & Glassmorphism.
    - Unified Navigation (Sidebar only on Desktop).
    - Added E2E tests (`test_timeline_journey.py`).
    - Verified visuals via `verify_timeline.py`.

### ⚠️ Critical Instructions for Future Agents
1.  **Strict File Limits:** Keep files under 150 lines. Refactor immediately if violated.
2.  **Navigation:** Do NOT re-introduce the bottom bar on Desktop. It is hidden via `lg:hidden`.
3.  **Testing:**
    - Unit tests: `pnpm run test` (Vitest).
    - E2E tests: `pytest tests/e2e/` (Playwright).
4.  **Styling:** Maintain the "Journey Book" aesthetic (Glassmorphism, Vertical Rhythm).
