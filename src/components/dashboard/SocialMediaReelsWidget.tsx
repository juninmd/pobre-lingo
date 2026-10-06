import { Smartphone } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function SocialMediaReelsWidget() {
	return (
		<TrendWidget
			title="Nano-learning em Reels"
			description="Pratique com vídeos curtos e autênticos das redes sociais."
			icon={Smartphone}
			actionText="Acessar"
		/>
	);
}
