import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ESPWidget() {
	return (
		<TrendWidget
			title="English for Specific Purposes"
			description="Inglês focado em áreas profissionais e acadêmicas."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
