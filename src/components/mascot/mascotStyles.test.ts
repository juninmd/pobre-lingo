import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// jsdom does not load stylesheets, so the motion contract is read from the file (vitest runs at the project root).
const css = readFileSync(resolve("src/globals.css"), "utf8");

/** Declarations of the rule whose selector is exactly `selector`. */
function declarations(selector: string): string {
	const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
	if (!match) throw new Error(`no rule for ${selector}`);
	return match[1];
}

const ANIMATED = [
	"pl-bob",
	"pl-hop",
	"pl-wing-a",
	"pl-wing-b",
	"pl-twinkle-a",
	"pl-twinkle-b",
	"pl-eyes-open",
	"pl-eyes-shut",
];

describe("mascot motion styles", () => {
	it.each(ANIMATED)(".%s steps between whole sprite pixels", (name) => {
		expect(declarations(`.${name}`)).toContain("steps(1, end)");
	});

	it.each(ANIMATED)(".%s runs a keyframes block that exists", (name) => {
		const keyframes = declarations(`.${name}`).match(
			/animation:\s*(pl-[\w-]+)/,
		)?.[1];
		expect(keyframes).toBeDefined();
		expect(css).toContain(`@keyframes ${keyframes} {`);
	});

	it("keeps the global reduced-motion rule that turns these off", () => {
		expect(css).toMatch(/animation:\s*var\(--animation-reduced\)\s*!important/);
	});

	it("hides only the alternating frames by default, so the still pose shows both sparkles", () => {
		expect(declarations(".pl-wing-b")).toContain("opacity: 0");
		expect(declarations(".pl-eyes-shut")).toContain("opacity: 0");
		expect(declarations(".pl-twinkle-b")).not.toContain("opacity");
	});
});
