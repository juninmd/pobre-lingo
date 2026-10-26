import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DigitalLiteracyWidget() {
	return (
		<TrendWidget
			id="digitalliteracywidget"
			title="Digital & Media Literacy"
			description="Desenvolva letramento digital e midiático em língua inglesa."
			icon={<Laptop className="h-5 w-5" />}
			xpReward={20}
		/>
	);
}
