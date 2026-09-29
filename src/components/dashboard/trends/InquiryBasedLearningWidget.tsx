import { Search } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function InquiryBasedLearningWidget() {
	return (
		<TrendWidget
			title="Ensino Investigativo"
			description="Curiosidade move o inglês"
			icon={Search}
			xpReward={15}
			actionText="Investigar Tópico"
			content={<><p>Por que o 'k' em 'knight' é mudo?</p><p className="mt-2 text-xs">Faça perguntas e descubra a língua.</p></>}
		/>
	);
}
