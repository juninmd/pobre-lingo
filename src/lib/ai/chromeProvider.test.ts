import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createChromeProvider } from "@/lib/ai/chromeProvider";

function streamOf(...chunks: string[]) {
	return (async function* () {
		yield* chunks;
	})();
}

function failingStream() {
	return (async function* () {
		yield* [] as string[];
		throw new Error("model crashed");
	})();
}

describe("chrome provider session sync", () => {
	const promptStreaming = vi.fn();

	beforeEach(() => {
		promptStreaming.mockReset();
		vi.stubGlobal("LanguageModel", {
			availability: vi.fn(),
			create: vi.fn().mockResolvedValue({
				prompt: vi.fn(),
				promptStreaming,
				destroy: vi.fn(),
			}),
		});
	});
	afterEach(() => vi.unstubAllGlobals());

	it("sends only the newest user message after a successful turn", async () => {
		const provider = createChromeProvider();
		await provider.load("system");
		promptStreaming.mockReturnValueOnce(streamOf("Hello!"));
		await provider.reply([{ role: "user", content: "Hi" }]);

		promptStreaming.mockReturnValueOnce(streamOf("Fine."));
		await provider.reply([
			{ role: "user", content: "Hi" },
			{ role: "assistant", content: "Hello!" },
			{ role: "user", content: "How are you?" },
		]);

		expect(promptStreaming).toHaveBeenLastCalledWith("How are you?");
	});

	it("does not drop the student's next message after a failed turn", async () => {
		const provider = createChromeProvider();
		await provider.load("system");
		promptStreaming.mockReturnValueOnce(failingStream());
		await expect(
			provider.reply([{ role: "user", content: "Hi" }]),
		).rejects.toThrow("model crashed");

		promptStreaming.mockReturnValueOnce(streamOf("Sure."));
		await provider.reply([
			{ role: "user", content: "Hi" },
			{ role: "user", content: "I am Ana" },
		]);

		const sent = promptStreaming.mock.calls.at(-1)?.[0] as string;
		expect(sent).toContain("I am Ana");
		expect(sent).not.toBe("");
	});
});

describe("chrome provider dispose during load", () => {
	afterEach(() => vi.unstubAllGlobals());

	function stubPendingCreate() {
		let resolveCreate: (session: unknown) => void = () => {};
		const created = {
			prompt: vi.fn(),
			promptStreaming: vi.fn(),
			destroy: vi.fn(),
		};
		vi.stubGlobal("LanguageModel", {
			availability: vi.fn(),
			create: vi.fn(
				() =>
					new Promise((resolve) => {
						resolveCreate = resolve;
					}),
			),
		});
		return { created, finishCreate: () => resolveCreate(created) };
	}

	it("destroys the session that finishes creating after dispose", async () => {
		const { created, finishCreate } = stubPendingCreate();
		const provider = createChromeProvider();

		const loading = provider.load("system");
		provider.dispose();
		finishCreate();

		await expect(loading).rejects.toThrow();
		expect(created.destroy).toHaveBeenCalledTimes(1);
	});

	it("keeps no session after dispose, so a reply cannot reach the model", async () => {
		const { created, finishCreate } = stubPendingCreate();
		const provider = createChromeProvider();

		const loading = provider.load("system");
		provider.dispose();
		finishCreate();
		await loading.catch(() => {});

		await expect(provider.reply([])).rejects.toThrow("Modelo não carregado.");
		expect(created.promptStreaming).not.toHaveBeenCalled();
	});

	it("does not destroy a healthy session twice on a repeated dispose", async () => {
		const { created, finishCreate } = stubPendingCreate();
		const provider = createChromeProvider();
		const loading = provider.load("system");
		finishCreate();
		await loading;

		provider.dispose();
		provider.dispose();

		expect(created.destroy).toHaveBeenCalledTimes(1);
	});
});
