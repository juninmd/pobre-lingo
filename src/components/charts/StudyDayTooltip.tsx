import { formatMinutes, type StudyDay } from "@/lib/studyChart";
import type { ChartSeries } from "./chartSeries";

const DAY_LABEL = new Intl.DateTimeFormat("pt-BR", {
	weekday: "short",
	day: "numeric",
	month: "short",
});

interface StudyDayTooltipProps {
	day: StudyDay;
	series: ChartSeries[];
	/** Centro da coluna, em px a partir da esquerda do gráfico. */
	x: number;
	chartWidth: number;
}

const TOOLTIP_WIDTH = 176;

export function StudyDayTooltip({
	day,
	series,
	x,
	chartWidth,
}: StudyDayTooltipProps) {
	// Mantém a caixa dentro do gráfico nas colunas das pontas.
	const left = Math.min(
		Math.max(x - TOOLTIP_WIDTH / 2, 0),
		Math.max(chartWidth - TOOLTIP_WIDTH, 0),
	);
	const rows = series.filter((item) => day.minutes[item.kind] > 0);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute top-0 z-10 rounded-lg border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
			style={{ left, width: TOOLTIP_WIDTH }}
		>
			<p className="flex items-baseline justify-between gap-2 font-semibold">
				<span className="capitalize">{DAY_LABEL.format(day.date)}</span>
				<span className="tabular-nums">{formatMinutes(day.total)}</span>
			</p>
			{rows.length === 0 ? (
				<p className="mt-1 text-muted-foreground">Sem estudo registrado</p>
			) : (
				<ul className="mt-1.5 space-y-1">
					{rows.map((item) => (
						<li key={item.kind} className="flex items-center gap-1.5">
							<span
								className="h-2 w-2 rounded-[2px]"
								style={{ background: item.color }}
							/>
							<span className="flex-1 text-muted-foreground">{item.label}</span>
							<span className="tabular-nums">
								{formatMinutes(day.minutes[item.kind])}
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
