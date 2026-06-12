import type { Lesson, Module } from "./curriculumData";

export function getLessonLink(module: Module, lesson: Lesson): string {
	// 0. Game Type (Highest Priority)
	if (lesson.gameType) {
		// Handle explicit game types that match route names
		// Bubble Pop needs to be handled if its route matches the gameType string, which it does ('bubble-pop')
		return `/games/${lesson.gameType}?module=${module.id}&lesson=${lesson.id}`;
	}

	// 1. Explicit Exercise Type
	if (lesson.exerciseType) {
		return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
	}

	// 2. Vocabulary & Speaking
	if (lesson.type === "vocabulary" || lesson.type === "speaking") {
		return `/vocabulary/${module.id}/${lesson.id}`;
	}

	// 3. Quiz
	if (lesson.type === "quiz") {
		return `/quiz/${module.id}/${lesson.id}`;
	}

	// 4. Grammar
	if (lesson.type === "grammar") {
		// If it has specific rules, link to them. Otherwise, fallback to rules page.
		if (lesson.grammarRuleIds?.length) {
			return `/rules?module=${module.id}&lesson=${lesson.id}&ruleIds=${lesson.grammarRuleIds.join(",")}`;
		}
		// Fallback: If no specific rules, maybe it's a general grammar lesson.
		// Ideally, every grammar lesson should have ids.
		return `/rules?module=${module.id}&lesson=${lesson.id}`;
	}

	// 5. Reading & Culture
	// Culture lessons are often reading-based. If no explicit exercise type is set,
	// treat them as 'news-comprehension' (generic reading) or similar.
	if (lesson.type === "reading" || lesson.type === "culture") {
		return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
	}

	// Default fallback for unknown types
	return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
}
