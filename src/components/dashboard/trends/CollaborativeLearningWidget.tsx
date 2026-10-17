import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function CollaborativeLearningWidget() {
	return (
		<TrendWidget
			title="Collaborative Learning"
			description="Trabalho em grupo e aprendizado mútuo entre os estudantes."
			icon={<Users className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
