import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import { newsComprehensionExercises } from '@/lib/exerciseData';
import { useState } from 'react';

export default function NewsComprehensionPage() {
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  if (selectedExercise) {
    return <NewsComprehension exercise={selectedExercise} onBackToList={() => setSelectedExercise(null)} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Interpretação de Artigos</h1>
      <div className="grid gap-4">
        {newsComprehensionExercises.map((exercise) => (
          <div key={exercise.id} className="p-4 border rounded-md cursor-pointer hover:bg-muted/50" onClick={() => setSelectedExercise(exercise)}>
            <h2 className="text-lg font-semibold">{exercise.article.title}</h2>
            <p className="text-sm text-muted-foreground">{exercise.article.source} - {exercise.article.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}