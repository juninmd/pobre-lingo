import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function GreenELTWidget() {
    return (
        <TrendWidget
            title="Green ELT"
            description="Sustentabilidade e inglês ambiental."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
