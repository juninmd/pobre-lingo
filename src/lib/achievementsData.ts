export interface Achievement {
	id: string;
	title: string;
	description: string;
	icon: string; // Lucide icon name
	condition?: (stats: { xp: number; streak: number; gems: number }) => boolean;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
	{
		id: "first_steps",
		title: "Primeiros Passos",
		description: "Ganhe seus primeiros 50 XP.",
		icon: "Footprints",
	},
	{
		id: "streak_3",
		title: "Em Chamas",
		description: "Alcance uma ofensiva de 3 dias.",
		icon: "Flame",
	},
	{
		id: "streak_7",
		title: "Hábito Formado",
		description: "Alcance uma ofensiva de 7 dias.",
		icon: "CalendarCheck",
	},
	{
		id: "rich",
		title: "Acumulador",
		description: "Junte 100 PobreCoins.",
		icon: "Coins",
	},
	{
		id: "scholar",
		title: "Estudioso",
		description: "Chegue ao Nível 5.",
		icon: "GraduationCap",
	},
	{
		id: "master",
		title: "Mestre",
		description: "Chegue ao Nível 10.",
		icon: "Crown",
	},
	{
		id: "streak_14",
		title: "Duas Semanas",
		description: "Alcance uma ofensiva de 14 dias.",
		icon: "CalendarRange",
	},
	{
		id: "streak_30",
		title: "Inabalável",
		description: "Alcance uma ofensiva de 30 dias.",
		icon: "ShieldCheck",
	},
	{
		id: "xp_1000",
		title: "Maratonista",
		description: "Acumule 1.000 XP.",
		icon: "Zap",
	},
	{
		id: "xp_5000",
		title: "Poliglota em Treino",
		description: "Acumule 5.000 XP.",
		icon: "Rocket",
	},
	{
		id: "gems_500",
		title: "Cofre Cheio",
		description: "Junte 500 PobreCoins.",
		icon: "Gem",
	},
	{
		id: "legend",
		title: "Lenda do PobreLingo",
		description: "Chegue ao Nível 20.",
		icon: "Sparkles",
	},
];

/** Automatic unlock rules, evaluated on every state change. */
export const AUTO_UNLOCK_RULES: {
	id: string;
	test: (s: {
		xp: number;
		streak: number;
		gems: number;
		level: number;
	}) => boolean;
}[] = [
	{ id: "first_steps", test: (s) => s.xp >= 50 },
	{ id: "streak_3", test: (s) => s.streak >= 3 },
	{ id: "streak_7", test: (s) => s.streak >= 7 },
	{ id: "streak_14", test: (s) => s.streak >= 14 },
	{ id: "streak_30", test: (s) => s.streak >= 30 },
	{ id: "rich", test: (s) => s.gems >= 100 },
	{ id: "gems_500", test: (s) => s.gems >= 500 },
	{ id: "xp_1000", test: (s) => s.xp >= 1000 },
	{ id: "xp_5000", test: (s) => s.xp >= 5000 },
	{ id: "scholar", test: (s) => s.level >= 5 },
	{ id: "master", test: (s) => s.level >= 10 },
	{ id: "legend", test: (s) => s.level >= 20 },
];
