import { Hammer } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ExperientialLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizado Experiencial"
			description="Aprenda fazendo"
			icon={Hammer}
			xpReward={20}
			actionText="Iniciar Projeto"
			content={<><p>Siga uma receita em inglês, jogue um jogo.</p><p className="mt-2 text-xs">Vivencie o idioma na prática.</p></>}
		/>
	);
}
