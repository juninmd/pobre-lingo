import { collectBackupData, parseBackup, restoreBackup } from "@/lib/backup";
import { hashData } from "@/lib/cloudSync/meta";
import { desktopInvoke } from "./invoke";
import { createSnapshotter, decideBoot, type StateInfo } from "./persistence";

const SNAPSHOT_MS = 10_000;

function startSnapshots() {
	const snapshotter = createSnapshotter({
		collect: () => collectBackupData(),
		hash: hashData,
		write: (json) => desktopInvoke<void>("write_state", { json }),
	});
	const flush = () => void snapshotter.flush();
	setInterval(flush, SNAPSHOT_MS);
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") flush();
	});
	addEventListener("pagehide", flush);
}

/**
 * Prepara a persistência em arquivo antes da primeira renderização.
 * Retorna true quando é a primeira execução (mostrar a tela de importação).
 */
export async function bootDesktop(): Promise<boolean> {
	try {
		const info = await desktopInvoke<StateInfo>("read_state");
		const decision = decideBoot(
			info,
			Object.keys(collectBackupData()).length > 0,
		);
		if (decision === "restore" && info.state) {
			const parsed = parseBackup(info.state);
			if (parsed.ok) restoreBackup(parsed.entries, localStorage, parsed.skipped);
		}
		startSnapshots();
		return decision === "first-run";
	} catch (error) {
		console.warn("Persistência em arquivo indisponível:", error);
		return false;
	}
}
