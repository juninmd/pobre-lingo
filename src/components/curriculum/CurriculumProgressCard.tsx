import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { curriculumData, Lesson, Module } from '@/lib/curriculumData';
import { ArrowRight, Star, BookOpen, Target, Trophy, Mic } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

import { ProgressStats } from './progress/ProgressStats';
import { LevelProgress } from './progress/LevelProgress';
import { NextLessonPrompt } from './progress/NextLessonPrompt';

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
  const nextLesson = React.useMemo(() => {
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
  }, [isModuleUnlocked, isLessonCompleted]);


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
          <Link to="/">
            <Button variant="outline" size="sm">
              Ver Tudo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProgressStats
          userLevel={userLevel}
          totalXP={totalXP}
          overallProgress={overallProgress}
        />

        <LevelProgress
          basicCompleted={basicCompleted}
          basicTotal={basicModules.length}
          intermediateCompleted={intermediateCompleted}
          intermediateTotal={intermediateModules.length}
          advancedCompleted={advancedCompleted}
          advancedTotal={advancedModules.length}
        />

        <NextLessonPrompt
          nextLesson={nextLesson}
          completedLessonsCount={overallProgress.completedLessons}
          lessonTypeConfig={lessonTypeConfig}
          getLessonLink={getLessonLink}
        />
      </CardContent>
    </Card>
  );
}
