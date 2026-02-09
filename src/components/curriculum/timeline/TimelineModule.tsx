import React from 'react';
import { Module } from '@/lib/curriculumData';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { TimelineLessonCard } from './TimelineLessonCard';

const getIcon = (name: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ElementType>;
  return icons[name] || LucideIcons.HelpCircle;
};

export interface TimelineModuleProps {
  module: Module;
  completedLessonsSet: Set<string>;
  firstIncompleteLessonId: string | null;
}

export function TimelineModule({ module, completedLessonsSet, firstIncompleteLessonId }: TimelineModuleProps) {
  const icon = getIcon(module.icon);

  return (
    <div className="relative pb-12 last:pb-0">
       {/* Chapter Header Linked to Spine */}
       <div className="flex items-center gap-6 mb-12 relative z-10">
          {/* Chapter Icon on Spine */}
          <div className="absolute left-[1.25rem] -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-background border-4 border-muted shadow-sm z-10 transition-transform hover:scale-110 duration-300">
             <span className="font-black text-sm text-muted-foreground">{module.order}</span>
          </div>

          <div className="ml-14 flex items-center gap-4 p-4 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md shadow-sm w-full transition-all hover:bg-card/60">
            <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl shadow-inner ring-1 ring-white/20",
                module.color,
                "text-white"
            )}>
                {React.createElement(icon, { className: "w-6 h-6 drop-shadow-md" })}
            </div>
            <div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                   Capítulo {module.order}
                 </span>
                 <h3 className="text-lg font-bold text-foreground leading-tight">
                   {module.title_pt}
                 </h3>
            </div>
          </div>
       </div>

       {/* Lessons List */}
       <div className="flex flex-col gap-6">
          {module.lessons.map((lesson, idx) => {
             const isCompleted = completedLessonsSet.has(`${module.id}:${lesson.id}`);
             let status: 'locked' | 'active' | 'completed' = 'locked';
             let isFirstActive = false;

             if (isCompleted) {
               status = 'completed';
             } else if (`${module.id}:${lesson.id}` === firstIncompleteLessonId) {
               status = 'active';
               isFirstActive = true;
             }

             return (
               <TimelineLessonCard
                 key={lesson.id}
                 module={module}
                 lesson={lesson}
                 index={idx}
                 status={status}
                 isFirstActive={isFirstActive}
               />
             );
          })}
       </div>
    </div>
  );
}
