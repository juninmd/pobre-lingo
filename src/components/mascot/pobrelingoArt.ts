import { type Layer, layer } from "./pixelSprite";

/** Sprite canvas, in pixels. Display sizes that are multiples of it stay crisp. */
export const SPRITE_SIZE = 24;

/** Every key the layers below use. "." is transparent. */
export const PALETTE: Record<string, string> = {
	O: "#12332a", // outline
	G: "#3ccf6e", // feathers
	L: "#8df2a6", // feathers, light
	D: "#1f9a52", // feathers, shade
	W: "#f6ffee", // belly
	V: "#cdeccb", // belly, shade
	E: "#171a2b", // eyes
	H: "#ffffff", // eye glint
	M: "#7a80b8", // eye glint, soft
	C: "#ff8aa1", // cheeks
	B: "#ffb02e", // beak and feet
	K: "#d9641a", // beak and toes, shade
	T: "#e8546e", // tongue
	A: "#f3c99a", // band-aid
	P: "#fff1dc", // band-aid pad
	Q: "#c58a55", // band-aid dot
	Y: "#ffd84d", // sparkle
	S: "#00000040", // ground shadow
};

export const SHADOW = layer(5, 23, "SSSSSSSSSSSSSS");

/** Head, crest, band-aid, belly, cheeks and feet. Face and wings go on top. */
export const BODY = layer(
	0,
	0,
	"........................",
	"...........O............",
	"...........OO.O.........",
	"..........OLO.OO........",
	"........OOOOOOOA........",
	"......OLLLGGGGAAAO......",
	".....OLLGGGGGAPPAGO.....",
	"....OLLGGGGGAPQAAGGO....",
	"...OLGGGGGGAAPAAGGGGO...",
	"..OGGGGGGGGAAAAGGGGGGO..",
	"..OGGGGGGGGGAAGGGGGGGO..",
	"..OGGGGGGGGGGGGGGGGGGO..",
	"..OGGGGGGGGGGGGGGGGDGO..",
	"..OGGGGGGGGGGGGGGGGDGO..",
	"..OGCCGGGGGGGGGGGGCCGO..",
	"..OGGGGGGWWWWWWGGGGDGO..",
	"...OGGGGWWWWWWWWGGDDO...",
	"...OGGGGWWWWWWWWGGDDO...",
	"....OGGGVWWWWWWVDDDO....",
	".....OGGGVVVVVVDDDO.....",
	"......OOGDWWWWDDOO......",
	"........OOOOOOOO........",
	".......BBB....BBB.......",
	".......K.K....K.K.......",
);

export const WINGS_DOWN: Layer[] = [
	layer(3, 15, "DDD", "DDD", "DD.", "D.."),
	layer(18, 15, "DDD", "DDD", ".DD", "..D"),
];

export const WINGS_UP: Layer[] = [
	layer(0, 8, ".OO.", "ODDO", "ODDO", "ODDO", ".ODO", "..OO"),
	layer(20, 8, ".OO.", "ODDO", "ODDO", "ODDO", "ODO.", "OO.."),
];

export const SPARKLES: Layer[] = [
	layer(0, 3, ".Y.", "YHY", ".Y."),
	layer(20, 0, ".Y.", "YHY", ".Y."),
];
