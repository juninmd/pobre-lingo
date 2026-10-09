import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseBackup, restoreBackup } from "@/lib/backup";

const forgedBackup = JSON.stringify({
	pl_xp: "120",
	pl_achievements: "{}",
});

function parseOk(text: string) {
	const parsed = parseBackup(text);
	if (!parsed.ok) throw new Error(parsed.error);
	return parsed;
}

describe("restoreBackup with entries the shape guard rejected", () => {
	beforeEach(() => {
		localStorage.clear();
		localStorage.setItem("pl_achievements", '["first_steps"]');
		localStorage.setItem("pl_gems", "40");
	});
	afterEach(() => vi.restoreAllMocks());

	it("keeps the user's valid value for a key the backup carried corrupted", () => {
		const { entries, skipped } = parseOk(forgedBackup);

		restoreBackup(entries, localStorage, skipped);

		expect(localStorage.getItem("pl_achievements")).toBe('["first_steps"]');
		expect(localStorage.getItem("pl_xp")).toBe("120");
	});

	it("reports the skipped keys so the UI can warn the user", () => {
		const { entries, skipped } = parseOk(forgedBackup);

		expect(restoreBackup(entries, localStorage, skipped)).toEqual({
			ok: true,
			skipped: ["pl_achievements"],
		});
	});

	it("still replaces the keys the backup does not mention", () => {
		const { entries, skipped } = parseOk(forgedBackup);

		restoreBackup(entries, localStorage, skipped);

		expect(localStorage.getItem("pl_gems")).toBeNull();
	});

	it("does not invent a value for a skipped key the user never had", () => {
		localStorage.removeItem("pl_achievements");
		const { entries, skipped } = parseOk(forgedBackup);

		restoreBackup(entries, localStorage, skipped);

		expect(localStorage.getItem("pl_achievements")).toBeNull();
	});

	it("rolls everything back, skipped keys included, when a write fails", () => {
		const { entries, skipped } = parseOk(forgedBackup);
		const realSetItem = Storage.prototype.setItem;
		let writes = 0;
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (
			this: Storage,
			key: string,
			value: string,
		) {
			writes += 1;
			if (writes === 1) throw new DOMException("Full", "QuotaExceededError");
			realSetItem.call(this, key, value);
		});

		const result = restoreBackup(entries, localStorage, skipped);

		expect(result.ok).toBe(false);
		expect(localStorage.getItem("pl_achievements")).toBe('["first_steps"]');
		expect(localStorage.getItem("pl_gems")).toBe("40");
		expect(localStorage.getItem("pl_xp")).toBeNull();
	});
});
