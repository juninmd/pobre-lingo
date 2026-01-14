import React from 'react';
import { Link } from 'react-router-dom';
import { curriculumData, Unit, Module, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { GuidebookModal } from './GuidebookModal';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import { Check, Lock, Star, Play } from 'lucide-react';

// Helper to get icon component dynamically
const getIcon = (name: string) => {
  // @ts-ignore - Dynamic access to Lucide icons
  return LucideIcons[name] || LucideIcons.HelpCircle;
};

// Helper to construct lesson links (duplicated from CurriculumPage for now)
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
}

function ModuleNode({ module, index, status, progress, completedLessonsSet }: ModuleNodeProps) {
  const Icon = getIcon(module.icon);

  // Calculate horizontal offset for the "path" look
  const offset = Math.sin(index * 0.8) * 60;

  const baseColor = module.color.replace('bg-', '');

  let ringColor = 'ring-muted';
  let bgColor = 'bg-muted';
  let iconColor = 'text-muted-foreground';

  if (status === 'completed') {
    bgColor = module.color;
    ringColor = `ring-${baseColor}`;
    iconColor = 'text-white';
  } else if (status === 'active') {
    bgColor = module.color;
    ringColor = `ring-${baseColor}`;
    iconColor = 'text-white';
  }

  // Determine the link to the next lesson
  const nextLesson = module.lessons.find(l => !completedLessonsSet.has(`${module.id}:${l.id}`));
  const targetLink = nextLesson
    ? getLessonLink(module, nextLesson)
    : getLessonLink(module, module.lessons[0]); // Fallback to first if all done (review)

  return (
    <div
      className="relative flex flex-col items-center z-10 my-2"
      style={{ transform: `translateX(${offset}px)` }}
    >
      <Link
        to={status !== 'locked' ? targetLink : '#'}
        className={cn(
          "relative flex items-center justify-center w-24 h-24 rounded-full border-b-[6px] transition-all duration-200",
          status === 'locked'
            ? "bg-muted border-muted-foreground/20 cursor-not-allowed grayscale"
            : `${bgColor} border-black/20 cursor-pointer hover:scale-105 active:border-b-0 active:translate-y-1.5 shadow-xl`
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
              className="text-yellow-400 stroke-current drop-shadow-md"
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
        <div className="relative z-10 flex flex-col items-center justify-center">
          {status === 'completed' ? (
             <Check className="w-10 h-10 text-white stroke-[4]" />
          ) : status === 'locked' ? (
             <Lock className="w-8 h-8 text-muted-foreground/50" />
          ) : (
             <Icon className={cn("w-10 h-10", iconColor)} />
          )}
        </div>

        {/* Stars decoration for completed */}
        {status === 'completed' && (
          <div className="absolute 0 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1.5 border-4 border-background shadow-sm z-20">
            <Star className="w-4 h-4 fill-current" />
          </div>
        )}

        {/* Start bubble for active */}
        {status === 'active' && progress === 0 && (
            <div className="absolute -top-3 -right-3 animate-bounce">
                <div className="bg-white dark:bg-zinc-800 text-primary text-[10px] font-bold px-2 py-1 rounded-full shadow-md border border-primary/20 uppercase">
                    Start
                </div>
            </div>
        )}
      </Link>

      {/* Label */}
      <div className="mt-3">
        <span className={cn(
          "text-sm font-bold block text-center max-w-[120px] leading-tight drop-shadow-sm",
          status === 'locked' ? "text-muted-foreground" : "text-foreground"
        )}>
          {module.title_pt}
        </span>
      </div>
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

  return (
    <div className="w-full mb-8">
      <div className={cn(
        "sticky top-0 z-30 py-4 px-4 mb-8 flex items-center justify-between rounded-b-xl shadow-sm border-b backdrop-blur-xl transition-colors",
        unitColor.replace('bg-', 'bg-opacity-10 dark:bg-opacity-20 border-')
      )}>
        <div className="flex flex-col">
          <h2 className="text-lg font-extrabold text-foreground uppercase tracking-wider">{unit.title}</h2>
          <p className="text-xs text-muted-foreground/80 line-clamp-1 font-medium">{unit.description}</p>
        </div>
        <GuidebookModal unit={unit} />
      </div>

      <div className="flex flex-col items-center space-y-2 relative pb-8">
        {modules.map((module, idx) => (
          <ModuleNode
            key={module.id}
            module={module}
            index={idx}
            status={getModuleStatus(module.id)}
            progress={getModuleProgressValue(module.id)}
            completedLessonsSet={completedLessonsSet}
          />
        ))}
      </div>
    </div>
  );
}

export function LearningPath() {
  const { isModuleUnlocked, getModuleProgress, completedLessons } = useCurriculumProgress();

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
    <div className="w-full max-w-md mx-auto min-h-screen">
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

      {/* Footer spacer */}
      <div className="h-32" />
    </div>
  );
}
