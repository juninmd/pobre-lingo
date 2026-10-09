/**
 * IA embutida do Chrome (Prompt API / Gemini Nano). Roda no aparelho, sem
 * chave e sem servidor. Só gera texto em en/es/ja/de/fr — por isso as dicas
 * saem em inglês e são traduzidas pela Translator API quando existir.
 */
import type {
	AiProvider,
	ChatMessage,
	ProgressHandler,
	ProviderStatus,
} from "./types";

type PromptSession = {
	prompt(input: string): Promise<string>;
	promptStreaming(input: string): AsyncIterable<string>;
	destroy(): void;
};

type DownloadMonitor = {
	addEventListener(
		type: "downloadprogress",
		listener: (event: { loaded: number }) => void,
	): void;
};

type LanguageModelApi = {
	availability(options?: object): Promise<ProviderStatus>;
	create(options: {
		initialPrompts?: ChatMessage[];
		expectedInputs?: { type: "text"; languages: string[] }[];
		expectedOutputs?: { type: "text"; languages: string[] }[];
		monitor?: (monitor: DownloadMonitor) => void;
	}): Promise<PromptSession>;
};

const LANGUAGE_OPTIONS = {
	expectedInputs: [{ type: "text" as const, languages: ["en"] }],
	expectedOutputs: [{ type: "text" as const, languages: ["en"] }],
};

function getApi(): LanguageModelApi | undefined {
	return (globalThis as { LanguageModel?: LanguageModelApi }).LanguageModel;
}

export async function chromeAiStatus(): Promise<ProviderStatus> {
	const api = getApi();
	if (!api) return "unavailable";
	try {
		return await api.availability(LANGUAGE_OPTIONS);
	} catch {
		return "unavailable";
	}
}

const DISPOSED_MESSAGE = "O tutor foi encerrado antes de carregar o modelo.";

export function createChromeProvider(): AiProvider {
	let session: PromptSession | null = null;
	let sentCount = 0;
	let disposed = false;

	return {
		id: "chrome",
		label: "IA do Chrome (Gemini Nano)",
		speaksPortuguese: false,
		async load(system: string, onProgress?: ProgressHandler) {
			const api = getApi();
			if (!api) throw new Error("A IA embutida do Chrome não está disponível.");
			session?.destroy();
			session = null;
			const created = await api.create({
				...LANGUAGE_OPTIONS,
				initialPrompts: [{ role: "system", content: system }],
				monitor(monitor) {
					monitor.addEventListener("downloadprogress", (event) =>
						onProgress?.(event.loaded, "Baixando o modelo do Chrome"),
					);
				},
			});
			// dispose() ran while the model was loading: nobody owns this session.
			if (disposed) {
				created.destroy();
				throw new Error(DISPOSED_MESSAGE);
			}
			session = created;
			sentCount = 0;
		},
		async reply(history: ChatMessage[], onText?: (text: string) => void) {
			if (!session) throw new Error("Modelo não carregado.");
			// A sessão guarda o contexto: envia só as mensagens novas do aluno.
			const pending = history
				.slice(sentCount)
				.filter((message) => message.role === "user")
				.map((message) => message.content)
				.join("\n");
			let text = "";
			for await (const chunk of session.promptStreaming(pending)) {
				// Versões antigas mandavam o texto acumulado; as novas, só o trecho.
				text = chunk.startsWith(text) ? chunk : text + chunk;
				onText?.(text);
			}
			// Só avança após o sucesso: num turno falho a mensagem é reenviada.
			sentCount = history.length + 1;
			return text;
		},
		dispose() {
			disposed = true;
			session?.destroy();
			session = null;
		},
	};
}
