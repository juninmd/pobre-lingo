"use client";

import { Flame } from 'lucide-react';
import { useLearningStreak } from '@/hooks/useLearningStreak';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LearningStreakDisplay() {
  const { streak } = useLearningStreak();

  return (
    <Card className="bg-card shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">Sequência de Aprendizado</CardTitle>
        <Flame className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{streak} {streak === 1 ? 'dia' : 'dias'}</div>
        <p className="text-xs text-muted-foreground">
          {streak > 0 ? "Continue assim para não perder sua sequência!" : "Comece hoje sua jornada de aprendizado!"}
        </p>
      </CardContent>
    </Card>
  );
}
