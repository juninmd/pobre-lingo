import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SuggestopediaWidget() {
	return (
		<TrendWidget
			title="Suggestopedia"
			description="Aprendizado acelerado usando relaxamento e música."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
