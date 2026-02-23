import { Module } from '../types';

export const unit3Modules: Module[] = [
    {
      id: 'past-present',
      unitId: 'unit-3',
      title_pt: 'Passado e Presente',
      title_en: 'Past and Present',
      description_pt: 'Domine os tempos verbais essenciais',
      difficulty: 'basico',
      icon: 'Clock',
      color: 'bg-purple-500',
      order: 3,
      prerequisites: ['daily-conversations'],
      lessons: [
        {
          id: 'past-simple-intro',
          title_pt: 'Past Simple',
          title_en: 'Past Simple',
          description_pt: 'Fale sobre o passado com confiança',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 100,
          grammarRuleIds: ['past-simple'],
          order: 1,
        },
        {
          id: 'present-continuous-intro',
          title_pt: 'Present Continuous',
          title_en: 'Present Continuous',
          description_pt: 'Descreva ações em andamento',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 100,
          grammarRuleIds: ['present-continuous'],
          order: 2,
        },
        {
          id: 'tense-comparison',
          title_pt: 'Comparando Tempos Verbais',
          title_en: 'Comparing Tenses',
          description_pt: 'Entenda quando usar cada tempo verbal',
          type: 'grammar',
          estimatedMinutes: 20,
          xpReward: 75,
          grammarRuleIds: ['present-simple', 'past-simple', 'present-continuous'],
          order: 3,
        },
        {
          id: 'tenses-practice',
          title_pt: 'Prática: Tempos Verbais',
          title_en: 'Practice: Verb Tenses',
          description_pt: 'Encontre erros em frases com diferentes tempos',
          type: 'exercise',
          estimatedMinutes: 25,
          xpReward: 150,
          exerciseType: 'find-incorrect-words',
          order: 4,
        },
        {
          id: 'tenses-quiz',
          title_pt: 'Quiz: Tempos Verbais',
          title_en: 'Quiz: Verb Tenses',
          description_pt: 'Teste seu domínio dos tempos verbais',
          type: 'quiz',
          estimatedMinutes: 15,
          xpReward: 175,
          order: 5,
        },
      ],
    },
    {
      id: 'unit3-game-memory',
      unitId: 'unit-3',
      title_pt: 'Desafio: Memória',
      title_en: 'Challenge: Memory Match',
      description_pt: 'Encontre os pares!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-purple-700',
      order: 5,
      lessons: [
        {
          id: 'unit3-memory-lesson',
          title_pt: 'Jogo da Memória',
          title_en: 'Memory Match',
          description_pt: 'Exercite sua mente.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          gameType: 'memory-match',
          order: 1
        }
      ]
    },
    {
      id: 'unit3-game-wordsearch',
      unitId: 'unit-3',
      title_pt: 'Desafio: Caça-Palavras',
      title_en: 'Challenge: Word Search',
      description_pt: 'Encontre os verbos!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-purple-600',
      order: 4,
      lessons: [
        {
          id: 'unit3-wordsearch-lesson',
          title_pt: 'Caça-Palavras',
          title_en: 'Word Search',
          description_pt: 'Encontre as palavras escondidas.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          gameType: 'word-search',
          order: 1
        }
      ]
    },
    {
      id: 'dating-sim-module',
      unitId: 'unit-3',
      title_pt: 'Simulação: Encontro',
      title_en: 'Simulation: First Date',
      description_pt: 'Converse e cause uma boa impressão.',
      difficulty: 'basico',
      icon: 'Heart',
      color: 'bg-pink-600',
      order: 6,
      lessons: [
        {
          id: 'first-date',
          title_pt: 'Primeiro Encontro',
          title_en: 'First Date',
          description_pt: 'Não seja estranho!',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 150,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    }
];
