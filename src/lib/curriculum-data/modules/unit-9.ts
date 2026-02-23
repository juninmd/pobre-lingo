import { Module } from '../types';

export const unit9Modules: Module[] = [
    {
      id: 'native-speech',
      unitId: 'unit-9',
      title_pt: 'Fala Nativa',
      title_en: 'Native Speech',
      description_pt: 'Entenda como os nativos realmente falam (Gonna, Wanna)',
      difficulty: 'avancado',
      icon: 'Mic',
      color: 'bg-rose-500',
      order: 10,
      prerequisites: ['advanced-reading'],
      lessons: [
        {
          id: 'informal-contractions-lesson',
          title_pt: 'Contrações Informais',
          title_en: 'Informal Contractions',
          description_pt: 'Aprenda Gonna, Wanna, Gotta e mais',
          type: 'grammar',
          estimatedMinutes: 20,
          xpReward: 150,
          grammarRuleIds: ['informal-contractions'],
          order: 1,
        },
        {
          id: 'listening-native-speed',
          title_pt: 'Listening: Velocidade Real',
          title_en: 'Listening: Real Speed',
          description_pt: 'Tente entender frases faladas rapidamente',
          type: 'exercise',
          estimatedMinutes: 25,
          xpReward: 200,
          exerciseType: 'listening',
          order: 2,
        },
      ]
    },
    {
      id: 'unit9-game-sentencerush',
      unitId: 'unit-9',
      title_pt: 'Desafio: Frases Rápidas',
      title_en: 'Challenge: Sentence Rush',
      description_pt: 'Velocidade Nativa!',
      difficulty: 'avancado',
      icon: 'Gamepad2',
      color: 'bg-rose-600',
      order: 3,
      lessons: [
        {
          id: 'unit9-sentencerush-lesson',
          title_pt: 'Corrida de Frases',
          title_en: 'Sentence Rush',
          description_pt: 'Seja rápido como um nativo!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'sentence-rush',
          order: 1
        }
      ]
    },
    {
      id: 'internet-culture',
      unitId: 'unit-9',
      title_pt: 'Cultura da Internet',
      title_en: 'Internet Culture',
      description_pt: 'Gírias e abreviações do mundo digital',
      difficulty: 'avancado',
      icon: 'Smartphone',
      color: 'bg-indigo-600',
      order: 11,
      prerequisites: ['native-speech'],
      lessons: [
        {
          id: 'internet-slang-lesson',
          title_pt: 'Gírias de Internet',
          title_en: 'Internet Slang',
          description_pt: 'LOL, BRB, IDK e outras siglas',
          type: 'grammar',
          estimatedMinutes: 15,
          xpReward: 100,
          grammarRuleIds: ['slang-internet'],
          order: 1,
        },
        {
          id: 'social-media-reading',
          title_pt: 'Lendo Redes Sociais',
          title_en: 'Reading Social Media',
          description_pt: 'Interprete posts e comentários reais',
          type: 'reading',
          estimatedMinutes: 20,
          xpReward: 150,
          exerciseType: 'news-comprehension',
          order: 2,
        },
        {
          id: 'internet-bubble-challenge',
          title_pt: 'Desafio Viral: Bolhas',
          title_en: 'Viral Challenge: Bubbles',
          description_pt: 'Teste seu vocabulário de internet!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'bubble-pop',
          vocabularyTopics: ['internet-slang'],
          order: 3,
        },
        {
          id: 'ultimate-challenge',
          title_pt: 'Desafio Supremo',
          title_en: 'Ultimate Challenge',
          description_pt: 'O teste final para se tornar um mestre PobreLingo',
          type: 'quiz',
          estimatedMinutes: 60,
          xpReward: 1000,
          order: 3,
        }
      ]
    }
];
