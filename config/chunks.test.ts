import { describe, expect, it } from "vitest";
import { packageName, vendorChunk } from "./chunks";

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

describe("vendorChunk", () => {
	it("keeps the React chunk to React itself", () => {
		expect(vendorChunk(pnpm("react"))).toBe("react");
		expect(vendorChunk(pnpm("react-dom"))).toBe("react");
		expect(vendorChunk(pnpm("scheduler"))).toBe("react");
	});

	it("does not let names containing 'react' or 'three' leak into those chunks", () => {
		expect(vendorChunk(pnpm("@radix-ui/react-dialog"))).toBe("ui");
		expect(vendorChunk(pnpm("react-router"))).toBe("router");
		expect(vendorChunk(pnpm("@pixiv/three-vrm"))).toBe("three");
		expect(vendorChunk(pnpm("lucide-react"))).toBe("icons");
	});

	it("leaves page-only and unlisted packages to the bundler", () => {
		expect(vendorChunk(pnpm("@radix-ui/react-select"))).toBeUndefined();
		expect(vendorChunk(pnpm("date-fns"))).toBeUndefined();
		expect(vendorChunk(pnpm("canvas-confetti"))).toBeUndefined();
	});

	it("leaves app code to the bundler", () => {
		expect(vendorChunk("/repo/src/lib/utils.ts")).toBeUndefined();
	});
});
