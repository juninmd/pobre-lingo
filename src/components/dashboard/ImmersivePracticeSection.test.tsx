vi.mock("@/contexts/GamificationContext", () => ({ useGamification: () => ({ addXp: vi.fn() }) }));
vi.mock("@/contexts/NotificationContext", () => ({ useNotifications: () => ({ notify: vi.fn() }) }));
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ImmersivePracticeSection } from "./ImmersivePracticeSection";

// Mock the widgets since they have their own tests
vi.mock("./trends/AIPromptCraftingWidget", () => ({
	AIPromptCraftingWidget: () => <div data-testid="ai-widget" />,
}));
vi.mock("./trends/AuthenticMaterialsWidget", () => ({
	AuthenticMaterialsWidget: () => <div data-testid="auth-widget" />,
}));
vi.mock("./trends/CriticalPedagogyWidget", () => ({
	CriticalPedagogyWidget: () => <div data-testid="crit-widget" />,
}));
vi.mock("./trends/DEIBWidget", () => ({
	DEIBWidget: () => <div data-testid="deib-widget" />,
}));
vi.mock("./trends/DogmeELTWidget", () => ({
	DogmeELTWidget: () => <div data-testid="dogme-widget" />,
}));
vi.mock("./trends/ExperientialLearningWidget", () => ({
	ExperientialLearningWidget: () => <div data-testid="exp-widget" />,
}));
vi.mock("./trends/GlobalEnglishesWidget", () => ({
	GlobalEnglishesWidget: () => <div data-testid="global-widget" />,
}));
vi.mock("./trends/GreenELTWidget", () => ({
	GreenELTWidget: () => <div data-testid="green-widget" />,
}));
vi.mock("./trends/HyFlexLearningWidget", () => ({
	HyFlexLearningWidget: () => <div data-testid="hyflex-widget" />,
}));
vi.mock("./trends/InquiryBasedLearningWidget", () => ({
	InquiryBasedLearningWidget: () => <div data-testid="inquiry-widget" />,
}));
vi.mock("./trends/LexicalApproachWidget", () => ({
	LexicalApproachWidget: () => <div data-testid="lexical-widget" />,
}));
vi.mock("./trends/MindfulWidget", () => ({
	MindfulWidget: () => <div data-testid="mindful-widget" />,
}));
vi.mock("./trends/TranslanguagingWidget", () => ({
	TranslanguagingWidget: () => <div data-testid="trans-widget" />,
}));

describe("ImmersivePracticeSection", () => {
	it("renders section title and tabs", () => {
		render(
			<BrowserRouter>
				<ImmersivePracticeSection />
			</BrowserRouter>,
		);

		expect(
			screen.getByText("Tendências 2025 & Prática Imersiva"),
		).toBeInTheDocument();

		// By default 'digital' tab is active
		expect(screen.getByTestId("ai-widget")).toBeInTheDocument();
		expect(screen.getByTestId("hyflex-widget")).toBeInTheDocument();
	});
});
