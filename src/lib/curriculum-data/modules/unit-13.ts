import { Module } from '../types';

export const unit13Modules: Module[] = [
    {
      id: 'cultural-immersion',
      unitId: 'unit-13',
      title_pt: 'Imersão Cultural',
      title_en: 'Cultural Immersion',
      description_pt: 'Humor, ironia e referências culturais',
      difficulty: 'avancado',
      icon: 'Mask',
      color: 'bg-pink-700',
      order: 15,
      prerequisites: ['rhetoric-debate'],
      lessons: [
        {
          id: 'sarcasm-irony',
          title_pt: 'Sarcasmo e Ironia',
          title_en: 'Sarcasm and Irony',
          description_pt: 'Detectando o tom invisível',
          type: 'reading',
          estimatedMinutes: 30,
          xpReward: 200,
          exerciseType: 'news-comprehension',
          order: 1,
        },
        {
          id: 'complex-idioms',
          title_pt: 'Idiomas Complexos',
          title_en: 'Complex Idioms',
          description_pt: 'Expressões que confundem até nativos',
          type: 'vocabulary',
          estimatedMinutes: 35,
          xpReward: 200,
          vocabularyTopics: ['idioms-common'],
          order: 2,
        },
        {
          id: 'cultural-quiz',
          title_pt: 'Quiz Cultural',
          title_en: 'Cultural Quiz',
          description_pt: 'Você entende a cultura?',
          type: 'quiz',
          estimatedMinutes: 30,
          xpReward: 300,
          order: 3,
        }
      ]
    },
    {
      id: 'unit13-game-hangman',
      unitId: 'unit-13',
      title_pt: 'Desafio: Forca',
      title_en: 'Challenge: Hangman',
      description_pt: 'Expressões culturais.',
      difficulty: 'avancado',
      icon: 'Gamepad2',
      color: 'bg-pink-800',
      order: 4,
      lessons: [
        {
          id: 'unit13-hangman-lesson',
          title_pt: 'Jogo da Forca',
          title_en: 'Hangman',
          description_pt: 'Salve o Pobrelingo!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'hangman',
          order: 1
        }
      ]
    }
];
