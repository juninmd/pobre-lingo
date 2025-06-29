
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label }
from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckSquare, Languages, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { correctSentenceIdentificationExercises, CorrectSentenceIdentificationExercise, CorrectSentenceIdentificationChoice } from '@/lib/exerciseData';
import { useToast } from '@/hooks/use-toast';

export function CorrectSentenceIdentification() {
  const [currentExercise, setCurrentExercise] = useState<CorrectSentenceIdentificationExercise | null>(null);
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]); // Store IDs of selected choices
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const loadNewExercise = () => {
    const randomIndex = Math.floor(Math.random() * correctSentenceIdentificationExercises.length);
    const exercise = correctSentenceIdentificationExercises[randomIndex];
    setCurrentExercise(exercise);
    setSelectedChoices([]);
    setShowFeedback(false);
  };

  useEffect(() => {
    loadNewExercise();
  }, []);

  const handleCheckboxChange = (choiceId: string, checked: boolean) => {
    setSelectedChoices(prev =>
      checked ? [...prev, choiceId] : prev.filter(id => id !== choiceId)
    );
    setShowFeedback(false);
  };

  const handleSubmit = () => {
    if (!currentExercise || selectedChoices.length === 0) {
        toast({ title: "Atenção", description: "Por favor, selecione ao menos uma opção.", variant: "default"});
        return;
    };
    setShowFeedback(true);
    
    const correctChoiceIds = currentExercise.choices.filter(c => c.isCorrect).map(c => c.id);
    // Check if all selected choices are correct AND all correct choices are selected
    const isCompletelyCorrect = 
        selectedChoices.length === correctChoiceIds.length &&
        selectedChoices.every(id => correctChoiceIds.includes(id)) &&
        correctChoiceIds.every(id => selectedChoices.includes(id));


    if (isCompletelyCorrect) {
        toast({ title: "Correto!", description: "Você identificou a(s) frase(s) correta(s)!", className: "bg-green-500/20 border-green-500 text-green-700" });
    } else {
        toast({ title: "Incorreto!", description: "Verifique a explicação para entender melhor.", variant: "destructive" });
    }
  };

  if (!currentExercise) {
    return <p>Carregando exercício...</p>;
  }

  const correctUserChoices = currentExercise.choices.filter(choice => selectedChoices.includes(choice.id) && choice.isCorrect);
  const missedCorrectChoices = currentExercise.choices.filter(choice => !selectedChoices.includes(choice.id) && choice.isCorrect);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <CheckSquare className="mr-2 h-6 w-6" /> Identifique a(s) Frase(s) Correta(s)
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {currentExercise.prompt}
          <br /> <Badge variant="secondary" className="mt-1">{currentExercise.topic} - {currentExercise.difficulty}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentExercise.choices.map((choice: CorrectSentenceIdentificationChoice) => (
            <div key={choice.id} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
              <Checkbox
                id={choice.id}
                checked={selectedChoices.includes(choice.id)}
                onCheckedChange={(checked) => handleCheckboxChange(choice.id, Boolean(checked))}
                disabled={showFeedback}
                className="mt-1"
              />
              <Label htmlFor={choice.id} className="text-base text-foreground cursor-pointer flex-1">
                {choice.sentence}
              </Label>
            </div>
          ))}
        </div>

        {showFeedback && (
          <Alert className="mt-6 bg-primary/10 border-primary/30">
            <AlertTitle className="font-semibold text-primary">Explicação Detalhada</AlertTitle>
            <AlertDescription className="text-foreground/80 space-y-2">
              <p>{currentExercise.explanation}</p>
              
              <div>
                <strong>Respostas corretas:</strong>
                <ul className="list-disc list-inside ml-4 mt-1">
                {currentExercise.choices.filter(c => c.isCorrect).map(c => (
                    <li key={`correct-${c.id}`}>
                        {c.sentence}
                        {c.translation_pt && (
                            <span className="block text-sm italic text-accent/80 flex items-center">
                                <Languages className="mr-1 h-3 w-3" /> {c.translation_pt}
                            </span>
                        )}
                    </li>
                ))}
                </ul>
              </div>

              {correctUserChoices.length > 0 && !currentExercise.choices.filter(c => c.isCorrect).every(correctChoice => selectedChoices.includes(correctChoice.id)) && (
                <div className="text-green-600">
                  <strong>Você acertou em selecionar:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {correctUserChoices.map(c => <li key={`user-correct-${c.id}`}>{c.sentence}</li>)}
                  </ul>
                </div>
              )}
             
              {missedCorrectChoices.length > 0 && (
                <div className="text-orange-600">
                  <strong>Você não selecionou estas frases corretas:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {missedCorrectChoices.map(c => (
                         <li key={`missed-correct-${c.id}`}>
                            {c.sentence}
                            {c.translation_pt && (
                                <span className="block text-sm italic text-accent/80 flex items-center">
                                    <Languages className="mr-1 h-3 w-3" /> {c.translation_pt}
                                </span>
                            )}
                        </li>
                    ))}
                  </ul>
                </div>
              )}


            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-2">
        <Button onClick={handleSubmit} disabled={selectedChoices.length === 0 || showFeedback} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          Verificar Resposta
        </Button>
        <Button onClick={loadNewExercise} variant="secondary">
          <RefreshCw className="mr-2 h-4 w-4" /> Próximo Exercício
        </Button>
      </CardFooter>
    </Card>
  );
}

