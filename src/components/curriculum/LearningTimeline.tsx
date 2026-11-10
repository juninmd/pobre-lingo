import { BookOpen, Sparkles } from "lucide-react";
import React from "react";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useIdleReady } from "@/hooks/useIdleReady";
import { curriculumData } from "@/lib/curriculumData";

const UnitGroup = React.lazy(() =>
	import("./timeline/UnitGroup").then((m) => ({ default: m.UnitGroup })),
);

const EAGER_UNITS_AHEAD = 1;

export function LearningTimeline() {
	const { completedLessons } = useCurriculumProgress();
	const idle = useIdleReady();

	// Create a Set of completed "moduleId:lessonId" strings for O(1) lookup
	const completedLessonsSet = React.useMemo(() => {
		return new Set(completedLessons.map((l) => `${l.moduleId}:${l.lessonId}`));
	}, [completedLessons]);

	// Primeira lição não concluída (a "ativa") e a posição da unidade dela.
	const firstIncomplete = React.useMemo(() => {
		for (const [unitIndex, unit] of curriculumData.units.entries()) {
			const unitModules = curriculumData.modules.filter(
				(m) => m.unitId === unit.id,
			);
			for (const module of unitModules) {
				for (const lesson of module.lessons) {
					const id = `${module.id}:${lesson.id}`;
					if (!completedLessonsSet.has(id)) return { id, unitIndex };
				}
			}
		}
		return null; // Tudo concluído.
	}, [completedLessonsSet]);
	const firstIncompleteLessonId = firstIncomplete?.id ?? null;

	const unitsWithModules = curriculumData.units.map((unit) => ({
		...unit,
		modules: curriculumData.modules.filter((m) => m.unitId === unit.id),
	}));
	// Primeira pintura só até a unidade seguinte à ativa; o resto (fora da
	// tela) monta quando o navegador fica ocioso, em vez de travar a abertura.
	const eagerUnits = (firstIncomplete?.unitIndex ?? 0) + EAGER_UNITS_AHEAD + 1;
	const shownUnits = idle
		? unitsWithModules
		: unitsWithModules.slice(0, eagerUnits);

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

			{shownUnits.map((unit) => (
				// Unidades fora da tela não entram em estilo, layout nem pintura até a
				// rolagem chegar perto. A margem negativa dá espaço ao cabeçalho da
				// unidade, que sangra para os lados e seria cortado pela contenção.
				<div key={unit.id} className="defer-render -mx-3 px-3 sm:-mx-4 sm:px-4">
					<React.Suspense
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
				</div>
			))}

			{/* End of Journey */}
			<div className="text-center py-12 text-muted-foreground">
				<Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
				<p className="text-sm font-medium">To be continued...</p>
			</div>
		</div>
	);
}
