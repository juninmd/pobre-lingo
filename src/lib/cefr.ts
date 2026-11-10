/** Níveis do CEFR e a aparência de cada um. Sem dados de currículo: é seguro importar de qualquer tela. */
export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export type CEFRLevel = (typeof CEFR_LEVELS)[number];

export const cefrConfig: Record<
	CEFRLevel,
	{
		label: string;
		color: string;
		textColor: string;
		borderColor: string;
		badgeClass: string;
		bgLight: string;
		description: string;
	}
> = {
	A1: {
		label: "A1 • Iniciante",
		color: "bg-emerald-500 dark:bg-emerald-600",
		textColor: "text-emerald-600 dark:text-emerald-400",
		borderColor: "border-emerald-200 dark:border-emerald-800",
		badgeClass: "bg-emerald-700 text-white hover:bg-emerald-800",
		bgLight: "bg-emerald-50 dark:bg-emerald-950/20",
		description:
			"Frases extremamente simples e vocabulário básico do dia a dia.",
	},
	A2: {
		label: "A2 • Básico",
		color: "bg-teal-500 dark:bg-teal-600",
		textColor: "text-teal-600 dark:text-teal-400",
		borderColor: "border-teal-200 dark:border-teal-800",
		badgeClass: "bg-teal-700 text-white hover:bg-teal-800",
		bgLight: "bg-teal-50 dark:bg-teal-950/20",
		description: "Expressões comuns e tópicos de relevância pessoal imediata.",
	},
	B1: {
		label: "B1 • Intermediário",
		color: "bg-sky-500 dark:bg-sky-600",
		textColor: "text-sky-600 dark:text-sky-400",
		borderColor: "border-sky-200 dark:border-sky-800",
		badgeClass: "bg-sky-700 text-white hover:bg-sky-800",
		bgLight: "bg-sky-50 dark:bg-sky-950/20",
		description: "Tópicos familiares de trabalho, escola, lazer e viagens.",
	},
	B2: {
		label: "B2 • Pós-Intermediário",
		color: "bg-indigo-500 dark:bg-indigo-600",
		textColor: "text-indigo-600 dark:text-indigo-400",
		borderColor: "border-indigo-200 dark:border-indigo-800",
		badgeClass: "bg-indigo-600 text-white hover:bg-indigo-700",
		bgLight: "bg-indigo-50 dark:bg-indigo-950/20",
		description: "Textos complexos, conversação fluida e discussões técnicas.",
	},
	C1: {
		label: "C1 • Avançado",
		color: "bg-violet-500 dark:bg-violet-600",
		textColor: "text-violet-600 dark:text-violet-400",
		borderColor: "border-violet-200 dark:border-violet-800",
		badgeClass: "bg-violet-600 text-white hover:bg-violet-700",
		bgLight: "bg-violet-50 dark:bg-violet-950/20",
		description:
			"Textos exigentes, uso flexível da língua para fins sociais/profissionais.",
	},
	C2: {
		label: "C2 • Proficiente",
		color: "bg-rose-500 dark:bg-rose-600",
		textColor: "text-rose-600 dark:text-rose-400",
		borderColor: "border-rose-200 dark:border-rose-800",
		badgeClass: "bg-rose-600 text-white hover:bg-rose-700",
		bgLight: "bg-rose-50 dark:bg-rose-950/20",
		description:
			"Entendimento total, reconstrução de argumentos e nuances sutis.",
	},
};

export function getCEFRLevel(unitId: string | undefined): CEFRLevel {
	if (!unitId) return "A1";
	const unitNumber = parseInt(unitId.replace("unit-", ""), 10);
	if (Number.isNaN(unitNumber)) return "A1";
	if (unitNumber <= 2) return "A1";
	if (unitNumber <= 4) return "A2";
	if (unitNumber <= 7) return "B1";
	if (unitNumber <= 10) return "B2";
	if (unitNumber <= 13) return "C1";
	return "C2";
}
