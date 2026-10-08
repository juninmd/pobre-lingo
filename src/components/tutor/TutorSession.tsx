import { TutorChat } from "@/components/tutor/TutorChat";
import { TutorSetup } from "@/components/tutor/TutorSetup";
import { useTutor } from "@/hooks/useTutor";
import type { TutorScenario } from "@/lib/ai/tutorPrompt";
import type { CEFRLevel } from "@/lib/curriculumData";

type TutorSessionProps = { scenario: TutorScenario; level: CEFRLevel };

export function TutorSession({ scenario, level }: TutorSessionProps) {
	const tutor = useTutor(scenario, level);
	const chatting = tutor.phase === "ready" || tutor.phase === "thinking";

	if (!chatting && tutor.turns.length === 0) {
		return (
			<TutorSetup
				phase={tutor.phase}
				status={tutor.status}
				progress={tutor.progress}
				providerLabel={tutor.providerLabel}
				error={tutor.error}
				onStart={tutor.start}
			/>
		);
	}

	return (
		<TutorChat
			turns={tutor.turns}
			thinking={tutor.phase === "thinking"}
			error={tutor.phase === "error" ? tutor.error : null}
			onSend={tutor.send}
		/>
	);
}
