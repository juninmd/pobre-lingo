import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';
import { sentenceOrderingExercises } from '@/lib/exerciseData';

export default function SentenceOrderingPage() {
  // Pega o primeiro exercício como exemplo
  const exercise = sentenceOrderingExercises[0];
  const onComplete = () => {};
  return <SentenceOrdering exercise={exercise} onComplete={onComplete} />;
}