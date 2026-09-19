export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = { role: ChatRole; content: string };

export type ProviderId = "chrome" | "webllm";

/** Estado de um provedor antes de conversar. */
export type ProviderStatus =
	| "available"
	| "downloadable"
	| "downloading"
	| "unavailable";

export type ProgressHandler = (fraction: number, label?: string) => void;

export interface AiProvider {
	id: ProviderId;
	/** Nome amigável exibido ao aluno. */
	label: string;
	/** true quando o modelo consegue explicar direto em português. */
	speaksPortuguese: boolean;
	/** Carrega o modelo (pode baixar) e prepara a sessão com o prompt de sistema. */
	load(system: string, onProgress?: ProgressHandler): Promise<void>;
	/** Envia o histórico da conversa e devolve a resposta, com streaming opcional. */
	reply(
		history: ChatMessage[],
		onText?: (text: string) => void,
	): Promise<string>;
	dispose(): void;
}
