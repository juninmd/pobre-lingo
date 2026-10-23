import { EyeOff } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function InvisibleLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizagem Invisível"
			description="Integração das aprendizagens informais e não formais que ocorrem fora da sala de aula."
			icon={<EyeOff className="h-5 w-5" aria-hidden="true" />}
			xpReward={15}
			actionText="Explorar"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						A fluência em inglês muitas vezes acontece de forma imperceptível
						por meio de jogos, redes sociais e consumo de mídia. Esta abordagem
						valoriza e captura esses momentos de imersão autêntica no cotidiano.
					</p>
				</div>
			}
		/>
	);
}
