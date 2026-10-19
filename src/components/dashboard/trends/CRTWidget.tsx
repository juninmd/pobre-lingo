import { Users } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * CRTWidget
 *
 * Implements the Culturally Responsive Teaching trend using the shared TrendWidget architecture.
 */
export function CRTWidget() {
	return (
		<TrendWidget
			title="Culturally Responsive Teaching"
			description="Pedagogia que reconhece a importância de incluir as referências culturais dos alunos."
			icon={<Users className="h-5 w-5" />}
			xpReward={25}
			actionText="Explorar Metodologia"
			content={
				<div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
					<p>
						No ensino de inglês, CRT ajuda a criar um ambiente mais inclusivo e
						motivador, validando as identidades culturais dos alunos e
						conectando o aprendizado com suas realidades locais.
					</p>
				</div>
			}
		/>
	);
}
