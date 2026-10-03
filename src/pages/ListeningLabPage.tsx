// @ts-nocheck
import { Headphones } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { MediaSubtitleTab } from "@/components/listening-lab/MediaSubtitleTab";
import { NativeSentencesTab } from "@/components/listening-lab/NativeSentencesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudyTimer } from "@/hooks/useStudyLog";

/** Laboratório de Escuta: horas de áudio humano real (nativos + suas mídias). */
export default function ListeningLabPage() {
	const [isPlaying, setIsPlaying] = useState(false);
	useStudyTimer("listening", isPlaying);

	return (
		<PageContainer className="max-w-4xl mx-auto">
			<PageHeader
				title="Laboratório de Escuta"
				description="Áudio de gente de verdade: frases de nativos e suas próprias mídias com legenda."
				icon={Headphones}
			/>
			<Tabs defaultValue="native">
				<TabsList>
					<TabsTrigger value="native">Frases de nativos</TabsTrigger>
					<TabsTrigger value="media">Sua mídia + legenda</TabsTrigger>
				</TabsList>
				<TabsContent value="native" className="mt-4">
					<NativeSentencesTab onPlayingChange={setIsPlaying} />
				</TabsContent>
				<TabsContent value="media" className="mt-4">
					<MediaSubtitleTab onPlayingChange={setIsPlaying} />
				</TabsContent>
			</Tabs>
		</PageContainer>
	);
}
