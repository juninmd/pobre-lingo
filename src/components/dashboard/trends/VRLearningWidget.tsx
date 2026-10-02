import { Glasses } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function VRLearningWidget() {
    return (
        <TrendWidget
            title="VR/AR Immersive Learning"
            description="Experimente simulações imersivas em realidade virtual."
            icon={<Glasses className="w-4 h-4" />}
            xpReward={10}
            actionText="Praticar"
        />
    );
}
