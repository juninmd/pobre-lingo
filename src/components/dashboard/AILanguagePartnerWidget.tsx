import { Bot, MessageSquare, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AILanguagePartnerWidget() {
	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-indigo-50/70 to-blue-50/70 dark:from-indigo-950/30 dark:to-blue-950/30 border-indigo-200/50 dark:border-indigo-800/50 shadow-lg hover:shadow-indigo-500/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge variant="secondary" className="mb-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-none font-bold">
						<Sparkles className="w-3 h-3 mr-1 inline" /> TREND 2024
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
						<Bot className="w-5 h-5" />
						<span>AI Language Partner</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Pratique conversação em tempo real com nosso assistente de IA. Cenário de hoje:
				</div>

				<div className="p-3 bg-white/60 dark:bg-black/30 rounded-lg border border-indigo-100 dark:border-indigo-900">
					<div className="flex gap-3 items-start">
						<div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mt-1">
							<Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
						</div>
						<div>
							<p className="font-semibold text-sm mb-1">Cenário: Pedindo café</p>
							<p className="text-sm italic text-muted-foreground">"Hi there! What can I get for you today?"</p>
						</div>
					</div>
				</div>

				<div className="flex gap-2">
					<Button className="w-full gap-2" variant="default">
						<MessageSquare className="w-4 h-4" /> Responder
					</Button>
					<Button variant="outline" size="icon" className="shrink-0 rounded-full border-indigo-200 dark:border-indigo-800 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900">
						<Mic className="w-4 h-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
