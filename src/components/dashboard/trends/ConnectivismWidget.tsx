import { Network } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * Connectivism methodology widget.
 */
export function ConnectivismWidget() {
	return (
		<TrendWidget
			title="Connectivism"
			description="Aprendizado como uma rede de conexões na era digital."
			icon={<Network className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
