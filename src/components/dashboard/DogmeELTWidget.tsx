import { MessageSquare, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DogmeELTWidget() {
	return (
		<div className="glass-card p-6 relative overflow-hidden group border-brand-gold/20">
			<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
				<Users className="w-24 h-24 text-brand-gold" />
			</div>

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-brand-gold/20 rounded-lg">
							<MessageSquare className="w-5 h-5 text-brand-gold" />
						</div>
						<h3 className="font-semibold text-foreground">Dogme ELT</h3>
					</div>
					<span className="text-xs font-medium px-2.5 py-1 bg-brand-gold/20 text-brand-gold rounded-full border border-brand-gold/20">
						TREND 2025
					</span>
				</div>

				<p className="text-sm text-muted-foreground mb-4">
					Sem material didático, apenas conversas reais. O conteúdo da aula é criado por você!
				</p>

				<div className="space-y-3 mb-6">
					<div className="flex items-start gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
						<Users className="w-5 h-5 text-brand-gold mt-0.5" />
						<div className="flex-1">
							<p className="text-sm font-medium text-foreground">
								Tópico de Hoje: Suas Experiências
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								Discuta um evento recente que mudou sua perspectiva.
							</p>
						</div>
					</div>
				</div>

				<Button className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white shadow-[0_0_15px_hsl(var(--brand-gold)_/_0.3)] gap-2">
					Iniciar Sessão Dogme <Sparkles className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}
