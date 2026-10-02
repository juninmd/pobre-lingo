import { BookOpen } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function FlippedClassroomWidget() {
    return (
        <TrendWidget
            title="Flipped Classroom"
            description="Estude a teoria em casa e pratique intensamente na aula."
            icon={<BookOpen className="w-4 h-4" />}
            xpReward={10}
        />
    );
}
