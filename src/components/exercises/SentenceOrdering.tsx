
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Shuffle, RefreshCw, Languages } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { sentenceOrderingExercises, SentenceOrderingExercise } from '@/lib/exerciseData';
import { getRuleById } from '@/lib/grammarRules';
import { useToast } from '@/hooks/use-toast';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useLessonFromUrl } from '@/contexts/ActiveLessonContext';
import { triggerConfetti } from '@/lib/confetti';

// Utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function SentenceOrdering() {
  const [searchParams] = useSearchParams();
  const fromRule = searchParams.get('fromRule');

  const [currentExercise, setCurrentExercise] = useState<SentenceOrderingExercise | null>(null);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [orderedSentence, setOrderedSentence] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const { toast } = useToast();
  const { moduleId, lessonId, isFromCurriculum } = useLessonFromUrl();

  const EXERCISES_TO_COMPLETE = 3; // Número de exercícios para marcar como dominada

  const loadNewExercise = useCallback(() => {
    let availableExercises = sentenceOrderingExercises;

    // Filter by rule if provided
    if (fromRule) {
      const rule = getRuleById(fromRule);
      if (rule) {
        // Filter exercises that match the rule topic (partially or fully)
        // We compare title_en (e.g. "Present Simple") with topic (e.g. "Present Simple")
        const filtered = sentenceOrderingExercises.filter(ex =>
          ex.topic.toLowerCase().includes(rule.title_en.toLowerCase()) ||
          rule.title_en.toLowerCase().includes(ex.topic.toLowerCase())
        );

        if (filtered.length > 0) {
          availableExercises = filtered;
        } else {
           // Fallback or notify? For now, we'll just use general pool but maybe log/toast
           console.warn("No specific exercises found for rule:", rule.title_en);
        }
      }
    }

    const randomIndex = Math.floor(Math.random() * availableExercises.length);
    const exercise = availableExercises[randomIndex];
    setCurrentExercise(exercise);
    setShuffledWords(shuffleArray(exercise.words));
    setOrderedSentence([]);
    setIsCorrect(null);
    setShowTranslation(false);
  }, [fromRule]);

  useEffect(() => {
    loadNewExercise();
  }, [loadNewExercise]);

  const handleWordClick = (word: string, index: number) => {
    setOrderedSentence(prev => [...prev, word]);
    setShuffledWords(prev => prev.filter((_, i) => i !== index));
    setIsCorrect(null);
    setShowTranslation(false);
  };

  const handleOrderedWordClick = (word: string, index: number) => {
    setShuffledWords(prev => [...prev, word]);
    setOrderedSentence(prev => prev.filter((_, i) => i !== index));
    setIsCorrect(null);
    setShowTranslation(false);
  };

  const handleCheckSentence = () => {
    if (!currentExercise) return;
    const userAnswer = orderedSentence.join(' ').trim();
    const correctAnswer = currentExercise.correctSentence.replace(/[.,!?]/g, '').trim();
    const normalizedUserAnswer = userAnswer.replace(/[.,!?]/g, '').trim();

    if (normalizedUserAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setIsCorrect(true);
      setShowTranslation(true);
      setExercisesCompleted(prev => {
        const newValue = prev + 1;
        if (newValue === EXERCISES_TO_COMPLETE) {
            triggerConfetti();
        }
        return newValue;
      });
      toast({ title: "Correto!", description: "Você acertou a ordem da frase!", className: "bg-green-500/20 border-green-500 text-green-700" });
    } else {
      setIsCorrect(false);
      setShowTranslation(false);
      toast({ title: "Incorreto!", description: "Tente novamente ou veja a resposta.", variant: "destructive" });
    }
  };

  const handleShowAnswer = () => {
    if (!currentExercise) return;
    setOrderedSentence(currentExercise.correctSentence.split(" "));
    setShuffledWords([]);
    setIsCorrect(true);
    setShowTranslation(true);
    toast({ title: "Resposta", description: `A resposta correta é: "${currentExercise.correctSentence}"` });
  };

  if (!currentExercise) {
    return <p>Carregando exercício...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Barra de progresso da lição (se vindo do currículo) */}
      {isFromCurriculum && moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={exercisesCompleted >= EXERCISES_TO_COMPLETE}
        />
      )}

      {/* Contador de progresso do exercício */}
      {isFromCurriculum && (
        <div className="text-center text-sm text-muted-foreground">
          Exercícios completados: {exercisesCompleted}/{EXERCISES_TO_COMPLETE}
          {exercisesCompleted >= EXERCISES_TO_COMPLETE && (
            <span className="ml-2 text-green-600 font-medium">✓ Você pode marcar como dominada!</span>
          )}
        </div>
      )}

      <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Shuffle className="mr-2 h-6 w-6" /> Ordene as Palavras
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Clique nas palavras na ordem correta para formar uma frase gramaticalmente correta.
            <br /> <Badge variant="secondary" className="mt-1">{currentExercise.topic} - {currentExercise.difficulty}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[60px] border border-dashed rounded-md p-4 mb-4 bg-background flex flex-wrap gap-2 items-center justify-center">
            {orderedSentence.length > 0 ? (
              orderedSentence.map((word, index) => (
                <Button
                  key={`${word}-${index}-ordered`}
                  variant="secondary"
                  className="text-base px-3 py-1 h-auto cursor-pointer bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => handleOrderedWordClick(word, index)}
                >
                  {word}
                </Button>
              ))
            ) : (
              <p className="text-muted-foreground">Clique nas palavras abaixo para montar a frase aqui.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-center mb-6">
            {shuffledWords.map((word, index) => (
              <Button
                key={`${word}-${index}-shuffled`}
                variant="outline"
                className="text-base px-3 py-1 h-auto cursor-pointer hover:bg-accent/20 hover:border-accent text-foreground"
                onClick={() => handleWordClick(word, index)}
              >
                {word}
              </Button>
            ))}
          </div>

          {isCorrect !== null && (
            <Alert className={`mt-4 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
              {isCorrect ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
              <AlertTitle className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                {isCorrect ? 'Correto!' : 'Incorreto!'}
              </AlertTitle>
              <AlertDescription className="text-sm text-foreground/80">
                {isCorrect
                  ? `A frase "${currentExercise.correctSentence}" está correta!`
                  : `Tente novamente. A resposta correta é: "${currentExercise.correctSentence}"`}
                {showTranslation && currentExercise.translation_pt && (
                  <div className="mt-2 pt-2 border-t border-green-500/30">
                    <p className="flex items-center font-semibold text-green-700">
                      <Languages className="mr-2 h-4 w-4" />
                      Tradução: <span className="italic ml-1 font-normal text-foreground/90">"{currentExercise.translation_pt}"</span>
                    </p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-2">
          <Button onClick={handleCheckSentence} disabled={orderedSentence.length === 0} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Verificar
          </Button>
          <Button onClick={handleShowAnswer} variant="outline">
            Mostrar Resposta
          </Button>
          </div>
          <Button onClick={loadNewExercise} variant="secondary">
            <RefreshCw className="mr-2 h-4 w-4" /> Próximo Exercício
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
