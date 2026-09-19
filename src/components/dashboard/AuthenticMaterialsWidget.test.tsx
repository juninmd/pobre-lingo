import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthenticMaterialsWidget } from "./AuthenticMaterialsWidget";

describe("AuthenticMaterialsWidget", () => {
	it("renders correctly", () => {
		render(<AuthenticMaterialsWidget />);
		expect(screen.getByText("Materiais Autênticos")).toBeInTheDocument();
		expect(screen.getByText("TREND 2025")).toBeInTheDocument();
	});
});
