import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	GamificationProvider,
	useGamification,
} from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

const wrapper = ({ children }: { children: ReactNode }) => (
	<NotificationProvider>
		<GamificationProvider>{children}</GamificationProvider>
	</NotificationProvider>
);

const mount = () => renderHook(() => useGamification(), { wrapper });

describe("GamificationProvider", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it.each([
		["not JSON", "x"],
		["an object", '{"a":1}'],
		["a bare string", '"first_steps"'],
		["null", "null"],
		["mixed types", '["first_steps", 3]'],
	])("mounts with no achievements when pl_achievements is %s", (_l, raw) => {
		localStorage.setItem("pl_achievements", raw);
		const { result } = mount();
		expect(result.current.unlockedAchievements).toEqual([]);
	});

	it.each([
		"abc",
		"NaN",
		"-5",
		"null",
		"Infinity",
		'{"a":1}',
	])("mounts with xp, gems and level at defaults when the counters hold %s", (raw) => {
		localStorage.setItem("pl_xp", raw);
		localStorage.setItem("pl_gems", raw);
		const { result } = mount();
		expect(result.current.xp).toBe(0);
		expect(result.current.gems).toBe(0);
		expect(result.current.level).toBe(1);
	});

	it("loads valid stored progress", () => {
		localStorage.setItem("pl_xp", "250");
		localStorage.setItem("pl_gems", "30");
		localStorage.setItem("pl_achievements", '["first_steps"]');
		const { result } = mount();
		expect(result.current.xp).toBe(250);
		expect(result.current.gems).toBe(30);
		expect(result.current.level).toBe(2);
		expect(result.current.unlockedAchievements).toContain("first_steps");
	});

	it("persists earned xp and gems in the format older versions read", () => {
		const { result } = mount();
		act(() => {
			result.current.addXp(10);
			result.current.addGem(3);
		});
		expect(localStorage.getItem("pl_xp")).toBe("10");
		expect(localStorage.getItem("pl_gems")).toBe("3");
	});

	it("keeps working when the disk is full", () => {
		const { result } = mount();
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		expect(() => act(() => result.current.addXp(10))).not.toThrow();
		expect(result.current.xp).toBe(10);
	});

	it("exposes a stable context value while nothing changed", () => {
		const { result, rerender } = mount();
		const first = result.current;
		rerender();
		expect(result.current).toBe(first);
	});

	it("follows xp, gems and achievements written by another tab", () => {
		const { result } = mount();
		localStorage.setItem("pl_xp", "900");
		localStorage.setItem("pl_gems", "12");
		localStorage.setItem("pl_achievements", '["scholar"]');

		act(() => {
			for (const key of ["pl_xp", "pl_gems", "pl_achievements"]) {
				window.dispatchEvent(new StorageEvent("storage", { key }));
			}
		});

		expect(result.current.xp).toBe(900);
		expect(result.current.gems).toBe(12);
		expect(result.current.unlockedAchievements).toContain("scholar");
	});

	it("does not let a tab clobber progress another tab just earned", () => {
		const { result } = mount();
		localStorage.setItem("pl_xp", "100");
		act(() => {
			window.dispatchEvent(new StorageEvent("storage", { key: "pl_xp" }));
		});

		act(() => result.current.addXp(5));

		expect(localStorage.getItem("pl_xp")).toBe("105");
	});
});
