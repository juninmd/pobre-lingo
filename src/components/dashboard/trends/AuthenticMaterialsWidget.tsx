import { Newspaper } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function AuthenticMaterialsWidget() {
	return (
		<TrendWidget
			title="Materiais Autênticos"
			description="Inglês do mundo real"
			icon={Newspaper}
			xpReward={15}
			actionText="Analisar Material"
			content={<><p>Leia notícias, assista vlogs, ouça podcasts.</p><p className="mt-2 text-xs">Inglês sem filtro, feito para nativos.</p></>}
		/>
	);
}
