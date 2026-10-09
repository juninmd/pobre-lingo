/**
 * Progress backup: everything lives in localStorage, so export and restore are
 * the only way to move progress to another device without a server.
 */
import { hasValidShape } from "@/lib/backupSchema";

/** Keys written by the app: the basis for export, restore and wipe. */
export const APP_STORAGE_PREFIXES = ["pobrelingo_", "pl_", "daily_"];

/**
 * Consent (LGPD) is the user's choice on this device: it never travels in a file,
 * or a forged backup would enable session recording without opt-in.
 */
export const BACKUP_EXCLUDED_KEYS = ["pobrelingo_analytics_consent"];
const EXCLUDED_KEY_PATTERN = /consent|analytics/i;

/** Accepted file size cap: well above a real backup, below the browser quota. */
export const MAX_BACKUP_BYTES = 4 * 1024 * 1024;

export type BackupResult =
	| { ok: true; entries: Record<string, string>; skipped: string[] }
	| { ok: false; error: string };

export type RestoreResult =
	| { ok: true; skipped: string[] }
	| { ok: false; error: string };

export function isAppKey(key: string): boolean {
	return APP_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function isBackupExcludedKey(key: string): boolean {
	return BACKUP_EXCLUDED_KEYS.includes(key) || EXCLUDED_KEY_PATTERN.test(key);
}

/** All app keys — used to wipe progress. */
export function collectAppStorage(storage: Storage = localStorage) {
	const data: Record<string, string> = {};
	for (let i = 0; i < storage.length; i++) {
		const key = storage.key(i);
		if (key && isAppKey(key)) data[key] = storage.getItem(key) ?? "";
	}
	return data;
}

/** What goes into the backup file: progress, without privacy choices. */
export function collectBackupData(storage: Storage = localStorage) {
	return Object.fromEntries(
		Object.entries(collectAppStorage(storage)).filter(
			([key]) => !isBackupExcludedKey(key),
		),
	);
}

export function parseBackup(text: string): BackupResult {
	if (text.length > MAX_BACKUP_BYTES) {
		return { ok: false, error: "Arquivo grande demais para ser um backup." };
	}
	let parsed: unknown;
	try {
		parsed = JSON.parse(text);
	} catch {
		return { ok: false, error: "O arquivo não é um JSON válido." };
	}
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
		return { ok: false, error: "Formato de backup desconhecido." };
	}
	const entries: Record<string, string> = {};
	const skipped: string[] = [];
	for (const [key, value] of Object.entries(parsed)) {
		if (!isAppKey(key) || typeof value !== "string") {
			return { ok: false, error: `Entrada inválida no backup: ${key}` };
		}
		if (isBackupExcludedKey(key)) continue;
		if (hasValidShape(key, value)) entries[key] = value;
		else skipped.push(key);
	}
	if (Object.keys(entries).length === 0) {
		return {
			ok: false,
			error: skipped.length
				? "O backup não contém dados válidos."
				: "O backup está vazio.",
		};
	}
	return { ok: true, entries, skipped };
}

/**
 * Replaces current progress with the backup's (full restore).
 * Keys in `skipped` (invalid in the file) keep their current local value.
 * All or nothing: if the write fails (quota full), the previous progress returns.
 */
export function restoreBackup(
	entries: Record<string, string>,
	storage: Storage = localStorage,
	skipped: string[] = [],
): RestoreResult {
	const incoming = Object.entries(entries).filter(
		([key]) => isAppKey(key) && !isBackupExcludedKey(key),
	);
	const snapshot = collectBackupData(storage);
	try {
		for (const key of Object.keys(snapshot)) {
			if (!skipped.includes(key)) storage.removeItem(key);
		}
		for (const [key, value] of incoming) storage.setItem(key, value);
		return { ok: true, skipped };
	} catch {
		return rollback(storage, snapshot);
	}
}

function rollback(
	storage: Storage,
	snapshot: Record<string, string>,
): RestoreResult {
	try {
		for (const key of Object.keys(collectBackupData(storage))) {
			storage.removeItem(key);
		}
		for (const [key, value] of Object.entries(snapshot)) {
			storage.setItem(key, value);
		}
		return {
			ok: false,
			error:
				"Não há espaço no armazenamento do navegador para restaurar este backup. Seu progresso atual foi mantido.",
		};
	} catch {
		return {
			ok: false,
			error:
				"Não foi possível restaurar o backup e o progresso atual pode estar incompleto. Tente de novo ou libere espaço no navegador.",
		};
	}
}
