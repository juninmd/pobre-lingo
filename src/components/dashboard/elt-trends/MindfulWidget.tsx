import { Heart } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function MindfulWidget() {
	return (
		<TrendWidget
			title="Mindfulness e Socioemocional"
			description="Afirmações diárias e aprendizado consciente."
			icon={Heart}
			actionText="Explorar"
		/>
	);
}
