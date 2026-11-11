import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { arcadeGames } from "@/components/arcade/arcadeGames";
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
					{arcadeGames.map((game) => (
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
								<CardDescription className="line-clamp-2 text-sm min-h-10">
									{game.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
									<div className="flex items-center gap-1.5">
										<Badge variant="secondary" className="font-normal text-xs">
											{game.difficulty}
										</Badge>
										<Badge className="bg-primary/10 text-primary border border-primary/20 text-[11px] font-black">
											{game.cefr}
										</Badge>
									</div>
									<Badge
										variant="outline"
										className="text-yellow-800 dark:text-yellow-500 border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-950/30 text-xs font-semibold"
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
