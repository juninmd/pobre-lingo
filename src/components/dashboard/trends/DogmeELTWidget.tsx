import { TrendWidget } from "./TrendWidget";

export function DogmeELTWidget() {
	return (
		<TrendWidget
			id="dogme-elt"
			title="Dogme ELT"
			description="Ensino focado na conversação real, sem materiais prontos."
			icon="MessageSquare"
			actionText="Iniciar Conversa"
		>
			<p className="text-sm text-muted-foreground">
				Desafio: Pense em um assunto que ocorreu hoje e tente explicá-lo em inglês.
			</p>
		</TrendWidget>
	);
}
