import { useState } from "react";
import type { NavigateFunction } from "react-router-dom";
import { NewsComprehension } from "@/components/exercises/NewsComprehension";
import { newsComprehensionExercises } from "@/lib/exerciseData";

export function ReadingLessonWrapper({
	navigate,
	xpReward,
	moduleId,
	lessonId,
	completeLesson,
}: {
	navigate: NavigateFunction;
	xpReward: number;
	moduleId: string;
	lessonId: string;
	completeLesson: (
		moduleId: string,
		lessonId: string,
		xpReward: number,
	) => void;
}) {
	const [article] = useState(
		() =>
			newsComprehensionExercises[
				Math.floor(Math.random() * newsComprehensionExercises.length)
			],
	);

	return (
		<NewsComprehension
			exercise={article}
			onBackToList={() => navigate("/")}
			onQuizComplete={() => {
				completeLesson(moduleId, lessonId, xpReward);
			}}
		/>
	);
}
