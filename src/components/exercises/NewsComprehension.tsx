"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, Newspaper } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PageContainer } from '@/components/common/PageContainer';





interface ArticleQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface NewsComprehensionExercise {
  article: {
    title: string;
    content: string;
  };
  questions: ArticleQuestion[];
}

interface NewsComprehensionProps {
  exercise: NewsComprehensionExercise;
  onComplete: () => void;
}

export function NewsComprehension({ exercise, onComplete }: NewsComprehensionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentQuestion: ArticleQuestion | undefined = exercise.questions[currentQuestionIndex];

  useEffect(() => {
    if (exercise) {
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setScore(0);
    }
  }, [exercise]);

  useEffect(() => {
    if (currentQuestion) {
      const options = [...currentQuestion.options];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setShuffledOptions(options);
    }
  }, [currentQuestion]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;
    setShowFeedback(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      onComplete();
    }
  };

  if (!currentQuestion) {
    return (
      <PageContainer>
        <p>Carregando questão...</p>
      </PageContainer>
    );
  }

  const progressValue = ((currentQuestionIndex + 1) / exercise.questions.length) * 100;

  return (
    <PageContainer>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Newspaper className="mr-2" /> Compreensão de Notícias
          </CardTitle>
          <CardDescription>Leia o artigo e responda às perguntas.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progressValue} className="w-full mb-4" />

          <h3 className="text-xl font-semibold">{exercise.article.title}</h3>
          <ScrollArea className="h-[200px] md:h-[300px] p-4 border rounded-md bg-muted/20">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{exercise.article.content}</p>
          </ScrollArea>

          <div className="mt-6">
            <h4 className="text-lg font-medium mb-4">
              Questão {currentQuestionIndex + 1} de {exercise.questions.length}: {currentQuestion.question}
            </h4>
            <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer || ""} className="space-y-2">
              {shuffledOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} disabled={showFeedback} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {showFeedback && (
            <Alert className="mt-4">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle>
                {selectedAnswer === currentQuestion.correctAnswer ? "Correto!" : "Incorreto!"}
              </AlertTitle>
              <AlertDescription>
                {selectedAnswer === currentQuestion.correctAnswer
                  ? "Sua resposta está correta."
                  : `A resposta correta era: "${currentQuestion.correctAnswer}"`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          {!showFeedback ? (
            <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>
              Verificar Resposta
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < exercise.questions.length - 1 ? "Próxima Questão" : "Finalizar Exercício"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </PageContainer>
  );
}

