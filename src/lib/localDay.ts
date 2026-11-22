/** Local calendar day (YYYY-MM-DD). Never use toISOString() for day keys: it is UTC and shifts the day for non-UTC users. */
export function localDay(date: Date = new Date()): string {
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}

/** Day count of the local calendar day, for picking an item "of the day" that changes at local midnight. */
export function localDayNumber(date: Date = new Date()): number {
	return Date.parse(localDay(date)) / 86_400_000;
}
