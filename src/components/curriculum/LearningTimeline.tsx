import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { curriculumData, Unit, Module, Lesson } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';
import {
  Check,
  Lock,
  Play,
  Star,
  BookOpen,
  Trophy,
  ChevronRight,
  Sparkles,
  Bookmark
} from 'lucide-react';

// --- Helpers ---

const getIcon = (name: string) => {
  const icons = LucideIcons as unknown as Record<string, React.ElementType>;
  return icons[name] || LucideIcons.HelpCircle;
};

function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.gameType) {
    return `/games/${lesson.gameType}?module=${module.id}&lesson=${lesson.id}`;
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
  if (lesson.type === 'culture') {
    return `/rules?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'speaking') {
     return `/exercises/conversation?module=${module.id}&lesson=${lesson.id}`;
  }
  return `/rules?module=${module.id}&lesson=${lesson.id}`;
}

// --- Components ---

interface LessonCardProps {
  module: Module;
  lesson: Lesson;
  status: 'locked' | 'active' | 'completed';
  index: number;
  isFirstActive: boolean;
}

function LessonCard({ module, lesson, status, index, isFirstActive }: LessonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstActive && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }, [isFirstActive]);

  const link = getLessonLink(module, lesson);

  // Card Content
  const content = (
    <>
        {/* Status Icon */}
        <div className={cn(
          "flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all border",
          status === 'locked' ? "bg-muted text-muted-foreground border-transparent" :
          status === 'active' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary/20" :
          "bg-green-500 text-white shadow-md shadow-green-500/20 border-green-600/20"
        )}>
           {status === 'completed' ? <Check className="w-6 h-6 stroke-[3]" /> :
            status === 'active' ? <Play className="w-6 h-6 ml-0.5 fill-current" /> :
            <Lock className="w-5 h-5" />}
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
           <div className="flex items-center gap-2">
              <h4 className={cn("font-bold text-base truncate", status === 'active' && "text-primary")}>
                {lesson.title_pt}
              </h4>
           </div>
           <p className="text-sm text-muted-foreground line-clamp-1">
             {lesson.description_pt}
           </p>
        </div>

        {/* Action / XP */}
        <div className={cn(
          "flex flex-col items-end justify-center gap-1",
          status !== 'active' && "hidden sm:flex"
        )}>
           {status === 'active' ? (
             <div className="px-3 sm:px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse">
               Começar
             </div>
           ) : (
             <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground/70">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{lesson.xpReward} XP</span>
             </div>
           )}
        </div>
    </>
  );

  const wrapperClass = cn(
    "relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 w-full text-left",
    "backdrop-blur-md", // Glassmorphism base
    status === 'locked'
      ? "bg-muted/10 border-dashed border-muted-foreground/10 opacity-60 grayscale cursor-not-allowed"
      : "hover:scale-[1.02] active:scale-[0.98]",
    status === 'active'
      ? "bg-card/80 border-primary/50 shadow-xl shadow-primary/5 ring-1 ring-primary/20 z-10"
      : status === 'completed'
        ? "bg-card/40 border-green-500/10 hover:bg-green-500/5 hover:border-green-500/20"
        : ""
  );

  return (
    <div ref={cardRef} className="relative pl-10 md:pl-12 group py-2">

      {/* Spine Connection Line */}
      <div className={cn(
        "absolute left-[19px] md:left-[19px] top-1/2 -translate-y-1/2 w-8 h-0.5 transition-all duration-300",
        status === 'active' ? "bg-primary" : "bg-border"
      )} />

      {/* Spine Dot */}
      <div className={cn(
        "absolute left-[15px] md:left-[15px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 z-10",
        status === 'completed' ? "bg-green-500 border-green-500" :
        status === 'active' ? "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] scale-125" :
        "bg-background border-muted-foreground/30"
      )} />

      {/* Bookmark */}
      {isFirstActive && (
        <div className="absolute -left-2 top-0 z-30 animate-in fade-in slide-in-from-left-4 duration-700">
           <div className="relative">
             <Bookmark className="w-10 h-10 text-primary fill-primary drop-shadow-xl filter" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-[10px] font-black text-primary-foreground">
               LER
             </div>
           </div>
        </div>
      )}

      {status === 'locked' ? (
        <div className={wrapperClass}>
            {content}
        </div>
      ) : (
        <Link to={link} className={wrapperClass}>
            {content}
        </Link>
      )}
    </div>
  );
}

interface ModuleSectionProps {
  module: Module;
  completedLessonsSet: Set<string>;
  firstIncompleteLessonId: string | null;
}

function ModuleSection({ module, completedLessonsSet, firstIncompleteLessonId }: ModuleSectionProps) {
  const Icon = getIcon(module.icon);

  return (
    <div className="relative pb-12 last:pb-0">

       {/* Chapter Header Linked to Spine */}
       <div className="flex items-center gap-6 mb-8 relative">
          {/* Chapter Icon on Spine */}
          <div className="absolute left-[1.125rem] -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-xl bg-background border-4 border-muted shadow-sm z-10">
             <span className="font-black text-sm text-muted-foreground">{module.order}</span>
          </div>

          <div className="ml-14 flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border backdrop-blur-sm shadow-sm w-full">
            <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-xl shadow-inner",
                module.color,
                "text-white"
            )}>
                <Icon className="w-6 h-6" />
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
       <div className="space-y-6">
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
               <LessonCard
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

interface UnitGroupProps {
  unit: Unit;
  modules: Module[];
  completedLessonsSet: Set<string>;
  firstIncompleteLessonId: string | null;
}

function UnitGroup({ unit, modules, completedLessonsSet, firstIncompleteLessonId }: UnitGroupProps) {
  return (
    <div className="mb-20">
      {/* Unit Header (Book Part) */}
      <div className="sticky top-[4.5rem] z-20 py-4 backdrop-blur-xl bg-background/80 border-b mb-10 transition-all">
        <div className="container max-w-2xl mx-auto flex items-center gap-4">
           <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg border border-primary/20">
              {unit.order}
           </div>
           <div>
             <h2 className="text-sm font-black uppercase tracking-widest text-primary">
               Unidade {unit.order}
             </h2>
             <p className="text-lg font-bold text-foreground leading-none mt-0.5">
               {unit.title}
             </p>
           </div>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto pl-4 md:pl-8 pr-4">
         {/* The Spine */}
         <div className="absolute left-[2.125rem] md:left-[3.125rem] top-0 bottom-0 w-1 bg-gradient-to-b from-muted via-muted-foreground/20 to-transparent rounded-full" />

         <div className="space-y-4">
            {modules.map(module => (
              <ModuleSection
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


// Pre-calculate units with modules to avoid re-calculation on every render
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
    <div className="w-full min-h-screen pb-32">
       {/* Book Title / Intro */}
       <div className="pt-8 pb-12 px-6 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4 shadow-inner ring-1 ring-primary/20">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-2">
            Sua História
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Cada lição é uma página virada rumo à fluência.
          </p>
       </div>

       {unitsWithModules.map(unit => (
         <UnitGroup
           key={unit.id}
           unit={unit}
           modules={unit.modules}
           completedLessonsSet={completedLessonsSet}
           firstIncompleteLessonId={firstIncompleteLessonId}
         />
       ))}

       <div className="text-center py-24 opacity-60">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
          <p className="font-medium text-muted-foreground">O próximo capítulo aguarda...</p>
       </div>
    </div>
  );
}
