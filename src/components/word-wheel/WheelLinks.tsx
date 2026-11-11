export type Point = { x: number; y: number };

/** Linhas que ligam as letras escolhidas (e a última ao dedo durante o arrasto). */
export function WheelLinks({
	points,
	pointer,
}: {
	points: Point[];
	pointer: Point | null;
}) {
	const all = pointer && points.length ? [...points, pointer] : points;
	return (
		<svg
			className="ww-links"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<circle className="ww-ring" cx="50" cy="50" r="36" />
			{all.length > 1 && (
				<polyline points={all.map((p) => `${p.x},${p.y}`).join(" ")} />
			)}
		</svg>
	);
}
