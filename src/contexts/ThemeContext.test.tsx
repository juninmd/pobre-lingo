import { act, render, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

const wrapper = ({ children }: { children: ReactNode }) => (
	<ThemeProvider storageKey="test-theme">{children}</ThemeProvider>
);

describe("ThemeProvider", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.restoreAllMocks());

	it("restores a valid stored theme", () => {
		localStorage.setItem("test-theme", "dark");
		const { result } = renderHook(() => useTheme(), { wrapper });
		expect(result.current.theme).toBe("dark");
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it.each(["x", "Dark", "null"])(
		"falls back to the default theme when storage holds %j",
		(raw) => {
			localStorage.setItem("test-theme", raw);
			const { result } = renderHook(() => useTheme(), { wrapper });
			expect(result.current.theme).toBe("light");
		},
	);

	it("still mounts when storage access is blocked", () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new DOMException("denied", "SecurityError");
		});
		const { result } = renderHook(() => useTheme(), { wrapper });
		expect(result.current.theme).toBe("light");
	});

	it("persists the choice and still switches when the disk is full", () => {
		const { result } = renderHook(() => useTheme(), { wrapper });
		act(() => result.current.setTheme("pobre-lingo"));
		expect(localStorage.getItem("test-theme")).toBe("pobre-lingo");

		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		act(() => result.current.setTheme("dark"));
		expect(result.current.theme).toBe("dark");
	});

	it("hands consumers a stable value across unrelated re-renders", () => {
		const seen: unknown[] = [];
		const Probe = () => {
			seen.push(useTheme());
			return null;
		};
		const tree = (
			<ThemeProvider storageKey="test-theme">
				<Probe />
			</ThemeProvider>
		);
		const { rerender } = render(tree);
		rerender(
			<ThemeProvider storageKey="test-theme">
				<Probe />
			</ThemeProvider>,
		);
		expect(seen.length).toBeGreaterThan(1);
		expect(new Set(seen).size).toBe(1);
	});
});
