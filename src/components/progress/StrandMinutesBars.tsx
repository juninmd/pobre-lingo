import { Link } from "react-router-dom";
import { SERIES_BY_KIND } from "@/components/charts/chartSeries";
import { Progress } from "@/components/ui/progress";
import type { StrandKind } from "@/lib/fluencyStrands";
import { STRAND_ROUTES } from "@/lib/fluencyStrands";

const STRAND_ORDER: StrandKind[] = [
	"reading",
	"listening",
	"speaking",
	"writing",
];

/** Minutos por vertente na semana, nas mesmas cores do gráfico diário. */
export function StrandMinutesBars({
	minutes,
}: {
	minutes: Record<StrandKind, number>;
}) {
	const max = Math.max(1, ...STRAND_ORDER.map((kind) => minutes[kind]));

	return (
		<ul
			className="space-y-3"
			aria-label="Minutos estudados por vertente esta semana"
		>
			{STRAND_ORDER.map((kind) => (
				<li key={kind}>
					<div className="flex items-center justify-between text-sm mb-1">
						<Link
							to={STRAND_ROUTES[kind]}
							className="flex items-center gap-2 font-medium hover:underline"
						>
							<span
								aria-hidden="true"
								className="h-2.5 w-2.5 rounded-[3px]"
								style={{ background: SERIES_BY_KIND[kind].color }}
							/>
							{SERIES_BY_KIND[kind].label}
						</Link>
						<span className="text-muted-foreground tabular-nums">
							{minutes[kind]} min
						</span>
					</div>
					<Progress
						value={(minutes[kind] / max) * 100}
						className="h-2"
						indicatorColor={SERIES_BY_KIND[kind].color}
						aria-label={`${SERIES_BY_KIND[kind].label}: ${minutes[kind]} minutos esta semana`}
					/>
				</li>
			))}
		</ul>
	);
}
