import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { curriculumData, Unit, Module, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { cn } from '@/lib/utils';
import { GuidebookModal } from '@/components/curriculum/GuidebookModal';
import { LessonStartModal } from '@/components/curriculum/LessonStartModal';
import { Star, Lock, Trophy, Gamepad2, ScrollText, Mic, Crown, Feather, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLessonLink } from '@/lib/routes';

// Helper to get icon component dynamically
const getIcon = (name: string) => {
  // @ts-ignore
  return LucideIcons[name] || LucideIcons.HelpCircle;
};

export function LearningPath() {
  const { getModuleProgress, isModuleUnlocked, isLessonCompleted } = useCurriculumProgress();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = React.useState<Lesson | null>(null);
  const [startLink, setStartLink] = React.useState<string>('');
  const [isStartModalOpen, setIsStartModalOpen] = React.useState(false);

  const handleLessonStart = (lesson: Lesson, link: string) => {
    setSelectedLesson(lesson);
    setStartLink(link);
    setIsStartModalOpen(true);
  };

  // 1. Flatten all modules into a single list for continuous path calculation
  const allModules = useMemo(() => {
    return curriculumData.units.flatMap(unit =>
      curriculumData.modules.filter(m => m.unitId === unit.id)
    );
  }, []);

  // 2. Calculate Geometry
  const nodeHeight = 140; // Increased spacing for better header fit
  const amplitude = 80;   // Curve width
  const center = 160;     // Center x of the viewBox (320px width)

  const pathPoints = useMemo(() => {
    return allModules.map((_, index) => {
      // Sine wave pattern: x = center + sin(index) * amp
      const x = center + Math.sin((index / 1.5) * Math.PI) * amplitude;
      const y = index * nodeHeight + 60; // Start with some padding
      return { x, y };
    });
  }, [allModules]);

  const totalHeight = pathPoints.length * nodeHeight + 200;

  const svgPath = useMemo(() => {
    if (pathPoints.length < 2) return '';

    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];

        // Bezier control points
        const cp1x = current.x;
        const cp1y = current.y + nodeHeight * 0.5;
        const cp2x = next.x;
        const cp2y = next.y - nodeHeight * 0.5;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  }, [pathPoints]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-12 pb-32 relative">
      <LessonStartModal
          isOpen={isStartModalOpen}
          onClose={() => setIsStartModalOpen(false)}
          onStart={() => { setIsStartModalOpen(false); navigate(startLink); }}
          lesson={selectedLesson}
      />

      {/* Background Continuous Path */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{ height: totalHeight, maxWidth: '320px' }}>
        <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 320 ${totalHeight}`}
            preserveAspectRatio="xMidYMin meet"
        >
            <path
                d={svgPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray="16 16"
                className="text-muted-foreground/20 dark:text-muted/30"
            />
        </svg>
      </div>

      {/* Render Modules and Headers */}
      <div className="relative w-full max-w-[320px]" style={{ height: totalHeight }}>
        {allModules.map((module, index) => {
          const unit = curriculumData.units.find(u => u.id === module.unitId);
          const isFirstInUnit = index === 0 || allModules[index - 1].unitId !== module.unitId;
          const { x, y } = pathPoints[index];

          // Logic for Module Node
          const progress = getModuleProgress(module.id);
          const isLocked = !isModuleUnlocked(module);
          const isCompleted = progress.completionPercentage >= 100;
          const isBoss = index === allModules.length - 1;

          const Icon = isBoss ? Crown : getIcon(module.icon);

          let nodeColor = module.color || 'bg-gray-400';
          let borderColor = 'border-black/20';

          if (isLocked) {
             nodeColor = 'bg-gray-200 dark:bg-gray-800';
             borderColor = 'border-gray-300 dark:border-gray-700';
          } else if (isCompleted) {
             nodeColor = 'bg-yellow-400';
             borderColor = 'border-yellow-600';
          } else if (isBoss) {
             nodeColor = 'bg-amber-500';
             borderColor = 'border-amber-700';
          }

          const firstIncompleteLesson = module.lessons.find(l => !isLessonCompleted(module.id, l.id));
          const targetLesson = firstIncompleteLesson || module.lessons[module.lessons.length - 1];
          const lessonLink = isLocked ? '#' : getLessonLink(module, targetLesson);

          let BadgeIcon = null;
          if (!isLocked && !isCompleted && targetLesson) {
             if (targetLesson.type === 'quiz') BadgeIcon = Trophy;
             else if (targetLesson.exerciseType === 'matching-pairs' || targetLesson.exerciseType === 'sentence-ordering') BadgeIcon = Gamepad2;
             else if (targetLesson.gameType) BadgeIcon = Gamepad2;
             else if (targetLesson.type === 'grammar') BadgeIcon = ScrollText;
             else if (targetLesson.type === 'speaking') BadgeIcon = Mic;
          }
          if (isBoss && !isLocked && !isCompleted) BadgeIcon = Sparkles;

          const nodeSize = isBoss ? 'w-24 h-24' : 'w-20 h-20';
          const borderSize = isBoss ? 'border-b-[10px]' : 'border-b-8';

          return (
            <React.Fragment key={module.id}>
              {/* Unit Header if start of unit */}
              {isFirstInUnit && unit && (
                <div
                  className="absolute w-full z-10 px-4"
                  style={{ top: `${y - 100}px` }} // Position above the first node
                >
                   {unit.sectionTitle && (
                      <div className="w-full text-center py-4 mb-4 border-b border-t bg-background/50 backdrop-blur-sm">
                        <h3 className="text-lg font-black uppercase tracking-widest text-primary/80 drop-shadow-sm">
                          {unit.sectionTitle}
                        </h3>
                      </div>
                   )}
                   <div className={cn(
                      "rounded-xl p-3 text-white shadow-lg border-b-4 flex justify-between items-center gap-3",
                      unit.difficulty === 'basico' ? 'bg-green-500 border-green-600' :
                      unit.difficulty === 'intermediario' ? 'bg-blue-500 border-blue-600' :
                      'bg-purple-500 border-purple-600'
                   )}>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-lg leading-tight truncate">{unit.title}</h2>
                        <p className="text-white/80 text-xs truncate">{unit.description}</p>
                      </div>
                      <GuidebookModal unit={unit} trigger={
                        <Button variant="ghost" className="text-white hover:bg-white/20 h-10 w-10 rounded-full shrink-0 p-0">
                          <LucideIcons.BookOpen className="w-6 h-6" />
                        </Button>
                      }/>
                   </div>
                </div>
              )}

              {/* Module Node */}
              <div
                className="absolute flex justify-center w-full pointer-events-auto"
                style={{
                    top: `${y}px`,
                    // We use left/transform for x positioning to align with SVG coordinate space
                    left: `${x - 160}px` // x is 0..320, we need to center it relative to parent center
                }}
              >
                <Link
                  to={lessonLink}
                  onClick={(e) => {
                      if (!isLocked && targetLesson) {
                          e.preventDefault();
                          handleLessonStart(targetLesson, lessonLink);
                      }
                  }}
                  className={cn(
                    `relative z-20 flex items-center justify-center ${nodeSize} rounded-full ${borderSize} transition-all active:scale-95 active:border-b-0 active:translate-y-2`,
                    "shadow-xl",
                    isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 hover:brightness-110",
                    nodeColor,
                    borderColor,
                    isBoss && !isLocked && !isCompleted ? "animate-pulse shadow-yellow-500/50 ring-4 ring-yellow-400/30" : ""
                  )}
                >
                   <div className="relative">
                      {isCompleted ? (
                        <Star className={cn("text-white fill-white animate-pulse", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                      ) : isLocked ? (
                        <Lock className={cn("text-gray-400 dark:text-gray-600", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                      ) : (
                        <Icon className={cn("text-white drop-shadow-md", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                      )}

                      {!isLocked && !isCompleted && progress.completionPercentage > 0 && (
                        <svg className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none rotate-[-90deg]">
                          <circle
                            r={isBoss ? "46" : "38"}
                            cx="50%" cy="50%"
                            fill="transparent"
                            stroke="white"
                            strokeWidth="5"
                            strokeDasharray={isBoss ? "288" : "238"}
                            strokeDashoffset={(isBoss ? 288 : 238) * (1 - progress.completionPercentage / 100)}
                            strokeLinecap="round"
                            className="opacity-60"
                          />
                        </svg>
                      )}
                   </div>

                   {!isLocked && !isCompleted && targetLesson && progress.completionPercentage === 0 && (
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-30 pointer-events-none">
                        <div className="bg-white text-primary px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg border-b-4 border-gray-200">
                          START
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 transform" />
                        </div>
                      </div>
                   )}

                   {BadgeIcon && (
                     <div className="absolute -top-2 -right-2 bg-white text-primary p-2 rounded-full shadow-md border-2 border-primary/10 animate-pulse">
                       <BadgeIcon className="w-5 h-5 fill-primary/10" />
                     </div>
                   )}

                   <div className={cn(
                     "absolute -bottom-10 whitespace-nowrap px-3 py-1 bg-background/90 backdrop-blur border rounded-lg text-[10px] font-bold shadow-sm transition-opacity z-20 pointer-events-none max-w-[120px] truncate",
                     isLocked ? "opacity-0" : "opacity-100",
                     isBoss ? "text-amber-600 scale-110" : "text-muted-foreground"
                   )}>
                     {module.title_pt}
                   </div>
                </Link>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
