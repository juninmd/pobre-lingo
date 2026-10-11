import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AudioLingualWidget() {
	return (
		<TrendWidget
			title="Audio-Lingual Method"
			description="Repetição de padrões e diálogos para formação de hábitos."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
