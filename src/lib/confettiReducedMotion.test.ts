import { describe, expect, it, vi } from "vitest";

describe("fireConfetti with the real library", () => {
	it("draws nothing when the user prefers reduced motion", async () => {
		// canvas-confetti reads the media query on first use, so stub it before importing.
		vi.stubGlobal(
			"matchMedia",
			vi.fn((query: string) => ({ matches: true, media: query })),
		);
		const { fireConfetti } = await import("./confetti");

		await fireConfetti({ particleCount: 50 });

		expect(document.querySelector("canvas")).toBeNull();
	});
});
