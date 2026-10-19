import { createHash } from "node:crypto";

/** Chaves que o app grava (espelha APP_STORAGE_PREFIXES em src/lib/backup.ts). */
const APP_PREFIXES = ["pobrelingo_", "pl_", "daily_"];
const EXCLUDED_KEY = /consent|analytics/i;
const SYNC_KEY = /^[A-Za-z0-9_-]{32,128}$/;

export const MAX_BODY_BYTES = 1024 * 1024;
export const MAX_ENTRIES = 500;

/** O código de sincronização é o segredo: só o hash dele chega ao banco. */
export const hashSyncKey = (key) =>
	createHash("sha256").update(key).digest("hex");

export function readSyncKey(header) {
	const match = /^Bearer (\S+)$/.exec(header ?? "");
	return match && SYNC_KEY.test(match[1]) ? match[1] : null;
}

const isInteger = (value) => Number.isInteger(value) && value >= 0;

/** Valida o corpo do PUT; devolve { data, baseVersion } ou { error }. */
export function parseProgressBody(body) {
	if (!body || typeof body !== "object" || Array.isArray(body)) {
		return { error: "Corpo inválido." };
	}
	const { data, baseVersion } = body;
	if (!isInteger(baseVersion)) return { error: "baseVersion inválido." };
	if (!data || typeof data !== "object" || Array.isArray(data)) {
		return { error: "data deve ser um objeto." };
	}
	const entries = Object.entries(data);
	if (entries.length === 0) return { error: "data está vazio." };
	if (entries.length > MAX_ENTRIES) return { error: "Entradas demais." };
	for (const [key, value] of entries) {
		if (!APP_PREFIXES.some((prefix) => key.startsWith(prefix))) {
			return { error: `Chave não permitida: ${key}` };
		}
		if (EXCLUDED_KEY.test(key)) return { error: `Chave não permitida: ${key}` };
		if (typeof value !== "string") return { error: `Valor inválido: ${key}` };
	}
	return { data, baseVersion };
}
