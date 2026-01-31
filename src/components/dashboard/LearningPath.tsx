import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { curriculumData, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { cn } from '@/lib/utils';
import { GuidebookModal } from '@/components/curriculum/GuidebookModal';
import { LessonStartModal } from '@/components/curriculum/LessonStartModal';
import { Star, Lock, Trophy, Gamepad2, ScrollText, Mic, Crown, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getLessonLink } from '@/lib/routes';

// Helper to get icon component dynamically
const getIcon = (name: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ElementType>;
  return icons[name] || LucideIcons.HelpCircle;
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
  const nodeHeight = 160; // Increased spacing for better visual separation
  const amplitude = 90;   // Wider curve
  const center = 160;     // Center x of the viewBox (320px width)

  const pathPoints = useMemo(() => {
    return allModules.map((_, index) => {
      // Sine wave pattern
      const x = center + Math.sin((index / 1.5) * Math.PI) * amplitude;
      const y = index * nodeHeight + 80; // Start with padding
      return { x, y };
    });
  }, [allModules]);

  const totalHeight = pathPoints.length * nodeHeight + 250;

  const svgPath = useMemo(() => {
    if (pathPoints.length < 2) return '';

    let d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const current = pathPoints[i];
        const next = pathPoints[i + 1];

        // Bezier control points for smooth curve
        const cp1x = current.x;
        const cp1y = current.y + nodeHeight * 0.5;
        const cp2x = next.x;
        const cp2y = next.y - nodeHeight * 0.5;

        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  }, [pathPoints]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-12 pb-40 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
      <LessonStartModal
          isOpen={isStartModalOpen}
          onClose={() => setIsStartModalOpen(false)}
          onStart={() => { setIsStartModalOpen(false); navigate(startLink); }}
          lesson={selectedLesson}
      />

      {/* Background Continuous Path */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0" style={{ height: totalHeight, maxWidth: '320px' }}>
        <svg
            className="w-full h-full overflow-visible drop-shadow-xl"
            viewBox={`0 0 320 ${totalHeight}`}
            preserveAspectRatio="xMidYMin meet"
        >
            {/* Outline for better contrast */}
            <path
                d={svgPath}
                fill="none"
                stroke="white"
                strokeWidth="24"
                strokeLinecap="round"
                className="opacity-20 dark:opacity-10"
            />
            {/* Main Path */}
            <path
                d={svgPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="20 20"
                className="text-border dark:text-muted/20"
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

          // Dynamic Colors
          let nodeColor = module.color || 'bg-gray-400';
          let borderColor = 'border-black/20';
          let shadowColor = 'shadow-gray-400/50';

          if (isLocked) {
             nodeColor = 'bg-slate-200 dark:bg-slate-800';
             borderColor = 'border-slate-300 dark:border-slate-700';
             shadowColor = '';
          } else if (isCompleted) {
             nodeColor = 'bg-yellow-400';
             borderColor = 'border-yellow-600';
             shadowColor = 'shadow-yellow-400/50';
          } else if (isBoss) {
             nodeColor = 'bg-amber-500';
             borderColor = 'border-amber-700';
             shadowColor = 'shadow-amber-500/50';
          } else {
             // Use module specific color for active state
             shadowColor = `shadow-${module.color.replace('bg-', '')}/50`;
          }

          const firstIncompleteLesson = module.lessons.find(l => !isLessonCompleted(module.id, l.id));
          const targetLesson = firstIncompleteLesson || module.lessons[module.lessons.length - 1];
          const lessonLink = isLocked ? '#' : getLessonLink(module, targetLesson);

          // Badge logic
          let BadgeIcon = null;
          if (!isLocked && !isCompleted && targetLesson) {
             if (targetLesson.type === 'quiz') BadgeIcon = Trophy;
             else if (targetLesson.exerciseType === 'matching-pairs' || targetLesson.exerciseType === 'sentence-ordering') BadgeIcon = Gamepad2;
             else if (targetLesson.gameType) BadgeIcon = Gamepad2;
             else if (targetLesson.type === 'grammar') BadgeIcon = ScrollText;
             else if (targetLesson.type === 'speaking') BadgeIcon = Mic;
          }
          if (isBoss && !isLocked && !isCompleted) BadgeIcon = Sparkles;

          const nodeSize = isBoss ? 'w-28 h-28' : 'w-24 h-24';
          const borderSize = isBoss ? 'border-b-[10px]' : 'border-b-8';

          return (
            <React.Fragment key={module.id}>
              {/* Unit Header (Signpost Style) */}
              {isFirstInUnit && unit && (
                <div
                  className="absolute w-full z-10 px-0 flex flex-col items-center"
                  style={{ top: `${y - 120}px`, left: '50%', transform: 'translateX(-50%)', width: '360px' }}
                >
                   {unit.sectionTitle && (
                      <div className="mb-4 bg-background/80 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
                          {unit.sectionTitle}
                        </h3>
                      </div>
                   )}

                   <div className={cn(
                      "w-full rounded-2xl p-4 text-white shadow-xl border-b-8 flex justify-between items-center gap-4 relative overflow-hidden",
                      unit.difficulty === 'basico' ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-700' :
                      unit.difficulty === 'intermediario' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-700' :
                      'bg-gradient-to-r from-purple-500 to-fuchsia-600 border-purple-700'
                   )}>
                      {/* Background Pattern on Header */}
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

                      <div className="flex-1 min-w-0 z-10">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                             Unidade {unit.order}
                           </span>
                        </div>
                        <h2 className="font-extrabold text-xl leading-tight truncate drop-shadow-md">{unit.title}</h2>
                        <p className="text-white/90 text-sm truncate mt-1 font-medium">{unit.description}</p>
                      </div>

                      <GuidebookModal unit={unit} trigger={
                        <Button variant="ghost" className="relative z-10 text-white hover:bg-white/20 h-12 w-12 rounded-xl shrink-0 p-0 border-2 border-white/20 hover:border-white/50 transition-all hover:scale-105">
                          <LucideIcons.BookOpen className="w-7 h-7" />
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
                    left: `${x - 160}px`
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
                    `relative z-20 flex items-center justify-center ${nodeSize} rounded-full ${borderSize} transition-all duration-300`,
                    "shadow-xl",
                    isLocked ? "cursor-not-allowed grayscale-[0.8] opacity-80" : "cursor-pointer hover:scale-110 active:scale-95 active:border-b-0 active:translate-y-2",
                    nodeColor,
                    borderColor,
                    shadowColor, // Apply colored shadow for glow effect
                    isBoss && !isLocked && !isCompleted ? "animate-pulse ring-4 ring-yellow-400/50" : ""
                  )}
                >
                   {/* Inner Highlight/Gloss */}
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-full pointer-events-none" />

                   <div className="relative z-10">
                      {isCompleted ? (
                        <Star className={cn("text-white fill-white drop-shadow-md", isBoss ? "w-12 h-12" : "w-10 h-10")} />
                      ) : isLocked ? (
                        <Lock className={cn("text-white/50", isBoss ? "w-10 h-10" : "w-8 h-8")} />
                      ) : (
                        <Icon className={cn("text-white drop-shadow-md filter", isBoss ? "w-12 h-12" : "w-10 h-10")} />
                      )}

                      {/* Progress Ring */}
                      {!isLocked && !isCompleted && progress.completionPercentage > 0 && (
                        <svg className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none rotate-[-90deg]">
                          <circle
                            r={isBoss ? "54" : "46"}
                            cx="50%" cy="50%"
                            fill="transparent"
                            stroke="white"
                            strokeWidth="6"
                            strokeDasharray={isBoss ? "340" : "290"}
                            strokeDashoffset={(isBoss ? 340 : 290) * (1 - progress.completionPercentage / 100)}
                            strokeLinecap="round"
                            className="opacity-70 drop-shadow-sm"
                          />
                        </svg>
                      )}
                   </div>

                   {/* Start Bubble */}
                   {!isLocked && !isCompleted && targetLesson && progress.completionPercentage === 0 && (
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 animate-bounce z-30 pointer-events-none">
                        <div className="bg-white text-primary px-5 py-2.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl border-b-4 border-gray-200 transform hover:scale-110 transition-transform">
                          START
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b-4 border-r-4 border-gray-200" style={{ borderWidth: '0 4px 4px 0' }} />
                        </div>
                      </div>
                   )}

                   {/* Floating Badge (e.g. Controller, Scroll) */}
                   {BadgeIcon && (
                     <div className="absolute -top-1 -right-1 bg-white text-primary p-2.5 rounded-2xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] border-2 border-white/50 transform rotate-12">
                       <BadgeIcon className="w-5 h-5 fill-primary/20" />
                     </div>
                   )}

                   {/* Title Tooltip */}
                   <div className={cn(
                     "absolute -bottom-12 whitespace-nowrap px-3 py-1.5 bg-background/95 backdrop-blur-xl border border-white/20 rounded-xl text-[11px] font-bold shadow-lg transition-all z-10 pointer-events-none max-w-[140px] truncate flex items-center justify-center gap-1",
                     isLocked ? "opacity-0 scale-90" : "opacity-100",
                     isBoss ? "text-amber-600 scale-110 -bottom-14" : "text-foreground"
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
