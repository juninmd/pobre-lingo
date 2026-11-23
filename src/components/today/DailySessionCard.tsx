import { Mic } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { loadGoalMinutes, minutesToday, weekSplit } from "@/lib/dailySession";
import { getStudyLog, subscribeStudyLog } from "@/lib/studyLogStore";

/** Meta do dia em minutos e o aviso de que a semana está só consumindo, sem produzir. */
export function DailySessionCard() {
	const log = useSyncExternalStore(subscribeStudyLog, getStudyLog, getStudyLog);
	const goal = useMemo(loadGoalMinutes, []);
	const { today, split } = useMemo(() => {
		const now = new Date();
		return { today: minutesToday(log, now), split: weekSplit(log, now) };
	}, [log]);
	const done = today >= goal;

	return (
		<section aria-labelledby="daily-session" className="space-y-3 rounded-2xl border bg-card p-4">
			<div className="flex items-baseline justify-between gap-3">
				<h2 id="daily-session" className="text-lg font-extrabold">
					Meta de hoje
				</h2>
				<span className="pixel-num text-sm tabular-nums">
					{today} / {goal} min
				</span>
			</div>
			<Progress value={(today / goal) * 100} aria-label="Minutos estudados hoje" />
			<p className="text-sm text-muted-foreground">
				{done ? "Meta cumprida. O que vier agora é bônus." : `Faltam ${goal - today} min para manter o ritmo.`}
			</p>
			{split.lowProduction && split.share !== null && (
				<p className="flex items-start gap-2 rounded-xl bg-muted/40 p-3 text-sm">
					<Mic className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
					<span>
						Só {Math.round(split.share * 100)}% da semana foi falar ou escrever. A meta é 35%.{" "}
						<Link to="/buddy" className="font-semibold underline">
							Conversar com a Mika
						</Link>
					</span>
				</p>
			)}
		</section>
	);
}
