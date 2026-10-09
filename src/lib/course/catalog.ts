import { advanced1Lessons } from "./advanced1";
import { advanced2Lessons } from "./advanced2";
import { beginner1Lessons } from "./beginner1";
import { beginner2Lessons } from "./beginner2";
import { intermediate1Lessons } from "./intermediate1";
import { intermediate2Lessons } from "./intermediate2";
import type { CourseLevel } from "./types";
import { upperLessons } from "./upper";

export const courseLessons = [
	...beginner1Lessons,
	...beginner2Lessons,
	...intermediate1Lessons,
	...intermediate2Lessons,
	...upperLessons,
	...advanced1Lessons,
	...advanced2Lessons,
];
export const courseLevels: CourseLevel[] = [
	"Pré-A1",
	"A1",
	"A2",
	"B1",
	"B2",
	"C1",
	"C2",
];

export function findCourseLesson(id: string) {
	return courseLessons.find((lesson) => lesson.id === id);
}
