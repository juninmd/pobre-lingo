import { beforeEach, describe, expect, it } from "vitest";
import type { SyncClient } from "./client";
import { syncNow } from "./engine";

describe("syncNow pull", () => {
	beforeEach(() => localStorage.clear());

	it("rejects remote data with an invalid shape and keeps local storage untouched", async () => {
		const client = {
			get: async () => ({
				version: 3,
				data: { pobrelingo_srs_cards: "not-json{" },
			}),
		} as unknown as SyncClient;
		const outcome = await syncNow(client);
		expect(outcome.status).toBe("error");
		expect(localStorage.getItem("pobrelingo_srs_cards")).toBeNull();
	});
});
