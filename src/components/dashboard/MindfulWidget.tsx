import { CheckCircle2, Droplets, Flower, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const MINDFUL_AFFIRMATIONS = [
	{
		phrase: "I am capable of learning new things every day.",
		translation: "Eu sou capaz de aprender coisas novas todos os dias.",
		focus: "capable of",
		grammar: "Usamos 'capable of' seguido de verbo com -ING (learning).",
		xp: 5,
	},
	{
		phrase: "My mistakes are stepping stones to success.",
		translation: "Meus erros são degraus para o sucesso.",
		focus: "stepping stones",
		grammar:
			"Expressão idiomática que significa um passo em direção a um objetivo.",
		xp: 5,
	},
	{
		phrase: "I embrace the journey of learning English.",
		translation: "Eu abraço a jornada de aprender inglês.",
		focus: "embrace",
		grammar:
			"'Embrace' significa literalmente 'abraçar', mas é muito usado no sentido de aceitar algo com entusiasmo.",
		xp: 5,
	},
	{
		phrase: "I am becoming more fluent with each word I speak.",
		translation: "Estou me tornando mais fluente a cada palavra que falo.",
		focus: "becoming",
		grammar:
			"O verbo 'become' (tornar-se) indica um processo de mudança gradual.",
		xp: 5,
	},
	{
		phrase: "It is okay to disconnect and recharge my mind.",
		translation: "Está tudo bem em se desconectar e recarregar a minha mente.",
		focus: "recharge",
		grammar:
			"O prefixo 're-' indica repetição ou volta ao estado anterior, como em 'recharge' (recarregar).",
		xp: 5,
	},
	{
		phrase: "I let go of the pressure to be perfect on social media.",
		translation: "Eu abro mão da pressão de ser perfeito nas redes sociais.",
		focus: "let go of",
		grammar:
			"'Let go of' é um phrasal verb que significa soltar, desapegar ou abrir mão de algo.",
		xp: 5,
	},
];

export function MindfulWidget() {
	const { addXp } = useGamification();
	const [affirmation, setAffirmation] = useState(MINDFUL_AFFIRMATIONS[0]);
	const [claimed, setClaimed] = useState(false);
	const [reflected, setReflected] = useState(false);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setAffirmation(
			MINDFUL_AFFIRMATIONS[dayOfYear % MINDFUL_AFFIRMATIONS.length],
		);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_mindful_claimed") === todayStr);
	}, []);

	const claimReward = () => {
		if (!claimed) {
			addXp(affirmation.xp);
			setClaimed(true);
			const todayStr = new Date().toISOString().split("T")[0];
			localStorage.setItem("daily_mindful_claimed", todayStr);
		}
	};

	return (
		<Card className="glass-card bg-gradient-to-br from-brand-aqua/10 to-brand-aqua/10 dark:from-brand-aqua/20 dark:to-brand-aqua/20 border-brand-aqua/20 dark:border-brand-aqua/50 relative overflow-hidden group">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-aqua/10 rounded-full blur-2xl transition-all duration-1000 group-hover:scale-150 animate-pulse" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-brand-aqua">
					<HeartHandshake className="w-4 h-4" />
					Mindful English
				</CardTitle>
				<span className="text-[10px] uppercase font-bold tracking-widest text-brand-aqua/70 bg-brand-aqua/10 px-2 py-0.5 rounded-full flex items-center gap-1">
					<Flower className="w-3 h-3" />
					Bem-estar
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<p className="text-xs text-brand-aqua/70 font-medium uppercase tracking-wider mb-2 flex items-center gap-1">
						<Droplets className="w-3 h-3" /> Afirmação do Dia
					</p>

					<div className="bg-white/60 dark:bg-black/30 p-4 rounded-xl border border-brand-aqua/15 dark:border-brand-aqua/50 text-center relative shadow-sm mb-4">
						<p className="text-lg font-medium text-brand-aqua tracking-wide">
							"{affirmation.phrase}"
						</p>
						<p className="text-sm text-brand-aqua/80 mt-2 italic">
							{affirmation.translation}
						</p>
					</div>

					{!reflected ? (
						<Button
							variant="outline"
							className="w-full border-brand-aqua/20 text-brand-aqua hover:bg-brand-aqua/10 dark:border-brand-aqua/70 dark:hover:bg-brand-aqua/30 font-medium transition-all"
							onClick={() => setReflected(true)}
						>
							Refletir e Aprender
						</Button>
					) : (
						<div className="bg-brand-aqua/15 dark:bg-brand-aqua/30 p-3 rounded-xl border border-brand-aqua/20 dark:border-brand-aqua/70 animate-in fade-in zoom-in-95 duration-500">
							<div className="mb-3">
								<span className="text-xs font-bold uppercase tracking-wider text-brand-aqua block mb-1">
									Foco: {affirmation.focus}
								</span>
								<p className="text-sm text-brand-aqua">{affirmation.grammar}</p>
							</div>

							<Button
								variant={claimed ? "secondary" : "default"}
								size="sm"
								className={`w-full font-bold shadow-sm ${claimed ? "" : "bg-brand-aqua/90 hover:bg-brand-aqua/80 text-white"}`}
								disabled={claimed}
								onClick={claimReward}
							>
								{claimed ? (
									<span className="flex items-center gap-1.5 text-brand-aqua">
										<CheckCircle2 className="w-4 h-4" />
										Mente Tranquila
									</span>
								) : (
									<span className="flex items-center gap-1.5">
										Respirar fundo (+{affirmation.xp} XP)
									</span>
								)}
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
