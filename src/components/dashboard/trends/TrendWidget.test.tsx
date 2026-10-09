import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TrendWidget } from "@/components/dashboard/trends/TrendWidget";

const addXp = vi.fn();
const notify = vi.fn();

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ addXp }),
}));
vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({ notify }),
}));

function widget(title = "Nano-learning") {
	return (
		<TrendWidget
			title={title}
			description="d"
			icon={<span />}
			xpReward={10}
			actionText="Praticar"
		/>
	);
}

describe("trends/TrendWidget daily XP", () => {
	beforeEach(() => {
		localStorage.clear();
		addXp.mockClear();
		notify.mockClear();
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2026, 9, 8, 10, 0));
	});
	afterEach(() => vi.useRealTimers());

	it("awards XP once and shows the widget as completed", () => {
		render(widget());

		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));

		expect(addXp).toHaveBeenCalledTimes(1);
		expect(addXp).toHaveBeenCalledWith(10);
		expect(screen.getByRole("button", { name: "Concluído" })).toBeDisabled();
	});

	it("does not re-award XP when the widget is mounted again the same day", () => {
		const first = render(widget());
		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));
		first.unmount();

		render(widget());

		const done = screen.getByRole("button", { name: "Concluído" });
		expect(done).toBeDisabled();
		fireEvent.click(done);
		expect(addXp).toHaveBeenCalledTimes(1);
	});

	it("keeps completions independent per widget", () => {
		const first = render(widget("Nano-learning"));
		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));
		first.unmount();

		render(widget("Mindfulness"));

		expect(screen.getByRole("button", { name: "Praticar" })).toBeEnabled();
	});

	it("is available again on the next local day", () => {
		const first = render(widget());
		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));
		first.unmount();
		vi.setSystemTime(new Date(2026, 9, 9, 0, 5));

		render(widget());
		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));

		expect(addXp).toHaveBeenCalledTimes(2);
	});

	it("does not reset at 21:00 in a UTC-3 zone, only at local midnight", () => {
		vi.stubEnv("TZ", "America/Sao_Paulo");
		vi.setSystemTime(new Date(2026, 9, 8, 20, 30));
		const first = render(widget());
		fireEvent.click(screen.getByRole("button", { name: "Praticar" }));
		first.unmount();
		vi.setSystemTime(new Date(2026, 9, 8, 21, 30));

		render(widget());

		expect(screen.getByRole("button", { name: "Concluído" })).toBeDisabled();
		vi.unstubAllEnvs();
	});
});
