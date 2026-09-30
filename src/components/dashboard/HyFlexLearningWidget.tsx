import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function HyFlexLearningWidget() {
	return (
		<TrendWidget
			title="Ensino Híbrido Flexível"
			description="Combine aprendizado síncrono e assíncrono no seu ritmo."
			icon={Laptop}
			actionText="Acessar"
		/>
	);
}
