import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function BlendedLearningWidget() {
	return (
		<TrendWidget
			title="Blended Learning"
			description="Integração de ensino presencial e digital de forma híbrida."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
