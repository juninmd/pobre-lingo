import { type ComponentType, lazy } from "react";
import { gameRoutes } from "./gameRoutes";

export type PageModule = { default: ComponentType };

/** Cada rota carrega a própria página sob demanda: um chunk por tela. */
const page = (load: () => Promise<PageModule>) => lazy(load);

export const pageRoutes = [
	{ index: true, Component: page(() => import("@/pages/DashboardPage")) },
	{ path: "learn", Component: page(() => import("@/pages/LearnPage")) },
	{ path: "me", Component: page(() => import("@/pages/MePage")) },
	{ path: "arcade", Component: page(() => import("@/pages/ArcadePage")) },
	...gameRoutes(page),
	{
		path: "dictionary",
		Component: page(() => import("@/pages/DictionaryPage")),
	},
	{
		path: "reading/:readerId",
		Component: page(() => import("@/pages/ReadingViewPage")),
	},
	{
		path: "vocabulary/:moduleId/:lessonId",
		Component: page(() => import("@/pages/vocabulary/VocabularyLessonPage")),
	},
	{
		path: "quiz/:moduleId/:lessonId",
		Component: page(() => import("@/pages/quiz/QuizLessonPage")),
	},
	{ path: "progress", Component: page(() => import("@/pages/ProgressPage")) },
	{
		path: "proficiency",
		Component: page(() => import("@/pages/ProficiencyTestPage")),
	},
	{
		path: "exercises/find-incorrect-words",
		Component: page(() => import("@/pages/exercises/FindIncorrectWordsPage")),
	},
	{
		path: "exercises/news-comprehension",
		Component: page(() => import("@/pages/exercises/NewsComprehensionPage")),
	},
	{
		path: "exercises/sentence-identification",
		Component: page(
			() => import("@/pages/exercises/SentenceIdentificationPage"),
		),
	},
	{
		path: "exercises/sentence-ordering",
		Component: page(() => import("@/pages/exercises/SentenceOrderingPage")),
	},
	{
		path: "exercises/matching-pairs",
		Component: page(() => import("@/pages/exercises/MatchingPairsPage")),
	},
	{
		path: "exercises/listening",
		Component: page(() => import("@/pages/exercises/ListeningPage")),
	},
	{
		path: "exercises/conversation",
		Component: page(() => import("@/pages/exercises/ConversationPage")),
	},
	{ path: "notebook", Component: page(() => import("@/pages/NotebookPage")) },
	{ path: "review", Component: page(() => import("@/pages/ReviewPage")) },
	{
		path: "achievements",
		Component: page(() => import("@/pages/AchievementsPage")),
	},
	{ path: "settings", Component: page(() => import("@/pages/SettingsPage")) },
	{ path: "rules", Component: page(() => import("@/pages/rules/RulesPage")) },
	{
		path: "rules/:categoryId",
		Component: page(() => import("@/pages/rules/RuleCategoryPage")),
	},
	{
		path: "rules/:categoryId/:ruleId",
		Component: page(() => import("@/pages/rules/RuleDetailPage")),
	},
	{ path: "reading", Component: page(() => import("@/pages/ReadingPage")) },
	{
		path: "vocabulary",
		Component: page(() => import("@/pages/VocabularyVaultPage")),
	},
	{ path: "fluency", Component: page(() => import("@/pages/FluencyPage")) },
	{ path: "writing", Component: page(() => import("@/pages/WritingPage")) },
	{
		path: "checkpoints",
		Component: page(() => import("@/pages/CheckpointsPage")),
	},
	{
		path: "pronunciation",
		Component: page(() => import("@/pages/PronunciationPage")),
	},
	{ path: "tracks", Component: page(() => import("@/pages/TracksPage")) },
	{ path: "tutor", Component: page(() => import("@/pages/TutorPage")) },
	{ path: "buddy", Component: page(() => import("@/pages/BuddyPage")) },
	{ path: "library", Component: page(() => import("@/pages/LibraryPage")) },
	{
		path: "library/:id",
		Component: page(() => import("@/pages/LibraryReaderPage")),
	},
	{
		path: "listening-lab",
		Component: page(() => import("@/pages/ListeningLabPage")),
	},
	{ path: "course", Component: page(() => import("@/pages/GuidedCoursePage")) },
	{
		path: "course/portfolio",
		Component: page(() => import("@/pages/CoursePortfolioPage")),
	},
	{
		path: "course/:lessonId",
		Component: page(() => import("@/pages/GuidedLessonPage")),
	},
	{ path: "*", Component: page(() => import("@/pages/NotFoundPage")) },
];
