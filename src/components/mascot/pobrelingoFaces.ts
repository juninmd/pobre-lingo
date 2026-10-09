import { type Layer, layer } from "./pixelSprite";

export type Emotion = "happy" | "excited" | "neutral" | "winking";

export interface Face {
	/** Eyes that blink. */
	open: Layer[];
	/** What replaces `open` for a blink. */
	shut: Layer[];
	/** Eyes that never blink (the winking eye). */
	fixed: Layer[];
	beak: Layer;
	/** "flap" swaps raised and lowered wings. */
	wings: "down" | "flap";
	sparkles: boolean;
	bob: "idle" | "hop";
}

const eyes = (rows: string[], y: number) => [
	layer(6, y, ...rows),
	layer(14, y, ...rows),
];

const OPEN = [".EE.", "EHEE", "EEEE", ".EE."];
const SPARK = [".EE.", "EHEE", "EEME", ".EE."];
const SMALL = [".EE.", ".EH.", ".EE."];

const BLINK = [layer(6, 12, "EEEE"), layer(14, 12, "EEEE")];

const BEAK_CLOSED = layer(10, 13, "BBBB", "BBBB", ".KK.");
const BEAK_OPEN = layer(10, 13, "BBBB", "KTTK", ".BB.");
const BEAK_FLAT = layer(10, 13, "BBBB", "KKKK");

export const FACES: Record<Emotion, Face> = {
	happy: {
		open: eyes(OPEN, 10),
		shut: BLINK,
		fixed: [],
		beak: BEAK_CLOSED,
		wings: "down",
		sparkles: false,
		bob: "idle",
	},
	excited: {
		open: eyes(SPARK, 10),
		shut: BLINK,
		fixed: [],
		beak: BEAK_OPEN,
		wings: "flap",
		sparkles: true,
		bob: "hop",
	},
	neutral: {
		open: eyes(SMALL, 12),
		shut: [layer(7, 13, "EE"), layer(15, 13, "EE")],
		fixed: [],
		beak: BEAK_FLAT,
		wings: "down",
		sparkles: false,
		bob: "idle",
	},
	winking: {
		open: [layer(6, 10, ...OPEN)],
		shut: [BLINK[0]],
		fixed: [layer(14, 11, ".EE.", "E..E")],
		beak: BEAK_CLOSED,
		wings: "down",
		sparkles: false,
		bob: "idle",
	},
};
