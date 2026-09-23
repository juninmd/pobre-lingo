import { Languages } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function TranslanguagingWidget() {
	return (
		<TrendWidget
			title="Translanguaging"
			description="Faça pontes cognitivas entre português e inglês."
			icon={Languages}
			actionText="Explorar"
		/>
	);
}
