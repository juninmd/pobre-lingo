import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AuthenticMaterialsWidget() {
	return (
		<TrendWidget
			title="Authentic Materials"
			description="Pratique com conteúdos reais do dia a dia."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
