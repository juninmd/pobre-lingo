import {
	AlertCircle,
	Brain,
	GraduationCap,
	Grid,
	Headphones,
	Search,
	Trophy,
	Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const games = [
	{
		id: "hangman",
		title: "Forca",
		description:
			"O clássico jogo da forca. Adivinhe a palavra antes de perder todas as vidas!",
		icon: AlertCircle,
		color: "text-rose-500",
		bgColor: "bg-rose-500/10",
		href: "/games/hangman",
		difficulty: "Médio",
		cefr: "B1/B2",
		xp: "20 XP / Win",
	},
	{
		id: "memory-match",
		title: "Jogo da Memória",
		description: "Encontre os pares de palavras entre inglês e português.",
		icon: Grid,
		color: "text-indigo-500",
		bgColor: "bg-indigo-500/10",
		href: "/games/memory-match",
		difficulty: "Fácil",
		cefr: "A1/A2",
		xp: "150 XP",
	},
	{
		id: "word-search",
		title: "Caça Palavras",
		description:
			"Encontre as palavras escondidas na grade antes do tempo acabar!",
		icon: Search,
		color: "text-pink-500",
		bgColor: "bg-pink-500/10",
		href: "/games/word-search",
		difficulty: "Médio",
		cefr: "B1/B2",
		xp: "100 XP",
	},
	{
		id: "flashcards",
		title: "Flashcards",
		description:
			"Memorize vocabulário com cartões interativos. Ótimo para revisão!",
		icon: GraduationCap,
		color: "text-green-500",
		bgColor: "bg-green-500/10",
		href: "/games/flashcards",
		difficulty: "Fácil",
		cefr: "A1/A2",
		xp: "10 XP / Card",
	},
	{
		id: "speed-match",
		title: "Match Madness",
		description:
			"Desafio frenético! Combine pares, acumule combos e sobreviva ao tempo.",
		icon: Zap,
		color: "text-orange-500",
		bgColor: "bg-orange-500/10",
		href: "/games/speed-match",
		difficulty: "Difícil",
		cefr: "C1/C2",
		xp: "Max 1000 XP",
	},
	{
		id: "word-scramble",
		title: "Word Scramble",
		description: "Desembaralhe as letras para encontrar a palavra correta.",
		icon: Brain,
		color: "text-purple-500",
		bgColor: "bg-purple-500/10",
		href: "/games/word-scramble",
		difficulty: "Médio",
		cefr: "B1/B2",
		xp: "75 XP",
	},
	{
		id: "sentence-rush",
		title: "Sentence Rush",
		description:
			"Monte frases contra o tempo! Quanto mais rápido, mais pontos.",
		icon: Zap,
		color: "text-red-500",
		bgColor: "bg-red-500/10",
		href: "/games/sentence-rush",
		difficulty: "Difícil",
		cefr: "C1/C2",
		xp: "Max 500 XP",
	},
	{
		id: "listening-challenge",
		title: "Desafio de Escuta",
		description:
			"Treine seus ouvidos com frases faladas por nativos (ou robôs).",
		icon: Headphones,
		color: "text-blue-500",
		bgColor: "bg-blue-500/10",
		href: "/exercises/listening",
		difficulty: "Difícil",
		cefr: "B1/B2",
		xp: "100 XP",
	},
];

export default function ArcadePage() {
	return (
		<PageContainer>
			<div className="flex flex-col space-y-4 sm:space-y-6">
				<div className="flex items-center justify-between gap-3">
					<div className="min-w-0">
						<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
							Arcade
						</h1>
						<p className="text-muted-foreground text-sm sm:text-base mt-1">
							Divirta-se enquanto aprende com minigames rápidos!
						</p>
					</div>
					<Trophy className="h-9 w-9 sm:h-10 sm:w-10 text-yellow-500 animate-pulse flex-shrink-0" />
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{games.map((game) => (
						<Card
							key={game.id}
							className="glass-card hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 active:scale-[0.98] cursor-pointer group relative overflow-hidden touch-manipulation"
						>
							<div
								className={`absolute top-0 right-0 p-2.5 sm:p-3 rounded-bl-xl ${game.bgColor}`}
							>
								<game.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${game.color}`} />
							</div>
							<CardHeader className="pb-3 sm:pb-6">
								<CardTitle className="flex items-center gap-2 text-lg sm:text-xl pr-12">
									{game.title}
								</CardTitle>
								<CardDescription className="line-clamp-2 text-sm min-h-[40px] sm:min-h-[48px]">
									{game.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
									<div className="flex items-center gap-1.5">
										<Badge variant="secondary" className="font-normal text-xs">
											{game.difficulty}
										</Badge>
										<Badge className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-black">
											{game.cefr}
										</Badge>
									</div>
									<Badge
										variant="outline"
										className="text-yellow-600 dark:text-yellow-500 border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950/30 text-xs font-semibold"
									>
										+{game.xp}
									</Badge>
								</div>
								<Button
									asChild
									className="w-full group-hover:scale-[1.02] active:scale-95 transition-transform touch-target"
									size="lg"
								>
									<Link to={game.href}>Jogar Agora</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</PageContainer>
	);
}
