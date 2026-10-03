// @ts-nocheck
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Projection } from "@/lib/fluencyGoals";

function weeksLabel(weeksLeft: number | null): string {
	if (weeksLeft === null) return "estude esta semana para ver a previsão";
	if (weeksLeft === 0) return "meta batida";
	const date = new Date();
	date.setDate(date.getDate() + weeksLeft * 7);
	const approx = date.toLocaleDateString("pt-BR", {
		month: "short",
		year: "numeric",
	});
	return `~${weeksLeft} ${weeksLeft === 1 ? "semana" : "semanas"} (por volta de ${approx})`;
}

export function LevelProjectionCard({
	title,
	projection,
	projectionAtGoal,
}: {
	title: string;
	projection: Projection;
	projectionAtGoal: Projection;
}) {
	return (
		<Card className="glass-card">
			<CardContent className="p-4 sm:p-5 space-y-3">
				<p className="font-display font-bold text-sm">{title}</p>
				<Progress value={projection.progress * 100} className="h-2" />
				<p className="text-xs text-muted-foreground">
					{Math.round(projection.hoursDone)}h de {projection.hoursNeeded}h
					guiadas estimadas
				</p>
				<dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
					<div>
						<dt className="text-muted-foreground">No seu ritmo atual</dt>
						<dd className="font-semibold">
							{weeksLabel(projection.weeksLeft)}
						</dd>
					</div>
					<div>
						<dt className="text-muted-foreground">No seu ritmo-meta</dt>
						<dd className="font-semibold">
							{weeksLabel(projectionAtGoal.weeksLeft)}
						</dd>
					</div>
				</dl>
			</CardContent>
		</Card>
	);
}
