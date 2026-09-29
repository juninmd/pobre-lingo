import { HeartHandshake } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * DEIBWidget implements the DEIB no Inglês ELT trend.
 */
export function DEIBWidget() {
	return (
		<TrendWidget
			title="DEIB no Inglês"
			description="Diversidade, Equidade, Inclusão e Pertencimento na linguagem."
			icon={HeartHandshake}
			actionText="Estudar Inclusão"
			successMessage="Você explorou inglês inclusivo! +5 XP"
		/>
	);
}
