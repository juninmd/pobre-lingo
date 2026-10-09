import { describe, expect, it } from "vitest";
import { parseBackup } from "@/lib/backup";
import { hasValidShape } from "@/lib/backupSchema";

const PROGRESS = "pobrelingo_curriculum_progress";

// Same literal useCurriculumProgress.completeLesson persists.
const writtenLesson = {
	moduleId: "m1",
	lessonId: "l1",
	completed: true,
	completedAt: "2026-10-08T22:30:00.000Z",
	xpEarned: 50,
};

describe("curriculum progress shape", () => {
	it.each([
		["an empty list", []],
		["lessons as the app writes them", [writtenLesson, writtenLesson]],
		[
			"a lesson without the optional fields",
			[{ moduleId: "m", lessonId: "l" }],
		],
	])("accepts %s", (_label, value) => {
		expect(hasValidShape(PROGRESS, JSON.stringify(value))).toBe(true);
	});

	// useCurriculumProgress calls .map on it and reads l.moduleId on every item.
	it.each([
		["an object, where .map would throw", "{}"],
		["a string", '"x"'],
		["null", "null"],
		["a null element", "[null]"],
		["a numeric element", "[1]"],
		["a lesson without moduleId", '[{"lessonId":"l"}]'],
		["a non-string lessonId", '[{"moduleId":"m","lessonId":3}]'],
		[
			"a non-string completedAt",
			'[{"moduleId":"m","lessonId":"l","completedAt":5}]',
		],
		[
			"an unparseable completedAt",
			'[{"moduleId":"m","lessonId":"l","completedAt":"x"}]',
		],
		[
			"a non-numeric xpEarned",
			'[{"moduleId":"m","lessonId":"l","xpEarned":"9"}]',
		],
	])("rejects %s", (_label, raw) => {
		expect(hasValidShape(PROGRESS, raw)).toBe(false);
	});

	it("keeps the user's progress out of a backup that would crash the dashboard", () => {
		const parsed = parseBackup(
			JSON.stringify({ pl_xp: "5", [PROGRESS]: "{}" }),
		);

		expect(parsed.ok && parsed.skipped).toEqual([PROGRESS]);
	});
});

describe.each(["pobrelingo_total_xp", "pobrelingo_user_level"])("%s", (key) => {
	it.each([
		"0",
		"250",
		"3",
	])("accepts %s as written by setLocalStorageItem", (raw) => {
		expect(hasValidShape(key, raw)).toBe(true);
	});

	it.each([
		["a negative number", "-1"],
		["a string", '"250"'],
		["NaN serialised as null", "null"],
		["an object", "{}"],
		["not JSON", "abc"],
	])("rejects %s", (_label, raw) => {
		expect(hasValidShape(key, raw)).toBe(false);
	});
});
