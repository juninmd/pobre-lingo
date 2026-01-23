import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { curriculumData, Unit, Module, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { cn } from '@/lib/utils';
import { GuidebookModal } from '@/components/curriculum/GuidebookModal';
import { Star, Check, Lock, Trophy, Gamepad2, ScrollText, Play } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getLessonLink } from '@/lib/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Helper to get icon component dynamically
const getIcon = (name: string) => {
  // @ts-ignore
  return LucideIcons[name] || LucideIcons.HelpCircle;
};

export function LearningPath() {
  const { getModuleProgress, isModuleUnlocked, isLessonCompleted } = useCurriculumProgress();

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-12 pb-24">
      {curriculumData.units.map((unit, unitIndex) => (
        <React.Fragment key={unit.id}>
          {unit.sectionTitle && (
            <div className="w-full text-center py-6 border-b border-t bg-muted/30 mb-8 mt-8 first:mt-0">
              <h3 className="text-xl font-extrabold uppercase tracking-widest text-muted-foreground">
                {unit.sectionTitle}
              </h3>
            </div>
          )}
          <UnitSection
            unit={unit}
            modules={curriculumData.modules.filter((m) => m.unitId === unit.id)}
            getModuleProgress={getModuleProgress}
            isModuleUnlocked={isModuleUnlocked}
            isLessonCompleted={isLessonCompleted}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

function UnitSection({
  unit,
  modules,
  getModuleProgress,
  isModuleUnlocked,
  isLessonCompleted
}: {
  unit: Unit,
  modules: Module[],
  getModuleProgress: (id: string) => any,
  isModuleUnlocked: (module: Module) => boolean,
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean
}) {
  const isUnitLocked = modules.every(m => !isModuleUnlocked(m) && m.order > 1);

  // Background color based on difficulty
  const unitColor =
    unit.difficulty === 'basico' ? 'bg-green-500' :
    unit.difficulty === 'intermediario' ? 'bg-blue-500' :
    'bg-purple-500'; // advanced

  const unitBorderColor =
    unit.difficulty === 'basico' ? 'border-green-600' :
    unit.difficulty === 'intermediario' ? 'border-blue-600' :
    'border-purple-600';

  return (
    <div className={cn("w-full relative", isUnitLocked && "opacity-70 grayscale")}>

      {/* Unit Header */}
      <div className={cn(
        "sticky top-20 z-10 mb-8 mx-4 rounded-xl p-4 text-white shadow-lg border-b-4",
        unitColor, unitBorderColor
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg">{unit.title}</h2>
            <p className="text-white/90 text-sm mt-1 leading-snug">{unit.description}</p>
          </div>
          <GuidebookModal unit={unit} trigger={
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
              <LucideIcons.BookOpen className="w-5 h-5" />
            </Button>
          }/>
        </div>
      </div>

      {/* Path Nodes */}
      <div className="relative flex flex-col items-center space-y-4">
        {modules.map((module, index) => {
          const progress = getModuleProgress(module.id);
          const isLocked = !isModuleUnlocked(module);
          const isCompleted = progress.completionPercentage >= 100;

          // Calculate horizontal offset for the "snake" path
          // Sin wave pattern: 0 -> -1 -> 0 -> 1 -> 0
          const xOffset = Math.sin((index / 2) * Math.PI) * 60;

          const Icon = getIcon(module.icon);

          // Determine colors based on status
          let nodeColor = module.color || 'bg-gray-400';
          if (isLocked) nodeColor = 'bg-gray-200 dark:bg-gray-800';
          else if (isCompleted) nodeColor = 'bg-yellow-400 border-yellow-500'; // Gold for completed

          // Determine the link for the next lesson to do
          const firstIncompleteLesson = module.lessons.find(l => !isLessonCompleted(module.id, l.id));
          const targetLesson = firstIncompleteLesson || module.lessons[module.lessons.length - 1];
          const lessonLink = isLocked ? '#' : getLessonLink(module, targetLesson);

          // Determine badge icon for next lesson type
          let BadgeIcon = null;
          if (!isLocked && !isCompleted && targetLesson) {
             if (targetLesson.type === 'quiz') BadgeIcon = Trophy;
             else if (targetLesson.exerciseType === 'matching-pairs' || targetLesson.exerciseType === 'sentence-ordering') BadgeIcon = Gamepad2;
             else if (targetLesson.type === 'grammar') BadgeIcon = ScrollText;
             else if (targetLesson.type === 'speaking') BadgeIcon = LucideIcons.Mic;
          }

          return (
            <div
              key={module.id}
              className="relative flex justify-center w-full"
              style={{ transform: `translateX(${xOffset}px)` }}
            >
              <Link
                to={lessonLink}
                className={cn(
                  "relative z-10 flex items-center justify-center w-20 h-20 rounded-full border-b-8 transition-transform active:scale-95 active:border-b-0 active:translate-y-2",
                  "shadow-xl",
                  isLocked ? "cursor-not-allowed border-gray-300 dark:border-gray-700" : "cursor-pointer hover:scale-110",
                  nodeColor,
                  isLocked ? "" : "border-black/20"
                )}
              >
                 {/* Inner Content */}
                 <div className="relative">
                    {isCompleted ? (
                      <Star className="w-8 h-8 text-white fill-white animate-pulse" />
                    ) : isLocked ? (
                      <Lock className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    ) : (
                      <Icon className="w-8 h-8 text-white" />
                    )}

                    {/* Progress Ring (Simple SVG overlay if active but not complete) */}
                    {!isLocked && !isCompleted && progress.completionPercentage > 0 && (
                      <svg className="absolute -top-10 -left-10 w-28 h-28 pointer-events-none rotate-[-90deg]">
                        <circle
                          r="38" cx="56" cy="56"
                          fill="transparent"
                          stroke="white"
                          strokeWidth="4"
                          strokeDasharray="238"
                          strokeDashoffset={238 - (238 * progress.completionPercentage / 100)}
                          strokeLinecap="round"
                          className="opacity-50"
                        />
                      </svg>
                    )}
                 </div>

                 {/* Status Badge (Game, Quiz, etc) */}
                 {BadgeIcon && (
                   <div className="absolute -top-2 -right-2 bg-white text-primary p-1.5 rounded-full shadow-md border animate-bounce">
                     <BadgeIcon className="w-4 h-4" />
                   </div>
                 )}

                 {/* Floating Label (Tooltip-ish) */}
                 <div className={cn(
                   "absolute -bottom-10 whitespace-nowrap px-3 py-1 bg-background border rounded-lg text-xs font-bold shadow-sm transition-opacity z-20",
                   isLocked ? "opacity-0" : "opacity-100"
                 )}>
                   {module.title_pt}
                 </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
