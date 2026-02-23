import { Module } from '../types';

export const unit1GamesModules: Module[] = [
    {
      id: 'foundations-game-module',
      unitId: 'unit-1',
      title_pt: 'Desafio: Flashcards',
      title_en: 'Challenge: Flashcards',
      description_pt: 'Teste sua memória!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-yellow-500',
      order: 2,
      lessons: [
        {
          id: 'foundations-flashcards-lesson',
          title_pt: 'Flashcards',
          title_en: 'Flashcards',
          description_pt: 'Memorize as palavras.',
          type: 'exercise',
          estimatedMinutes: 5,
          xpReward: 50,
          gameType: 'flashcards',
          order: 1
        }
      ]
    },
    {
      id: 'foundations-game-bubble',
      unitId: 'unit-1',
      title_pt: 'Desafio: Bolhas',
      title_en: 'Challenge: Bubbles',
      description_pt: 'Estoure as bolhas!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-sky-500',
      order: 3,
      lessons: [
        {
          id: 'foundations-bubble-lesson',
          title_pt: 'Bubble Pop',
          title_en: 'Bubble Pop',
          description_pt: 'Combine cores e números.',
          type: 'exercise',
          estimatedMinutes: 5,
          xpReward: 100,
          gameType: 'bubble-pop',
          order: 1
        }
      ]
    }
];
