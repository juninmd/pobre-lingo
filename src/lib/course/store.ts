import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { findCourseLesson } from "./catalog";
import {
	COURSE_PROGRESS_KEY,
	type CourseProgress,
	completeCourseLesson,
	isCourseAnswerCorrect,
	readCourseProgress,
} from "./progress";

const emptyProgress: CourseProgress = {};
let cached = emptyProgress;
let serialized = "";
const listeners = new Set<() => void>();

export function getCourseProgress() {
	const value = getLocalStorageItem<unknown>(COURSE_PROGRESS_KEY, {});
	const current = JSON.stringify(value);
	if (current !== serialized) {
		serialized = current;
		cached = readCourseProgress(value);
	}
	return cached;
}

export function getServerCourseProgress() {
	return emptyProgress;
}

export function subscribeCourseProgress(listener: () => void) {
	listeners.add(listener);
	const onStorage = (event: StorageEvent) => {
		if (event.key === COURSE_PROGRESS_KEY || event.key === null) listener();
	};
	window.addEventListener("storage", onStorage);
	return () => {
		listeners.delete(listener);
		window.removeEventListener("storage", onStorage);
	};
}

/** Returns false if evidence is invalid or the browser could not save it. */
export function saveCourseCompletion(id: string, answers: string[]) {
	const lesson = findCourseLesson(id);
	if (
		!lesson ||
		answers.length !== lesson.check.length ||
		!lesson.check.every((q, index) => isCourseAnswerCorrect(q, answers[index]))
	)
		return false;
	const previous = getCourseProgress();
	const next = completeCourseLesson(previous, id, answers);
	if (next !== previous) setLocalStorageItem(COURSE_PROGRESS_KEY, next);
	const saved = getCourseProgress();
	for (const listener of listeners) listener();
	return !!next[id] && saved[id]?.reviewAt === next[id].reviewAt;
}
