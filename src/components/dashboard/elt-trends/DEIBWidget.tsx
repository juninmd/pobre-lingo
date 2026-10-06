import { Users } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function DEIBWidget() {
	return (
		<TrendWidget
			title="Diversidade e Inclusão"
			description="Pratique linguagem inclusiva e equitativa (DEIB)."
			icon={Users}
			actionText="Explorar"
		/>
	);
}
