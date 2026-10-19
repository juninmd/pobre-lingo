import { Leaf } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * NaturalApproachWidget
 *
 * Implements the Natural Approach trend using the shared TrendWidget architecture.
 */
export function NaturalApproachWidget() {
	return (
		<TrendWidget
			title="Natural Approach"
			description="Foca na aquisição natural da linguagem, com ênfase na compreensão antes da produção."
			icon={<Leaf className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						Desenvolvido por Krashen e Terrell, o Natural Approach prioriza a
						comunicação significativa e a redução da ansiedade, assemelhando-se
						à forma como adquirimos nossa língua materna.
					</p>
				</div>
			}
		/>
	);
}
