import { Module } from '../types';

export const unit7GrammarModules: Module[] = [
    {
      id: 'passive-voice',
      unitId: 'unit-7',
      title_pt: 'Voz Passiva',
      title_en: 'Passive Voice',
      description_pt: 'Aprenda a usar a voz passiva em diferentes contextos',
      difficulty: 'intermediario',
      icon: 'Repeat',
      color: 'bg-pink-500',
      order: 6,
      prerequisites: ['conditionals'],
      lessons: [
        {
          id: 'passive-basics',
          title_pt: 'Introdução à Voz Passiva',
          title_en: 'Introduction to Passive Voice',
          description_pt: 'Entenda a estrutura básica',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['passive-voice'],
          order: 1,
        },
        {
          id: 'passive-tenses',
          title_pt: 'Voz Passiva em Diferentes Tempos',
          title_en: 'Passive Voice in Different Tenses',
          description_pt: 'Use a passiva em vários tempos verbais',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          order: 2,
        },
        {
          id: 'active-passive-conversion',
          title_pt: 'Convertendo Voz Ativa e Passiva',
          title_en: 'Converting Active and Passive Voice',
          description_pt: 'Pratique conversões entre vozes',
          type: 'exercise',
          estimatedMinutes: 30,
          xpReward: 175,
          exerciseType: 'sentence-ordering',
          order: 3,
        },

        {
          id: 'passive-reading',
          title_pt: 'Leitura: Textos Formais',
          title_en: 'Reading: Formal Texts',
          description_pt: 'Leia textos que usam voz passiva',
          type: 'reading',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'news-comprehension',
          order: 4,
        },
      ],
    },
    {
      id: 'unit7-game-wordsearch',
      unitId: 'unit-7',
      title_pt: 'Desafio: Caça-Palavras',
      title_en: 'Challenge: Word Search',
      description_pt: 'Vocabulário de Negócios',
      difficulty: 'intermediario',
      icon: 'Gamepad2',
      color: 'bg-slate-600',
      order: 3,
      lessons: [
        {
          id: 'unit7-wordsearch-lesson',
          title_pt: 'Caça-Palavras',
          title_en: 'Word Search',
          description_pt: 'Encontre as palavras.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          gameType: 'word-search',
          order: 1
        }
      ]
    }
];
