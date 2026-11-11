import {
	Gamepad2,
	GraduationCap,
	House,
	type LucideIcon,
	UserRound,
} from "lucide-react";

export interface NavTab {
	id: "hoje" | "aprender" | "jogar" | "eu";
	href: string;
	label: string;
	icon: LucideIcon;
	/** Rotas que pertencem à aba (a aba fica acesa nelas). */
	prefixes: string[];
}

/** As quatro abas do app. Toda rota cai em exatamente uma delas. */
export const NAV_TABS: NavTab[] = [
	{
		id: "hoje",
		href: "/",
		label: "Hoje",
		icon: House,
		prefixes: ["/review", "/buddy", "/tutor"],
	},
	{
		id: "aprender",
		href: "/learn",
		label: "Aprender",
		icon: GraduationCap,
		prefixes: [
			"/learn",
			"/course",
			"/reading",
			"/vocabulary",
			"/writing",
			"/fluency",
			"/pronunciation",
			"/tracks",
			"/checkpoints",
			"/library",
			"/listening-lab",
			"/rules",
			"/dictionary",
			"/notebook",
			"/quiz",
		],
	},
	{
		id: "jogar",
		href: "/arcade",
		label: "Jogar",
		icon: Gamepad2,
		prefixes: ["/arcade", "/games", "/exercises"],
	},
	{
		id: "eu",
		href: "/me",
		label: "Eu",
		icon: UserRound,
		prefixes: [
			"/me",
			"/progress",
			"/achievements",
			"/proficiency",
			"/settings",
		],
	},
];

const matches = (pathname: string, prefix: string) =>
	pathname === prefix || pathname.startsWith(`${prefix}/`);

/** Aba dona da rota; "/" e rotas soltas ficam com Hoje. */
export function tabForPath(pathname: string): NavTab["id"] {
	const tab = NAV_TABS.find((t) =>
		t.prefixes.some((p) => matches(pathname, p)),
	);
	return tab?.id ?? "hoje";
}
