import { lazy } from "react";

const DictionaryPage = lazy(() => import("./pages/DictionaryPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const FindIncorrectWordsPage = lazy(
	() => import("./pages/exercises/find-incorrect-words/page"),
);
const NewsComprehensionPage = lazy(
	() => import("./pages/exercises/news-comprehension/page"),
);
const SentenceIdentificationPage = lazy(
	() => import("./pages/exercises/sentence-identification/page"),
);
const SentenceOrderingPage = lazy(
	() => import("./pages/exercises/sentence-ordering/page"),
);
const RulesPage = lazy(() => import("./pages/rules/page"));
const CategoryPage = lazy(() => import("./pages/rules/[categoryId]/page"));
const RulePage = lazy(() => import("./pages/rules/[categoryId]/[ruleId]/page"));
const VocabularyLessonPage = lazy(
	() => import("./pages/vocabulary/[moduleId]/[lessonId]/page"),
);
const QuizLessonPage = lazy(
	() => import("./pages/quiz/[moduleId]/[lessonId]/page"),
);
const MatchingPairsPage = lazy(
	() => import("./pages/exercises/matching-pairs/page"),
);
const ListeningPage = lazy(() => import("./pages/exercises/listening/page"));
const ProficiencyTestPage = lazy(() => import("./pages/ProficiencyTestPage"));
const ArcadePage = lazy(() => import("./pages/ArcadePage"));
const SpeedMatchPage = lazy(() => import("./pages/games/SpeedMatchPage"));
const WordScramblePage = lazy(() => import("./pages/games/WordScramblePage"));
const FlashcardsPage = lazy(() => import("./pages/games/FlashcardsPage"));
const WordSearchPage = lazy(() => import("./pages/games/WordSearchPage"));
const SentenceRushPage = lazy(() => import("./pages/games/SentenceRushPage"));
const MemoryMatchPage = lazy(() => import("./pages/games/MemoryMatchPage"));
const HangmanPage = lazy(() => import("./pages/games/HangmanPage"));
const BubblePopPage = lazy(() => import("./pages/games/BubblePopPage"));
const ConversationPage = lazy(
	() => import("./pages/exercises/conversation/page"),
);
const NotebookPage = lazy(() => import("./pages/NotebookPage"));
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ProgressPage = lazy(() => import("./pages/ProgressPage"));
const ReadingPage = lazy(() => import("./pages/ReadingPage"));
const ReadingViewPage = lazy(() => import("./pages/ReadingViewPage"));
const VocabularyVaultPage = lazy(() => import("./pages/VocabularyVaultPage"));
const FluencyPage = lazy(() => import("./pages/FluencyPage"));
const WritingPage = lazy(() => import("./pages/WritingPage"));
const CheckpointsPage = lazy(() => import("./pages/CheckpointsPage"));
const PronunciationPage = lazy(() => import("./pages/PronunciationPage"));
const TracksPage = lazy(() => import("./pages/TracksPage"));
const TutorPage = lazy(() => import("./pages/TutorPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const LibraryReaderPage = lazy(() => import("./pages/LibraryReaderPage"));
const ListeningLabPage = lazy(() => import("./pages/ListeningLabPage"));
const GuidedCoursePage = lazy(() => import("./pages/GuidedCoursePage"));
const GuidedLessonPage = lazy(() => import("./pages/GuidedLessonPage"));

const CoursePortfolioPage = lazy(() => import("./pages/CoursePortfolioPage"));

export const pageRoutes = [
	{ index: true, Component: DashboardPage },
	{ path: "arcade", Component: ArcadePage },
	{ path: "games/bubble-pop", Component: BubblePopPage },
	{ path: "games/speed-match", Component: SpeedMatchPage },
	{ path: "games/memory-match", Component: MemoryMatchPage },
	{ path: "games/word-scramble", Component: WordScramblePage },
	{ path: "games/flashcards", Component: FlashcardsPage },
	{ path: "games/word-search", Component: WordSearchPage },
	{ path: "games/sentence-rush", Component: SentenceRushPage },
	{ path: "games/hangman", Component: HangmanPage },
	{ path: "dictionary", Component: DictionaryPage },
	{ path: "reading/:readerId", Component: ReadingViewPage },
	{ path: "vocabulary/:moduleId/:lessonId", Component: VocabularyLessonPage },
	{ path: "quiz/:moduleId/:lessonId", Component: QuizLessonPage },
	{ path: "progress", Component: ProgressPage },
	{ path: "proficiency", Component: ProficiencyTestPage },
	{ path: "exercises/find-incorrect-words", Component: FindIncorrectWordsPage },
	{ path: "exercises/news-comprehension", Component: NewsComprehensionPage },
	{
		path: "exercises/sentence-identification",
		Component: SentenceIdentificationPage,
	},
	{ path: "exercises/sentence-ordering", Component: SentenceOrderingPage },
	{ path: "exercises/matching-pairs", Component: MatchingPairsPage },
	{ path: "exercises/listening", Component: ListeningPage },
	{ path: "exercises/conversation", Component: ConversationPage },
	{ path: "notebook", Component: NotebookPage },
	{ path: "review", Component: ReviewPage },
	{ path: "achievements", Component: AchievementsPage },
	{ path: "settings", Component: SettingsPage },
	{ path: "rules", Component: RulesPage },
	{ path: "rules/:categoryId", Component: CategoryPage },
	{ path: "rules/:categoryId/:ruleId", Component: RulePage },
	{ path: "*", Component: NotFoundPage },
	{ path: "reading", Component: ReadingPage },
	{ path: "vocabulary", Component: VocabularyVaultPage },
	{ path: "fluency", Component: FluencyPage },
	{ path: "writing", Component: WritingPage },
	{ path: "checkpoints", Component: CheckpointsPage },
	{ path: "pronunciation", Component: PronunciationPage },
	{ path: "tracks", Component: TracksPage },
	{ path: "tutor", Component: TutorPage },
	{ path: "library", Component: LibraryPage },
	{ path: "library/:id", Component: LibraryReaderPage },
	{ path: "listening-lab", Component: ListeningLabPage },
	{ path: "course", Component: GuidedCoursePage },
	{ path: "course/portfolio", Component: CoursePortfolioPage },
	{ path: "course/:lessonId", Component: GuidedLessonPage },
];
