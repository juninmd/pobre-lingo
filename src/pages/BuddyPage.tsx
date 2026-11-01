import { MessageCircleHeart, Upload } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BuddyChat } from "@/components/buddy/BuddyChat";
import { DEFAULT_VRM_URL, VrmStage } from "@/components/buddy/VrmStage";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { useBuddyChat } from "@/hooks/useBuddyChat";
import { useBuddyVoice } from "@/hooks/useBuddyVoice";
import { BUDDY_AVAILABLE } from "@/lib/buddy/api";
import { loadProficiencyResult } from "@/lib/proficiency";

export default function BuddyPage() {
	const level = loadProficiencyResult()?.level ?? "A2";
	const voice = useBuddyVoice();
	const [modelUrl, setModelUrl] = useState(DEFAULT_VRM_URL);
	const objectUrl = useRef<string | null>(null);
	const chat = useBuddyChat(level, voice.speak);
	const { start } = chat;

	// A Mika sempre puxa assunto assim que a página abre.
	useEffect(() => {
		if (BUDDY_AVAILABLE) start();
	}, [start]);

	useEffect(
		() => () => {
			if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
		},
		[],
	);

	const pickModel = useCallback((file: File | undefined) => {
		if (!file) return;
		if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
		objectUrl.current = URL.createObjectURL(file);
		setModelUrl(objectUrl.current);
	}, []);

	const mood = chat.status === "ended" ? "happy" : "neutral";

	return (
		<PageContainer className="max-w-4xl mx-auto space-y-6">
			<SEO
				title="Conversa com a Mika"
				description="Converse em inglês com a Mika, uma personagem 3D que corrige seu texto em tempo real e puxa assunto."
			/>
			<PageHeader
				title="Conversa com a Mika"
				description="Bate-papo curto: ela puxa assunto, corrige seu texto enquanto você digita e se despede com Bye! Tchau!"
				icon={MessageCircleHeart}
			/>
			{BUDDY_AVAILABLE ? (
				<div className="grid gap-6 md:grid-cols-[18rem_1fr]">
					<div className="space-y-2">
						<VrmStage
							modelUrl={modelUrl}
							speaking={voice.speaking}
							mood={mood}
						/>
						<Button asChild variant="outline" size="sm" className="w-full">
							<label>
								<Upload className="size-4" aria-hidden="true" /> Usar outro
								modelo VRM
								<input
									type="file"
									accept=".vrm"
									className="sr-only"
									onChange={(event) => pickModel(event.target.files?.[0])}
								/>
							</label>
						</Button>
					</div>
					<BuddyChat
						messages={chat.messages}
						status={chat.status}
						muted={voice.muted}
						onToggleMute={voice.toggleMute}
						onSend={chat.send}
						onRestart={chat.start}
					/>
				</div>
			) : (
				<p className="text-sm text-muted-foreground">
					A conversa com a Mika precisa da API do app, que está desligada nesta
					versão.
				</p>
			)}
		</PageContainer>
	);
}
