import { dailyConversations, defaultScenario } from "./conversations/basics";
import { debateTech } from "./conversations/debate";
import { orderingFood, shoppingClothes } from "./conversations/dining-shopping";
import { doctorAppointment, firstDate } from "./conversations/social";
import {
	pharmacy,
	restaurantReservation,
} from "./conversations/travel-services";
import { askingDirections, hotelCheckin } from "./conversations/travel-stay";
import {
	airportCheckin,
	immigrationDesk,
} from "./conversations/travel-transit";
import type {
	ConversationOption,
	ConversationStep,
} from "./conversations/types";
import { jobInterview, jobInterviewSmalltalk } from "./conversations/work";
import {
	businessNegotiation,
	firstMeetingWork,
} from "./conversations/work-social";

export type { ConversationOption, ConversationStep };

export const SCENARIOS: Record<string, ConversationStep[]> = {
	default: defaultScenario,
	"daily-conversations": dailyConversations,
	"airport-checkin": airportCheckin,
	"immigration-desk": immigrationDesk,
	"hotel-checkin": hotelCheckin,
	"asking-directions": askingDirections,
	pharmacy,
	"restaurant-reservation": restaurantReservation,
	"job-interview": jobInterview,
	"job-interview-smalltalk": jobInterviewSmalltalk,
	"business-negotiation": businessNegotiation,
	"first-meeting-work": firstMeetingWork,
	"ordering-food": orderingFood,
	"shopping-clothes": shoppingClothes,
	"first-date": firstDate,
	"doctor-appointment": doctorAppointment,
	"debate-tech": debateTech,
};
