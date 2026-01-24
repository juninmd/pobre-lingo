import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dictionaryEntries } from '@/lib/dictionaryData';
import { useGamification } from '@/contexts/GamificationContext';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { ArrowLeft, Check, X, GraduationCap, PartyPopper } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { triggerConfetti } from '@/lib/confetti';

export default function FlashcardsPage() {
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get('module');
  const lessonId = searchParams.get('lesson');
  const { completeLesson } = useCurriculumProgress();

  const { addXp, addStreak } = useGamification();
  const [deck, setDeck] = useState<typeof dictionaryEntries>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize deck with random 10 words
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...dictionaryEntries].sort(() => 0.5 - Math.random());
    setDeck(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setIsFinished(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (known: boolean) => {
    if (known) {
      setKnownCount(prev => prev + 1);
      addXp(10); // 10 XP per known word
    }

    if (currentIndex < deck.length - 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentIndex(prev => prev + 1);
      }, 200);
    } else {
      finishGame(known ? knownCount + 1 : knownCount);
    }
  };

  const finishGame = (finalKnownCount: number) => {
    setIsFinished(true);
    addStreak();
    if (finalKnownCount >= 5) {
      triggerConfetti();
    }
    if (moduleId && lessonId) {
      completeLesson(moduleId, lessonId, finalKnownCount * 10);
    }
  };

  const currentCard = deck[currentIndex];

  if (!currentCard && !isFinished) return <div>Carregando...</div>;

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto flex flex-col min-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to={moduleId && lessonId ? '/' : '/arcade'}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {moduleId && lessonId ? 'Voltar ao Mapa' : 'Sair'}
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-primary font-bold">
            <GraduationCap className="w-5 h-5" />
            <span>Flashcards</span>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {isFinished ? 'Concluído' : `${currentIndex + 1} / ${deck.length}`}
          </div>
        </div>

        {/* Game Area */}
        <div className="flex-1 flex flex-col justify-center perspective-[1000px]">
          {isFinished ? (
            <Card className="border-2 border-primary/20 shadow-xl bg-card/50 backdrop-blur animate-in fade-in zoom-in duration-500">
              <CardContent className="p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PartyPopper className="w-10 h-10 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-primary">Sessão Concluída!</h2>
                <div className="space-y-2">
                  <p className="text-muted-foreground text-lg">
                    Você memorizou <span className="text-foreground font-bold">{knownCount}</span> de <span className="text-foreground font-bold">{deck.length}</span> palavras.
                  </p>
                  <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                    +{knownCount * 10} XP Ganho
                  </p>
                </div>
                <div className="pt-4 flex justify-center gap-4">
                  <Link to={moduleId && lessonId ? '/' : '/arcade'}>
                    <Button variant="outline">{moduleId && lessonId ? 'Voltar ao Mapa' : 'Voltar ao Menu'}</Button>
                  </Link>
                  <Button onClick={startNewGame}>Praticar Novamente</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className="w-full aspect-[4/3] relative cursor-pointer group transition-all duration-500 [transform-style:preserve-3d]"
              onClick={handleFlip}
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front (English) */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <Card className="w-full h-full flex flex-col items-center justify-center p-8 border-2 border-primary/10 hover:border-primary/30 shadow-lg bg-gradient-to-br from-background to-muted transition-colors">
                  <span className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Inglês</span>
                  <h3 className="text-4xl md:text-5xl font-black text-center mb-4">{currentCard.word}</h3>
                  {currentCard.phonetic_transcription_en && (
                      <span className="text-muted-foreground/60 font-mono text-lg">{currentCard.phonetic_transcription_en}</span>
                  )}
                  <p className="mt-8 text-sm text-muted-foreground text-center italic max-w-md">
                    "{currentCard.example_sentence_en}"
                  </p>
                  <div className="absolute bottom-4 text-xs text-muted-foreground animate-pulse">
                    Toque para virar
                  </div>
                </Card>
              </div>

              {/* Back (Portuguese) */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Card className="w-full h-full flex flex-col items-center justify-center p-8 border-2 border-primary/10 shadow-lg bg-primary/5">
                  <span className="text-sm uppercase tracking-widest text-primary mb-4">Português</span>
                  <h3 className="text-4xl md:text-5xl font-black text-center text-primary mb-4">{currentCard.translation_pt}</h3>
                  <p className="text-lg text-muted-foreground text-center mb-6">
                    {currentCard.meaning_en}
                  </p>
                  <p className="text-sm text-muted-foreground text-center italic max-w-md">
                    "{currentCard.example_sentence_pt}"
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {!isFinished && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-16 text-lg border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleResponse(false); }}
            >
              <X className="mr-2 h-6 w-6" />
              Ainda não
            </Button>
            <Button
              size="lg"
              className="h-16 text-lg bg-green-600 hover:bg-green-700"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); handleResponse(true); }}
            >
              <Check className="mr-2 h-6 w-6" />
              Já sei!
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
