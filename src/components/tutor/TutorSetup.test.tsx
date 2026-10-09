import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { TutorSetup } from "@/components/tutor/TutorSetup";

describe("TutorSetup detection failure", () => {
	it("shows the error and lets the student retry detection", () => {
		const onRetry = vi.fn();
		render(
			<MemoryRouter>
				<TutorSetup
					phase="error"
					status="unavailable"
					progress={{ value: 0 }}
					providerLabel={null}
					error="Não foi possível verificar a IA do seu aparelho. Confira sua conexão e tente de novo."
					onStart={vi.fn()}
					onRetry={onRetry}
				/>
			</MemoryRouter>,
		);

		expect(screen.getByRole("alert")).toHaveTextContent(/conexão/);
		fireEvent.click(screen.getByRole("button", { name: "Tentar de novo" }));

		expect(onRetry).toHaveBeenCalledTimes(1);
	});
});
