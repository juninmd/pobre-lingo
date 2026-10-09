import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	EVENING_LOCAL_DAY,
	EVENING_UTC_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";
import { RightColumnWidgets } from "./RightColumnWidgets";

const addGem = vi.hoisted(() => vi.fn());

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addGem }),
}));
vi.mock("@/components/dashboard/SmartReviewWidget", () => ({
	SmartReviewWidget: () => null,
}));
vi.mock("@/components/dashboard/DailyQuestsWidget", () => ({
	DailyQuestsWidget: () => null,
}));
vi.mock("@/components/dashboard/WeeklyGoalWidget", () => ({
	WeeklyGoalWidget: () => null,
}));
vi.mock("@/components/dashboard/WordOfTheDayWidget", () => ({
	WordOfTheDayWidget: () => null,
}));
vi.mock("@/components/dashboard/CalmPracticeCard", () => ({
	CalmPracticeCard: () => null,
}));
vi.mock("@/components/dashboard/CertificationPlanCard", () => ({
	CertificationPlanCard: () => null,
}));
vi.mock("@/components/dashboard/trends/MindfulWidget", () => ({
	MindfulWidget: () => <div data-testid="mindful-widget" />,
}));

const TIP_KEY = "daily_tip_reward_claimed";

const renderColumn = () =>
	render(
		<MemoryRouter>
			<RightColumnWidgets />
		</MemoryRouter>,
	);

describe("RightColumnWidgets", () => {
	setupLocalEvening();

	beforeEach(() => {
		window.localStorage.clear();
		addGem.mockClear();
	});

	it("leaves the mindfulness widget to the trends section", () => {
		renderColumn();

		expect(screen.queryByTestId("mindful-widget")).not.toBeInTheDocument();
	});

	it("stores the tip reward under the user's local day, not the UTC day", () => {
		renderColumn();

		fireEvent.click(screen.getByRole("button", { name: /Entendi/ }));

		const stored = window.localStorage.getItem(TIP_KEY);
		expect(stored).toBe(EVENING_LOCAL_DAY);
		expect(stored).not.toBe(EVENING_UTC_DAY);
		expect(addGem).toHaveBeenCalledWith(5);
	});

	it("recognizes a reward already claimed earlier on the local day", () => {
		window.localStorage.setItem(TIP_KEY, EVENING_LOCAL_DAY);

		renderColumn();

		expect(screen.getByRole("button", { name: "Resgatado!" })).toBeDisabled();
	});

	it("does not treat a reward stamped with tomorrow's UTC date as claimed today", () => {
		window.localStorage.setItem(TIP_KEY, EVENING_UTC_DAY);

		renderColumn();

		expect(screen.getByRole("button", { name: /Entendi/ })).toBeEnabled();
	});
});
