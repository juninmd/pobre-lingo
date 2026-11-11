import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { arcadeGames } from "@/components/arcade/arcadeGames";
import { FeaturedWheel } from "@/components/arcade/FeaturedWheel";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { HubGrid } from "@/components/shell/HubGrid";
import { PLAY_DRILLS } from "@/components/shell/hubData";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Aba Jogar: a Roda em destaque, os minigames e os treinos de frase. */
export default function ArcadePage() {
	return (
		<PageContainer className="space-y-10">
			<SEO
				title="Jogar"
				description="Minigames e treinos rápidos de inglês no PobreLingo."
			/>
			<header className="space-y-1">
				<p className="eyebrow">Jogar</p>
				<h1 className="text-4xl font-extrabold sm:text-5xl">Arcade</h1>
				<p className="text-muted-foreground">
					Divirta-se enquanto aprende com minigames rápidos!
				</p>
			</header>

			<FeaturedWheel />

			<section aria-labelledby="arcade-games" className="space-y-3">
				<h2 id="arcade-games" className="text-2xl font-extrabold">
					Minigames
				</h2>
				<ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{arcadeGames.map((game, i) => (
						<li
							key={game.id}
							className="reveal"
							style={{ "--i": i } as CSSProperties}
						>
							<Link
								to={game.href}
								aria-label={`Jogar ${game.title}`}
								className="lift group flex h-full flex-col gap-3 rounded-3xl border bg-card p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							>
								<div className="flex items-start justify-between gap-2">
									<span
										className={cn(
											"grid h-12 w-12 place-items-center rounded-2xl",
											game.bgColor,
										)}
									>
										<game.icon
											className={cn("h-6 w-6", game.color)}
											aria-hidden="true"
										/>
									</span>
									<span className="pixel-num rounded-lg bg-muted px-2 py-1 text-[11px] text-muted-foreground">
										{game.cefr}
									</span>
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold">{game.title}</h3>
									<p className="line-clamp-2 text-sm text-muted-foreground">
										{game.description}
									</p>
								</div>
								<div className="flex items-center justify-between gap-2">
									<Badge variant="secondary" className="font-normal">
										{game.difficulty}
									</Badge>
									<span className="pixel-num text-xs text-amber-700 dark:text-gold">
										+{game.xp}
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<HubGrid
				eyebrow="Treinos"
				title="Exercícios de frase"
				links={PLAY_DRILLS}
			/>
		</PageContainer>
	);
}
