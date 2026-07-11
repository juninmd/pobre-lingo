import * as LucideIcons from "lucide-react";
import { Check, Lock, Play, Star } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { Lesson, Module } from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/routes";
import { cn } from "@/lib/utils";

// Helper to get icon component dynamically
const getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.HelpCircle;
};

interface TimelineModuleProps {
	module: Module;
	isLocked: boolean;
	isCompleted: boolean;
	completionPercentage: number;
	isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
	isFirstActiveModule?: boolean;
	firstActiveLessonId?: string;
}

export default function TimelineModule({
	module,
	isLocked,
	isCompleted,
	completionPercentage,
	isLessonCompleted,
	isFirstActiveModule,
	firstActiveLessonId,
}: TimelineModuleProps) {
	const Icon = getIcon(module.icon);

	const activeLessonRef = useRef<HTMLAnchorElement>(null);
	const hasScrolled = useRef(false);

	useEffect(() => {
		// Only scroll if it's the global first active module/lesson, and we haven't scrolled yet
		if (
			isFirstActiveModule &&
			!hasScrolled.current &&
			activeLessonRef.current
		) {
			// Small delay to allow render
			const timer = setTimeout(() => {
				activeLessonRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
				hasScrolled.current = true;
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [isFirstActiveModule]);

	return (
		<div className="relative group">
			<div
				className={cn(
					"block rounded-2xl border transition-all duration-300 overflow-hidden",
					isLocked
						? "bg-muted/50 border-transparent"
						: "bg-background/80 backdrop-blur-md border-border/50 shadow-sm",
					!isLocked && !isCompleted && "ring-1 ring-primary/20",
				)}
			>
				{/* Chapter Header */}
				<div className="p-5 flex items-start gap-4 border-b border-border/50 bg-muted/20">
					<div
						className={cn(
							"w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
							isLocked
								? "bg-muted text-muted-foreground/50 grayscale"
								: `${module.color} text-white shadow-${module.color.replace("bg-", "")}/30`,
						)}
					>
						{isCompleted ? (
							<Check className="w-7 h-7 stroke-[3]" />
						) : (
							<Icon className="w-6 h-6" />
						)}
					</div>

					<div className="flex-1 min-w-0 pt-1">
						<div className="flex items-center justify-between mb-1">
							<h3
								className={cn(
									"font-bold truncate text-lg",
									isLocked ? "text-muted-foreground" : "text-foreground",
								)}
							>
								{module.title_pt}
							</h3>
						</div>
						<p className="text-sm text-muted-foreground line-clamp-2">
							{module.description_pt}
						</p>

						{!isLocked && (
							<div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
								<div
									className={cn(
										"h-full transition-all duration-1000",
										module.color,
									)}
									style={{
										width: `${completionPercentage}%`,
									}}
								/>
							</div>
						)}
					</div>
				</div>

				{/* Pages (Lessons) */}
				<div className="p-4 sm:p-5 flex flex-col gap-3">
					{module.lessons.map((lesson, index) => {
						const isLessonDone = isLessonCompleted(module.id, lesson.id);
						const isLessonLocked =
							isLocked ||
							(index > 0 &&
								!isLessonCompleted(module.id, module.lessons[index - 1].id));
						const isFirstActive =
							!isLessonLocked &&
							!isLessonDone &&
							lesson.id === firstActiveLessonId;

						const lessonLink = isLessonLocked
							? "#"
							: getLessonLink(module, lesson);

						return (
							<Link
								key={lesson.id}
								to={lessonLink}
								ref={isFirstActive ? activeLessonRef : null}
								onClick={(e) => {
									if (isLessonLocked) e.preventDefault();
								}}
								className={cn(
									"flex items-center gap-4 p-3 rounded-xl transition-all duration-300 border",
									isLessonLocked
										? "bg-muted/30 border-transparent text-muted-foreground cursor-not-allowed opacity-60 grayscale"
										: isLessonDone
											? "bg-green-500/5 text-green-600 border-green-500/20 hover:bg-green-500/10"
											: isFirstActive
												? "bg-primary/5 hover:bg-primary/10 text-primary border-primary/30 shadow-sm shadow-primary/10 ring-2 ring-primary/30"
												: "bg-background border-border hover:border-primary/30 hover:bg-muted/50",
								)}
							>
								{/* State Icon */}
								<div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full">
									{isLessonLocked ? (
										<Lock className="w-4 h-4 text-muted-foreground/50" />
									) : isLessonDone ? (
										<Check className="w-5 h-5 text-green-600" />
									) : isFirstActive ? (
										<div className="relative flex h-3 w-3">
											<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
											<span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
										</div>
									) : (
										<div className="w-2 h-2 rounded-full bg-border" />
									)}
								</div>

								{/* Lesson Info */}
								<div className="flex-1 min-w-0">
									<h4
										className={cn(
											"font-semibold text-sm",
											isLessonDone
												? "text-foreground"
												: isLessonLocked
													? "text-muted-foreground"
													: isFirstActive
														? "text-primary font-bold"
														: "text-foreground",
										)}
									>
										{lesson.title_pt}
									</h4>
									<p className="text-xs text-muted-foreground truncate">
										{lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
									</p>
								</div>

								{/* Action Area */}
								<div className="shrink-0 pl-2">
									{isLessonLocked ? (
										<span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/50 bg-muted px-2 py-1 rounded-md">
											Bloqueado
										</span>
									) : isLessonDone ? (
										<span className="text-[10px] uppercase font-bold tracking-wider text-green-600 bg-green-500/10 px-2 py-1 rounded-md">
											Concluído
										</span>
									) : isFirstActive ? (
										<span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md animate-pulse">
											Disponível
										</span>
									) : (
										<Play className="w-4 h-4 text-muted-foreground" />
									)}
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
