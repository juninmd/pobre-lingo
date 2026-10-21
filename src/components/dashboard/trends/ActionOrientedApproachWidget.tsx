import { Activity } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ActionOrientedApproachWidget() {
	return (
		<TrendWidget
			title="Action-Oriented Approach"
			description="Foca no uso da língua para realizar ações específicas e resolver problemas no mundo real."
			icon={<Activity className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
