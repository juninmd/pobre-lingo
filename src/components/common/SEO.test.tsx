import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SEO } from "./SEO";

const description = () =>
	document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
		?.content;

describe("SEO", () => {
	it("sets the page title and description", () => {
		render(<SEO title="Progresso" description="Seu progresso." />);
		expect(document.title).toBe("Progresso | PobreLingo");
		expect(description()).toBe("Seu progresso.");
	});

	it("lets a page override the layout default and restores it on leave", () => {
		render(<SEO />);
		const page = render(<SEO title="Arcade" />);
		expect(document.title).toBe("Arcade | PobreLingo");
		page.unmount();
		expect(document.title).toBe("PobreLingo - Inglês Grátis");
	});

	it("reuses the same meta tag instead of piling up duplicates", () => {
		render(<SEO title="A" />);
		render(<SEO title="B" />);
		expect(
			document.head.querySelectorAll('meta[property="og:title"]'),
		).toHaveLength(1);
	});
});
