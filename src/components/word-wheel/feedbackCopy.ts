import type { GuessFeedback } from "@/hooks/useWordWheel";

/** Texto da faixa de retorno de cada palpite. */
export function feedbackCopy(
	f: GuessFeedback,
	translate: (word: string) => string | undefined,
): { text: string; tone: "good" | "bonus" | "bad" } {
	const w = f.word.toUpperCase();
	switch (f.result) {
		case "found":
			return { text: `${w} = ${translate(f.word) ?? ""}`, tone: "good" };
		case "bonus": {
			const pt = translate(f.word);
			return {
				text: `Bônus! ${w}${pt ? ` = ${pt}` : ""} · +5 XP`,
				tone: "bonus",
			};
		}
		case "repeat":
			return { text: `${w} já foi encontrada`, tone: "bad" };
		case "short":
			return { text: "Use pelo menos 3 letras", tone: "bad" };
		default:
			return { text: `${w} não está na roda`, tone: "bad" };
	}
}
