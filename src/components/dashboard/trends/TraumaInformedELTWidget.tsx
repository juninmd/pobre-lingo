import { HeartHandshake } from "lucide-react";
import { TrendWidget } from "./TrendWidget";

export function TraumaInformedELTWidget() {
	return (
		<TrendWidget
			title="Trauma-Informed ELT"
			description="Práticas sensíveis e acolhedoras para um ambiente de aprendizado seguro e empático."
			icon={<HeartHandshake className="h-5 w-5" aria-hidden="true" />}
		/>
	);
}
