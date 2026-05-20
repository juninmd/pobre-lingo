import React, { Suspense } from 'react';
import { curriculumData, Module } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { BookOpen, Sparkles } from 'lucide-react';

const TimelineModule = React.lazy(() => import('./timeline/TimelineModule').then(m => ({ default: m.TimelineModule })));

export interface LearningTimelineProps {
  modules?: Module[];
}

export function LearningTimeline({ modules = curriculumData.modules }: LearningTimelineProps) {
  const { completedLessons } = useCurriculumProgress();

  const completedLessonsSet = React.useMemo(() => {
    return new Set(completedLessons.map(l => `${l.moduleId}:${l.lessonId}`));
  }, [completedLessons]);

  const firstIncompleteLessonId = React.useMemo(() => {
    for (const module of modules) {
      for (const lesson of module.lessons) {
        const id = `${module.id}:${lesson.id}`;
        if (!completedLessonsSet.has(id)) {
          return id;
        }
      }
    }
    return null;
  }, [completedLessonsSet, modules]);

  return (
    <div className="w-full min-h-screen pb-32 flex flex-col gap-8">
       {/* Book Title / Intro */}
       <div className="pt-8 px-6 text-center max-w-xl mx-auto z-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner ring-1 ring-primary/20 backdrop-blur-sm">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2 font-headline">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Pronto para continuar sua jornada no PobreLingo?
          </p>
       </div>

       <div className="relative pt-8 w-full max-w-2xl mx-auto">
          {/* The Spine - Continuous Line (Absolute container aligned with content) */}
          <div className="absolute inset-0 px-4 sm:px-8 z-0 pointer-events-none">
             {/* Main Spine Line with gradient for depth */}
             <div className="absolute left-[3.25rem] sm:left-[6.25rem] top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/80 via-primary/40 to-border/20" />
          </div>

          {/* Chapters Background (Glassmorphism) */}
          <div className="absolute inset-x-0 top-0 bottom-16 bg-card/10 dark:bg-card/5 backdrop-blur-xl rounded-[2.5rem] -z-10 border border-white/5 mx-4 sm:mx-0 shadow-sm" />

          <div className="relative px-4 sm:px-8 pb-24 pt-12">
             <div className="flex flex-col gap-12 relative z-10">
                {modules.map(module => (
                  <Suspense key={module.id} fallback={<div className="h-64 animate-pulse bg-muted/5 rounded-3xl border border-white/5" />}>
                    <TimelineModule
                      module={module}
                      completedLessonsSet={completedLessonsSet}
                      firstIncompleteLessonId={firstIncompleteLessonId}
                    />
                  </Suspense>
                ))}
             </div>
          </div>
       </div>

       <div className="text-center py-12 opacity-60 z-10">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">O próximo capítulo aguarda...</p>
       </div>
    </div>
  );
}
