import { ArrowRightLeft } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TranslanguagingWidget() {
    return (
        <TrendWidget
            title="Translanguaging"
            description="Faça pontes cognitivas entre português e inglês."
            icon={<ArrowRightLeft className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
