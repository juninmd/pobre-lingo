import { CheckCircle2, HeartHandshake, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const DEIB_TOPICS = [
	{
		title: "Gender-Neutral Pronouns",
		concept: "Using 'they/them' as a singular pronoun.",
		explanation:
			"When you don't know someone's gender, or if they prefer gender-neutral pronouns, use 'they', 'them', and 'their' instead of 'he/she'.",
		example: "Someone left THEIR umbrella here. I hope THEY come back for it.",
		xp: 15,
	},
	{
		title: "Inclusive Greetings",
		concept: "Avoiding gendered terms when addressing groups.",
		explanation:
			"Instead of saying 'Hey guys' or 'Ladies and gentlemen', try using more inclusive terms that encompass everyone.",
		example: "Try saying: 'Hi everyone', 'Welcome folks', or 'Hello team'.",
		xp: 15,
	},
	{
		title: "Person-First Language",
		concept: "Putting the person before their condition or disability.",
		explanation:
			"This emphasizes that a disability or condition is just one aspect of a person's life, not their defining characteristic.",
		example: "Say 'A person with a disability' instead of 'A disabled person'.",
		xp: 15,
	},
];

export function DEIBWidget() {
	const { addXp } = useGamification();
	const [topic, setTopic] = useState(DEIB_TOPICS[0]);
	const [claimed, setClaimed] = useState(false);

	useEffect(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		setTopic(DEIB_TOPICS[dayOfYear % DEIB_TOPICS.length]);

		const todayStr = new Date().toISOString().split("T")[0];
		setClaimed(localStorage.getItem("daily_deib_claimed") === todayStr);
	}, []);

	const handleAcknowledge = () => {
		if (claimed) return;

		addXp(topic.xp);
		setClaimed(true);
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_deib_claimed", todayStr);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-destructive/10 to-destructive/10 dark:from-destructive/30 dark:to-destructive/30 border-destructive/20 dark:border-destructive/50 shadow-lg hover:shadow-destructive/10 relative overflow-hidden">
			<div className="absolute -left-4 -top-4 w-24 h-24 bg-destructive/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-destructive/15 text-destructive dark:bg-destructive/60 border-none font-bold"
					>
						<HeartHandshake className="w-3 h-3 mr-1 inline" /> DEIB Focus
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-destructive">
						<Users className="w-5 h-5" />
						<span>{topic.title}</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-destructive/15 dark:border-destructive/50 text-sm mb-3">
						<p className="font-bold text-destructive mb-1">{topic.concept}</p>
						<p className="text-muted-foreground mb-2">{topic.explanation}</p>
						<div className="border-t border-destructive/15 dark:border-destructive/50 pt-2">
							<span className="font-bold text-destructive block mb-1">
								Example:
							</span>
							<span className="text-destructive italic">"{topic.example}"</span>
						</div>
					</div>

					{claimed ? (
						<div className="bg-destructive/15 dark:bg-destructive/20 p-2 rounded border border-destructive/20 dark:border-destructive/50 text-center animate-in fade-in slide-in-from-top-2 duration-300">
							<span className="flex items-center justify-center gap-1.5 text-destructive font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Linguagem Inclusiva! (+{topic.xp} XP)
							</span>
						</div>
					) : (
						<Button
							variant="gamified"
							className="w-full font-bold shadow-sm"
							onClick={handleAcknowledge}
						>
							Aprender e Incluir (+{topic.xp} XP)
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
