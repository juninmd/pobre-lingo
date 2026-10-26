import { Kanban } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function EduScrumWidget() {
	return (
		<TrendWidget
			title="EduScrum & Metodologias Ágeis"
			description="Adaptação de frameworks ágeis para gerenciar a aprendizagem de idiomas de forma colaborativa."
			icon={<Kanban className="h-5 w-5" aria-hidden="true" />}
			xpReward={15}
			actionText="Explorar"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						O uso de sprints, reuniões diárias (stand-ups) e retrospectivas no
						aprendizado de inglês incentiva a colaboração, responsabilidade e o
						acompanhamento transparente do progresso, preparando alunos para
						ambientes de trabalho modernos.
					</p>
				</div>
			}
		/>
	);
}
