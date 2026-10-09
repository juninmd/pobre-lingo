import { HeartHandshake } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SELWidget() {
	return (
		<TrendWidget
			title="Social Emotional Learning (SEL)"
			description="Integração de habilidades socioemocionais para reduzir a ansiedade no aprendizado de idiomas."
			icon={<HeartHandshake className="w-5 h-5" />}
			xpReward={15}
		/>
	);
}
