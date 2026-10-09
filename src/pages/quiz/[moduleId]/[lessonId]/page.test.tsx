import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { quizData } from "@/lib/quizData";
import { press, tab } from "@/test/keyboard";
import QuizLessonPage from "./page";

const mocks = vi.hoisted(() => ({
	completeLesson: vi.fn(),
	addCard: vi.fn(),
}));

vi.mock("@/hooks/useCurriculumProgress", () => ({
	useCurriculumProgress: () => ({
		completeLesson: mocks.completeLesson,
		isLessonCompleted: () => false,
	}),
}));
vi.mock("@/hooks/useSrs", () => ({
	useSrs: () => ({ addCard: mocks.addCard }),
}));
vi.mock("@/components/curriculum/LessonProgressBar", () => ({
	LessonProgressBar: () => null,
}));

const questions = quizData["foundations-quiz"];

const renderQuiz = () =>
	render(
		<MemoryRouter initialEntries={["/quiz/foundations/foundations-quiz"]}>
			<Routes>
				<Route path="/quiz/:moduleId/:lessonId" element={<QuizLessonPage />} />
			</Routes>
		</MemoryRouter>,
	);

const next = () =>
	fireEvent.click(
		screen.getByRole("button", { name: /Próxima|Ver Resultados/ }),
	);

function answerAll(pick: (correctAnswer: number) => number) {
	for (const question of questions) {
		fireEvent.click(screen.getAllByRole("radio")[pick(question.correctAnswer)]);
		next();
	}
}

describe("Quiz page accessibility", () => {
	beforeEach(() => {
		for (const fn of Object.values(mocks)) fn.mockClear();
		renderQuiz();
	});

	it("names the radio group after the question being asked", () => {
		expect(
			screen.getByRole("radiogroup", {
				name: new RegExp(questions[0].question.slice(0, 20)),
			}),
		).toBeInTheDocument();
	});

	it("lets a keyboard user answer and move on", () => {
		const nextButton = screen.getByRole("button", { name: "Próxima" });
		expect(nextButton).toBeDisabled();

		for (
			let i = 0;
			i < 10 && !document.activeElement?.matches('[role="radio"]');
			i++
		)
			tab();
		press(" ");

		expect(screen.getAllByRole("radio")[0]).toBeChecked();
		expect(nextButton).toBeEnabled();
	});

	it("selects an option when its whole row is clicked", () => {
		const row = screen.getByText(questions[0].options[2]).closest("label");

		fireEvent.click(row as HTMLElement);

		expect(screen.getAllByRole("radio")[2]).toBeChecked();
	});

	it("counts the same option picked on consecutive questions", () => {
		fireEvent.click(screen.getAllByRole("radio")[1]);
		next();

		fireEvent.click(screen.getAllByRole("radio")[1]);

		expect(screen.getAllByRole("radio")[1]).toBeChecked();
		expect(screen.getByRole("button", { name: "Próxima" })).toBeEnabled();
	});

	it("announces progress politely as questions change", () => {
		const status = screen.getByRole("status");
		expect(status).toHaveAttribute("aria-live", "polite");
		expect(status).toHaveTextContent(`Questão 1 de ${questions.length}`);

		fireEvent.click(screen.getAllByRole("radio")[0]);
		next();

		expect(screen.getByRole("status")).toHaveTextContent(
			`Questão 2 de ${questions.length}`,
		);
	});

	it("announces a failing result and marks wrong answers in words", () => {
		answerAll((correct) => (correct + 1) % 4);

		expect(screen.getByRole("status")).toHaveTextContent(/Reprovado/);
		expect(screen.getAllByText("Resposta incorreta")).toHaveLength(
			questions.length,
		);
		expect(screen.queryByText("Resposta correta")).not.toBeInTheDocument();
	});

	it("announces a passing result and marks right answers in words", () => {
		answerAll((correct) => correct);

		expect(screen.getByRole("status")).toHaveTextContent(/Aprovado/);
		expect(screen.getAllByText("Resposta correta")).toHaveLength(
			questions.length,
		);
	});
});
