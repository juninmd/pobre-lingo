import { Leaf } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * GreenELTWidget implements the Green ELT ELT trend.
 */
export function GreenELTWidget() {
	return (
		<TrendWidget
			title="Green ELT"
			description="Pratique inglês discutindo sustentabilidade e meio ambiente."
			icon={Leaf}
			actionText="Aprender sobre Sustentabilidade"
			successMessage="Você praticou vocabulário verde! +5 XP"
		/>
	);
}
