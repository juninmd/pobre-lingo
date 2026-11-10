import { describe, expect, it } from "vitest";
import { manualChunks, packageName } from "./chunks";

const pnpm = (pkg: string, dir = pkg.replace("/", "+")) =>
	`/repo/node_modules/.pnpm/${dir}@1.0.0/node_modules/${pkg}/index.js`;

describe("packageName", () => {
	it("reads plain and scoped packages from a pnpm path", () => {
		expect(packageName(pnpm("react-dom"))).toBe("react-dom");
		expect(packageName(pnpm("@radix-ui/react-dialog"))).toBe(
			"@radix-ui/react-dialog",
		);
	});

	it("ignores app modules", () => {
		expect(packageName("/repo/src/main.tsx")).toBeUndefined();
	});
});

describe("manualChunks", () => {
	it("keeps the React chunk to React itself", () => {
		expect(manualChunks(pnpm("react"))).toBe("react");
		expect(manualChunks(pnpm("react-dom"))).toBe("react");
		expect(manualChunks(pnpm("scheduler"))).toBe("react");
	});

	it("does not let names containing 'react' or 'three' leak into those chunks", () => {
		expect(manualChunks(pnpm("@radix-ui/react-dialog"))).toBe("ui");
		expect(manualChunks(pnpm("react-router"))).toBe("router");
		expect(manualChunks(pnpm("@pixiv/three-vrm"))).toBe("three");
		expect(manualChunks(pnpm("lucide-react"))).toBe("icons");
	});

	it("leaves page-only and unlisted packages to the bundler", () => {
		expect(manualChunks(pnpm("@radix-ui/react-select"))).toBeUndefined();
		expect(manualChunks(pnpm("date-fns"))).toBeUndefined();
		expect(manualChunks(pnpm("canvas-confetti"))).toBeUndefined();
	});

	it("leaves app code to the bundler", () => {
		expect(manualChunks("/repo/src/lib/utils.ts")).toBeUndefined();
	});
});
