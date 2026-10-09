import { collectAppStorage } from "./backup";

/** Removes only the keys the app owns (APP_STORAGE_PREFIXES); other origins' data and the theme stay. */
export function clearAppData(storage: Storage = localStorage) {
	for (const key of Object.keys(collectAppStorage(storage))) {
		storage.removeItem(key);
	}
}
