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
    <PageContainer className="space-y-3 sm:space-y-6 lg:space-y-8 max-w-7xl mx-auto">
      <SEO title="Dashboard" description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo." />



      {/* 2. Statistics Summary Cards */}
      <section className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4">
        <Card className="glass-card bg-gradient-to-br from-orange-50/80 to-red-50/80 dark:from-orange-950/30 dark:to-red-950/30 border-orange-200/60 dark:border-orange-800/40 transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
          <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-orange-100 to-orange-200/80 dark:from-orange-900/60 dark:to-orange-800/50 rounded-xl sm:rounded-2xl shadow-sm">
              <Flame className={cn("w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-600 dark:text-orange-400", overallProgress.streak > 0 && "animate-bounce")} />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold block text-orange-600 dark:text-orange-400 bg-gradient-to-br from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text [.bg-clip-text_&]:text-transparent">{overallProgress.streak}</span>
              <span className="text-[0.625rem] sm:text-xs text-muted-foreground/80 uppercase font-bold tracking-wider mt-0.5 block">Dias Seguidos</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-yellow-50/80 to-amber-50/80 dark:from-yellow-950/30 dark:to-amber-950/30 border-yellow-200/60 dark:border-yellow-800/40 transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
          <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-yellow-100 to-yellow-200/80 dark:from-yellow-900/60 dark:to-yellow-800/50 rounded-xl sm:rounded-2xl shadow-sm">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-600 dark:text-yellow-400 fill-current" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold block text-yellow-600 dark:text-yellow-400 bg-gradient-to-br from-yellow-600 to-amber-600 dark:from-yellow-400 dark:to-amber-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums">{gems}</span>
              <span className="text-[0.625rem] sm:text-xs text-muted-foreground/80 uppercase font-bold tracking-wider mt-0.5 block">PobreCoins</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/60 dark:border-blue-800/40 transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
          <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-100 to-blue-200/80 dark:from-blue-900/60 dark:to-blue-800/50 rounded-xl sm:rounded-2xl shadow-sm">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold block text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums">{overallProgress.userLevel}</span>
              <span className="text-[0.625rem] sm:text-xs text-muted-foreground/80 uppercase font-bold tracking-wider mt-0.5 block">Nível</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200/60 dark:border-green-800/40 transition-all hover:scale-[1.02] active:scale-[0.98] touch-manipulation">
          <CardContent className="p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2.5">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-green-100 to-green-200/80 dark:from-green-900/60 dark:to-green-800/50 rounded-xl sm:rounded-2xl shadow-sm">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold block text-green-600 dark:text-green-400 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text [.bg-clip-text_&]:text-transparent tabular-nums">{overallProgress.overallPercentage}%</span>
              <span className="text-[0.625rem] sm:text-xs text-muted-foreground/80 uppercase font-bold tracking-wider mt-0.5 block">Completo</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">

        {/* Left Column: Learning Path */}
        <div className="lg:col-span-2 space-y-3 sm:space-y-6 lg:space-y-8">
          <section>
            <LearningTimeline />
          </section>
        </div>

        {/* Right Column: Quests & Tips */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          {/* Daily Quests */}
          <DailyQuestsWidget />

          {/* Tip of the Day */}
          <Card className="glass-card bg-primary/5 border-primary/20 sticky top-20 sm:top-24">
            <CardHeader className="pb-2 sm:pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-primary">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Dica do Dia</span>
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 text-primary/70 hover:text-primary active:scale-95 transition-transform" onClick={refreshTip}>
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-right-4 duration-300" key={currentTip}>
                "{currentTip}"
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </PageContainer>
  );
}
