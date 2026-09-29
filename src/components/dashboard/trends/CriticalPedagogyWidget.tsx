import { Scale } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CriticalPedagogyWidget() {
    return (
        <TrendWidget
            title="Critical Pedagogy"
            description="Reflexões críticas sobre linguagem e sociedade."
            icon={<Scale className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
