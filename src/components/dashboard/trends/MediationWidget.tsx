import { MessagesSquare } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MediationWidget() {
	return (
		<TrendWidget
			title="Language Mediation"
			description="Desenvolva habilidades de mediação linguística e resolução de problemas na comunicação."
			icon={<MessagesSquare className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
