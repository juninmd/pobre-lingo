import { CorrectSentenceIdentification } from '@/components/exercises/CorrectSentenceIdentification';
import { correctSentenceIdentificationExercises } from '@/lib/exerciseData';

export default function SentenceIdentificationPage() {
  // Exemplo de uso: pega o primeiro exercício e define um onComplete vazio
  const exercise = correctSentenceIdentificationExercises[0];
  const onComplete = () => {};
  return <CorrectSentenceIdentification exercise={exercise} onComplete={onComplete} />;
}