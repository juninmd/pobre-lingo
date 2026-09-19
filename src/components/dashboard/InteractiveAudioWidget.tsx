import { CheckCircle2, Headphones, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

export function InteractiveAudioWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(
			localStorage.getItem("daily_interactive_audio_claimed") === todayStr,
		);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const togglePlay = () => {
		if (isPlaying) {
			setIsPlaying(false);
			if (intervalRef.current) clearInterval(intervalRef.current);
		} else {
			setIsPlaying(true);
			intervalRef.current = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						clearInterval(intervalRef.current!);
						setIsPlaying(false);
						return 100;
					}
					return prev + 5; // Simulate progress
				});
			}, 500);
		}
	};

	const claimReward = () => {
		if (!claimed && progress === 100) {
			addXp(15);
			setClaimed(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_interactive_audio_claimed", todayStr);
		}
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-brand-aqua/10 to-brand-aqua/10 dark:from-brand-aqua/30 dark:to-brand-aqua/30 border-brand-aqua/20 dark:border-brand-aqua/50 shadow-lg hover:shadow-brand-aqua/10 relative overflow-hidden"
			style={{ animationDelay: "0.2s" }}
		>
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-brand-aqua/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-brand-aqua">
					<Headphones className="w-4 h-4" />
					Immersive Audio
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-brand-aqua/70 bg-brand-aqua/10 px-2 py-0.5 rounded-full">
					Trend 2025
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-brand-aqua text-base">
							Podcast Snippet
						</h4>
						<span className="text-xs font-semibold text-brand-aqua/70">
							0:10
						</span>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-4 rounded-lg border border-brand-aqua/15 dark:border-brand-aqua/50 flex items-center justify-center gap-4 relative shadow-inner mb-3">
						<Button
							variant="outline"
							size="icon"
							className="rounded-full h-10 w-10 border-brand-aqua/20 text-brand-aqua hover:bg-brand-aqua/15 dark:border-brand-aqua/70 dark:hover:bg-brand-aqua/50 flex-shrink-0"
							onClick={togglePlay}
						>
							{isPlaying ? (
								<Pause className="w-5 h-5 fill-current" />
							) : (
								<Play className="w-5 h-5 fill-current ml-0.5" />
							)}
						</Button>

						<div className="flex-1 space-y-2">
							{/* Simulated waveform */}
							<div className="flex items-end gap-0.5 h-6 opacity-60">
								{[...Array(20)].map((_, i) => (
									<div
										key={i}
										className={`w-full bg-brand-aqua rounded-t-sm transition-all duration-300 ${
											i < (progress / 100) * 20 ? "opacity-100" : "opacity-30"
										} ${isPlaying ? "animate-pulse" : ""}`}
										style={{
											height: `${Math.random() * 60 + 20}%`,
											animationDelay: `${i * 0.05}s`,
										}}
									/>
								))}
							</div>
							<div className="h-1 bg-brand-aqua/15 dark:bg-brand-aqua/50 rounded-full overflow-hidden">
								<div
									className="h-full bg-brand-aqua rounded-full transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
					</div>

					<Button
						variant={claimed ? "secondary" : "gamified"}
						size="sm"
						className="w-full font-bold shadow-sm"
						disabled={claimed || progress < 100}
						onClick={claimReward}
					>
						{claimed ? (
							<span className="flex items-center gap-1.5 text-brand-aqua">
								<CheckCircle2 className="w-4 h-4" />
								Concluído!
							</span>
						) : progress < 100 ? (
							<span className="flex items-center gap-1.5">
								Ouça para ganhar (+15 XP)
							</span>
						) : (
							<span className="flex items-center gap-1.5 animate-pulse">
								Resgatar (+15 XP)
							</span>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
