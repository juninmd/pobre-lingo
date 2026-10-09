import { Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TIPS } from "@/lib/tips";

export function TipOfDayCard() {
	const [tip, setTip] = useState(
		() => TIPS[Math.floor(Date.now() / 86400000) % TIPS.length],
	);
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between gap-2">
				<CardTitle className="text-base flex items-center gap-2">
					<Lightbulb className="h-5 w-5 text-primary" /> Dica do dia
				</CardTitle>
				<Button
					variant="ghost"
					size="icon"
					aria-label="Nova dica"
					onClick={() => setTip(TIPS[Math.floor(Math.random() * TIPS.length)])}
				>
					<RefreshCw className="h-4 w-4" />
				</Button>
			</CardHeader>
			<CardContent>
				<p className="text-sm leading-relaxed">{tip}</p>
			</CardContent>
		</Card>
	);
}
