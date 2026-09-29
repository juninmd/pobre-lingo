import { Compass } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function ExperientialLearningWidget() {
	return (
		<TrendWidget
			title="Aprendizado Experiencial"
			description="Aprenda através da experiência e reflexão."
			icon={Compass}
			actionText="Explorar"
		/>
	);
}
