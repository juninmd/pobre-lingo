import { Search } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * InquiryBasedLearningWidget implements the Inquiry-Based Learning ELT trend.
 */
export function InquiryBasedLearningWidget() {
	return (
		<TrendWidget
			title="Inquiry-Based Learning"
			description="Faça perguntas, pesquise e descubra a língua inglesa de forma investigativa."
			icon={Search}
			actionText="Investigar"
			successMessage="Investigação linguística finalizada! +5 XP"
		/>
	);
}
