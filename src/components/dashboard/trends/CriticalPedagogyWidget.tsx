import { Scale } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CriticalPedagogyWidget() {
	return (
		<TrendWidget
			title="Pedagogia Crítica"
			description="Língua e poder"
			icon={Scale}
			xpReward={15}
			actionText="Analisar Texto"
			content={<><p>Quem conta a história? Qual é o viés?</p><p className="mt-2 text-xs">Leia as entrelinhas de notícias e discursos.</p></>}
		/>
	);
}
