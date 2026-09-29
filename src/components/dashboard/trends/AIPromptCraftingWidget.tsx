import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIPromptCraftingWidget() {
	return (
		<TrendWidget
			title="Engenharia de Prompt"
			description="Aprenda a falar com a IA"
			icon={Bot}
			xpReward={10}
			actionText="Criar Prompt"
			content={<><p className="italic">"Act as an English teacher and explain..."</p><p className="mt-2 text-xs">Use verbos claros e defina a persona.</p></>}
		/>
	);
}
