import * as LucideIcons from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { Lesson, Module } from "@/lib/curriculumData";
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
					inline: "nearest",
				});
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [isFirstActive]);

	const content = (
		<LessonCardContent module={module} lesson={lesson} status={status} />
	);

	const wrapperClass = cn(
		"flex items-center gap-4 p-5 rounded-xl border transition-all duration-300 bg-card/60 backdrop-blur-md",
		status === "locked" &&
			"opacity-60 grayscale cursor-not-allowed border-dashed bg-muted/20",
		status === "active" &&
			"border-primary/40 shadow-xl shadow-primary/10 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent scale-[1.02] ring-2 ring-primary/30 hover:scale-[1.03] backdrop-blur-xl",
		status === "completed" &&
			"border-green-500/20 bg-green-500/5 hover:bg-green-500/10",
		status !== "locked" &&
			"hover:border-primary/30 hover:shadow-md cursor-pointer",
	);

	return (
		<div
			ref={cardRef}
			className={cn(
				"relative pl-8 md:pl-16 py-2 group",
				isFirstActive &&
					"animate-in slide-in-from-bottom-2 fade-in duration-700 ease-out fill-mode-both",
			)}
		>
			{/* Onde Parei Indicator */}
			{isFirstActive && (
				<div className="absolute -top-3 left-10 md:left-14 z-20 bg-primary text-primary-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-primary animate-pulse whitespace-nowrap flex items-center gap-1.5">
					<LucideIcons.BookOpen className="w-3 h-3" />
					Onde parei
				</div>
			)}
			{/* Timeline Connector Dot */}
			<div
				className={cn(
					"absolute left-[14px] md:left-[30px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10",
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
