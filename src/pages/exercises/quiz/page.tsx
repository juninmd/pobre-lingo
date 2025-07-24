import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Adicionar useEffect
import { CorrectSentenceIdentification } from '@/components/exercises/CorrectSentenceIdentification';
import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';
import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';
import { findIncorrectWordsExercises } from '@/lib/exerciseData'; // Importar a lista de exercícios
import { useToast } from '@/hooks/use-toast'; // Importar useToast

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
  const [quizExercises, setQuizExercises] = useState(exercises); // Usar um estado para os exercícios do quiz
  const { toast } = useToast(); // Inicializar useToast

  // Atualizar quizExercises se a prop exercises mudar (ex: ao carregar a página)
  useEffect(() => {
    setQuizExercises(exercises);
  }, [exercises]);

  if (!quizExercises || quizExercises.length === 0) {
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
    if (currentQuestionIndex < quizExercises.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleReplaceCurrentExercise = () => {
    const currentExerciseId = quizExercises[currentQuestionIndex].id;
    const availableExercises = findIncorrectWordsExercises.filter(
      (ex) => ex.id !== currentExerciseId
    );

    if (availableExercises.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableExercises.length);
      const newExercise = availableExercises[randomIndex];

      setQuizExercises((prevExercises: any[]) => {
        const updatedExercises = [...prevExercises];
        updatedExercises[currentQuestionIndex] = newExercise;
        return updatedExercises;
      });
    } else {
      // Caso não haja outros exercícios disponíveis (improvável com a lista atual)
      toast({
        title: "Sem exercícios alternativos",
        description: "Não há outros exercícios de 'encontrar palavras incorretas' disponíveis.",
        duration: 3000,
      });
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

  const currentExercise = quizExercises[currentQuestionIndex];
  const exerciseType = getExerciseType(currentExercise);

  const renderExercise = () => {
    switch (exerciseType) {
      case 'sentence-ordering':
        return <SentenceOrdering exercise={currentExercise} onComplete={handleNextQuestion} />;
      case 'sentence-identification':
        return <CorrectSentenceIdentification exercise={currentExercise} onComplete={handleNextQuestion} />;
      case 'find-incorrect-words':
        return <FindIncorrectWords exercise={currentExercise} onComplete={handleNextQuestion} onNextExercise={handleReplaceCurrentExercise} />;
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
