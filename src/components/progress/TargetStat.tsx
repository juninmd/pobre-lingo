import { Progress } from "@/components/ui/progress";

interface TargetStatProps {
	label: string;
	value: number;
	target: number;
}

/** Um número com alvo: valor, meta e a barra de quanto falta. */
export function TargetStat({ label, value, target }: TargetStatProps) {
	const percent = target > 0 ? Math.min((value / target) * 100, 100) : 0;

	return (
		<div className="space-y-1.5">
			<p className="text-xs text-muted-foreground">{label}</p>
			<p className="font-display text-lg font-bold tabular-nums">
				{value.toLocaleString("pt-BR")}
				<span className="text-sm font-medium text-muted-foreground">
					{" "}
					/ {target.toLocaleString("pt-BR")}
				</span>
			</p>
			<Progress
				value={percent}
				className="h-1.5"
				aria-label={`${label}: ${Math.round(percent)}% da meta`}
			/>
		</div>
	);
}
