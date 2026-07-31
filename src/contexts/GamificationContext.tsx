import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { readStreak, recordStreakActivity } from "@/lib/streak";

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

/** Regras de desbloqueio automático, avaliadas a cada mudança de estado. */
const AUTO_UNLOCK_RULES: {
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

interface GamificationContextType {
	hearts: number;
	maxHearts: number;
	gems: number; // Internally gems, displayed as PobreCoins
	streak: number;
	xp: number;
	level: number;
	unlockedAchievements: string[];
	setHearts: React.Dispatch<React.SetStateAction<number>>;
	setGems: React.Dispatch<React.SetStateAction<number>>;
	setStreak: React.Dispatch<React.SetStateAction<number>>;
	loseHeart: () => void;
	refillHearts: () => void;
	addGem: (amount: number) => void;
	addStreak: () => void;
	addXp: (amount: number) => void;
	unlockAchievement: (id: string) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(
	undefined,
);

export function GamificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { notify } = useNotifications();

	// Infinite hearts: we keep the state for compatibility but logic won't decrease it
	const [hearts, setHearts] = useState<number>(Infinity);
	const maxHearts = Infinity;

	const [gems, setGems] = useState<number>(() => {
		if (typeof window === "undefined") return 0;
		const stored = localStorage.getItem("pl_gems");
		return stored ? parseInt(stored, 10) : 0;
	});

	// Ofensiva vem da fonte única (lib/streak), alimentada por estudo real.
	const [streak, setStreak] = useState<number>(() => readStreak());

	const [xp, setXp] = useState<number>(() => {
		if (typeof window === "undefined") return 0;
		const stored = localStorage.getItem("pl_xp");
		return stored ? parseInt(stored, 10) : 0;
	});

	const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(
		() => {
			if (typeof window === "undefined") return [];
			const stored = localStorage.getItem("pl_achievements");
			return stored ? JSON.parse(stored) : [];
		},
	);

	// Derived state for level
	// Formula: Level = floor(sqrt(xp / 100)) + 1
	const level = Math.floor(Math.sqrt(xp / 100)) + 1;

	// Save to localStorage whenever state changes
	useEffect(() => {
		localStorage.setItem("pl_gems", gems.toString());
		localStorage.setItem("pl_xp", xp.toString());
		localStorage.setItem(
			"pl_achievements",
			JSON.stringify(unlockedAchievements),
		);
		// Streak é derivado de lib/streak; hearts não são mais persistidos.
	}, [gems, xp, unlockedAchievements]);

	// Mantém a ofensiva sincronizada com as lições concluídas em outras telas.
	useEffect(() => {
		const sync = () => setStreak(readStreak());
		const interval = setInterval(sync, 30_000);
		document.addEventListener("visibilitychange", sync);
		return () => {
			clearInterval(interval);
			document.removeEventListener("visibilitychange", sync);
		};
	}, []);

	// Check auto-unlocks based on stats
	useEffect(() => {
		const newUnlocks = AUTO_UNLOCK_RULES.filter(
			(rule) =>
				!unlockedAchievements.includes(rule.id) &&
				rule.test({ xp, streak, gems, level }),
		).map((rule) => rule.id);

		if (newUnlocks.length > 0) {
			setUnlockedAchievements((prev) => [...prev, ...newUnlocks]);
			for (const id of newUnlocks) {
				const achievement = ACHIEVEMENTS_LIST.find((a) => a.id === id);
				if (!achievement) continue;
				notify({
					category: "achievement",
					title: `🏆 Conquista desbloqueada: ${achievement.title}`,
					body: achievement.description,
					href: "/achievements",
					dedupeKey: `achievement:${id}`,
				});
			}
		}
	}, [xp, streak, gems, level, unlockedAchievements, notify]);

	// Aviso de novo nível: dedupe por nível para não repetir a cada render.
	useEffect(() => {
		if (level <= 1) return;
		notify({
			category: "achievement",
			title: `⭐ Nível ${level} alcançado!`,
			body: "Seu esforço está virando fluência. Continue assim.",
			href: "/achievements",
			dedupeKey: `level-up:${level}`,
		});
	}, [level, notify]);

	const loseHeart = () => {
		// Infinite lives: do nothing
		// User requested: "as pessoas podem errar a vontade"
	};

	const refillHearts = () => {
		setHearts(Infinity);
	};

	const addGem = (amount: number) => {
		setGems((prev) => prev + amount);
	};

	const addStreak = () => {
		const previous = readStreak();
		const next = recordStreakActivity();
		setStreak(next);
		// Recompensa diária só na primeira atividade do dia.
		if (next > previous) addGem(10);
	};

	const addXp = (amount: number) => {
		setXp((prev) => prev + amount);
	};

	const unlockAchievement = (id: string) => {
		if (unlockedAchievements.includes(id)) return;
		setUnlockedAchievements((prev) => [...prev, id]);
		const achievement = ACHIEVEMENTS_LIST.find((a) => a.id === id);
		if (achievement) {
			notify({
				category: "achievement",
				title: `🏆 Conquista desbloqueada: ${achievement.title}`,
				body: achievement.description,
				href: "/achievements",
				dedupeKey: `achievement:${id}`,
			});
		}
	};

	return (
		<GamificationContext.Provider
			value={{
				hearts,
				maxHearts,
				gems,
				streak,
				xp,
				level,
				unlockedAchievements,
				setHearts,
				setGems,
				setStreak,
				loseHeart,
				refillHearts,
				addGem,
				addStreak,
				addXp,
				unlockAchievement,
			}}
		>
			{children}
		</GamificationContext.Provider>
	);
}

export function useGamification() {
	const context = useContext(GamificationContext);
	if (context === undefined) {
		throw new Error(
			"useGamification must be used within a GamificationProvider",
		);
	}
	return context;
}
