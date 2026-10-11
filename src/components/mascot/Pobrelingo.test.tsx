import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pobrelingo } from "./Pobrelingo";
import { type Layer, layerPaths } from "./pixelSprite";
import {
	BODY,
	PALETTE,
	SHADOW,
	SPARKLES,
	WINGS_DOWN,
	WINGS_UP,
} from "./pobrelingoArt";
import { type Emotion, FACES } from "./pobrelingoFaces";

const emotions = Object.keys(FACES) as Emotion[];

/** Every drawn path's `d`, mapped to the fill it was given. */
function drawn(container: HTMLElement) {
	return new Map(
		Array.from(container.querySelectorAll("path"), (p): [string, string] => [
			p.getAttribute("d") ?? "",
			p.getAttribute("fill") ?? "",
		]),
	);
}

/** Each path a layer produces is drawn, in the palette colour of its key. */
function expectDrawn(fills: Map<string, string>, l: Layer) {
	for (const [key, d] of Object.entries(layerPaths(l))) {
		expect(fills.get(d), `key ${key}`).toBe(PALETTE[key]);
	}
}

function layersOf(emotion: Emotion): Layer[] {
	const face = FACES[emotion];
	const wings =
		face.wings === "flap" ? [...WINGS_UP, ...WINGS_DOWN] : WINGS_DOWN;
	return [
		SHADOW,
		BODY,
		...wings,
		...face.fixed,
		...face.open,
		...face.shut,
		face.beak,
		...(face.sparkles ? SPARKLES : []),
	];
}

describe("Pobrelingo", () => {
	it("is an image named after the mascot", () => {
		render(<Pobrelingo />);
		expect(
			screen.getByRole("img", { name: "Pobrelingo, o mascote" }),
		).toBeInTheDocument();
	});

	it("takes a custom accessible name", () => {
		render(<Pobrelingo title="Mascote comemorando" />);
		expect(
			screen.getByRole("img", { name: "Mascote comemorando" }),
		).toBeInTheDocument();
	});

	it("can be hidden from assistive tech when a label already says the same", () => {
		const { container } = render(<Pobrelingo decorative />);
		expect(screen.queryByRole("img")).toBeNull();
		expect(container.querySelector("svg")).toHaveAttribute(
			"aria-hidden",
			"true",
		);
		expect(container.querySelector("title")).toBeNull();
	});

	it.each(emotions)("draws every layer of the %s pose", (emotion) => {
		const { container } = render(<Pobrelingo emotion={emotion} />);
		const fills = drawn(container);
		for (const l of layersOf(emotion)) expectDrawn(fills, l);
	});

	it("draws different faces for different emotions", () => {
		const markup = emotions.map(
			(emotion) =>
				render(<Pobrelingo emotion={emotion} animated={false} />).container
					.innerHTML,
		);
		expect(new Set(markup).size).toBe(emotions.length);
	});

	it("keeps pixel edges hard and fills the box it is given", () => {
		const { container } = render(<Pobrelingo width={120} height={120} />);
		const svg = container.querySelector("svg");
		expect(svg).toHaveAttribute("shape-rendering", "crispEdges");
		expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
		expect(container.firstElementChild).toHaveStyle({
			width: "120px",
			height: "120px",
		});
		// Inline: a parent Button's `[&_svg]:size-4` once shrank the mascot to 16px.
		expect(svg).toHaveStyle({ width: "100%", height: "100%" });
		// The hop lifts the crest's top pixel one unit past the viewBox.
		expect(svg).toHaveStyle({ overflow: "visible" });
	});

	it("idles with a bob and blinks", () => {
		const { container } = render(<Pobrelingo emotion="happy" />);
		expect(container.querySelector(".pl-bob")).not.toBeNull();
		expect(container.querySelector(".pl-eyes-open")).not.toBeNull();
		expect(container.querySelector(".pl-eyes-shut")).not.toBeNull();
		expect(container.querySelector(".pl-wing-a")).toBeNull();
	});

	it("hops, flaps and twinkles when excited", () => {
		const { container } = render(<Pobrelingo emotion="excited" />);
		expect(container.querySelector(".pl-hop")).not.toBeNull();
		expect(container.querySelector(".pl-wing-a")).not.toBeNull();
		expect(container.querySelector(".pl-wing-b")).not.toBeNull();
		expect(container.querySelector(".pl-twinkle-a")).not.toBeNull();
		expect(container.querySelector(".pl-twinkle-b")).not.toBeNull();
	});

	it("keeps the winking eye out of the blink groups", () => {
		const { container } = render(<Pobrelingo emotion="winking" />);
		const blinking = Array.from(
			container.querySelectorAll(".pl-eyes-open path, .pl-eyes-shut path"),
			(p) => p.getAttribute("d"),
		);
		for (const d of Object.values(layerPaths(FACES.winking.fixed[0]))) {
			expect(blinking).not.toContain(d);
		}
	});

	it("holds one still pose when animation is off", () => {
		const { container } = render(
			<Pobrelingo emotion="excited" animated={false} />,
		);
		for (const name of [
			"pl-bob",
			"pl-hop",
			"pl-wing-a",
			"pl-wing-b",
			"pl-eyes-open",
			"pl-eyes-shut",
			"pl-twinkle-a",
			"pl-twinkle-b",
		]) {
			expect(container.querySelector(`.${name}`), name).toBeNull();
		}
		// Still excited: raised wings and both sparkles, with no blink layer.
		const fills = drawn(container);
		for (const l of [...WINGS_UP, ...SPARKLES, ...FACES.excited.open]) {
			expectDrawn(fills, l);
		}
	});
});
