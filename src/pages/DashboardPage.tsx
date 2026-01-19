import React, { useMemo } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { MascotGreeting } from '@/components/mascot/MascotGreeting';
import { LearningPath } from '@/components/curriculum/LearningPath';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { DailyQuestsWidget } from '@/components/dashboard/DailyQuestsWidget';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';

export default function DashboardPage() {
  const userName = "Usuário"; // Could come from auth context

  // Integração com o progresso real
  const { overallProgress } = useCurriculumProgress();
  const progressStats = overallProgress;

  const exercisesCompleted = progressStats.completedLessons;

  return (
    <PageContainer className="px-0 sm:px-6 py-0 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

        {/* Main Column: Path */}
        <div className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
          {/* Top Section: Mascot & Streak */}
          <div className="px-4 pt-4 sm:pt-0 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <MascotGreeting
                userName={userName}
                className="flex-1"
                message={exercisesCompleted > 0 ? `Você já completou ${exercisesCompleted} lições!` : undefined}
              />
            </div>

            {/* Mobile Streak Display */}
            <div className="lg:hidden">
              <LearningStreakDisplay variant="compact" />
              <div className="mt-4">
                 <DailyQuestsWidget />
              </div>
            </div>
          </div>

          {/* The Main Learning Path */}
          <div className="mt-2">
              <LearningPath />
          </div>
        </div>

        {/* Right Sidebar (Desktop Only) */}
        <div className="hidden lg:flex flex-col w-[350px] gap-6 order-1 lg:order-2 sticky top-6 h-fit pt-4">
            <LearningStreakDisplay variant="default" />
            <DailyQuestsWidget />
        </div>

      </div>
    </PageContainer>
  );
}
