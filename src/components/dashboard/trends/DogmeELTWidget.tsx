import { MessageCircle } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * DogmeELTWidget implements the Dogme ELT ELT trend.
 */
export function DogmeELTWidget() {
	return (
		<TrendWidget
			title="Dogme ELT"
			description="Foco na conversação emergente, sem depender de materiais didáticos pesados."
			icon={MessageCircle}
			actionText="Conversar Livremente"
			successMessage="Você praticou inglês livre! +5 XP"
		/>
	);
}
