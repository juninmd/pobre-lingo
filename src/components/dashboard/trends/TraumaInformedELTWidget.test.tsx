import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TraumaInformedELTWidget } from "./TraumaInformedELTWidget";
import { GamificationProvider } from "@/contexts/GamificationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

describe("TraumaInformedELTWidget", () => {
	it("renders correctly", () => {
		render(
			<NotificationProvider>
				<GamificationProvider>
					<TraumaInformedELTWidget />
				</GamificationProvider>
			</NotificationProvider>
		);
		expect(screen.getByText("Trauma-Informed ELT")).toBeInTheDocument();
		expect(screen.getByText("Práticas sensíveis e acolhedoras para um ambiente de aprendizado seguro e empático.")).toBeInTheDocument();
	});
});
