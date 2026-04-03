import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData } from '@/lib/curriculumData';
import { cn } from '@/lib/utils';

export interface QuickCompleteButtonProps {
  moduleId: string;
  lessonId: string;
  xpReward?: number;
  onComplete?: () => void;
  size?: 'sm' | 'default';
}

export function QuickCompleteButton({
  moduleId,
  lessonId,
  xpReward,
  onComplete,
  size = 'default',
}: QuickCompleteButtonProps) {
  const { completeLesson, isLessonCompleted } = useCurriculumProgress();
  const isCompleted = isLessonCompleted(moduleId, lessonId);

  const handleComplete = () => {
    if (!isCompleted) {
      const module = curriculumData.modules.find((m) => m.id === moduleId);
      const lesson = module?.lessons.find((l) => l.id === lessonId);
      const reward = xpReward ?? lesson?.xpReward ?? 50;
      completeLesson(moduleId, lessonId, reward);
      onComplete?.();
    }
  };

  if (isCompleted) {
    return (
      <Badge className="bg-green-500 flex items-center gap-1">
        <CheckCircle2 className={cn("h-3 w-3", size === 'sm' && "h-2 w-2")} />
        {size === 'default' && 'Dominada'}
      </Badge>
    );
  }

  return (
    <Button onClick={handleComplete} size={size} className="bg-green-600 hover:bg-green-700">
      <CheckCircle2 className={cn("mr-1", size === 'sm' ? "h-3 w-3" : "h-4 w-4")} />
      {size === 'default' ? 'Marcar como Dominada' : 'Dominar'}
    </Button>
  );
}
