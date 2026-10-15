import { Heart } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function WellBeingWidget() {
	return (
		<TrendWidget
			title="Well-Being in ELT"
			description="Foque no bem-estar emocional de alunos e professores no processo de aprendizado."
			icon={<Heart className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
