import { PageContainer } from "@/components/common/PageContainer";
import { SEO } from "@/components/common/SEO";
import { WeeklyGoalWidget } from "@/components/dashboard/WeeklyGoalWidget";
import { ProfileCard } from "@/components/me/ProfileCard";
import { HubGrid } from "@/components/shell/HubGrid";
import { ME_LINKS } from "@/components/shell/hubData";

/** Aba Eu: quem você é no app, a meta da semana e as portas para ajustes. */
export default function MePage() {
	return (
		<PageContainer className="space-y-8">
			<SEO
				title="Eu"
				description="Seu nível, sequência, conquistas e ajustes no PobreLingo."
			/>
			<ProfileCard />
			<WeeklyGoalWidget />
			<HubGrid
				eyebrow="Seu espaço"
				title="Progresso e ajustes"
				links={ME_LINKS}
			/>
		</PageContainer>
	);
}
