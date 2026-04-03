import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, Lesson, Module } from '@/lib/curriculumData';
import { Play, Clock, Star, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLessonLink } from '@/lib/routes';
import { lessonTypeConfig } from '@/lib/lessonTypeConfig';
import { CompletedCurriculumCard } from './progress/CompletedCurriculumCard';

export function NextLessonCard() {
  const { isLessonCompleted, isModuleUnlocked, getModuleProgress } = useCurriculumProgress();

  const findNextLesson = (): { module: Module; lesson: Lesson; lessonIndex: number } | null => {
    for (const module of curriculumData.modules) {
      if (!isModuleUnlocked(module)) continue;
      for (let i = 0; i < module.lessons.length; i++) {
        if (!isLessonCompleted(module.id, module.lessons[i].id)) {
          return { module, lesson: module.lessons[i], lessonIndex: i };
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();
  if (!nextLesson) return <CompletedCurriculumCard />;

  const { module, lesson, lessonIndex } = nextLesson;
  const config = lessonTypeConfig[lesson.type as keyof typeof lessonTypeConfig] || lessonTypeConfig.grammar;
  const LessonIcon = config.icon;
  const moduleProgress = getModuleProgress(module.id);
  const link = getLessonLink(module, lesson);

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
      <div className="absolute top-2 right-2 opacity-20">
        <Sparkles className="h-24 w-24 text-primary" />
      </div>

      <CardHeader className="pb-2 relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>Continue sua jornada</span>
        </div>
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className={cn("p-3 rounded-xl", config.bgColor)}>
            <LessonIcon className={cn("h-6 w-6", config.color)} />
          </div>
          <div>
            <span className="block">{lesson.title_pt}</span>
            <span className="text-sm font-normal text-muted-foreground">
              {module.title_pt} • Lição {lessonIndex + 1} de {module.lessons.length}
            </span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <p className="text-muted-foreground">{lesson.description_pt}</p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.estimatedMinutes} min
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            +{lesson.xpReward} XP
          </Badge>
          <Badge variant="outline" className={config.color}>
            {config.label}
          </Badge>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progresso do Módulo</span>
            <span className="font-medium">{moduleProgress.completionPercentage}%</span>
          </div>
          <Progress value={moduleProgress.completionPercentage} className="h-2" />
        </div>

        <Link to={link} className="block">
          <Button size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90">
            <Play className="h-5 w-5 mr-2" />
            Começar Lição
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
