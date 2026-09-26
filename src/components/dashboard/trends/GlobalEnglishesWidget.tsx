import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GlobalEnglishesWidget() {
    return (
        <TrendWidget
            title="Global Englishes"
            description="Explore diferentes sotaques e variações do inglês."
            icon={<Globe className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
