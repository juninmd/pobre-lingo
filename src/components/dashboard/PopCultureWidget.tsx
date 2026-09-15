import { CheckCircle2, Clapperboard, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const POP_CULTURE_ITEMS = [
	{
		title: "Movie Quote",
		quote: "May the Force be with you.",
		source: "Star Wars",
		explanation:
			"Usado para desejar sorte ou forças a alguém antes de um desafio.",
		xp: 10,
	},
	{
		title: "Internet Slang",
		quote: "That's cap.",
		source: "TikTok / Gen Z",
		explanation:
			'"Cap" significa mentira. "That\'s cap" quer dizer "Isso é mentira".',
		xp: 10,
	},
	{
		title: "Song Lyric",
		quote: "Don't stop believin', hold on to that feeling.",
		source: "Journey",
		explanation:
			"Uma mensagem de esperança: nunca pare de acreditar e agarre-se a esse sentimento.",
		xp: 10,
	},
	{
		title: "Movie Quote",
		quote:
			"Life is like a box of chocolates. You never know what you're gonna get.",
		source: "Forrest Gump",
		explanation:
			"A vida é cheia de surpresas, assim como não sabemos qual sabor vamos pegar numa caixa de bombons.",
		xp: 10,
	},
	{
		title: "Internet Slang",
		quote: "Living rent-free in my head.",
		source: "TikTok / Social Media",
		explanation:
			"Quando você não consegue parar de pensar em algo ou alguém, dizemos que está 'morando de graça na sua cabeça'.",
		xp: 10,
	},
	{
		title: "Internet Slang",
		quote: "Being delulu is the solulu.",
		source: "Gen Z / TikTok",
		explanation:
			"Brincadeira com 'delusional' (iludido) e 'solution' (solução). Significa manter o otimismo mesmo quando as coisas parecem impossíveis.",
		xp: 10,
	},
	{
		title: "Pop Culture Trend",
		quote: "How often do you think about the Roman Empire?",
		source: "TikTok Trend",
		explanation:
			"Uma trend viral de 2023/2024 onde mulheres descobriram que os homens pensam no Império Romano com uma frequência surpreendente.",
		xp: 10,
	},
];

export function PopCultureWidget() {
	const { addXp } = useGamification();
	const [item, setItem] = useState(POP_CULTURE_ITEMS[0]);
	const [claimed, setClaimed] = useState(false);
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setItem(POP_CULTURE_ITEMS[dayOfYear % POP_CULTURE_ITEMS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_pop_culture_claimed") === todayStr);
	}, []);

	const claimReward = () => {
		if (!claimed) {
			addXp(item.xp);
			setClaimed(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_pop_culture_claimed", todayStr);
		}
	};

	return (
		<Card
			className="glass-card hover:animate-float group bg-gradient-to-br from-violet-50/70 to-fuchsia-50/70 dark:from-violet-950/30 dark:to-fuchsia-950/30 border-violet-200/50 dark:border-violet-800/50 shadow-lg hover:shadow-violet-500/10 relative overflow-hidden group"
			style={{ animationDelay: "0.2s" }}
		>
			<div className="absolute -left-4 -bottom-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-violet-700 dark:text-violet-400">
					<Clapperboard className="w-4 h-4" />
					Inglês na Cultura Pop
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-violet-500/70 bg-violet-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
					<Sparkles className="w-3 h-3" />
					Trend
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="flex justify-between items-center mb-1">
						<h4 className="font-bold text-violet-900 dark:text-violet-300 text-base">
							{item.title}
						</h4>
						<span className="text-xs font-semibold text-violet-600/70 dark:text-violet-400/70">
							{item.source}
						</span>
					</div>

					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-violet-100 dark:border-violet-900/50 text-center relative shadow-inner mb-3">
						<p className="text-lg font-black text-violet-900 dark:text-violet-300 tracking-tight italic">
							"{item.quote}"
						</p>
					</div>

					{!revealed ? (
						<Button
							variant="outline"
							className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-900/30 font-medium"
							onClick={() => setRevealed(true)}
						>
							<Play className="w-4 h-4 mr-2" />
							Descobrir Significado
						</Button>
					) : (
						<div className="bg-violet-100/50 dark:bg-violet-900/30 p-3 rounded-lg border border-violet-200 dark:border-violet-800 animate-in fade-in slide-in-from-top-2 duration-300">
							<p className="text-sm font-medium text-violet-800 dark:text-violet-300 mb-3">
								{item.explanation}
							</p>

							<Button
								variant={claimed ? "secondary" : "gamified"}
								size="sm"
								className="w-full font-bold shadow-sm"
								disabled={claimed}
								onClick={claimReward}
							>
								{claimed ? (
									<span className="flex items-center gap-1.5 text-violet-700 dark:text-violet-400">
										<CheckCircle2 className="w-4 h-4" />
										Aprendido!
									</span>
								) : (
									<span className="flex items-center gap-1.5">
										Entendi! (+{item.xp} XP)
									</span>
								)}
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
