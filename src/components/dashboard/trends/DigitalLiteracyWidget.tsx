import { Laptop } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DigitalLiteracyWidget() {
	return (
		<TrendWidget
			title="Digital & Media Literacy"
			description="Letramento digital e midiático no aprendizado de idiomas."
			icon={<Laptop className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
