const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
	["year", 31_536_000],
	["month", 2_592_000],
	["day", 86_400],
	["hour", 3_600],
	["minute", 60],
];

const formatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

/** "há 5 minutos", "ontem", "há 3 dias" — nativo do navegador, sem biblioteca de datas. */
export function formatRelativeTime(date: Date, now = new Date()): string {
	const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
	if (Number.isNaN(seconds)) return "";
	for (const [unit, size] of UNITS) {
		if (Math.abs(seconds) >= size) {
			return formatter.format(Math.trunc(seconds / size), unit);
		}
	}
	return "agora";
}
