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
			<Card className="border-blue-500/20 bg-blue-500/5">
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2 text-base">
						<GraduationCap className="h-5 w-5 text-blue-600" />
						Descobrir nível oficial
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<p className="text-sm text-muted-foreground">
						Faça o diagnóstico CEFR e veja equivalência IELTS, TOEFL iBT e
						Cambridge.
					</p>
					<Button asChild className="w-full">
						<Link to="/proficiency">Fazer teste</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-blue-500/20 bg-blue-500/5">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 text-base">
					<ClipboardCheck className="h-5 w-5 text-blue-600" />
					Plano CEFR
					<CefrBadge level={result.level} showDescriptionOnHover={false} />
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">{result.focus}</p>
				<p className="rounded-md bg-background p-3 text-sm font-medium">
					Hoje: {result.todayTip}
				</p>
				<div className="grid grid-cols-3 gap-2 text-center text-xs">
					<span className="rounded-md bg-background p-2">
						IELTS {result.ielts}
					</span>
					<span className="rounded-md bg-background p-2">
						TOEFL {result.toefl}
					</span>
					<span className="rounded-md bg-background p-2">
						{result.cambridge}
					</span>
				</div>
				<ul className="space-y-1 text-sm">
					{result.dailyPlan.map((item) => (
						<li key={item}>- {item}</li>
					))}
				</ul>
				<p className="text-xs text-muted-foreground">
					Ponto fraco: {result.weakestSkill}. Confiança {result.confidence}.
				</p>
				<Button asChild variant="outline" className="w-full">
					<Link to="/proficiency">Atualizar diagnóstico</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
