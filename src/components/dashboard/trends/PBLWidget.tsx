import { Briefcase } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function PBLWidget() {
	return (
		<TrendWidget
			title="Project-Based Learning"
			description="Desenvolva projetos reais usando o inglês."
			icon={<Briefcase className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
