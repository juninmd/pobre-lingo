import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GlobalCitizenshipWidget() {
	return (
		<TrendWidget
			id="globalcitizenship-widget"
			title="Global Citizenship"
			description="Desenvolva uma consciência global através de aulas focadas em cidadania global, preparando os alunos para interagirem em um mundo multicultural e interconectado."
			icon={<Globe className="h-5 w-5" />}
			xpReward={15}
		/>
	);
}
