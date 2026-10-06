import { Laptop } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function HyFlexLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizado HyFlex"
			description="Integre estudo presencial e remoto de forma flexível."
			icon={Laptop}
			actionText="Explorar"
		/>
	);
}
