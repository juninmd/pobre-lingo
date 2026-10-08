import {
	conversationStep,
	lessonStep,
	pronunciationStep,
	readerStep,
	ruleStep,
	type TrackStep,
	tutorStep,
} from "@/lib/trackSteps";

export type { TrackStep, TrackStepKind } from "@/lib/trackSteps";

export interface Track {
	id: string;
	title: string;
	description: string;
	steps: TrackStep[];
}

export const travelTrack: Track = {
	id: "viagem",
	title: "Viagem",
	description:
		"Do embarque à volta pra casa: aeroporto, hotel, restaurante e imprevistos.",
	steps: [
		lessonStep("travel-basics", "airport-vocabulary"),
		readerStep("a1-airport"),
		conversationStep("immigration-desk", "Conversa guiada: imigração"),
		tutorStep("airport", "Simule o check-in no aeroporto", "airport-checkin"),
		lessonStep("travel-basics", "hotel-checkin"),
		readerStep("a1-hotel-checkin"),
		conversationStep("hotel-checkin", "Conversa guiada: check-in no hotel"),
		tutorStep("hotel", "Simule o check-in no hotel", "hotel-checkin"),
		lessonStep("travel-basics", "directions"),
		readerStep("a1-directions"),
		lessonStep("ordering-food-module", "ordering-food-sim"),
		readerStep("a1-restaurant-abroad"),
		conversationStep(
			"restaurant-reservation",
			"Conversa guiada: reserva no restaurante",
		),
		conversationStep("pharmacy", "Conversa guiada: na farmácia"),
		lessonStep("shopping-module", "shopping-clothes"),
		lessonStep("travel-basics", "travel-etiquette"),
		ruleStep("there-is-there-are"),
		pronunciationStep("travel", "Pronúncia: sons difíceis para viajantes"),
		readerStep("a2-lost-luggage"),
		lessonStep("tblt-problem-solving", "tblt-flight-delay"),
	],
};

export const workTrack: Track = {
	id: "trabalho",
	title: "Trabalho",
	description:
		"Do currículo à reunião: entrevista, emails, apresentações e negociação.",
	steps: [
		readerStep("b1-the-new-job"),
		conversationStep("first-meeting-work", "Conversa guiada: primeira reunião"),
		lessonStep("business-english", "emails"),
		readerStep("b1-work-email-mistake"),
		lessonStep("business-english", "meetings"),
		readerStep("b2-difficult-negotiation-meeting"),
		lessonStep("business-english", "presentations"),
		lessonStep("business-english", "presentation-speaking"),
		ruleStep("modal-verbs"),
		ruleStep("questions-interrogative"),
		pronunciationStep("business", "Pronúncia: inglês corporativo"),
		conversationStep(
			"job-interview-smalltalk",
			"Conversa guiada: papo antes da entrevista",
		),
		tutorStep("interview", "Simule uma entrevista de emprego", "job-interview"),
		lessonStep("job-interview-module", "job-interview-sim-mid"),
		readerStep("a2-job-interview"),
		lessonStep("business-mastery-module", "negotiations"),
		readerStep("c1-negotiating-a-higher-salary"),
		lessonStep("business-mastery-module", "job-interview-sim"),
	],
};

export const tracks: Track[] = [travelTrack, workTrack];

export function getTrackById(id: string): Track | undefined {
	return tracks.find((t) => t.id === id);
}
