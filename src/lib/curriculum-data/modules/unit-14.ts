import { Module } from '../types';

export const unit14Modules: Module[] = [
    {
      id: 'final-mastery',
      unitId: 'unit-14',
      title_pt: 'O Mestre PobreLingo',
      title_en: 'The PobreLingo Master',
      description_pt: 'O teste final. Apenas para os fortes.',
      difficulty: 'avancado',
      icon: 'Crown',
      color: 'bg-amber-500',
      order: 16,
      prerequisites: ['cultural-immersion'],
      lessons: [
        {
          id: 'c2-vocabulary',
          title_pt: 'Vocabulário C2',
          title_en: 'C2 Vocabulary',
          description_pt: 'Palavras raras e acadêmicas',
          type: 'vocabulary',
          estimatedMinutes: 40,
          xpReward: 300,
          vocabularyTopics: ['c2-vocabulary'],
          order: 1,
        },
        {
          id: 'master-reading',
          title_pt: 'Leitura de Mestre',
          title_en: 'Master Reading',
          description_pt: 'Compreensão de textos densos',
          type: 'reading',
          estimatedMinutes: 45,
          xpReward: 300,
          exerciseType: 'news-comprehension',
          order: 2,
        },
        {
          id: 'the-final-boss',
          title_pt: 'O CHEFÃO FINAL',
          title_en: 'THE FINAL BOSS',
          description_pt: 'Zere o curso e ganhe sua coroa',
          type: 'quiz',
          estimatedMinutes: 90,
          xpReward: 5000,
          order: 3,
        },
        {
          id: 'shadowing-challenge',
          title_pt: 'Desafio de Shadowing',
          title_en: 'Shadowing Challenge',
          description_pt: 'Repita frases complexas como um nativo',
          type: 'speaking',
          estimatedMinutes: 30,
          xpReward: 250,
          speakingTopics: ['complex-shadowing'],
          order: 4,
        }
      ]
    },
    {
      id: 'unit14-game-bubble',
      unitId: 'unit-14',
      title_pt: 'Desafio: Bolhas',
      title_en: 'Challenge: Bubbles',
      description_pt: 'Relaxe antes do fim.',
      difficulty: 'avancado',
      icon: 'Gamepad2',
      color: 'bg-amber-600',
      order: 5,
      lessons: [
        {
          id: 'unit14-bubble-lesson',
          title_pt: 'Bubble Pop',
          title_en: 'Bubble Pop',
          description_pt: 'Vocabulário C2.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'bubble-pop',
          order: 1
        }
      ]
    }
];
