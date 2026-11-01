import {
	buddySystem,
	CORRECT_SYSTEM,
	ensureBye,
	MAX_TURNS,
	parseCorrection,
	safeLevel,
} from "./chatPrompt.mjs";

export const MAX_MESSAGES = 12;
export const MAX_TEXT = 400;

const cleanText = (value) =>
	typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";

/** Aceita só mensagens user/assistant curtas; o prompt de sistema é sempre do servidor. */
export function parseChatBody(body) {
	if (!body || !Array.isArray(body.messages))
		return { error: "messages inválido." };
	if (body.messages.length > MAX_MESSAGES)
		return { error: "Conversa longa demais." };
	const messages = [];
	for (const item of body.messages) {
		const content = cleanText(item?.content);
		if (!content || (item.role !== "user" && item.role !== "assistant")) {
			return { error: "Mensagem inválida." };
		}
		messages.push({ role: item.role, content });
	}
	return { messages, level: safeLevel(body.level) };
}

/** Cliente do LiteLLM (API compatível com OpenAI); a chave nunca sai do servidor. */
export function createChat({
	baseUrl,
	apiKey,
	model = "cloud/auto",
	fetchFn = fetch,
}) {
	const complete = async (messages, maxTokens, temperature) => {
		const res = await fetchFn(
			`${baseUrl.replace(/\/+$/, "")}/chat/completions`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model,
					messages,
					max_tokens: maxTokens,
					temperature,
				}),
				signal: AbortSignal.timeout(30_000),
			},
		);
		if (!res.ok) throw new Error(`LiteLLM respondeu ${res.status}`);
		const data = await res.json();
		return String(data.choices?.[0]?.message?.content ?? "").trim();
	};

	return {
		enabled: Boolean(apiKey),
		async converse({ messages, level }) {
			const userTurns = messages.filter((m) => m.role === "user").length;
			const system = { role: "system", content: buddySystem(level, userTurns) };
			const kickoff =
				userTurns === 0 ? [{ role: "user", content: "(start)" }] : [];
			const raw = await complete([system, ...messages, ...kickoff], 160, 0.8);
			if (!raw) throw new Error("Resposta vazia");
			const done = userTurns >= MAX_TURNS;
			return { reply: done ? ensureBye(raw) : raw, done };
		},
		async correct(text) {
			const input = cleanText(text);
			if (!input) return { corrected: "", note: "" };
			const raw = await complete(
				[
					{ role: "system", content: CORRECT_SYSTEM },
					{ role: "user", content: input },
				],
				200,
				0,
			);
			return parseCorrection(raw, input);
		},
	};
}
