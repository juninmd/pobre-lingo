import { MessageSquare } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function AILanguagePartnerWidget() {
	return (
		<TrendWidget
			title="IA Parceira de Idiomas"
			description="Pratique conversação com uma IA inteligente."
			icon={MessageSquare}
			actionText="Explorar"
		/>
	);
}
