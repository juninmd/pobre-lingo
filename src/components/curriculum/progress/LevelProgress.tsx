import React from 'react';
import { Progress } from '@/components/ui/progress';

export interface LevelProgressProps {
  basicCompleted: number;
  basicTotal: number;
  intermediateCompleted: number;
  intermediateTotal: number;
  advancedCompleted: number;
  advancedTotal: number;
}

export function LevelProgress({
  basicCompleted,
  basicTotal,
  intermediateCompleted,
  intermediateTotal,
  advancedCompleted,
  advancedTotal
}: LevelProgressProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">Progresso por Nível</h4>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm">Básico</span>
          </div>
          <span className="text-sm font-medium">
            {basicCompleted}/{basicTotal}
          </span>
        </div>
        <Progress
          value={basicTotal > 0 ? (basicCompleted / basicTotal) * 100 : 0}
          className="h-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-sm">Intermediário</span>
          </div>
          <span className="text-sm font-medium">
            {intermediateCompleted}/{intermediateTotal}
          </span>
        </div>
        <Progress
          value={intermediateTotal > 0 ? (intermediateCompleted / intermediateTotal) * 100 : 0}
          className="h-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm">Avançado</span>
          </div>
          <span className="text-sm font-medium">
            {advancedCompleted}/{advancedTotal}
          </span>
        </div>
        <Progress
          value={advancedTotal > 0 ? (advancedCompleted / advancedTotal) * 100 : 0}
          className="h-2"
        />
      </div>
    </div>
  );
}
