import { Module } from '../types';

export const unit4TravelModules: Module[] = [
    {
      id: 'travel-basics',
      unitId: 'unit-4',
      title_pt: 'Inglês para Viagem',
      title_en: 'Travel English',
      description_pt: 'Vocabulário e frases essenciais para viajar',
      difficulty: 'basico',
      icon: 'Plane',
      color: 'bg-cyan-500',
      order: 4,
      prerequisites: ['past-present'],
      lessons: [
        {
          id: 'airport-vocabulary',
          title_pt: 'No Aeroporto',
          title_en: 'At the Airport',
          description_pt: 'Check-in, segurança e embarque',
          type: 'vocabulary',
          estimatedMinutes: 20,
          xpReward: 80,
          vocabularyTopics: ['airport', 'travel-documents'],
          order: 1,
        },
        {
          id: 'hotel-checkin',
          title_pt: 'No Hotel',
          title_en: 'At the Hotel',
          description_pt: 'Fazendo check-in e pedindo serviços',
          type: 'vocabulary',
          estimatedMinutes: 20,
          xpReward: 80,
          vocabularyTopics: ['hotel'],
          order: 2,
        },
        {
          id: 'directions',
          title_pt: 'Pedindo Informações',
          title_en: 'Asking for Directions',
          description_pt: 'Como chegar onde você quer',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 100,
          exerciseType: 'listening',
          order: 3,
        },
        {
          id: 'travel-etiquette',
          title_pt: 'Etiqueta de Viagem',
          title_en: 'Travel Etiquette',
          description_pt: 'Regras sociais e gorjetas no exterior',
          type: 'culture',
          estimatedMinutes: 15,
          xpReward: 100,
          order: 4,
        }
      ]
    },
    {
      id: 'travel-conversation-module',
      unitId: 'unit-4',
      title_pt: 'Simulação: Aeroporto',
      title_en: 'Simulation: Airport',
      description_pt: 'Pratique o check-in',
      difficulty: 'basico',
      icon: 'MessageCircle',
      color: 'bg-cyan-600',
      order: 4,
      lessons: [
        {
          id: 'airport-checkin-sim',
          title_pt: 'Check-in no Aeroporto',
          title_en: 'Airport Check-in',
          description_pt: 'Fale com o agente',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 150,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    }
];
