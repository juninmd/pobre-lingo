import { Module } from '../types';

export const unit6Modules: Module[] = [
    {
      id: 'conditionals',
      unitId: 'unit-6',
      title_pt: 'Condicionais',
      title_en: 'Conditionals',
      description_pt: 'Expresse possibilidades e hipóteses',
      difficulty: 'intermediario',
      icon: 'GitBranch',
      color: 'bg-cyan-500',
      order: 5,
      prerequisites: ['perfect-tenses'],
      lessons: [
        {
          id: 'zero-first-conditional',
          title_pt: 'Zero e First Conditional',
          title_en: 'Zero and First Conditional',
          description_pt: 'Situações reais e prováveis',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['zero-conditional', 'first-conditional'],
          order: 1,
        },
        {
          id: 'second-conditional',
          title_pt: 'Second Conditional',
          title_en: 'Second Conditional',
          description_pt: 'Situações hipotéticas no presente',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['second-conditional'],
          order: 2,
        },
        {
          id: 'third-conditional',
          title_pt: 'Third Conditional',
          title_en: 'Third Conditional',
          description_pt: 'Situações hipotéticas no passado',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['third-conditional'],
          order: 3,
        },
        {
          id: 'conditionals-practice',
          title_pt: 'Prática: Condicionais',
          title_en: 'Practice: Conditionals',
          description_pt: 'Domine as estruturas condicionais',
          type: 'exercise',
          estimatedMinutes: 35,
          xpReward: 200,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
      ],
    },
    {
      id: 'unit6-game-wordsearch',
      unitId: 'unit-6',
      title_pt: 'Desafio: Caça-Palavras',
      title_en: 'Challenge: Word Search',
      description_pt: 'Encontre as palavras condicionais',
      difficulty: 'intermediario',
      icon: 'Gamepad2',
      color: 'bg-cyan-600',
      order: 3,
      lessons: [
        {
          id: 'unit6-wordsearch-lesson',
          title_pt: 'Caça-Palavras',
          title_en: 'Word Search',
          description_pt: 'Divirta-se!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 150,
          gameType: 'word-search',
          order: 1
        }
      ]
    }
];
