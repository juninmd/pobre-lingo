import { Leaf } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function GreenELTWidget() {
	return (
		<TrendWidget
			title="Green ELT"
			description="Sustentabilidade em inglês"
			icon={Leaf}
			xpReward={10}
			actionText="Ler Artigo Eco"
			content={<><p>Vocabulário de clima, reciclagem e natureza.</p><p className="mt-2 text-xs">Aprenda a debater sobre o nosso planeta.</p></>}
		/>
	);
}
