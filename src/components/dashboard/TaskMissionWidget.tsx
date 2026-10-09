import { Briefcase, CheckCircle2, Navigation, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";
import { localDay } from "@/lib/localDay";

const TBLT_SCENARIOS = [
	{
		title: "Pedir a conta",
		context:
			"Você terminou de comer em um restaurante em Londres e precisa ir embora. O garçom está passando.",
		task: "Chame a atenção dele e peça a conta de forma educada.",
		solution: "Excuse me, could I have the bill, please?",
		translation: "Com licença, você poderia me trazer a conta, por favor?",
		xp: 10,
	},
	{
		title: "Voo Atrasado",
		context:
			"Você está no portão de embarque e no painel diz que seu voo para Nova York foi atrasado, mas não diz o tempo.",
		task: "Pergunte ao funcionário do portão quanto tempo vai demorar.",
		solution:
			"Excuse me, do you know how long the flight to New York is delayed?",
		translation:
			"Com licença, você sabe quanto tempo o voo para Nova York está atrasado?",
		xp: 15,
	},
	{
		title: "Problema no Hotel",
		context:
			"Você acabou de fazer check-in no hotel, mas percebeu que o ar condicionado do seu quarto não está funcionando.",
		task: "Ligue para a recepção e relate o problema.",
		solution:
			"Hello, I'm in room 204. The air conditioning isn't working. Could someone take a look?",
		translation:
			"Olá, estou no quarto 204. O ar condicionado não está funcionando. Alguém poderia dar uma olhada?",
		xp: 15,
	},
	{
		title: "Perdido na Cidade",
		context:
			"Você está tentando achar o museu principal da cidade e seu celular ficou sem bateria.",
		task: "Pare alguém na rua de forma educada e peça direções para o museu.",
		solution: "Excuse me, could you tell me the way to the main museum?",
		translation:
			"Com licença, você poderia me dizer o caminho para o museu principal?",
		xp: 10,
	},
	{
		title: "Reunião de Trabalho",
		context:
			"Você está em uma chamada de vídeo e a internet de alguém está cortando.",
		task: "Avise a pessoa de forma profissional que a conexão dela está ruim.",
		solution: "I'm sorry, but your connection is breaking up a bit.",
		translation: "Sinto muito, mas sua conexão está falhando um pouco.",
		xp: 15,
	},
	{
		title: "Prompt de IA",
		context:
			"Você precisa que o ChatGPT escreva um e-mail de desculpas para o seu chefe por estar atrasado.",
		task: "Dê o comando (prompt) para a inteligência artificial em inglês.",
		solution: "Write a polite email apologizing to my boss for being late.",
		translation:
			"Escreva um e-mail educado pedindo desculpas ao meu chefe por estar atrasado.",
		xp: 15,
	},
	{
		title: "Áudio Mudo",
		context:
			"Em uma reunião no Zoom, o seu colega começa a falar, mas ele esqueceu de ativar o microfone.",
		task: "Avise-o educadamente que ele está no mudo.",
		solution: "Excuse me, I think you're on mute.",
		translation: "Com licença, acho que você está no mudo.",
		xp: 10,
	},
];

export function TaskMissionWidget() {
	const { addXp } = useGamification();
	const [scenario, setScenario] = useState(TBLT_SCENARIOS[0]);
	const [claimed, setClaimed] = useState(false);
	const [revealed, setRevealed] = useState(false);

	useEffect(() => {
		// Pick a task based on the day of the year
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setScenario(TBLT_SCENARIOS[dayOfYear % TBLT_SCENARIOS.length]);

		// Check if claimed today
		const todayStr = localDay();
		setClaimed(localStorage.getItem("daily_task_mission_claimed") === todayStr);
	}, []);

	const claimReward = () => {
		if (!claimed) {
			addXp(scenario.xp);
			setClaimed(true);
			const todayStr = localDay();
			localStorage.setItem("daily_task_mission_claimed", todayStr);
		}
	};

	return (
		<Card className="glass-card bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-200/50 dark:border-cyan-800/50 relative overflow-hidden">
			<div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
			<CardHeader className="pb-2 flex flex-row items-center justify-between relative z-10">
				<CardTitle className="text-sm font-bold flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
					<Target className="w-4 h-4" />
					Missão Prática
				</CardTitle>
				<span className="text-[11px] uppercase font-bold tracking-widest text-cyan-500/70 bg-cyan-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
					<Briefcase className="w-3 h-3" />
					Mundo Real
				</span>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<h4 className="font-bold text-cyan-900 dark:text-cyan-300 text-base mb-1">
						{scenario.title}
					</h4>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-cyan-100 dark:border-cyan-900/50 text-sm mb-3">
						<p className="text-muted-foreground mb-2">{scenario.context}</p>
						<p className="font-semibold text-foreground flex items-start gap-2">
							<Navigation className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
							<span>{scenario.task}</span>
						</p>
					</div>

					{!revealed ? (
						<Button
							variant="outline"
							className="w-full border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-900/30 font-medium"
							onClick={() => setRevealed(true)}
						>
							Pense e depois veja a resposta
						</Button>
					) : (
						<div className="bg-cyan-100/50 dark:bg-cyan-900/30 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800 animate-in fade-in slide-in-from-top-2 duration-300">
							<p className="font-bold text-cyan-800 dark:text-cyan-300 text-base mb-1">
								"{scenario.solution}"
							</p>
							<p className="text-xs text-cyan-600 dark:text-cyan-400/80 italic">
								Tradução: {scenario.translation}
							</p>

							<Button
								variant={claimed ? "secondary" : "gamified"}
								size="sm"
								className="w-full mt-3 font-bold shadow-sm"
								disabled={claimed}
								onClick={claimReward}
							>
								{claimed ? (
									<span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400">
										<CheckCircle2 className="w-4 h-4" />
										Missão Cumprida!
									</span>
								) : (
									<span className="flex items-center gap-1.5">
										Completar Missão (+{scenario.xp} XP)
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
