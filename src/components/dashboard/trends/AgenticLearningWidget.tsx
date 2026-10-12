import { UserCog } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AgenticLearningWidget() {
	return (
		<TrendWidget
			title="Agentic Learning"
			description="Foco na autonomia do aluno, permitindo que ele guie sua própria jornada de aprendizado."
			icon={<UserCog className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
