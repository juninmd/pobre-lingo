import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { usePersistentState } from "@/hooks/usePersistentState";
import { ACHIEVEMENTS_LIST, AUTO_UNLOCK_RULES } from "@/lib/achievementsData";
import { isNonNegativeNumber, isStringArray } from "@/lib/storageGuards";
import { readStreak, recordStreakActivity } from "@/lib/streak";

export type { Achievement } from "@/lib/achievementsData";
export { ACHIEVEMENTS_LIST } from "@/lib/achievementsData";

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

const maxHearts = Infinity;

// Infinite lives: the logic never decreases hearts.
// User requested: "as pessoas podem errar a vontade"
const loseHeart = () => {};

export function GamificationProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { notify } = useNotifications();

	// Hearts are not persisted; the state stays for API compatibility.
	const [hearts, setHearts] = useState<number>(Infinity);

	// Persisted counters validate on read, so a bad value never reaches render.
	const [gems, setGems] = usePersistentState("pl_gems", 0, isNonNegativeNumber);
	const [xp, setXp] = usePersistentState("pl_xp", 0, isNonNegativeNumber);
	const [unlockedAchievements, setUnlockedAchievements] = usePersistentState<
		string[]
	>("pl_achievements", [], isStringArray);

	// Ofensiva vem da fonte única (lib/streak), alimentada por estudo real.
	const [streak, setStreak] = useState<number>(() => readStreak());

	// Formula: Level = floor(sqrt(xp / 100)) + 1
	const level = Math.floor(Math.sqrt(xp / 100)) + 1;

	// Mantém a ofensiva sincronizada com as lições concluídas em outras telas/abas.
	useEffect(() => {
		const sync = () => setStreak(readStreak());
		const interval = setInterval(sync, 30_000);
		document.addEventListener("visibilitychange", sync);
		window.addEventListener("storage", sync);
		return () => {
			clearInterval(interval);
			document.removeEventListener("visibilitychange", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);

	const announceAchievement = useCallback(
		(id: string) => {
			const achievement = ACHIEVEMENTS_LIST.find((a) => a.id === id);
			if (!achievement) return;
			notify({
				category: "achievement",
				title: `🏆 Conquista desbloqueada: ${achievement.title}`,
				body: achievement.description,
				href: "/achievements",
				dedupeKey: `achievement:${id}`,
			});
		},
		[notify],
	);

	// Check auto-unlocks based on stats
	useEffect(() => {
		const newUnlocks = AUTO_UNLOCK_RULES.filter(
			(rule) =>
				!unlockedAchievements.includes(rule.id) &&
				rule.test({ xp, streak, gems, level }),
		).map((rule) => rule.id);

		if (newUnlocks.length > 0) {
			setUnlockedAchievements((prev) => [...new Set([...prev, ...newUnlocks])]);
			for (const id of newUnlocks) announceAchievement(id);
		}
	}, [
		xp,
		streak,
		gems,
		level,
		unlockedAchievements,
		setUnlockedAchievements,
		announceAchievement,
	]);

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

	const refillHearts = useCallback(() => setHearts(Infinity), []);

	const addGem = useCallback(
		(amount: number) => setGems((prev) => prev + amount),
		[setGems],
	);

	const addStreak = useCallback(() => {
		const previous = readStreak();
		const next = recordStreakActivity();
		setStreak(next);
		// Recompensa diária só na primeira atividade do dia.
		if (next > previous) addGem(10);
	}, [addGem]);

	const addXp = useCallback(
		(amount: number) => setXp((prev) => prev + amount),
		[setXp],
	);

	const unlockAchievement = useCallback(
		(id: string) => {
			if (unlockedAchievements.includes(id)) return;
			setUnlockedAchievements((prev) => [...new Set([...prev, id])]);
			announceAchievement(id);
		},
		[unlockedAchievements, setUnlockedAchievements, announceAchievement],
	);

	const value = useMemo<GamificationContextType>(
		() => ({
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
		}),
		[
			hearts,
			gems,
			streak,
			xp,
			level,
			unlockedAchievements,
			setGems,
			refillHearts,
			addGem,
			addStreak,
			addXp,
			unlockAchievement,
		],
	);

	return (
		<GamificationContext.Provider value={value}>
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
