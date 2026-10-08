import { BookOpen, Loader2, Sparkles } from "lucide-react";
import React, { Suspense } from "react";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { curriculumData } from "@/lib/curriculumData";
import { UnitGroup } from "./timeline/UnitGroup";

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
		<div className="w-full max-w-2xl mx-auto pb-32 min-h-screen relative flex flex-col gap-8">
			{/* Intro / Header */}
			<div className="mb-8 text-center space-y-2 pt-8 px-4">
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
				<React.Suspense
					key={unit.id}
					fallback={
						<div className="h-32 mb-12 animate-pulse bg-muted/40 rounded-2xl w-full max-w-2xl mx-auto border border-border/40" />
					}
				>
					<UnitGroup
						unit={unit}
						modules={unit.modules}
						completedLessonsSet={completedLessonsSet}
						firstIncompleteLessonId={firstIncompleteLessonId}
					/>
				</React.Suspense>
			))}

			{/* End of Journey */}
			<div className="text-center py-12 opacity-50">
				<Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
				<p className="text-sm font-medium">To be continued...</p>
			</div>
		</div>
	);
}
