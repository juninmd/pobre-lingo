import { RotateCw } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SpacedRepetitionWidget() {
	return (
		<TrendWidget
			title="Spaced Repetition"
			description="Revisão inteligente para memorização de longo prazo."
			icon={<RotateCw className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
