export interface StateInfo {
	state: string | null;
	firstRunDone: boolean;
	dir: string;
}

export type BootDecision = "keep" | "restore" | "first-run" | "skip";

/**
 * O localStorage do WebView é cache: se está vazio e há arquivo, restaura.
 * Se há dados locais, eles são a verdade (mesmo WebView que gravou o arquivo).
 */
export function decideBoot(
	info: StateInfo,
	localHasData: boolean,
): BootDecision {
	if (localHasData) return "keep";
	if (info.state) return "restore";
	return info.firstRunDone ? "skip" : "first-run";
}

export interface SnapshotDeps {
	collect: () => Record<string, string>;
	hash: (data: Record<string, string>) => string;
	write: (json: string) => Promise<void>;
}

/** Grava o progresso em arquivo só quando mudou; nunca grava estado vazio. */
export function createSnapshotter({ collect, hash, write }: SnapshotDeps) {
	let last: string | null = null;
	return {
		async flush(): Promise<boolean> {
			const data = collect();
			if (Object.keys(data).length === 0) return false;
			const next = hash(data);
			if (next === last) return false;
			try {
				await write(JSON.stringify(data));
			} catch {
				return false; // tenta de novo no próximo ciclo
			}
			last = next;
			return true;
		},
	};
}
