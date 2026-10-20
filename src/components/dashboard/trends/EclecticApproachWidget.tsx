import { Puzzle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * EclecticApproachWidget
 *
 * Implements the Abordagem Eclética trend using the shared TrendWidget architecture.
 */
export function EclecticApproachWidget() {
	return (
		<TrendWidget
			title="Abordagem Eclética"
			description="Combinação de várias abordagens e metodologias para atender às diversas necessidades dos alunos."
			icon={<Puzzle className="h-5 w-5" />}
			xpReward={15}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						A abordagem eclética permite que os professores selecionem as
						técnicas mais eficazes de diferentes métodos (como CLT, TPR, etc.) e
						as adaptem ao contexto específico da sala de aula.
					</p>
				</div>
			}
		/>
	);
}
