import { TrendWidget } from "./TrendWidget";
import { Lightbulb } from "lucide-react";

export function DogmeELTWidget() {
    return (
        <TrendWidget
            title="Dogme ELT"
            description="Aprendizado focado em conversação e materiais gerados pelo aluno."
            icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
        />
    );
}
