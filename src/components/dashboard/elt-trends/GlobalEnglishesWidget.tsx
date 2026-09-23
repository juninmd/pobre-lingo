import { Globe } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			title="Inglês Global (ELF)"
			description="Exposição a diversos sotaques e variações do inglês."
			icon={Globe}
			actionText="Explorar"
		/>
	);
}
