import type { NewCardInput } from "@/lib/srsTypes";

const MAX_FRONT = 120;

/** Limpa o texto copiado: espaços colapsados, no máximo 120 caracteres; null se vazio. */
export function normalizeCapture(raw: string): string | null {
	const text = raw.replace(/\s+/g, " ").trim().slice(0, MAX_FRONT).trim();
	return text.length > 0 ? text : null;
}

/** Card de revisão para uma palavra ou frase capturada fora do app. */
export function buildCaptureCard(front: string, back: string): NewCardInput | null {
	const cleanFront = normalizeCapture(front);
	const cleanBack = normalizeCapture(back);
	if (!cleanFront || !cleanBack) return null;
	return {
		id: `capture:${cleanFront.toLowerCase()}`,
		source: "vocabulary",
		front: cleanFront,
		back: cleanBack,
		hint: "Capturado de outro app",
	};
}
