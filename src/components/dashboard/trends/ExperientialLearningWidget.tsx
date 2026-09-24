import { Briefcase } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * ExperientialLearningWidget implements the Aprendizado Experiencial ELT trend.
 */
export function ExperientialLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizado Experiencial"
			description="Aprenda fazendo: simule situações da vida real e reflita sobre a experiência."
			icon={Briefcase}
			actionText="Iniciar Simulação"
			successMessage="Experiência prática concluída! +5 XP"
		/>
	);
}
