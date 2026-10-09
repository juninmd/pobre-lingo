/** Local calendar day (YYYY-MM-DD). Never use toISOString() for day keys: it is UTC and shifts the day for non-UTC users. */
export function localDay(date: Date = new Date()): string {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}
