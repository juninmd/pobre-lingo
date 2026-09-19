import { Ear, Globe2, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function GlobalEnglishesWidget() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [completed, setCompleted] = useState(false);
	const { addXp } = useGamification();

	const handleListen = () => {
		setIsPlaying(true);
		setTimeout(() => {
			setIsPlaying(false);
			if (!completed) {
				setCompleted(true);
				addXp(20);
			}
		}, 2000);
	};

	return (
		<Card className="relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-xl hover:bg-card/40 transition-colors">
			<div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
				<Globe2 className="w-24 h-24" />
			</div>

			<CardContent className="p-6 relative z-10 flex flex-col h-full justify-between">
				<div className="space-y-4">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-2">
							<div className="p-2 bg-primary/20 text-primary rounded-lg">
								<Globe2 className="w-5 h-5" />
							</div>
							<Badge
								variant="secondary"
								className="bg-primary/10 text-primary hover:bg-primary/20"
							>
								TREND 2025
							</Badge>
						</div>
					</div>

					<div>
						<h4 className="font-bold text-lg text-foreground flex items-center gap-2">
							Inglês Global (ELF)
						</h4>
						<p className="text-sm text-muted-foreground mt-1">
							Pratique sua escuta com diferentes sotaques. O inglês é uma língua
							global!
						</p>
					</div>

					<div className="bg-background/50 rounded-xl p-4 border border-border/50">
						<div className="flex items-center justify-between text-sm">
							<span className="font-medium">Hoje: Sotaque Indiano</span>
							<span className="text-muted-foreground flex items-center gap-1">
								<Ear className="w-4 h-4" /> Escuta
							</span>
						</div>
						<p className="text-xs text-muted-foreground mt-2 italic">
							"I would like to schedule a meeting for tomorrow."
						</p>
					</div>
				</div>

				<Button
					className="w-full mt-6 gap-2"
					variant={completed ? "secondary" : "default"}
					onClick={handleListen}
					disabled={isPlaying || completed}
				>
					{isPlaying ? (
						<>
							<PlayCircle className="w-4 h-4 animate-pulse" />
							Ouvindo...
						</>
					) : completed ? (
						"Concluído (+20 XP)"
					) : (
						<>
							<PlayCircle className="w-4 h-4" />
							Ouvir Áudio
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
