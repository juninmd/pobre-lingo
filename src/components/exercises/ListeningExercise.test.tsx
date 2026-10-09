import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { holdArrow, press, tab } from "@/test/keyboard";
import { ListeningExercise } from "./ListeningExercise";

const mocks = vi.hoisted(() => ({
	toast: vi.fn(),
	speak: vi.fn(),
	completeLesson: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
	useToast: () => ({ toast: mocks.toast }),
}));
vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({ completeLesson: mocks.completeLesson }),
}));
vi.mock("@/lib/tts", () => ({ tts: { speak: mocks.speak } }));
vi.mock("@/components/curriculum/LessonCompleteModal", () => ({
	LessonCompleteModal: () => null,
}));
vi.mock("@/lib/exerciseData", () => ({
	getListeningExercisesForLesson: () => [
		{
			text: "I like coffee",
			translation: "Eu gosto de café",
			options: ["I like tea", "I like coffee", "I like milk"],
			difficulty: "easy",
		},
	],
}));

const renderExercise = () =>
	render(
		<MemoryRouter initialEntries={["/?lesson=l1"]}>
			<ListeningExercise />
		</MemoryRouter>,
	);

const radio = (name: string) => screen.getByRole("radio", { name });
const arrowDownTo = async (name: string) => {
	await holdArrow("ArrowDown");
	expect(radio(name)).toHaveFocus();
	expect(radio(name)).toBeChecked();
};
const tabUntilFocused = (target: HTMLElement) => {
	for (let i = 0; i < 20 && document.activeElement !== target; i++) tab();
	expect(target).toHaveFocus();
};

describe("ListeningExercise keyboard operation", () => {
	beforeEach(() => {
		for (const fn of Object.values(mocks)) fn.mockClear();
	});

	it("exposes the options as one radio group with a named speaker button", () => {
		renderExercise();

		expect(screen.getByRole("radiogroup")).toBeInTheDocument();
		expect(screen.getAllByRole("radio")).toHaveLength(3);
		expect(screen.getByRole("button", { name: /ouvir/i })).toBeInTheDocument();
	});

	it("plays the phrase from the speaker button with Enter", () => {
		renderExercise();

		tabUntilFocused(screen.getByRole("button", { name: /ouvir/i }));
		press("Enter");

		expect(mocks.speak).toHaveBeenCalledWith("I like coffee", "en-US", 0.8);
	});

	it("lets a keyboard user pick an option and check the answer", async () => {
		renderExercise();
		expect(screen.getByRole("button", { name: "Verificar" })).toBeDisabled();

		tabUntilFocused(radio("I like tea"));
		await arrowDownTo("I like coffee");

		tabUntilFocused(screen.getByRole("button", { name: "Verificar" }));
		press("Enter");

		expect(mocks.toast).toHaveBeenCalledWith(
			expect.objectContaining({ title: "Correto!" }),
		);
		expect(screen.getByRole("button", { name: "Próximo" })).toBeInTheDocument();
	});

	it("allows changing a wrong answer, then locks the options once correct", async () => {
		renderExercise();

		tabUntilFocused(radio("I like tea"));
		press(" ");
		tabUntilFocused(screen.getByRole("button", { name: "Verificar" }));
		press("Enter");
		expect(mocks.toast).toHaveBeenCalledWith(
			expect.objectContaining({ title: "Incorreto" }),
		);

		act(() => radio("I like tea").focus());
		await arrowDownTo("I like coffee");
		fireEvent.click(screen.getByRole("button", { name: "Verificar" }));

		expect(radio("I like coffee")).toBeDisabled();
	});
});
