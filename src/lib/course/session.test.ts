import { describe, expect, it } from "vitest";
import { courseLessons } from "./catalog";
import {
	advanceLesson,
	hasPassedCheck,
	newLessonSession,
	readLessonSession,
	submitLessonAnswer,
} from "./session";

const first = courseLessons[0];

describe("lesson session", () => {
	it("requires an answer and cannot change a checked answer", () => {
		const practicing = advanceLesson(newLessonSession, first);
		expect(advanceLesson(practicing, first)).toBe(practicing);
		expect(submitLessonAnswer(practicing, " ")).toBe(practicing);
		const answered = submitLessonAnswer(practicing, "wrong");
		expect(submitLessonAnswer(answered, "hello")).toBe(answered);
		expect(advanceLesson(answered, first).cursor).toBe(1);
	});
	it("separates assisted practice from independent checking and restores a session", () => {
		let session = advanceLesson(newLessonSession, first);
		for (const q of first.practice)
			session = advanceLesson(submitLessonAnswer(session, q.answers[0]), first);
		expect(session.phase).toBe("check");
		expect(hasPassedCheck(first, session)).toBe(false);
		for (const q of first.check)
			session = advanceLesson(submitLessonAnswer(session, q.answers[0]), first);
		expect(session.phase).toBe("result");
		expect(hasPassedCheck(first, session)).toBe(true);
		expect(
			readLessonSession(JSON.parse(JSON.stringify(session)), first),
		).toEqual(session);
		expect(advanceLesson(session, first).phase).toBe("mission");
	});
	it("keeps failed checks from progressing to mission", () => {
		const failed = {
			phase: "result" as const,
			cursor: 0,
			practice: first.practice.map(() => "wrong"),
			check: first.check.map(() => "wrong"),
		};
		expect(advanceLesson(failed, first)).toBe(failed);
		expect(readLessonSession({ ...failed, phase: "complete" }, first)).toEqual(
			newLessonSession,
		);
	});
	it("rejects corrupt or impossible persisted sessions", () => {
		for (const raw of [
			null,
			{},
			{ ...newLessonSession, phase: "check", cursor: 99 },
			{ ...newLessonSession, phase: "practice", practice: [42] },
		])
			expect(readLessonSession(raw, first)).toEqual(newLessonSession);
	});
});
