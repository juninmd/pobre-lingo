import { TrendWidget } from "./TrendWidget";

export function GreenELTWidget() {
	return (
		<TrendWidget
			id="green-elt"
			title="Green ELT"
			description="Aprenda inglês enquanto debate sustentabilidade."
			icon="Leaf"
			actionText="Ler sobre Sustentabilidade"
		>
			<p className="text-sm text-muted-foreground">
				Vocabulário útil: Carbon footprint, Renewable energy, Sustainable development.
			</p>
		</TrendWidget>
	);
}
