import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CLTWidget() {
	return (
		<TrendWidget
			title="Communicative Language Teaching"
			description="Foco na comunicação real e interação em situações práticas."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
