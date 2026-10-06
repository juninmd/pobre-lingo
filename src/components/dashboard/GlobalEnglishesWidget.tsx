import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			title="Inglês Global (ELF)"
			description="Compreenda diferentes sotaques e o inglês como língua franca."
			icon={Globe}
			actionText="Acessar"
		/>
	);
}
