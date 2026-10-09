import { describe, expect, it } from "vitest";
import type { Layer } from "./pixelSprite";
import {
	BODY,
	PALETTE,
	SHADOW,
	SPARKLES,
	SPRITE_SIZE,
	WINGS_DOWN,
	WINGS_UP,
} from "./pobrelingoArt";
import { FACES } from "./pobrelingoFaces";

const width = (l: Layer) => Math.max(...l.rows.map((row) => row.length));

const allLayers: [string, Layer][] = [
	["shadow", SHADOW],
	["body", BODY],
	...WINGS_DOWN.map((l, i): [string, Layer] => [`wings down ${i}`, l]),
	...WINGS_UP.map((l, i): [string, Layer] => [`wings up ${i}`, l]),
	...SPARKLES.map((l, i): [string, Layer] => [`sparkle ${i}`, l]),
	...Object.entries(FACES).flatMap(([name, face]) =>
		[...face.open, ...face.shut, ...face.fixed, face.beak].map(
			(l, i): [string, Layer] => [`${name} face ${i}`, l],
		),
	),
];

describe("mascot art", () => {
	it("draws the body on the full canvas", () => {
		expect(BODY.rows).toHaveLength(SPRITE_SIZE);
		for (const row of BODY.rows) expect(row).toHaveLength(SPRITE_SIZE);
	});

	it.each(allLayers)("keeps %s inside the canvas", (_name, l) => {
		expect(l.x).toBeGreaterThanOrEqual(0);
		expect(l.y).toBeGreaterThanOrEqual(0);
		expect(l.x + width(l)).toBeLessThanOrEqual(SPRITE_SIZE);
		expect(l.y + l.rows.length).toBeLessThanOrEqual(SPRITE_SIZE);
	});

	it.each(allLayers)("only uses palette keys in %s", (_name, l) => {
		for (const row of l.rows) {
			for (const key of row) {
				if (key !== "." && key !== " ") expect(PALETTE).toHaveProperty(key);
			}
		}
	});

	it("gives every palette colour a valid hex value", () => {
		for (const colour of Object.values(PALETTE)) {
			expect(colour).toMatch(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i);
		}
	});

	it.each([
		["down", WINGS_DOWN],
		["up", WINGS_UP],
	])("mirrors the %s wings", (_name, [left, right]) => {
		expect(right.y).toBe(left.y);
		expect(right.x).toBe(SPRITE_SIZE - left.x - width(left));
		expect(right.rows).toEqual(
			left.rows.map((row) => [...row].reverse().join("")),
		);
	});

	it("does not reuse a position within one group (they are React keys)", () => {
		for (const [name, face] of Object.entries(FACES)) {
			for (const group of [face.open, face.shut, face.fixed]) {
				const keys = group.map((l) => `${l.x},${l.y}`);
				expect(new Set(keys).size, name).toBe(keys.length);
			}
		}
	});

	it("blinks every open eye", () => {
		for (const face of Object.values(FACES)) {
			expect(face.shut).toHaveLength(face.open.length);
		}
	});
});
