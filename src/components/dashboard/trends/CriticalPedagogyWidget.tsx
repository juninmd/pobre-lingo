import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			title="Critical Pedagogy"
			description="Reflexão crítica sobre língua, poder e sociedade."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
