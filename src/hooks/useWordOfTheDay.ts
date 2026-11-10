import { useEffect, useState } from "react";
import type { CEFRLevel } from "@/lib/cefr";
import type { CoreWord } from "@/lib/coreVocabularyTypes";

const DAY_MS = 86_400_000;

/**
 * Palavra do dia para o nível. O vocabulário (~450 kB) é importado sob
 * demanda: o painel pinta antes e o cartão se completa quando o chunk chega.
 * `undefined` = carregando; `null` = nível sem palavras.
 */
export function useWordOfTheDay(level: CEFRLevel): CoreWord | null | undefined {
	const [word, setWord] = useState<CoreWord | null | undefined>(undefined);

	useEffect(() => {
		let active = true;
		import("@/lib/coreVocabulary")
			.then(({ getWordsByLevel }) => {
				if (!active) return;
				const words = getWordsByLevel(level);
				setWord(words[Math.floor(Date.now() / DAY_MS) % words.length] ?? null);
			})
			.catch(() => {
				if (active) setWord(null);
			});
		return () => {
			active = false;
		};
	}, [level]);

	return word;
}
