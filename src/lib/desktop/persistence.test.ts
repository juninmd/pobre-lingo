import { describe, expect, it, vi } from "vitest";
import { createSnapshotter, decideBoot } from "./persistence";

const info = (state: string | null, firstRunDone = false) => ({
	state,
	firstRunDone,
	dir: "x",
});

describe("decideBoot", () => {
	it("keeps local data when present", () => {
		expect(decideBoot(info("{}"), true)).toBe("keep");
	});
	it("restores from file when local is empty", () => {
		expect(decideBoot(info("{}"), false)).toBe("restore");
	});
	it("asks for first run only once", () => {
		expect(decideBoot(info(null), false)).toBe("first-run");
		expect(decideBoot(info(null, true), false)).toBe("skip");
	});
});

describe("createSnapshotter", () => {
	const hash = (d: Record<string, string>) => JSON.stringify(d);

	it("never writes an empty state", async () => {
		const write = vi.fn(async () => undefined);
		const s = createSnapshotter({ collect: () => ({}), hash, write });
		expect(await s.flush()).toBe(false);
		expect(write).not.toHaveBeenCalled();
	});

	it("writes only when data changed", async () => {
		let data: Record<string, string> = { pl_xp: "1" };
		const write = vi.fn(async () => undefined);
		const s = createSnapshotter({ collect: () => data, hash, write });
		expect(await s.flush()).toBe(true);
		expect(await s.flush()).toBe(false);
		data = { pl_xp: "2" };
		expect(await s.flush()).toBe(true);
		expect(write).toHaveBeenCalledTimes(2);
	});

	it("retries after a failed write", async () => {
		const write = vi
			.fn<(json: string) => Promise<void>>()
			.mockRejectedValueOnce(new Error("disk"))
			.mockResolvedValue(undefined);
		const s = createSnapshotter({
			collect: () => ({ pl_xp: "1" }),
			hash,
			write,
		});
		expect(await s.flush()).toBe(false);
		expect(await s.flush()).toBe(true);
	});
});
