import { ArrowRightLeft } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TranslanguagingWidget() {
	return (
		<TrendWidget
			title="Translanguaging"
			description="Use o português a seu favor"
			icon={ArrowRightLeft}
			xpReward={15}
			actionText="Fazer Ponte"
			content={<><p>"Saudade" = "I miss you" + sentimento forte.</p><p className="mt-2 text-xs">Construa pontes entre seus idiomas.</p></>}
		/>
	);
}
