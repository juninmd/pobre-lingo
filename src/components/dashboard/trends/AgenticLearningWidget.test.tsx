import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AgenticLearningWidget } from "./AgenticLearningWidget";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

describe("AgenticLearningWidget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<AgenticLearningWidget />
				</GamificationProvider>
			</NotificationProvider>
		);
		expect(screen.getByText("Agentic Learning")).toBeInTheDocument();
		expect(screen.getByText("Foco na autonomia do aluno, permitindo que ele guie sua própria jornada de aprendizado.")).toBeInTheDocument();
	});
});
