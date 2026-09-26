import { Puzzle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function LexicalApproachWidget() {
    return (
        <TrendWidget
            title="Lexical Approach"
            description="Aprenda blocos de palavras (chunks) em vez de palavras isoladas."
            icon={<Puzzle className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
