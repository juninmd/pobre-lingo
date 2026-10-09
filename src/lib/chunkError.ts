import { reloadPage } from "./pageReload";

const RELOAD_FLAG = "pobrelingo_chunk_reload";
const RELOAD_TTL_MS = 10 * 60 * 1000;

// Wording differs per engine: Chrome/Edge, Safari, Firefox, then Vite's CSS preload.
const CHUNK_ERROR_PATTERNS = [
	/failed to fetch dynamically imported module/i,
	/importing a module script failed/i,
	/error loading dynamically imported module/i,
	/unable to preload css/i,
];

function messageOf(error: unknown): string {
	if (typeof error === "string") return error;
	if (error && typeof error === "object" && "message" in error) {
		return typeof error.message === "string" ? error.message : "";
	}
	return "";
}

/** True when a lazy route chunk could not be loaded, usually after a deploy. */
export function isChunkLoadError(error: unknown): boolean {
	return CHUNK_ERROR_PATTERNS.some((pattern) => pattern.test(messageOf(error)));
}

/**
 * Reloads at most once per RELOAD_TTL_MS so a stale chunk picks up the new
 * build. The flag is not cleared on boot: that would loop when the failing
 * chunk belongs to the route the reload lands on. The TTL lets a long-lived
 * tab recover again after a later deploy.
 */
export function reloadOnceForChunkError(
	storage?: Pick<Storage, "getItem" | "setItem">,
	reload: () => void = reloadPage,
): boolean {
	try {
		// Resolved inside the try: reading window.sessionStorage throws when site data is blocked.
		const store = storage ?? sessionStorage;
		const last = Number(store.getItem(RELOAD_FLAG));
		if (last && Date.now() - last < RELOAD_TTL_MS) return false;
		store.setItem(RELOAD_FLAG, String(Date.now()));
	} catch {
		// Without a working flag we cannot guarantee a single reload.
		return false;
	}
	reload();
	return true;
}
