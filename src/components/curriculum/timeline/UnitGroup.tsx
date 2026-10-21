import { Check, Trophy } from "lucide-react";
import { CefrBadge } from "@/components/common/CefrBadge";
import type { Module, Unit } from "@/lib/curriculumData";
import { getCEFRLevel } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";
import { ModuleSection } from "./ModuleSection";

interface UnitGroupProps {
	unit: Unit;
	modules: Module[];
	completedLessonsSet: Set<string>;
	firstIncompleteLessonId: string | null;
}

export function UnitGroup({
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
		<div className="mb-8 md:mb-12">
			{/* Unit Sticky Header */}
			<div
				className={cn(
					"sticky top-0 z-20 py-4 px-3 -mx-3 sm:px-4 sm:-mx-4 mb-8 border-y transition-all duration-300 shadow-sm rounded-none md:rounded-2xl md:border-x backdrop-blur-md",
					isActiveUnit
						? "bg-card/95 border-primary/30 shadow-md shadow-primary/5"
						: "bg-muted/95 border-border/40 grayscale",
				)}
			>
				<div className="container max-w-2xl mx-auto flex items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div
							className={cn(
								"flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm",
								isActiveUnit
									? "bg-primary text-primary-foreground"
									: "bg-background text-muted-foreground border border-border",
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
						<div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 rounded-md border border-yellow-500/20 text-xs font-bold">
							<Trophy className="w-3 h-3" />
							<span className="sr-only sm:not-sr-only">Expert</span>
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

			<div className="relative pl-4 md:pl-0 mt-2">
				{/* Vertical Spine Line */}
				<div className="absolute left-8 md:left-8 -top-4 -bottom-4 w-1 bg-border/50 md:bg-gradient-to-b md:from-primary/30 md:via-border/50 md:to-transparent z-0" />

				<div className="flex flex-col gap-8 relative mt-2">
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
