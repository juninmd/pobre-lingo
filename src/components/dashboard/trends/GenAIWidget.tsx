import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GenAIWidget() {
	return (
		<TrendWidget
			title="Generative AI in ELT"
			description="Integração de Inteligência Artificial Generativa para criar materiais e facilitar o aprendizado personalizado."
			icon={<Bot className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
