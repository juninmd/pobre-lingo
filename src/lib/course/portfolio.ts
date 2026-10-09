import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { findCourseLesson } from "./catalog";

export const PORTFOLIO_KEY = "pobrelingo_course_portfolio";
export interface MissionEntry {
	id: string;
	lessonId: string;
	text: string;
	reflection: string;
	createdAt: string;
}

export function readMissionDraft(value: unknown) {
	if (!value || typeof value !== "object") return { text: "", reflection: "" };
	const draft = value as { text?: unknown; reflection?: unknown };
	return {
		text: typeof draft.text === "string" ? draft.text.slice(0, 4000) : "",
		reflection:
			typeof draft.reflection === "string"
				? draft.reflection.slice(0, 1000)
				: "",
	};
}

export function readPortfolio(value: unknown): MissionEntry[] {
	if (!Array.isArray(value)) return [];
	return value
		.filter((entry): entry is MissionEntry => {
			if (!entry || typeof entry !== "object") return false;
			const item = entry as MissionEntry;
			return (
				typeof item.id === "string" &&
				item.id.length <= 100 &&
				typeof item.lessonId === "string" &&
				!!findCourseLesson(item.lessonId) &&
				typeof item.text === "string" &&
				!!item.text.trim() &&
				item.text.length <= 4000 &&
				typeof item.reflection === "string" &&
				item.reflection.length <= 1000 &&
				typeof item.createdAt === "string" &&
				Number.isFinite(Date.parse(item.createdAt))
			);
		})
		.slice(-200);
}

export function getPortfolio() {
	return readPortfolio(getLocalStorageItem<unknown>(PORTFOLIO_KEY, []));
}

/** A production sample is saved, never graded or presented as proof of fluency. */
export function saveMission(
	lessonId: string,
	text: string,
	reflection: string,
) {
	if (
		!findCourseLesson(lessonId) ||
		!text.trim() ||
		text.length > 4000 ||
		reflection.length > 1000
	)
		return false;
	const entries = getPortfolio();
	const last = entries.at(-1);
	if (
		last?.lessonId === lessonId &&
		last.text === text.trim() &&
		last.reflection === reflection.trim()
	)
		return true;
	const entry: MissionEntry = {
		id: crypto.randomUUID(),
		lessonId,
		text: text.trim(),
		reflection: reflection.trim(),
		createdAt: new Date().toISOString(),
	};
	setLocalStorageItem(PORTFOLIO_KEY, [...entries, entry].slice(-200));
	return getPortfolio().some((item) => item.id === entry.id);
}
