# ROADMAP.md - Project Plan

## ✅ Completed Tasks
- [x] **Refactor Interface to "Journey Book" Metaphor**
    - [x] Replace `LessonMap` with `LearningTimeline`.
    - [x] Implement vertical spine layout.
    - [x] Unify navigation (Remove bottom bar on Desktop).
    - [x] Implement "Bookmark" auto-scroll feature.
    - [x] Apply glassmorphism and modern UI polish.
    - [x] Verify with E2E tests (`test_timeline_journey.py`).
- [x] **Code Quality & Refactoring**
    - [x] Refactor `Layout.tsx` into modular components (`Header`, `SidebarNav`).
    - [x] Refactor `useCurriculumProgress` hook to extract utilities and types.
    - [x] Ensure all files are under 150 lines.
    - [x] Fix mobile navigation access (enable Sidebar Trigger).

## 🚀 In Progress
- [ ] **Deploy & Release** (Pending user approval).

## 🔮 Future Tasks
- [ ] **Advanced Gamification:** Add animations for leveling up and earning "Pobrecoins".
- [ ] **Performance Tuning:** Implement code splitting for heavy game modules.
- [ ] **Accessibility Audit:** Ensure full keyboard navigation support for the timeline.
- [ ] **Dark Mode:** Refine color palette for better contrast in dark mode.
