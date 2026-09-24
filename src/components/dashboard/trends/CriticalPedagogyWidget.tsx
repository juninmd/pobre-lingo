import { Scale } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * CriticalPedagogyWidget implements the Pedagogia Crítica ELT trend.
 */
export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			title="Pedagogia Crítica"
			description="Questione o papel do inglês no mundo e o poder por trás das palavras."
			icon={Scale}
			actionText="Refletir Criticamente"
			successMessage="Reflexão crítica realizada! +5 XP"
		/>
	);
}
