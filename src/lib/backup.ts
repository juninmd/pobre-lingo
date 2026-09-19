/**
 * Backup do progresso: tudo vive no localStorage, então exportar e restaurar
 * é a única forma de levar o progresso para outro aparelho sem servidor.
 */

/** Chaves gravadas pelo app — base para exportar, restaurar e apagar dados. */
export const APP_STORAGE_PREFIXES = ["pobrelingo_", "pl_", "daily_"];

/** Teto do arquivo aceito: bem acima de um backup real, abaixo da cota do navegador. */
export const MAX_BACKUP_BYTES = 4 * 1024 * 1024;

export type BackupResult =
	| { ok: true; entries: Record<string, string> }
	| { ok: false; error: string };

export function isAppKey(key: string): boolean {
	return APP_STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));
}

export function collectAppStorage(storage: Storage = localStorage) {
	const data: Record<string, string> = {};
	for (let i = 0; i < storage.length; i++) {
		const key = storage.key(i);
		if (key && isAppKey(key)) data[key] = storage.getItem(key) ?? "";
	}
	return data;
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
	for (const [key, value] of Object.entries(parsed)) {
		if (!isAppKey(key) || typeof value !== "string") {
			return { ok: false, error: `Entrada inválida no backup: ${key}` };
		}
		entries[key] = value;
	}
	if (Object.keys(entries).length === 0) {
		return { ok: false, error: "O backup está vazio." };
	}
	return { ok: true, entries };
}

/** Substitui o progresso atual pelo do backup (restauração completa). */
export function restoreBackup(
	entries: Record<string, string>,
	storage: Storage = localStorage,
) {
	for (const key of Object.keys(collectAppStorage(storage))) {
		storage.removeItem(key);
	}
	for (const [key, value] of Object.entries(entries)) {
		storage.setItem(key, value);
	}
}
