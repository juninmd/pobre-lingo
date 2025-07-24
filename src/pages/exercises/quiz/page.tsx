import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CorrectSentenceIdentification } from '@/components/exercises/CorrectSentenceIdentification';
import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';
import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';

// A simple function to determine the exercise type
const getExerciseType = (exercise: any) => {
  if (exercise.words) return 'sentence-ordering';
  if (exercise.choices) return 'sentence-identification';
  if (exercise.tokens) return 'find-incorrect-words';
  if (exercise.article) return 'news-comprehension';
  return 'unknown';
};

export default function QuizDisplayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { exercises } = location.state || { exercises: [] };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  if (!exercises || exercises.length === 0) {
    return (
      <PageContainer>
        <p>Nenhum exercício encontrado para este quiz.</p>
        <Button onClick={() => navigate('/exercises/quiz-generator')} className="mt-4">
          Voltar ao Gerador de Quiz
        </Button>
      </PageContainer>
    );
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exercises.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Parabéns!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Você completou o quiz.</p>
            <Button onClick={() => navigate('/exercises/quiz-generator')} className="mt-4">
              Criar um novo Quiz
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  const currentExercise = exercises[currentQuestionIndex];
  const exerciseType = getExerciseType(currentExercise);

  const renderExercise = () => {
    switch (exerciseType) {
      case 'sentence-ordering':
        return <SentenceOrdering exercise={currentExercise} onComplete={handleNextQuestion} />;
      case 'sentence-identification':
        return <CorrectSentenceIdentification exercise={currentExercise} onComplete={handleNextQuestion} />;
      case 'find-incorrect-words':
        return <FindIncorrectWords exercise={currentExercise} onComplete={handleNextQuestion} />;
      case 'news-comprehension':
        return <NewsComprehension exercise={currentExercise} onComplete={handleNextQuestion} />;
      default:
        return <p>Tipo de exercício desconhecido.</p>;
    }
  };

  return (
    <PageContainer>
      {renderExercise()}
    </PageContainer>
  );
}