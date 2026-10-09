import { describe, expect, it } from "vitest";
import { layer, layerPaths } from "./pixelSprite";

describe("layerPaths", () => {
	it("turns a horizontal run of one key into one rectangle", () => {
		expect(layerPaths(layer(2, 3, "AAA"))).toEqual({ A: "M2 3h3v1h-3z" });
	});

	it("offsets every row by the layer origin", () => {
		const paths = layerPaths(layer(1, 4, "A.", ".B"));
		expect(paths).toEqual({ A: "M1 4h1v1h-1z", B: "M2 5h1v1h-1z" });
	});

	it("skips transparent cells and splits runs around them", () => {
		expect(layerPaths(layer(0, 0, "A.A  A"))).toEqual({
			A: "M0 0h1v1h-1zM2 0h1v1h-1zM5 0h1v1h-1z",
		});
	});

	it("groups the runs of one key into a single path across rows", () => {
		expect(layerPaths(layer(0, 0, "AB", "BA"))).toEqual({
			A: "M0 0h1v1h-1zM1 1h1v1h-1z",
			B: "M1 0h1v1h-1zM0 1h1v1h-1z",
		});
	});

	it("is empty for an empty layer", () => {
		expect(layerPaths(layer(0, 0, "...."))).toEqual({});
	});

	it("computes a layer once", () => {
		const sprite = layer(0, 0, "AB");
		expect(layerPaths(sprite)).toBe(layerPaths(sprite));
	});
});
