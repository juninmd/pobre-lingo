import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return sourceFiles(path);
		return /\.tsx?$/.test(entry.name) && !/\.test\./.test(entry.name)
			? [path]
			: [];
	});
}

describe("dashboard day keys", () => {
	it("never derive a daily key from toISOString(): it is the UTC day and resets claims at 21:00 in UTC-3", () => {
		const offenders = sourceFiles(__dirname).filter((file) =>
			/toISOString\(\)\s*\.(slice\(0,\s*10\)|split\("T"\)\[0\])/.test(
				readFileSync(file, "utf8"),
			),
		);

		expect(offenders).toEqual([]);
	});
});
