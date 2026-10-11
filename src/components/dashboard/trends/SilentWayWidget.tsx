import { Lightbulb } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SilentWayWidget() {
	return (
		<TrendWidget
			title="The Silent Way"
			description="Descoberta autônoma guiada com mínima intervenção direta."
			icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
