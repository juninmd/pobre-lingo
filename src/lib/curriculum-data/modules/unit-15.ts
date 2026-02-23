import { Module } from '../types';

export const unit15Modules: Module[] = [
    {
      id: 'business-mastery-module',
      unitId: 'unit-15',
      title_pt: 'Mestrado em Negócios',
      title_en: 'Business Mastery',
      description_pt: 'Lidere reuniões e negociações',
      difficulty: 'avancado',
      icon: 'Briefcase',
      color: 'bg-emerald-700',
      order: 17,
      prerequisites: ['final-mastery'],
      lessons: [
        {
          id: 'negotiations',
          title_pt: 'Negociações Avançadas',
          title_en: 'Advanced Negotiations',
          description_pt: 'Como ganhar um debate de negócios',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 250,
          vocabularyTopics: ['business-negotiation'],
          order: 1,
        },
        {
          id: 'leadership-vocab',
          title_pt: 'Vocabulário de Liderança',
          title_en: 'Leadership Vocabulary',
          description_pt: 'Palavras de um CEO',
          type: 'vocabulary',
          estimatedMinutes: 30,
          xpReward: 250,
          vocabularyTopics: ['leadership'],
          order: 2,
        },
        {
          id: 'job-interview-sim',
          title_pt: 'Simulação: Entrevista Final',
          title_en: 'Simulation: Final Interview',
          description_pt: 'Consiga o emprego dos sonhos',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 300,
          exerciseType: 'conversation',
          order: 3,
        }
      ]
    },
    {
      id: 'business-negotiation-module',
      unitId: 'unit-15',
      title_pt: 'Simulação: Negociação',
      title_en: 'Simulation: Negotiation',
      description_pt: 'Feche o contrato.',
      difficulty: 'avancado',
      icon: 'Handshake',
      color: 'bg-emerald-800',
      order: 4,
      lessons: [
        {
          id: 'business-negotiation',
          title_pt: 'Negociação de Contrato',
          title_en: 'Contract Negotiation',
          description_pt: 'Obtenha o melhor preço.',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 500,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    }
];
