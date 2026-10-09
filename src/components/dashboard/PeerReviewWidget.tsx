import {
	CheckCircle2,
	MessageSquare,
	Mic,
	Star,
	ThumbsUp,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

export function PeerReviewWidget() {
	const { addXp } = useGamification();
	const [claimed, setClaimed] = useState(false);
	const [isReviewing, setIsReviewing] = useState(false);
	const [step, setStep] = useState(0); // 0: initial, 1: listening, 2: reviewing, 3: done

	useEffect(() => {
		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_peer_review_claimed") === todayStr);
		if (localStorage.getItem("daily_peer_review_claimed") === todayStr) {
			setStep(3);
		}
	}, []);

	const startReview = () => {
		if (claimed) return;
		setStep(1);

		// Simulate listening to peer audio
		setTimeout(() => {
			setStep(2);
		}, 3000);
	};

	const submitReview = () => {
		setIsReviewing(true);

		setTimeout(() => {
			setIsReviewing(false);
			setStep(3);
			setClaimed(true);
			addXp(25);
			const todayStr = localDay();
			localStorage.setItem("daily_peer_review_claimed", todayStr);
		}, 1500);
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-fuchsia-50/70 to-purple-50/70 dark:from-fuchsia-950/30 dark:to-purple-950/30 border-fuchsia-200/50 dark:border-fuchsia-800/50 shadow-lg hover:shadow-fuchsia-500/10 relative overflow-hidden"
			style={{ animationDelay: "0.2s" }}
		>
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-fuchsia-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300 border-none font-bold"
					>
						<Users className="w-3 h-3 mr-1 inline" /> TREND 2025
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-400">
						<Star className="w-5 h-5" />
						<span>Peer-to-Peer Feedback</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div className="text-sm font-medium text-muted-foreground">
					Ajude um colega da comunidade avaliando sua pronúncia!
				</div>

				<div className="p-3 bg-white/60 dark:bg-black/30 rounded-lg border border-fuchsia-100 dark:border-fuchsia-900/50">
					{step === 0 && (
						<div className="text-center py-2">
							<div className="bg-fuchsia-100 dark:bg-fuchsia-900/50 p-3 rounded-full inline-block mb-2">
								<Mic className="w-6 h-6 text-fuchsia-600 dark:text-fuchsia-400" />
							</div>
							<p className="text-sm font-semibold text-fuchsia-900 dark:text-fuchsia-300">
								Áudio de @maria_silva aguardando avaliação
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								Frase: "I would like to order a coffee"
							</p>
						</div>
					)}

					{step === 1 && (
						<div className="text-center py-2 animate-in fade-in">
							<div className="flex items-center justify-center gap-1 h-8 mb-2">
								{[...Array(5)].map((_, i) => (
									<div
										key={i}
										className="w-1.5 bg-fuchsia-500 rounded-full animate-bounce"
										style={{
											height: `${(Math.sin(i) + 1) * 50 + 20}%`,
											animationDelay: `${i * 0.1}s`,
										}}
									/>
								))}
							</div>
							<p className="text-sm font-medium text-fuchsia-700 dark:text-fuchsia-400">
								Ouvindo áudio...
							</p>
						</div>
					)}

					{step === 2 && (
						<div className="space-y-3 animate-in slide-in-from-right-4 duration-300">
							<p className="text-sm font-bold text-center text-fuchsia-800 dark:text-fuchsia-300">
								Como foi a pronúncia?
							</p>
							<div className="flex justify-center gap-2">
								{["Excelente!", "Muito boa", "Precisa melhorar"].map(
									(fb, i) => (
										<Button
											key={i}
											variant="outline"
											size="sm"
											className="text-xs border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-100 dark:border-fuchsia-800 dark:text-fuchsia-400 dark:hover:bg-fuchsia-900/50 flex-1"
											onClick={submitReview}
											disabled={isReviewing}
										>
											{fb}
										</Button>
									),
								)}
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="text-center py-2 animate-in zoom-in duration-300">
							<div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full inline-block mb-2">
								<ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
							</div>
							<p className="text-sm font-bold text-green-700 dark:text-green-400">
								Feedback enviado com sucesso!
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								A comunidade agradece sua ajuda.
							</p>
						</div>
					)}
				</div>

				{step === 0 && (
					<Button
						variant="gamified"
						className="w-full font-bold shadow-sm"
						onClick={startReview}
					>
						<span className="flex items-center gap-2">
							<MessageSquare className="w-4 h-4" /> Avaliar Áudio (+25 XP)
						</span>
					</Button>
				)}

				{step === 3 && (
					<Button
						variant="secondary"
						className="w-full font-bold shadow-sm"
						disabled
					>
						<span className="flex items-center gap-1.5 text-fuchsia-700 dark:text-fuchsia-400">
							<CheckCircle2 className="w-4 h-4" />
							Missão Concluída
						</span>
					</Button>
				)}
			</CardContent>
		</Card>
	);
}
