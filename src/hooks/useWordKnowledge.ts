import { useMemo } from "react";
import { createKnownPredicate } from "@/lib/input/knownPredicate";
import { loadProficiencyResult } from "@/lib/proficiency";
import { useKnownWords } from "./useKnownWords";

/** Only learner-marked words are treated as known; placement is a study suggestion. */
export function useWordKnowledge() {
	const { known, toggleKnown } = useKnownWords();
	const level = useMemo(() => loadProficiencyResult()?.level ?? null, []);
	const assumed = useMemo(() => new Set<string>(), []);
	const isKnown = useMemo(
		() => createKnownPredicate(known, assumed),
		[known, assumed],
	);
	return { level, isKnown, toggleKnown, knownCount: known.size };
}
