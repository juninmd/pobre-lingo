
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { Loader2 } from 'lucide-react';

// Lazy loading components
const DictionaryPage = React.lazy(() => import('./pages/DictionaryPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const FindIncorrectWordsPage = React.lazy(() => import('./pages/exercises/find-incorrect-words/page'));
const NewsComprehensionPage = React.lazy(() => import('./pages/exercises/news-comprehension/page'));
const SentenceIdentificationPage = React.lazy(() => import('./pages/exercises/sentence-identification/page'));
const SentenceOrderingPage = React.lazy(() => import('./pages/exercises/sentence-ordering/page'));
const RulesPage = React.lazy(() => import('./pages/rules/page'));
const CategoryPage = React.lazy(() => import('./pages/rules/[categoryId]/page'));
const RulePage = React.lazy(() => import('./pages/rules/[categoryId]/[ruleId]/page'));
const CurriculumPage = React.lazy(() => import('./pages/curriculum/page'));
const VocabularyLessonPage = React.lazy(() => import('./pages/vocabulary/[moduleId]/[lessonId]/page'));
const QuizLessonPage = React.lazy(() => import('./pages/quiz/[moduleId]/[lessonId]/page'));
const MatchingPairsPage = React.lazy(() => import('./pages/exercises/matching-pairs/page'));
const ListeningPage = React.lazy(() => import('./pages/exercises/listening/page'));
const ProficiencyTestPage = React.lazy(() => import('./pages/ProficiencyTestPage'));
const ArcadePage = React.lazy(() => import('./pages/ArcadePage'));
const SpeedMatchPage = React.lazy(() => import('./pages/games/SpeedMatchPage'));
const WordScramblePage = React.lazy(() => import('./pages/games/WordScramblePage'));
const FlashcardsPage = React.lazy(() => import('./pages/games/FlashcardsPage'));
const WordSearchPage = React.lazy(() => import('./pages/games/WordSearchPage'));
const SentenceRushPage = React.lazy(() => import('./pages/games/SentenceRushPage'));
const MemoryMatchPage = React.lazy(() => import('./pages/games/MemoryMatchPage'));
const HangmanPage = React.lazy(() => import('./pages/games/HangmanPage'));
const BubblePopPage = React.lazy(() => import('./pages/games/BubblePopPage'));
const ConversationPage = React.lazy(() => import('./pages/exercises/conversation/page'));
const NotebookPage = React.lazy(() => import('./pages/NotebookPage'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>,
      },
      {
        path: 'arcade',
        element: <Suspense fallback={<PageLoader />}><ArcadePage /></Suspense>,
      },
      {
        path: 'games/bubble-pop',
        element: <Suspense fallback={<PageLoader />}><BubblePopPage /></Suspense>,
      },
      {
        path: 'games/speed-match',
        element: <Suspense fallback={<PageLoader />}><SpeedMatchPage /></Suspense>,
      },
      {
        path: 'games/memory-match',
        element: <Suspense fallback={<PageLoader />}><MemoryMatchPage /></Suspense>,
      },
      {
        path: 'games/word-scramble',
        element: <Suspense fallback={<PageLoader />}><WordScramblePage /></Suspense>,
      },
      {
        path: 'games/flashcards',
        element: <Suspense fallback={<PageLoader />}><FlashcardsPage /></Suspense>,
      },
      {
        path: 'games/word-search',
        element: <Suspense fallback={<PageLoader />}><WordSearchPage /></Suspense>,
      },
      {
        path: 'games/sentence-rush',
        element: <Suspense fallback={<PageLoader />}><SentenceRushPage /></Suspense>,
      },
      {
        path: 'games/hangman',
        element: <Suspense fallback={<PageLoader />}><HangmanPage /></Suspense>,
      },
      {
        path: 'dictionary',
        element: <Suspense fallback={<PageLoader />}><DictionaryPage /></Suspense>,
      },
      {
        path: 'curriculum',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'vocabulary/:moduleId/:lessonId',
        element: <Suspense fallback={<PageLoader />}><VocabularyLessonPage /></Suspense>,
      },
      {
        path: 'quiz/:moduleId/:lessonId',
        element: <Suspense fallback={<PageLoader />}><QuizLessonPage /></Suspense>,
      },
      {
        path: 'progress',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'proficiency',
        element: <Suspense fallback={<PageLoader />}><ProficiencyTestPage /></Suspense>,
      },
      {
        path: 'exercises/find-incorrect-words',
        element: <Suspense fallback={<PageLoader />}><FindIncorrectWordsPage /></Suspense>,
      },
      {
        path: 'exercises/news-comprehension',
        element: <Suspense fallback={<PageLoader />}><NewsComprehensionPage /></Suspense>,
      },
      {
        path: 'exercises/sentence-identification',
        element: <Suspense fallback={<PageLoader />}><SentenceIdentificationPage /></Suspense>,
      },
      {
        path: 'exercises/sentence-ordering',
        element: <Suspense fallback={<PageLoader />}><SentenceOrderingPage /></Suspense>,
      },
      {
        path: 'exercises/matching-pairs',
        element: <Suspense fallback={<PageLoader />}><MatchingPairsPage /></Suspense>,
      },
      {
        path: 'exercises/listening',
        element: <Suspense fallback={<PageLoader />}><ListeningPage /></Suspense>,
      },
      {
        path: 'exercises/conversation',
        element: <Suspense fallback={<PageLoader />}><ConversationPage /></Suspense>,
      },
      {
        path: 'notebook',
        element: <Suspense fallback={<PageLoader />}><NotebookPage /></Suspense>,
      },
      {
        path: 'rules',
        element: <Suspense fallback={<PageLoader />}><RulesPage /></Suspense>,
      },
      {
        path: 'rules/:categoryId',
        element: <Suspense fallback={<PageLoader />}><CategoryPage /></Suspense>,
      },
      {
        path: 'rules/:categoryId/:ruleId',
        element: <Suspense fallback={<PageLoader />}><RulePage /></Suspense>,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
