import { beforeEach, describe, expect, it } from "vitest";
import {
	BACKUP_EXCLUDED_KEYS,
	collectAppStorage,
	collectBackupData,
	parseBackup,
	restoreBackup,
} from "./backup";

const CONSENT_KEY = "pobrelingo_analytics_consent";

/** In-memory Storage that can fail the Nth setItem, like a full quota. */
function flakyStorage(
	seed: Record<string, string>,
	failOnSet?: number,
): Storage {
	const map = new Map(Object.entries(seed));
	let sets = 0;
	return {
		get length() {
			return map.size;
		},
		key: (i) => [...map.keys()][i] ?? null,
		getItem: (k) => map.get(k) ?? null,
		removeItem: (k) => void map.delete(k),
		clear: () => map.clear(),
		setItem: (k, v) => {
			sets += 1;
			if (sets === failOnSet) {
				throw new DOMException("Full", "QuotaExceededError");
			}
			map.set(k, v);
		},
	};
}

const snapshotOf = (storage: Storage) => {
	const out: Record<string, string> = {};
	for (let i = 0; i < storage.length; i++) {
		const key = storage.key(i) as string;
		out[key] = storage.getItem(key) as string;
	}
	return out;
};

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

	it("rolls back to the previous progress when a write fails midway", () => {
		const before = { pl_xp: "500", pl_gems: "40", pobrelingo_streak: "6" };
		const storage = flakyStorage(before, 2);

		const result = restoreBackup(
			{ pl_xp: "1", pl_gems: "2", pobrelingo_streak: "3" },
			storage,
		);

		expect(result.ok).toBe(false);
		expect(snapshotOf(storage)).toEqual(before);
	});

	it("reports a pt-BR error instead of throwing when storage is full", () => {
		const result = restoreBackup(
			{ pl_xp: "1" },
			flakyStorage({ pl_xp: "9" }, 1),
		);

		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.error).toMatch(/espaço|armazenamento/i);
	});

	it("reports success and replaces the progress when every write lands", () => {
		const storage = flakyStorage({ pl_xp: "9", pl_gems: "3" });

		expect(restoreBackup({ pl_xp: "1" }, storage)).toEqual({
			ok: true,
			skipped: [],
		});
		expect(snapshotOf(storage)).toEqual({ pl_xp: "1" });
	});

	describe("analytics consent", () => {
		it("is never exported", () => {
			localStorage.setItem(CONSENT_KEY, "granted");
			localStorage.setItem("pl_xp", "1");

			expect(Object.keys(collectBackupData())).toEqual(["pl_xp"]);
			expect(BACKUP_EXCLUDED_KEYS).toContain(CONSENT_KEY);
		});

		it("is not planted by a crafted backup", () => {
			const parsed = parseBackup(
				JSON.stringify({ pl_xp: "5", [CONSENT_KEY]: "granted" }),
			);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) expect(Object.keys(parsed.entries)).toEqual(["pl_xp"]);

			restoreBackup({ pl_xp: "5", [CONSENT_KEY]: "granted" });
			expect(localStorage.getItem(CONSENT_KEY)).toBeNull();
		});

		it("keeps the user's existing choice through a restore", () => {
			localStorage.setItem(CONSENT_KEY, "denied");

			restoreBackup({ pl_xp: "5" });

			expect(localStorage.getItem(CONSENT_KEY)).toBe("denied");
		});

		it("also blocks other analytics or consent keys", () => {
			const parsed = parseBackup(
				JSON.stringify({
					pl_xp: "5",
					pobrelingo_analytics_id: "x",
					pl_consent: "y",
				}),
			);
			expect(parsed.ok && Object.keys(parsed.entries)).toEqual(["pl_xp"]);
		});
	});

	describe("known keys", () => {
		it("skips corrupt values for known keys and restores the rest", () => {
			const parsed = parseBackup(
				JSON.stringify({
					pl_xp: "120",
					pl_achievements: "x",
					pl_gems: "NaN",
					pobrelingo_srs_cards: '{"a":1}',
					pobrelingo_notification_prefs: "7",
				}),
			);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				expect(parsed.entries).toEqual({ pl_xp: "120" });
				expect(parsed.skipped.sort()).toEqual([
					"pl_achievements",
					"pl_gems",
					"pobrelingo_notification_prefs",
					"pobrelingo_srs_cards",
				]);
			}
		});

		it("accepts what the app itself writes", () => {
			const parsed = parseBackup(
				JSON.stringify({
					pl_xp: "120",
					pl_gems: "0",
					pl_achievements: '["first_steps"]',
					pobrelingo_srs_cards: "[]",
					pobrelingo_notification_prefs: '{"browserEnabled":false}',
					pobrelingo_notifications: "[]",
				}),
			);

			expect(parsed.ok && parsed.skipped).toEqual([]);
		});

		it("refuses a backup whose entries are all unusable", () => {
			expect(parseBackup('{"pl_xp":"abc"}').ok).toBe(false);
		});
	});
});
