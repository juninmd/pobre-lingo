import { TrendWidget } from "./TrendWidget";

export function CLILWidget() {
	return (
		<TrendWidget
			id="clil"
			title="CLIL"
			description="Ensino de Conteúdo e Língua Integrados."
			icon="Brain"
			actionText="Ler Artigo de Ciências"
		>
			<p className="text-sm text-muted-foreground">
				Aprenda inglês enquanto lê sobre descobertas científicas recentes.
			</p>
		</TrendWidget>
	);
}
