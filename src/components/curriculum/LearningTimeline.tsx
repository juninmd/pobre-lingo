import React, { Suspense } from 'react';
import { curriculumData } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { BookOpen, Sparkles } from 'lucide-react';

const TimelineUnit = React.lazy(() => import('./timeline/TimelineUnit'));

// Pre-calculate units with modules
const unitsWithModules = curriculumData.units.map(unit => ({
  ...unit,
  modules: curriculumData.modules.filter(m => m.unitId === unit.id)
}));

export function LearningTimeline() {
  const { completedLessons } = useCurriculumProgress();

  const completedLessonsSet = React.useMemo(() => {
    return new Set(completedLessons.map(l => `${l.moduleId}:${l.lessonId}`));
  }, [completedLessons]);

  const firstIncompleteLessonId = React.useMemo(() => {
    for (const unit of curriculumData.units) {
      const unitModules = curriculumData.modules.filter(m => m.unitId === unit.id);
      for (const module of unitModules) {
        for (const lesson of module.lessons) {
          const id = `${module.id}:${lesson.id}`;
          if (!completedLessonsSet.has(id)) {
            return id;
          }
        }
      }
    }
    return null;
  }, [completedLessonsSet]);

  return (
    <div className="w-full min-h-screen pb-32 flex flex-col gap-8">
       {/* Book Title / Intro */}
       <div className="pt-8 px-6 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner ring-1 ring-primary/20 backdrop-blur-sm">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2 font-headline">
            Sua História
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Cada lição é uma página virada rumo à fluência.
          </p>
       </div>

       {unitsWithModules.map(unit => (
         <Suspense key={unit.id} fallback={<div className="h-64 animate-pulse bg-muted/5 rounded-3xl mx-auto max-w-2xl border border-white/5" />}>
           <TimelineUnit
             unit={unit}
             modules={unit.modules}
             completedLessonsSet={completedLessonsSet}
             firstIncompleteLessonId={firstIncompleteLessonId}
           />
         </Suspense>
       ))}

       <div className="text-center py-12 opacity-60">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">O próximo capítulo aguarda...</p>
       </div>
    </div>
  );
}
