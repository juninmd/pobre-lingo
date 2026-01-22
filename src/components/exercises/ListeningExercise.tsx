import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { useParams, useNavigate } from 'react-router-dom';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';

// Placeholder data since we don't have a listeningData.ts yet
const LISTENING_DATA = [
  {
    id: 'l1',
    text: "The cat is on the table.",
    translation: "O gato está sobre a mesa.",
    options: ["The cat is on the table.", "The dog is under the table.", "The car is in the garage."]
  },
  {
    id: 'l2',
    text: "I would like a cup of coffee.",
    translation: "Eu gostaria de uma xícara de café.",
    options: ["I would like a cup of tea.", "I would like a cup of coffee.", "I like coffee."]
  },
  {
    id: 'l3',
    text: "Where is the nearest station?",
    translation: "Onde fica a estação mais próxima?",
    options: ["Where is the nearest station?", "When does the train leave?", "Who is at the station?"]
  }
];

export function ListeningExercise() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson } = useCurriculumProgress();

  const currentItem = LISTENING_DATA[currentIndex % LISTENING_DATA.length];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentItem.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Erro",
        description: "Seu navegador não suporta síntese de voz.",
        variant: "destructive"
      });
    }
  };

  const handleCheck = () => {
    if (selectedOption === currentItem.text) {
      setIsCorrect(true);
      toast({
        title: "Correto!",
        className: "bg-green-500 text-white"
      });
    } else {
      setIsCorrect(false);
      toast({
        title: "Incorreto",
        description: "Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < 4) { // Let's say 5 exercises
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
    } else {
        // Complete
        if (moduleId && lessonId) {
            completeLesson(moduleId, lessonId, 100);
        }
        navigate('/curriculum');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {/* Barra de Progresso da Jornada */}
      {moduleId && lessonId && (
        <LessonProgressBar
          moduleId={moduleId}
          lessonId={lessonId}
          showCompleteButton={false}
          className="mb-6"
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-6 w-6 text-primary" /> Exercício de Escuta
          </CardTitle>
          <CardDescription>Ouça a frase e selecione a opção correta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center py-8">
            <Button size="lg" className="h-24 w-24 rounded-full" onClick={handleSpeak}>
              <Volume2 className="h-10 w-10" />
            </Button>
          </div>

          <div className="space-y-3">
            {currentItem.options.map((option, idx) => (
              <div
                key={idx}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedOption === option
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'hover:bg-accent'
                }`}
                onClick={() => !isCorrect && setSelectedOption(option)}
              >
                {option}
              </div>
            ))}
          </div>

          {isCorrect !== null && (
            <div className={`p-4 rounded-lg flex items-center gap-2 ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isCorrect ? <CheckCircle2 className="h-5 w-5"/> : <AlertCircle className="h-5 w-5"/>}
                <p>{isCorrect ? "Muito bem! Você acertou." : "Não foi dessa vez."}</p>
            </div>
          )}

        </CardContent>
        <CardFooter className="justify-between">
           <Button variant="ghost" disabled>Pular</Button>
           {isCorrect ? (
             <Button onClick={handleNext}>Próximo</Button>
           ) : (
             <Button onClick={handleCheck} disabled={!selectedOption}>Verificar</Button>
           )}
        </CardFooter>
      </Card>
    </div>
  );
}
