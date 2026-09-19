export type StrandKind = "reading" | "listening" | "speaking" | "writing";

export const STRAND_ROUTES: Record<StrandKind, string> = {
	reading: "/library",
	listening: "/listening-lab",
	speaking: "/tutor",
	writing: "/writing",
};

export const STRAND_TIPS: Record<StrandKind, string> = {
	reading: "Leia um texto na Biblioteca para dar volume ao seu vocabulário.",
	listening: "Ouça um episódio no Listening Lab para treinar o ouvido.",
	speaking: "Converse com o Tutor por alguns minutos para soltar a fala.",
	writing: "Escreva uma redação curta ou faça um ditado.",
};

// Ordem de desempate quando os minutos da semana empatam entre vertentes.
export const STRAND_TIE_ORDER: StrandKind[] = [
	"listening",
	"speaking",
	"writing",
	"reading",
];
