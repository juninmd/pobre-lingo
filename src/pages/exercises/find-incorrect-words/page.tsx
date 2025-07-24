import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';

export default function FindIncorrectWordsPage() {
  // Exemplo: pega o primeiro exercício e define um onComplete vazio
  const { findIncorrectWordsExercises } = require('@/lib/exerciseData');
  const exercise = findIncorrectWordsExercises[0];
  const onComplete = () => {};
  return <FindIncorrectWords exercise={exercise} onComplete={onComplete} />;
}