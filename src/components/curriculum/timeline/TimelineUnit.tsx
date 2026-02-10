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
    <div className="pb-24">
      {/* Unit Header (Book Part) */}
      <div className="sticky top-[4rem] z-20 py-4 backdrop-blur-xl bg-background/80 border-b border-border/10 shadow-sm mb-12 transition-all">
        <div className="container max-w-2xl mx-auto flex items-center gap-4 px-4 md:px-0">
           <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg border border-primary/20 backdrop-blur-md shadow-inner">
              {unit.order}
           </div>
           <div>
             <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary/80">
               Unidade {unit.order}
             </h2>
             <p className="text-lg sm:text-xl font-bold text-foreground leading-none mt-0.5">
               {unit.title}
             </p>
           </div>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto pl-4 md:pl-8 pr-4">
         {/* The Spine - Continuous Line */}
         <div className="absolute left-[2.125rem] md:left-[3.125rem] top-0 bottom-0 w-1 bg-border/40 rounded-full z-0" />

         <div className="flex flex-col gap-12 relative z-10">
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
