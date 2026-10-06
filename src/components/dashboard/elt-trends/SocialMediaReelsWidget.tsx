import { Video } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function SocialMediaReelsWidget() {
	return (
		<TrendWidget
			title="Reels & Nano-learning"
			description="Aprenda com vídeos curtos e rápidos (nano-learning)."
			icon={Video}
			actionText="Explorar"
		/>
	);
}
