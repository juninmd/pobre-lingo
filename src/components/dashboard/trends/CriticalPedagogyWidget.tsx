import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function CriticalPedagogyWidget() {
    return (
        <TrendWidget
            title="Critical Pedagogy"
            description="Reflexão crítica sobre língua, poder e sociedade."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
