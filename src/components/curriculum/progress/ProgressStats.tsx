import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
import { CurriculumProgress } from '@/lib/progressTypes';

export interface ProgressStatsProps {
  userLevel: number;
  totalXP: number;
  overallProgress: CurriculumProgress;
}

export function ProgressStats({ userLevel, totalXP, overallProgress }: ProgressStatsProps) {
  return (
    <>
      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Nível</p>
          <p className="text-2xl font-bold flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-600" />
            {userLevel}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">XP Total</p>
          <p className="text-2xl font-bold">{totalXP}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Progresso</p>
          <p className="text-2xl font-bold">{overallProgress.overallPercentage}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Módulos</p>
          <p className="text-2xl font-bold">
            {overallProgress.completedModules}/{overallProgress.totalModules}
          </p>
        </div>
      </div>

      {/* Barra de Progresso Geral */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progresso Geral</span>
          <span className="text-sm text-muted-foreground">
            {overallProgress.completedLessons} de {overallProgress.totalLessons} lições
          </span>
        </div>
        <Progress value={overallProgress.overallPercentage} className="h-3" />
      </div>
    </>
  );
}
