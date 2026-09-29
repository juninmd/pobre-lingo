import { TrendWidget } from "./TrendWidget";

export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			id="critical-pedagogy"
			title="Pedagogia Crítica"
			description="Pense criticamente sobre a linguagem e a sociedade."
			icon="Shield"
			actionText="Refletir"
		>
			<p className="text-sm text-muted-foreground">
				Reflexão: Como a escolha das palavras pode mudar a percepção de uma notícia?
			</p>
		</TrendWidget>
	);
}
