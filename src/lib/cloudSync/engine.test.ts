import { beforeEach, describe, expect, it } from "vitest";
import type { PutResult, RemoteProgress, SyncClient } from "./client";
import { keepLocal, keepRemote, syncNow } from "./engine";
import { hashData, loadMeta, saveMeta } from "./meta";

/** Servidor falso com a mesma regra de versão da API. */
function fakeClient(initial: RemoteProgress | null = null) {
	const state = { remote: initial, fail: false };
	const client: SyncClient = {
		async get() {
			if (state.fail) throw new TypeError("offline");
			return state.remote;
		},
		async put(data, baseVersion): Promise<PutResult> {
			if ((state.remote?.version ?? 0) !== baseVersion) {
				return { ok: false, current: state.remote };
			}
			const version = baseVersion + 1;
			state.remote = { data, version, updatedAt: "2026-01-01T00:00:00Z" };
			return { ok: true, version, updatedAt: state.remote.updatedAt };
		},
		async remove() {
			state.remote = null;
		},
	};
	return { state, client };
}

const remote = (
	data: Record<string, string>,
	version: number,
): RemoteProgress => ({
	data,
	version,
	updatedAt: "2026-01-01T00:00:00Z",
});

describe("syncNow", () => {
	beforeEach(() => localStorage.clear());

	it("não faz nada sem dados locais nem remotos", async () => {
		const { client } = fakeClient();
		expect(await syncNow(client)).toEqual({ status: "synced" });
	});

	it("sobe os dados locais na primeira conexão com nuvem vazia", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient();
		expect(await syncNow(client)).toEqual({ status: "pushed" });
		expect(state.remote?.data).toEqual({ pl_xp: "10" });
		expect(loadMeta()?.version).toBe(1);
	});

	it("baixa o progresso da nuvem num aparelho vazio", async () => {
		const { client } = fakeClient(remote({ pl_xp: "50" }, 3));
		expect(await syncNow(client)).toEqual({ status: "pulled" });
		expect(localStorage.getItem("pl_xp")).toBe("50");
		expect(loadMeta()?.version).toBe(3);
	});

	it("pede escolha quando os dois lados têm dados e o aparelho é novo", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client } = fakeClient(remote({ pl_xp: "50" }, 3));
		expect((await syncNow(client)).status).toBe("conflict");
		expect(localStorage.getItem("pl_xp")).toBe("10");
	});

	it("sobe só o que mudou desde o último sync", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient();
		await syncNow(client);
		expect(await syncNow(client)).toEqual({ status: "synced" });
		localStorage.setItem("pl_xp", "20");
		expect(await syncNow(client)).toEqual({ status: "pushed" });
		expect(state.remote).toMatchObject({ version: 2, data: { pl_xp: "20" } });
	});

	it("baixa quando outro aparelho avançou e este não mudou", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient();
		await syncNow(client);
		state.remote = remote({ pl_xp: "99" }, 2);
		expect(await syncNow(client)).toEqual({ status: "pulled" });
		expect(localStorage.getItem("pl_xp")).toBe("99");
	});

	it("detecta conflito quando os dois lados mudaram", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient();
		await syncNow(client);
		localStorage.setItem("pl_xp", "15");
		state.remote = remote({ pl_xp: "99" }, 2);
		const outcome = await syncNow(client);
		expect(outcome.status).toBe("conflict");
		expect(localStorage.getItem("pl_xp")).toBe("15");
	});

	it("nunca sobe estado vazio (progresso apagado)", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient();
		await syncNow(client);
		localStorage.clear();
		saveMeta({ version: 1, hash: hashData({ pl_xp: "10" }) });
		expect(await syncNow(client)).toEqual({ status: "synced" });
		expect(state.remote?.data).toEqual({ pl_xp: "10" });
	});

	it("reporta falha de rede sem lançar", async () => {
		const { client, state } = fakeClient();
		state.fail = true;
		expect(await syncNow(client)).toEqual({ status: "error", offline: true });
	});
});

describe("resolução de conflito", () => {
	beforeEach(() => localStorage.clear());

	it("keepLocal sobrescreve a nuvem", async () => {
		localStorage.setItem("pl_xp", "10");
		const { client, state } = fakeClient(remote({ pl_xp: "50" }, 3));
		expect(await keepLocal(client, state.remote as RemoteProgress)).toEqual({
			status: "pushed",
		});
		expect(state.remote).toMatchObject({ version: 4, data: { pl_xp: "10" } });
	});

	it("keepRemote troca os dados locais pelos da nuvem", () => {
		localStorage.setItem("pl_xp", "10");
		expect(keepRemote(remote({ pl_xp: "50" }, 3))).toEqual({
			status: "pulled",
		});
		expect(localStorage.getItem("pl_xp")).toBe("50");
	});
});
