import type { CEFRLevel } from "@/lib/curriculumData";
import { CEFR_ORDER } from "@/lib/levels";

/**
 * Horas guiadas acumuladas para atingir cada nível (Cambridge English,
 * "guided learning hours": A2 ~180–200, B1 ~350–400, B2 ~500–600,
 * C1 ~700–800, C2 ~1.000–1.200). Usamos o teto de cada faixa.
 */
export const LEVEL_HOURS: Record<CEFRLevel, number> = {
	A1: 100,
	A2: 200,
	B1: 400,
	B2: 600,
	C1: 800,
	C2: 1200,
};

/**
 * Metas de leitura extensiva acumulada (palavras lidas). Referência do app,
 * inspirada na recomendação de Nation de ler grandes volumes de texto fácil.
 */
export const LEVEL_WORDS_READ: Record<CEFRLevel, number> = {
	A1: 5_000,
	A2: 30_000,
	B1: 120_000,
	B2: 300_000,
	C1: 600_000,
	C2: 1_000_000,
};

/** Fluência, para o app, é o B2: independente em conversa, leitura e trabalho. */
export const FLUENCY_LEVEL: CEFRLevel = "B2";

export function nextLevel(level: CEFRLevel | null): CEFRLevel {
	if (!level) return "A1";
	const index = CEFR_ORDER.indexOf(level);
	return CEFR_ORDER[Math.min(index + 1, CEFR_ORDER.length - 1)];
}

export type Projection = {
	target: CEFRLevel;
	hoursDone: number;
	hoursNeeded: number;
	progress: number;
	/** Semanas no ritmo atual; null se não houve estudo na semana. */
	weeksLeft: number | null;
};

export function projectTo(
	target: CEFRLevel,
	hoursDone: number,
	hoursPerWeek: number,
): Projection {
	const hoursNeeded = LEVEL_HOURS[target];
	const remaining = Math.max(0, hoursNeeded - hoursDone);
	return {
		target,
		hoursDone,
		hoursNeeded,
		progress: Math.min(1, hoursDone / hoursNeeded),
		weeksLeft:
			remaining === 0
				? 0
				: hoursPerWeek > 0
					? Math.ceil(remaining / hoursPerWeek)
					: null,
	};
}
