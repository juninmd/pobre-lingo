import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWebLlmProvider } from "@/lib/ai/webllmProvider";

const createEngine = vi.hoisted(() => vi.fn());
vi.mock("@mlc-ai/web-llm", () => ({
	CreateWebWorkerMLCEngine: createEngine,
	hasModelInCache: vi.fn(),
}));

class FakeWorker {
	static instances: FakeWorker[] = [];
	terminate = vi.fn();
	constructor() {
		FakeWorker.instances.push(this);
	}
}

function deferred<T>() {
	let resolve!: (value: T) => void;
	const promise = new Promise<T>((res) => {
		resolve = res;
	});
	return { promise, resolve };
}

const engine = () => ({ unload: vi.fn(), chat: { completions: {} } });

describe("webllm provider worker lifecycle", () => {
	beforeEach(() => {
		FakeWorker.instances = [];
		createEngine.mockReset();
		vi.stubGlobal("Worker", FakeWorker);
		vi.stubGlobal("navigator", {
			gpu: { requestAdapter: async () => ({ features: new Set<string>() }) },
		});
	});
	afterEach(() => vi.unstubAllGlobals());

	it("creates no worker when disposed before the model chunk finishes loading", async () => {
		createEngine.mockResolvedValue(engine());
		const provider = createWebLlmProvider();

		const loading = provider.load("system");
		provider.dispose();

		await expect(loading).rejects.toThrow();
		expect(FakeWorker.instances).toHaveLength(0);
	});

	it("terminates the worker once and drops the engine when disposed mid-load", async () => {
		const pending = deferred<ReturnType<typeof engine>>();
		createEngine.mockReturnValue(pending.promise);
		const provider = createWebLlmProvider();

		const loading = provider.load("system");
		await vi.waitFor(() => expect(FakeWorker.instances).toHaveLength(1));
		provider.dispose();
		pending.resolve(engine());

		await expect(loading).rejects.toThrow();
		expect(FakeWorker.instances[0].terminate).toHaveBeenCalledTimes(1);
		await expect(provider.reply([])).rejects.toThrow("Modelo não carregado.");
	});

	it("terminates the worker of a failed load instead of leaking it on retry", async () => {
		createEngine
			.mockRejectedValueOnce(new Error("out of memory"))
			.mockResolvedValueOnce(engine());
		const provider = createWebLlmProvider();

		await expect(provider.load("system")).rejects.toThrow("out of memory");
		const [failed] = FakeWorker.instances;
		expect(failed.terminate).toHaveBeenCalledTimes(1);

		await provider.load("system");
		const [, retried] = FakeWorker.instances;
		expect(FakeWorker.instances).toHaveLength(2);
		expect(retried.terminate).not.toHaveBeenCalled();

		provider.dispose();
		expect(retried.terminate).toHaveBeenCalledTimes(1);
		expect(failed.terminate).toHaveBeenCalledTimes(1);
	});

	it("shares one worker between concurrent load calls", async () => {
		const pending = deferred<ReturnType<typeof engine>>();
		createEngine.mockReturnValue(pending.promise);
		const provider = createWebLlmProvider();

		const first = provider.load("system");
		const second = provider.load("system");
		await vi.waitFor(() => expect(FakeWorker.instances).toHaveLength(1));
		pending.resolve(engine());
		await Promise.all([first, second]);

		expect(FakeWorker.instances).toHaveLength(1);
		expect(createEngine).toHaveBeenCalledTimes(1);
	});
});
