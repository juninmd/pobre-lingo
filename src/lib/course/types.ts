export type CourseLevel = "Pré-A1" | "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface CourseQuestion {
	id: string;
	prompt: string;
	answers: string[];
	explanation: string;
}

export interface GuidedLesson {
	id: string;
	level: CourseLevel;
	title: string;
	goal: string;
	explanation: string;
	examples: { en: string; pt: string }[];
	practice: CourseQuestion[];
	check: CourseQuestion[];
	mission: string;
	practiceRoute: string;
}
