import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Target, Zap } from 'lucide-react';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { useGamification } from '@/contexts/GamificationContext';
import { differenceInCalendarDays, parseISO } from 'date-fns';

interface Quest {
  id: number;
  title: string;
  progress: number;
  total: number;
  reward: number;
  completed: boolean;
}

export function DailyQuestsWidget() {
  const { completedLessons } = useCurriculumProgress();

  // Calculate real daily progress
  const todaysStats = useMemo(() => {
    const today = new Date();
    const todayLessons = completedLessons.filter(l => {
      if (!l.completedAt) return false;
      return differenceInCalendarDays(today, parseISO(l.completedAt)) === 0;
    });

    const xpToday = todayLessons.reduce((acc, lesson) => acc + (lesson.xpEarned || 0), 0);

    return {
      lessons: todayLessons.length,
      xp: xpToday
    };
  }, [completedLessons]);

  const quests: Quest[] = [
    {
      id: 1,
      title: 'Complete 1 Lição',
      progress: todaysStats.lessons,
      total: 1,
      reward: 10,
      completed: todaysStats.lessons >= 1
    },
    {
      id: 2,
      title: 'Ganhe 50 XP',
      progress: todaysStats.xp,
      total: 50,
      reward: 20,
      completed: todaysStats.xp >= 50
    },
    {
      id: 3,
      title: 'Complete 3 Lições',
      progress: todaysStats.lessons,
      total: 3,
      reward: 30,
      completed: todaysStats.lessons >= 3
    }
  ];

  return (
    <Card className="w-full border-2 shadow-md bg-gradient-to-br from-card/80 to-muted/30 backdrop-blur-md overflow-hidden relative">
      {/* Decorative gradient orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <div className="p-1.5 bg-red-500/10 rounded-md">
                <Target className="w-5 h-5 text-red-500 drop-shadow-sm" />
            </div>
            Missões Diárias
          </CardTitle>
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-md border border-border/50">Reseta à meia-noite</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {quests.map((quest) => (
          <div key={quest.id} className="space-y-2.5 group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 drop-shadow-sm animate-in zoom-in" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30 shrink-0 group-hover:text-primary/50 transition-colors" />
                )}
                <span className={`text-sm font-medium transition-colors ${quest.completed ? 'text-muted-foreground/60 line-through decoration-2 decoration-green-500/50' : 'text-foreground group-hover:text-primary'}`}>
                  {quest.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400 px-2 py-1 rounded-md border border-yellow-200/50 dark:border-yellow-800/50 shadow-sm">
                <Zap className="w-3 h-3 fill-current text-yellow-500" />
                {quest.reward}
              </div>
            </div>
            <div className="pl-7 relative">
               <Progress value={Math.min((quest.progress / quest.total) * 100, 100)} className={`h-2 shadow-inner ${quest.completed ? '[&>div]:bg-green-500' : ''}`} />
               <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-70">
                 <span>{Math.min(quest.progress, quest.total)} / {quest.total}</span>
                 {quest.completed && <span className="text-green-500">Concluída!</span>}
               </div>
            </div>
          </div>
        ))}
        {quests.length === 0 && (
           <p className="text-sm text-muted-foreground italic text-center py-4">Nenhuma missão disponível no momento.</p>
        )}
      </CardContent>
    </Card>
  );
}
