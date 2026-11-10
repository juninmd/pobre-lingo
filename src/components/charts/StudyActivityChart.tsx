import { useMemo, useState } from "react";
import { axisMax, formatMinutes, type StudyDay } from "@/lib/studyChart";
import { ChartLegend } from "./ChartLegend";
import { buildColumns } from "./chartGeometry";
import { STUDY_SERIES } from "./chartSeries";
import { StudyActivityBars } from "./StudyActivityBars";
import { StudyActivityTable } from "./StudyActivityTable";
import { StudyDayTooltip } from "./StudyDayTooltip";
import { useElementWidth } from "./useElementWidth";

interface StudyActivityChartProps {
	days: StudyDay[];
	/** Meta diária em minutos, desenhada como linha de referência. */
	dailyGoal: number;
}

/** Barras empilhadas: minutos por dia, uma cor fixa por habilidade. */
export function StudyActivityChart({
	days,
	dailyGoal,
}: StudyActivityChartProps) {
	const [ref, width] = useElementWidth<HTMLDivElement>();
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const peak = Math.max(dailyGoal, ...days.map((day) => day.total));
	const max = axisMax(peak);
	const columns = useMemo(
		() => buildColumns(days, STUDY_SERIES, width, max),
		[days, width, max],
	);
	const total = days.reduce((sum, day) => sum + day.total, 0);
	const activeDays = days.filter((day) => day.total > 0).length;
	const active = activeIndex === null ? null : columns[activeIndex];

	return (
		<figure className="space-y-3">
			<figcaption className="flex flex-wrap items-end justify-between gap-2">
				<div>
					<h2 className="font-display font-bold text-sm">
						Minutos por dia · últimos {days.length} dias
					</h2>
					<p className="text-xs text-muted-foreground">
						{formatMinutes(total)} em {activeDays}{" "}
						{activeDays === 1 ? "dia" : "dias"} de estudo. A linha tracejada é a
						sua meta diária ({formatMinutes(dailyGoal)}).
					</p>
				</div>
				<ChartLegend series={STUDY_SERIES} />
			</figcaption>
			<div
				ref={ref}
				className="relative"
				role="img"
				aria-label={`Gráfico de barras: ${formatMinutes(total)} estudados em ${activeDays} dos últimos ${days.length} dias. Os valores de cada dia estão na tabela abaixo.`}
			>
				<StudyActivityBars
					columns={columns}
					width={width}
					max={max}
					dailyGoal={dailyGoal}
					activeIndex={activeIndex}
					onActiveChange={setActiveIndex}
				/>
				{active && (
					<StudyDayTooltip
						day={active.day}
						series={STUDY_SERIES}
						x={active.center}
						chartWidth={width}
					/>
				)}
				{total === 0 && (
					<p className="absolute inset-x-0 top-1/3 text-center text-sm text-muted-foreground">
						Estude hoje para começar o seu gráfico.
					</p>
				)}
			</div>
			<StudyActivityTable days={days} series={STUDY_SERIES} />
		</figure>
	);
}
