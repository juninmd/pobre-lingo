import confetti from "canvas-confetti";
import { ArrowRight, Flame, Star, Trophy } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

interface LessonCompleteModalProps {
	isOpen: boolean;
	xpEarned: number;
	onContinue: () => void;
}

export function LessonCompleteModal({
	isOpen,
	xpEarned,
	onContinue,
}: LessonCompleteModalProps) {
	const { streak } = useGamification();

	useEffect(() => {
		if (isOpen) {
			// Trigger confetti
			const duration = 3000;
			const end = Date.now() + duration;

			const frame = () => {
				confetti({
					particleCount: 2,
					angle: 60,
					spread: 55,
					origin: { x: 0 },
					colors: ["#22c55e", "#eab308", "#3b82f6"],
				});
				confetti({
					particleCount: 2,
					angle: 120,
					spread: 55,
					origin: { x: 1 },
					colors: ["#22c55e", "#eab308", "#3b82f6"],
				});

				if (Date.now() < end) {
					requestAnimationFrame(frame);
				}
			};
			frame();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
			<Card className="w-full max-w-md mx-4 p-8 bg-background border-4 border-brand-gold shadow-[0_0_50px_hsl(var(--brand-gold)/0.3)] relative overflow-hidden">
				{/* Decorative background glow */}
				<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none" />

				<div className="relative z-10 flex flex-col items-center text-center space-y-8">
					<div className="relative">
						<div className="absolute -inset-4 bg-brand-gold/20 blur-xl rounded-full animate-pulse" />
						<Trophy className="w-24 h-24 text-brand-gold animate-bounce" />
					</div>

					<div className="space-y-2">
						<h2 className="text-3xl font-extrabold text-foreground tracking-tight">
							Lição Dominada!
						</h2>
						<p className="text-muted-foreground font-medium">
							Você está ficando cada vez melhor.
						</p>
					</div>

					<div className="grid grid-cols-2 gap-4 w-full">
						<div className="bg-secondary/50 p-4 rounded-xl border-2 border-transparent hover:border-brand-gold/50 transition-colors">
							<div className="flex flex-col items-center gap-1">
								<span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
									XP Ganho
								</span>
								<div className="flex items-center gap-2 text-2xl font-black text-brand-gold">
									<Star className="w-6 h-6 fill-brand-gold" />
									<span>+{xpEarned}</span>
								</div>
							</div>
						</div>

						<div className="bg-secondary/50 p-4 rounded-xl border-2 border-transparent hover:border-brand-gold/50 transition-colors">
							<div className="flex flex-col items-center gap-1">
								<span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
									Ofensiva
								</span>
								<div className="flex items-center gap-2 text-2xl font-black text-brand-gold">
									<Flame className="w-6 h-6 fill-brand-gold animate-pulse" />
									<span>{streak} dias</span>
								</div>
							</div>
						</div>
					</div>

					<Button
						onClick={onContinue}
						size="lg"
						className="w-full text-lg font-bold h-14 bg-brand-aqua hover:bg-brand-aqua/90 text-white shadow-[0_4px_0_hsl(var(--brand-aqua))] active:shadow-none active:translate-y-1 transition-all"
					>
						CONTINUAR
						<ArrowRight className="ml-2 w-6 h-6" />
					</Button>
				</div>
			</Card>
		</div>
	);
}
