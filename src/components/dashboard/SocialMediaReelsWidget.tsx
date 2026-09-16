import {
	CheckCircle2,
	Heart,
	Loader2,
	MessageCircle,
	Play,
	Share2,
	Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function SocialMediaReelsWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_reels_claimed") === todayStr);
	}, []);

	const handleWatch = () => {
		if (claimed) return;
		setIsPlaying(true);

		// Simulate watching a short reel (e.g., 3 seconds)
		setTimeout(() => {
			setIsPlaying(false);
			setClaimed(true);
			addXp(15);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_reels_claimed", todayStr);
		}, 3000);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-destructive/10 to-destructive/10 dark:from-destructive/30 dark:to-destructive/30 border-destructive/20 dark:border-destructive/50 shadow-lg hover:shadow-destructive/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-destructive/15 text-destructive dark:bg-destructive/60 border-none font-bold"
					>
						<Smartphone className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-destructive">
						<span>Nano-Learning em Vídeo</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Aprenda inglês com conteúdos reais e rápidos do dia a dia.
				</div>

				<div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group-hover:shadow-xl transition-all max-h-[200px] mx-auto flex items-center justify-center">
					{/* Fake video thumbnail background */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
					<img
						src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=400&q=80"
						alt="Video thumbnail"
						className="absolute inset-0 w-full h-full object-cover opacity-70"
					/>

					{/* Play Button */}
					{!isPlaying && (
						<div
							className="z-20 p-3 bg-white/20 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/40 transition-colors"
							onClick={handleWatch}
						>
							<Play className="w-8 h-8 text-white fill-white" />
						</div>
					)}
					{isPlaying && (
						<div className="z-20 p-3 bg-white/20 backdrop-blur-md rounded-full">
							<Loader2 className="w-8 h-8 text-white animate-spin" />
						</div>
					)}

					{/* Fake UI Overlay */}
					<div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
						<div className="text-white text-xs">
							<p className="font-bold">@englishteacher</p>
							<p className="opacity-90">3 formas de dizer "De nada"</p>
						</div>
						<div className="flex flex-col gap-2">
							<Heart className="w-5 h-5 text-white" />
							<MessageCircle className="w-5 h-5 text-white" />
							<Share2 className="w-5 h-5 text-white" />
						</div>
					</div>
				</div>

				<Button
					variant={claimed ? "secondary" : "gamified"}
					className={`w-full ${!claimed ? "bg-destructive/90 hover:bg-destructive/80 text-white" : ""}`}
					onClick={handleWatch}
					disabled={claimed || isPlaying}
				>
					{isPlaying ? (
						<span className="flex items-center gap-1.5">Assistindo...</span>
					) : claimed ? (
						<span className="flex items-center gap-1.5 text-destructive">
							<CheckCircle2 className="w-4 h-4" />
							Visualizado!
						</span>
					) : (
						<span>Assistir & Ganhar 15 XP</span>
					)}
				</Button>
			</CardContent>
		</Card>
	);
}
