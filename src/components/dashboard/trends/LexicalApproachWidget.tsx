import { Blocks } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * LexicalApproachWidget implements the Abordagem Lexical (Chunks) ELT trend.
 */
export function LexicalApproachWidget() {
	return (
		<TrendWidget
			title="Abordagem Lexical (Chunks)"
			description="Aprenda blocos de palavras (chunks) em vez de gramática isolada."
			icon={Blocks}
			actionText="Praticar Chunks"
			successMessage="Mais chunks no seu vocabulário! +5 XP"
		/>
	);
}
