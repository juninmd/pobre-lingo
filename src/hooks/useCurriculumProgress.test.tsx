import { act, renderHook } from "@testing-library/react";
import { StrictMode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { localDay } from "@/lib/localDay";

const readNumber = (key: string) =>
	JSON.parse(localStorage.getItem(key) ?? "0");

function activityToday(): number {
	const log: { date: string; count: number }[] = JSON.parse(
		localStorage.getItem("pobrelingo_activity_log") ?? "[]",
	);
	return log.find((e) => e.date === localDay())?.count ?? 0;
}

describe("useCurriculumProgress.completeLesson", () => {
	beforeEach(() => localStorage.clear());

	it("logs one activity per lesson even when React replays state updaters (StrictMode)", () => {
		const { result } = renderHook(() => useCurriculumProgress(), {
			wrapper: StrictMode,
		});

		act(() => result.current.completeLesson("m1", "l1", 10));

		expect(activityToday()).toBe(1);
	});

	it("adds the XP of every lesson completed in the same batch", () => {
		const { result } = renderHook(() => useCurriculumProgress());

		act(() => {
			result.current.completeLesson("m1", "l1", 10);
			result.current.completeLesson("m1", "l2", 15);
		});

		expect(result.current.totalXP).toBe(25);
		expect(readNumber("pobrelingo_total_xp")).toBe(25);
		expect(activityToday()).toBe(2);
	});

	it("derives the level from the fresh XP total", () => {
		localStorage.setItem("pobrelingo_total_xp", "95");
		const { result } = renderHook(() => useCurriculumProgress());

		act(() => {
			result.current.completeLesson("m1", "l1", 3);
			result.current.completeLesson("m1", "l2", 3);
		});

		expect(result.current.totalXP).toBe(101);
		expect(result.current.userLevel).toBe(2);
		expect(readNumber("pobrelingo_user_level")).toBe(2);
	});

	it("does not award a lesson twice", () => {
		const { result } = renderHook(() => useCurriculumProgress());

		act(() => result.current.completeLesson("m1", "l1", 10));
		act(() => result.current.completeLesson("m1", "l1", 10));

		expect(result.current.totalXP).toBe(10);
		expect(result.current.completedLessons).toHaveLength(1);
		expect(activityToday()).toBe(1);
	});
});
