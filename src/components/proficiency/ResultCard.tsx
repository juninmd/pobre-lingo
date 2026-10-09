import { RefreshCw, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { getStartingPoint } from "@/lib/placement/startingPoint";
import type { ProficiencyResult } from "@/lib/proficiency";
import { SKILL_LABELS } from "@/lib/proficiencyTypes";

interface ResultCardProps {
	result: ProficiencyResult;
	onRestart: () => void;
	onSave: () => void;
}

export function ResultCard({ result, onRestart, onSave }: ResultCardProps) {
	const startingPoint = getStartingPoint(result.level);
	return (
		<Card className="border-primary/20 bg-primary/5">
			<CardHeader className="text-center space-y-3">
				<div className="mx-auto">
					<CefrBadge level={result.level} className="text-sm px-3 py-1" />
				</div>
				<h1 className="text-2xl font-black">
					Sugestão de conteúdo: {result.level}
				</h1>
				<p className="text-sm text-muted-foreground">
					{result.score}/{result.total} acertos nas questões avaliadas. Este
					resultado orienta o estudo; não comprova domínio de nível ou fluência.
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-sm text-muted-foreground">
					Fala, escrita livre e interação não foram avaliadas. Questões de áudio
					puladas não entram no placar. Não há equivalência com exames.
				</p>
				<div className="rounded-lg border bg-background p-4">
					<div className="flex items-center gap-2 font-bold">
						<Target className="h-4 w-4 text-primary" />
						Foco agora
					</div>
					<p className="mt-2 text-sm text-muted-foreground">{result.focus}</p>
				</div>
				<div className="rounded-lg border bg-background p-4">
					<div className="flex items-center gap-2 font-bold">
						<TrendingUp className="h-4 w-4 text-primary" />
						Resultados desta checagem
					</div>
					<div className="mt-3 grid gap-2 sm:grid-cols-2">
						{result.skillReports.map((report) => (
							<Metric
								key={report.skill}
								label={SKILL_LABELS[report.skill]}
								value={
									report.percent === null
										? "Não avaliado"
										: `${report.correct}/${report.total} acertos`
								}
							/>
						))}
					</div>
					<p className="mt-3 text-xs text-muted-foreground">
						Use os acertos e erros destes trechos para escolher o que revisar.
						Eles não medem sua capacidade geral de comunicação.
					</p>
				</div>
				<div className="rounded-lg border bg-background p-4">
					<p className="font-bold">Plano diário</p>
					<ul className="mt-2 space-y-2 text-sm text-muted-foreground">
						{result.dailyPlan.map((item) => (
							<li key={item}>- {item}</li>
						))}
					</ul>
					<p className="mt-3 rounded-md bg-primary/10 p-3 text-sm font-medium text-primary">
						Hoje: {result.todayTip}
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex-col gap-2 sm:flex-row">
				<Button
					variant="outline"
					onClick={onRestart}
					className="w-full sm:w-auto"
				>
					<RefreshCw className="mr-2 h-4 w-4" />
					Refazer
				</Button>
				<Button asChild className="w-full sm:w-auto">
					<Link to={startingPoint?.href ?? "/course"}>
						Revisar conteúdo sugerido
					</Link>
				</Button>
				<Button variant="outline" onClick={onSave}>
					Salvar resultado
				</Button>
			</CardFooter>
		</Card>
	);
}

function Metric({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border bg-background p-3 text-center">
			<p className="text-xs uppercase text-muted-foreground">{label}</p>
			<p className="font-black">{value}</p>
		</div>
	);
}
