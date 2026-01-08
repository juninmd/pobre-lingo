import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, Lesson, Module } from '@/lib/curriculumData';
import {
  Play,
  Clock,
  Star,
  BookOpen,
  Target,
  Trophy,
  Sparkles,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const lessonTypeConfig = {
  grammar: { label: 'Gramática', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  vocabulary: { label: 'Vocabulário', icon: Star, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  exercise: { label: 'Exercício', icon: Target, color: 'text-green-600', bgColor: 'bg-green-100' },
  reading: { label: 'Leitura', icon: BookOpen, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  quiz: { label: 'Quiz', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
};

export function NextLessonCard() {
  const { isLessonCompleted, isModuleUnlocked, getModuleProgress, totalXP, userLevel } = useCurriculumProgress();

  // Encontrar a próxima lição não completada
  const findNextLesson = (): { module: Module; lesson: Lesson; lessonIndex: number } | null => {
    for (const module of curriculumData.modules) {
      if (!isModuleUnlocked(module)) continue;

      for (let i = 0; i < module.lessons.length; i++) {
        const lesson = module.lessons[i];
        if (!isLessonCompleted(module.id, lesson.id)) {
          return { module, lesson, lessonIndex: i };
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  // Se todas as lições estão completas
  if (!nextLesson) {
    return (
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-yellow-100">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Parabéns! 🎉</CardTitle>
              <CardDescription>Você completou toda a jornada!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Continue praticando para manter suas habilidades afiadas.
          </p>
          <div className="flex gap-2">
            <Link to="/exercises/sentence-ordering">
              <Button variant="outline">Praticar Exercícios</Button>
            </Link>
            <Link to="/rules">
              <Button variant="outline">Revisar Gramática</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { module, lesson, lessonIndex } = nextLesson;
  const config = lessonTypeConfig[lesson.type];
  const LessonIcon = config.icon;
  const moduleProgress = getModuleProgress(module.id);

  // Construir link para a lição
  const getLessonLink = (): string => {
    if (lesson.exerciseType) {
      return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
    }
    if (lesson.type === 'vocabulary') {
      return `/vocabulary/${module.id}/${lesson.id}`;
    }
    if (lesson.type === 'quiz') {
      return `/quiz/${module.id}/${lesson.id}`;
    }
    if (lesson.type === 'grammar' && lesson.grammarRuleIds?.length) {
      return `/rules?module=${module.id}&lesson=${lesson.id}&ruleIds=${lesson.grammarRuleIds.join(',')}`;
    }
    if (lesson.type === 'reading') {
      return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
    }
    return `/rules?module=${module.id}&lesson=${lesson.id}`;
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20 overflow-hidden relative">
      {/* Sparkle decoration */}
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

        {/* Progresso do módulo */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progresso do Módulo</span>
            <span className="font-medium">{moduleProgress.completionPercentage}%</span>
          </div>
          <Progress value={moduleProgress.completionPercentage} className="h-2" />
        </div>

        <Link to={getLessonLink()} className="block">
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
