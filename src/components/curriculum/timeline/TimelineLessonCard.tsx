import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Module, Lesson } from '@/lib/curriculumData';
import { cn } from '@/lib/utils';
import { Check, Lock, Play, Bookmark } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { getLessonLink } from '@/lib/routes';

export interface TimelineLessonCardProps {
  module: Module;
  lesson: Lesson;
  status: 'locked' | 'active' | 'completed';
  index: number;
  isFirstActive: boolean;
}

export function TimelineLessonCard({ module, lesson, status, isFirstActive }: TimelineLessonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstActive && cardRef.current) {
      // Slight delay to ensure layout stability and provide a "book opening" feel
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isFirstActive]);

  const link = getLessonLink(module, lesson);

  const content = (
    <>
      {/* Status Icon */}
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 transition-all border relative z-10",
        status === 'locked' ? "bg-muted/30 text-muted-foreground/30 border-white/5" :
        status === 'active' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 border-primary/20 ring-2 ring-primary/10" :
        "bg-green-500 text-white shadow-md shadow-green-500/20 border-green-600/20"
      )}>
         {status === 'completed' ? <Check className="w-6 h-6 stroke-[3]" /> :
          status === 'active' ? <Play className="w-6 h-6 ml-0.5 fill-current" /> :
          <Lock className="w-5 h-5" />}
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center z-10 py-1">
         <h4 className={cn("font-bold text-base truncate font-headline", status === 'active' ? "text-primary" : "text-foreground")}>
           {lesson.title_pt}
         </h4>
         <p className="text-sm text-muted-foreground line-clamp-1 font-medium opacity-80">
           {lesson.description_pt}
         </p>
      </div>

      {/* Action / State Indicator */}
      <div className={cn("flex flex-col items-end justify-center gap-1 z-10 pl-2", status !== 'active' && "hidden sm:flex")}>
         {status === 'active' ? (
           <div className={cn(buttonVariants({ size: "sm" }), "h-9 px-5 text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/25 animate-pulse pointer-events-none hover:scale-105 transition-transform")}>
             Começar
           </div>
         ) : status === 'completed' ? (
           <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
              <Check className="w-3.5 h-3.5" />
              <span>Feito</span>
           </div>
         ) : (
           <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground/50 bg-muted/20 px-2 py-1 rounded-md border border-white/5">
              <Lock className="w-3 h-3" />
              <span>Bloqueado</span>
           </div>
         )}
      </div>
    </>
  );

  const wrapperClass = cn(
    "relative flex items-center gap-5 p-4 rounded-3xl border transition-all duration-300 w-full text-left overflow-hidden group/card",
    "backdrop-blur-md",
    status === 'locked'
      ? "bg-card/20 border-white/5 opacity-60 grayscale-[0.5] hover:opacity-80 cursor-not-allowed"
      : "bg-card/60 hover:bg-card/80 border-white/10 hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] shadow-sm hover:shadow-md",
    status === 'active'
      ? "bg-card/90 border-primary/50 shadow-xl shadow-primary/5 ring-1 ring-primary/20 z-10"
      : status === 'completed'
        ? "border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
        : ""
  );

  return (
    <div ref={cardRef} className="relative pl-8 sm:pl-12 py-2">
      {/* Connection Line to Spine */}
      <div className={cn(
        "absolute left-[19px] sm:left-[19px] top-1/2 -translate-y-1/2 w-8 sm:w-10 h-[2px] transition-all duration-300",
        status === 'active' ? "bg-gradient-to-r from-primary to-primary/50" : "bg-border/40"
      )} />

      {/* Spine Dot on the Line */}
      <div className={cn(
        "absolute left-[15px] sm:left-[15px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-500 z-10",
        status === 'completed' ? "bg-green-500 border-green-500 scale-100" :
        status === 'active' ? "bg-primary border-primary shadow-[0_0_15px_rgba(var(--primary),0.6)] scale-125 ring-4 ring-primary/20" :
        "bg-background border-muted-foreground/20 scale-75 group-hover/card:scale-90 group-hover/card:border-muted-foreground/40"
      )} />

      {/* Floating Bookmark Indicator */}
      {isFirstActive && (
        <div className="absolute -left-3 -top-4 z-40 animate-in slide-in-from-top-8 fade-in duration-1000 pointer-events-none">
           <div className="relative animate-bounce">
             <Bookmark className="w-14 h-14 text-primary fill-primary drop-shadow-2xl filter" />
             <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-primary-foreground tracking-tighter">
               AGORA
             </div>
           </div>
        </div>
      )}

      {status === 'locked' ? (
        <div className={wrapperClass} data-testid="locked-lesson-card">{content}</div>
      ) : (
        <Link
          to={link}
          className={wrapperClass}
          data-testid={status === 'active' ? "active-lesson-card" : "completed-lesson-card"}
        >
            {/* Active Glow Effect inside card */}
            {status === 'active' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            )}
            {content}
        </Link>
      )}
    </div>
  );
}
