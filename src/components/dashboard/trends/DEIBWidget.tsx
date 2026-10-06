import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DEIBWidget() {
	return (
		<TrendWidget
			title="DEIB"
			description="Diversidade, Equidade, Inclusão e Pertencimento no inglês."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
