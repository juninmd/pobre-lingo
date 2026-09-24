import { Flower } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * MindfulWidget implements the Mindfulness & Inglês ELT trend.
 */
export function MindfulWidget() {
	return (
		<TrendWidget
			title="Mindfulness & Inglês"
			description="Afirmações positivas e relaxamento para reduzir a ansiedade ao falar."
			icon={Flower}
			actionText="Respirar e Falar"
			successMessage="Prática mindful concluída! +5 XP"
		/>
	);
}
