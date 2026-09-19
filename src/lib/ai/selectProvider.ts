import { chromeAiStatus, createChromeProvider } from "./chromeProvider";
import type { AiProvider, ProviderStatus } from "./types";
import { createWebLlmProvider, webLlmStatus } from "./webllmProvider";

export type ProviderChoice = {
	provider: AiProvider | null;
	status: ProviderStatus;
};

/**
 * Prefere a IA embutida do Chrome (já instalada, sem download grande). Sem ela,
 * usa o modelo aberto via WebGPU. Sem nenhum dos dois, o tutor fica indisponível.
 */
export async function selectProvider(): Promise<ProviderChoice> {
	const chrome = await chromeAiStatus();
	if (chrome !== "unavailable") {
		return { provider: createChromeProvider(), status: chrome };
	}
	const webllm = await webLlmStatus();
	if (webllm !== "unavailable") {
		return { provider: createWebLlmProvider(), status: webllm };
	}
	return { provider: null, status: "unavailable" };
}
