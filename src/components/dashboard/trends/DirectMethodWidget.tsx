import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DirectMethodWidget() {
	return (
		<TrendWidget
			title="Direct Method"
			description="Aprenda a pensar em inglês sem o uso de tradução."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
