import { Heart } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MindfulWidget() {
    return (
        <TrendWidget
            title="Mindful Learning"
            description="Afirmações diárias e foco no aprendizado."
            icon={<Heart className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
