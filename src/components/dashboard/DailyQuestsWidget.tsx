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
  // xp removed as it was unused

  // Calculate real daily progress
  const todaysStats = useMemo(() => {
    const today = new Date();
    const todayLessons = completedLessons.filter(l => {
      if (!l.completedAt) return false;
      return differenceInCalendarDays(today, parseISO(l.completedAt)) === 0;
    });

    return {
      lessons: todayLessons.length,
      // For XP, we don't have a daily tracker in context yet,
      // so we'll use a placeholder or derived logic if possible.
      // For now, let's track lessons and total completion as "quests".
      // Ideally we would need a daily XP tracker in context.
      // We will simplify quests to what we can track.
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
      title: 'Complete 3 Lições',
      progress: todaysStats.lessons,
      total: 3,
      reward: 30,
      completed: todaysStats.lessons >= 3
    },
  ];

  return (
    <Card className="w-full border-2 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            Missões Diárias
          </CardTitle>
          <span className="text-xs text-muted-foreground font-mono">Reseta à meia-noite</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {quests.map((quest) => (
          <div key={quest.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30 shrink-0" />
                )}
                <span className={`text-sm font-medium ${quest.completed ? 'text-muted-foreground line-through' : ''}`}>
                  {quest.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full">
                <Zap className="w-3 h-3 fill-current" />
                {quest.reward}
              </div>
            </div>
            <div className="pl-7">
               <Progress value={Math.min((quest.progress / quest.total) * 100, 100)} className="h-2" />
               <div className="flex justify-between mt-1 text-[10px] text-muted-foreground uppercase font-bold">
                 <span>{Math.min(quest.progress, quest.total)} / {quest.total}</span>
               </div>
            </div>
          </div>
        ))}
        {quests.length === 0 && (
           <p className="text-sm text-muted-foreground">Nenhuma missão disponível no momento.</p>
        )}
      </CardContent>
    </Card>
  );
}
