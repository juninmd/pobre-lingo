import { coreWordsA1A2 } from "./coreVocabularyA1A2";
import { coreWordsB1B2 } from "./coreVocabularyB1B2";
import type { CoreWord } from "./coreVocabularyTypes";
import type { CEFRLevel } from "./curriculumData";

export type { CoreWord, CoreWordPos } from "./coreVocabularyTypes";

export const coreVocabulary: CoreWord[] = [...coreWordsA1A2, ...coreWordsB1B2];

/**
 * Meta de vocabulário receptivo acumulado por nível (Milton & Meara, 2003).
 * Serve de referência de progresso — não é a lista completa, e sim o alvo.
 */
export const LEVEL_VOCAB_TARGETS: Record<CEFRLevel, number> = {
	A1: 1500,
	A2: 2500,
	B1: 3250,
	B2: 3750,
	C1: 4500,
	C2: 5000,
};

export const LEVEL_ORDER: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const BAND_LABELS: Record<number, string> = {
	1: "1k · essencial",
	2: "2k · frequente",
	3: "3k · intermediário",
	4: "4k · avançado",
	5: "5k · acadêmico",
};

export function getWordsByLevel(level: CEFRLevel): CoreWord[] {
	return coreVocabulary.filter((word) => word.level === level);
}

export function getCoreWordById(id: string): CoreWord | undefined {
	return coreVocabulary.find((word) => word.id === id);
}
