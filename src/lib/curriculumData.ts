// Sistema de Currículo Progressivo - PobreLingo
// Define a estrutura de aprendizado do básico ao avançado
import { curriculumData, LearningPath } from './curriculum-data';

export * from './curriculum-data';
export { curriculumData };

// Função auxiliar para obter estatísticas do currículo
export function getCurriculumStats(data: LearningPath = curriculumData) {
  const modules = data.modules;
  const totalModules = modules.length;

  let totalLessons = 0;
  let totalXP = 0;
  let totalMinutes = 0;
  let basicModules = 0;
  let intermediateModules = 0;
  let advancedModules = 0;

  for (const module of modules) {
    if (module.difficulty === 'basico') basicModules++;
    else if (module.difficulty === 'intermediario') intermediateModules++;
    else if (module.difficulty === 'avancado') advancedModules++;

    const lessons = module.lessons;
    const lessonCount = lessons.length;
    totalLessons += lessonCount;

    for (let i = 0; i < lessonCount; i++) {
      const lesson = lessons[i];
      totalXP += lesson.xpReward;
      totalMinutes += lesson.estimatedMinutes;
    }
  }

  return {
    totalModules,
    totalLessons,
    totalXP,
    totalMinutes,
    totalHours: Math.round(totalMinutes / 60),
    basicModules,
    intermediateModules,
    advancedModules,
  };
}
