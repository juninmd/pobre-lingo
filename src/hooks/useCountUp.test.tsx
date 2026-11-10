import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCountUp } from "./useCountUp";

function mockMotion(reduced: boolean) {
	vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: reduced }));
}

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

describe("useCountUp", () => {
	it("shows the final value at once when motion is reduced", () => {
		mockMotion(true);
		const { result } = renderHook(() => useCountUp(42));
		expect(result.current).toBe(42);
	});

	it("counts from zero up to the target", () => {
		mockMotion(false);
		vi.useFakeTimers({ toFake: ["requestAnimationFrame", "performance"] });
		const { result } = renderHook(() => useCountUp(100, 400));
		expect(result.current).toBe(0);
		act(() => {
			vi.advanceTimersByTime(200);
		});
		expect(result.current).toBeGreaterThan(0);
		expect(result.current).toBeLessThan(100);
		act(() => {
			vi.advanceTimersByTime(400);
		});
		expect(result.current).toBe(100);
	});

	it("continues from the previous value when the target changes", () => {
		mockMotion(true);
		const { result, rerender } = renderHook(({ n }) => useCountUp(n), {
			initialProps: { n: 5 },
		});
		rerender({ n: 9 });
		expect(result.current).toBe(9);
	});
});
