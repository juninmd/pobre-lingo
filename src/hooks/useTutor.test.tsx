import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTutor } from "@/hooks/useTutor";
import { TUTOR_SCENARIOS } from "@/lib/ai/tutorPrompt";
import type { AiProvider } from "@/lib/ai/types";

const selectProvider = vi.hoisted(() => vi.fn());
vi.mock("@/lib/ai/selectProvider", () => ({ selectProvider }));
vi.mock("@/lib/ai/translator", () => ({
	translateToPortuguese: vi.fn(async (text: string) => text),
}));

function fakeProvider(): AiProvider {
	return {
		id: "webllm",
		label: "Fake",
		speaksPortuguese: true,
		load: vi.fn().mockResolvedValue(undefined),
		reply: vi.fn().mockResolvedValue("Hello"),
		dispose: vi.fn(),
	};
}

describe("useTutor provider detection", () => {
	beforeEach(() => selectProvider.mockReset());

	it("leaves 'detecting' with a retryable error when detection fails (e.g. offline chunk)", async () => {
		selectProvider.mockRejectedValueOnce(
			new Error("Failed to fetch dynamically imported module"),
		);
		const { result } = renderHook(() => useTutor(TUTOR_SCENARIOS[0], "A1"));

		await waitFor(() => expect(result.current.phase).toBe("error"));
		expect(result.current.error).toMatch(/conexão/i);
		expect(result.current.error).not.toMatch(/dynamically/);

		selectProvider.mockResolvedValueOnce({
			provider: fakeProvider(),
			status: "available",
		});
		act(() => result.current.retry());
		expect(result.current.phase).toBe("detecting");
		await waitFor(() => expect(result.current.phase).toBe("idle"));
		expect(result.current.error).toBeNull();
	});

	it("disposes a provider that resolves after the session was torn down", async () => {
		const provider = fakeProvider();
		let resolveSelect!: (value: unknown) => void;
		selectProvider.mockReturnValueOnce(
			new Promise((resolve) => {
				resolveSelect = resolve;
			}),
		);
		const { unmount } = renderHook(() => useTutor(TUTOR_SCENARIOS[0], "A1"));

		unmount();
		resolveSelect({ provider, status: "available" });

		await waitFor(() => expect(provider.dispose).toHaveBeenCalledTimes(1));
	});
});
