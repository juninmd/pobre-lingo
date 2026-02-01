import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Trophy, Star, TrendingUp, ArrowRight, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { triggerConfetti } from '@/lib/confetti';
import { cn } from '@/lib/utils';

interface LessonCompletionDialogProps {
  open: boolean;
  onClose: () => void;
  moduleId: string;
  lessonId: string;
  xpReward: number;
  lessonTitle: string;
}

export function LessonCompletionDialog({
  open,
  onClose,
  moduleId,
  lessonId,
  xpReward,
  lessonTitle,
}: LessonCompletionDialogProps) {
  const { completeLesson, userLevel, totalXP, streak } = useCurriculumProgress();
  const navigate = useNavigate();
  const [leveledUp, setLeveledUp] = React.useState(false);

  useEffect(() => {
    if (open) {
      triggerConfetti();

      const previousLevel = Math.floor(totalXP / 100) + 1;
      completeLesson(moduleId, lessonId, xpReward);
      const newLevel = Math.floor((totalXP + xpReward) / 100) + 1;

      if (newLevel > previousLevel) {
        setLeveledUp(true);
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md border-4 border-b-8 border-green-500 p-0 overflow-hidden bg-background">

        {/* Header Background Pattern */}
        <div className="bg-green-100 dark:bg-green-900/30 h-32 absolute top-0 left-0 right-0 z-0" />

        <div className="relative z-10 flex flex-col items-center pt-8 px-6">
          <DialogTitle className="sr-only">Lição Concluída</DialogTitle>

          {/* Mascot Animation */}
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full animate-pulse" />
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-yellow-100 shadow-lg">
              <Trophy className="w-12 h-12 text-yellow-600 animate-bounce" />
            </div>
          </div>

          <h2 className="text-3xl font-black text-green-600 dark:text-green-400 mb-2 text-center uppercase tracking-wide">
            {leveledUp ? 'Level Up!' : 'Incrível!'}
          </h2>

          <p className="text-center text-muted-foreground font-medium mb-6">
            Você completou <span className="text-foreground font-bold">"{lessonTitle}"</span>
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            {/* XP Card */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl p-3 flex flex-col items-center">
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">Total XP</span>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-black text-yellow-700 dark:text-yellow-300">+{xpReward}</span>
              </div>
            </div>

            {/* Streak/Level Card */}
            <div className={cn(
              "border-2 rounded-xl p-3 flex flex-col items-center",
              leveledUp
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700"
            )}>
              <span className={cn(
                "text-xs font-bold uppercase tracking-wider",
                leveledUp ? "text-blue-600 dark:text-blue-400" : "text-orange-600 dark:text-orange-400"
              )}>
                {leveledUp ? 'Novo Nível' : 'Ofensiva'}
              </span>
              <div className="flex items-center gap-1 mt-1">
                {leveledUp ? (
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <div className="w-5 h-5 text-orange-500">🔥</div>
                )}
                <span className={cn(
                  "text-2xl font-black",
                  leveledUp ? "text-blue-700 dark:text-blue-300" : "text-orange-700 dark:text-orange-300"
                )}>
                  {leveledUp ? userLevel : streak}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0 flex-col gap-3 sm:gap-3 bg-background z-10">
          <Button
            onClick={() => {
              onClose();
              navigate('/');
            }}
            className="w-full h-12 text-lg font-bold uppercase tracking-wide shadow-lg hover:translate-y-0.5 active:translate-y-1 transition-all"
            size="lg"
          >
            Continuar Jornada
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full font-bold text-muted-foreground hover:text-foreground"
          >
            Ficar aqui por enquanto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
