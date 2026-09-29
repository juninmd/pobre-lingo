import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function LexicalApproachWidget() {
    return (
        <TrendWidget
            title="Lexical Approach"
            description="Aprenda blocos de palavras (chunks) em vez de regras isoladas."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
