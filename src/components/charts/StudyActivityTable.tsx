import type { StudyDay } from "@/lib/studyChart";
import type { ChartSeries } from "./chartSeries";

/** Os mesmos números do gráfico, para leitor de tela, teclado e quem prefere tabela. */
export function StudyActivityTable({
	days,
	series,
}: {
	days: StudyDay[];
	series: ChartSeries[];
}) {
	return (
		<details className="text-xs">
			<summary className="cursor-pointer text-muted-foreground hover:text-foreground w-fit rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
				Ver como tabela
			</summary>
			<div className="mt-2 overflow-x-auto">
				<table className="w-full text-left tabular-nums">
					<caption className="sr-only">
						Minutos estudados por dia e por habilidade
					</caption>
					<thead>
						<tr className="border-b text-muted-foreground">
							<th scope="col" className="py-1.5 pr-3 font-medium">
								Dia
							</th>
							{series.map((item) => (
								<th key={item.kind} scope="col" className="px-2 font-medium">
									{item.label}
								</th>
							))}
							<th scope="col" className="pl-2 font-medium">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{days.map((day) => (
							<tr key={day.key} className="border-b border-border/50">
								<th scope="row" className="py-1.5 pr-3 font-normal">
									{day.date.toLocaleDateString("pt-BR", {
										day: "2-digit",
										month: "2-digit",
									})}
								</th>
								{series.map((item) => (
									<td key={item.kind} className="px-2">
										{day.minutes[item.kind]}
									</td>
								))}
								<td className="pl-2 font-semibold">{day.total}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</details>
	);
}
