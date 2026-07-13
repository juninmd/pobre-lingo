import * as LucideIcons from "lucide-react";
import { BookOpen } from "lucide-react";
import React, { lazy, Suspense, useMemo } from "react";
import { Link } from "react-router-dom";
import { GuidebookModal } from "@/components/curriculum/GuidebookModal";
import { Button } from "@/components/ui/button";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData } from "@/lib/curriculumData";
import { cn } from "@/lib/utils";

// Lazy load the timeline module component
const TimelineModule = lazy(
	() => import("@/components/dashboard/TimelineModule"),
);

export function LearningTimeline() {
	const { getModuleProgress, isModuleUnlocked, isLessonCompleted } =
		useCurriculumProgress();

	// Encontra a primeira lição não concluída globalmente para o bookmark
	const firstIncompleteLesson = useMemo(() => {
		for (const unit of curriculumData.units) {
			const modules = curriculumData.modules.filter(
				(m) => m.unitId === unit.id,
			);
			for (const module of modules) {
				if (!isModuleUnlocked(module)) continue;
				const lesson = module.lessons.find(
					(l) => !isLessonCompleted(module.id, l.id),
				);
				if (lesson) {
					return { moduleId: module.id, lessonId: lesson.id };
				}
			}
		}
		return null;
	}, [isModuleUnlocked, isLessonCompleted]);

	return (
		<div className="w-full max-w-2xl mx-auto pb-32">
			<div className="mb-10 px-4">
				<h1 className="text-3xl font-bold tracking-tight mb-2">My Journey</h1>
				<p className="text-muted-foreground">
					Keep moving forward, chapter by chapter.
				</p>
			</div>

			<div className="relative ml-4 md:ml-10 space-y-12 flex flex-col gap-8">
				{/* The robust, wider gradient spine */}
				<div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/80 via-primary/40 to-border/20 -ml-[3px] rounded-full" />

				{curriculumData.units.map((unit, unitIndex) => {
					const modules = curriculumData.modules.filter(
						(m) => m.unitId === unit.id,
					);
					const isUnitLocked = modules.every((m) => !isModuleUnlocked(m));

					return (
						<div
							key={unit.id}
							className={cn(
								"relative pl-8 md:pl-12 py-2",
								isUnitLocked && "opacity-60 grayscale",
							)}
						>
							{/* Timeline Dot for Unit */}
							<div
								className={cn(
									"absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 border-background",
									isUnitLocked
										? "bg-muted-foreground/30"
										: "bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]",
								)}
							/>

							<div className="mb-6 flex items-center justify-between">
								<div>
									<h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-1">
										{unit.title}
									</h2>
									<p className="text-lg md:text-xl font-bold">
										{unit.description}
									</p>
								</div>
								<GuidebookModal
									unit={unit}
									trigger={
										<Button
											variant="outline"
											size="sm"
											className="gap-2 rounded-full border-primary/20 hover:bg-primary/5"
										>
											<BookOpen className="w-4 h-4" /> Guide
										</Button>
									}
								/>
							</div>

							<div className="grid gap-8">
								<Suspense
									fallback={
										<div className="h-40 w-full animate-pulse bg-muted rounded-2xl" />
									}
								>
									{modules.map((module) => {
										const moduleProgress = getModuleProgress(module.id);
										const isLocked = !isModuleUnlocked(module);
										const isCompleted =
											moduleProgress.completionPercentage >= 100;

										return (
											<TimelineModule
												key={module.id}
												module={module}
												isLocked={isLocked}
												isCompleted={isCompleted}
												completionPercentage={
													moduleProgress.completionPercentage
												}
												isLessonCompleted={isLessonCompleted}
												isFirstActiveModule={
													firstIncompleteLesson?.moduleId === module.id
												}
												firstActiveLessonId={
													firstIncompleteLesson?.moduleId === module.id
														? firstIncompleteLesson.lessonId
														: undefined
												}
											/>
										);
									})}
								</Suspense>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
