/** Runtime shape checks for values read back from localStorage. */

export function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((v) => typeof v === "string");
}

export function isNonNegativeNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value) && value >= 0;
}
