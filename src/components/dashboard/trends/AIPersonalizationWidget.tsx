import { MonitorPlay } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIPersonalizationWidget() {
	return (
		<TrendWidget
			title="AI Personalization"
			description="Aprendizado hiper-personalizado e adaptativo usando Inteligência Artificial e Data Driven Learning."
			icon={<MonitorPlay className="h-5 w-5 text-primary" />}
			xpReward={25}
			actionText="Explorar"
		>
			<div className="space-y-4">
				<p>
					No ensino de inglês moderno (2025+), AI Personalization é uma
					tendência crescente que integra as necessidades contemporâneas ao
					ensino de idiomas.
				</p>
			</div>
		</TrendWidget>
	);
}
