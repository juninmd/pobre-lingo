import { useState } from 'react';
import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';
import { findIncorrectWordsExercises } from '@/lib/exerciseData';

export default function FindIncorrectWordsPage() {
  const getRandomExercise = () =>
    findIncorrectWordsExercises[Math.floor(Math.random() * findIncorrectWordsExercises.length)];

  const [exercise, setExercise] = useState(getRandomExercise());

  const onComplete = () => {};

  const handleNextExercise = () => {
    setExercise(getRandomExercise());
  };

  return (
    <div>
      <FindIncorrectWords exercise={exercise} onComplete={onComplete} onNextExercise={handleNextExercise} />
    </div>
  );
}
