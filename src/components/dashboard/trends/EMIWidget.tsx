import { BookOpen } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function EMIWidget() {
	return (
		<TrendWidget
			title="EMI (English Medium Instruction)"
			description="Ensino de disciplinas acadêmicas usando a língua inglesa."
			icon={<BookOpen className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
