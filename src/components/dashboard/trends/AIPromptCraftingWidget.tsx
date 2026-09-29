import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function AIPromptCraftingWidget() {
    return (
        <TrendWidget
            title="Prompt Engineering"
            description="Aprenda a criar prompts eficientes para IA em inglês."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
