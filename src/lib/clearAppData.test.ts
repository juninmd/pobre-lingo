import { beforeEach, describe, expect, it } from "vitest";
import { clearAppData } from "./clearAppData";

describe("clearAppData", () => {
	beforeEach(() => localStorage.clear());

	it("wipes app progress but keeps keys the app does not own", () => {
		localStorage.setItem("pobrelingo_onboarded", "true");
		localStorage.setItem("pl_streak", "4");
		localStorage.setItem("daily_missions", "{}");
		localStorage.setItem("vite-ui-theme", "dark");

		clearAppData();

		expect(localStorage.getItem("pobrelingo_onboarded")).toBeNull();
		expect(localStorage.getItem("pl_streak")).toBeNull();
		expect(localStorage.getItem("daily_missions")).toBeNull();
		expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
	});
});
