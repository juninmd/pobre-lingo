import { Smartphone } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MALLWidget() {
	return (
		<TrendWidget
			title="Mobile-Assisted Language Learning (MALL)"
			description="Aprenda inglês em qualquer lugar com micro-interações focadas em dispositivos móveis."
			icon={<Smartphone className="w-5 h-5" />}
			xpReward={15}
		/>
	);
}
