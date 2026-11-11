import { dictionaryEntries } from "@/lib/dictionaryData";

/** Palavras simples do dicionário do app: valem como bônus e trazem a tradução. */
export const wheelDictionary = new Map(
	dictionaryEntries
		.filter((e) => /^[a-z]+$/i.test(e.word))
		.map((e) => [e.word.toLowerCase(), e.translation_pt]),
);

export const wheelBonusPool: ReadonlySet<string> = new Set(
	wheelDictionary.keys(),
);
