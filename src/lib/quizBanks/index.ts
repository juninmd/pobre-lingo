import { culturalQuizBank } from "./culturalQuiz";
import { finalBossBank } from "./finalBoss";
import { fluencyChallengeBank } from "./fluencyChallenge";
import { nuanceQuizBank } from "./nuanceQuiz";
import { pastPresentA2Bank } from "./pastPresentA2";
import type { QuizQuestion } from "./types";
import { ultimateChallengeBank } from "./ultimateChallenge";

// Banks for curriculum quiz lessons that had none, keyed by lesson id.
// Merged into quizData in src/lib/quizData.ts.
export const quizBanks: Record<string, QuizQuestion[]> = {
	"ultimate-challenge": ultimateChallengeBank,
	"fluency-challenge": fluencyChallengeBank,
	"nuance-quiz": nuanceQuizBank,
	"cultural-quiz": culturalQuizBank,
	"the-final-boss": finalBossBank,
	"past-present-quiz": pastPresentA2Bank,
};
