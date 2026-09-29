import { Brain } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MindfulWidget() {
	return (
		<TrendWidget
			title="Mindfulness no Inglês"
			description="Foco e redução de estresse"
			icon={Brain}
			xpReward={10}
			actionText="Respirar"
			content={<><p className="italic">"I am capable of learning English."</p><p className="mt-2 text-xs">Afirmações positivas e atenção plena na prática.</p></>}
		/>
	);
}
