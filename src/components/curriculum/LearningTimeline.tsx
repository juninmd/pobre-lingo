import * as LucideIcons from "lucide-react";
import {
	BookOpen,
	Check,
	ChevronRight,
	Lock,
	Play,
	Sparkles,
	Star,
	Trophy,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import {
	curriculumData,
	getCEFRLevel,
	type Lesson,
	type Module,
	type Unit,
} from "@/lib/curriculumData";
import { getLessonLink } from "@/lib/lessonLink";
import { cn } from "@/lib/utils";

// --- Helpers ---

const getIcon = (name: string) => {
	const icons = LucideIcons as unknown as Record<string, React.ElementType>;
	return icons[name] || LucideIcons.HelpCircle;
};

// --- Components ---

interface LessonCardProps {
	module: Module;
	lesson: Lesson;
	status: "locked" | "active" | "completed";
	isFirstActive: boolean;
}

function LessonCard({
	module,
	lesson,
	status,
	isFirstActive,
}: LessonCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isFirstActive && cardRef.current) {
			setTimeout(() => {
				cardRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 500); // Small delay to allow layout to settle
		}
	}, [isFirstActive]);

	const link = getLessonLink(module, lesson);

	const content = (
		<>
			{/* Icon / Status */}
			<div
				className={cn(
					"flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-all",
					status === "locked"
						? "bg-muted text-muted-foreground"
						: status === "active"
							? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
							: "bg-green-500 text-white shadow-sm",
				)}
			>
				{status === "completed" ? (
					<Check className="w-6 h-6 stroke-[3]" />
				) : status === "active" ? (
					<Play className="w-5 h-5 ml-0.5 fill-current" />
				) : (
					<Lock className="w-5 h-5" />
				)}
			</div>

			{/* Text Content */}
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 mb-0.5">
					<h4
						className={cn(
							"font-bold text-base truncate",
							status === "active" && "text-primary",
						)}
					>
						{lesson.title_pt}
					</h4>
					{status === "completed" && (
						<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-600 border border-green-500/20 uppercase tracking-wide">
							Feito
						</span>
					)}
					{status === "active" && (
						<span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wide animate-pulse">
							Agora
						</span>
					)}
				</div>
				<p className="text-xs text-muted-foreground line-clamp-1">
					{lesson.description_pt}
				</p>
			</div>

			{/* Reward / Type Info */}
			<div className="hidden sm:flex flex-col items-end gap-1.5 text-xs text-muted-foreground/80">
				<div className="flex items-center gap-1">
					<Star className="w-3 h-3 text-amber-500 fill-amber-500" />
					<span className="font-semibold text-amber-600 dark:text-amber-400">
						+{lesson.xpReward} XP
					</span>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="px-2 py-0.5 rounded-full bg-muted text-[10px] uppercase font-bold tracking-wider opacity-70">
						{lesson.type}
					</span>
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
		"flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 bg-card/50 backdrop-blur-sm",
		status === "locked" &&
			"opacity-60 grayscale cursor-not-allowed border-dashed bg-muted/20",
		status === "active" &&
			"border-primary/50 shadow-lg shadow-primary/5 bg-gradient-to-r from-primary/5 to-transparent scale-[1.02] ring-1 ring-primary/20",
		status === "completed" &&
			"border-green-500/20 bg-green-500/5 hover:bg-green-500/10",
		status !== "locked" &&
			"hover:border-primary/30 hover:shadow-md cursor-pointer",
	);

	return (
		<div ref={cardRef} className="relative pl-8 md:pl-0 py-2 group">
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

interface ModuleSectionProps {
	module: Module;
	completedLessonsSet: Set<string>;
	firstIncompleteLessonId: string | null;
}

function ModuleSection({
	module,
	completedLessonsSet,
	firstIncompleteLessonId,
}: ModuleSectionProps) {
	const Icon = getIcon(module.icon);

	// Module is locked if previous module not done?
	// Simplified logic: Module is active if any lesson inside is active or completed, OR if it's the very first one.
	// Actually, we can check if the first lesson of this module is locked or not.
	// But for the visualization, we just iterate lessons.

	return (
		<div className="relative ml-4 md:ml-8 pb-12 last:pb-0">
			{/* Chapter Header (Module) */}
			<div className="flex items-center gap-4 mb-6 -ml-10 md:-ml-14 group">
				<div
					className={cn(
						"flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-lg border-4 border-background z-10 transition-transform hover:scale-110 duration-300",
						module.color,
						"text-white",
					)}
				>
					<Icon className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md" />
				</div>
				<div className="flex flex-col pt-1">
					<div className="flex items-center gap-2 mb-0.5">
						<span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
							Capítulo {module.order}
						</span>
						<CefrBadge
							level={getCEFRLevel(module.unitId)}
							showDescriptionOnHover={false}
							className="px-1.5 py-0 text-[8px] sm:text-[9px]"
						/>
					</div>
					<h3 className="text-xl md:text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
						{module.title_pt}
					</h3>
					<p className="text-sm text-muted-foreground hidden md:block">
						{module.description_pt}
					</p>
				</div>
			</div>

			{/* Lessons List */}
			<div className="space-y-4">
				{module.lessons.map((lesson, _idx) => {
					const isCompleted = completedLessonsSet.has(
						`${module.id}:${lesson.id}`,
					);
					// It's active if it's not completed, but the previous one IS completed (or it's the first one overall).
					// However, to keep it simple with the set:
					// If this lesson is the "firstIncomplete", it's active.
					// If it's completed, it's completed.
					// Else, it's locked.

					let status: "locked" | "active" | "completed" = "locked";
					let isFirstActive = false;

					if (isCompleted) {
						status = "completed";
					} else if (`${module.id}:${lesson.id}` === firstIncompleteLessonId) {
						status = "active";
						isFirstActive = true;
					} else {
						// Check if it's unlocked by logic (if previous was done)
						// But `firstIncompleteLessonId` is sufficient for "Active".
						// Any lesson AFTER the active one is locked.
						// Any lesson BEFORE the active one should be completed (logic of set).
						// So default locked is correct for future lessons.

						// Edge case: If EVERYTHING is completed, firstIncompleteLessonId is null.
						// Then all are completed.
						if (!firstIncompleteLessonId && completedLessonsSet.size > 0) {
							// If this lesson is in the set, it's completed (handled above).
							// If not in set? Should be locked.
						}
					}

					return (
						<LessonCard
							key={lesson.id}
							module={module}
							lesson={lesson}
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

function UnitGroup({
	unit,
	modules,
	completedLessonsSet,
	firstIncompleteLessonId,
}: UnitGroupProps) {
	// Check if any module in this unit has the active lesson
	const isActiveUnit = modules.some((m) =>
		m.lessons.some((l) => `${m.id}:${l.id}` === firstIncompleteLessonId),
	);
	const isCompletedUnit = modules.every((m) =>
		m.lessons.every((l) => completedLessonsSet.has(`${m.id}:${l.id}`)),
	);

	return (
		<div className="mb-12 md:mb-20">
			{/* Unit Sticky Header */}
			<div
				className={cn(
					"sticky top-[4.5rem] z-20 py-3 px-4 -mx-4 mb-8 backdrop-blur-xl border-y transition-all duration-300 shadow-sm",
					isActiveUnit
						? "bg-background/80 border-primary/20"
						: "bg-muted/40 border-border/40 grayscale opacity-80",
				)}
			>
				<div className="container max-w-2xl mx-auto flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm",
								isActiveUnit
									? "bg-primary text-primary-foreground"
									: "bg-muted-foreground/20 text-muted-foreground",
							)}
						>
							{unit.order}
						</div>
						<div>
							<h2 className="text-sm md:text-base font-bold uppercase tracking-wide leading-none flex items-center gap-2">
								<span>{unit.title}</span>
								<CefrBadge level={getCEFRLevel(unit.id)} />
							</h2>
							<p className="text-xs text-muted-foreground mt-1 line-clamp-1">
								{unit.description}
							</p>
						</div>
					</div>
					{unit.difficulty === "avancado" && (
						<div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-md border border-yellow-500/20 text-xs font-bold">
							<Trophy className="w-3 h-3" />
							<span className="hidden sm:inline">Expert</span>
						</div>
					)}
					{isCompletedUnit && (
						<div className="flex items-center gap-1 text-green-600 font-bold text-xs">
							<Check className="w-4 h-4" />
							<span>Completa</span>
						</div>
					)}
				</div>
			</div>

			<div className="relative pl-4 md:pl-0">
				{/* Vertical Spine Line */}
				<div className="absolute left-4 md:left-4 top-0 bottom-0 w-px bg-border md:bg-gradient-to-b md:from-border md:via-border md:to-transparent" />

				<div className="space-y-2">
					{modules.map((module) => (
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

export function LearningTimeline() {
	const { completedLessons } = useCurriculumProgress();

	// Create a Set of completed "moduleId:lessonId" strings for O(1) lookup
	const completedLessonsSet = React.useMemo(() => {
		return new Set(completedLessons.map((l) => `${l.moduleId}:${l.lessonId}`));
	}, [completedLessons]);

	// Find the first incomplete lesson to mark as "Active"
	const firstIncompleteLessonId = React.useMemo(() => {
		for (const unit of curriculumData.units) {
			const unitModules = curriculumData.modules.filter(
				(m) => m.unitId === unit.id,
			);
			for (const module of unitModules) {
				for (const lesson of module.lessons) {
					const id = `${module.id}:${lesson.id}`;
					if (!completedLessonsSet.has(id)) {
						return id;
					}
				}
			}
		}
		return null; // All done!
	}, [completedLessonsSet]);

	const unitsWithModules = curriculumData.units.map((unit) => ({
		...unit,
		modules: curriculumData.modules.filter((m) => m.unitId === unit.id),
	}));

	return (
		<div className="w-full max-w-2xl mx-auto pb-32 min-h-screen overflow-x-hidden">
			{/* Intro / Header */}
			<div className="mb-10 text-center space-y-2 pt-8 px-4">
				<div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-2">
					<BookOpen className="w-8 h-8" />
				</div>
				<h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground [data-theme=pobre-lingo]:text-gold">
					Sua Jornada
				</h1>
				<p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
					Complete os capítulos para desbloquear novos conhecimentos e dominar o
					inglês.
				</p>
			</div>

			{unitsWithModules.map((unit) => (
				<UnitGroup
					key={unit.id}
					unit={unit}
					modules={unit.modules}
					completedLessonsSet={completedLessonsSet}
					firstIncompleteLessonId={firstIncompleteLessonId}
				/>
			))}

			{/* End of Journey */}
			<div className="text-center py-12 opacity-50">
				<Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
				<p className="text-sm font-medium">To be continued...</p>
			</div>
		</div>
	);
}
