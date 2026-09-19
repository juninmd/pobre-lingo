import { describe, expect, it } from "vitest";
import { textCoverage } from "./coverage";
import { createKnownPredicate } from "./knownPredicate";
import { lookupWord } from "./lexicon";
import { addText, MAX_TEXT_CHARS, MAX_TEXTS, markFinished } from "./library";
import { activeCueIndex, parseSubtitles } from "./subtitles";
import { countWords, lemmaCandidates, tokenizeText } from "./tokenize";

describe("tokenizeText", () => {
	it("keeps the original text so the reader renders it unchanged", () => {
		const text = "Tom's dog didn't bark—twice!";
		const tokens = tokenizeText(text);
		expect(tokens.map((t) => t.text).join("")).toBe(text);
		expect(tokens.filter((t) => t.kind === "word").map((t) => t.text)).toEqual([
			"Tom's",
			"dog",
			"didn't",
			"bark",
			"twice",
		]);
		expect(countWords(text)).toBe(5);
	});
});

describe("lemmaCandidates", () => {
	it("finds the base form of inflected and irregular words", () => {
		expect(lemmaCandidates("studies")).toContain("study");
		expect(lemmaCandidates("stopped")).toContain("stop");
		expect(lemmaCandidates("making")).toContain("make");
		expect(lemmaCandidates("went")).toContain("go");
		expect(lemmaCandidates("don't")).toContain("do");
		expect(lemmaCandidates("won't")).toContain("will");
	});
});

describe("lookupWord", () => {
	it("translates inflected forms using the app's own vocabulary", () => {
		const hit = lookupWord("houses");
		expect(hit?.word.toLowerCase()).toBe("house");
		expect(hit?.translation).toBeTruthy();
	});

	it("returns null for words the app does not know", () => {
		expect(lookupWord("zzxqv")).toBeNull();
	});
});

describe("textCoverage", () => {
	it("measures the share of running words the learner knows", () => {
		const tokens = tokenizeText("The cat sat. The cat ran. Zorblat!");
		const isKnown = createKnownPredicate(new Set(["the", "cat"]), new Set());
		const coverage = textCoverage(tokens, isKnown);
		expect(coverage.running).toBe(7);
		// "Zorblat" com maiúscula e fora do léxico conta como nome próprio.
		expect(coverage.knownRunning).toBe(5);
		expect(coverage.unknownTypes).toEqual(["sat", "ran"]);
		expect(coverage.band).toBe("hard");
	});
});

describe("parseSubtitles", () => {
	it("reads SRT and VTT cues and strips formatting tags", () => {
		const srt =
			"1\n00:00:01,000 --> 00:00:02,500\n<i>Hello</i> there\n\n2\n00:00:03,000 --> 00:00:04,000\nBye";
		const vtt = "WEBVTT\n\n00:01.000 --> 00:02.000\nHi\n";
		expect(parseSubtitles(srt)).toEqual([
			{ start: 1, end: 2.5, text: "Hello there" },
			{ start: 3, end: 4, text: "Bye" },
		]);
		expect(parseSubtitles(vtt)).toEqual([{ start: 1, end: 2, text: "Hi" }]);
		expect(parseSubtitles("not a subtitle")).toEqual([]);
	});

	it("finds the cue playing at a given time, or none in gaps", () => {
		const cues = parseSubtitles(
			"00:00:01,000 --> 00:00:02,000\nA\n\n00:00:03,000 --> 00:00:04,000\nB",
		);
		expect(activeCueIndex(cues, 1.5)).toBe(0);
		expect(activeCueIndex(cues, 3.2)).toBe(1);
		expect(activeCueIndex(cues, 2.5)).toBe(-1);
	});
});

describe("library", () => {
	const now = new Date("2026-09-19T10:00:00Z");

	it("bounds stored texts so localStorage cannot grow without limit", () => {
		let list: ReturnType<typeof addText>["list"] = [];
		for (let i = 0; i < MAX_TEXTS + 5; i++) {
			list = addText(
				list,
				{ title: `T${i}`, source: "paste", text: "hi" },
				now,
			).list;
		}
		expect(list).toHaveLength(MAX_TEXTS);
		const big = addText(
			[],
			{
				title: "",
				source: "paste",
				text: "a ".repeat(MAX_TEXT_CHARS),
			},
			now,
		);
		expect(big.item.text.length).toBeLessThanOrEqual(MAX_TEXT_CHARS);
		expect(big.item.title).not.toBe("");
	});

	it("marks a text finished only once", () => {
		const { list, item } = addText(
			[],
			{ title: "A", source: "paste", text: "x" },
			now,
		);
		const done = markFinished(list, item.id, now);
		const again = markFinished(done, item.id, new Date("2027-01-01"));
		expect(again[0].finishedAt).toBe(now.toISOString());
	});
});
