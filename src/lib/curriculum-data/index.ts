import { units } from './units';
import { allModules } from './modules';
import { LearningPath } from './types';

export * from './types';
export { units };
export { allModules as modules };

export const curriculumData: LearningPath = {
  id: 'english-mastery',
  name_pt: 'Jornada de Domínio do Inglês',
  name_en: 'English Mastery Journey',
  description_pt: 'Um caminho estruturado do básico ao avançado para dominar o inglês',
  units: units,
  modules: allModules,
};
