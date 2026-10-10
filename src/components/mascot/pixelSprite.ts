/**
 * Pixel art as data: a layer is a grid of palette keys placed at (x, y) on the
 * sprite canvas. "." and " " are transparent.
 */
export interface Layer {
	x: number;
	y: number;
	rows: readonly string[];
}

export const layer = (x: number, y: number, ...rows: string[]): Layer => ({
	x,
	y,
	rows,
});

const cache = new WeakMap<Layer, Record<string, string>>();

/**
 * One SVG path per palette key. Horizontal runs of one key become a single
 * rectangle, so a 24x24 sprite stays at a few dozen path segments.
 * Memoised per layer object: the art is converted once, not on every render.
 */
export function layerPaths(source: Layer): Record<string, string> {
	const cached = cache.get(source);
	if (cached) return cached;

	const paths: Record<string, string> = {};
	source.rows.forEach((row, j) => {
		let i = 0;
		while (i < row.length) {
			const key = row[i];
			if (key === "." || key === " ") {
				i++;
				continue;
			}
			let end = i + 1;
			while (end < row.length && row[end] === key) end++;
			const run = end - i;
			paths[key] =
				`${paths[key] ?? ""}M${source.x + i} ${source.y + j}h${run}v1h-${run}z`;
			i = end;
		}
	});
	cache.set(source, paths);
	return paths;
}
