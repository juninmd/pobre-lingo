import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import { useState } from 'react';
import { newsComprehensionExercises } from '@/lib/exerciseData';

export default function NewsComprehensionPage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const exercise = newsComprehensionExercises[currentExerciseIndex];

  const handleComplete = () => {
    // Lógica para quando o exercício é completado (pode ser incrementada no futuro)
    console.log("Exercício de Compreensão de Notícias completado!");
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < newsComprehensionExercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    } else {
      // Todos os exercícios foram concluídos
      alert("Parabéns! Você completou todos os exercícios de Compreensão de Notícias.");
      setCurrentExerciseIndex(0); // Reinicia para o primeiro exercício ou redireciona
    }
  };

  if (!exercise) {
    return <p>Carregando exercícios...</p>;
  }

  return (
    <NewsComprehension
      exercise={exercise}
      onComplete={handleComplete}
      onNextExercise={handleNextExercise}
    />
  );
}
