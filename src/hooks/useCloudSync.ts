import { useCallback, useEffect, useState } from "react";
import { createSyncClient, type RemoteProgress } from "@/lib/cloudSync/client";
import {
	keepLocal,
	keepRemote,
	type SyncOutcome,
} from "@/lib/cloudSync/engine";
import {
	clearSyncState,
	generateSyncKey,
	isValidSyncKey,
	loadSyncKey,
	saveSyncKey,
} from "@/lib/cloudSync/meta";
import { runSync } from "@/lib/cloudSync/session";
import { reloadPage } from "@/lib/pageReload";

export type CloudSyncStatus =
	| "off"
	| "syncing"
	| "synced"
	| "conflict"
	| "offline"
	| "error";

/** Estado e ações da sincronização na tela de configurações. */
export function useCloudSync() {
	const [syncKey, setSyncKey] = useState(loadSyncKey);
	const [status, setStatus] = useState<CloudSyncStatus>(
		syncKey ? "syncing" : "off",
	);
	const [remote, setRemote] = useState<RemoteProgress | null>(null);

	const apply = useCallback((outcome: SyncOutcome) => {
		if (outcome.status === "pulled") return reloadPage();
		if (outcome.status === "conflict") {
			setRemote(outcome.remote);
			return setStatus("conflict");
		}
		if (outcome.status === "error") {
			return setStatus(outcome.offline ? "offline" : "error");
		}
		setRemote(null);
		setStatus("synced");
	}, []);

	const sync = useCallback(async () => {
		const pending = runSync();
		if (!pending) return;
		setStatus("syncing");
		apply(await pending);
	}, [apply]);

	useEffect(() => {
		if (syncKey) void sync();
	}, [syncKey, sync]);

	const connect = (code: string) => {
		if (!isValidSyncKey(code)) return false;
		saveSyncKey(code);
		setSyncKey(code);
		return true;
	};

	const enable = () => connect(generateSyncKey());

	const disconnect = () => {
		clearSyncState();
		setSyncKey(null);
		setRemote(null);
		setStatus("off");
	};

	const resolve = async (keep: "local" | "remote") => {
		if (!remote || !syncKey) return;
		setStatus("syncing");
		apply(
			keep === "remote"
				? keepRemote(remote)
				: await keepLocal(createSyncClient(syncKey), remote),
		);
	};

	return { syncKey, status, sync, enable, connect, disconnect, resolve };
}
