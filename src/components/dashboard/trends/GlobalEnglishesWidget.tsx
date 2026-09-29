import { TrendWidget } from "./TrendWidget";

export function GlobalEnglishesWidget() {
	return (
		<TrendWidget
			id="global-englishes"
			title="Global Englishes"
			description="O inglês como língua franca. Sotaques e variações."
			icon="Globe"
			actionText="Ouvir Sotaques"
		>
			<p className="text-sm text-muted-foreground">
				Aprenda a entender falantes de diferentes partes do mundo, não apenas de países nativos.
			</p>
		</TrendWidget>
	);
}
