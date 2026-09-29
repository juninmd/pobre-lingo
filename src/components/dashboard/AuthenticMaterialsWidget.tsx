import { Newspaper, Ticket, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AuthenticMaterialsWidget() {
	return (
		<div className="glass-card p-6 relative overflow-hidden group border-emerald-500/20">
			<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
				<Newspaper className="w-24 h-24 text-emerald-500" />
			</div>

			<div className="relative z-10">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="p-2 bg-emerald-500/20 rounded-lg">
							<Newspaper className="w-5 h-5 text-emerald-400" />
						</div>
						<h3 className="font-semibold text-foreground">Materiais Autênticos</h3>
					</div>
					<span className="text-xs font-medium px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/20">
						TREND 2025
					</span>
				</div>

				<p className="text-sm text-muted-foreground mb-4">
					Pratique com textos do mundo real: cardápios, notícias e ingressos.
				</p>

				<div className="space-y-3 mb-6">
					<div className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
						<Ticket className="w-5 h-5 text-emerald-400 mt-0.5" />
						<div className="flex-1 text-sm">
							<p className="font-medium text-emerald-100">Desafio do Dia</p>
							<p className="text-emerald-400/80 mt-1">
								Leia um cardápio de restaurante em Nova York e faça o seu pedido.
							</p>
						</div>
					</div>
				</div>

				<Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] gap-2">
					Explorar Materiais <Compass className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
}
