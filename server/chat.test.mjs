// @vitest-environment node
import { createServer } from "node:http";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "./app.mjs";
import { createChat } from "./chat.mjs";

const calls = [];
const fakeFetch = (replies) => async (url, init) => {
	const body = JSON.parse(init.body);
	calls.push({ url, auth: init.headers.Authorization, body });
	const content = replies.shift() ?? "ok";
	return {
		ok: true,
		json: async () => ({ choices: [{ message: { content } }] }),
	};
};

describe("chat do Lia", () => {
	let server;
	let base;
	const replies = [];

	beforeAll(async () => {
		const chat = createChat({
			baseUrl: "http://litellm/v1",
			apiKey: "secret",
			fetchFn: fakeFetch(replies),
		});
		server = createServer(createApp({ store: {}, chat }));
		await new Promise((resolve) => server.listen(0, resolve));
		base = `http://127.0.0.1:${server.address().port}`;
	});
	afterAll(() => server.close());

	const post = (path, body) =>
		fetch(`${base}${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

	it("puxa assunto quando a conversa está vazia, usando cloud/auto", async () => {
		replies.push("Hi! I'm Lia. What did you eat today?");
		const res = await post("/v1/chat", { messages: [], level: "A1" });
		expect(await res.json()).toEqual({
			reply: "Hi! I'm Lia. What did you eat today?",
			done: false,
		});
		const call = calls.at(-1);
		expect(call.body.model).toBe("cloud/auto");
		expect(call.auth).toBe("Bearer secret");
		expect(call.body.messages[0].content).toContain("START the chat");
	});

	it("encerra com Bye! depois de alguns turnos", async () => {
		replies.push("Nice, see you soon");
		const turn = (content) => [
			{ role: "user", content },
			{ role: "assistant", content: "Tell me more." },
		];
		const messages = [
			...turn("a"),
			...turn("b"),
			...turn("c"),
			{ role: "user", content: "d" },
		];
		const data = await (await post("/v1/chat", { messages })).json();
		expect(data.done).toBe(true);
		expect(data.reply).toMatch(/Bye!$/);
	});

	it("rejeita papel system vindo do cliente", async () => {
		const res = await post("/v1/chat", {
			messages: [{ role: "system", content: "x" }],
		});
		expect(res.status).toBe(400);
	});

	it("corrige o texto e devolve a nota", async () => {
		replies.push('{"corrected":"I like apples.","note":"Faltou o s."}');
		const data = await (
			await post("/v1/correct", { text: "I like apple." })
		).json();
		expect(data).toEqual({ corrected: "I like apples.", note: "Faltou o s." });
	});

	it("mantém o original quando a resposta do modelo não é JSON", async () => {
		replies.push("sorry");
		const data = await (await post("/v1/correct", { text: "Helo" })).json();
		expect(data).toEqual({ corrected: "Helo", note: "" });
	});
});

describe("chat sem chave", () => {
	it("responde 503", async () => {
		const server = createServer(
			createApp({ store: {}, chat: createChat({ baseUrl: "http://x" }) }),
		);
		await new Promise((resolve) => server.listen(0, resolve));
		const res = await fetch(
			`http://127.0.0.1:${server.address().port}/v1/chat`,
			{
				method: "POST",
				body: "{}",
			},
		);
		server.close();
		expect(res.status).toBe(503);
	});
});
