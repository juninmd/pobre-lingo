import { Search } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function InquiryBasedLearningWidget() {
    return (
        <TrendWidget
            title="Inquiry-Based Learning"
            description="Aprenda através de perguntas e descobertas."
            icon={<Search className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
