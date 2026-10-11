import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TPRWidget() {
	return (
		<TrendWidget
			title="Total Physical Response"
			description="Aprenda inglês através de movimentos e coordenação motora."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
