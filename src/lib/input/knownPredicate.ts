import { coreVocabulary } from "@/lib/coreVocabulary";
import type { CEFRLevel } from "@/lib/curriculumData";
import { CEFR_ORDER } from "@/lib/levels";
import { knownKeyFor, lookupWord } from "./lexicon";
import type { WordToken } from "./tokenize";

/** Palavras do núcleo abaixo do nível do aluno: presume-se que já as conhece. */
export function assumedKnownIds(level: CEFRLevel | null): Set<string> {
	if (!level) return new Set();
	const below = new Set(CEFR_ORDER.slice(0, CEFR_ORDER.indexOf(level)));
	return new Set(
		coreVocabulary.filter((w) => below.has(w.level)).map((w) => w.id),
	);
}

/**
 * Conhecida = marcada pelo aluno, presumida pelo nível, ou nome próprio
 * (maiúscula fora do léxico, ex.: "London", "Maria").
 */
export function createKnownPredicate(
	known: Set<string>,
	assumed: Set<string>,
): (token: WordToken) => boolean {
	return (token) => {
		const key = knownKeyFor(token.key);
		if (known.has(key) || assumed.has(key)) return true;
		const capitalized = /^[A-Z]/.test(token.text);
		return capitalized && !lookupWord(token.key);
	};
}
