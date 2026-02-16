import React from 'react';
import { Unit, Module } from '@/lib/curriculumData';
import { TimelineModule } from './TimelineModule';

export interface TimelineUnitProps {
  unit: Unit;
  modules: Module[];
  completedLessonsSet: Set<string>;
  firstIncompleteLessonId: string | null;
}

export default function TimelineUnit({ unit, modules, completedLessonsSet, firstIncompleteLessonId }: TimelineUnitProps) {
  return (
    <div className="relative pt-4">
      {/* The Spine - Continuous Line (Absolute container aligned with content) */}
      <div className="absolute inset-0 max-w-2xl mx-auto px-4 sm:px-8 z-0 pointer-events-none">
         <div className="absolute left-[2.25rem] sm:left-[3.25rem] top-0 bottom-0 w-1 bg-border/30" />
      </div>

      {/* Unit Background (Glassmorphism) */}
      <div className="absolute inset-x-0 top-0 bottom-16 bg-card/10 dark:bg-card/5 backdrop-blur-md rounded-[2.5rem] -z-10 border border-white/5 mx-4 sm:mx-0" />

      {/* Unit Header (Book Part) */}
      <div
        className="sticky top-[4rem] z-20 py-6 backdrop-blur-xl bg-background/60 border-b border-border/5 mb-12 transition-all rounded-t-[2.5rem] animate-in fade-in slide-in-from-bottom-4 duration-700"
        data-testid="chapter-header"
      >
        <div className="container max-w-2xl mx-auto flex items-center gap-5 px-6">
           <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary font-black text-xl border border-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(var(--primary),0.15)] transform rotate-[-3deg]">
              {unit.order}
           </div>
           <div className="flex flex-col">
             <h2 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 mb-0.5">
               Unidade {unit.order}
             </h2>
             <p className="text-xl md:text-2xl font-black text-foreground tracking-tight leading-none font-headline">
               {unit.title}
             </p>
           </div>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-8 pb-24">
         <div className="flex flex-col gap-16 relative z-10">
            {modules.map(module => (
              <TimelineModule
                key={module.id}
                module={module}
                completedLessonsSet={completedLessonsSet}
                firstIncompleteLessonId={firstIncompleteLessonId}
              />
            ))}
         </div>
      </div>
    </div>
  );
}
