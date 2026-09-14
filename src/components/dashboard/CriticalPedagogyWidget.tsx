import { CheckCircle2, MessageSquare, Scale } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGamification } from "@/contexts/GamificationContext";

const CRITICAL_TOPICS = [
	{
		title: "Language & Power",
		fact: "English is often seen as a global language, but it can also be a tool of inequality.",
		example: "How does speaking 'Standard English' affect a person's opportunities in life?",
		xp: 15,
	},
	{
		title: "Representation",
		fact: "Textbooks often reflect the culture and values of English-speaking countries, sometimes ignoring local contexts.",
		example: "Why is it important to learn English through stories from our own culture?",
		xp: 15,
	},
	{
		title: "Social Justice",
		fact: "Language learning can empower students to challenge social injustices and advocate for change.",
		example: "Can learning English help you fight for a cause you believe in?",
		xp: 15,
	},
];

export function CriticalPedagogyWidget() {
	const { addXp } = useGamification();

	const [topic] = useState(() => {
		const dayOfYear = Math.floor(
			(Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24,
		);
		return CRITICAL_TOPICS[dayOfYear % CRITICAL_TOPICS.length];
	});

	const [claimed, setClaimed] = useState(() => {
		const todayStr = new Date().toISOString().split("T")[0];
		return localStorage.getItem("daily_criticalpedagogy_claimed") === todayStr;
	});

	const handleAcknowledge = () => {
		if (claimed) return;

		addXp(topic.xp);
		setClaimed(true);
		const todayStr = new Date().toISOString().split("T")[0];
		localStorage.setItem("daily_criticalpedagogy_claimed", todayStr);
	};

	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-indigo-500/10 relative overflow-hidden">
			<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl transition-all duration-700 group-hover:scale-150" />
			<CardHeader className="pb-2 flex flex-row items-start justify-between relative z-10">
				<div>
					<Badge
						variant="secondary"
						className="mb-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-none font-bold"
					>
						<Scale className="w-3 h-3 mr-1 inline" /> Critical Pedagogy
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
						<MessageSquare className="w-5 h-5" />
						<span>{topic.title}</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 relative z-10">
				<div>
					<div className="bg-white/60 dark:bg-black/30 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 text-sm mb-3">
						<p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
							{topic.fact}
						</p>
						<div className="border-t border-indigo-100 dark:border-indigo-900/50 pt-2">
							<span className="font-bold text-indigo-700 dark:text-indigo-400 block mb-1">
								Reflection:
							</span>
							<span className="text-indigo-800 dark:text-indigo-300 italic">
								"{topic.example}"
							</span>
						</div>
					</div>

					{claimed ? (
						<div className="bg-indigo-100/30 dark:bg-indigo-900/20 p-2 rounded border border-indigo-200/50 dark:border-indigo-800/50 text-center animate-in fade-in slide-in-from-top-2 duration-300">
							<span className="flex items-center justify-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold text-sm">
								<CheckCircle2 className="w-4 h-4" />
								Reflexão Completa! (+{topic.xp} XP)
							</span>
						</div>
					) : (
						<Button
							variant="gamified"
							className="w-full font-bold shadow-sm"
							onClick={handleAcknowledge}
						>
							Refletir & Ganhar (+{topic.xp} XP)
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
