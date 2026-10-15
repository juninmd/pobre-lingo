import { Briefcase } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TeacherpreneurshipWidget() {
	return (
		<TrendWidget
			title="Teacherpreneurship"
			description="Explore estratégias para professores empreenderem no ensino de idiomas."
			icon={<Briefcase className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
