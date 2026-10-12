import { BookOpen } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function ImmersiveStorytellingWidget() {
	return (
		<TrendWidget
			title="Immersive Storytelling"
			description="Contação de histórias envolventes e interativas para ensino."
			icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
