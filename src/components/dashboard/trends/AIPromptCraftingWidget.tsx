import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * AIPromptCraftingWidget implements the Engenharia de Prompts (IA) ELT trend.
 */
export function AIPromptCraftingWidget() {
	return (
		<TrendWidget
			title="Engenharia de Prompts (IA)"
			description="Aprenda a interagir com IAs em inglês para turbinar seus estudos."
			icon={Bot}
			actionText="Praticar Prompts"
			successMessage="Você ganhou +5 XP por praticar Prompts em Inglês!"
		/>
	);
}
