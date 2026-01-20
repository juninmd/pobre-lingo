import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { MascotGreeting } from '@/components/mascot/MascotGreeting';
import { LearningPath } from '@/components/curriculum/LearningPath';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { DailyQuestsWidget } from '@/components/dashboard/DailyQuestsWidget';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { NextLessonCard } from '@/components/curriculum/NextLessonCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Trophy, Star, GraduationCap, Lightbulb, BookOpen } from 'lucide-react';
import { TIPS } from '@/lib/tips';

export default function DashboardPage() {
  const { overallProgress } = useCurriculumProgress();

  // Pick a random tip based on the day of the year to be consistent for the day
  const tipOfTheDay = useMemo(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    return TIPS[dayOfYear % TIPS.length];
  }, []);

  return (
    <PageContainer className="px-4 sm:px-6 py-6 space-y-8 max-w-7xl mx-auto">

      {/* 1. Friendly Greeting Section */}
      <section className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex-1 w-full">
           <MascotGreeting
             userName="Estudante" // Friendly default
             message="Pronto para aprender algo novo hoje?"
           />
        </div>
      </section>

      {/* 2. Statistics Summary Cards */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-orange-200/60">
           <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <span className="text-2xl font-bold block">{overallProgress.streak}</span>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Sequência</span>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border-yellow-200/60">
           <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <span className="text-2xl font-bold block">{overallProgress.totalXP}</span>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">XP Total</span>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/60">
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

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/60">
           <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <span className="text-2xl font-bold block">{overallProgress.overallPercentage}%</span>
                <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Jornada</span>
              </div>
           </CardContent>
        </Card>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Column: Recommendations & Journey */}
        <div className="lg:col-span-2 space-y-8">

          {/* 3. Daily Recommendation */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Recomendação de Estudo
            </h2>
            <NextLessonCard />
          </section>

          {/* 4. The Journey */}
          <section>
             <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Sua Jornada
            </h2>
             <LearningPath />
          </section>
        </div>

        {/* Right Column: Quests & Tips */}
        <div className="space-y-6">
           {/* Daily Quests */}
           <DailyQuestsWidget />

           {/* 5. Tip of the Day */}
           <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
               <CardTitle className="text-lg flex items-center gap-2 text-primary">
                 <Lightbulb className="w-5 h-5" />
                 Dica do Dia
               </CardTitle>
             </CardHeader>
             <CardContent>
               <p className="text-sm italic text-muted-foreground">
                 "{tipOfTheDay}"
               </p>
             </CardContent>
           </Card>
        </div>

      </div>
    </PageContainer>
  );
}
