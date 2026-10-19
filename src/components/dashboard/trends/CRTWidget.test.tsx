import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CRTWidget } from "./CRTWidget";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { GamificationProvider } from "@/contexts/GamificationContext";

// Mock the hooks
vi.mock("@/contexts/GamificationContext", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@/contexts/GamificationContext")>();
	return {
		...actual,
		useGamification: () => ({
			addXp: vi.fn(),
		}),
	};
});

vi.mock("@/contexts/NotificationContext", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@/contexts/NotificationContext")>();
	return {
		...actual,
		useNotifications: () => ({
			notify: vi.fn(),
		}),
	};
});

describe("CRTWidget", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders the widget with title and description", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<CRTWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		expect(
			screen.getByText("Culturally Responsive Teaching"),
		).toBeInTheDocument();
		expect(
			screen.getByText(
				"Pedagogia que reconhece a importância de incluir as referências culturais dos alunos.",
			),
		).toBeInTheDocument();
	});

	it("reveals content and handles interaction when button is clicked", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<CRTWidget />
				</GamificationProvider>
			</NotificationProvider>,
		);

		const actionButton = screen.getByText("Explorar Metodologia");
		fireEvent.click(actionButton);

		expect(
			screen.getByText(
				/O método|PPP é|Desenvolvido por|Embora menos|O UDL na|No ensino de/i,
			),
		).toBeInTheDocument();
	});
});
