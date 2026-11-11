import { Coins, GraduationCap } from "lucide-react";

interface HeaderStatsProps {
	gems: number;
	userLevel: number;
}

/** Pílulas do topo: nível e PobreCoins, em fonte pixel. */
export function HeaderStats({ gems, userLevel }: HeaderStatsProps) {
	return (
		<div className="flex items-center gap-2">
			<div
				className="hidden md:flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-primary"
				title="Nível"
			>
				<GraduationCap className="h-4 w-4" aria-hidden="true" />
				<span className="pixel-num text-sm">Nvl {userLevel}</span>
			</div>
			<div
				className="flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-amber-700 dark:text-gold"
				title="PobreCoins"
			>
				<Coins className="h-4 w-4" aria-hidden="true" />
				<span className="pixel-num text-sm">{gems}</span>
			</div>
		</div>
	);
}
