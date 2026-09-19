import { Map as MapIcon } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { TrackPanel } from "@/components/tracks/TrackPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tracks } from "@/lib/tracks";

export default function TracksPage() {
	return (
		<PageContainer className="mx-auto max-w-3xl">
			<SEO
				title="Trilhas por Objetivo"
				description="Trilhas guiadas de inglês para viagem e para o trabalho."
			/>
			<PageHeader
				title="Trilhas por Objetivo"
				description="Escolha um objetivo e siga o caminho: lições, leituras, regras, pronúncia e conversação com IA."
				icon={MapIcon}
				iconClassName="text-brand-gold"
			/>

			<Tabs defaultValue={tracks[0].id}>
				<TabsList aria-label="Escolha uma trilha">
					{tracks.map((track) => (
						<TabsTrigger key={track.id} value={track.id}>
							{track.title}
						</TabsTrigger>
					))}
				</TabsList>
				{tracks.map((track) => (
					<TabsContent key={track.id} value={track.id}>
						<TrackPanel track={track} />
					</TabsContent>
				))}
			</Tabs>
		</PageContainer>
	);
}
