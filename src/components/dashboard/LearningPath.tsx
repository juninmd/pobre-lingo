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

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-12 pb-32">
      <LessonStartModal
          isOpen={isStartModalOpen}
          onClose={() => setIsStartModalOpen(false)}
          onStart={() => { setIsStartModalOpen(false); navigate(startLink); }}
          lesson={selectedLesson}
      />
      {curriculumData.units.map((unit, unitIndex) => (
        <React.Fragment key={unit.id}>
          {unit.sectionTitle && (
            <div className="w-full text-center py-6 border-b border-t bg-muted/30 mb-8 mt-12 first:mt-0 sticky top-16 z-20 backdrop-blur-sm bg-background/80 shadow-sm">
              <h3 className="text-xl font-extrabold uppercase tracking-widest text-primary/80 drop-shadow-sm">
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
            onLessonStart={handleLessonStart}
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
  isLessonCompleted,
  onLessonStart
}: {
  unit: Unit,
  modules: Module[],
  getModuleProgress: (id: string) => any,
  isModuleUnlocked: (module: Module) => boolean,
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean,
  onLessonStart: (lesson: Lesson, link: string) => void
}) {
  const isUnitLocked = modules.every(m => !isModuleUnlocked(m) && m.order > 1);

  // Background color based on difficulty
  const unitColor =
    unit.difficulty === 'basico' ? 'bg-green-500 border-green-600' :
    unit.difficulty === 'intermediario' ? 'bg-blue-500 border-blue-600' :
    'bg-purple-500 border-purple-600';

  // Calculate SVG Path Points
  const nodeHeight = 100; // Vertical distance between nodes
  const pathPoints = useMemo(() => {
    return modules.map((_, index) => {
      const x = Math.sin((index / 2) * Math.PI) * 70; // 70px oscillation
      const y = index * nodeHeight + 40; // Center of the node
      return { x, y };
    });
  }, [modules]);

  const svgPath = useMemo(() => {
    if (pathPoints.length < 2) return '';

    // Construct a smooth curve
    // We assume a coordinate system width of 320px, so center is 160
    let d = `M ${160 + pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];

        // Control points for bezier curve
        const cp1x = 160 + current.x;
        const cp1y = current.y + nodeHeight * 0.5;
        const cp2x = 160 + next.x;
        const cp2y = next.y - nodeHeight * 0.5;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${160 + next.x} ${next.y}`;
    }
    return d;
  }, [pathPoints]);

  const totalHeight = modules.length * nodeHeight;

  return (
    <div className={cn("w-full relative", isUnitLocked && "opacity-70 grayscale")}>

      {/* Unit Header */}
      <div className={cn(
        "sticky top-24 z-30 mb-12 mx-4 rounded-2xl p-4 text-white shadow-xl border-b-[6px] transition-transform hover:scale-[1.02]",
        unitColor
      )}>
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <h2 className="font-extrabold text-xl tracking-tight">{unit.title}</h2>
            <p className="text-white/90 text-sm mt-1 leading-snug font-medium line-clamp-2">{unit.description}</p>
          </div>
          <GuidebookModal unit={unit} trigger={
            <Button variant="ghost" className="text-white hover:bg-white/20 h-12 w-12 rounded-full shrink-0">
              <LucideIcons.BookOpen className="w-8 h-8" />
            </Button>
          }/>
        </div>
      </div>

      {/* Container for Nodes and Path - Constrained to 320px to match SVG coordinates */}
      <div className="relative flex flex-col items-center mx-auto w-full max-w-[320px]" style={{ minHeight: totalHeight }}>

        {/* SVG Path Background */}
        <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible"
            viewBox={`0 0 320 ${totalHeight}`}
            preserveAspectRatio="xMidYMin meet"
        >
            <path
                d={svgPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="12 12"
                className="text-muted-foreground/20 dark:text-muted/30"
            />
        </svg>

        {modules.map((module, index) => {
          const progress = getModuleProgress(module.id);
          const isLocked = !isModuleUnlocked(module);
          const isCompleted = progress.completionPercentage >= 100;
          const isBoss = index === modules.length - 1; // Last module is BOSS

          // Calculate horizontal offset percentage (70px / 320px base width = 21.875%)
          // This ensures nodes align with the SVG which scales with viewBox
          const xOffsetPct = Math.sin((index / 2) * Math.PI) * 21.875;

          const Icon = isBoss ? Crown : getIcon(module.icon);

          // Determine colors based on status
          let nodeColor = module.color || 'bg-gray-400';
          let borderColor = 'border-black/20';

          if (isLocked) {
             nodeColor = 'bg-gray-200 dark:bg-gray-800';
             borderColor = 'border-gray-300 dark:border-gray-700';
          } else if (isCompleted) {
             nodeColor = 'bg-yellow-400'; // Gold for completed
             borderColor = 'border-yellow-600';
          } else if (isBoss) {
             // Special Boss Coloring if active
             nodeColor = 'bg-amber-500';
             borderColor = 'border-amber-700';
          }

          // Determine the link for the next lesson to do
          const firstIncompleteLesson = module.lessons.find(l => !isLessonCompleted(module.id, l.id));
          const targetLesson = firstIncompleteLesson || module.lessons[module.lessons.length - 1];
          const lessonLink = isLocked ? '#' : getLessonLink(module, targetLesson);

          // Determine badge icon for next lesson type
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
            <div
              key={module.id}
              className="absolute flex justify-center w-full"
              style={{
                  transform: `translateX(${xOffsetPct}%)`,
                  top: `${index * nodeHeight}px`
              }}
            >
              <Link
                to={lessonLink}
                onClick={(e) => {
                    if (!isLocked && targetLesson) {
                        e.preventDefault();
                        onLessonStart(targetLesson, lessonLink);
                    }
                }}
                className={cn(
                  `relative z-10 flex items-center justify-center ${nodeSize} rounded-full ${borderSize} transition-all active:scale-95 active:border-b-0 active:translate-y-2`,
                  "shadow-xl",
                  isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 hover:brightness-110",
                  nodeColor,
                  borderColor,
                  isBoss && !isLocked && !isCompleted ? "animate-pulse shadow-yellow-500/50 ring-4 ring-yellow-400/30" : ""
                )}
              >
                 {/* Inner Content */}
                 <div className="relative">
                    {isCompleted ? (
                      <Star className={cn("text-white fill-white animate-pulse", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                    ) : isLocked ? (
                      <Lock className={cn("text-gray-400 dark:text-gray-600", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                    ) : (
                      <Icon className={cn("text-white drop-shadow-md", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                    )}

                    {/* Progress Ring (Simple SVG overlay if active but not complete) */}
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

                 {/* START Bubble for next lesson */}
                 {!isLocked && !isCompleted && targetLesson && progress.completionPercentage === 0 && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none">
                      <div className="bg-white text-primary px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg border-b-4 border-gray-200">
                        START
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 transform" />
                      </div>
                    </div>
                 )}

                 {/* Status Badge (Game, Quiz, etc) */}
                 {BadgeIcon && (
                   <div className="absolute -top-2 -right-2 bg-white text-primary p-2 rounded-full shadow-md border-2 border-primary/10 animate-pulse">
                     <BadgeIcon className="w-5 h-5 fill-primary/10" />
                   </div>
                 )}

                 {/* Floating Label (Tooltip-ish) */}
                 <div className={cn(
                   "absolute -bottom-12 whitespace-nowrap px-3 py-1 bg-background/90 backdrop-blur border rounded-lg text-xs font-bold shadow-sm transition-opacity z-20 pointer-events-none",
                   isLocked ? "opacity-0" : "opacity-100",
                   isBoss ? "text-amber-600 scale-110" : "text-muted-foreground"
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
