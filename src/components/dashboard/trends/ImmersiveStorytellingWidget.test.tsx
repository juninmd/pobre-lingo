import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ImmersiveStorytellingWidget } from "./ImmersiveStorytellingWidget";

describe("ImmersiveStorytellingWidget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<ImmersiveStorytellingWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);
		expect(screen.getByText("Immersive Storytelling")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Contação de histórias envolventes e interativas para ensino.",
			),
		).toBeInTheDocument();
	});
});
