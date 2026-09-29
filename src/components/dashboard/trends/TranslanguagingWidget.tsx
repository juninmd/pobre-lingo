import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function TranslanguagingWidget() {
    return (
        <TrendWidget
            title="Translanguaging"
            description="Conexões cognitivas entre o português e o inglês."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
