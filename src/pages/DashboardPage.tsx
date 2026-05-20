import React, { useState } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { curriculumData } from '@/lib/curriculumData';

import { DailyQuestsWidget } from '@/components/dashboard/DailyQuestsWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { TIPS } from '@/lib/tips';
import { LearningTimeline } from '@/components/curriculum/LearningTimeline';
import { SEO } from '@/components/common/SEO';

export default function DashboardPage() {
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
    <PageContainer className="space-y-6 lg:space-y-8 max-w-7xl mx-auto">
      <SEO title="Dashboard" description="Acompanhe seu progresso e continue sua jornada de aprendizado no PobreLingo." />

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

        {/* Left Column: Learning Timeline */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <section>
            <LearningTimeline modules={curriculumData.modules} />
          </section>
        </div>

        {/* Right Column: Quests & Tips */}
        <div className="space-y-6 md:space-y-8">
          {/* Daily Quests */}
          <DailyQuestsWidget />

          {/* Tip of the Day */}
          <Card className="glass-card bg-primary/5 border-primary/30 shadow-md sticky top-20 sm:top-24 card-hover">
            <CardHeader className="pb-2 sm:pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm sm:text-base md:text-lg flex items-center gap-2 text-primary">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse-subtle" />
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
