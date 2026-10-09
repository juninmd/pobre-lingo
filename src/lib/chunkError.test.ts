import { afterEach, describe, expect, it, vi } from "vitest";
import { isChunkLoadError, reloadOnceForChunkError } from "./chunkError";

function memoryStorage(initial: Record<string, string> = {}) {
	const data = new Map(Object.entries(initial));
	return {
		getItem: (key: string) => data.get(key) ?? null,
		setItem: (key: string, value: string) => void data.set(key, value),
	};
}

describe("isChunkLoadError", () => {
	it.each([
		"Failed to fetch dynamically imported module: https://app.test/assets/page-abc.js",
		"Importing a module script failed.",
		"error loading dynamically imported module: https://app.test/assets/page-abc.js",
		"Unable to preload CSS for /assets/page-abc.css",
	])("detects the stale-deploy message %j", (message) => {
		expect(isChunkLoadError(new TypeError(message))).toBe(true);
		expect(isChunkLoadError(message)).toBe(true);
	});

	it("ignores ordinary failures so real bugs are not hidden behind a reload", () => {
		expect(
			isChunkLoadError(new Error("Cannot read properties of undefined")),
		).toBe(false);
		expect(isChunkLoadError(new TypeError("Failed to fetch"))).toBe(false);
		expect(isChunkLoadError(null)).toBe(false);
	});
});

describe("reloadOnceForChunkError", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("reloads on the first chunk error and never again in the same session", () => {
		const storage = memoryStorage();
		const reload = vi.fn();

		expect(reloadOnceForChunkError(storage, reload)).toBe(true);
		expect(reloadOnceForChunkError(storage, reload)).toBe(false);
		expect(reloadOnceForChunkError(storage, reload)).toBe(false);

		expect(reload).toHaveBeenCalledTimes(1);
	});

	it("does not reload when the guard cannot be stored, since that could loop", () => {
		const reload = vi.fn();
		const blocked = {
			getItem: () => null,
			setItem: () => {
				throw new DOMException("quota", "QuotaExceededError");
			},
		};

		expect(reloadOnceForChunkError(blocked, reload)).toBe(false);
		expect(reload).not.toHaveBeenCalled();
	});
	it("allows another reload once the guard is older than the TTL (long-lived tab, next deploy)", () => {
		const reload = vi.fn();
		const storage = memoryStorage({
			pobrelingo_chunk_reload: String(Date.now() - 11 * 60 * 1000),
		});

		expect(reloadOnceForChunkError(storage, reload)).toBe(true);
		expect(reload).toHaveBeenCalledTimes(1);
	});

	it("keeps blocking within the TTL so a failing target route cannot loop", () => {
		const reload = vi.fn();
		const storage = memoryStorage({
			pobrelingo_chunk_reload: String(Date.now() - 30 * 1000),
		});

		expect(reloadOnceForChunkError(storage, reload)).toBe(false);
		expect(reload).not.toHaveBeenCalled();
	});

	it("does not throw when sessionStorage itself is inaccessible (site data blocked)", () => {
		const reload = vi.fn();
		vi.spyOn(window, "sessionStorage", "get").mockImplementation(() => {
			throw new DOMException("denied", "SecurityError");
		});

		expect(() => reloadOnceForChunkError(undefined, reload)).not.toThrow();
		expect(reload).not.toHaveBeenCalled();
	});
});
