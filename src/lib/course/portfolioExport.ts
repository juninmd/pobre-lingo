import { findCourseLesson } from "./catalog";
import type { MissionEntry } from "./portfolio";

export function portfolioText(entries: MissionEntry[]) {
	return [
		"Meu portfólio de comunicação — PobreLingo",
		"Produções do aluno, sem avaliação automática de domínio.",
		...entries.map((entry) => {
			const lesson = findCourseLesson(entry.lessonId);
			return `\n${lesson?.title ?? entry.lessonId} (${lesson?.level ?? ""})\n${entry.createdAt}\nObjetivo: ${lesson?.goal ?? ""}\n\n${entry.text}\n\nPontos para melhorar: ${entry.reflection || "Não registrados."}`;
		}),
	].join("\n");
}

export function downloadPortfolio(entries: MissionEntry[]) {
	const url = URL.createObjectURL(
		new Blob([portfolioText(entries)], { type: "text/plain;charset=utf-8" }),
	);
	const link = document.createElement("a");
	link.href = url;
	link.download = "pobrelingo-portfolio.txt";
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
