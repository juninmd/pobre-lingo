import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Pobrelingo } from "./Pobrelingo";
import { FACES } from "./pobrelingoFaces";

const emotions = Object.keys(FACES) as (keyof typeof FACES)[];

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

	it.each(emotions)("draws the %s pose", (emotion) => {
		const { container } = render(<Pobrelingo emotion={emotion} />);
		expect(container.querySelectorAll("path").length).toBeGreaterThan(10);
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

	it("blinks only the open eye when winking", () => {
		// The winking eye is drawn outside both blink groups, so it never opens.
		expect(FACES.winking.open).toHaveLength(1);
		expect(FACES.winking.shut).toHaveLength(1);
		expect(FACES.winking.fixed).toHaveLength(1);
		const { container } = render(<Pobrelingo emotion="winking" />);
		expect(container.querySelectorAll(".pl-eyes-open")).toHaveLength(1);
		expect(container.querySelectorAll(".pl-eyes-shut")).toHaveLength(1);
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
		// Still excited: sparkles are shown together rather than twinkling.
		expect(container.innerHTML).toContain("#ffd84d");
	});
});
