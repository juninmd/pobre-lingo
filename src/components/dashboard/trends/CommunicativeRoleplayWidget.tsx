import { UserCircle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CommunicativeRoleplayWidget() {
    return (
        <TrendWidget
            title="Communicative Roleplay"
            description="Simule situações reais de comunicação."
            icon={<UserCircle className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
