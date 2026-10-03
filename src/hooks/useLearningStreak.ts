// @ts-nocheck
"use client";

import { useCallback, useEffect, useState } from "react";
import {
	readLastActivityDate,
	readStreak,
	recordStreakActivity,
} from "@/lib/streak";

/**
 * Exibe a ofensiva compartilhada. Antes este hook mantinha um contador
 * próprio que subia a cada abertura do app — agora ele apenas lê a fonte
 * única, alimentada por atividade de estudo real.
 */
export function useLearningStreak() {
	const [streak, setStreak] = useState<number>(() => readStreak());
	const [lastActiveDate, setLastActiveDate] = useState<string | null>(() =>
		readLastActivityDate(),
	);

	const refresh = useCallback(() => {
		setStreak(readStreak());
		setLastActiveDate(readLastActivityDate());
	}, []);

	/** Marca estudo hoje. Só deve ser chamado por atividade concluída. */
	const updateStreak = useCallback(() => {
		setStreak(recordStreakActivity());
		setLastActiveDate(readLastActivityDate());
	}, []);

	// Reavalia ao voltar para a aba: a virada do dia pode ter quebrado a sequência.
	useEffect(() => {
		const onVisible = () => {
			if (document.visibilityState === "visible") refresh();
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => document.removeEventListener("visibilitychange", onVisible);
	}, [refresh]);

	return { streak, updateStreak, lastActiveDate, refresh };
}
