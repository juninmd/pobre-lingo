import { MessageCircle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ICCWidget() {
	return (
		<TrendWidget
			title="Intercultural Competence"
			description="Desenvolvimento de habilidades para comunicação intercultural efetiva."
			icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
