/**
 * Modelo aberto (Qwen2.5 1.5B) rodando na GPU do aparelho via WebLLM/WebGPU.
 * Sem chave e sem servidor: o modelo (~1 GB) é baixado uma vez do Hugging Face
 * e fica no cache do navegador. Escreve português, então a dica já vem em pt-BR.
 */
import type {
	AiProvider,
	ChatMessage,
	ProgressHandler,
	ProviderStatus,
} from "./types";

const MODEL_F16 = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
const MODEL_F32 = "Qwen2.5-1.5B-Instruct-q4f32_1-MLC";

type GpuAdapter = { features: Set<string> };
type GpuNavigator = Navigator & {
	gpu?: { requestAdapter(): Promise<GpuAdapter | null> };
};

async function pickModel(): Promise<string | null> {
	const gpu = (navigator as GpuNavigator).gpu;
	if (!gpu) return null;
	try {
		const adapter = await gpu.requestAdapter();
		if (!adapter) return null;
		return adapter.features.has("shader-f16") ? MODEL_F16 : MODEL_F32;
	} catch {
		return null;
	}
}

export async function webLlmStatus(): Promise<ProviderStatus> {
	const model = await pickModel();
	if (!model) return "unavailable";
	const { hasModelInCache } = await import("@mlc-ai/web-llm");
	try {
		return (await hasModelInCache(model)) ? "available" : "downloadable";
	} catch {
		return "downloadable";
	}
}

type Engine = Awaited<
	ReturnType<typeof import("@mlc-ai/web-llm").CreateWebWorkerMLCEngine>
>;

export function createWebLlmProvider(): AiProvider {
	let engine: Engine | null = null;
	let worker: Worker | null = null;
	let system = "";

	return {
		id: "webllm",
		label: "Qwen2.5 no seu aparelho (WebGPU)",
		speaksPortuguese: true,
		async load(systemPrompt: string, onProgress?: ProgressHandler) {
			system = systemPrompt;
			if (engine) return;
			const model = await pickModel();
			if (!model) throw new Error("Seu navegador não tem WebGPU.");
			const { CreateWebWorkerMLCEngine } = await import("@mlc-ai/web-llm");
			worker = new Worker(new URL("./webllm.worker.ts", import.meta.url), {
				type: "module",
			});
			engine = await CreateWebWorkerMLCEngine(worker, model, {
				initProgressCallback: (report) =>
					onProgress?.(report.progress, report.text),
			});
		},
		async reply(history: ChatMessage[], onText?: (text: string) => void) {
			if (!engine) throw new Error("Modelo não carregado.");
			const stream = await engine.chat.completions.create({
				messages: [{ role: "system", content: system }, ...history],
				stream: true,
				temperature: 0.7,
				max_tokens: 220,
			});
			let text = "";
			for await (const chunk of stream) {
				text += chunk.choices[0]?.delta?.content ?? "";
				onText?.(text);
			}
			return text;
		},
		dispose() {
			void engine?.unload();
			worker?.terminate();
			engine = null;
			worker = null;
		},
	};
}
