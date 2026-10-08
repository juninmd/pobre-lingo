import { beforeEach, describe, expect, it } from "vitest";
import { collectAppStorage, parseBackup, restoreBackup } from "./backup";

describe("backup", () => {
	beforeEach(() => localStorage.clear());

	it("round-trips the app progress through export and restore", () => {
		localStorage.setItem("pl_xp", "120");
		localStorage.setItem("pobrelingo_srs_cards", "[]");
		const exported = JSON.stringify(collectAppStorage());

		localStorage.clear();
		const parsed = parseBackup(exported);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) restoreBackup(parsed.entries);

		expect(localStorage.getItem("pl_xp")).toBe("120");
		expect(localStorage.getItem("pobrelingo_srs_cards")).toBe("[]");
	});

	it("does not export unrelated keys from other apps on the same origin", () => {
		localStorage.setItem("pl_xp", "1");
		localStorage.setItem("someone_else", "secret");
		expect(Object.keys(collectAppStorage())).toEqual(["pl_xp"]);
	});

	it("replaces current progress instead of merging stale keys", () => {
		localStorage.setItem("pl_gems", "999");
		restoreBackup({ pl_xp: "5" });
		expect(localStorage.getItem("pl_gems")).toBeNull();
		expect(localStorage.getItem("pl_xp")).toBe("5");
	});

	it.each([
		["not json", "{oops"],
		["an array", "[1,2]"],
		["an empty backup", "{}"],
		["a foreign key", '{"theme":"dark"}'],
		["a non-string value", '{"pl_xp":120}'],
	])("rejects %s without touching storage", (_label, text) => {
		localStorage.setItem("pl_xp", "7");
		const result = parseBackup(text);
		expect(result.ok).toBe(false);
		expect(localStorage.getItem("pl_xp")).toBe("7");
	});
});
