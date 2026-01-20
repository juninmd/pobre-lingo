import React, { useState, useEffect, useRef } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Timer, Zap, Trophy, RefreshCw, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { dictionaryEntries } from '@/lib/dictionaryData';
import { calculateMultiplier, calculateScore, calculateTimeBonus } from '@/lib/gameLogic';

interface Pair {
  id: string;
  text: string;
  pairId: string;
  type: 'word' | 'translation';
  matched: boolean;
  error?: boolean;
}

export default function MatchMadnessPage() {
  const { toast } = useToast();

  // Game State
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // Board State
  const [cards, setCards] = useState<Pair[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // Combo State
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [maxStreak, setMaxStreak] = useState(0);

  // Sound/Audio refs (simulated visual for now)
  const containerRef = useRef<HTMLDivElement>(null);

  // Constants
  const PAIRS_PER_LEVEL = Math.min(3 + Math.floor(level / 2), 6); // Max 6 pairs on screen

  const generateBoard = () => {
    // Select random words
    const shuffledDictionary = [...dictionaryEntries].sort(() => 0.5 - Math.random());
    const selectedWords = shuffledDictionary.slice(0, PAIRS_PER_LEVEL);

    const gameCards: Pair[] = [];
    selectedWords.forEach(w => {
      gameCards.push({ id: `word-${w.id}`, text: w.word, pairId: w.id, type: 'word', matched: false });
      gameCards.push({ id: `trans-${w.id}`, text: w.translation, pairId: w.id, type: 'translation', matched: false });
    });

    return gameCards.sort(() => 0.5 - Math.random());
  };

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(60);
    setStreak(0);
    setMultiplier(1);
    setIsPlaying(true);
    setGameOver(false);
    setSelectedCards([]);
    setCards(generateBoard());
  };

  const nextLevel = () => {
    setLevel(l => l + 1);
    // Bonus time for clearing board
    setTimeLeft(t => Math.min(t + 15, 60));
    setCards(generateBoard());

    // Confetti for level up
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    toast({
        title: "Nível Completo!",
        description: `+15 segundos! Nível ${level + 1}`,
        duration: 2000,
    });
  };

  const endGame = React.useCallback(() => {
    setIsPlaying(false);
    setGameOver(true);
    toast({
        title: "Fim de Jogo!",
        description: `Pontuação Final: ${score}`,
        variant: "destructive"
    });
  }, [score, toast]);

  // Timer Effect
  useEffect(() => {
    if (isPlaying) {
      // Immediate check in case penalty killed the time
      if (timeLeft <= 0) {
        endGame();
        return;
      }

      const timer = setInterval(() => {
        setTimeLeft(t => {
            if (t <= 1) {
                endGame();
                return 0;
            }
            return t - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, timeLeft, endGame]);

  const handleCardClick = (id: string) => {
    if (!isPlaying || gameOver) return;

    // Prevent selecting already matched or errored cards
    const card = cards.find(c => c.id === id);
    if (!card || card.matched || card.error || selectedCards.includes(id)) return;

    const newSelected = [...selectedCards, id];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const first = cards.find(c => c.id === newSelected[0]);
      const second = cards.find(c => c.id === newSelected[1]);

      if (first && second && first.pairId === second.pairId) {
        // MATCH!
        handleMatch(first.pairId);
      } else {
        // MISMATCH!
        handleMismatch(newSelected);
      }
    }
  };

  const handleMatch = (pairId: string) => {
    // 1. Update Streak & Score
    const newStreak = streak + 1;
    setStreak(newStreak);
    setMaxStreak(Math.max(newStreak, maxStreak));

    const newMult = calculateMultiplier(newStreak);
    setMultiplier(newMult);

    setScore(s => calculateScore(s, newStreak));
    setTimeLeft(t => calculateTimeBonus(true, t));

    // 2. Mark cards as matched
    setCards(prev => prev.map(c =>
      c.pairId === pairId ? { ...c, matched: true } : c
    ));

    // 3. Reset selection
    setSelectedCards([]);

    // 4. Check Level Complete
    const remainingPairs = cards.filter(c => c.pairId !== pairId && !c.matched).length;
    if (remainingPairs === 0) {
        setTimeout(nextLevel, 500);
    }
  };

  const handleMismatch = (selectedIds: string[]) => {
    // 1. Reset Streak
    setStreak(0);
    setMultiplier(1);

    // 2. Penalty
    setTimeLeft(t => calculateTimeBonus(false, t));

    // 3. Visual Error State
    setCards(prev => prev.map(c =>
        selectedIds.includes(c.id) ? { ...c, error: true } : c
    ));

    // 4. Clear selection and error state after delay
    setTimeout(() => {
        setCards(prev => prev.map(c => ({ ...c, error: false })));
        setSelectedCards([]);
    }, 600);
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 min-h-[80vh]" ref={containerRef}>

        {/* Header Bar */}
        <div className="flex items-center justify-between w-full bg-card p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
                <div className="bg-yellow-500/10 p-2 rounded-lg">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-bold uppercase">Score</span>
                    <span className="text-2xl font-black">{score}</span>
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className={cn(
                    "flex items-center gap-1 font-bold px-3 py-1 rounded-full transition-all duration-300",
                    multiplier > 1 ? "bg-orange-500 text-white scale-110" : "bg-muted text-muted-foreground"
                )}>
                    <Flame className={cn("w-4 h-4", multiplier > 1 && "animate-pulse")} fill="currentColor" />
                    <span>{streak} Streak</span>
                    {multiplier > 1 && <span className="bg-white/20 px-1 rounded ml-1">x{multiplier}</span>}
                </div>
            </div>

            <div className="flex items-center gap-3 text-right">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground font-bold uppercase">Time</span>
                    <span className={cn(
                        "text-2xl font-mono font-bold",
                        timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-primary"
                    )}>
                        {timeLeft}s
                    </span>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <Timer className="w-6 h-6 text-primary" />
                </div>
            </div>
        </div>

        {/* Game Area */}
        {!isPlaying && !gameOver && (
            <Card className="w-full flex-1 flex flex-col items-center justify-center p-8 gap-6 text-center animate-in zoom-in duration-300">
                <div className="bg-yellow-500 rounded-full p-6 shadow-xl mb-4">
                    <Zap className="w-16 h-16 text-white fill-current" />
                </div>
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Match Madness</h1>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Combine o máximo de pares possível antes que o tempo acabe!
                        Cada acerto dá <span className="text-green-500 font-bold">+2s</span>.
                        Erros tiram <span className="text-red-500 font-bold">-3s</span>.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
                    <div className="bg-muted/50 p-4 rounded-xl flex flex-col items-center">
                        <span className="text-2xl font-bold">Infinite</span>
                        <span className="text-xs text-muted-foreground">Levels</span>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-xl flex flex-col items-center">
                        <span className="text-2xl font-bold">x4</span>
                        <span className="text-xs text-muted-foreground">Max Combo</span>
                    </div>
                </div>
                <Button size="lg" onClick={startGame} className="w-full max-w-xs h-14 text-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                    START GAME
                </Button>
            </Card>
        )}

        {gameOver && (
            <Card className="w-full flex-1 flex flex-col items-center justify-center p-8 gap-6 animate-in zoom-in duration-300">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
                    <p className="text-muted-foreground">Você chegou ao Nível {level}</p>
                </div>

                <div className="w-full max-w-sm bg-muted rounded-2xl p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b pb-4">
                        <span className="text-muted-foreground">Pontuação Total</span>
                        <span className="text-2xl font-bold">{score}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-4">
                        <span className="text-muted-foreground">Melhor Combo</span>
                        <span className="text-xl font-bold text-orange-500">{maxStreak} 🔥</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">XP Ganho</span>
                        <span className="text-xl font-bold text-yellow-500">+{Math.floor(score / 5)} XP</span>
                    </div>
                </div>

                <Button onClick={startGame} size="lg" className="w-full max-w-xs gap-2 h-12">
                    <RefreshCw className="w-5 h-5" />
                    Jogar Novamente
                </Button>
            </Card>
        )}

        {isPlaying && (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 flex-1 content-start mt-4">
                {cards.map(card => {
                    const isSelected = selectedCards.includes(card.id);
                    const isError = card.error;
                    const isMatched = card.matched;

                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            disabled={isMatched}
                            className={cn(
                                "relative h-24 sm:h-32 rounded-xl border-b-[6px] font-bold text-lg sm:text-xl transition-all duration-100 flex items-center justify-center p-2 select-none",
                                isMatched
                                    ? "opacity-0 scale-50 pointer-events-none"
                                    : isError
                                        ? "bg-red-500 border-red-700 text-white animate-shake"
                                        : isSelected
                                            ? "bg-blue-500 border-blue-700 text-white -translate-y-1"
                                            : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 active:translate-y-[4px] active:border-b-0 shadow-sm"
                            )}
                        >
                            <span className="break-words text-center leading-tight w-full">
                                {card.text}
                            </span>
                        </button>
                    )
                })}
            </div>
        )}
      </div>
    </PageContainer>
  );
}
