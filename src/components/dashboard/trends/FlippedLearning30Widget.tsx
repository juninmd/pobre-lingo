import { RotateCcw } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function FlippedLearning30Widget() {
	return (
		<TrendWidget
			title="Flipped Learning 3.0"
			description="Aprendizado invertido avançado focado na experiência e IA."
			icon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
