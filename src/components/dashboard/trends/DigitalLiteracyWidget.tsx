import { MonitorPlay } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function DigitalLiteracyWidget() {
	return (
		<TrendWidget
			title="Digital & Media Literacy"
			description="Desenvolvimento do letramento digital e midiático junto ao aprendizado do idioma."
			icon={<MonitorPlay className="h-5 w-5 text-primary" />}
			xpReward={25}
			actionText="Explorar"
		>
			<div className="space-y-4">
				<p>
					No ensino de inglês moderno (2025+), Digital & Media Literacy é uma
					tendência crescente que integra as necessidades contemporâneas ao
					ensino de idiomas.
				</p>
			</div>
		</TrendWidget>
	);
}
