import { describe, expect, it } from "vitest";
import { courseLessons, courseLevels } from "./catalog";
import {
	completeCourseLesson,
	isCourseLessonAvailable,
	nextCourseLesson,
	readCourseProgress,
} from "./progress";

const first = courseLessons[0];
const second = courseLessons[1];
const now = new Date("2026-09-30T12:00:00Z");
const correctAnswers = first.check.map((q) => q.answers[0]);

describe("guided course mastery and review", () => {
	it("has usable content and unique question IDs at every stage", () => {
		expect(new Set(courseLessons.map((l) => l.id)).size).toBe(
			courseLessons.length,
		);
		const ids = courseLessons.flatMap((l) =>
			[...l.practice, ...l.check].map((q) => q.id),
		);
		expect(new Set(ids).size).toBe(ids.length);
		for (const level of courseLevels)
			expect(courseLessons.some((l) => l.level === level)).toBe(true);
		for (const lesson of courseLessons) {
			expect(lesson.examples.length).toBeGreaterThanOrEqual(3);
			expect(lesson.practice.length).toBeGreaterThanOrEqual(2);
			expect(lesson.check.length).toBeGreaterThanOrEqual(3);
			expect(
				[...lesson.practice, ...lesson.check].every((q) =>
					q.answers.every((a) => a.trim()),
				),
			).toBe(true);
		}
	});
	it("does not unlock on incomplete, wrong or out-of-order evidence", () => {
		expect(isCourseLessonAvailable(second.id, {})).toBe(false);
		expect(
			completeCourseLesson({}, first.id, correctAnswers.slice(1), now),
		).toEqual({});
		expect(
			completeCourseLesson(
				{},
				first.id,
				["wrong", ...correctAnswers.slice(1)],
				now,
			),
		).toEqual({});
		expect(
			completeCourseLesson(
				{},
				second.id,
				second.check.map((q) => q.answers[0]),
				now,
			),
		).toEqual({});
		expect(completeCourseLesson({}, "unknown", [], now)).toEqual({});
	});
	it("accepts punctuation and case variations and unlocks only the next step", () => {
		const progress = completeCourseLesson(
			{},
			first.id,
			[" HI! ", "My name is Leo.", "MEET"],
			now,
		);
		expect(isCourseLessonAvailable(second.id, progress)).toBe(true);
		expect(isCourseLessonAvailable(courseLessons[2].id, progress)).toBe(false);
		expect(nextCourseLesson(progress, now)?.id).toBe(second.id);
	});
	it("reviews due material first and does not postpone review by reopening", () => {
		const progress = completeCourseLesson({}, first.id, correctAnswers, now);
		expect(progress[first.id].reviewAt).toBe("2026-10-01T12:00:00.000Z");
		expect(completeCourseLesson(progress, first.id, correctAnswers, now)).toBe(
			progress,
		);
		const due = new Date("2026-10-01T12:00:00Z");
		expect(nextCourseLesson(progress, due)?.id).toBe(first.id);
		const reviewed = completeCourseLesson(
			progress,
			first.id,
			correctAnswers,
			due,
		);
		expect(reviewed[first.id].reviewAt).toBe("2026-10-04T12:00:00.000Z");
		expect(reviewed[first.id].reviews).toBe(1);
	});
	it("recovers from malformed persisted progress", () => {
		for (const raw of [
			null,
			[],
			"hello",
			{ hello: { completedAt: "bad" } },
			{ unknown: {} },
		])
			expect(readCourseProgress(raw)).toEqual({});
		const progress = completeCourseLesson({}, first.id, correctAnswers, now);
		expect(readCourseProgress(JSON.parse(JSON.stringify(progress)))).toEqual(
			progress,
		);
	});
});
