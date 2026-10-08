import { Zap } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function NanoLearningWidget() {
	return (
		<TrendWidget
			title="Nano-learning"
			description="Módulos de aprendizagem ultra-rápidos e focados."
			icon={<Zap className="w-4 h-4" />}
			xpReward={10}
			actionText="Praticar"
		/>
	);
}
