import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AILanguagePartnerWidget() {
	return (
		<TrendWidget
			title="Parceiro de Idioma IA"
			description="Simule conversas reais para melhorar sua fluência."
			icon={Bot}
			actionText="Acessar"
		/>
	);
}
