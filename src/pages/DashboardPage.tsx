import React from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { MascotGreeting } from '@/components/mascot/MascotGreeting';
import { LearningPath } from '@/components/curriculum/LearningPath';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';

export default function DashboardPage() {
  const userName = "Usuário"; // Could come from auth context

  return (
    <PageContainer className="px-0 sm:px-6 py-0 sm:py-6">
      <div className="flex flex-col gap-6">

        {/* Top Section: Mascot & Streak */}
        <div className="px-4 pt-4 sm:pt-0 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <MascotGreeting userName={userName} className="flex-1" />
          </div>

          {/* Mobile Streak Display (visible mostly on mobile due to sidebar on desktop) */}
          <div className="lg:hidden">
            <LearningStreakDisplay variant="compact" />
          </div>
        </div>

        {/* The Main Learning Path */}
        <div className="mt-2">
            <LearningPath />
        </div>

      </div>
    </PageContainer>
  );
}
