import { collectBackupData, restoreBackup } from "@/lib/backup";
import { ApiError, type RemoteProgress, type SyncClient } from "./client";
import { hashData, loadMeta, saveMeta } from "./meta";

export type SyncOutcome =
	| { status: "synced" }
	| { status: "pushed" }
	| { status: "pulled" }
	| { status: "conflict"; remote: RemoteProgress }
	| { status: "error"; offline: boolean };

const isEmpty = (data: Record<string, string>) =>
	Object.keys(data).length === 0;

async function push(
	client: SyncClient,
	data: Record<string, string>,
	baseVersion: number,
): Promise<SyncOutcome> {
	const result = await client.put(data, baseVersion);
	if (!result.ok) {
		// Outro aparelho gravou entre a leitura e a escrita.
		if (result.current) return { status: "conflict", remote: result.current };
		return push(client, data, 0);
	}
	saveMeta({ version: result.version, hash: hashData(data) });
	return { status: "pushed" };
}

function pull(remote: RemoteProgress): SyncOutcome {
	const restored = restoreBackup(remote.data);
	if (!restored.ok) return { status: "error", offline: false };
	saveMeta({ version: remote.version, hash: hashData(collectBackupData()) });
	return { status: "pulled" };
}

async function reconcile(client: SyncClient): Promise<SyncOutcome> {
	const local = collectBackupData();
	const meta = loadMeta();
	const remote = await client.get();

	if (!remote) {
		return isEmpty(local) ? { status: "synced" } : push(client, local, 0);
	}
	if (!meta) {
		// Primeira conexão deste aparelho: sem dados locais, só baixa.
		return isEmpty(local) ? pull(remote) : { status: "conflict", remote };
	}
	const localChanged = hashData(local) !== meta.hash;
	if (remote.version !== meta.version) {
		return localChanged ? { status: "conflict", remote } : pull(remote);
	}
	// Nunca sobe um estado vazio (ex.: logo após apagar o progresso).
	if (!localChanged || isEmpty(local)) return { status: "synced" };
	return push(client, local, remote.version);
}

/** Reconcilia local e nuvem; erros de rede viram `error`, nunca exceção. */
export async function syncNow(client: SyncClient): Promise<SyncOutcome> {
	try {
		return await reconcile(client);
	} catch (error) {
		const offline = !(error instanceof ApiError);
		return { status: "error", offline };
	}
}

/** Resolve um conflito mantendo os dados deste aparelho. */
export async function keepLocal(
	client: SyncClient,
	remote: RemoteProgress,
): Promise<SyncOutcome> {
	try {
		const local = collectBackupData();
		if (isEmpty(local)) return { status: "error", offline: false };
		return await push(client, local, remote.version);
	} catch (error) {
		return { status: "error", offline: !(error instanceof ApiError) };
	}
}

/** Resolve um conflito trazendo os dados da nuvem. */
export const keepRemote = (remote: RemoteProgress): SyncOutcome => pull(remote);
