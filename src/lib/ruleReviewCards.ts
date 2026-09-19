import type { GrammarRule } from "@/lib/grammarRules";
import type { NewCardInput } from "@/lib/srs";

const MAX_CARDS_PER_RULE = 3;

/**
 * Transforma exemplos traduzidos de uma regra em cards de produção: o aluno vê
 * a frase em português e precisa lembrar como dizê-la em inglês.
 */
export function ruleReviewCards(
	rule: GrammarRule,
	href?: string,
): NewCardInput[] {
	return rule.examples
		.filter((example) => example.translation_pt)
		.slice(0, MAX_CARDS_PER_RULE)
		.map((example, index) => ({
			id: `rule-${rule.id}-${index}`,
			source: "grammar" as const,
			front: `Como se diz em inglês: "${example.translation_pt}"`,
			back: example.sentence_en,
			hint: rule.title_pt,
			href,
		}));
}
