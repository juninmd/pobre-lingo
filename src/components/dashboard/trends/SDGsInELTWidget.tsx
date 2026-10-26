import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SDGsInELTWidget() {
	return (
		<TrendWidget
			id="sdgsineltwidget"
			title="SDGs in ELT"
			description="Integre os Objetivos de Desenvolvimento Sustentável da ONU ao ensino de inglês."
			icon={<Globe className="h-5 w-5" />}
			xpReward={20}
		/>
	);
}
