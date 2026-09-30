import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ExperientialLearningWidget() {
	return (
		<TrendWidget
			title="Experiential Learning"
			description="Aprenda fazendo através de experiências práticas."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
