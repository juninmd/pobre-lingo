import { Leaf } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function GreenELTWidget() {
	return (
		<TrendWidget
			title="Green ELT"
			description="Vocabulário sobre sustentabilidade e meio ambiente."
			icon={Leaf}
			actionText="Explorar"
		/>
	);
}
