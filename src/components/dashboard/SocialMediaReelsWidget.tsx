import { Play, Heart, MessageCircle, Share2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function SocialMediaReelsWidget() {
	return (
		<Card className="glass-card hover:animate-float group bg-gradient-to-br from-pink-50/70 to-rose-50/70 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-200/50 dark:border-pink-800/50 shadow-lg hover:shadow-pink-500/10">
			<CardHeader className="pb-2 flex flex-row items-start justify-between">
				<div>
					<Badge variant="secondary" className="mb-2 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 border-none font-bold">
						<Smartphone className="w-3 h-3 mr-1 inline" /> TREND 2024
					</Badge>
					<CardTitle className="text-lg flex items-center gap-2 text-pink-700 dark:text-pink-400">
						<span>Nano-Learning em Vídeo</span>
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-sm font-medium text-muted-foreground">
					Aprenda inglês com conteúdos reais e rápidos do dia a dia.
				</div>

				<div className="relative aspect-[9/16] bg-black rounded-xl overflow-hidden group-hover:shadow-xl transition-all max-h-[200px] mx-auto flex items-center justify-center">
					{/* Fake video thumbnail background */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
					<img
						src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=400&q=80"
						alt="Video thumbnail"
						className="absolute inset-0 w-full h-full object-cover opacity-70"
					/>

					{/* Play Button */}
					<div className="z-20 p-3 bg-white/20 backdrop-blur-md rounded-full cursor-pointer hover:bg-white/40 transition-colors">
						<Play className="w-8 h-8 text-white fill-white" />
					</div>

					{/* Fake UI Overlay */}
					<div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
						<div className="text-white text-xs">
							<p className="font-bold">@englishteacher</p>
							<p className="opacity-90">3 formas de dizer "De nada"</p>
						</div>
						<div className="flex flex-col gap-2">
							<Heart className="w-5 h-5 text-white" />
							<MessageCircle className="w-5 h-5 text-white" />
							<Share2 className="w-5 h-5 text-white" />
						</div>
					</div>
				</div>

				<Button variant="gamified" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
					Assistir & Ganhar 15 XP
				</Button>
			</CardContent>
		</Card>
	);
}
