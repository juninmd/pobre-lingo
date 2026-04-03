import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData } from '@/lib/curriculumData';
import { getLessonLink } from '@/lib/routes';
import { CheckCircle2, Star, BookOpen, ArrowRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
export { QuickCompleteButton } from './progress/QuickCompleteButton';

export interface LessonProgressBarProps {
  moduleId?: string;
  lessonId?: string;
  onComplete?: () => void;
  showCompleteButton?: boolean;
  xpReward?: number;
  className?: string;
}

export function LessonProgressBar({ moduleId, lessonId, onComplete, showCompleteButton = true, xpReward, className }: LessonProgressBarProps) {
  const { completeLesson, isLessonCompleted, getModuleProgress, totalXP, userLevel } = useCurriculumProgress();

  const data = useMemo(() => {
    if (!moduleId || !lessonId) return null;
    const module = curriculumData.modules.find(m => m.id === moduleId);
    if (!module) return null;
    const currentLessonIndex = module.lessons.findIndex(l => l.id === lessonId);
    if (currentLessonIndex === -1) return null;
    return {
      module,
      lesson: module.lessons[currentLessonIndex],
      nextLesson: module.lessons[currentLessonIndex + 1],
    };
  }, [moduleId, lessonId]);

  if (!data) return null;
  const { module, lesson, nextLesson } = data;
  const isCompleted = isLessonCompleted(module.id, lesson.id);
  const moduleProgress = getModuleProgress(module.id);
  const reward = xpReward ?? lesson.xpReward ?? 50;

  const handleComplete = () => {
    if (!isCompleted) {
      completeLesson(module.id, lesson.id, reward);
      onComplete?.();
    }
  };

  const nextLink = nextLesson ? getLessonLink(module, nextLesson) : '/';

  return (
    <Card className={cn("bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20", className)}>
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-background"><BookOpen className="h-3 w-3 mr-1" />{module.title_pt}</Badge>
            <span className="text-muted-foreground">›</span>
            <span className="text-sm font-medium">{lesson.title_pt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1"><Star className="h-3 w-3 text-yellow-500" />{lesson.xpReward} XP</Badge>
            {isCompleted && <Badge className="bg-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Dominada</Badge>}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progresso do Módulo</span>
            <span>{moduleProgress.lessonsCompleted}/{moduleProgress.totalLessons} lições</span>
          </div>
          <Progress value={moduleProgress.completionPercentage} className="h-2" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-yellow-600" /><span>Nível {userLevel}</span>
            <span className="text-muted-foreground">•</span><span>{totalXP} XP total</span>
          </div>
          <div className="flex items-center gap-2">
            {showCompleteButton && !isCompleted && (
              <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700"><CheckCircle2 className="h-4 w-4 mr-2" />Marcar como Dominada</Button>
            )}
            {isCompleted && (
              <Link to={nextLink}>
                {nextLink !== '/' ? (
                  <Button variant="default">Próxima Lição<ArrowRight className="h-4 w-4 ml-2" /></Button>
                ) : moduleProgress.completionPercentage === 100 ? (
                  <Button variant="default" className="bg-yellow-600 hover:bg-yellow-700"><Trophy className="h-4 w-4 mr-2" />Módulo Completo!</Button>
                ) : (
                  <Button variant="outline">Ver Jornada<ArrowRight className="h-4 w-4 ml-2" /></Button>
                )}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
