import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { courseLessons } from "@/lib/course/catalog";
import { useGuidedCourse } from "./useGuidedCourse";

describe("shared guided course progress", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());
	it("updates the route guard immediately when the lesson runner completes", () => {
		const { result } = renderHook(() => [useGuidedCourse(), useGuidedCourse()]);
		const lesson = courseLessons[0];
		act(() =>
			result.current[0].complete(
				lesson.id,
				lesson.check.map((q) => q.answers[0]),
			),
		);
		expect(result.current[1].progress[lesson.id]).toBeDefined();
		let invalidSaved = true;
		act(() => {
			invalidSaved = result.current[0].complete(lesson.id, ["wrong"]);
		});
		expect(invalidSaved).toBe(false);
		expect(result.current[1].progress[lesson.id]).toBeDefined();
	});
	it("does not report completion when browser storage is full", () => {
		const { result } = renderHook(() => useGuidedCourse());
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		vi.spyOn(console, "warn").mockImplementation(() => {});
		const lesson = courseLessons[0];
		let saved = true;
		act(() => {
			saved = result.current.complete(
				lesson.id,
				lesson.check.map((q) => q.answers[0]),
			);
		});
		expect(saved).toBe(false);
		expect(result.current.progress).toEqual({});
	});
});
