import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { BiteSizedLearningWidget } from "./BiteSizedLearningWidget";

describe("BiteSizedLearningWidget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<BiteSizedLearningWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);
		expect(screen.getByText("Bite-sized Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Lições curtas e focadas para máxima retenção de conteúdo.",
			),
		).toBeInTheDocument();
	});
});
