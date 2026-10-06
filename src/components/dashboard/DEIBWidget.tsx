import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DEIBWidget() {
	return (
		<TrendWidget
			title="Diversidade & Inclusão"
			description="Explore linguagem inclusiva e perspectivas globais."
			icon={Users}
			actionText="Acessar"
		/>
	);
}
