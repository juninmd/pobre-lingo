import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CALLWidget() {
	return (
		<TrendWidget
			id="call-elt"
			title="CALL"
			description="Computer-Assisted Language Learning: uso de tecnologias digitais e softwares interativos focados na aprendizagem de línguas."
			icon={<Laptop className="h-5 w-5" />}
			xpReward={15}
		/>
	);
}
