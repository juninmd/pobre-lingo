import { Module, Lesson } from './curriculumData';

export function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'vocabulary' || lesson.type === 'speaking') {
    return `/vocabulary/${module.id}/${lesson.id}`;
  }
  if (lesson.type === 'quiz') {
    return `/quiz/${module.id}/${lesson.id}`;
  }
  if (lesson.type === 'grammar' && lesson.grammarRuleIds?.length) {
    return `/rules?module=${module.id}&lesson=${lesson.id}&ruleIds=${lesson.grammarRuleIds.join(',')}`;
  }
  if (lesson.type === 'reading') {
    return `/exercises/news-comprehension?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'culture') {
      // For now, mapping culture to rules page or a specific page if it exists.
      // Based on Router, there isn't a specific /culture route.
      // Usually culture tips are just reading/modal.
      // Let's assume it uses the Rules page or we need to check Router.
      return `/rules?module=${module.id}&lesson=${lesson.id}`;
  }

  // Default fallback
  return `/rules?module=${module.id}&lesson=${lesson.id}`;
}
