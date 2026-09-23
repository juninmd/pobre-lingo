import { Library } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function LexicalApproachWidget() {
	return (
		<TrendWidget
			title="Abordagem Lexical"
			description="Aprenda em blocos de palavras (chunks)."
			icon={Library}
			actionText="Explorar"
		/>
	);
}
