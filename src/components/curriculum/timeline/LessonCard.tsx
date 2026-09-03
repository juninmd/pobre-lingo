import * as LucideIcons from "lucide-react";
import { Check, Lock, Play, Star } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { Button } from "@/components/ui/button";
import type { Lesson, Module } from "@/lib/curriculumData";
import { getCEFRLevel } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/lessonLink";
import { cn } from "@/lib/utils";
import { LessonCardContent } from "./LessonCardContent";

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
		<LessonCardContent module={module} lesson={lesson} status={status} />
	);

	const wrapperClass = cn(
		"flex items-center gap-4 p-5 rounded-xl border transition-all duration-300 bg-card/50 backdrop-blur-md",
		status === "locked" &&
			"opacity-60 grayscale cursor-not-allowed border-dashed bg-muted/20",
		status === "active" &&
			"border-primary/40 shadow-xl shadow-primary/10 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent scale-[1.03] ring-2 ring-primary/50 animate-pulse hover:scale-[1.04] animate-in fade-in zoom-in duration-1000",
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
