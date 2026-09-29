import { MessageCircle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AILanguagePartnerWidget() {
    return (
        <TrendWidget
            title="AI Language Partner"
            description="Pratique conversação com seu parceiro virtual."
            icon={<MessageCircle className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
