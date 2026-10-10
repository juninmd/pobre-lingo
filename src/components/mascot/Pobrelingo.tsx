import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { type Layer, layerPaths } from "./pixelSprite";
import {
	BODY,
	PALETTE,
	SHADOW,
	SPARKLES,
	SPRITE_SIZE,
	WINGS_DOWN,
	WINGS_UP,
} from "./pobrelingoArt";
import { type Emotion, FACES } from "./pobrelingoFaces";

export type { Emotion };

interface PobrelingoProps {
	className?: string;
	/** Multiples of 24 keep every sprite pixel the same size on screen. */
	width?: number | string;
	height?: number | string;
	emotion?: Emotion;
	/** Idle bob, blinking, wing flaps. Reduced-motion users get the still pose. */
	animated?: boolean;
	/** Accessible name, unless `decorative` hides the image. */
	title?: string;
	/** For art next to text or a labelled control that already says the same thing. */
	decorative?: boolean;
}

function Sprite({
	layers,
	className,
}: {
	layers: readonly Layer[];
	className?: string;
}) {
	return (
		<g className={className}>
			{layers.map((l) => (
				<Fragment key={`${l.x},${l.y}`}>
					{Object.entries(layerPaths(l)).map(([key, d]) => (
						<path key={key} d={d} fill={PALETTE[key]} />
					))}
				</Fragment>
			))}
		</g>
	);
}

/** Pobrelingo, the pixel art mascot: a chubby green bird with a band-aid. */
export function Pobrelingo({
	className,
	width = 96,
	height = 96,
	emotion = "happy",
	animated = true,
	title = "Pobrelingo, o mascote",
	decorative = false,
}: PobrelingoProps) {
	const face = FACES[emotion];
	const flaps = animated && face.wings === "flap";
	const raised = face.wings === "flap";

	return (
		<div
			className={cn("inline-block shrink-0", className)}
			style={{ width, height }}
		>
			{/* Inline size: icon rules like `[&_svg]:size-4` on a parent Button must not shrink the sprite. */}
			{/* overflow visible: the hop lifts the crest's top pixel one unit past the viewBox. */}
			<svg
				viewBox={`0 0 ${SPRITE_SIZE} ${SPRITE_SIZE}`}
				role={decorative ? undefined : "img"}
				aria-label={decorative ? undefined : title}
				aria-hidden={decorative || undefined}
				shapeRendering="crispEdges"
				style={{
					display: "block",
					width: "100%",
					height: "100%",
					overflow: "visible",
				}}
			>
				{!decorative && <title>{title}</title>}
				<Sprite layers={[SHADOW]} />
				<g
					className={
						animated ? `pl-${face.bob === "hop" ? "hop" : "bob"}` : undefined
					}
				>
					<Sprite layers={[BODY]} />
					<Sprite
						layers={raised ? WINGS_UP : WINGS_DOWN}
						className={flaps ? "pl-wing-a" : undefined}
					/>
					{flaps && <Sprite layers={WINGS_DOWN} className="pl-wing-b" />}
					<Sprite layers={face.fixed} />
					<Sprite
						layers={face.open}
						className={animated ? "pl-eyes-open" : undefined}
					/>
					{animated && <Sprite layers={face.shut} className="pl-eyes-shut" />}
					<Sprite layers={[face.beak]} />
				</g>
				{face.sparkles && (
					<>
						<Sprite
							layers={[SPARKLES[0]]}
							className={animated ? "pl-twinkle-a" : undefined}
						/>
						<Sprite
							layers={[SPARKLES[1]]}
							className={animated ? "pl-twinkle-b" : undefined}
						/>
					</>
				)}
			</svg>
		</div>
	);
}
