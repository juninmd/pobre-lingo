import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function HyFlexLearningWidget() {
	return (
		<TrendWidget
			title="Ensino Híbrido Flexível"
			description="Estude onde e como quiser"
			icon={Laptop}
			xpReward={10}
			actionText="Acessar Turma"
			content={<><p>Combine aulas síncronas e atividades assíncronas.</p><p className="mt-2 text-xs">Você decide seu ritmo de estudo diário.</p></>}
		/>
	);
}
