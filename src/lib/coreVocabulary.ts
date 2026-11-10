import type { CEFRLevel } from "./cefr";
import { coreWordsA1A2 } from "./coreVocabularyA1A2";
import { coreWordsB1B2 } from "./coreVocabularyB1B2";
import type { CoreWord } from "./coreVocabularyTypes";
import { vocabA1B1 } from "./vocab/indexA1B1";
import { vocabB2C2 } from "./vocab/indexB2C2";

export type { CoreWord, CoreWordPos } from "./coreVocabularyTypes";

export const coreVocabulary: CoreWord[] = [
	...coreWordsA1A2,
	...coreWordsB1B2,
	...vocabA1B1,
	...vocabB2C2,
];

export function getWordsByLevel(level: CEFRLevel): CoreWord[] {
	return coreVocabulary.filter((word) => word.level === level);
}

export function getCoreWordById(id: string): CoreWord | undefined {
	return coreVocabulary.find((word) => word.id === id);
}
