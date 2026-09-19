import { ArrowRight, Brain, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSrs } from "@/hooks/useSrs";

/**
 * Porta de entrada para a revisão espaçada. Some do painel quando não há
 * nada agendado — widget vazio é ruído.
 */
export function SmartReviewWidget() {
	const { dueCards, stats } = useSrs();

	if (stats.total === 0) return null;

	const hasDue = dueCards.length > 0;

	return (
		<Card className="glass-card w-full border border-brand-gold/20 dark:border-brand-gold/40 bg-brand-gold/10 dark:bg-brand-gold/15 shadow-sm backdrop-blur-md">
			<CardHeader className="pb-3">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-brand-gold">
					<Brain className="w-4 h-4" />
					Revisão Inteligente
					{hasDue && (
						<span className="ml-auto text-[10px] uppercase tracking-widest font-bold text-brand-gold/80 bg-brand-gold/15 px-2 py-0.5 rounded-full tabular-nums">
							{dueCards.length}
						</span>
					)}
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-3">
				{hasDue ? (
					<>
						<p className="text-xs text-muted-foreground leading-relaxed">
							{dueCards.length}{" "}
							{dueCards.length === 1
								? "card está no ponto certo de revisão"
								: "cards estão no ponto certo de revisão"}
							. Revisar agora é o que transforma acerto em memória.
						</p>

						<ul className="space-y-1.5">
							{dueCards.slice(0, 3).map((card) => (
								<li
									key={card.id}
									className="text-xs rounded-lg bg-white/50 dark:bg-black/20 border border-white/40 dark:border-white/10 px-2.5 py-1.5 truncate text-foreground/80"
								>
									{card.front}
								</li>
							))}
						</ul>

						<Button
							asChild
							variant="gamified"
							size="sm"
							className="w-full font-bold gap-1.5"
						>
							<Link to="/review">
								Revisar agora
								<ArrowRight className="w-3.5 h-3.5" />
							</Link>
						</Button>
					</>
				) : (
					<div className="space-y-2">
						<p className="text-xs text-muted-foreground leading-relaxed">
							Nenhuma revisão vencida. Seus {stats.total} cards estão em dia.
						</p>
						{stats.nextDueAt && (
							<p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
								<CalendarClock className="w-3 h-3" />
								Próxima em{" "}
								{new Date(stats.nextDueAt).toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "short",
								})}
							</p>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
