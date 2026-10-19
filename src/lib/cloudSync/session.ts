import { createSyncClient } from "./client";
import { CLOUD_SYNC_AVAILABLE } from "./config";
import { type SyncOutcome, syncNow } from "./engine";
import { loadSyncKey } from "./meta";

let inFlight: Promise<SyncOutcome> | null = null;

/** Sincroniza com o código salvo; chamadas simultâneas compartilham a mesma rodada. */
export function runSync(): Promise<SyncOutcome> | null {
	const key = loadSyncKey();
	if (!CLOUD_SYNC_AVAILABLE || !key) return null;
	inFlight ??= syncNow(createSyncClient(key)).finally(() => {
		inFlight = null;
	});
	return inFlight;
}
