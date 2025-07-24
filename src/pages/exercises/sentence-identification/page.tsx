import { CorrectSentenceIdentification } from '@/components/exercises/CorrectSentenceIdentification';
import { useState } from 'react';
import { correctSentenceIdentificationExercises } from '@/lib/exerciseData';

export default function SentenceIdentificationPage() {
  // Exemplo de uso: pega o primeiro exercício e define um onComplete vazio
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const exercise = correctSentenceIdentificationExercises[currentExerciseIndex];

  const handleComplete = () => {
    // Lógica para quando o exercício é completado (pode ser incrementada no futuro)
    console.log("Exercício completado!");
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < correctSentenceIdentificationExercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    } else {
      // Todos os exercícios foram concluídos
      alert("Parabéns! Você completou todos os exercícios de Identificação de Frases Corretas.");
      setCurrentExerciseIndex(0); // Reinicia para o primeiro exercício ou redireciona
    }
  };

  if (!exercise) {
    return <p>Carregando exercícios...</p>;
  }

  return (
    <CorrectSentenceIdentification
      exercise={exercise}
      onComplete={handleComplete}
      onNextExercise={handleNextExercise}
    />
  );
}
