import { CheckSquare } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TBLTWidget() {
    return (
        <TrendWidget
            title="Task-Based Language Teaching"
            description="Aprenda inglês focado na resolução de tarefas reais."
            icon={<CheckSquare className="w-4 h-4" />}
            xpReward={10}
            actionText="Praticar"
        />
    );
}
