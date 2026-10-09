import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { press, tab } from "@/test/keyboard";
import {
	EVENING_LOCAL_DAY,
	EVENING_UTC_DAY,
	setupLocalEvening,
} from "@/test-utils/localEvening";
import { MascotGreeting } from "./MascotGreeting";

const mocks = vi.hoisted(() => ({ addXp: vi.fn(), toast: vi.fn() }));

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({ xp: 0, level: 1, addXp: mocks.addXp }),
}));
vi.mock("@/contexts/ThemeContext", () => ({
	useTheme: () => ({ theme: "light" }),
}));
vi.mock("@/hooks/use-toast", () => ({
	useToast: () => ({ toast: mocks.toast }),
}));

const mascot = () => screen.getByRole("button", { name: /bônus diário/i });

function claimWithKeyboard() {
	const button = mascot();
	for (let i = 0; i < 5 && document.activeElement !== button; i++) tab();
	press("Enter");
}

describe("MascotGreeting daily bonus", () => {
	setupLocalEvening();

	beforeEach(() => {
		window.localStorage.clear();
		for (const fn of Object.values(mocks)) fn.mockClear();
	});

	it("can be claimed from the keyboard", () => {
		render(<MascotGreeting />);

		claimWithKeyboard();

		expect(mocks.addXp).toHaveBeenCalledWith(5);
	});

	it("pays out once per local day, however often it is clicked", () => {
		render(<MascotGreeting />);

		claimWithKeyboard();
		claimWithKeyboard();
		claimWithKeyboard();

		expect(mocks.addXp).toHaveBeenCalledTimes(1);
	});

	it("remembers the claim across remounts and reloads", () => {
		const { unmount } = render(<MascotGreeting />);
		claimWithKeyboard();
		unmount();

		render(<MascotGreeting />);
		claimWithKeyboard();

		expect(mocks.addXp).toHaveBeenCalledTimes(1);
	});

	it("stores the claim under the local day, not the UTC day", () => {
		render(<MascotGreeting />);

		claimWithKeyboard();

		const stored = JSON.parse(
			window.localStorage.getItem("pobrelingo_mascot_bonus_day") ?? "null",
		);
		expect(stored).toBe(EVENING_LOCAL_DAY);
		expect(stored).not.toBe(EVENING_UTC_DAY);
	});

	it("does not pay twice when UTC midnight passes within one local day", () => {
		vi.setSystemTime(new Date(2026, 9, 8, 20, 30));
		render(<MascotGreeting />);
		claimWithKeyboard();

		vi.setSystemTime(new Date(2026, 9, 8, 22, 30));
		claimWithKeyboard();

		expect(mocks.addXp).toHaveBeenCalledTimes(1);
	});

	it("pays again once the local day rolls over", () => {
		render(<MascotGreeting />);
		claimWithKeyboard();

		vi.setSystemTime(new Date(2026, 9, 9, 0, 10));
		claimWithKeyboard();

		expect(mocks.addXp).toHaveBeenCalledTimes(2);
	});
});
