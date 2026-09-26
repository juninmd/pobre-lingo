import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DEIBWidget() {
    return (
        <TrendWidget
            title="DEIB"
            description="Diversidade, Equidade, Inclusão e Pertencimento no idioma."
            icon={<Users className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
