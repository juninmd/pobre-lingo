import { API_URL } from "@/lib/cloudSync/config";

export type BuddyMessage = { role: "user" | "assistant"; content: string };
export type BuddyReply = { reply: string; done: boolean };
export type Correction = { corrected: string; note: string };

export const BUDDY_AVAILABLE = API_URL !== "";

async function post<T>(
	path: string,
	body: unknown,
	signal?: AbortSignal,
	fetchFn: typeof fetch = (...args) => fetch(...args),
): Promise<T> {
	const res = await fetchFn(`${API_URL}${path}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
		signal,
	});
	if (!res.ok) throw new Error(`API respondeu ${res.status}`);
	return (await res.json()) as T;
}

/** Conversa com a Lia (LiteLLM cloud/auto, via a API do app). */
export const chatWithBuddy = (
	messages: BuddyMessage[],
	level: string,
	signal?: AbortSignal,
) => post<BuddyReply>("/v1/chat", { messages, level }, signal);

/** Correção ortográfica/gramatical do rascunho. */
export const correctText = (text: string, signal?: AbortSignal) =>
	post<Correction>("/v1/correct", { text }, signal);
