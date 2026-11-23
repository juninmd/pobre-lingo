export interface UpdateInfo {
	version: string;
	notes: string | null;
	install: (onProgress: (percent: number | null) => void) => Promise<void>;
}

/** Percentual 0-100 de um download; null quando o tamanho total é desconhecido. */
export function percentOf(downloaded: number, total: number | undefined) {
	if (!total || total <= 0) return null;
	return Math.min(100, Math.round((downloaded / total) * 100));
}

/** Consulta o latest.json assinado; null quando já está na versão mais nova. */
export async function checkForUpdate(): Promise<UpdateInfo | null> {
	const { check } = await import("@tauri-apps/plugin-updater");
	const update = await check();
	if (!update) return null;
	return {
		version: update.version,
		notes: update.body ?? null,
		install: async (onProgress) => {
			let downloaded = 0;
			let total: number | undefined;
			await update.downloadAndInstall((event) => {
				if (event.event === "Started") total = event.data.contentLength;
				if (event.event === "Progress") {
					downloaded += event.data.chunkLength;
					onProgress(percentOf(downloaded, total));
				}
			});
			const { relaunch } = await import("@tauri-apps/plugin-process");
			await relaunch();
		},
	};
}
