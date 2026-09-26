import { Sparkles } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AIStudyCoachWidget() {
    return (
        <TrendWidget
            title="AI Study Coach"
            description="Receba dicas de estudo personalizadas."
            icon={<Sparkles className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
