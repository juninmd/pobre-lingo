import { useCallback, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "@/lib/localStorage";

const NOTEBOOK_KEY = "pobrelingo_vocabulary_notebook";
const MAX_WORDS = 200;

function loadSaved(): string[] {
	return getLocalStorageItem<string[]>(NOTEBOOK_KEY, []);
}

export function useVocabularyNotebook() {
	const [savedWords, setSavedWords] = useState<string[]>(loadSaved);

	const _persist = useCallback((words: string[]) => {
		setLocalStorageItem(NOTEBOOK_KEY, words);
		setSavedWords(words);
	}, []);

	const saveWord = useCallback((id: string) => {
		setSavedWords((prev) => {
			if (prev.includes(id)) return prev;
			const updated = [...prev, id];
			// Remove oldest entries if over cap
			const capped =
				updated.length > MAX_WORDS
					? updated.slice(updated.length - MAX_WORDS)
					: updated;
			setLocalStorageItem(NOTEBOOK_KEY, capped);
			return capped;
		});
	}, []);

	const removeWord = useCallback((id: string) => {
		setSavedWords((prev) => {
			const updated = prev.filter((w) => w !== id);
			setLocalStorageItem(NOTEBOOK_KEY, updated);
			return updated;
		});
	}, []);

	const isWordSaved = useCallback(
		(id: string): boolean => {
			return savedWords.includes(id);
		},
		[savedWords],
	);

	return { savedWords, saveWord, removeWord, isWordSaved };
}
