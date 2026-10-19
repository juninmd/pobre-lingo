import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { isRecord } from "@/lib/storageGuards";
import { SYNC_KEY_STORAGE, SYNC_META_STORAGE } from "./config";

/** Última versão trocada com a nuvem e o hash dos dados locais naquele momento. */
export type SyncMeta = { version: number; hash: string };

const isMeta = (value: unknown): value is SyncMeta =>
	isRecord(value) &&
	Number.isInteger(value.version) &&
	typeof value.hash === "string";

const isKey = (value: unknown): value is string => typeof value === "string";

/** Hash não criptográfico (cyrb53) só para saber se algo mudou desde o último sync. */
export function hashData(data: Record<string, string>): string {
	const text = JSON.stringify(
		Object.entries(data).sort(([a], [b]) => (a < b ? -1 : 1)),
	);
	let h1 = 0xdeadbeef;
	let h2 = 0x41c6ce57;
	for (let i = 0; i < text.length; i++) {
		const code = text.charCodeAt(i);
		h1 = Math.imul(h1 ^ code, 2654435761);
		h2 = Math.imul(h2 ^ code, 1597334677);
	}
	h1 =
		Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
		Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 =
		Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
		Math.imul(h1 ^ (h1 >>> 13), 3266489909);
	return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

export const loadSyncKey = () =>
	getLocalStorageItem<string | null>(SYNC_KEY_STORAGE, null, isKey);
export const saveSyncKey = (key: string) =>
	setLocalStorageItem(SYNC_KEY_STORAGE, key);
export const loadMeta = () =>
	getLocalStorageItem<SyncMeta | null>(SYNC_META_STORAGE, null, isMeta);
export const saveMeta = (meta: SyncMeta) =>
	setLocalStorageItem(SYNC_META_STORAGE, meta);

export function clearSyncState(storage: Storage = localStorage) {
	storage.removeItem(SYNC_KEY_STORAGE);
	storage.removeItem(SYNC_META_STORAGE);
}

/** 24 bytes aleatórios em base64url: 32 caracteres, 192 bits. */
export function generateSyncKey(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(24));
	return btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
}

export const isValidSyncKey = (key: string) =>
	/^[A-Za-z0-9_-]{32,128}$/.test(key);
