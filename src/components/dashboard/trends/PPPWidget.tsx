import { Layers } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * PPPWidget
 *
 * Implements the PPP (Presentation, Practice, Production) trend using the shared TrendWidget architecture.
 */
export function PPPWidget() {
	return (
		<TrendWidget
			title="PPP (Presentation, Practice, Production)"
			description="Abordagem clássica estruturada em três fases para introduzir e praticar nova linguagem."
			icon={<Layers className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						PPP é um modelo de planejamento de aula amplamente utilizado que
						fornece uma estrutura clara para professores e alunos, partindo da
						introdução controlada até a produção mais livre.
					</p>
				</div>
			}
		/>
	);
}
