import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { dailyStudyMinutes } from "@/lib/studyChart";
import { emptyStudyLog } from "@/lib/studyTime";
import { GoalRing } from "./GoalRing";
import { StudyActivityChart } from "./StudyActivityChart";

const NOW = new Date(2026, 10, 10, 9, 0, 0);
const log = {
	days: { "2026-11-10": { reading: 600, speaking: 300 } },
	wordsRead: 0,
};

describe("StudyActivityChart", () => {
	it("summarises the period and names every series in the legend", () => {
		render(
			<StudyActivityChart
				days={dailyStudyMinutes(log, NOW, 14)}
				dailyGoal={43}
			/>,
		);
		expect(
			screen.getByRole("heading", { name: /últimos 14 dias/ }),
		).toBeInTheDocument();
		expect(screen.getByText(/15 min em 1 dia de estudo/)).toBeInTheDocument();
		for (const label of ["Leitura", "Escuta", "Fala", "Escrita"]) {
			expect(screen.getAllByText(label).length).toBeGreaterThan(0);
		}
	});

	it("offers the same numbers as a table", () => {
		render(
			<StudyActivityChart
				days={dailyStudyMinutes(log, NOW, 14)}
				dailyGoal={43}
			/>,
		);
		const table = screen.getByRole("table", { hidden: true });
		const rows = within(table).getAllByRole("row", { hidden: true });
		expect(rows).toHaveLength(15);
		const today = within(rows[14]).getAllByRole("cell", { hidden: true });
		expect(today.map((cell) => cell.textContent)).toEqual([
			"10",
			"0",
			"5",
			"0",
			"0",
			"15",
		]);
	});

	it("invites the learner to start when there is no study yet", () => {
		render(
			<StudyActivityChart
				days={dailyStudyMinutes(emptyStudyLog(), NOW, 14)}
				dailyGoal={43}
			/>,
		);
		expect(screen.getByText(/Estude hoje para começar/)).toBeInTheDocument();
	});
});

describe("GoalRing", () => {
	it("describes progress towards the weekly goal", () => {
		render(<GoalRing done={2.5} goal={5} />);
		expect(
			screen.getByRole("img", {
				name: "2,5 de 5 horas da meta semanal (50%)",
			}),
		).toBeInTheDocument();
		expect(screen.getByText("de 5h")).toBeInTheDocument();
	});

	it("celebrates a reached goal and caps the ring at 100%", () => {
		render(<GoalRing done={7} goal={5} />);
		expect(screen.getByText("meta batida")).toBeInTheDocument();
		expect(screen.getByRole("img", { name: /\(100%\)/ })).toBeInTheDocument();
	});
});
