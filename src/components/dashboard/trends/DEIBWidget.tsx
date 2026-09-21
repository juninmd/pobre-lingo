import { TrendWidget } from "./TrendWidget";

export function DEIBWidget() {
	return (
		<TrendWidget
			id="deib"
			title="DEIB"
			description="Diversidade, Equidade, Inclusão e Pertencimento."
			icon="Users"
			actionText="Explorar Cultura"
		>
			<p className="text-sm text-muted-foreground">
				Aprenda a se comunicar de forma inclusiva e respeitosa em inglês.
			</p>
		</TrendWidget>
	);
}
