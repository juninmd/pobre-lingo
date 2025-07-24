import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';
import { useState } from 'react';
import { sentenceOrderingExercises } from '@/lib/exerciseData';

export default function SentenceOrderingPage() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const exercise = sentenceOrderingExercises[currentExerciseIndex];

  const handleComplete = () => {
    console.log("Exercício de Ordenação de Frases completado!");
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < sentenceOrderingExercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    } else {
      alert("Parabéns! Você completou todos os exercícios de Ordenação de Frases.");
      setCurrentExerciseIndex(0);
    }
  };

  if (!exercise) {
    return <p>Carregando exercícios...</p>;
  }

  return (
    <SentenceOrdering
      exercise={exercise}
      onComplete={handleComplete}
      onNextExercise={handleNextExercise}
    />
  );
}
