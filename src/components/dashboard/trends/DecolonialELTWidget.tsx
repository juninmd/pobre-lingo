import { Globe2 } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DecolonialELTWidget() {
	return (
		<TrendWidget
			title="Decolonial ELT"
			description="Desconstrução de hierarquias e foco em vozes locais no ensino."
			icon={<Globe2 className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
