import {
	type CEFRLevel,
	cefrConfig,
	curriculumData,
	getCEFRLevel,
} from "./curriculumData";

export const CEFR_ORDER: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export type LevelStatus = "completed" | "current" | "locked";

export interface LevelStage {
	level: CEFRLevel;
	name: string;
	description: string;
	unitCount: number;
	lessonCount: number;
	completedCount: number;
	percent: number;
	status: LevelStatus;
}

const LEVEL_NAMES: Record<CEFRLevel, string> = {
	A1: "Iniciante",
	A2: "Básico",
	B1: "Intermediário",
	B2: "Independente",
	C1: "Avançado",
	C2: "Proficiente",
};

export function getLevelStages(completed: Set<string>): LevelStage[] {
	const stages = CEFR_ORDER.map((level) => {
		const unitIds = curriculumData.units
			.filter((unit) => getCEFRLevel(unit.id) === level)
			.map((unit) => unit.id);
		const lessons = curriculumData.modules
			.filter((module) => unitIds.includes(module.unitId))
			.flatMap((module) =>
				module.lessons.map((lesson) => `${module.id}:${lesson.id}`),
			);
		const completedCount = lessons.filter((id) => completed.has(id)).length;
		const percent =
			lessons.length > 0
				? Math.round((completedCount / lessons.length) * 100)
				: 0;

		return {
			level,
			name: LEVEL_NAMES[level],
			description: cefrConfig[level].description,
			unitCount: unitIds.length,
			lessonCount: lessons.length,
			completedCount,
			percent,
			status: "locked" as LevelStatus,
		};
	});

	const firstIncomplete = stages.find((stage) => stage.percent < 100);
	for (const stage of stages) {
		if (stage.percent >= 100) {
			stage.status = "completed";
		} else if (stage === firstIncomplete) {
			stage.status = "current";
		} else {
			stage.status = "locked";
		}
	}

	return stages;
}
