import { Earth } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * GlobalEnglishesWidget implements the Global Englishes (ELF) ELT trend.
 */
export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			title="Global Englishes (ELF)"
			description="Prepare-se para ouvir sotaques do mundo todo, não apenas de nativos."
			icon={Earth}
			actionText="Treinar Ouvidos"
			successMessage="Você treinou compreensão global! +5 XP"
		/>
	);
}
