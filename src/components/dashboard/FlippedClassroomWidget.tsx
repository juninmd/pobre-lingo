import { CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FlippedClassroomWidget() {
	return (
		<div className="glass-card p-6 relative overflow-hidden group">
			<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
				<Play className="w-24 h-24" />
			</div>

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-primary/20 rounded-lg">
							<Play className="w-5 h-5 text-primary" />
						</div>
						<h3 className="font-semibold text-foreground">Flipped Classroom</h3>
					</div>
					<span className="text-xs font-medium px-2.5 py-1 bg-primary/20 text-primary rounded-full border border-primary/20">
						TREND 2025
					</span>
				</div>

				<p className="text-sm text-muted-foreground mb-4">
					Assista ao vídeo introdutório sobre "Conditional Sentences" antes da
					nossa prática ao vivo.
				</p>

				<div className="space-y-3 mb-6">
					<div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
						<CheckCircle className="w-5 h-5 text-brand-aqua" />
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">
								Material Base
							</p>
							<p className="text-xs text-muted-foreground">
								PDF de 3 páginas (Concluído)
							</p>
						</div>
					</div>

					<div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl border border-primary/20">
						<Play className="w-5 h-5 text-primary" />
						<div className="flex-1">
							<p className="text-sm font-medium text-primary">Vídeo-aula</p>
							<p className="text-xs text-primary/80">15 min restantes</p>
						</div>
					</div>
				</div>

				<Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_hsl(var(--primary)_/_0.3)]">
					Continuar Assistindo
				</Button>
			</div>
		</div>
	);
}
