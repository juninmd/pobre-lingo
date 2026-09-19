import {
	type CEFRLevel,
	curriculumData,
	getCEFRLevel,
	type Lesson,
	type Module,
} from "../curriculumData";
import { getLessonLink } from "../lessonLink";

export interface StartingPoint {
	lessonId: string;
	href: string;
}

export interface NextLessonAtLevel {
	module: Module;
	lesson: Lesson;
	link: string;
}

/** First incomplete lesson (in curriculum order) at a given CEFR level, or null when all are done. */
export function getNextIncompleteLessonAtLevel(
	level: CEFRLevel,
	isLessonCompleted: (moduleId: string, lessonId: string) => boolean,
): NextLessonAtLevel | null {
	const modules = [...curriculumData.modules].sort((a, b) => a.order - b.order);
	for (const module of modules) {
		if (getCEFRLevel(module.unitId) !== level) continue;
		for (const lesson of [...module.lessons].sort(
			(a, b) => a.order - b.order,
		)) {
			if (!isLessonCompleted(module.id, lesson.id)) {
				return { module, lesson, link: getLessonLink(module, lesson) };
			}
		}
	}
	return null;
}

/** Maps a placed CEFR level to the first lesson of the first module at that level. */
export function getStartingPoint(level: CEFRLevel): StartingPoint | null {
	const modules = [...curriculumData.modules].sort((a, b) => a.order - b.order);
	for (const module of modules) {
		if (getCEFRLevel(module.unitId) !== level) continue;
		const [lesson] = [...module.lessons].sort((a, b) => a.order - b.order);
		if (!lesson) continue;
		return {
			lessonId: `${module.id}:${lesson.id}`,
			href: getLessonLink(module, lesson),
		};
	}
	return null;
}
