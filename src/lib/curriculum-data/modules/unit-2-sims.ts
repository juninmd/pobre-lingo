import { Module } from '../types';

export const unit2SimsModules: Module[] = [
    {
      id: 'ordering-food-module',
      unitId: 'unit-2',
      title_pt: 'Simulação: Restaurante',
      title_en: 'Simulation: Restaurant',
      description_pt: 'Peça sua comida',
      difficulty: 'basico',
      icon: 'MessageCircle',
      color: 'bg-green-600',
      order: 3,
      lessons: [
        {
          id: 'ordering-food-sim',
          title_pt: 'Pedindo Comida',
          title_en: 'Ordering Food',
          description_pt: 'Não passe fome!',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 150,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    },
    {
      id: 'shopping-module',
      unitId: 'unit-2',
      title_pt: 'Simulação: Compras',
      title_en: 'Simulation: Shopping',
      description_pt: 'Compre roupas e negocie preços.',
      difficulty: 'basico',
      icon: 'ShoppingBag',
      color: 'bg-emerald-500',
      order: 4,
      lessons: [
        {
          id: 'shopping-clothes',
          title_pt: 'Comprando Roupas',
          title_en: 'Buying Clothes',
          description_pt: 'Escolha o tamanho certo.',
          type: 'exercise',
          estimatedMinutes: 15,
          xpReward: 150,
          exerciseType: 'conversation',
          order: 1
        }
      ]
    },
    {
      id: 'unit2-game-hangman',
      unitId: 'unit-2',
      title_pt: 'Desafio: Forca',
      title_en: 'Challenge: Hangman',
      description_pt: 'Salve o Pobrelingo!',
      difficulty: 'basico',
      icon: 'Gamepad2',
      color: 'bg-green-600',
      order: 4,
      lessons: [
        {
          id: 'unit2-hangman-lesson',
          title_pt: 'Jogo da Forca',
          title_en: 'Hangman',
          description_pt: 'Adivinhe as palavras.',
          type: 'exercise',
          estimatedMinutes: 10,
          xpReward: 100,
          gameType: 'hangman',
          order: 1
        }
      ]
    }
];
