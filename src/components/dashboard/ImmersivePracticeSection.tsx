import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeHub } from "@/components/dashboard/PracticeHub";
import { AIPromptCraftingWidget } from "./trends/AIPromptCraftingWidget";
import { HyFlexLearningWidget } from "./trends/HyFlexLearningWidget";
import { AILanguagePartnerWidget } from "./trends/AILanguagePartnerWidget";
import { AIStudyCoachWidget } from "./trends/AIStudyCoachWidget";
import { GreenELTWidget } from "./trends/GreenELTWidget";
import { DEIBWidget } from "./trends/DEIBWidget";
import { SocialMediaReelsWidget } from "./trends/SocialMediaReelsWidget";
import { CriticalPedagogyWidget } from "./trends/CriticalPedagogyWidget";
import { GlobalEnglishesWidget } from "./trends/GlobalEnglishesWidget";
import { AuthenticMaterialsWidget } from "./trends/AuthenticMaterialsWidget";
import { TranslanguagingWidget } from "./trends/TranslanguagingWidget";
import { MindfulWidget } from "./trends/MindfulWidget";
import { DogmeELTWidget } from "./trends/DogmeELTWidget";
import { SpacedRepetitionWidget } from "./trends/SpacedRepetitionWidget";
import { LexicalApproachWidget } from "./trends/LexicalApproachWidget";
import { ExperientialLearningWidget } from "./trends/ExperientialLearningWidget";
import { InquiryBasedLearningWidget } from "./trends/InquiryBasedLearningWidget";
import { PBLWidget } from "./trends/PBLWidget";
import { DDLWidget } from "./trends/DDLWidget";
import { CommunicativeRoleplayWidget } from "./trends/CommunicativeRoleplayWidget";

export function ImmersivePracticeSection() {
    return (
        <section aria-labelledby="immersive-practice-title" className="space-y-4 mt-8">
            <h3 id="immersive-practice-title" className="text-2xl font-bold text-foreground tracking-tight">
                Tendências 2025 & Prática Imersiva
            </h3>

            <Tabs defaultValue="digital" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2">
                    <TabsTrigger value="digital">Digital & IA</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="culture">Cultura</TabsTrigger>
                    <TabsTrigger value="methods">Metodologias</TabsTrigger>
                    <TabsTrigger value="essentials">Essenciais</TabsTrigger>
                </TabsList>

                <TabsContent value="digital" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <AIPromptCraftingWidget />
                    <HyFlexLearningWidget />
                    <AILanguagePartnerWidget />
                    <AIStudyCoachWidget />
                </TabsContent>

                <TabsContent value="social" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <SocialMediaReelsWidget />
                    <GreenELTWidget />
                    <DEIBWidget />
                    <CriticalPedagogyWidget />
                </TabsContent>

                <TabsContent value="culture" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <GlobalEnglishesWidget />
                    <AuthenticMaterialsWidget />
                    <TranslanguagingWidget />
                    <MindfulWidget />
                </TabsContent>

                <TabsContent value="methods" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                    <DogmeELTWidget />
                    <SpacedRepetitionWidget />
                    <LexicalApproachWidget />
                    <ExperientialLearningWidget />
                    <InquiryBasedLearningWidget />
                    <PBLWidget />
                    <DDLWidget />
                    <CommunicativeRoleplayWidget />
                </TabsContent>

                <TabsContent value="essentials" className="mt-4">
                    <PracticeHub />
                </TabsContent>
            </Tabs>
        </section>
    );
}
