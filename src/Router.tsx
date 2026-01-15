import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import DictionaryPage from './pages/DictionaryPage';
import DashboardPage from './pages/DashboardPage';
import FindIncorrectWordsPage from './pages/exercises/find-incorrect-words/page';
import NewsComprehensionPage from './pages/exercises/news-comprehension/page';
import SentenceIdentificationPage from './pages/exercises/sentence-identification/page';
import SentenceOrderingPage from './pages/exercises/sentence-ordering/page';
import GlossaryPage from './pages/glossary/page';
import RulesPage from './pages/rules/page';
import CategoryPage from './pages/rules/[categoryId]/page';
import RulePage from './pages/rules/[categoryId]/[ruleId]/page';
import CurriculumPage from './pages/curriculum/page';
import VocabularyLessonPage from './pages/vocabulary/[moduleId]/[lessonId]/page';
import QuizLessonPage from './pages/quiz/[moduleId]/[lessonId]/page';
import MatchingPairsPage from './pages/exercises/matching-pairs/page';
import ListeningPage from './pages/exercises/listening/page';
import ProficiencyTestPage from './pages/ProficiencyTestPage';
import ArcadePage from './pages/ArcadePage';
import SpeedMatchPage from './pages/games/SpeedMatchPage';
import WordScramblePage from './pages/games/WordScramblePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'arcade',
        element: <ArcadePage />,
      },
      {
        path: 'games/speed-match',
        element: <SpeedMatchPage />,
      },
      {
        path: 'games/word-scramble',
        element: <WordScramblePage />,
      },
      {
        path: 'dictionary',
        element: <DictionaryPage />,
      },
      {
        path: 'curriculum',
        element: <CurriculumPage />,
      },
      {
        path: 'vocabulary/:moduleId/:lessonId',
        element: <VocabularyLessonPage />,
      },
      {
        path: 'quiz/:moduleId/:lessonId',
        element: <QuizLessonPage />,
      },
      {
        path: 'progress',
        element: <DashboardPage />,
      },
      {
        path: 'proficiency',
        element: <ProficiencyTestPage />,
      },
      {
        path: 'exercises/find-incorrect-words',
        element: <FindIncorrectWordsPage />,
      },
      {
        path: 'exercises/news-comprehension',
        element: <NewsComprehensionPage />,
      },
      {
        path: 'exercises/sentence-identification',
        element: <SentenceIdentificationPage />,
      },
      {
        path: 'exercises/sentence-ordering',
        element: <SentenceOrderingPage />,
      },
      {
        path: 'exercises/matching-pairs',
        element: <MatchingPairsPage />,
      },
      {
        path: 'exercises/listening',
        element: <ListeningPage />,
      },
      {
        path: 'glossary',
        element: <GlossaryPage />,
      },
      {
        path: 'rules',
        element: <RulesPage />,
      },
      {
        path: 'rules/:categoryId',
        element: <CategoryPage />,
      },
      {
        path: 'rules/:categoryId/:ruleId',
        element: <RulePage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
