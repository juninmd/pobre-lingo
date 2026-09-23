import { BookOpen } from "lucide-react";
import { TrendWidget } from "@/components/dashboard/elt-trends/TrendWidget";

export function CLILWidget() {
	return (
		<TrendWidget
			title="CLIL"
			description="Integração de conteúdo e linguagem (ex: Ciências em inglês)."
			icon={BookOpen}
			actionText="Explorar"
		/>
	);
}
