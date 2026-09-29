import { Bot } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function AIPromptCraftingWidget() {
	return (
		<TrendWidget
			title="Engenharia de Prompts"
			description="Aprenda a criar prompts eficientes para IAs."
			icon={Bot}
			actionText="Explorar"
		/>
	);
}
