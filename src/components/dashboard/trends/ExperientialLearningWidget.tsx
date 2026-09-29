import { TrendWidget } from "./TrendWidget";

export function ExperientialLearningWidget() {
	return (
		<TrendWidget
			id="experiential-learning"
			title="Experiential Learning"
			description="Aprenda fazendo. Aplique o inglês em situações práticas."
			icon="Target"
			actionText="Simular Situação"
		>
			<p className="text-sm text-muted-foreground">
				Simulação de hoje: Pedindo um café em uma cafeteria movimentada.
			</p>
		</TrendWidget>
	);
}
