import { Globe } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

/**
 * AuthenticMaterialsWidget implements the Materiais Autênticos ELT trend.
 */
export function AuthenticMaterialsWidget() {
	return (
		<TrendWidget
			title="Materiais Autênticos"
			description="Aprenda com podcasts, notícias e vídeos feitos para nativos."
			icon={Globe}
			actionText="Explorar Conteúdo"
			successMessage="Você explorou materiais do mundo real! +5 XP"
		/>
	);
}
