import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Target, Zap } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  progress: number;
  total: number;
  reward: number;
  completed: boolean;
}

export function DailyQuestsWidget() {
  // Mock data - in a real app, this would come from a context/backend
  const quests: Quest[] = [
    { id: 1, title: 'Complete 1 Lesson', progress: 0, total: 1, reward: 10, completed: false },
    { id: 2, title: 'Earn 50 XP', progress: 35, total: 50, reward: 20, completed: false },
    { id: 3, title: 'Get 5 Perfect Combos', progress: 5, total: 5, reward: 15, completed: true },
  ];

  return (
    <Card className="w-full border-2 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            Missões Diárias
          </CardTitle>
          <span className="text-xs text-muted-foreground font-mono">12h 30m restantes</span>
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
               <Progress value={(quest.progress / quest.total) * 100} className="h-2" />
               <div className="flex justify-between mt-1 text-[10px] text-muted-foreground uppercase font-bold">
                 <span>{quest.progress} / {quest.total}</span>
               </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
