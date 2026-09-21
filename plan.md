1. **Create Dashboard Trend Widgets:** Based on the system memory instructions, the application incorporates several 2025 ELT trends as widgets under specific dashboard tabs. I need to create the following widgets:
    - `AIPromptCraftingWidget.tsx` (AI Literacy/Prompt Engineering)
    - `HyFlexLearningWidget.tsx` (Hybrid Flexible learning)
    - `GreenELTWidget.tsx` (Sustainability)
    - `DEIBWidget.tsx` (Diversity, Equity, Inclusion, and Belonging)
    - `AuthenticMaterialsWidget.tsx` (Authentic Materials)
    - `DogmeELTWidget.tsx` (Dogme ELT)
    - `TranslanguagingWidget.tsx` (Translanguaging)
    - `GlobalEnglishesWidget.tsx` (Global Englishes/ELF)
    - `LexicalApproachWidget.tsx` (Lexical Approach/Chunks)
    - `ExperientialLearningWidget.tsx` (Experiential Learning)
    - `InquiryBasedLearningWidget.tsx` (Inquiry-Based Learning)
    - `CLILWidget.tsx` (Content and Language Integrated Learning)
    - `MindfulWidget.tsx` (Mindfulness and Social-emotional Teaching)
    - `CriticalPedagogyWidget.tsx` (Critical Pedagogy)

2. **Create Reusable `TrendWidget` Wrapper:** To adhere to the 150-line file limit, I'll create a `TrendWidget.tsx` component that wraps the content of each specific trend widget and handles notifications/gamification micro-interactions.

3. **Create `ImmersivePracticeSection.tsx`:** Extract the main column of the dashboard into this new component. Organize educational widgets using Shadcn Tabs ('Digital & IA', 'Social', 'Cultura', 'Metodologias') to prevent vertical stacking, as described in memory.

4. **Update `DashboardPage.tsx`:** Import and use the new `ImmersivePracticeSection.tsx` in place of the current `PracticeHub` or incorporate it alongside it.

5. **Pre-commit checks & Submission:** Ensure tests pass and the codebase is clean.
