import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";
import { isNonNegativeNumber, isStringArray } from "@/lib/storageGuards";

describe("getLocalStorageItem", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.spyOn(console, "warn").mockImplementation(() => {});
	});
	afterEach(() => vi.restoreAllMocks());

	it("returns the default for a missing key", () => {
		expect(getLocalStorageItem("k", [1])).toEqual([1]);
	});

	it("returns the stored value when it parses", () => {
		localStorage.setItem("k", '{"a":1}');
		expect(getLocalStorageItem("k", {})).toEqual({ a: 1 });
	});

	it("treats a stored JSON null as missing instead of handing back null", () => {
		localStorage.setItem("k", "null");
		expect(getLocalStorageItem<number[]>("k", [])).toEqual([]);
	});

	it("returns the default for unparseable JSON", () => {
		localStorage.setItem("k", "{oops");
		expect(getLocalStorageItem("k", 7)).toBe(7);
	});

	it("falls back to the default when the validator rejects the value", () => {
		localStorage.setItem("k", '{"a":1}');
		expect(getLocalStorageItem<string[]>("k", [], isStringArray)).toEqual([]);
		localStorage.setItem("k", '["a",1]');
		expect(getLocalStorageItem<string[]>("k", [], isStringArray)).toEqual([]);
	});

	it("returns the value when the validator accepts it", () => {
		localStorage.setItem("k", '["a","b"]');
		expect(getLocalStorageItem<string[]>("k", [], isStringArray)).toEqual([
			"a",
			"b",
		]);
	});

	it("rejects negative and non-finite numbers with the numeric guard", () => {
		for (const raw of ["-1", '"5"', "null", "[]"]) {
			localStorage.setItem("k", raw);
			expect(getLocalStorageItem("k", 0, isNonNegativeNumber)).toBe(0);
		}
		localStorage.setItem("k", "42");
		expect(getLocalStorageItem("k", 0, isNonNegativeNumber)).toBe(42);
	});

	it("returns the default when reading storage throws (blocked storage)", () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new DOMException("denied", "SecurityError");
		});
		expect(getLocalStorageItem("k", "fallback")).toBe("fallback");
	});

	it("does not let a throwing validator brick the caller", () => {
		localStorage.setItem("k", "1");
		const boom = (_: unknown): _ is number => {
			throw new Error("bad guard");
		};
		expect(getLocalStorageItem("k", 9, boom)).toBe(9);
	});
});

describe("setLocalStorageItem", () => {
	afterEach(() => vi.restoreAllMocks());

	it("swallows a quota error so a full disk never crashes the UI", () => {
		vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		expect(() => setLocalStorageItem("k", { a: 1 })).not.toThrow();
	});
});
