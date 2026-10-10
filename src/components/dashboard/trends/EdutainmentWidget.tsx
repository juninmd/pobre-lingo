import { Gamepad2 } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function EdutainmentWidget() {
	return (
		<TrendWidget
			id="edutainment-elt"
			title="Edutainment"
			description="Aprenda inglês combinando educação e entretenimento (como filmes, jogos e cultura pop) de forma fluida e divertida."
			icon={<Gamepad2 className="h-5 w-5" />}
			xpReward={15}
		/>
	);
}
