import React, { useState } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { MascotGreeting } from '@/components/mascot/MascotGreeting';
import { LearningPath } from '@/components/curriculum/LearningPath';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { SurpriseModal } from '@/components/common/SurpriseModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const userName = "Usuário"; // Could come from auth context
  const [showSurprise, setShowSurprise] = useState(false);

  // Integração com o progresso real
  const { overallProgress } = useCurriculumProgress();
  const progressStats = overallProgress;

  const exercisesCompleted = progressStats.completedLessons;

  return (
    <PageContainer className="px-0 sm:px-6 py-0 sm:py-6">
      <SurpriseModal open={showSurprise} onOpenChange={setShowSurprise} />

      <div className="flex flex-col gap-6">

        {/* Top Section: Mascot & Streak */}
        <div className="px-4 pt-4 sm:pt-0 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div onClick={() => setShowSurprise(true)} className="flex-1 cursor-pointer transition-transform hover:scale-105 active:scale-95">
              <MascotGreeting
                userName={userName}
                className="pointer-events-none" // Pass clicks to parent
                message={exercisesCompleted > 0 ? `Você já completou ${exercisesCompleted} lições! (Clique em mim!)` : "Clique em mim para uma surpresa!"}
              />
            </div>
          </div>

          {/* Daily Challenge Card */}
          <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
             <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="bg-orange-500 p-2 rounded-full text-white">
                      <Flame className="h-5 w-5" />
                   </div>
                   <div>
                      <h3 className="font-bold text-orange-900">Desafio do Dia</h3>
                      <p className="text-sm text-orange-700">Ganhe 50 XP extras hoje!</p>
                   </div>
                </div>
                <Link to="/curriculum">
                   <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Trophy className="h-4 w-4 mr-2" />
                      Começar
                   </Button>
                </Link>
             </CardContent>
          </Card>

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
