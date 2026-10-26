import { Brain } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * Neurolanguage Coaching methodology widget.
 */
export function NeurolanguageCoachingWidget() {
	return (
		<TrendWidget
			title="Neurolanguage Coaching"
			description="Combina neurociência com coaching para otimizar o aprendizado."
			icon={<Brain className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
