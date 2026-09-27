import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function MindfulWidget() {
    return (
        <TrendWidget
            title="Mindfulness"
            description="Afirmações diárias e ensino socioemocional em inglês."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
