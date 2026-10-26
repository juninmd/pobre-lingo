import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIPersonalizationWidget() {
	return (
		<TrendWidget
			id="aipersonalizationwidget"
			title="AI Personalization"
			description="Utilize IA para personalizar o aprendizado de cada aluno."
			icon={<Bot className="h-5 w-5" />}
			xpReward={20}
		/>
	);
}
