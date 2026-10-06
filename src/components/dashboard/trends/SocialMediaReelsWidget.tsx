import { Video } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SocialMediaReelsWidget() {
	return (
		<TrendWidget
			title="Nano-learning Reels"
			description="Aprenda com vídeos curtos no formato de redes sociais."
			icon={<Video className="w-4 h-4" />}
			xpReward={10}
		/>
	);
}
