import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Brain, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const WORD_LIST = [
  { word: 'LANGUAGE', hint: 'Sistema de comunicação' },
  { word: 'LEARNING', hint: 'Processo de adquirir conhecimento' },
  { word: 'TEACHER', hint: 'Pessoa que ensina' },
  { word: 'STUDENT', hint: 'Pessoa que estuda' },
  { word: 'SCHOOL', hint: 'Lugar de aprendizado' },
  { word: 'PENCIL', hint: 'Usado para escrever' },
  { word: 'COMPUTER', hint: 'Máquina eletrônica' },
  { word: 'ENGLISH', hint: 'Língua falada nos EUA' },
  { word: 'BRAZIL', hint: 'País da América do Sul' },
  { word: 'FUTURE', hint: 'O que vai acontecer' },
];

export default function WordScramblePage() {
  const { toast } = useToast();
  const [currentWord, setCurrentWord] = useState({ word: '', hint: '' });
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState<'none' | 'success' | 'error'>('none');
  const [streak, setStreak] = useState(0);

  const shuffleWord = (word: string) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const nextWord = React.useCallback(() => {
    const random = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    // Ensure we don't pick the same word if possible, or handle it
    let newScrambled = shuffleWord(random.word);
    // Make sure it's actually shuffled
    while (newScrambled === random.word) {
      newScrambled = shuffleWord(random.word);
    }

    setCurrentWord(random);
    setScrambled(newScrambled);
    setGuess('');
    setFeedback('none');
  }, []);

  useEffect(() => {

    nextWord();
  }, [nextWord]);

  const handleCheck = () => {
    if (guess.toUpperCase().trim() === currentWord.word) {
      setFeedback('success');
      setStreak(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 }
      });
      setTimeout(nextWord, 1500);
    } else {
      setFeedback('error');
      setStreak(0);
      toast({
        title: "Incorreto",
        description: "Tente novamente!",
        variant: "destructive"
      });
    }
  };

  return (
    <PageContainer>
      <div className="max-w-md mx-auto flex flex-col items-center gap-8 py-8">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                <Brain className="w-8 h-8 text-purple-500" />
                Word Scramble
            </h1>
            <p className="text-muted-foreground">Desembaralhe as letras para formar a palavra.</p>
        </div>

        <div className="w-full flex justify-between items-center px-4">
            <div className="text-sm font-medium text-muted-foreground">
                Streak: <span className="text-primary font-bold">{streak} 🔥</span>
            </div>
            <Button variant="ghost" size="sm" onClick={nextWord}>
                Pular <RefreshCw className="ml-2 w-3 h-3" />
            </Button>
        </div>

        <Card className="w-full p-8 flex flex-col items-center gap-6 shadow-xl border-t-4 border-t-purple-500">
            <div className="space-y-4 text-center">
                <div className="text-4xl font-mono font-bold tracking-[0.2em] text-primary break-all">
                    {scrambled}
                </div>
                {feedback === 'error' && (
                    <div className="text-sm text-muted-foreground bg-muted py-1 px-3 rounded-full inline-block">
                        Dica: {currentWord.hint}
                    </div>
                )}
            </div>

            <div className="w-full space-y-4">
                <Input
                    value={guess}
                    onChange={(e) => {
                        setGuess(e.target.value);
                        setFeedback('none');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    placeholder="Digite sua resposta..."
                    className={cn(
                        "text-center text-lg uppercase h-12 tracking-widest",
                        feedback === 'success' && "border-green-500 bg-green-50 text-green-900",
                        feedback === 'error' && "border-red-500 bg-red-50 text-red-900"
                    )}
                />

                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheck}
                    disabled={!guess}
                >
                    {feedback === 'success' ? (
                        <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Correto!</span>
                    ) : feedback === 'error' ? (
                        <span className="flex items-center gap-2"><XCircle className="w-5 h-5" /> Tente Novamente</span>
                    ) : (
                        "Verificar"
                    )}
                </Button>
            </div>
        </Card>
      </div>
    </PageContainer>
  );
}
