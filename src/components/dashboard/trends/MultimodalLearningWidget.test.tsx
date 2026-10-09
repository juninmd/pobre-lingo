import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MultimodalLearningWidget } from "./MultimodalLearningWidget";

vi.mock("@/contexts/GamificationContext", () => ({
	useGamification: () => ({
		addXp: vi.fn(),
	}),
}));

vi.mock("@/contexts/NotificationContext", () => ({
	useNotifications: () => ({
		notify: vi.fn(),
	}),
}));

describe("MultimodalLearningWidget", () => {
	it("renders title and description", () => {
		render(<MultimodalLearningWidget />);
		expect(screen.getByText("Multimodal Learning")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Combine texto, áudio, vídeo e interações cinestésicas para um aprendizado mais rico e profundo.",
			),
		).toBeInTheDocument();
	});
});
