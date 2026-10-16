import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function InclusivePracticesWidget() {
	return (
		<TrendWidget
			id="inclusivepractices-widget"
			title="Práticas Inclusivas"
			description="Garanta que todos os alunos tenham acesso igualitário ao aprendizado, adaptando materiais e métodos para atender a diversas necessidades e estilos."
			icon={<Users className="h-5 w-5" />}
			xpReward={15}
		/>
	);
}
