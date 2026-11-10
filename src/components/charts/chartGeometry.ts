import type { StudyDay } from "@/lib/studyChart";
import type { ChartSeries } from "./chartSeries";

export const CHART_HEIGHT = 208;
export const MARGIN = { top: 12, right: 8, bottom: 26, left: 34 };
/** Vão de 2px na cor do fundo entre segmentos empilhados. */
const SEGMENT_GAP = 2;
const MAX_BAR_WIDTH = 28;
const TOP_RADIUS = 4;

export interface Segment {
	kind: ChartSeries["kind"];
	color: string;
	path: string;
}

export interface Column {
	day: StudyDay;
	/** Centro da coluna e largura da faixa de toque. */
	center: number;
	slot: number;
	segments: Segment[];
}

/** Retângulo com os dois cantos de cima arredondados (a ponta livre da barra). */
function roundedTop(x: number, y: number, w: number, h: number, r: number) {
	const radius = Math.min(r, h, w / 2);
	return `M${x},${y + h}V${y + radius}Q${x},${y} ${x + radius},${y}H${x + w - radius}Q${x + w},${y} ${x + w},${y + radius}V${y + h}Z`;
}

const rect = (x: number, y: number, w: number, h: number) =>
	`M${x},${y}H${x + w}V${y + h}H${x}Z`;

export function plotArea(width: number) {
	return {
		left: MARGIN.left,
		right: width - MARGIN.right,
		top: MARGIN.top,
		bottom: CHART_HEIGHT - MARGIN.bottom,
	};
}

/** Posição vertical, arredondada ao pixel para as linhas ficarem nítidas. */
export function yScale(value: number, max: number): number {
	const { top, bottom } = plotArea(0);
	return Math.round(bottom - (value / max) * (bottom - top));
}

export function buildColumns(
	days: StudyDay[],
	series: ChartSeries[],
	width: number,
	max: number,
): Column[] {
	const area = plotArea(width);
	const slot = (area.right - area.left) / days.length;
	const barWidth = Math.max(
		4,
		Math.min(MAX_BAR_WIDTH, Math.round(slot * 0.62)),
	);

	return days.map((day, index) => {
		const center = area.left + slot * (index + 0.5);
		const x = Math.round(center - barWidth / 2);
		const present = series.filter((item) => day.minutes[item.kind] > 0);
		let stacked = 0;
		const segments = present.map((item, position) => {
			const bottom = yScale(stacked, max);
			stacked += day.minutes[item.kind];
			const top = yScale(stacked, max);
			const isLast = position === present.length - 1;
			const height = Math.max(1, bottom - top - (isLast ? 0 : SEGMENT_GAP));
			const y = bottom - height;
			return {
				kind: item.kind,
				color: item.color,
				path: isLast
					? roundedTop(x, y, barWidth, height, TOP_RADIUS)
					: rect(x, y, barWidth, height),
			};
		});
		return { day, center, slot, segments };
	});
}
