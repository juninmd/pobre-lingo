import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import { newsComprehensionExercises } from '@/lib/exerciseData';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';

export default function NewsComprehensionPage() {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [searchParams] = useSearchParams();
  const { completeLesson, isLessonCompleted } = useCurriculumProgress();

  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const isFromCurriculum = moduleId !== null && lessonId !== null;

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // Se acertou mais de 60%, considera como exercício completo
    if (score / totalQuestions >= 0.6) {
      setQuizCompleted(true);
    }
  };

  if (selectedExercise) {
    return (
      <div className="space-y-6">
        {isFromCurriculum && moduleId && lessonId && (
          <LessonProgressBar
            moduleId={moduleId}
            lessonId={lessonId}
            showCompleteButton={quizCompleted}
          />
        )}
        <NewsComprehension
          exercise={selectedExercise}
          onBackToList={() => {
            setSelectedExercise(null);
            setQuizCompleted(false);
          }}
          onQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isFromCurriculum && moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={false}
        />
      )}
      <div>
        <h1 className="text-2xl font-bold mb-4">Interpretação de Artigos</h1>
        <p className="text-muted-foreground mb-6">Escolha um artigo para praticar leitura e interpretação de texto em inglês.</p>
        <div className="grid gap-4">
          {newsComprehensionExercises.map((exercise) => (
            <div key={exercise.id} className="p-4 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setSelectedExercise(exercise)}>
              <h2 className="text-lg font-semibold">{exercise.article.title}</h2>
              <p className="text-sm text-muted-foreground">{exercise.article.source} - {exercise.article.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}