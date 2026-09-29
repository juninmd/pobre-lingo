import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function InquiryBasedLearningWidget() {
    return (
        <TrendWidget
            title="Inquiry-Based Learning"
            description="Construa conhecimento fazendo perguntas e investigando."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
