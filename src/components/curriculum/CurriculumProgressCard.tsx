import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, Lesson, Module } from '@/lib/curriculumData';
import {
  ArrowRight,
  Star,
  Clock,
  Award,
  Play,
  BookOpen,
  Target,
  Trophy,
  Flame,
  Mic,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const lessonTypeConfig = {
  grammar: { label: 'Gramática', icon: BookOpen, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  vocabulary: { label: 'Vocabulário', icon: Star, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  exercise: { label: 'Exercício', icon: Target, color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  reading: { label: 'Leitura', icon: BookOpen, color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
  quiz: { label: 'Quiz', icon: Trophy, color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  culture: { label: 'Cultura', icon: LucideIcons.Globe, color: 'text-teal-600 dark:text-teal-400', bgColor: 'bg-teal-100 dark:bg-teal-900/30' },
  speaking: { label: 'Fala', icon: Mic, color: 'text-rose-600 dark:text-rose-400', bgColor: 'bg-rose-100 dark:bg-rose-900/30' },
};

function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'vocabulary' || lesson.type === 'speaking') {
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
}

export function CurriculumProgressCard() {
  const { isModuleUnlocked, getModuleProgress, overallProgress, totalXP, userLevel, isLessonCompleted } = useCurriculumProgress();

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

  // Módulos por dificuldade
  const basicModules = curriculumData.modules.filter(m => m.difficulty === 'basico');
  const intermediateModules = curriculumData.modules.filter(m => m.difficulty === 'intermediario');
  const advancedModules = curriculumData.modules.filter(m => m.difficulty === 'avancado');

  const basicCompleted = basicModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;
  const intermediateCompleted = intermediateModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;
  const advancedCompleted = advancedModules.filter(m => getModuleProgress(m.id).completionPercentage === 100).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sua Jornada de Aprendizado</CardTitle>
            <CardDescription>
              Progresso estruturado do básico ao avançado
            </CardDescription>
          </div>
          <Link to="/curriculum">
            <Button variant="outline" size="sm">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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

        {/* Progresso por Nível */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Progresso por Nível</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm">Básico</span>
              </div>
              <span className="text-sm font-medium">
                {basicCompleted}/{basicModules.length}
              </span>
            </div>
            <Progress
              value={(basicCompleted / basicModules.length) * 100}
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
                {intermediateCompleted}/{intermediateModules.length}
              </span>
            </div>
            <Progress
              value={(intermediateCompleted / intermediateModules.length) * 100}
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
                {advancedCompleted}/{advancedModules.length}
              </span>
            </div>
            <Progress
              value={(advancedCompleted / advancedModules.length) * 100}
              className="h-2"
            />
          </div>
        </div>

        {/* Próxima Lição */}
        {nextLesson && (
          <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                lessonTypeConfig[nextLesson.lesson.type].bgColor
              )}>
                {React.createElement(
                  lessonTypeConfig[nextLesson.lesson.type].icon,
                  { className: cn("h-5 w-5", lessonTypeConfig[nextLesson.lesson.type].color) }
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm flex items-center gap-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    Continue Aprendendo
                  </h4>
                </div>
                <p className="font-medium text-sm mb-1">{nextLesson.lesson.title_pt}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {nextLesson.module.title_pt} • Lição {nextLesson.lessonIndex + 1} de {nextLesson.module.lessons.length}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {nextLesson.lesson.estimatedMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    +{nextLesson.lesson.xpReward} XP
                  </span>
                  <Badge variant="outline" className="text-[10px]">
                    {lessonTypeConfig[nextLesson.lesson.type].label}
                  </Badge>
                </div>
                <Link to={getLessonLink(nextLesson.module, nextLesson.lesson)}>
                  <Button size="sm" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Começar Lição
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mensagem de Motivação */}
        {overallProgress.completedLessons === 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-200 dark:border-green-800">
            <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Comece Sua Jornada!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Aprenda inglês do básico ao avançado com um currículo estruturado
            </p>
            <Link to="/curriculum">
              <Button size="sm" className="w-full">
                Iniciar Agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Jornada Completa */}
        {!nextLesson && overallProgress.completedLessons > 0 && (
          <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">🎉 Parabéns!</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Você completou toda a jornada de aprendizado!
            </p>
            <Link to="/curriculum">
              <Button size="sm" variant="outline" className="w-full">
                Ver Conquistas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
