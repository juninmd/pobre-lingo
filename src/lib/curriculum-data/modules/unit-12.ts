import { Module } from '../types';

export const unit12Modules: Module[] = [
    {
      id: 'rhetoric-debate',
      unitId: 'unit-12',
      title_pt: 'Retórica e Debate',
      title_en: 'Rhetoric and Debate',
      description_pt: 'Argumentação lógica e persuasão',
      difficulty: 'avancado',
      icon: 'Mic2',
      color: 'bg-violet-700',
      order: 14,
      prerequisites: ['nuance-mastery'],
      lessons: [
        {
          id: 'persuasive-language',
          title_pt: 'Linguagem Persuasiva',
          title_en: 'Persuasive Language',
          description_pt: 'Palavras que convencem',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 200,
          order: 1,
        },
        {
          id: 'debate-structure',
          title_pt: 'Estrutura de Debate',
          title_en: 'Debate Structure',
          description_pt: 'Como organizar seus argumentos',
          type: 'grammar',
          estimatedMinutes: 30,
          xpReward: 200,
          grammarRuleIds: ['inversion-emphasis'],
          order: 2,
        },
        {
          id: 'logical-connectors',
          title_pt: 'Conectivos Lógicos',
          title_en: 'Logical Connectors',
          description_pt: 'Portanto, contudo, todavia...',
          type: 'exercise',
          estimatedMinutes: 25,
          xpReward: 200,
          exerciseType: 'sentence-ordering',
          order: 3,
        },
        {
          id: 'debate-speaking',
          title_pt: 'Discurso: Debate',
          title_en: 'Speaking: Debate',
          description_pt: 'Pratique argumentação oral',
          type: 'speaking',
          estimatedMinutes: 25,
          xpReward: 175,
          speakingTopics: ['debate-openers'],
          order: 4,
        }
      ]
    },
    {
      id: 'debate-tech-module',
      unitId: 'unit-12',
      title_pt: 'Debate: Tecnologia',
      title_en: 'Debate: Technology',
      description_pt: 'Discuta sobre IA e o futuro.',
      difficulty: 'avancado',
      icon: 'Cpu',
      color: 'bg-violet-600',
      order: 5,
      lessons: [
        {
          id: 'debate-tech',
          title_pt: 'Debate sobre IA',
          title_en: 'AI Debate',
          description_pt: 'A tecnologia é perigosa?',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 250,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    },
    {
      id: 'unit12-game-speedmatch',
      unitId: 'unit-12',
      title_pt: 'Desafio: Mestre da Velocidade',
      title_en: 'Challenge: Speed Master',
      description_pt: 'Nível C2!',
      difficulty: 'avancado',
      icon: 'Zap',
      color: 'bg-violet-800',
      order: 5,
      lessons: [
        {
          id: 'unit12-speedmatch-lesson',
          title_pt: 'Speed Match: Elite',
          title_en: 'Speed Match: Elite',
          description_pt: 'Apenas para os mestres.',
          type: 'exercise',
          estimatedMinutes: 5,
          xpReward: 500,
          gameType: 'speed-match',
          order: 1
        }
      ]
    }
];
