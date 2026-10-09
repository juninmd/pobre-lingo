import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CalmPracticeCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base flex items-center gap-2">
					<Heart className="h-5 w-5 text-primary" /> Fale no seu ritmo
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 text-sm">
				<p>
					Antes de falar, faça uma pausa. Escolha uma expressão da sua aula,
					ouça e repita devagar. Se esquecer, volte ao exemplo e tente
					novamente.
				</p>
				<p>
					Você pode pedir “Please repeat” ou “Speak slowly, please”. Errar faz
					parte da prática; comparar tentativas ajuda a perceber o que melhorar.
				</p>
				<Button asChild variant="outline" className="w-full">
					<Link to="/course">Praticar uma expressão da minha aula</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
