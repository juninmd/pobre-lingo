import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function HyFlexLearningWidget() {
    return (
        <TrendWidget
            title="HyFlex Learning"
            description="Aprenda no seu próprio ritmo, combinando métodos online e offline."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
