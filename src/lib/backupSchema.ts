/**
 * Expected shape of values the app reads without its own guards. A tampered or
 * corrupted backup must not plant a value that breaks app startup.
 */
import {
	isNonNegativeNumber,
	isRecord,
	isStringArray,
} from "@/lib/storageGuards";

const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

const isOptional = (value: unknown, check: (v: unknown) => boolean) =>
	value === undefined || check(value);

const isDateString = (value: unknown) =>
	typeof value === "string" && !Number.isNaN(Date.parse(value));

const isFiniteNumber = (value: unknown) =>
	typeof value === "number" && Number.isFinite(value);

/** Lessons as useCurriculumProgress persists them; the dashboard reads every field below. */
const isLessonList = (value: unknown): boolean =>
	isArray(value) &&
	value.every(
		(lesson) =>
			isRecord(lesson) &&
			typeof lesson.moduleId === "string" &&
			typeof lesson.lessonId === "string" &&
			isOptional(lesson.completedAt, isDateString) &&
			isOptional(lesson.xpEarned, isFiniteNumber),
	);

const KNOWN_KEYS: Record<string, (value: unknown) => boolean> = {
	pl_xp: isNonNegativeNumber,
	pl_gems: isNonNegativeNumber,
	pl_achievements: isStringArray,
	pobrelingo_streak: isNonNegativeNumber,
	pobrelingo_srs_cards: isArray,
	pobrelingo_notifications: isArray,
	pobrelingo_notification_prefs: isRecord,
	pobrelingo_notification_dispatched: isStringArray,
	pobrelingo_study_log: isRecord,
	pobrelingo_activity_log: isArray,
	pobrelingo_curriculum_progress: isLessonList,
	pobrelingo_total_xp: isNonNegativeNumber,
	pobrelingo_user_level: isNonNegativeNumber,
};

/** Keys with no known shape pass; known keys must match. */
export function hasValidShape(key: string, raw: string): boolean {
	const check = KNOWN_KEYS[key];
	if (!check) return true;
	try {
		return check(JSON.parse(raw));
	} catch {
		return false;
	}
}
