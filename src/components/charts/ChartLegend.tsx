import type { ChartSeries } from "./chartSeries";

/** Legenda: a cor fica no marcador; o texto usa a tinta normal da página. */
export function ChartLegend({ series }: { series: ChartSeries[] }) {
	return (
		<ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
			{series.map((item) => (
				<li key={item.kind} className="flex items-center gap-1.5">
					<span
						aria-hidden="true"
						className="h-2.5 w-2.5 rounded-[3px]"
						style={{ background: item.color }}
					/>
					{item.label}
				</li>
			))}
		</ul>
	);
}
