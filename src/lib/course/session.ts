import { isCourseAnswerCorrect } from "./progress";
import type { GuidedLesson } from "./types";

export type LessonPhase =
	| "study"
	| "practice"
	| "check"
	| "result"
	| "mission"
	| "complete";
export interface LessonSession {
	phase: LessonPhase;
	cursor: number;
	practice: string[];
	check: string[];
}
export const newLessonSession: LessonSession = {
	phase: "study",
	cursor: 0,
	practice: [],
	check: [],
};

export function hasPassedCheck(lesson: GuidedLesson, session: LessonSession) {
	return (
		session.check.length === lesson.check.length &&
		lesson.check.every((q, i) => isCourseAnswerCorrect(q, session.check[i]))
	);
}

export function readLessonSession(
	value: unknown,
	lesson: GuidedLesson,
): LessonSession {
	if (!value || typeof value !== "object") return newLessonSession;
	const s = value as LessonSession;
	if (
		!Array.isArray(s.practice) ||
		!Array.isArray(s.check) ||
		![...s.practice, ...s.check].every(
			(a) => typeof a === "string" && a.length <= 500,
		)
	)
		return newLessonSession;
	if (
		s.practice.length > lesson.practice.length ||
		s.check.length > lesson.check.length
	)
		return newLessonSession;
	if (s.phase === "study") return newLessonSession;
	if (s.phase === "practice" || s.phase === "check") {
		const questions = lesson[s.phase];
		if (
			!Number.isInteger(s.cursor) ||
			s.cursor < 0 ||
			s.cursor >= questions.length
		)
			return newLessonSession;
		if (s[s.phase].length !== s.cursor && s[s.phase].length !== s.cursor + 1)
			return newLessonSession;
		if (s.phase === "check" && s.practice.length !== lesson.practice.length)
			return newLessonSession;
		return s;
	}
	if (
		["result", "mission", "complete"].includes(s.phase) &&
		s.practice.length === lesson.practice.length &&
		s.check.length === lesson.check.length
	) {
		if (s.phase !== "result" && !hasPassedCheck(lesson, s))
			return newLessonSession;
		return s;
	}
	return newLessonSession;
}

export function submitLessonAnswer(
	session: LessonSession,
	answer: string,
): LessonSession {
	if (session.phase !== "practice" && session.phase !== "check") return session;
	if (
		!answer.trim() ||
		answer.length > 500 ||
		session[session.phase].length > session.cursor
	)
		return session;
	return {
		...session,
		[session.phase]: [...session[session.phase], answer.trim()],
	};
}

export function advanceLesson(
	session: LessonSession,
	lesson: GuidedLesson,
): LessonSession {
	if (session.phase === "study")
		return { ...newLessonSession, phase: "practice" };
	if (session.phase === "practice" || session.phase === "check") {
		if (session[session.phase].length <= session.cursor) return session;
		if (session.cursor + 1 < lesson[session.phase].length)
			return { ...session, cursor: session.cursor + 1 };
		return {
			...session,
			cursor: 0,
			phase: session.phase === "practice" ? "check" : "result",
		};
	}
	if (session.phase === "result" && hasPassedCheck(lesson, session))
		return { ...session, phase: "mission" };
	if (session.phase === "mission" && hasPassedCheck(lesson, session))
		return { ...session, phase: "complete" };
	return session;
}
