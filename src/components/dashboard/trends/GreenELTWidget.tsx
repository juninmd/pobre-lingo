import { Leaf } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GreenELTWidget() {
    return (
        <TrendWidget
            title="Green ELT"
            description="Aprenda vocabulário sobre sustentabilidade e meio ambiente."
            icon={<Leaf className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
