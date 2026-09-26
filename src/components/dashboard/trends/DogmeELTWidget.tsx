import { MessageSquare } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DogmeELTWidget() {
    return (
        <TrendWidget
            title="Dogme ELT"
            description="Conversação focada no aluno, sem materiais prévios."
            icon={<MessageSquare className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
