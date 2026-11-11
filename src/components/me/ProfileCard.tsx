import { Coins, Flame, Star, Trophy } from "lucide-react";
import type { CSSProperties } from "react";
import { Pobrelingo } from "@/components/mascot/Pobrelingo";
import {
	ACHIEVEMENTS_LIST,
	useGamification,
} from "@/contexts/GamificationContext";
import { useLearningStreak } from "@/hooks/useLearningStreak";
import { CEFR_LEVELS } from "@/lib/cefr";
import { loadProficiencyResult } from "@/lib/proficiencyStorage";
import { cn } from "@/lib/utils";

/** Topo da aba Eu: mascote, faixa CEFR e os quatro números que importam. */
export function ProfileCard() {
	const { xp, level, gems, unlockedAchievements } = useGamification();
	const { streak } = useLearningStreak();
	const cefr = loadProficiencyResult()?.level;
	const reached = cefr ? CEFR_LEVELS.indexOf(cefr) : -1;

	const stats = [
		{ label: "dias seguidos", value: streak, icon: Flame, tone: "text-coral" },
		{ label: "XP", value: xp, icon: Star, tone: "text-primary" },
		{
			label: "PobreCoins",
			value: gems,
			icon: Coins,
			tone: "text-amber-700 dark:text-gold",
		},
		{
			label: `de ${ACHIEVEMENTS_LIST.length} conquistas`,
			value: unlockedAchievements.length,
			icon: Trophy,
			tone: "text-aqua",
		},
	];

	return (
		<section
			aria-labelledby="me-title"
			className="next-step space-y-5 rounded-3xl border p-5 sm:p-6"
		>
			<div className="flex items-center gap-4">
				<Pobrelingo
					width={72}
					height={72}
					emotion="happy"
					decorative
					animated
				/>
				<div className="min-w-0">
					<p className="eyebrow">Nível {level}</p>
					<h1 id="me-title" className="text-4xl font-extrabold">
						Eu
					</h1>
					<p className="text-sm text-muted-foreground">
						{cefr
							? `Seu teste de nível sugere conteúdo ${cefr}.`
							: "Faça o teste de nível para ver sua faixa CEFR."}
					</p>
				</div>
			</div>

			<ol className="flex gap-1.5" aria-label="Faixa CEFR">
				{CEFR_LEVELS.map((l, i) => (
					<li
						key={l}
						className={cn(
							"pixel-num flex-1 rounded-lg py-1.5 text-center text-xs",
							i <= reached
								? "bg-aqua text-ink"
								: "bg-muted text-muted-foreground",
						)}
						aria-current={i === reached ? "step" : undefined}
					>
						{l}
					</li>
				))}
			</ol>

			<dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{stats.map((s, i) => (
					<div
						key={s.label}
						className="reveal rounded-2xl border bg-card p-3"
						style={{ "--i": i } as CSSProperties}
					>
						<dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<s.icon className={cn("h-4 w-4", s.tone)} aria-hidden="true" />
							{s.label}
						</dt>
						<dd className={cn("pixel-num text-2xl", s.tone)}>{s.value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
