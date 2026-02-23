import { Module } from '../types';

export const unit5Modules: Module[] = [
    {
      id: 'perfect-tenses',
      unitId: 'unit-5',
      title_pt: 'Tempos Perfeitos',
      title_en: 'Perfect Tenses',
      description_pt: 'Avance com os tempos verbais perfeitos',
      difficulty: 'intermediario',
      icon: 'Award',
      color: 'bg-orange-500',
      order: 4,
      prerequisites: ['past-present'],
      lessons: [
        {
          id: 'present-perfect-intro',
          title_pt: 'Present Perfect',
          title_en: 'Present Perfect',
          description_pt: 'Conecte o passado com o presente',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['present-perfect'],
          order: 1,
        },
        {
          id: 'past-perfect-intro',
          title_pt: 'Past Perfect',
          title_en: 'Past Perfect',
          description_pt: 'Fale sobre ações antes de outras no passado',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 125,
          grammarRuleIds: ['past-perfect'],
          order: 2,
        },
        {
          id: 'perfect-vs-simple',
          title_pt: 'Perfect vs Simple',
          title_en: 'Perfect vs Simple',
          description_pt: 'Entenda as diferenças sutis',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 100,
          order: 3,
        },
        {
          id: 'perfect-tenses-practice',
          title_pt: 'Prática: Tempos Perfeitos',
          title_en: 'Practice: Perfect Tenses',
          description_pt: 'Aplique seu conhecimento em exercícios',
          type: 'exercise',
          estimatedMinutes: 30,
          xpReward: 175,
          exerciseType: 'sentence-identification',
          order: 4,
        },
        {
          id: 'perfect-reading',
          title_pt: 'Leitura: Experiências de Vida',
          title_en: 'Reading: Life Experiences',
          description_pt: 'Leia textos que usam tempos perfeitos',
          type: 'reading',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'news-comprehension',
          order: 5,
        },
      ],
    },
    {
      id: 'unit5-game-scramble',
      unitId: 'unit-5',
      title_pt: 'Desafio: Embaralhado',
      title_en: 'Challenge: Word Scramble',
      description_pt: 'Organize as letras!',
      difficulty: 'intermediario',
      icon: 'Gamepad2',
      color: 'bg-orange-700',
      order: 6,
      lessons: [
        {
          id: 'unit5-scramble-lesson',
          title_pt: 'Word Scramble',
          title_en: 'Word Scramble',
          description_pt: 'Desembaralhe as palavras.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 150,
          gameType: 'word-scramble',
          order: 1
        }
      ]
    },
    {
      id: 'unit5-game-flashcards',
      unitId: 'unit-5',
      title_pt: 'Desafio: Flashcards',
      title_en: 'Challenge: Flashcards',
      description_pt: 'Vocabulário Avançado',
      difficulty: 'intermediario',
      icon: 'Gamepad2',
      color: 'bg-orange-600',
      order: 5,
      lessons: [
        {
          id: 'unit5-flashcards-lesson',
          title_pt: 'Flashcards',
          title_en: 'Flashcards',
          description_pt: 'Memorize verbos.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          gameType: 'flashcards',
          order: 1
        }
      ]
    }
];
