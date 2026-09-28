import { Blocks } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function LexicalApproachWidget() {
	return (
		<TrendWidget
			title="Abordagem Lexical"
			description="Aprenda em blocos (Chunks)"
			icon={Blocks}
			xpReward={20}
			actionText="Descobrir Chunks"
			content={<><p className="font-bold">"By the way", "In my opinion"</p><p className="mt-2 text-xs">Não decore regras, memorize blocos inteiros.</p></>}
		/>
	);
}
