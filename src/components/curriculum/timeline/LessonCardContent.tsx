import { Check, Lock, Play, Star } from "lucide-react";
import { CefrBadge } from "@/components/common/CefrBadge";
import { Button } from "@/components/ui/button";
import type { Lesson, Module } from "@/lib/curriculumData";
import { getCEFRLevel } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";

interface LessonCardContentProps {
	module: Module;
	lesson: Lesson;
	status: "locked" | "active" | "completed";
}

export function LessonCardContent({
	module,
	lesson,
	status,
}: LessonCardContentProps) {
	return (
		<>
			{/* Status Icon Area */}
			<div className="flex-shrink-0 relative">
				<div
					className={cn(
						"w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300",
						status === "locked"
							? "bg-muted text-muted-foreground/50 border border-muted-foreground/10"
							: status === "completed"
								? "bg-green-500 text-white shadow-lg shadow-green-500/20"
								: "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
					)}
				>
					{status === "locked" ? (
						<Lock className="w-4 h-4 md:w-5 md:h-5" />
					) : status === "completed" ? (
						<Check className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
					) : (
						<Play className="w-4 h-4 md:w-5 md:h-5 ml-1" /> // Play icon slightly offset for optical balance
					)}
				</div>
			</div>

			{/* Lesson Info Area */}
			<div className="flex-1 min-w-0 py-1">
				<div className="flex items-center gap-2 mb-1">
					<span
						className={cn(
							"text-xs font-bold uppercase tracking-wider",
							status === "locked"
								? "text-muted-foreground/50"
								: "text-primary/80",
						)}
					>
						{lesson.type}
					</span>
					{lesson.estimatedMinutes && (
						<span className="text-xs text-muted-foreground bg-muted px-1.5 rounded-sm">
							{lesson.estimatedMinutes}m
						</span>
					)}
					{status === "completed" && (
						<span className="flex items-center text-amber-500 text-[11px] md:text-xs font-bold ml-auto bg-amber-500/10 px-1.5 py-0.5 rounded-md">
							<Star className="w-3 h-3 mr-0.5 fill-current" />
							{lesson.xpReward} XP
						</span>
					)}
				</div>
				<h4
					className={cn(
						"font-bold text-sm md:text-base leading-tight md:leading-snug line-clamp-2",
						status === "locked" ? "text-muted-foreground" : "text-foreground",
					)}
				>
					{lesson.title_pt}
				</h4>
				<div className="flex items-center gap-2 mt-1">
					<p className="text-xs text-muted-foreground truncate hidden md:block">
						{lesson.description_pt}
					</p>
					<CefrBadge
						level={getCEFRLevel(module.unitId)}
						showDescriptionOnHover={false}
						className="px-1 py-0 text-[11px] sm:text-[11px]"
					/>
				</div>
			</div>

			<div className="flex-shrink-0 ml-2">
				{status === "locked" && (
					<div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-muted-foreground/10">
						<Lock className="w-3 h-3" aria-label="Bloqueado" />
						<span className="hidden sm:inline">BLOQUEADO</span>
					</div>
				)}
				{status === "active" && (
					<Button
						size="sm"
						className="rounded-full shadow-lg shadow-primary/25 animate-pulse font-bold px-4 hover:scale-105 transition-transform"
					>
						<span className="hidden sm:inline">DISPONÍVEL</span>
						<Play
							className="w-3 h-3 sm:ml-1 fill-current"
							aria-label="Iniciar lição"
						/>
					</Button>
				)}
				{status === "completed" && (
					<div className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
						<Check className="w-3 h-3 stroke-[3]" aria-label="Concluído" />
						<span className="hidden sm:inline">CONCLUÍDO</span>
					</div>
				)}
			</div>
		</>
	);
}
