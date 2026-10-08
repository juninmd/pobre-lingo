import { Brain } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function NeuroELTWidget() {
	return (
		<TrendWidget
			title="NeuroELT"
			description="Ensino baseado em neurociência para otimizar aprendizado."
			icon={<Brain className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
