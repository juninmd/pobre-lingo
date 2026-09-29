import { TrendWidget } from "./TrendWidget";

export function HyFlexLearningWidget() {
	return (
		<TrendWidget
			id="hyflex-learning"
			title="HyFlex Learning"
			description="Estudo híbrido flexível. Combine online e offline."
			icon="Network"
			actionText="Registrar Estudo"
		>
			<p className="text-sm text-muted-foreground">
				Dica: Alterne entre exercícios no app e leitura de livros físicos.
			</p>
		</TrendWidget>
	);
}
