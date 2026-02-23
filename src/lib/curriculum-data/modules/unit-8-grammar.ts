import { Module } from '../types';

export const unit8GrammarModules: Module[] = [
    {
      id: 'advanced-grammar',
      unitId: 'unit-8',
      title_pt: 'Gramática Avançada',
      title_en: 'Advanced Grammar',
      description_pt: 'Estruturas gramaticais complexas e sofisticadas',
      difficulty: 'avancado',
      icon: 'Brain',
      color: 'bg-red-500',
      order: 7,
      prerequisites: ['passive-voice'],
      lessons: [
        {
          id: 'reported-speech',
          title_pt: 'Discurso Indireto',
          title_en: 'Reported Speech',
          description_pt: 'Relate o que outros disseram',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['reported-speech'],
          order: 1,
        },
        {
          id: 'modal-verbs-advanced',
          title_pt: 'Verbos Modais Avançados',
          title_en: 'Advanced Modal Verbs',
          description_pt: 'Nuances dos verbos modais',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['modals'],
          order: 2,
        },
        {
          id: 'relative-clauses',
          title_pt: 'Orações Relativas',
          title_en: 'Relative Clauses',
          description_pt: 'Conecte ideias com cláusulas relativas',
          type: 'grammar',
          estimatedMinutes: 35,
          xpReward: 150,
          grammarRuleIds: ['relative-clauses'],
          order: 3,
        },

        {
          id: 'advanced-grammar-practice',
          title_pt: 'Prática: Gramática Avançada',
          title_en: 'Practice: Advanced Grammar',
          description_pt: 'Exercícios complexos de gramática',
          type: 'exercise',
          estimatedMinutes: 40,
          xpReward: 225,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
      ],
    },
    {
      id: 'unit8-game-sentencerush',
      unitId: 'unit-8',
      title_pt: 'Desafio: Frases Rápidas',
      title_en: 'Challenge: Sentence Rush',
      description_pt: 'Gramática Avançada',
      difficulty: 'avancado',
      icon: 'Gamepad2',
      color: 'bg-red-600',
      order: 3,
      lessons: [
        {
          id: 'unit8-sentencerush-lesson',
          title_pt: 'Corrida de Frases',
          title_en: 'Sentence Rush',
          description_pt: 'Seja rápido!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'sentence-rush',
          order: 1
        }
      ]
    }
];
