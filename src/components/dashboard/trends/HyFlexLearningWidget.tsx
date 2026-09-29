import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * HyFlexLearningWidget implements the Aprendizado HyFlex ELT trend.
 */
export function HyFlexLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizado HyFlex"
			description="Combine estudo online e offline de forma fluida e adaptável."
			icon={Laptop}
			actionText="Sincronizar"
			successMessage="Estudo híbrido sincronizado! +5 XP"
		/>
	);
}
