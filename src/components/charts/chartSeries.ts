import type { StudyKind } from "@/lib/studyTime";

export interface ChartSeries {
	kind: StudyKind;
	label: string;
	/** Cor da série; os valores claros e escuros vivem em styles/tokens.css. */
	color: string;
}

/**
 * Ordem fixa: a cor acompanha a vertente em todos os gráficos, nunca a
 * posição. As cinco cores foram validadas para daltonismo nos dois temas.
 */
export const STUDY_SERIES: ChartSeries[] = [
	{ kind: "reading", label: "Leitura", color: "var(--series-1)" },
	{ kind: "listening", label: "Escuta", color: "var(--series-2)" },
	{ kind: "speaking", label: "Fala", color: "var(--series-3)" },
	{ kind: "writing", label: "Escrita", color: "var(--series-4)" },
	{ kind: "study", label: "Lições e jogos", color: "var(--series-5)" },
];

export const SERIES_BY_KIND = Object.fromEntries(
	STUDY_SERIES.map((series) => [series.kind, series]),
) as Record<StudyKind, ChartSeries>;
