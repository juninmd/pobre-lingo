import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import type { StrandKind } from "@/lib/fluencyStrands";
import { STRAND_ROUTES } from "@/lib/fluencyStrands";

const STRAND_LABELS: Record<StrandKind, string> = {
	reading: "Leitura",
	listening: "Escuta",
	speaking: "Fala",
	writing: "Escrita",
};

const STRAND_ORDER: StrandKind[] = [
	"reading",
	"listening",
	"speaking",
	"writing",
];

/** Barras acessíveis (sem lib de gráfico) com os minutos por vertente na semana. */
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
							className="font-medium hover:underline"
						>
							{STRAND_LABELS[kind]}
						</Link>
						<span className="text-muted-foreground tabular-nums">
							{minutes[kind]} min
						</span>
					</div>
					<Progress
						value={(minutes[kind] / max) * 100}
						className="h-2"
						aria-label={`${STRAND_LABELS[kind]}: ${minutes[kind]} minutos esta semana`}
					/>
				</li>
			))}
		</ul>
	);
}
