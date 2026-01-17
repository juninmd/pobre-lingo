
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SearchX, RefreshCw, CheckCircle, XCircle, Lightbulb, Eye, EyeOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { findIncorrectWordsExercises, FindIncorrectWordsExercise, WordToken } from '@/lib/exerciseData';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useLessonFromUrl } from '@/contexts/ActiveLessonContext';

interface FeedbackDetail {
  status: 'correct_identification' | 'missed_error' | 'wrong_selection';
  explanation?: string;
  correctText?: string;
}

export function FindIncorrectWords() {
  const [currentExercise, setCurrentExercise] = useState<FindIncorrectWordsExercise | null>(null);
  const [selectedTokenIds, setSelectedTokenIds] = useState<string[]>([]);
  const [feedbackDetails, setFeedbackDetails] = useState<Record<string, FeedbackDetail>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const { toast } = useToast();
  const { moduleId, lessonId, isFromCurriculum } = useLessonFromUrl();

  const EXERCISES_TO_COMPLETE = 3; // Número de exercícios para marcar como dominada

  const loadNewExercise = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * findIncorrectWordsExercises.length);
    const exercise = findIncorrectWordsExercises[randomIndex];
    setCurrentExercise(exercise);
    setSelectedTokenIds([]);
    setShowFeedback(false);
    setFeedbackDetails({});
    setShowExplanations(false);
  }, []);

  useEffect(() => {
    loadNewExercise();
  }, [loadNewExercise]);

  const handleTokenClick = (tokenId: string) => {
    if (showFeedback) return; // Don't allow selection changes after checking

    setSelectedTokenIds(prev =>
      prev.includes(tokenId) ? prev.filter(id => id !== tokenId) : [...prev, tokenId]
    );
  };

  const handleSubmit = () => {
    if (!currentExercise) return;

    let correctIdentifications = 0;
    let missedErrors = 0;
    let wrongSelections = 0;
    const newFeedbackDetails: Record<string, FeedbackDetail> = {};

    currentExercise.tokens.forEach(token => {
      const isSelected = selectedTokenIds.includes(token.id);
      if (token.isError) {
        if (isSelected) {
          correctIdentifications++;
          newFeedbackDetails[token.id] = {
            status: 'correct_identification',
            explanation: token.explanation,
            correctText: token.correctText,
          };
        } else {
          missedErrors++;
          newFeedbackDetails[token.id] = {
            status: 'missed_error',
            explanation: token.explanation,
            correctText: token.correctText,
          };
        }
      } else {
        if (isSelected) {
          wrongSelections++;
          newFeedbackDetails[token.id] = { status: 'wrong_selection' };
        }
      }
    });

    setFeedbackDetails(newFeedbackDetails);
    setShowFeedback(true);
    setShowExplanations(false); // Reset explanation visibility on new check

    const totalErrors = currentExercise.tokens.filter(t => t.isError).length;

    // Se encontrou todos os erros sem seleções erradas, conta como exercício completo
    if (correctIdentifications === totalErrors && wrongSelections === 0) {
      setExercisesCompleted(prev => prev + 1);
    }

    toast({
      title: "Resultado da Verificação",
      description: `Você identificou ${correctIdentifications} de ${totalErrors} erros. ${wrongSelections > 0 ? `${wrongSelections} palavras corretas foram selecionadas indevidamente.` : ''}`,
      duration: 5000,
    });
  };

  const getButtonVariant = (token: WordToken): "secondary" | "outline" | "destructive" => {
    if (!showFeedback) {
      return selectedTokenIds.includes(token.id) ? 'secondary' : 'outline';
    }
    const feedback = feedbackDetails[token.id];
    if (feedback) {
      if (feedback.status === 'correct_identification') return 'secondary'; // Visually like success, different from default
      if (feedback.status === 'missed_error') return 'destructive';
      if (feedback.status === 'wrong_selection') return 'destructive';
    }
    return 'outline'; // Default for non-selected or correct non-selected words
  };

  const getButtonClassName = (token: WordToken): string => {
    let className = "h-auto py-1 px-2 m-0.5 text-base leading-relaxed whitespace-pre-wrap text-left";
    if (showFeedback) {
      const feedback = feedbackDetails[token.id];
      if (feedback?.status === 'correct_identification') className += " bg-green-500/20 border-green-500 text-green-700 hover:bg-green-500/30";
      else if (feedback?.status === 'missed_error') className += " bg-red-500/20 border-red-500 text-red-700 hover:bg-red-500/30";
      else if (feedback?.status === 'wrong_selection') className += " bg-yellow-500/20 border-yellow-500 text-yellow-700 hover:bg-yellow-500/30";
      else if (selectedTokenIds.includes(token.id) && !token.isError) className += " bg-yellow-500/20 border-yellow-500 text-yellow-700 hover:bg-yellow-500/30"; // Should be caught by wrong_selection but as fallback
    } else if (selectedTokenIds.includes(token.id)) {
      className += " bg-primary/20 border-primary text-primary-foreground";
    }
    return className;
  }


  if (!currentExercise) {
    return <p>Carregando exercício...</p>;
  }

  const totalErrorsInExercise = currentExercise.tokens.filter(t => t.isError).length;

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

    <Card className="w-full max-w-3xl mx-auto shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <SearchX className="mr-2 h-6 w-6" /> {currentExercise.title_pt}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {currentExercise.instructions_pt}
          <br /> <Badge variant="secondary" className="mt-1">{currentExercise.topic} - {currentExercise.difficulty}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 border rounded-md bg-background/50 mb-6">
          {currentExercise.tokens.map((token) => (
            <Button
              key={token.id}
              variant={getButtonVariant(token)}
              className={getButtonClassName(token)}
              onClick={() => handleTokenClick(token.id)}
              disabled={showFeedback && feedbackDetails[token.id]?.status !== 'missed_error' && feedbackDetails[token.id]?.status !== 'wrong_selection'}
            >
              {token.text}
            </Button>
          ))}
        </div>

        {showFeedback && (
          <>
            <Separator className="my-4" />
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-primary">Detalhes do Feedback</h3>
              <Button onClick={() => setShowExplanations(!showExplanations)} variant="outline" size="sm">
                {showExplanations ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                {showExplanations ? "Ocultar" : "Mostrar"} Explicações
              </Button>
            </div>
            <div className="space-y-3">
              {currentExercise.tokens.map(token => {
                const feedback = feedbackDetails[token.id];
                if (!feedback) return null;

                let alertVariant: "default" | "destructive" = "default";
                let alertTitle = "";
                const descriptionElements: React.ReactElement[] = [];

                if (feedback.status === 'correct_identification') {
                  alertVariant = "default";
                  alertTitle = "Correto!";
                  descriptionElements.push(<p key="orig">Palavra original: <span className="font-semibold">{token.text}</span></p>);
                  descriptionElements.push(<p key="corr">Correção: <span className="font-semibold text-green-600">{feedback.correctText}</span></p>);
                  if (showExplanations && feedback.explanation) {
                     descriptionElements.push(<p key="exp" className="mt-1 italic">Explicação: {feedback.explanation}</p>);
                  }
                } else if (feedback.status === 'missed_error') {
                  alertVariant = "destructive";
                  alertTitle = "Erro não encontrado";
                   descriptionElements.push(<p key="orig">Palavra original (incorreta): <span className="font-semibold">{token.text}</span></p>);
                  descriptionElements.push(<p key="corr">Deveria ser: <span className="font-semibold text-green-600">{feedback.correctText}</span></p>);
                   if (showExplanations && feedback.explanation) {
                     descriptionElements.push(<p key="exp" className="mt-1 italic">Explicação: {feedback.explanation}</p>);
                  }
                } else if (feedback.status === 'wrong_selection') {
                  alertVariant = "destructive";
                  alertTitle = "Seleção Incorreta";
                  descriptionElements.push(<p key="sel">Você selecionou "<span className="font-semibold">{token.text}</span>", que estava correta.</p>);
                } else {
                    return null; // Should not happen if feedbackDetails is populated correctly
                }

                // Only render Alert if there's an explanation to show or if it's a wrong selection/missed error
                if ( (showExplanations && feedback.explanation) || feedback.status === 'wrong_selection' || feedback.status === 'missed_error' || (feedback.status === 'correct_identification' && showExplanations) ) {
                    return (
                        <Alert key={token.id} variant={feedback.status === 'wrong_selection' || feedback.status === 'missed_error' ? 'destructive' : 'default'}
                               className={feedback.status === 'correct_identification' ? 'bg-green-500/10 border-green-500/30' : feedback.status === 'missed_error' || feedback.status === 'wrong_selection' ? 'bg-yellow-500/10 border-yellow-500/30' : ''}>
                          <div className="flex items-center">
                            {feedback.status === 'correct_identification' && <CheckCircle className="h-5 w-5 mr-2 text-green-600" />}
                            {(feedback.status === 'missed_error' || feedback.status === 'wrong_selection') && <XCircle className="h-5 w-5 mr-2 text-yellow-600" />}
                            <AlertTitle className={feedback.status === 'correct_identification' ? 'text-green-700' : 'text-yellow-700'}>{alertTitle}</AlertTitle>
                          </div>
                          <AlertDescription className="text-foreground/90 mt-1 pl-7">
                            {descriptionElements}
                          </AlertDescription>
                        </Alert>
                      );
                }
                return null;

              })}
              {totalErrorsInExercise === 0 && Object.keys(feedbackDetails).every(k => feedbackDetails[k].status !== 'missed_error' && feedbackDetails[k].status !== 'wrong_selection') && (
                <Alert className="bg-green-500/10 border-green-500/30">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-700">Parabéns!</AlertTitle>
                    <AlertDescription>Não havia erros neste texto, ou você não selecionou nenhuma palavra incorretamente!</AlertDescription>
                </Alert>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button onClick={handleSubmit} disabled={showFeedback || selectedTokenIds.length === 0} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Verificar Respostas
        </Button>
        <Button onClick={loadNewExercise} variant="secondary">
          <RefreshCw className="mr-2 h-4 w-4" /> Próximo Exercício
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}

