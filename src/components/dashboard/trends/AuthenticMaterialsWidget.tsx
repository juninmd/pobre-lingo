import { TrendWidget } from "./TrendWidget";

export function AuthenticMaterialsWidget() {
	return (
		<TrendWidget
			id="authentic-materials"
			title="Materiais Autênticos"
			description="Aprenda com conteúdos criados para nativos."
			icon="BookOpen"
			actionText="Ouvir Podcast"
		>
			<p className="text-sm text-muted-foreground">
				Pratique escutando um trecho de um noticiário ou podcast real.
			</p>
		</TrendWidget>
	);
}
