// @ts-nocheck
import { useCallback, useMemo } from "react";
import { usePersistentState } from "./usePersistentState";

export function useKnownWords() {
	const [ids, setIds] = usePersistentState<string[]>(
		"pobrelingo_known_words",
		[],
	);

	const known = useMemo(() => new Set(ids), [ids]);

	const markKnown = useCallback(
		(id: string) => {
			setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
		},
		[setIds],
	);

	const toggleKnown = useCallback(
		(id: string) => {
			setIds((prev) =>
				prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
			);
		},
		[setIds],
	);

	const isKnown = useCallback((id: string) => known.has(id), [known]);

	return { ids, known, isKnown, markKnown, toggleKnown };
}
