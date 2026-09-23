import { Search } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function InquiryBasedLearningWidget() {
	return (
		<TrendWidget
			title="Inquiry-Based Learning"
			description="Aprendizado baseado em investigação e curiosidade."
			icon={Search}
			actionText="Explorar"
		/>
	);
}
