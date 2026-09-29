import { MessageSquare } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DogmeELTWidget() {
	return (
		<TrendWidget
			title="Dogme ELT"
			description="Foco na comunicação real"
			icon={MessageSquare}
			xpReward={15}
			actionText="Iniciar Conversa Livre"
			content={<><p>Sem livros didáticos, apenas a língua emergente.</p><p className="mt-2 text-xs">Fale sobre o seu dia e aprenda com os erros.</p></>}
		/>
	);
}
