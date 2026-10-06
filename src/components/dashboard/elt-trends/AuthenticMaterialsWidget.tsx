import { FileText } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function AuthenticMaterialsWidget() {
	return (
		<TrendWidget
			title="Materiais Autênticos"
			description="Aprenda com textos, menus e anúncios reais."
			icon={FileText}
			actionText="Explorar"
		/>
	);
}
