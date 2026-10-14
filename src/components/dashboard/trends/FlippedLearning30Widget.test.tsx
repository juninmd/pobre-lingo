import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { FlippedLearning30Widget } from "./FlippedLearning30Widget";

describe("FlippedLearning30Widget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<FlippedLearning30Widget />
				</GamificationProvider>
			</NotificationProvider>,
		);
		expect(screen.getByText("Flipped Learning 3.0")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Aprendizado invertido avançado focado na experiência e IA.",
			),
		).toBeInTheDocument();
	});
});
