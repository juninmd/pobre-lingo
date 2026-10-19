import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CloudSyncCard } from "@/components/settings/CloudSyncCard";

const json = (status: number, body?: unknown) =>
	Promise.resolve(
		new Response(body === undefined ? null : JSON.stringify(body), { status }),
	);

describe("CloudSyncCard", () => {
	beforeEach(() => localStorage.clear());
	afterEach(() => vi.unstubAllGlobals());

	it("começa desligado e rejeita código inválido", () => {
		render(<CloudSyncCard />);
		expect(screen.getByRole("status")).toHaveTextContent("Desligada");
		fireEvent.change(screen.getByLabelText("Já tem um código?"), {
			target: { value: "curto" },
		});
		fireEvent.click(screen.getByRole("button", { name: "Conectar" }));
		expect(screen.getByRole("alert")).toHaveTextContent("Código inválido");
		expect(localStorage.getItem("plsync_key")).toBeNull();
	});

	it("ativa, gera o código e envia o progresso local", async () => {
		localStorage.setItem("pl_xp", "10");
		const fetchMock = vi.fn((_url: string, init: RequestInit) =>
			init.method === "GET"
				? json(404, { error: "not_found" })
				: json(200, { version: 1, updatedAt: "x" }),
		);
		vi.stubGlobal("fetch", fetchMock);
		render(<CloudSyncCard />);

		fireEvent.click(
			screen.getByRole("button", { name: /Ativar sincronização/ }),
		);

		await waitFor(() =>
			expect(screen.getByRole("status")).toHaveTextContent("salvo na nuvem"),
		);
		const code = (
			screen.getByLabelText("Seu código de sincronização") as HTMLInputElement
		).value;
		expect(code).toMatch(/^[A-Za-z0-9_-]{32}$/);
		const put = fetchMock.mock.calls.find(([, init]) => init.method === "PUT");
		expect(JSON.parse(put?.[1].body as string)).toEqual({
			data: { pl_xp: "10" },
			baseVersion: 0,
		});
	});

	it("avisa quando o servidor está inacessível", async () => {
		vi.stubGlobal("fetch", () => Promise.reject(new TypeError("offline")));
		localStorage.setItem("plsync_key", JSON.stringify("k".repeat(32)));
		render(<CloudSyncCard />);
		await waitFor(() =>
			expect(screen.getByRole("status")).toHaveTextContent("Sem conexão"),
		);
	});

	it("desconecta e apaga o código deste aparelho", async () => {
		vi.stubGlobal("fetch", () => json(404));
		localStorage.setItem("plsync_key", JSON.stringify("k".repeat(32)));
		render(<CloudSyncCard />);
		fireEvent.click(screen.getByRole("button", { name: /Desconectar/ }));
		expect(localStorage.getItem("plsync_key")).toBeNull();
		expect(screen.getByRole("status")).toHaveTextContent("Desligada");
	});
});
