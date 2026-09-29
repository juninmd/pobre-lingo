import { ArrowRightLeft } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * TranslanguagingWidget implements the Translanguaging ELT trend.
 */
export function TranslanguagingWidget() {
	return (
		<TrendWidget
			title="Translanguaging"
			description="Use seu português estrategicamente para construir pontes com o inglês."
			icon={ArrowRightLeft}
			actionText="Comparar Estruturas"
			successMessage="Você fez conexões bilíngues! +5 XP"
		/>
	);
}
