import * as LucideIcons from "lucide-react";
import { Check, ChevronRight, Lock, Play, Star } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import type { Lesson, Module } from "@/lib/curriculumData";
import { getCEFRLevel } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/lessonLink";
import { cn } from "@/lib/utils";

const _getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.HelpCircle;
};

interface LessonCardProps {
	module: Module;
	lesson: Lesson;
	status: "locked" | "active" | "completed";
	isFirstActive: boolean;
}

export function LessonCard({
	module,
	lesson,
	status,
	isFirstActive,
}: LessonCardProps) {
	const link = getLessonLink(module, lesson);
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isFirstActive && cardRef.current) {
			const timer = setTimeout(() => {
				cardRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isFirstActive]);

	const content = (
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
							"text-[10px] md:text-xs font-bold uppercase tracking-wider",
							status === "locked"
								? "text-muted-foreground/50"
								: "text-primary/80",
						)}
					>
						{lesson.type}
					</span>
					{lesson.estimatedMinutes && (
						<span className="text-[10px] md:text-xs text-muted-foreground bg-muted px-1.5 rounded-sm">
							{lesson.estimatedMinutes}m
						</span>
					)}
					{status === "completed" && (
						<span className="flex items-center text-amber-500 text-[10px] md:text-xs font-bold ml-auto bg-amber-500/10 px-1.5 py-0.5 rounded-md">
							<Star className="w-3 h-3 mr-0.5 fill-current" />
							{lesson.xpReward} XP
						</span>
					)}
				</div>
				<h4
					className={cn(
						"font-bold text-sm md:text-base leading-tight md:leading-snug truncate",
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
						className="px-1 py-0 text-[8px] sm:text-[9px]"
					/>
				</div>
			</div>

			{status !== "locked" && (
				<ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
			)}
		</>
	);

	const wrapperClass = cn(
		"flex items-center gap-4 p-5 rounded-xl border transition-all duration-300 bg-card/50 backdrop-blur-md",
		status === "locked" &&
			"opacity-60 grayscale cursor-not-allowed border-dashed bg-muted/20",
		status === "active" &&
			"border-primary/40 shadow-xl shadow-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent scale-[1.03] ring-2 ring-primary/50 animate-pulse hover:scale-[1.04] animate-in fade-in zoom-in duration-500",
		status === "completed" &&
			"border-green-500/20 bg-green-500/5 hover:bg-green-500/10",
		status !== "locked" &&
			"hover:border-primary/30 hover:shadow-md cursor-pointer",
	);

	return (
		<div ref={cardRef} className="relative pl-8 md:pl-0 py-2 group">
			{/* Onde Parei Indicator */}
			{isFirstActive && (
				<div className="absolute -top-3 left-10 md:left-4 z-20 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-background animate-bounce whitespace-nowrap">
					Onde parei
				</div>
			)}
			{/* Timeline Connector Dot */}
			<div
				className={cn(
					"absolute left-[-5px] md:left-[-5px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10",
					status === "completed"
						? "bg-green-500 border-green-500"
						: status === "active"
							? "bg-primary border-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]"
							: "bg-muted border-muted-foreground/30",
				)}
			/>

			{status === "locked" ? (
				<div className={wrapperClass}>{content}</div>
			) : (
				<Link to={link} className={wrapperClass}>
					{content}
				</Link>
			)}
		</div>
	);
}
