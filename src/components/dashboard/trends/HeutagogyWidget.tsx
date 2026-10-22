import { Compass } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function HeutagogyWidget() {
	return (
		<TrendWidget
			title="Heutagogia (Aprendizagem Autodeterminada)"
			description="Foco em alunos definindo seus próprios caminhos e objetivos de aprendizado."
			icon={<Compass className="h-5 w-5" aria-hidden="true" />}
			xpReward={15}
			actionText="Explorar"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>No ensino de inglês moderno (2025+), a heutagogia empodera os aprendizes a irem além de trilhas pré-definidas, permitindo que explorem tópicos e desenvolvam competências de acordo com sua própria motivação, contexto e necessidades reais.</p>
				</div>
			}
		/>
	);
}
