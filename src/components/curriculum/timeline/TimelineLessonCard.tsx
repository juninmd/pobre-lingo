import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Module, Lesson } from '@/lib/curriculumData';
import { cn } from '@/lib/utils';
import { Check, Lock, Play, Star, Bookmark } from 'lucide-react';
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
      // Delay scrolling to allow for initial render and animations
      const timer = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isFirstActive]);

  const link = getLessonLink(module, lesson);

  const content = (
    <>
      {/* Status Icon */}
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-all border relative z-10",
        status === 'locked' ? "bg-muted/50 text-muted-foreground/50 border-white/5" :
        status === 'active' ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 border-primary/20" :
        "bg-green-500 text-white shadow-md shadow-green-500/20 border-green-600/20"
      )}>
         {status === 'completed' ? <Check className="w-6 h-6 stroke-[3]" /> :
          status === 'active' ? <Play className="w-6 h-6 ml-0.5 fill-current" /> :
          <Lock className="w-5 h-5" />}
      </div>

      {/* Text Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center z-10">
         <h4 className={cn("font-bold text-base truncate", status === 'active' && "text-primary")}>
           {lesson.title_pt}
         </h4>
         <p className="text-sm text-muted-foreground line-clamp-1">
           {lesson.description_pt}
         </p>
      </div>

      {/* Action / XP */}
      <div className={cn("flex flex-col items-end justify-center gap-1 z-10", status !== 'active' && "hidden sm:flex")}>
         {status === 'active' ? (
           <div className={cn(buttonVariants({ size: "sm" }), "h-8 px-4 text-xs font-bold uppercase tracking-wider shadow-sm animate-pulse pointer-events-none")}>
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
    "relative flex items-center gap-6 p-4 rounded-2xl border transition-all duration-300 w-full text-left overflow-hidden",
    "backdrop-blur-md",
    status === 'locked'
      ? "bg-muted/5 border-white/5 opacity-60 grayscale cursor-not-allowed"
      : "bg-card/40 hover:bg-card/60 border-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]",
    status === 'active'
      ? "bg-card/80 border-primary/50 shadow-xl shadow-primary/5 ring-1 ring-primary/20 z-10"
      : status === 'completed'
        ? "border-green-500/20 bg-green-500/5 hover:bg-green-500/10"
        : ""
  );

  return (
    <div ref={cardRef} className="relative pl-10 md:pl-12 group py-2">
      {/* Connection Line to Spine */}
      <div className={cn(
        "absolute left-[19px] md:left-[19px] top-1/2 -translate-y-1/2 w-8 h-0.5 transition-all duration-300",
        status === 'active' ? "bg-primary" : "bg-border/50"
      )} />

      {/* Spine Dot on the Line */}
      <div className={cn(
        "absolute left-[15px] md:left-[15px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 z-10",
        status === 'completed' ? "bg-green-500 border-green-500 scale-100" :
        status === 'active' ? "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)] scale-150 ring-4 ring-primary/20" :
        "bg-background border-muted-foreground/30 scale-75"
      )} />

      {/* Floating Bookmark Indicator */}
      {isFirstActive && (
        <div className="absolute -left-3 -top-3 z-40 animate-in slide-in-from-top-8 fade-in duration-1000 pointer-events-none">
           <div className="relative animate-bounce">
             <Bookmark className="w-12 h-12 text-primary fill-primary drop-shadow-2xl filter" />
             <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-black text-primary-foreground tracking-tighter">
               AGORA
             </div>
           </div>
        </div>
      )}

      {status === 'locked' ? (
        <div className={wrapperClass}>{content}</div>
      ) : (
        <Link to={link} className={wrapperClass}>
            {/* Active Glow Effect inside card */}
            {status === 'active' && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-50" />
            )}
            {content}
        </Link>
      )}
    </div>
  );
}
