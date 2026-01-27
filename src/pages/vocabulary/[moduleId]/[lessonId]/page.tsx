import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { curriculumData } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { BookOpen, CheckCircle2, Star, ArrowRight, ArrowLeft, Volume2, HelpCircle } from 'lucide-react';
import { LessonProgressBar } from '@/components/curriculum/LessonProgressBar';
import { SpeakingExercise } from '@/components/exercises/SpeakingExercise';
import { speakingData } from '@/lib/speakingData';
import { SentenceOrdering } from '@/components/exercises/SentenceOrdering';
import { FindIncorrectWords } from '@/components/exercises/FindIncorrectWords';
import { NewsComprehension } from '@/components/exercises/NewsComprehension';
import ConversationExercise from '@/components/exercises/ConversationExercise';
import { ListeningExercise } from '@/components/exercises/ListeningExercise';
import { newsComprehensionExercises } from '@/lib/exerciseData';
import { GrammarLessonView } from '@/components/curriculum/GrammarLessonView';
import { CultureLessonView } from '@/components/curriculum/CultureLessonView';
import { QuizView } from '@/components/curriculum/QuizView';

import { matchingPairsExercises } from '@/lib/exerciseData';
import { cn } from '@/lib/utils';
import { useGamification } from '@/contexts/GamificationContext';
import { triggerConfetti } from '@/lib/confetti';
import { Heart, Trophy, RefreshCw } from 'lucide-react';
import { getWordsByTopic } from '@/lib/dictionaryData';

// Matching Pairs Component (Simplified for embedding)
// --------------------------------------------------------------------------------
interface CardState {
  id: string; // "p1-word" or "p1-translation"
  pairId: string;
  text: string;
  type: 'word' | 'translation';
  status: 'hidden' | 'selected' | 'matched' | 'error';
}

function MatchingPairsGame({ onComplete }: { onComplete: () => void }) {
  const { hearts, loseHeart, addGem, addStreak } = useGamification();
  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardState[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [exerciseTopic, setExerciseTopic] = useState("");

  const initializeGame = () => {
    // Select random exercise
    const currentExercise = matchingPairsExercises[Math.floor(Math.random() * matchingPairsExercises.length)];
    setExerciseTopic(currentExercise.topic);

    // Create card items from pairs
    const newCards: CardState[] = [];
    currentExercise.pairs.forEach(pair => {
      newCards.push({
        id: `${pair.id}-word`,
        pairId: pair.id,
        text: pair.word,
        type: 'word',
        status: 'hidden'
      });
      newCards.push({
        id: `${pair.id}-trans`,
        pairId: pair.id,
        text: pair.translation,
        type: 'translation',
        status: 'hidden'
      });
    });

    // Shuffle cards
    setCards(newCards.sort(() => Math.random() - 0.5));
    setSelectedCards([]);
    setIsCompleted(false);
    setIsProcessing(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card: CardState) => {
    if (isProcessing || card.status === 'matched' || card.status === 'selected') return;
    // Infinite lives means we don't block on 0 hearts, but we assume the gamification context handles unlimited display
    // However, if logic blocks it, we might need to ignore.
    // The previous implementation blocked if hearts <= 0. Let's assume infinite lives for now based on memory.

    const newCards = [...cards];
    const cardIndex = newCards.findIndex(c => c.id === card.id);
    newCards[cardIndex].status = 'selected';
    setCards(newCards);

    const newSelected = [...selectedCards, newCards[cardIndex]];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsProcessing(true);
      checkForMatch(newSelected);
    }
  };

  const checkForMatch = (selected: CardState[]) => {
    const [card1, card2] = selected;
    const isMatch = card1.pairId === card2.pairId;

    setTimeout(() => {
      setCards(prev => {
        const next = [...prev];
        const idx1 = next.findIndex(c => c.id === card1.id);
        const idx2 = next.findIndex(c => c.id === card2.id);

        if (isMatch) {
          next[idx1].status = 'matched';
          next[idx2].status = 'matched';
          // Check win condition
          if (next.every(c => c.status === 'matched')) {
            handleWin();
          }
        } else {
          next[idx1].status = 'error';
          next[idx2].status = 'error';
          loseHeart(); // Even with infinite lives, visual feedback or logic might exist
        }
        return next;
      });

      if (!isMatch) {
        setTimeout(() => {
          setCards(prev => {
            const next = [...prev];
            const idx1 = next.findIndex(c => c.id === card1.id);
            const idx2 = next.findIndex(c => c.id === card2.id);
            if (next[idx1].status === 'error') next[idx1].status = 'hidden';
            if (next[idx2].status === 'error') next[idx2].status = 'hidden';
            return next;
          });
          setSelectedCards([]);
          setIsProcessing(false);
        }, 1000);
      } else {
        setSelectedCards([]);
        setIsProcessing(false);
      }
    }, 500);
  };

  const handleWin = () => {
    setIsCompleted(true);
    addGem(10);
    addStreak();
    triggerConfetti();
    // Allow user to finish lesson
  };

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Par de Palavras: {exerciseTopic}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          {isCompleted ? (
            <div className="text-center py-10 bg-card border rounded-xl shadow-sm">
               <div className="h-20 w-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Trophy className="h-10 w-10 text-yellow-600" />
               </div>
               <h3 className="text-2xl font-bold mb-2">Excelente!</h3>
               <p className="text-muted-foreground mb-6">Você completou o exercício.</p>
               <div className="flex justify-center gap-4">
                 <Button onClick={initializeGame} variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" /> Jogar Novamente
                 </Button>
                 <Button onClick={onComplete}>
                   Concluir Lição
                 </Button>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  disabled={card.status === 'matched'}
                  className={cn(
                    "h-24 rounded-xl border-2 font-medium text-lg transition-all transform active:scale-95 flex items-center justify-center p-2 text-center shadow-sm",
                    card.status === 'hidden' && "bg-card hover:border-primary/50",
                    card.status === 'selected' && "border-primary bg-primary/10 scale-105 ring-2 ring-primary/20",
                    card.status === 'matched' && "border-transparent bg-green-100 text-green-700 opacity-50 cursor-default",
                    card.status === 'error' && "border-red-500 bg-red-50 text-red-700 animate-shake"
                  )}
                >
                  {card.text}
                </button>
              ))}
            </div>
          )}
        </CardContent>
    </Card>
  );
}

// --------------------------------------------------------------------------------

export default function LessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson, isLessonCompleted } = useCurriculumProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  // Encontrar a lição
  const module = curriculumData.modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Lição não encontrada</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>
              Voltar para o Início
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  const completed = isLessonCompleted(moduleId!, lessonId!);

  const handleComplete = () => {
    if (!completed) {
      completeLesson(moduleId!, lessonId!, lesson.xpReward);
    }
    navigate('/curriculum');
  };

  // Render Logic based on Type
  const renderContent = () => {
    switch (lesson.type) {
        case 'speaking':
            const speakingTopics = lesson.speakingTopics || [];
            const speakingPhrases = speakingTopics.flatMap(topic => speakingData[topic] || []);
            return (
                <SpeakingExercise
                  phrases={speakingPhrases}
                  onComplete={handleComplete}
                />
            );

        case 'exercise':
            if (lesson.exerciseType === 'sentence-ordering') {
                return <SentenceOrdering />;
            }
            if (lesson.exerciseType === 'find-incorrect-words') {
                return <FindIncorrectWords />;
            }
            if (lesson.exerciseType === 'matching-pairs') {
                return <MatchingPairsGame onComplete={handleComplete} />;
            }
            if (lesson.exerciseType === 'conversation') {
                return <ConversationExercise />;
            }
             if (lesson.exerciseType === 'listening') {
                 return <ListeningExercise />;
            }
            return <div className="p-4">Tipo de exercício não suportado: {lesson.exerciseType}</div>;

        case 'reading':
             // Assuming NewsComprehension for reading
             // We need to pick an article. exerciseData has newsComprehensionExercises
             // Pick random or specific if we had ID.
             const randomArticle = newsComprehensionExercises[Math.floor(Math.random() * newsComprehensionExercises.length)];
             return (
                 <NewsComprehension
                    exercise={randomArticle}
                    onBackToList={() => navigate('/curriculum')}
                    onQuizComplete={() => {
                        completeLesson(moduleId!, lessonId!, lesson.xpReward);
                        // Optional: show success modal before navigating?
                        // NewsComprehension handles its own success view.
                    }}
                 />
             );

        case 'grammar':
            return (
                <GrammarLessonView
                    ruleIds={lesson.grammarRuleIds || []}
                    onComplete={handleComplete}
                    isCompleted={completed}
                />
            );

        case 'culture':
             return (
                 <CultureLessonView
                    lesson={lesson}
                    onComplete={handleComplete}
                    isCompleted={completed}
                 />
             );

        case 'quiz':
            return (
                <QuizView
                    lesson={lesson}
                    onComplete={handleComplete}
                    isCompleted={completed}
                />
            );

        case 'vocabulary':
        default:
             const topics = lesson.vocabularyTopics || [];
             // New Logic: Fetch from centralized dictionary
             const allWordsEntries = topics.flatMap(topic => getWordsByTopic(topic));

             // Map to local format
             const allWords = allWordsEntries.map(entry => ({
                 word: entry.word,
                 translation: entry.translation_pt,
                 example: entry.example_sentence_en || ''
             }));

             const currentWord = allWords[currentIndex];
             const progress = allWords.length > 0 ? ((currentIndex + 1) / allWords.length) * 100 : 0;

             // Helpers for vocab
             const handleNext = () => {
                if (currentIndex < allWords.length - 1) {
                  setCurrentIndex(prev => prev + 1);
                  setShowTranslation(false);
                }
              };

              const handlePrevious = () => {
                if (currentIndex > 0) {
                  setCurrentIndex(prev => prev - 1);
                  setShowTranslation(false);
                }
              };

              const handleMaster = () => {
                setMastered(prev => new Set(prev).add(currentIndex));
              };

              const getTextToSpeak = (word: string) => {
                if (word.startsWith('/') && word.includes('(')) {
                  const match = word.match(/\(([^)]+)\)/);
                  return match ? match[1] : word;
                }
                if (word.includes('(')) {
                  return word.split('(')[0].trim();
                }
                return word;
              };

              const handleSpeak = () => {
                if (!currentWord) return;
                const text = getTextToSpeak(currentWord.word);
                if (typeof SpeechSynthesisUtterance === 'undefined') return;
                const utterance = new SpeechSynthesisUtterance(text);
                const voices = window.speechSynthesis.getVoices();
                const enVoice = voices.find(v => v.lang.startsWith('en'));
                if (enVoice) utterance.voice = enVoice;
                utterance.rate = 0.8;
                window.speechSynthesis.speak(utterance);
              };

             if (allWords.length === 0) {
                 return (
                     <Card>
                         <CardContent className="p-8 text-center">
                             <p>Nenhuma palavra encontrada para este tópico.</p>
                             <Button onClick={() => navigate('/curriculum')} className="mt-4">
                                 Voltar
                             </Button>
                         </CardContent>
                     </Card>
                 );
             }

             return (
                <div className="max-w-4xl mx-auto">
                    {/* Progresso */}
                    <Card className="mb-6">
                      <CardContent className="pt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progresso</span>
                          <span className="font-medium">
                            {currentIndex + 1} / {allWords.length}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="mt-2 text-sm text-muted-foreground">
                          {mastered.size} palavras dominadas
                        </div>
                      </CardContent>
                    </Card>

                    {/* Card de Vocabulário */}
                    {currentWord && (
                      <Card className="mb-6">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-2xl">Palavra {currentIndex + 1}</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowTranslation(!showTranslation)}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              {showTranslation ? 'Ocultar' : 'Mostrar'} Tradução
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {/* Palavra em Inglês */}
                            <div className="text-center p-8 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                              <h2 className="text-4xl font-bold mb-4">{currentWord.word}</h2>
                              <Button variant="ghost" size="sm" onClick={handleSpeak}>
                                <Volume2 className="h-5 w-5" />
                              </Button>
                            </div>

                            {/* Tradução */}
                            {showTranslation && (
                              <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900">
                                <p className="text-2xl font-semibold text-green-900 dark:text-green-300">
                                  {currentWord.translation}
                                </p>
                              </div>
                            )}

                            {/* Exemplo */}
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <h3 className="font-semibold mb-2">Exemplo:</h3>
                              <p className="text-lg italic">{currentWord.example}</p>
                            </div>

                            {/* Botão Dominar */}
                            <div className="text-center">
                              <Button
                                onClick={handleMaster}
                                disabled={mastered.has(currentIndex)}
                                variant={mastered.has(currentIndex) ? "outline" : "default"}
                              >
                                {mastered.has(currentIndex) ? (
                                  <>
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Dominada
                                  </>
                                ) : (
                                  <>
                                    <Star className="h-4 w-4 mr-2" />
                                    Marcar como Dominada
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Navegação */}
                    <div className="flex justify-between items-center">
                      <Button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        variant="outline"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Anterior
                      </Button>

                      {currentIndex === allWords.length - 1 ? (
                        <Button onClick={handleComplete} size="lg">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          {completed ? 'Voltar ao Currículo' : 'Concluir Lição'}
                          {!completed && ` (+${lesson.xpReward} XP)`}
                        </Button>
                      ) : (
                        <Button onClick={handleNext}>
                          Próxima
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
             );
    }
  };


  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Barra de Progresso da Jornada Global */}
        <LessonProgressBar
          moduleId={moduleId!}
          lessonId={lessonId!}
          showCompleteButton={false} // Handled individually by components
          className="mb-6"
        />

        {/* Header Comum */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o Início
          </Button>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{lesson.title_pt}</h1>
            {completed && (
              <Badge className="bg-green-500">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completo
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{lesson.description_pt}</p>
        </div>

        {/* Content Render */}
        {renderContent()}

      </div>
    </PageContainer>
  );
}
