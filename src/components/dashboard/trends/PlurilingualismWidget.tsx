import { Languages } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function PlurilingualismWidget() {
	return (
		<TrendWidget
			title="Plurilingualism"
			description="Valorize e use todos os seus repertórios linguísticos."
			icon={<Languages className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
