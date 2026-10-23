import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SDGsInELTWidget() {
	return (
		<TrendWidget
			title="SDGs in ELT"
			description="Integração dos Objetivos de Desenvolvimento Sustentável da ONU no ensino de inglês."
			icon={<Users className="h-5 w-5 text-primary" />}
			xpReward={25}
			actionText="Explorar"
		>
			<div className="space-y-4">
				<p>
					No ensino de inglês moderno (2025+), SDGs in ELT é uma tendência
					crescente que integra as necessidades contemporâneas ao ensino de
					idiomas.
				</p>
			</div>
		</TrendWidget>
	);
}
