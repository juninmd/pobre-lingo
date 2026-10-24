import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SDGsInELTWidget() {
	return (
		<TrendWidget
			title="SDGs in ELT"
			description="Sustainable Development Goals integrados ao ensino de inglês."
			icon={<Globe className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
