import { coreVocabulary } from "@/lib/coreVocabulary";
import { dictionaryEntries } from "@/lib/dictionaryData";
import { lemmaCandidates } from "./tokenize";

/** Tradução encontrada no conteúdo do próprio app (sem rede). */
export type LexiconHit = {
	/** Chave estável da palavra (lema minúsculo): mesma usada em "palavras conhecidas". */
	id: string;
	word: string;
	translation: string;
	source: "core" | "dictionary";
};

let index: Map<string, LexiconHit> | null = null;

function buildIndex(): Map<string, LexiconHit> {
	const map = new Map<string, LexiconHit>();
	for (const entry of dictionaryEntries) {
		const key = entry.word.toLowerCase();
		map.set(key, {
			id: key,
			word: entry.word,
			translation: entry.translation_pt,
			source: "dictionary",
		});
	}
	// Vocabulário núcleo tem prioridade: traduções revisadas por nível.
	for (const word of coreVocabulary) {
		const key = word.word.toLowerCase();
		map.set(key, {
			id: word.id,
			word: word.word,
			translation: word.translation,
			source: "core",
		});
	}
	return map;
}

function getIndex(): Map<string, LexiconHit> {
	index ??= buildIndex();
	return index;
}

/** Procura a palavra e, se não achar, as formas-base prováveis (plural, -ed, -ing...). */
export function lookupWord(key: string): LexiconHit | null {
	const map = getIndex();
	for (const candidate of lemmaCandidates(key)) {
		const hit = map.get(candidate);
		if (hit) return hit;
	}
	return null;
}

/** Chave usada para marcar a palavra como conhecida (lema quando o léxico reconhece). */
export function knownKeyFor(key: string): string {
	return lookupWord(key)?.id ?? lemmaCandidates(key)[0] ?? key;
}
