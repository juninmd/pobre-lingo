import { Layers } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function MultimodalLearningWidget() {
	return (
		<TrendWidget
			title="Multimodal Learning"
			description="Combine texto, áudio, vídeo e interações cinestésicas para um aprendizado mais rico e profundo."
			icon={<Layers className="w-5 h-5" />}
			xpReward={15}
		/>
	);
}
