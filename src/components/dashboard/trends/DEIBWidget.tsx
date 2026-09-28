import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DEIBWidget() {
	return (
		<TrendWidget
			title="DEIB"
			description="Diversidade e Inclusão"
			icon={Users}
			xpReward={10}
			actionText="Refletir"
			content={<><p>Linguagem neutra, pronomes (they/them).</p><p className="mt-2 text-xs">Um inglês que acolhe todas as identidades.</p></>}
		/>
	);
}
