import { Cookie } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function BiteSizedLearningWidget() {
	return (
		<TrendWidget
			title="Bite-sized Learning"
			description="Lições curtas e focadas para máxima retenção de conteúdo."
			icon={<Cookie className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
