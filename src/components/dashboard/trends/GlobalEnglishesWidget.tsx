import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			title="Inglês Global (ELF)"
			description="O inglês é do mundo"
			icon={Globe}
			xpReward={10}
			actionText="Ouvir Sotaques"
			content={<><p>Entenda indianos, australianos, escoceses...</p><p className="mt-2 text-xs">Comunicação é mais importante que 'sotaque perfeito'.</p></>}
		/>
	);
}
