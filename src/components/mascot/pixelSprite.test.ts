import { describe, expect, it } from "vitest";
import { layer, layerPaths } from "./pixelSprite";

/**
 * Cells covered by a path set, as "key@x,y". Reads the geometry of M/H/V/Z
 * rectangles in either relative or absolute form, so a change of path syntax
 * is not a change of what gets drawn.
 */
function cells(paths: Record<string, string>): string[] {
	const out: string[] = [];
	for (const [key, d] of Object.entries(paths)) {
		const tokens = d.match(/[a-zA-Z]|-?\d+/g) ?? [];
		let i = 0;
		let x = 0;
		let y = 0;
		let box: [number, number, number, number] | null = null;
		const num = () => Number(tokens[i++]);
		const grow = () => {
			box = box
				? [
						Math.min(box[0], x),
						Math.min(box[1], y),
						Math.max(box[2], x),
						Math.max(box[3], y),
					]
				: [x, y, x, y];
		};
		const flush = () => {
			if (!box) return;
			for (let cx = box[0]; cx < box[2]; cx++) {
				for (let cy = box[1]; cy < box[3]; cy++) out.push(`${key}@${cx},${cy}`);
			}
			box = null;
		};
		while (i < tokens.length) {
			const cmd = tokens[i++];
			const rel = cmd !== cmd.toUpperCase();
			switch (cmd.toUpperCase()) {
				case "M":
					flush();
					x = rel ? x + num() : num();
					y = rel ? y + num() : num();
					grow();
					break;
				case "H":
					x = rel ? x + num() : num();
					grow();
					break;
				case "V":
					y = rel ? y + num() : num();
					grow();
					break;
				case "Z":
					flush();
					break;
				default:
					throw new Error(`unsupported path command ${cmd}`);
			}
		}
		flush();
	}
	return out.sort();
}

describe("layerPaths", () => {
	it("turns a horizontal run of one key into one rectangle", () => {
		expect(cells(layerPaths(layer(2, 3, "AAA")))).toEqual([
			"A@2,3",
			"A@3,3",
			"A@4,3",
		]);
	});

	it("offsets every row by the layer origin", () => {
		expect(cells(layerPaths(layer(1, 4, "A.", ".B")))).toEqual([
			"A@1,4",
			"B@2,5",
		]);
	});

	it("skips transparent cells and splits runs around them", () => {
		expect(cells(layerPaths(layer(0, 0, "A.A  A")))).toEqual([
			"A@0,0",
			"A@2,0",
			"A@5,0",
		]);
	});

	it("covers the same cells in every row a key appears in", () => {
		expect(cells(layerPaths(layer(0, 0, "AB", "BA")))).toEqual([
			"A@0,0",
			"A@1,1",
			"B@0,1",
			"B@1,0",
		]);
	});

	it("is empty for an empty layer", () => {
		expect(layerPaths(layer(0, 0, "...."))).toEqual({});
	});

	it("reads absolute path commands as the same cells", () => {
		expect(cells({ A: "M2 3H5V4H2Z" })).toEqual(["A@2,3", "A@3,3", "A@4,3"]);
	});

	it("returns the same paths for a layer it has already converted", () => {
		const sprite = layer(0, 0, "AB");
		expect(layerPaths(sprite)).toBe(layerPaths(sprite));
	});
});
