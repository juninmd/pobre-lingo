const SIZE = 132;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;

interface GoalRingProps {
	/** Horas estudadas na semana. */
	done: number;
	/** Meta semanal, em horas. */
	goal: number;
}

const hours = (value: number) =>
	value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

/** Anel de meta: quanto da meta semanal já foi cumprido. */
export function GoalRing({ done, goal }: GoalRingProps) {
	const ratio = goal > 0 ? Math.min(done / goal, 1) : 0;
	const reached = goal > 0 && done >= goal;
	const percent = Math.round(ratio * 100);

	return (
		<div
			className="relative shrink-0"
			style={{ width: SIZE, height: SIZE }}
			role="img"
			aria-label={`${hours(done)} de ${hours(goal)} horas da meta semanal (${percent}%)`}
		>
			<svg width={SIZE} height={SIZE} aria-hidden="true" className="-rotate-90">
				<circle
					cx={SIZE / 2}
					cy={SIZE / 2}
					r={RADIUS}
					fill="none"
					strokeWidth={STROKE}
					className="stroke-secondary"
				/>
				{ratio > 0 && (
					<circle
						cx={SIZE / 2}
						cy={SIZE / 2}
						r={RADIUS}
						fill="none"
						strokeWidth={STROKE}
						strokeLinecap="round"
						pathLength={1}
						strokeDasharray={`${ratio} 1`}
						className={`draw-stroke ${reached ? "stroke-emerald-500" : "stroke-primary"}`}
					/>
				)}
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
				<span className="font-display text-2xl font-extrabold tabular-nums">
					{hours(done)}h
				</span>
				<span className="text-xs text-muted-foreground">
					{reached ? "meta batida" : `de ${hours(goal)}h`}
				</span>
			</div>
		</div>
	);
}
