import { courseLessons, findCourseLesson } from "./catalog";
import type { CourseQuestion } from "./types";

export const COURSE_PROGRESS_KEY = "pobrelingo_guided_course_v1";
export interface LessonEvidence {
	completedAt: string;
	reviewAt: string;
	reviews: number;
}
export type CourseProgress = Record<string, LessonEvidence>;

export function normalizeAnswer(answer: string) {
	return answer
		.trim()
		.toLowerCase()
		.replace(/[’‘]/g, "'")
		.replace(/[.,!?;:]/g, "")
		.replace(/\s+/g, " ");
}

export function isCourseAnswerCorrect(
	question: CourseQuestion,
	answer: string,
) {
	return question.answers.some(
		(expected) => normalizeAnswer(expected) === normalizeAnswer(answer),
	);
}

export function readCourseProgress(value: unknown): CourseProgress {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const progress: CourseProgress = {};
	for (const [id, evidence] of Object.entries(value)) {
		if (!findCourseLesson(id) || !evidence || typeof evidence !== "object")
			continue;
		const { completedAt, reviewAt, reviews } = evidence;
		if (
			typeof completedAt !== "string" ||
			!Number.isFinite(Date.parse(completedAt))
		)
			continue;
		if (typeof reviewAt !== "string" || !Number.isFinite(Date.parse(reviewAt)))
			continue;
		if (!Number.isInteger(reviews) || reviews < 0 || reviews > 100) continue;
		progress[id] = { completedAt, reviewAt, reviews };
	}
	return progress;
}

export function isCourseLessonAvailable(id: string, progress: CourseProgress) {
	const index = courseLessons.findIndex((lesson) => lesson.id === id);
	return (
		index >= 0 &&
		courseLessons.slice(0, index).every((lesson) => progress[lesson.id])
	);
}

export function completeCourseLesson(
	progress: CourseProgress,
	id: string,
	answers: string[],
	now = new Date(),
): CourseProgress {
	const lesson = findCourseLesson(id);
	if (!lesson || !isCourseLessonAvailable(id, progress)) return progress;
	if (
		answers.length !== lesson.check.length ||
		!lesson.check.every((q, i) => isCourseAnswerCorrect(q, answers[i]))
	)
		return progress;
	const previous = progress[id];
	// Reabrir uma aula não deve adiar a revisão nem contar como nova evidência.
	if (previous && Date.parse(previous.reviewAt) > now.getTime())
		return progress;
	const reviews = Math.min(100, previous ? previous.reviews + 1 : 0);
	const days = [1, 3, 7, 14, 30][Math.min(reviews, 4)];
	return {
		...progress,
		[id]: {
			completedAt: previous?.completedAt ?? now.toISOString(),
			reviewAt: new Date(now.getTime() + days * 86400000).toISOString(),
			reviews,
		},
	};
}

export function nextCourseLesson(progress: CourseProgress, now = new Date()) {
	return (
		courseLessons.find(
			(lesson) =>
				progress[lesson.id] &&
				Date.parse(progress[lesson.id].reviewAt) <= now.getTime(),
		) ?? courseLessons.find((lesson) => !progress[lesson.id])
	);
}
