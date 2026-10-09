import type { CEFRLevel } from "./curriculumData";

export type ReaderLine = {
	en: string;
	pt: string;
};

export type GradedReader = {
	id: string;
	level: CEFRLevel;
	title: string;
	titlePt: string;
	/** Tópico estreito (narrow input) para reaproveitar vocabulário. */
	topic: string;
	minutes: number;
	lines: ReaderLine[];
};
