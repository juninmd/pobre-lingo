import { ArrowRight, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useKnownWords } from "@/hooks/useKnownWords";
import { useStudyLog } from "@/hooks/useStudyLog";
import { buildJourney } from "@/lib/fluencyJourney";
import { loadProficiencyResult } from "@/lib/proficiency";

const WEEKLY_GOAL_KEY = "pobrelingo_weekly_goal";
const DEFAULT_WEEKLY_GOAL = 5;

function readWeeklyGoal(): number {
	try {
		const raw = localStorage.getItem(WEEKLY_GOAL_KEY);
		const parsed = raw ? Number(JSON.parse(raw)) : DEFAULT_WEEKLY_GOAL;
		return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_WEEKLY_GOAL;
	} catch {
		return DEFAULT_WEEKLY_GOAL;
	}
}

export function FluencyJourneyCard() {
	const log = useStudyLog();
	const { ids } = useKnownWords();
	const level = loadProficiencyResult()?.level ?? null;

	const journey = buildJourney({
		level,
		log,
		knownWords: ids.length,
		now: new Date(),
		weeklyGoalHours: readWeeklyGoal(),
	});

	if (!level) {
		return (
			<Card className="glass-card">
				<CardContent className="p-4 sm:p-5 space-y-3">
					<div className="flex items-center gap-2 text-brand-violet">
						<Compass className="h-4 w-4" />
						<p className="font-display font-bold text-sm">Rumo à fluência</p>
					</div>
					<p className="text-xs text-muted-foreground">
						Faça o nivelamento para descobrir seu nível e sua previsão de
						fluência.
					</p>
					<Button asChild size="sm" variant="secondary" className="w-full">
						<Link to="/proficiency">Faça o nivelamento</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	const { projectionToTarget, weakestStrand } = journey;

	return (
		<Card className="glass-card">
			<CardContent className="p-4 sm:p-5 space-y-3">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2 text-brand-violet">
						<Compass className="h-4 w-4" />
						<p className="font-display font-bold text-sm">Rumo à fluência</p>
					</div>
					<span className="text-xs font-semibold text-muted-foreground">
						{journey.level} → {journey.target}
					</span>
				</div>

				<div className="space-y-1">
					<Progress value={projectionToTarget.progress * 100} className="h-2" />
					<p className="text-xs text-muted-foreground">
						{projectionToTarget.weeksLeft === null
							? "Estude esta semana para ver a previsão."
							: `No ritmo atual: ~${projectionToTarget.weeksLeft} ${projectionToTarget.weeksLeft === 1 ? "semana" : "semanas"} até ${journey.target}.`}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-2 text-xs">
					<div className="rounded-lg bg-brand-aqua/10 px-2.5 py-2">
						<p className="font-bold text-brand-aqua">{journey.wordsRead}</p>
						<p className="text-muted-foreground">palavras lidas</p>
					</div>
					<div className="rounded-lg bg-brand-gold/10 px-2.5 py-2">
						<p className="font-bold text-brand-gold">{journey.vocabKnown}</p>
						<p className="text-muted-foreground">palavras conhecidas</p>
					</div>
				</div>

				<Button asChild size="sm" variant="outline" className="w-full gap-1">
					<Link to={weakestStrand.route}>{weakestStrand.recommendation}</Link>
				</Button>

				<Button asChild size="sm" variant="ghost" className="w-full gap-1">
					<Link to="/progress">
						Ver detalhes
						<ArrowRight className="h-3.5 w-3.5" />
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
