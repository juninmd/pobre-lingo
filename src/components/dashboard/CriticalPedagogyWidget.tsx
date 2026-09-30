import { Brain } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			title="Pedagogia Crítica"
			description="Reflita sobre o papel do idioma na sociedade e cultura."
			icon={Brain}
			actionText="Acessar"
		/>
	);
}
