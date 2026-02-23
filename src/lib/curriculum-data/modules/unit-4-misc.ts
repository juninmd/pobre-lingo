import { Module } from '../types';

export const unit4MiscModules: Module[] = [
    {
      id: 'doctor-module',
      unitId: 'unit-4',
      title_pt: 'Simulação: Médico',
      title_en: 'Simulation: Doctor',
      description_pt: 'Emergência médica no exterior.',
      difficulty: 'basico',
      icon: 'Activity',
      color: 'bg-red-500',
      order: 5,
      lessons: [
        {
          id: 'doctor-appointment',
          title_pt: 'Consulta Médica',
          title_en: 'Doctor Appointment',
          description_pt: 'Descreva seus sintomas.',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 150,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    },
    {
      id: 'unit4-game-speedmatch',
      unitId: 'unit-4',
      title_pt: 'Desafio: Speed Match',
      title_en: 'Challenge: Speed Match',
      description_pt: 'Combine rápido!',
      difficulty: 'basico',
      icon: 'Zap',
      color: 'bg-yellow-600',
      order: 6,
      lessons: [
        {
          id: 'unit4-speedmatch-lesson',
          title_pt: 'Speed Match',
          title_en: 'Speed Match',
          description_pt: 'Teste seus reflexos.',
          type: 'exercise',
          estimatedMinutes: 5,
          xpReward: 200,
          gameType: 'speed-match',
          order: 1
        }
      ]
    },
    {
      id: 'unit4-game-sentencerush',
      unitId: 'unit-4',
      title_pt: 'Desafio: Frases Rápidas',
      title_en: 'Challenge: Sentence Rush',
      description_pt: 'Monte frases contra o tempo!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-cyan-600',
      order: 5,
      lessons: [
        {
          id: 'unit4-sentencerush-lesson',
          title_pt: 'Corrida de Frases',
          title_en: 'Sentence Rush',
          description_pt: 'Seja rápido!',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 150,
          gameType: 'sentence-rush',
          order: 1
        }
      ]
    }
];
