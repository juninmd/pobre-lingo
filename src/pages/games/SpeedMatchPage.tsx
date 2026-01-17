import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface Pair {
  id: string;
  text: string;
  pairId: string;
  type: 'word' | 'translation';
  matched: boolean;
}

const WORDS = [
  { id: '1', word: 'Hello', translation: 'Olá' },
  { id: '2', word: 'Goodbye', translation: 'Adeus' },
  { id: '3', word: 'Water', translation: 'Água' },
  { id: '4', word: 'Food', translation: 'Comida' },
  { id: '5', word: 'Cat', translation: 'Gato' },
  { id: '6', word: 'Dog', translation: 'Cachorro' },
  { id: '7', word: 'Book', translation: 'Livro' },
  { id: '8', word: 'House', translation: 'Casa' },
];

export default function SpeedMatchPage() {
  const { toast } = useToast();
  const [cards, setCards] = useState<Pair[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const endGame = React.useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    if (score >= 6) { // If matched all pairs (6 pairs)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        toast({
            title: "Tempo Esgotado!",
            description: `Você conseguiu! Pontuação: ${score} pares.`,
        });
    } else {
        toast({
            title: "Tempo Esgotado!",
            description: `Você fez ${score} pares. Tente novamente!`,
            variant: "destructive"
        });
    }
  }, [score, toast]);

  // Initialize game
  const startGame = () => {
    const gameCards: Pair[] = [];
    // Select random subset of words
    const shuffledWords = [...WORDS].sort(() => 0.5 - Math.random()).slice(0, 6);

    shuffledWords.forEach(w => {
      gameCards.push({ id: `word-${w.id}`, text: w.word, pairId: w.id, type: 'word', matched: false });
      gameCards.push({ id: `trans-${w.id}`, text: w.translation, pairId: w.id, type: 'translation', matched: false });
    });

    setCards(gameCards.sort(() => 0.5 - Math.random()));
    setTimeLeft(45);
    setScore(0);
    setIsPlaying(true);
    setGameOver(false);
    setSelectedCards([]);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

  }, [isPlaying, timeLeft, endGame]);

  const handleCardClick = (id: string) => {
    if (!isPlaying || gameOver) return;

    // Ignore if already matched or selected
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || selectedCards.includes(id)) return;

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const first = cards.find(c => c.id === newSelected[0]);
      const second = cards.find(c => c.id === newSelected[1]);

      if (first && second && first.pairId === second.pairId) {
        // Match!
        setCards(prev => prev.map(c =>
          c.pairId === first.pairId ? { ...c, matched: true } : c
        ));
        setScore(s => s + 1);

        // Check win condition
        if (score + 1 >= 6) {
             setIsPlaying(false);
             setGameOver(true);
             confetti();
             toast({ title: "Vitória!", description: "Você completou em tempo recorde!" });
        }
      }

      // Reset selection after delay
      setTimeout(() => setSelectedCards([]), 500);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <Timer className="w-8 h-8 text-yellow-500" />
                Speed Match
            </h1>
            <div className="text-2xl font-mono font-bold text-primary">
                {timeLeft}s
            </div>
        </div>

        {!isPlaying && !gameOver && (
            <Card className="w-full p-8 flex flex-col items-center gap-4 text-center">
                <h2 className="text-xl font-bold">Pronto para o desafio?</h2>
                <p>Combine 6 pares de palavras em 45 segundos.</p>
                <Button size="lg" onClick={startGame} className="w-full max-w-xs">
                    Começar Jogo
                </Button>
            </Card>
        )}

        {(isPlaying || gameOver) && (
            <div className="grid grid-cols-3 gap-4 w-full">
                {cards.map(card => {
                    const isSelected = selectedCards.includes(card.id);
                    const isMatched = card.matched;

                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            disabled={isMatched}
                            className={cn(
                                "h-24 rounded-xl border-b-4 font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center p-2",
                                isMatched
                                    ? "opacity-0 pointer-events-none"
                                    : isSelected
                                        ? "bg-primary text-primary-foreground border-primary-foreground/20 -translate-y-1"
                                        : "bg-card hover:bg-accent border-muted-foreground/20 hover:-translate-y-1"
                            )}
                        >
                            {card.text}
                        </button>
                    )
                })}
            </div>
        )}

        {gameOver && (
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-xl font-bold">
                    Pontuação Final: {score} / 6
                </div>
                <Button onClick={startGame} size="lg" className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Jogar Novamente
                </Button>
            </div>
        )}
      </div>
    </PageContainer>
  );
}
