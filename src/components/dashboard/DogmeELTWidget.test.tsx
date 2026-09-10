import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DogmeELTWidget } from "./DogmeELTWidget";

describe("DogmeELTWidget", () => {
	it("renders correctly", () => {
		render(<DogmeELTWidget />);
		expect(screen.getByText("Dogme ELT")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
	});
});
