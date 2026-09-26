import { Activity } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ExperientialLearningWidget() {
    return (
        <TrendWidget
            title="Experiential Learning"
            description="Aprenda fazendo e refletindo sobre a experiência."
            icon={<Activity className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
