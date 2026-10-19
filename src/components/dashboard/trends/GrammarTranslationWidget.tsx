import { BookOpen } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * GrammarTranslationWidget
 *
 * Implements the Grammar-Translation trend using the shared TrendWidget architecture.
 */
export function GrammarTranslationWidget() {
	return (
		<TrendWidget
			title="Grammar-Translation"
			description="Método histórico focado na leitura, escrita e tradução de textos e regras gramaticais."
			icon={<BookOpen className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						Embora menos comum hoje, o método de Gramática e Tradução foi
						fundamental historicamente e ainda oferece insights sobre a
						estrutura da linguagem e análise comparativa.
					</p>
				</div>
			}
		/>
	);
}
