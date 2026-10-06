import { Scale } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			title="Pedagogia Crítica"
			description="Reflexões críticas sobre linguagem e sociedade."
			icon={Scale}
			actionText="Explorar"
		/>
	);
}
