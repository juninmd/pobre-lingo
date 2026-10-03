// @ts-nocheck
import { Compass, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
	return (
		<PageContainer className="max-w-xl mx-auto">
			<SEO
				title="Página não encontrada"
				description="Esta página não existe no PobreLingo."
			/>
			<div className="text-center space-y-4 py-16">
				<div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
					<Compass className="h-8 w-8 text-primary" />
				</div>
				<h1 className="text-3xl font-extrabold">Lost in translation</h1>
				<p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
					Esta página não existe — mas o inglês continua ali, esperando. Volte
					para a sua jornada ou procure o que você precisa.
				</p>
				<div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
					<Button asChild variant="gamified" className="gap-2 font-bold">
						<Link to="/">
							<Home className="h-4 w-4" />
							Minha Jornada
						</Link>
					</Button>
					<Button asChild variant="outline" className="gap-2">
						<Link to="/dictionary">
							<Search className="h-4 w-4" />
							Dicionário
						</Link>
					</Button>
				</div>
			</div>
		</PageContainer>
	);
}
