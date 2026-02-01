import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/common/PageContainer';

import { LearningPath } from '@/components/dashboard/LearningPath';
import { DailyQuestsWidget } from '@/components/dashboard/DailyQuestsWidget';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, Star, GraduationCap, Lightbulb, BookOpen, Coins, RefreshCw } from 'lucide-react';
import { TIPS } from '@/lib/tips';
import { useGamification } from '@/contexts/GamificationContext';
import { LearningTimeline } from '@/components/dashboard/LearningTimeline';
import { cn } from '@/lib/utils';
import { SEO } from '@/components/common/SEO';

export default function DashboardPage() {
  const { overallProgress } = useCurriculumProgress();
  const { gems } = useGamification();

  // Pick a random tip based on the day of the year to be consistent for the day
  const [currentTip, setCurrentTip] = useState(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return TIPS[dayOfYear % TIPS.length];
  });

  const refreshTip = () => {
    const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
    setCurrentTip(randomTip);
  };

  return (
    <PageContainer className="space-y-8 max-w-7xl mx-auto">
      <SEO title="Dashboard" description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo." />



      {/* 2. Statistics Summary Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200/60 transition-all hover:scale-105">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
              <Flame className={cn("w-5 h-5 text-orange-600", overallProgress.streak > 0 && "animate-bounce")} />
            </div>
            <div>
              <span className="text-2xl font-bold block">{overallProgress.streak}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Dias Seguidos</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200/60 transition-all hover:scale-105">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
              <Coins className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <span className="text-2xl font-bold block">{gems}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">PobreCoins</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/60 transition-all hover:scale-105">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-2xl font-bold block">{overallProgress.userLevel}</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Nível</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/60 transition-all hover:scale-105">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <span className="text-2xl font-bold block">{overallProgress.overallPercentage}%</span>
              <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Completo</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Column: Learning Path */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <LearningTimeline />
          </section>
        </div>

        {/* Right Column: Quests & Tips */}
        <div className="space-y-6">
          {/* Daily Quests */}
          <DailyQuestsWidget />

          {/* Tip of the Day */}
          <Card className="glass-card bg-primary/5 border-primary/20 sticky top-24">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <Lightbulb className="w-5 h-5" />
                Dica do Dia
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary/70 hover:text-primary" onClick={refreshTip}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm italic text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-right-4 duration-300" key={currentTip}>
                "{currentTip}"
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}
