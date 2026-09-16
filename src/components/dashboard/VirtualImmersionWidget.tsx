import { Box, CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function VirtualImmersionWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_vr_immersion_claimed") === todayStr);
	}, []);

	const handleStart = () => {
		if (claimed) return;
		setIsPlaying(true);
		setTimeout(() => {
			setIsPlaying(false);
			setClaimed(true);
			addXp(20);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_vr_immersion_claimed", todayStr);
		}, 2000); // Simulate VR experience loading/playing
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-brand-violet/10 to-destructive/10 dark:from-brand-violet/30 dark:to-destructive/30 border-brand-violet/20 dark:border-brand-violet/50 shadow-lg hover:shadow-brand-violet/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-brand-violet/15 text-brand-violet dark:bg-brand-violet/60 border-none font-bold"
					>
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-brand-violet">
						<Box className="w-5 h-5" />
						<span>Imersão 360° / VR</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Pratique inglês explorando um ambiente virtual interativo.
				</div>

				<div className="p-3 bg-white/60 dark:bg-black/30 rounded-lg border border-brand-violet/15 dark:border-brand-violet/60 relative overflow-hidden flex items-center justify-center min-h-[80px]">
					{isPlaying ? (
						<div className="flex flex-col items-center animate-pulse">
							<Box className="w-8 h-8 text-brand-violet mb-2 animate-bounce" />
							<p className="font-semibold text-sm text-brand-violet">
								Carregando Cenário VR...
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center">
							<p className="font-semibold text-sm mb-1 text-center">
								Cenário: Times Square
							</p>
							<p className="text-xs text-muted-foreground text-center">
								Encontre a estação de metrô
							</p>
						</div>
					)}
				</div>

				<Button
					className="w-full gap-2 bg-brand-violet/90 hover:bg-brand-violet/80 text-white"
					variant={claimed ? "secondary" : "default"}
					onClick={handleStart}
					disabled={claimed || isPlaying}
				>
					{isPlaying ? (
						<span className="flex items-center gap-1.5 animate-pulse">
							Explorando...
						</span>
					) : claimed ? (
						<span className="flex items-center gap-1.5 text-brand-violet">
							<CheckCircle2 className="w-4 h-4" />
							Exploração Concluída!
						</span>
					) : (
						<>
							<PlayCircle className="w-4 h-4" /> Iniciar Experiência 360°
						</>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
