import { TrendWidget } from "./TrendWidget";

export function TranslanguagingWidget() {
	return (
		<TrendWidget
			id="translanguaging"
			title="Translanguaging"
			description="Use o português como ponte para entender o inglês."
			icon="Globe"
			actionText="Comparar Idiomas"
		>
			<div className="grid grid-cols-2 gap-2 text-sm">
				<div className="bg-muted p-2 rounded-md">
					<p className="font-semibold text-primary">PT-BR</p>
					<p>Saudade</p>
				</div>
				<div className="bg-muted p-2 rounded-md">
					<p className="font-semibold text-primary">EN</p>
					<p>I miss you (feeling)</p>
				</div>
			</div>
		</TrendWidget>
	);
}
