import { describe, expect, it } from "vitest";
import { diffWords, isMeaningfulChange } from "./diff";

describe("diffWords", () => {
	it("marca a palavra trocada", () => {
		expect(diffWords("I like apple", "I like apples")).toEqual([
			{ text: "I", kind: "same" },
			{ text: "like", kind: "same" },
			{ text: "apples", kind: "added" },
			{ text: "apple", kind: "removed" },
		]);
	});

	it("texto igual não tem alterações", () => {
		expect(
			diffWords("Hi there", "Hi there").every((p) => p.kind === "same"),
		).toBe(true);
	});
});

describe("isMeaningfulChange", () => {
	it("ignora pontuação e caixa", () => {
		expect(isMeaningfulChange("hello world", "Hello, world!")).toBe(false);
		expect(isMeaningfulChange("helo world", "hello world")).toBe(true);
	});
});
