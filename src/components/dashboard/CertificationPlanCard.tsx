import { ClipboardCheck, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CefrBadge } from "@/components/common/CefrBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	loadProficiencyResult,
	type ProficiencyResult,
} from "@/lib/proficiency";

export function CertificationPlanCard() {
	const [result, setResult] = useState<ProficiencyResult | null>(null);

	useEffect(() => {
		setResult(loadProficiencyResult());
	}, []);

	if (!result) {
		return (
			<Card className="border-primary/20 bg-primary/5">
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2 text-base">
						<GraduationCap className="h-5 w-5 text-primary" />
						Escolher conteúdo para revisar
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<p className="text-sm text-muted-foreground">
						Uma checagem de reconhecimento pode sugerir um ponto de estudo. Quem
						começa do zero pode ir direto à primeira aula.
					</p>
					<Button asChild className="w-full">
						<Link to="/proficiency">Checar conteúdos</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-primary/20 bg-primary/5">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-base">
					<ClipboardCheck className="h-5 w-5 text-primary" />
					Sugestão de estudo
					<CefrBadge level={result.level} showDescriptionOnHover={false} />
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">{result.focus}</p>
				<p className="rounded-md bg-background p-3 text-sm font-medium">
					Hoje: {result.todayTip}
				</p>
				<ul className="space-y-1 text-sm">
					{result.dailyPlan.map((item) => (
						<li key={item}>- {item}</li>
					))}
				</ul>
				<p className="text-xs text-muted-foreground">
					Sugestão baseada em reconhecimento de conteúdo; fala, escrita livre e
					interação não foram avaliadas.
				</p>
				<Button asChild variant="outline" className="w-full">
					<Link to="/proficiency">Atualizar sugestão</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
