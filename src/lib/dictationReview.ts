import type { DictationItem } from "@/lib/dictationData";
import type { NewCardInput } from "@/lib/srs";

/** Um ditado errado volta como produção: do português para a frase em inglês. */
export function dictationReviewCard(item: DictationItem): NewCardInput {
	return {
		id: `dictation-${item.id}`,
		source: "listening",
		front: `Ditado: escreva em inglês "${item.translation}"`,
		back: item.sentence,
		href: "/writing",
	};
}
