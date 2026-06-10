import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Target, Zap, Flame } from 'lucide-react';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { useActivityLog, DAILY_GOAL } from '@/hooks/useActivityLog';
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
  const { todayCount } = useActivityLog();

  // Re-render when activity changes (todayCount reads localStorage on every call)
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceUpdate(n => n + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const activityCount = todayCount();

  const todaysStats = useMemo(() => {
    const today = new Date();
    const todayLessons = completedLessons.filter(l => {
      if (!l.completedAt) return false;
      return differenceInCalendarDays(today, parseISO(l.completedAt)) === 0;
    });
    const xpToday = todayLessons.reduce((acc, lesson) => acc + (lesson.xpEarned || 0), 0);
    return { lessons: todayLessons.length, xp: xpToday };
  }, [completedLessons]);

  const quests: Quest[] = [
    {
      id: 1,
      title: 'Complete 1 Lição',
      progress: todaysStats.lessons,
      total: 1,
      reward: 10,
      completed: todaysStats.lessons >= 1,
    },
    {
      id: 2,
      title: 'Ganhe 50 XP',
      progress: todaysStats.xp,
      total: 50,
      reward: 20,
      completed: todaysStats.xp >= 50,
    },
    {
      id: 3,
      title: 'Complete 3 Lições',
      progress: todaysStats.lessons,
      total: 3,
      reward: 30,
      completed: todaysStats.lessons >= 3,
    },
  ];

  const dailyPct = Math.min(Math.round((activityCount / DAILY_GOAL) * 100), 100);
  const goalReached = activityCount >= DAILY_GOAL;

  return (
    <Card className="w-full border-2 shadow-sm bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            Missões Diárias
          </CardTitle>
          <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
            Reseta à meia-noite
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Daily goal summary */}
        <div className={`rounded-xl p-3 flex flex-col gap-2 ${goalReached ? 'bg-green-500/10 border border-green-500/20' : 'bg-primary/5 border border-primary/15'}`}>
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="flex items-center gap-1.5 text-foreground">
              <Flame className={`w-4 h-4 ${goalReached ? 'text-green-500' : 'text-primary'}`} />
              Meta do Dia
            </span>
            <span className={goalReached ? 'text-green-600 dark:text-green-400' : 'text-primary'}>
              {activityCount} / {DAILY_GOAL} atividades
            </span>
          </div>
          <Progress
            value={dailyPct}
            className="h-2.5"
          />
          {goalReached && (
            <p className="text-xs text-green-600 dark:text-green-400 font-medium text-center">
              🎉 Meta alcançada! Incrível!
            </p>
          )}
        </div>

        {/* Quest rows */}
        {quests.map((quest) => (
          <div key={quest.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {quest.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30 shrink-0" />
                )}
                <span className={`text-sm font-medium ${quest.completed ? 'text-muted-foreground line-through decoration-2 decoration-green-500/50' : ''}`}>
                  {quest.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-200 dark:border-yellow-800">
                <Zap className="w-3 h-3 fill-current" />
                {quest.reward}
              </div>
            </div>
            <div className="pl-7 relative">
              <Progress value={Math.min((quest.progress / quest.total) * 100, 100)} className="h-2.5" />
              <div className="flex justify-between mt-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                <span>{Math.min(quest.progress, quest.total)} / {quest.total}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
