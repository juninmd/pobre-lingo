import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function PhenomenonBasedLearningWidget() {
	return (
		<TrendWidget
			title="Phenomenon-Based Learning"
			description="Aprendizado baseado em fenômenos reais, focando em contextos multidisciplinares em vez de matérias isoladas."
			icon={<Globe className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
