import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			title="Global Englishes"
			description="Compreenda diferentes sotaques e variações do inglês."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
