import { Bot } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIPromptCraftingWidget() {
    return (
        <TrendWidget
            title="Prompt Engineering"
            description="Aprenda a criar prompts efetivos para praticar inglês com IAs."
            icon={<Bot className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
