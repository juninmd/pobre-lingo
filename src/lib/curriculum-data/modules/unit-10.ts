import { Module } from '../types';

export const unit10Modules: Module[] = [
    {
      id: 'professional-fluency',
      unitId: 'unit-10',
      title_pt: 'Fluência Profissional',
      title_en: 'Professional Fluency',
      description_pt: 'Domine estruturas formais e nuance para o ambiente de trabalho e acadêmico.',
      difficulty: 'avancado',
      icon: 'Briefcase',
      color: 'bg-emerald-600',
      order: 12,
      prerequisites: ['internet-culture'],
      lessons: [
        {
          id: 'subjunctive-lesson',
          title_pt: 'Modo Subjuntivo',
          title_en: 'Subjunctive Mood',
          description_pt: 'Aprenda a fazer sugestões e demandas formais',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 150,
          grammarRuleIds: ['subjunctive-mood'],
          order: 1,
        },
        {
          id: 'inversion-lesson',
          title_pt: 'Inversão para Ênfase',
          title_en: 'Inversion for Emphasis',
          description_pt: 'Estruturas sofisticadas para discursos e escrita',
          type: 'grammar',
          estimatedMinutes: 25,
          xpReward: 150,
          grammarRuleIds: ['inversion-emphasis'],
          order: 2,
        },
        {
          id: 'debate-vocabulary',
          title_pt: 'Vocabulário de Debate',
          title_en: 'Debate Vocabulary',
          description_pt: 'Palavras para argumentar e persuadir',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 150,
          vocabularyTopics: ['debate', 'persuasion'],
          order: 3,
        },
        {
          id: 'fluency-challenge',
          title_pt: 'Desafio de Fluência',
          title_en: 'Fluency Challenge',
          description_pt: 'Prove que você é fluente',
          type: 'quiz',
          estimatedMinutes: 45,
          xpReward: 1000,
          order: 4,
        }
      ]
    },
    {
      id: 'unit10-game-scramble',
      unitId: 'unit-10',
      title_pt: 'Desafio: Embaralhado',
      title_en: 'Challenge: Word Scramble',
      description_pt: 'Ordene as palavras.',
      difficulty: 'avancado',
      icon: 'Gamepad2',
      color: 'bg-emerald-700',
      order: 5,
      lessons: [
        {
          id: 'unit10-scramble-lesson',
          title_pt: 'Word Scramble',
          title_en: 'Word Scramble',
          description_pt: 'Desembaralhe as palavras.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 200,
          gameType: 'word-scramble',
          order: 1
        }
      ]
    }
];
