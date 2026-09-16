import { Mic, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CEFRLevel } from "@/lib/curriculumData";
import { shadowingLines } from "@/lib/fluencyData";
import { tts } from "@/lib/tts";

interface ShadowingPanelProps {
	level: CEFRLevel;
	onPractice: () => void;
}

export function ShadowingPanel({ level, onPractice }: ShadowingPanelProps) {
	const lines = shadowingLines.filter((line) => line.level === level);

	return (
		<Card className="glass-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Mic className="h-5 w-5 text-primary" />
					Frases para shadowing ({level})
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{lines.map((line) => (
					<div
						key={line.id}
						className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-3 py-2"
					>
						<div className="min-w-0">
							<p className="font-medium truncate">{line.en}</p>
							<p className="text-xs text-muted-foreground truncate">{line.pt}</p>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => tts.speak(line.en, "en-US", 0.9)}
						>
							<Play className="h-4 w-4 text-primary" />
						</Button>
					</div>
				))}
				<Button className="w-full gap-2" onClick={onPractice}>
					<Mic className="h-4 w-4" />
					Praticar falando
				</Button>
			</CardContent>
		</Card>
	);
}
