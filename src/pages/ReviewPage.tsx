import {
	ArrowRight,
	Brain,
	CalendarClock,
	CheckCircle2,
	Eye,
	Layers,
	Sparkles,
	Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useGamification } from "@/contexts/GamificationContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSrs } from "@/hooks/useSrs";
import { useStudyTimer } from "@/hooks/useStudyLog";
import { triggerConfetti } from "@/lib/confetti";
import {
	GRADE_AGAIN,
	GRADE_EASY,
	GRADE_GOOD,
	GRADE_HARD,
	previewInterval,
	type ReviewCard,
	type ReviewGrade,
} from "@/lib/srs";
import { cn } from "@/lib/utils";

const GRADE_BUTTONS: {
	grade: ReviewGrade;
	label: string;
	className: string;
}[] = [
	{
		grade: GRADE_AGAIN,
		label: "Errei",
		className:
			"border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800/60 dark:text-red-400 dark:hover:bg-red-950/30",
	},
	{
		grade: GRADE_HARD,
		label: "Difícil",
		className:
			"border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-800/60 dark:text-amber-400 dark:hover:bg-amber-950/30",
	},
	{
		grade: GRADE_GOOD,
		label: "Bom",
		className:
			"border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-800/60 dark:text-blue-400 dark:hover:bg-blue-950/30",
	},
	{
		grade: GRADE_EASY,
		label: "Fácil",
		className:
			"border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800/60 dark:text-emerald-400 dark:hover:bg-emerald-950/30",
	},
];

export default function ReviewPage() {
	useStudyTimer("study");
	const { dueCards, stats, gradeCard, removeCard } = useSrs();
	const { addGem, addXp } = useGamification();
	const { notify } = useNotifications();

	const [revealed, setRevealed] = useState(false);
	const [reviewedIds, setReviewedIds] = useState<string[]>([]);
	const [sessionHits, setSessionHits] = useState(0);

	// A fila é congelada no início da sessão: reagendar um card não pode
	// fazê-lo reaparecer no meio da mesma rodada.
	const [queue] = useState<ReviewCard[]>(() => dueCards);

	const remaining = useMemo(
		() => queue.filter((c) => !reviewedIds.includes(c.id)),
		[queue, reviewedIds],
	);
	const current = remaining[0];
	const done = queue.length > 0 && remaining.length === 0;
	const progressPct =
		queue.length > 0 ? (reviewedIds.length / queue.length) * 100 : 0;

	const handleGrade = (grade: ReviewGrade) => {
		if (!current) return;
		gradeCard(current.id, grade);
		setReviewedIds((prev) => [...prev, current.id]);
		setRevealed(false);

		if (grade >= GRADE_GOOD) {
			setSessionHits((n) => n + 1);
			addXp(5);
			addGem(1);
		}

		// Última carta da fila: fecha a sessão com celebração e registro.
		if (remaining.length === 1) {
			triggerConfetti();
			notify({
				category: "review",
				title: "Revisão concluída 🧠",
				body: `Você revisou ${queue.length} ${queue.length === 1 ? "card" : "cards"}. O intervalo de cada um já foi reajustado.`,
				href: "/review",
			});
		}
	};

	return (
		<PageContainer className="space-y-6 max-w-3xl mx-auto">
			<SEO
				title="Revisão Inteligente"
				description="Revise no momento exato em que você está prestes a esquecer, com repetição espaçada."
			/>

			<PageHeader
				icon={Brain}
				iconClassName="text-amber-500"
				title="Revisão Inteligente"
				description="Repetição espaçada: cada card volta no momento em que você está prestes a esquecê-lo."
			/>

			<section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
				<StatTile
					icon={Brain}
					value={stats.due}
					label="Para hoje"
					tone="text-amber-600 dark:text-amber-400"
				/>
				<StatTile
					icon={Layers}
					value={stats.total}
					label="Total"
					tone="text-blue-600 dark:text-blue-400"
				/>
				<StatTile
					icon={Sparkles}
					value={stats.learning}
					label="Aprendendo"
					tone="text-purple-600 dark:text-purple-400"
				/>
				<StatTile
					icon={CheckCircle2}
					value={stats.mature}
					label="Memorizados"
					tone="text-emerald-600 dark:text-emerald-400"
				/>
			</section>

			{queue.length === 0 && <EmptyState nextDueAt={stats.nextDueAt} />}

			{done && <SessionSummary total={queue.length} hits={sessionHits} />}

			{current && (
				<Card className="glass-card border-2 border-primary/15 shadow-lg overflow-hidden">
					<div className="px-5 pt-4">
						<div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
							<span className="uppercase tracking-wider">
								{reviewedIds.length + 1} de {queue.length}
							</span>
							<button
								type="button"
								onClick={() => {
									removeCard(current.id);
									setReviewedIds((prev) => [...prev, current.id]);
									setRevealed(false);
								}}
								className="flex items-center gap-1 text-muted-foreground/60 hover:text-red-500 transition-colors"
							>
								<Trash2 className="h-3 w-3" />
								Já sei isso
							</button>
						</div>
						<Progress value={progressPct} className="h-1.5" />
					</div>

					<CardContent className="p-5 sm:p-8 space-y-6">
						<div className="text-center space-y-3 min-h-[7rem] flex flex-col justify-center">
							<p className="text-[11px] uppercase tracking-widest font-bold text-primary/70">
								{current.source}
							</p>
							<p className="text-xl sm:text-2xl font-bold leading-snug text-balance">
								{current.front}
							</p>
							{current.hint && !revealed && (
								<p className="text-xs text-muted-foreground italic">
									{current.hint}
								</p>
							)}
						</div>

						{!revealed ? (
							<Button
								size="lg"
								variant="gamified"
								className="w-full font-bold gap-2"
								onClick={() => setRevealed(true)}
							>
								<Eye className="h-4 w-4" />
								Mostrar resposta
							</Button>
						) : (
							<div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
								<div className="rounded-2xl border border-emerald-200/70 dark:border-emerald-800/50 bg-emerald-50/60 dark:bg-emerald-950/20 p-4 text-center">
									<p className="text-[11px] uppercase tracking-widest font-bold text-emerald-700/70 dark:text-emerald-400/70 mb-1">
										Resposta
									</p>
									<p className="text-lg font-bold text-emerald-800 dark:text-emerald-300 text-balance">
										{current.back}
									</p>
								</div>

								<div>
									<p className="text-xs text-center text-muted-foreground mb-3">
										Quão fácil foi lembrar?
									</p>
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
										{GRADE_BUTTONS.map(({ grade, label, className }) => (
											<button
												key={grade}
												type="button"
												onClick={() => handleGrade(grade)}
												className={cn(
													"rounded-xl border-2 bg-background/60 px-2 py-2.5 transition-all active:scale-95 flex flex-col items-center gap-0.5",
													className,
												)}
											>
												<span className="text-sm font-bold">{label}</span>
												<span className="text-[11px] opacity-70 tabular-nums">
													{previewInterval(current, grade)}
												</span>
											</button>
										))}
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			)}
		</PageContainer>
	);
}

function StatTile({
	icon: Icon,
	value,
	label,
	tone,
}: {
	icon: typeof Brain;
	value: number;
	label: string;
	tone: string;
}) {
	return (
		<Card className="glass-card">
			<CardContent className="p-3 sm:p-4 flex flex-col items-center text-center gap-1">
				<Icon className={cn("h-4 w-4", tone)} />
				<span className={cn("text-2xl font-extrabold tabular-nums", tone)}>
					{value}
				</span>
				<span className="text-[11px] sm:text-[11px] uppercase font-bold tracking-widest text-muted-foreground">
					{label}
				</span>
			</CardContent>
		</Card>
	);
}

function EmptyState({ nextDueAt }: { nextDueAt: string | null }) {
	return (
		<Card className="glass-card border-dashed">
			<CardContent className="p-8 text-center space-y-3">
				<div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
					<CheckCircle2 className="h-7 w-7 text-emerald-500" />
				</div>
				<h2 className="text-lg font-bold">Nada para revisar agora</h2>
				<p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
					Os cards entram nesta fila quando você erra um exercício ou salva uma
					palavra. Continue estudando que eles aparecem sozinhos.
				</p>
				{nextDueAt && (
					<p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
						<CalendarClock className="h-3.5 w-3.5" />
						Próxima revisão em{" "}
						{new Date(nextDueAt).toLocaleDateString("pt-BR", {
							day: "2-digit",
							month: "short",
						})}
					</p>
				)}
				<Button asChild variant="gamified" className="mt-2 font-bold gap-2">
					<Link to="/">
						Continuar aprendendo
						<ArrowRight className="h-4 w-4" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

function SessionSummary({ total, hits }: { total: number; hits: number }) {
	const accuracy = total > 0 ? Math.round((hits / total) * 100) : 0;
	return (
		<Card className="glass-card border-2 border-emerald-300/50 dark:border-emerald-800/50 bg-emerald-50/40 dark:bg-emerald-950/20">
			<CardContent className="p-8 text-center space-y-3">
				<div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
					<Sparkles className="h-7 w-7 text-emerald-500" />
				</div>
				<h2 className="text-xl font-extrabold">Sessão concluída!</h2>
				<p className="text-sm text-muted-foreground">
					{total} {total === 1 ? "card revisado" : "cards revisados"} ·{" "}
					{accuracy}% de acerto
				</p>
				<Button asChild variant="gamified" className="mt-2 font-bold gap-2">
					<Link to="/">
						Voltar para a jornada
						<ArrowRight className="h-4 w-4" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
