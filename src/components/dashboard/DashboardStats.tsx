import { Coins, Flame, GraduationCap, Trophy } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useGamification } from "@/contexts/GamificationContext";
import { useCurriculumProgress } from "@/hooks/useCurriculumProgress";

/** Os quatro números do topo do painel: sequência, moedas, nível e conclusão. */
export function DashboardStats() {
	const { overallProgress } = useCurriculumProgress();
	const { gems } = useGamification();

	return (
		<section
			aria-label="Resumo do seu progresso"
			className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 md:grid-cols-4"
		>
			<StatCard
				index={0}
				tone="orange"
				label="Dias Seguidos"
				value={overallProgress.streak}
				icon={Flame}
				iconClassName={
					overallProgress.streak > 0 ? "animate-bounce" : undefined
				}
			/>
			<StatCard
				index={1}
				tone="yellow"
				label="PobreCoins"
				value={gems}
				icon={Coins}
				iconClassName="fill-current"
			/>
			<StatCard
				index={2}
				tone="blue"
				label="Nível"
				value={overallProgress.userLevel}
				icon={GraduationCap}
			/>
			<StatCard
				index={3}
				tone="green"
				label="Completo"
				value={overallProgress.overallPercentage}
				suffix="%"
				icon={Trophy}
			/>
		</section>
	);
}
