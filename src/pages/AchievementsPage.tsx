import { Coins, Flame, Medal, Sparkles, Trophy, Zap } from "lucide-react";
import { useMemo } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { AchievementsList } from "@/components/gamification/AchievementsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
	ACHIEVEMENTS_LIST,
	useGamification,
} from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";
import { useSrs } from "@/hooks/useSrs";
import { getLocalStorageItem } from "@/lib/localStorage";
import { cn } from "@/lib/utils";

const HEATMAP_DAYS = 91; // 13 semanas

interface ActivityEntry {
	date: string;
	count: number;
}

function dateKey(date: Date): string {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export default function AchievementsPage() {
	const { gems, xp, level, unlockedAchievements } = useGamification();
	const { overallProgress } = useCurriculumProgress();
	const { stats: srsStats } = useSrs();

	const heatmap = useMemo(() => {
		const log = getLocalStorageItem<ActivityEntry[]>(
			"pobrelingo_activity_log",
			[],
		);
		const byDate = new Map(log.map((e) => [e.date, e.count]));
		const today = new Date();

		return Array.from({ length: HEATMAP_DAYS }, (_, i) => {
			const date = new Date(today);
			date.setDate(today.getDate() - (HEATMAP_DAYS - 1 - i));
			const key = dateKey(date);
			return { date: key, count: byDate.get(key) ?? 0 };
		});
	}, []);

	const activeDays = heatmap.filter((d) => d.count > 0).length;
	const unlockedCount = unlockedAchievements.length;
	const achievementPct = Math.round(
		(unlockedCount / ACHIEVEMENTS_LIST.length) * 100,
	);

	// XP dentro do nível atual — a fórmula do nível é floor(sqrt(xp/100)) + 1.
	const xpForLevel = (lvl: number) => (lvl - 1) ** 2 * 100;
	const currentLevelFloor = xpForLevel(level);
	const nextLevelFloor = xpForLevel(level + 1);
	const levelProgress = Math.round(
		((xp - currentLevelFloor) / (nextLevelFloor - currentLevelFloor)) * 100,
	);

	return (
		<PageContainer className="space-y-6 max-w-4xl mx-auto">
			<SEO
				title="Conquistas"
				description="Suas conquistas, estatísticas e histórico de estudo no PobreLingo."
			/>

			<PageHeader
				icon={Trophy}
				iconClassName="text-yellow-500"
				title="Conquistas & Progresso"
				description="O retrato completo da sua jornada: constância, XP, revisões e troféus."
			/>

			<section className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
				<StatCard
					icon={Flame}
					value={overallProgress.streak}
					label="Dias seguidos"
					tone="text-orange-600 dark:text-orange-400"
				/>
				<StatCard
					icon={Zap}
					value={xp}
					label="XP total"
					tone="text-purple-600 dark:text-purple-400"
				/>
				<StatCard
					icon={Coins}
					value={gems}
					label="PobreCoins"
					tone="text-yellow-600 dark:text-yellow-400"
				/>
				<StatCard
					icon={Sparkles}
					value={srsStats.mature}
					label="Memorizados"
					tone="text-emerald-600 dark:text-emerald-400"
				/>
			</section>

			<div className="grid md:grid-cols-2 gap-4">
				<Card className="glass-card">
					<CardHeader className="pb-3">
						<CardTitle className="text-base flex items-center gap-2">
							<Zap className="h-4 w-4 text-purple-500" />
							Nível {level}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<Progress
							value={Math.max(0, Math.min(levelProgress, 100))}
							className="h-2.5"
						/>
						<p className="text-xs text-muted-foreground tabular-nums">
							{Math.max(0, nextLevelFloor - xp)} XP para o nível {level + 1}
						</p>
					</CardContent>
				</Card>

				<Card className="glass-card">
					<CardHeader className="pb-3">
						<CardTitle className="text-base flex items-center gap-2">
							<Medal className="h-4 w-4 text-yellow-500" />
							Troféus
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						<Progress value={achievementPct} className="h-2.5" />
						<p className="text-xs text-muted-foreground tabular-nums">
							{unlockedCount} de {ACHIEVEMENTS_LIST.length} conquistas
							desbloqueadas
						</p>
					</CardContent>
				</Card>
			</div>

			<Card className="glass-card">
				<CardHeader className="pb-3">
					<CardTitle className="text-base flex items-center gap-2">
						<Flame className="h-4 w-4 text-orange-500" />
						Últimas 13 semanas
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div
						className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1"
						role="img"
						aria-label={`Mapa de atividade: ${activeDays} dias ativos nas últimas 13 semanas`}
					>
						{heatmap.map((day) => (
							<div
								key={day.date}
								title={`${day.date}: ${day.count} ${day.count === 1 ? "atividade" : "atividades"}`}
								className={cn(
									"w-3 h-3 rounded-[3px] transition-colors",
									day.count === 0 && "bg-muted/60",
									day.count >= 1 && day.count < 3 && "bg-emerald-500/30",
									day.count >= 3 && day.count < 5 && "bg-emerald-500/60",
									day.count >= 5 && "bg-emerald-500",
								)}
							/>
						))}
					</div>
					<p className="text-xs text-muted-foreground">
						<span className="font-semibold text-foreground">{activeDays}</span>{" "}
						dias ativos no período.
					</p>
				</CardContent>
			</Card>

			<AchievementsList />
		</PageContainer>
	);
}

function StatCard({
	icon: Icon,
	value,
	label,
	tone,
}: {
	icon: typeof Flame;
	value: number;
	label: string;
	tone: string;
}) {
	return (
		<Card className="glass-card">
			<CardContent className="p-3 sm:p-4 flex flex-col items-center text-center gap-1">
				<Icon className={cn("h-5 w-5", tone)} />
				<span className={cn("text-2xl font-extrabold tabular-nums", tone)}>
					{value}
				</span>
				<span className="text-[11px] sm:text-[11px] uppercase font-bold tracking-widest text-muted-foreground">
					{label}
				</span>
			</CardContent>
		</Card>
	);
}
