import { Module, Lesson } from '@/lib/curriculumData';

export function getLessonLink(module: Module, lesson: Lesson): string {
  if (lesson.exerciseType) {
    return `/exercises/${lesson.exerciseType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.gameType) {
    return `/games/${lesson.gameType}?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'vocabulary') {
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
    return `/rules?module=${module.id}&lesson=${lesson.id}`;
  }
  if (lesson.type === 'speaking') {
    return `/exercises/conversation?module=${module.id}&lesson=${lesson.id}`;
  }
  return `/rules?module=${module.id}&lesson=${lesson.id}`;
}
