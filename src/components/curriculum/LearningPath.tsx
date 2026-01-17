import React from 'react';
import { Link } from 'react-router-dom';
import { curriculumData, Unit, Module, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { GuidebookModal } from './GuidebookModal';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Check, Lock, Star, ChevronDown, Trophy } from 'lucide-react';

// Helper to get icon component dynamically
const getIcon = (name: string) => {
  // @ts-ignore - Dynamic access to Lucide icons
  return LucideIcons[name] || LucideIcons.HelpCircle;
};

// Helper to construct lesson links
function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'vocabulary') {
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

interface ModuleNodeProps {
  module: Module;
  index: number;
  status: 'locked' | 'active' | 'completed';
  progress: number;
  completedLessonsSet: Set<string>;
  totalInUnit: number;
}

function ModuleNode({ module, index, status, progress, completedLessonsSet, totalInUnit }: ModuleNodeProps) {
  const Icon = getIcon(module.icon);

  // Responsive Zigzag: tighter on mobile (50px)
  const isLast = index === totalInUnit - 1;
  const offset = isLast ? 0 : Math.sin(index * 0.7) * 50;

  const baseColor = module.color.replace('bg-', '');

  let ringColor = 'ring-muted';
  let bgColor = 'bg-muted';
  let iconColor = 'text-muted-foreground';
  let shadowClass = '';

  if (status === 'completed') {
    bgColor = module.color;
    ringColor = `ring-${baseColor}`;
    iconColor = 'text-white';
    shadowClass = `shadow-lg shadow-${baseColor}/40`;
  } else if (status === 'active') {
    bgColor = module.color;
    ringColor = `ring-${baseColor}`;
    iconColor = 'text-white';
    shadowClass = `shadow-xl shadow-${baseColor}/50 ring-4 ring-${baseColor}/20`;
  }

  // Determine the link to the next lesson
  const nextLesson = module.lessons.find(l => !completedLessonsSet.has(`${module.id}:${l.id}`));
  const targetLink = nextLesson
    ? getLessonLink(module, nextLesson)
    : getLessonLink(module, module.lessons[0]); // Fallback to first if all done (review)

  return (
    <div
      className="relative flex flex-col items-center z-10 my-3 transition-transform duration-500 ease-in-out"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {/* "Start Here" Floating Tooltip with Bounce Animation */}
      {status === 'active' && progress === 0 && (
          <div className="absolute -top-12 z-50 animate-bounce">
              <div className="bg-white dark:bg-zinc-800 text-primary text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-primary/20 uppercase tracking-wider flex flex-col items-center">
                  COMEÇAR
                  <div className="w-2 h-2 bg-white dark:bg-zinc-800 border-r border-b border-primary/20 rotate-45 absolute -bottom-1"></div>
              </div>
          </div>
      )}

      <Link
        to={status !== 'locked' ? targetLink : '#'}
        className={cn(
          "relative flex items-center justify-center w-[5.5rem] h-[5.5rem] rounded-full border-b-[6px] transition-all duration-200 group",
          status === 'locked'
            ? "bg-muted border-muted-foreground/20 cursor-not-allowed grayscale opacity-80"
            : `${bgColor} border-black/20 cursor-pointer hover:scale-110 active:border-b-0 active:translate-y-1.5 ${shadowClass}`
        )}
      >
        {/* Progress Circular Overlay for Active Module */}
        {status === 'active' && progress > 0 && (
          <svg className="absolute w-[6.5rem] h-[6.5rem] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
            <circle
              className="text-black/10 stroke-current"
              strokeWidth="8"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
            <circle
              className="text-white/90 stroke-current drop-shadow-md"
              strokeWidth="8"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
            />
          </svg>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 group-hover:-translate-y-1">
          {status === 'completed' ? (
             <Check className="w-10 h-10 text-white stroke-[4] drop-shadow-md" />
          ) : status === 'locked' ? (
             <Lock className="w-8 h-8 text-muted-foreground/50" />
          ) : (
             <Icon className={cn("w-10 h-10 drop-shadow-sm", iconColor)} />
          )}
        </div>

        {/* Shine effect for active/completed */}
        {status !== 'locked' && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        )}

        {/* Stars decoration for completed */}
        {status === 'completed' && (
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-1.5 border-2 border-background shadow-sm z-20 animate-in zoom-in duration-300">
            <Star className="w-3 h-3 fill-current" />
          </div>
        )}
      </Link>

      {/* Label */}
      {status !== 'locked' && (
        <div className="mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className={cn(
            "text-sm font-bold block text-center max-w-[140px] leading-tight drop-shadow-sm bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md",
            "text-foreground"
          )}>
            {module.title_pt}
          </span>
        </div>
      )}
    </div>
  );
}

interface UnitSectionProps {
  unit: Unit;
  modules: Module[];
  getModuleStatus: (id: string) => 'locked' | 'active' | 'completed';
  getModuleProgressValue: (id: string) => number;
  completedLessonsSet: Set<string>;
}

function UnitSection({ unit, modules, getModuleStatus, getModuleProgressValue, completedLessonsSet }: UnitSectionProps) {
  const unitColor = modules[0]?.color || 'bg-primary';
  const isLocked = modules.every(m => getModuleStatus(m.id) === 'locked');

  // Calculate coordinates for SVG path
  const getCoordinates = (index: number) => {
    // If it's the last one, center it (looks like a finish line)
    if (index === modules.length - 1) return { x: 0, y: index * 120 + 50 };

    const x = Math.sin(index * 0.7) * 50;
    const y = index * 120 + 50;
    return { x, y };
  };

  const pathData = modules.map((_, index) => {
    const { x, y } = getCoordinates(index);
    return `${index === 0 ? 'M' : 'L'} ${x + 200} ${y}`;
  }).join(' ');

  return (
    <div className={cn("w-full mb-8 relative", isLocked && "opacity-60 grayscale")}>
      <div className={cn(
        "sticky top-0 z-30 py-4 px-4 mb-8 flex items-center justify-between rounded-b-2xl shadow-sm border-b backdrop-blur-md transition-all duration-300",
        unitColor.replace('bg-', 'bg-opacity-90 dark:bg-opacity-90 border-'),
        isLocked ? "bg-muted border-muted-foreground/20" : "bg-background/80"
      )} style={{
          backgroundColor: isLocked ? undefined : undefined, // Tailwind handles it but style fallback if needed
      }}>
        <div className="flex flex-col">
          <h2 className="text-lg font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
            {unit.title}
            {unit.difficulty === 'avancado' && <Trophy className="w-4 h-4 text-yellow-500" />}
          </h2>
          <p className="text-xs text-muted-foreground/80 line-clamp-1 font-medium">{unit.description}</p>
        </div>
        <GuidebookModal unit={unit} />
      </div>

      <div className="relative w-full max-w-[400px] mx-auto min-h-[200px]">
        {/* SVG Path Background */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
           <defs>
             <linearGradient id={`grad-${unit.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" className="text-primary" />
               <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" className="text-primary" />
             </linearGradient>
           </defs>
           <path
             d={pathData}
             fill="none"
             stroke="currentColor"
             strokeWidth="10"
             className={cn("text-muted-foreground/10", !isLocked && "text-primary/10")}
             strokeLinecap="round"
             strokeLinejoin="round"
           />
           {/* Dotted path on top */}
           <path
             d={pathData}
             fill="none"
             stroke="currentColor"
             strokeWidth="4"
             className={cn("text-muted/40", !isLocked && "text-primary/20")}
             strokeDasharray="8 12"
             strokeLinecap="round"
             strokeLinejoin="round"
           />
        </svg>

        <div className="flex flex-col items-center space-y-2 relative z-10 pb-12">
          {modules.map((module, idx) => (
            <ModuleNode
              key={module.id}
              module={module}
              index={idx}
              totalInUnit={modules.length}
              status={getModuleStatus(module.id)}
              progress={getModuleProgressValue(module.id)}
              completedLessonsSet={completedLessonsSet}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function LearningPath() {
  const { getModuleProgress, completedLessons } = useCurriculumProgress();

  const completedLessonsSet = React.useMemo(() => {
    return new Set(completedLessons.map(l => `${l.moduleId}:${l.lessonId}`));
  }, [completedLessons]);

  const getStatus = (moduleId: string) => {
    const progress = getModuleProgress(moduleId);
    if (progress.completionPercentage === 100) return 'completed';
    if (progress.unlocked) return 'active';
    return 'locked';
  };

  const getProgressVal = (moduleId: string) => {
    return getModuleProgress(moduleId).completionPercentage;
  };

  const unitsWithModules = curriculumData.units.map(unit => {
    return {
      ...unit,
      modules: curriculumData.modules.filter(m => m.unitId === unit.id)
    };
  });

  return (
    <div className="w-full max-w-md mx-auto min-h-screen pb-24">
      {unitsWithModules.map(unit => (
        <UnitSection
          key={unit.id}
          unit={unit}
          modules={unit.modules}
          getModuleStatus={getStatus}
          getModuleProgressValue={getProgressVal}
          completedLessonsSet={completedLessonsSet}
        />
      ))}
    </div>
  );
}
