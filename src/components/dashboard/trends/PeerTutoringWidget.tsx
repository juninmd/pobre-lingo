import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * Peer Tutoring methodology widget.
 */
export function PeerTutoringWidget() {
	return (
		<TrendWidget
			title="Peer Tutoring"
			description="Aprendizagem colaborativa onde alunos ensinam uns aos outros."
			icon={<Users className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
