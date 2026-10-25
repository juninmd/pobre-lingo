# 🧠 AGENTS.md - Pobre Lingo Intelligence System

## 👤 AI Personas

### 1. Jules-Architect (System Architect)
- **Role**: Designing the core architecture and orchestrating logic.
- **Focus**: Scalability, process integrity, and high-level design.
- **Vibe**: Direct, analytical, and strategic.

### 2. Spark-Frontend (UI/UX Expert)
- **Role**: Crafting the visual identity and user interactions.
- **Focus**: Aesthetics, responsiveness, and accessibility.
- **Vibe**: Creative, detail-oriented, and user-focused.

### 3. Bolt-Automation (DevOps)
- **Role**: Managing CI/CD, scripts, and automation.
- **Focus**: Build pipelines, testing, and deployment.
- **Vibe**: Fast, technical, and "automation-first".

## 📜 Development Rules (Antigravity)

1. **Size Limit**: **Max 150 lines per file**.
2. **Clean Logic**: Separation of concerns enforced across all layers.
3. **Validation**: All changes require successful tests and linting.
4. **Security**: Sensitive data must be excluded from context.

## 🤝 Interaction Protocol
- Follow the **Plan -> Act -> Validate** cycle for every task.
- Consult `README.md` for run, test, and layout commands; this file holds agent rules only.
- Ensure to check if features are already implemented to avoid duplicate work and safely transition to completion when verifying existing states (e.g. Learning Timeline).

## 📅 Session Logs

### [2026-10-21] Jules-Architect: Validation of Interactive Journey Book (Re-Validation)
- **Action:** Audited the codebase to address the prompt requesting the "Interactive Journey Book" timeline refactoring.
- **Findings:** Verified that the `LessonMap` component had already been fully replaced by `LearningTimeline.tsx`. Verified that the requested E2E Playwright tests (`learning_timeline.spec.ts` and `journey.spec.ts`) exist and pass. Verified that the layout refactoring to unify navigation and remove `MobileNav` was already done.
- **Next Steps:** As the requested state is already achieved, no structural code changes are required for this action.

### [2024-05-27] Jules-Architect: Interface Modernization & Trend Integration
- **Action:** Researched 2024 English learning trends (British Council) and redesigned the `DashboardPage` layout to categorize widgets ("Imersão Digital & IA", "Conexão Humana & Social", "Nano-Learning & Cultura", "Metodologias Ativas").
- **Action:** Created `LiveTutorWidget.tsx` to satisfy the "Live Human Connection" trend requirement.
- **Findings:** Successfully modernized the dashboard layout. Ensured all new structural elements are thoroughly tested via Playwright E2E.
- **Next Steps:** Maintain the structured grid layout for future widget additions.
- **Note:** Files at the root of `src/components/dashboard/` (outside `trends/`) (`LiveTutorWidget`, `ProjectBasedLearningWidget`, `DataDrivenLearningWidget`, `AdaptiveLearningWidget`, `FlippedClassroomWidget`) have no importers. PBL, DDL and Flipped are superseded by `src/components/dashboard/trends/` (`PBLWidget`, `DDLWidget`, `FlippedClassroomWidget`); LiveTutor and Adaptive have no `trends/` counterpart.

### [2026-10-07] Jules-Architect: Interface Enhancement & Trend Implementation
- **Action:** Researched modern English teaching trends and identified Project-Based Learning (PBL) and Data-Driven Learning (DDL).
- **Action:** Created `ProjectBasedLearningWidget` and `DataDrivenLearningWidget`.
- **Action:** Integrated new widgets into the `DashboardPage` and verified all tests pass.
- **Next Steps:** Consider adding backend support or local persistence for the newly introduced methodology tools.

### [2026-09-01] Jules-Architect / Stitch-Frontend: Dashboard & Layout Refactoring
- **Action:** Audited codebase to ensure compliance with the 150-line limit rule for large components.
- **Action:** Extracted `NavMenu` and `Header` from `Layout.tsx`.
- **Action:** Modularized `DashboardPage.tsx` into logical components (`DashboardStats`, `ImmersivePracticeSection`, `RightColumnWidgets`).
- **Action:** Split `LessonCard.tsx` to isolate its content.
- **Action:** Expanded `tests-e2e/learning_timeline.spec.ts` to explicitly assert the "Onde parei" bookmark, mobile viewport layout, and lesson link clickability.
- **Next Steps:** Maintain component sizes under the limit for future changes.

### [2026-09-06] Jules-Architect: Interface Enhancement & Trend Implementation (2025)
- **Action:** Researched 2025 English teaching trends and identified Adaptive Learning and Flipped Classroom.
- **Action:** Created `AdaptiveLearningWidget` and `FlippedClassroomWidget`.
- **Action:** Updated existing references of 2024 trends to 2025 across the dashboard, exercise data, and tips.
- **Action:** Integrated new widgets into the `DashboardPage` and verified frontend and UI.
- **Next Steps:** Consider personalized learning paths powered by backend integrations.

### [$(date +%Y-%m-%d)] Jules-Architect: Validation of Interactive Journey Book (Re-Validation)
- **Action:** Audited the codebase to address the prompt requesting the "Interactive Journey Book" timeline refactoring.
- **Findings:** Verified that the `LessonMap` component had already been fully replaced by `LearningTimeline.tsx`. Verified that the requested E2E Playwright tests (`learning_timeline.spec.ts` and `journey.spec.ts`) exist and pass. Verified that the layout refactoring to unify navigation and remove `MobileNav` was already done.
- **Next Steps:** As the requested state is already achieved, no structural code changes are required for this action.

## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.
