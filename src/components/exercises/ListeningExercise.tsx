import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, RefreshCw, Volume2, Mic } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { useLessonFromUrl } from '@/contexts/ActiveLessonContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { listeningExercises, ListeningPhrase } from '@/lib/exerciseData';

export function ListeningExercise() {
  const [currentPhrase, setCurrentPhrase] = useState<ListeningPhrase | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const { toast } = useToast();
  const { moduleId, lessonId, isFromCurriculum } = useLessonFromUrl();

  const EXERCISES_TO_COMPLETE = 3;

  const loadNewPhrase = () => {
    // Ideally, filter by difficulty based on unit, but for now random from all is fine
    const randomIndex = Math.floor(Math.random() * listeningExercises.length);
    setCurrentPhrase(listeningExercises[randomIndex]);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    loadNewPhrase();
  }, []);

  const speakPhrase = () => {
    if (!currentPhrase) return;
    const utterance = new SpeechSynthesisUtterance(currentPhrase.text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    if (!currentPhrase || !selectedOption) return;

    if (selectedOption === currentPhrase.text) {
      setIsCorrect(true);
      setExercisesCompleted(prev => prev + 1);
      toast({
        title: "Correto!",
        description: "Você ouviu perfeitamente!",
        className: "bg-green-500/20 border-green-500 text-green-700"
      });
    } else {
      setIsCorrect(false);
      toast({
        title: "Incorreto",
        description: "Tente ouvir novamente.",
        variant: "destructive"
      });
    }
  };

  if (!currentPhrase) return <div className="p-8 text-center">Carregando exercício...</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {isFromCurriculum && moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={exercisesCompleted >= EXERCISES_TO_COMPLETE}
        />
      )}

      {isFromCurriculum && (
        <div className="text-center text-sm text-muted-foreground">
          Exercícios completados: {exercisesCompleted}/{EXERCISES_TO_COMPLETE}
        </div>
      )}

      <Card className="shadow-lg border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-6 w-6 text-primary" />
            Exercício de Escuta
          </CardTitle>
          <CardDescription>
            Ouça a frase e escolha a opção correta.
            <Badge variant="outline" className="ml-2 capitalize">{currentPhrase.difficulty}</Badge>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center py-8">
            <Button
              size="lg"
              className="h-32 w-32 rounded-full shadow-xl bg-gradient-to-br from-primary to-primary/80 hover:scale-105 transition-transform"
              onClick={speakPhrase}
            >
              <Volume2 className="h-16 w-16" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mb-4">
            Clique no botão acima para ouvir
          </p>

          <div className="grid gap-3">
            {currentPhrase.options.sort().map((option, idx) => (
              <Button
                key={idx}
                variant={selectedOption === option ? "default" : "outline"}
                className={cn(
                  "h-auto py-4 text-lg justify-start text-left whitespace-normal",
                  selectedOption === option ? "border-primary ring-2 ring-primary/20" : ""
                )}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          {isCorrect !== null && (
            <Alert className={cn(
              "mt-4",
              isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            )}>
              {isCorrect ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertTitle>{isCorrect ? "Correto!" : "Incorreto"}</AlertTitle>
              <AlertDescription>
                {isCorrect ? (
                  <span>
                    Muito bem! A tradução é: <span className="italic">"{currentPhrase.translation}"</span>
                  </span>
                ) : (
                  "Tente ouvir novamente."
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
           <Button variant="ghost" onClick={speakPhrase} size="sm">
             <Volume2 className="mr-2 h-4 w-4" /> Ouvir novamente
           </Button>

           <div className="flex gap-2">
             <Button onClick={handleCheck} disabled={!selectedOption || isCorrect === true}>
               Verificar
             </Button>
             <Button variant="secondary" onClick={loadNewPhrase} disabled={!isCorrect}>
               <RefreshCw className="mr-2 h-4 w-4" /> Próxima
             </Button>
           </div>
        </CardFooter>
      </Card>
    </div>
  );
}
