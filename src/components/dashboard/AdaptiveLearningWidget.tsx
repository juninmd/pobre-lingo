import { BrainCircuit, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdaptiveLearningWidget() {
	return (
		<div className="glass-card p-6 relative overflow-hidden group border-cyan-500/20">
			<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
				<BrainCircuit className="w-24 h-24 text-cyan-500" />
			</div>

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-cyan-500/20 rounded-lg">
							<BrainCircuit className="w-5 h-5 text-cyan-400" />
						</div>
						<h3 className="font-semibold text-foreground">Adaptive Learning</h3>
					</div>
					<span className="text-xs font-medium px-2.5 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/20">
						TREND 2025
					</span>
				</div>

				<p className="text-sm text-muted-foreground mb-4">
					Baseado nos seus últimos erros, ajustamos sua trilha de hoje.
				</p>

				<div className="space-y-4 mb-6">
					<div className="space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-foreground flex items-center gap-2">
								<Target className="w-4 h-4 text-orange-400" /> Foco: Phrasal
								Verbs
							</span>
							<span className="text-cyan-400">80% de domínio</span>
						</div>
						<div className="h-2 bg-background/50 rounded-full overflow-hidden border border-border/50">
							<div className="h-full bg-gradient-to-r from-orange-500 to-cyan-500 w-[80%] rounded-full" />
						</div>
					</div>

					<div className="flex items-start gap-3 p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
						<TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5" />
						<div className="text-sm">
							<p className="font-medium text-cyan-100">Próxima Sugestão</p>
							<p className="text-cyan-400/80 mt-1">
								Exercícios de fixação de "Get along" e "Give up".
							</p>
						</div>
					</div>
				</div>

				<Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] gap-2">
					Iniciar Trilha Adaptada <TrendingUp className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}
