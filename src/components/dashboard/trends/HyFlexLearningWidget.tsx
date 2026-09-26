import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function HyFlexLearningWidget() {
    return (
        <TrendWidget
            title="HyFlex Learning"
            description="Combine aprendizado síncrono e assíncrono perfeitamente."
            icon={<Laptop className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
