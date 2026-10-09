import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DailyQuestsWidget } from "@/components/dashboard/DailyQuestsWidget";
import {
	EVENING_LOCAL_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";

const confetti = vi.hoisted(() => vi.fn());
vi.mock("canvas-confetti", () => ({ default: confetti }));

function seedLessonDoneAt(when: Date) {
	localStorage.setItem(
		"pobrelingo_curriculum_progress",
		JSON.stringify([
			{
				moduleId: "m1",
				lessonId: "l1",
				completed: true,
				completedAt: when.toISOString(),
				xpEarned: 10,
			},
		]),
	);
}

describe("DailyQuestsWidget day boundary", () => {
	setupLocalEvening();
	beforeEach(() => {
		localStorage.clear();
		confetti.mockClear();
	});

	it("celebrates the goal once per local day, keyed by the local day", () => {
		localStorage.setItem(
			"pobrelingo_activity_log",
			JSON.stringify([{ date: EVENING_LOCAL_DAY, count: 5 }]),
		);

		render(<DailyQuestsWidget />);

		expect(confetti).toHaveBeenCalledTimes(1);
		expect(localStorage.getItem("daily_goal_celebrated_today")).toBe(
			EVENING_LOCAL_DAY,
		);
	});

	it("does not celebrate again after the local-day marker was already stored", () => {
		localStorage.setItem(
			"pobrelingo_activity_log",
			JSON.stringify([{ date: EVENING_LOCAL_DAY, count: 5 }]),
		);
		localStorage.setItem("daily_goal_celebrated_today", EVENING_LOCAL_DAY);

		render(<DailyQuestsWidget />);

		expect(confetti).not.toHaveBeenCalled();
	});

	it("resets the lesson quests at local midnight while the page stays open", () => {
		seedLessonDoneAt(new Date(2026, 9, 8, 22, 0));
		render(<DailyQuestsWidget />);
		expect(screen.getByText("1 / 3")).toBeInTheDocument();

		act(() => {
			vi.setSystemTime(new Date(2026, 9, 9, 0, 1));
			vi.advanceTimersByTime(5000);
		});

		expect(screen.getByText("0 / 3")).toBeInTheDocument();
		expect(screen.queryByText("1 / 3")).not.toBeInTheDocument();
	});
});
