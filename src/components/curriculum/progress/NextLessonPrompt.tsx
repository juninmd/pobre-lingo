import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Module, Lesson } from '@/lib/curriculumData';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Star,
  Clock,
  Award,
  Play,
  Trophy,
  Flame,
} from 'lucide-react';

export interface NextLessonPromptProps {
  nextLesson: { module: Module; lesson: Lesson; lessonIndex: number } | null;
  completedLessonsCount: number;
  lessonTypeConfig: Record<string, any>;
  getLessonLink: (module: Module, lesson: Lesson) => string;
}

export function NextLessonPrompt({
  nextLesson,
  completedLessonsCount,
  lessonTypeConfig,
  getLessonLink
}: NextLessonPromptProps) {
  return (
    <>
      {/* Próxima Lição */}
      {nextLesson && (
        <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
              lessonTypeConfig[nextLesson.lesson.type]?.bgColor || "bg-primary/20"
            )}>
              {React.createElement(
                lessonTypeConfig[nextLesson.lesson.type]?.icon || Star,
                { className: cn("h-5 w-5", lessonTypeConfig[nextLesson.lesson.type]?.color || "text-primary") }
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
                  {lessonTypeConfig[nextLesson.lesson.type]?.label || "Lição"}
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
      {completedLessonsCount === 0 && (
        <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-200 dark:border-green-800">
          <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-semibold mb-1">Comece Sua Jornada!</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Aprenda inglês do básico ao avançado com um currículo estruturado
          </p>
          <Link to="/">
            <Button size="sm" className="w-full">
              Iniciar Agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}

      {/* Jornada Completa */}
      {!nextLesson && completedLessonsCount > 0 && (
        <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg border border-yellow-200 dark:border-yellow-700">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h4 className="font-semibold mb-1">🎉 Parabéns!</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Você completou toda a jornada de aprendizado!
          </p>
          <Link to="/">
            <Button size="sm" variant="outline" className="w-full">
              Ver Conquistas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
