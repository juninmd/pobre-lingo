import { Module } from '../types';

export const unit7BusinessModules: Module[] = [
    {
      id: 'business-english',
      unitId: 'unit-7',
      title_pt: 'Inglês para Negócios',
      title_en: 'Business English',
      description_pt: 'Vocabulário e situações do mundo corporativo',
      difficulty: 'intermediario',
      icon: 'Briefcase',
      color: 'bg-slate-500',
      order: 7,
      prerequisites: ['passive-voice'],
      lessons: [
        {
          id: 'emails',
          title_pt: 'Emails Profissionais',
          title_en: 'Professional Emails',
          description_pt: 'Como escrever emails formais',
          type: 'vocabulary',
          estimatedMinutes: 25,
          xpReward: 100,
          vocabularyTopics: ['business-writing'],
          order: 1,
        },
        {
          id: 'meetings',
          title_pt: 'Reuniões',
          title_en: 'Meetings',
          description_pt: 'Vocabulário para participar de reuniões',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 100,
          exerciseType: 'listening',
          order: 2,
        },
        {
          id: 'presentations',
          title_pt: 'Apresentações',
          title_en: 'Presentations',
          description_pt: 'Dicas para apresentar em inglês',
          type: 'reading',
          estimatedMinutes: 30,
          xpReward: 120,
          exerciseType: 'news-comprehension',
          order: 3,
        },
        {
          id: 'presentation-speaking',
          title_pt: 'Discurso: Apresentações',
          title_en: 'Speaking: Presentations',
          description_pt: 'Treine frases para apresentações profissionais',
          type: 'speaking',
          estimatedMinutes: 20,
          xpReward: 150,
          speakingTopics: ['presentation-phrases'],
          order: 4,
        }
      ]
    },
    {
      id: 'job-interview-module',
      unitId: 'unit-7',
      title_pt: 'Simulação: Entrevista',
      title_en: 'Simulation: Job Interview',
      description_pt: 'Pratique para sua entrevista',
      difficulty: 'intermediario',
      icon: 'Briefcase',
      color: 'bg-slate-700',
      order: 8,
      lessons: [
        {
          id: 'job-interview-sim-mid',
          title_pt: 'Entrevista de Emprego',
          title_en: 'Job Interview',
          description_pt: 'Responda com confiança',
          type: 'exercise',
          estimatedMinutes: 20,
          xpReward: 200,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    }
];
