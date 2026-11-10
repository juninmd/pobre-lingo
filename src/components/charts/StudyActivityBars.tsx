import type { CSSProperties } from "react";
import { formatMinutes } from "@/lib/studyChart";
import { CHART_HEIGHT, type Column, plotArea, yScale } from "./chartGeometry";

const WEEKDAY = new Intl.DateTimeFormat("pt-BR", { weekday: "narrow" });

interface StudyActivityBarsProps {
	columns: Column[];
	width: number;
	max: number;
	/** Meta diária em minutos (linha tracejada), se couber no eixo. */
	dailyGoal: number;
	activeIndex: number | null;
	onActiveChange: (index: number | null) => void;
}

export function StudyActivityBars({
	columns,
	width,
	max,
	dailyGoal,
	activeIndex,
	onActiveChange,
}: StudyActivityBarsProps) {
	const area = plotArea(width);
	const ticks = [0, max / 2, max];
	const goalY =
		dailyGoal > 0 && dailyGoal <= max ? yScale(dailyGoal, max) : null;
	// Com pouco espaço, rotula um dia sim, um não.
	const labelEvery = columns.length > 0 && columns[0].slot < 22 ? 2 : 1;

	return (
		<svg width={width} height={CHART_HEIGHT} role="presentation">
			{ticks.map((tick) => (
				<g key={tick} className="text-muted-foreground">
					<line
						x1={area.left}
						x2={area.right}
						y1={yScale(tick, max) + 0.5}
						y2={yScale(tick, max) + 0.5}
						className={tick === 0 ? "stroke-border" : "stroke-border/60"}
					/>
					<text
						x={area.left - 6}
						y={yScale(tick, max) + 4}
						textAnchor="end"
						className="fill-current text-[11px] tabular-nums"
					>
						{tick}
					</text>
				</g>
			))}
			{goalY !== null && (
				<line
					x1={area.left}
					x2={area.right}
					y1={goalY + 0.5}
					y2={goalY + 0.5}
					strokeDasharray="4 4"
					className="stroke-foreground/45"
				/>
			)}
			{columns.map((column, index) => (
				<g key={column.day.key}>
					{activeIndex === index && (
						<rect
							x={column.center - column.slot / 2}
							y={area.top}
							width={column.slot}
							height={area.bottom - area.top}
							className="fill-foreground/[0.06]"
						/>
					)}
					<g className="grow-y" style={{ "--i": index } as CSSProperties}>
						{column.segments.map((segment) => (
							<path key={segment.kind} d={segment.path} fill={segment.color} />
						))}
					</g>
					{(columns.length - 1 - index) % labelEvery === 0 && (
						<text
							x={column.center}
							y={CHART_HEIGHT - 8}
							textAnchor="middle"
							className={
								index === columns.length - 1
									? "fill-foreground text-[11px] font-semibold"
									: "fill-muted-foreground text-[11px]"
							}
						>
							{WEEKDAY.format(column.day.date).toUpperCase()}
						</text>
					)}
					{/* Faixa de toque maior que a barra: a coluna inteira responde. */}
					{/* biome-ignore lint/a11y/noStaticElementInteractions: alvo de ponteiro do tooltip; o teclado usa a tabela equivalente logo abaixo */}
					<rect
						x={column.center - column.slot / 2}
						y={0}
						width={column.slot}
						height={CHART_HEIGHT}
						fill="transparent"
						onPointerEnter={() => onActiveChange(index)}
						onPointerDown={() => onActiveChange(index)}
						onPointerLeave={() => onActiveChange(null)}
					>
						<title>{`${column.day.date.toLocaleDateString("pt-BR")}: ${formatMinutes(column.day.total)}`}</title>
					</rect>
				</g>
			))}
		</svg>
	);
}
