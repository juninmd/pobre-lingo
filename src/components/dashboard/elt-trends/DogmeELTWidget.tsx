import { Coffee } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function DogmeELTWidget() {
	return (
		<TrendWidget
			title="Dogme ELT"
			description="Conversação espontânea sem materiais didáticos engessados."
			icon={Coffee}
			actionText="Explorar"
		/>
	);
}
