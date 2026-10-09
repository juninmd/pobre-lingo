import confetti from "canvas-confetti";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireConfetti, triggerConfetti } from "./confetti";

vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("confetti helper", () => {
	beforeEach(() => vi.mocked(confetti).mockClear());

	it("asks the library to skip the burst for reduced-motion users", () => {
		fireConfetti({ particleCount: 40, spread: 70 });

		expect(confetti).toHaveBeenCalledWith({
			particleCount: 40,
			spread: 70,
			disableForReducedMotion: true,
		});
	});

	it("applies the opt-out even when called without options", () => {
		fireConfetti();

		expect(confetti).toHaveBeenCalledWith({ disableForReducedMotion: true });
	});

	it("cannot be switched off by a caller", () => {
		fireConfetti({ disableForReducedMotion: false });

		expect(confetti).toHaveBeenCalledWith({ disableForReducedMotion: true });
	});

	it("routes every burst of the full celebration through the opt-out", () => {
		triggerConfetti();

		const calls = vi.mocked(confetti).mock.calls;
		expect(calls).toHaveLength(5);
		for (const [options] of calls) {
			expect(options).toMatchObject({ disableForReducedMotion: true });
		}
	});
});
