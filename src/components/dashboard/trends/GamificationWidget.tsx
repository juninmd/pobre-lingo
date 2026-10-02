import { Gamepad2 } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GamificationWidget() {
    return (
        <TrendWidget
            title="Gamification in ELT"
            description="Aprenda inglês de forma divertida com mecânicas de jogos."
            icon={<Gamepad2 className="w-4 h-4" />}
            xpReward={10}
            actionText="Praticar"
        />
    );
}
