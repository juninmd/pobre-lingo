import type { CEFRLevel } from "./curriculumData";

export type CoreWordPos = "noun" | "verb" | "adjective" | "adverb" | "function";

export type CoreWord = {
	id: string;
	word: string;
	translation: string;
	pos: CoreWordPos;
	/** Frequency band: 1k (mais frequente) até 5k. */
	band: 1 | 2 | 3 | 4 | 5;
	level: CEFRLevel;
};
