import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import DictionaryPage from './pages/DictionaryPage';
import DashboardPage from './pages/DashboardPage';
import FindIncorrectWordsPage from './pages/exercises/find-incorrect-words/page';
import NewsComprehensionPage from './pages/exercises/news-comprehension/page';
import SentenceIdentificationPage from './pages/exercises/sentence-identification/page';
import SentenceOrderingPage from './pages/exercises/sentence-ordering/page';
import GlossaryPage from './pages/glossary/page';
import QuizGeneratorPage from './pages/quiz-generator/page';
import SentenceCheckerPage from './pages/sentence-checker/page';
import RulesPage from './pages/rules/page';
import CategoryPage from './pages/rules/[categoryId]/page';
import RulePage from './pages/rules/[categoryId]/[ruleId]/page';

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
        path: 'dictionary',
        element: <DictionaryPage />,
      },
      {
        path: 'progress',
        element: <DashboardPage />,
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
        path: 'glossary',
        element: <GlossaryPage />,
      },
      {
        path: 'quiz-generator',
        element: <QuizGeneratorPage />,
      },
      {
        path: 'sentence-checker',
        element: <SentenceCheckerPage />,
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
