import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIPersonalizationWidget() {
	return (
		<TrendWidget
			title="AI Personalization"
			description="Trilhas de aprendizado personalizadas por Inteligência Artificial."
			icon={<Bot className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
