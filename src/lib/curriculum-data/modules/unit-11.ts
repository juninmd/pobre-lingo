import { Module } from '../types';

export const unit11Modules: Module[] = [
    {
      id: 'nuance-mastery',
      unitId: 'unit-11',
      title_pt: 'Maestria da Nuance',
      title_en: 'Nuance Mastery',
      description_pt: 'Vocabulário preciso e descrições detalhadas',
      difficulty: 'avancado',
      icon: 'Feather',
      color: 'bg-fuchsia-600',
      order: 13,
      prerequisites: ['professional-fluency'],
      lessons: [
        {
          id: 'advanced-adjectives',
          title_pt: 'Adjetivos Sofisticados',
          title_en: 'Sophisticated Adjectives',
          description_pt: 'Pragmático, efêmero, meticuloso...',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 200,
          vocabularyTopics: ['advanced-adjectives'],
          order: 1,
        },
        {
          id: 'descriptive-writing',
          title_pt: 'Escrita Descritiva',
          title_en: 'Descriptive Writing',
          description_pt: 'Melhore seus textos com detalhes',
          type: 'reading',
          estimatedMinutes: 35,
          xpReward: 200,
          exerciseType: 'news-comprehension',
          order: 2,
        },
        {
          id: 'nuance-quiz',
          title_pt: 'Quiz de Nuance',
          title_en: 'Nuance Quiz',
          description_pt: 'Teste sua precisão',
          type: 'quiz',
          estimatedMinutes: 25,
          xpReward: 250,
          order: 3,
        }
      ]
    },
    {
      id: 'unit11-game-speedmatch',
      unitId: 'unit-11',
      title_pt: 'Desafio: Speed Match',
      title_en: 'Challenge: Speed Match',
      description_pt: 'Combine adjetivos complexos.',
      difficulty: 'avancado',
      icon: 'Zap',
      color: 'bg-fuchsia-700',
      order: 4,
      lessons: [
        {
          id: 'unit11-speedmatch-lesson',
          title_pt: 'Speed Match',
          title_en: 'Speed Match',
          description_pt: 'Teste seus reflexos.',
          type: 'exercise',
          estimatedMinutes: 5,
          xpReward: 250,
          gameType: 'speed-match',
          order: 1
        }
      ]
    }
];
