import { Mic } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function PodcastingWidget() {
	return (
		<TrendWidget
			title="Podcasting & Audio Learning"
			description="Uso de podcasts para melhorar a escuta, pronúncia e oferecer imersão cultural no idioma."
			icon={<Mic className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
