// @ts-nocheck
import { useMemo } from "react";
import {
	assumedKnownIds,
	createKnownPredicate,
} from "@/lib/input/knownPredicate";
import { loadProficiencyResult } from "@/lib/proficiency";
import { useKnownWords } from "./useKnownWords";

/** Palavras conhecidas (marcadas + presumidas pelo nível) para leitura e escuta. */
export function useWordKnowledge() {
	const { known, toggleKnown } = useKnownWords();
	const level = useMemo(() => loadProficiencyResult()?.level ?? null, []);
	const assumed = useMemo(() => assumedKnownIds(level), [level]);
	const isKnown = useMemo(
		() => createKnownPredicate(known, assumed),
		[known, assumed],
	);
	return { level, isKnown, toggleKnown, knownCount: known.size };
}
