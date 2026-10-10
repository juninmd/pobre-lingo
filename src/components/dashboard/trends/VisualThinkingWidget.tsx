import { PencilRuler } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function VisualThinkingWidget() {
	return (
		<TrendWidget
			id="visual-thinking-elt"
			title="Sketchnoting & Visual Thinking"
			description="Use desenhos simples e mapas visuais para melhorar a retenção, a memória e o engajamento."
			icon={<PencilRuler className="h-5 w-5" />}
			xpReward={15}
		/>
	);
}
