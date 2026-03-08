export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  condition?: (stats: { xp: number, streak: number, gems: number }) => boolean;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_steps', title: 'Primeiros Passos', description: 'Ganhe seus primeiros 50 XP.', icon: 'Footprints' },
  { id: 'streak_3', title: 'Em Chamas', description: 'Alcance uma ofensiva de 3 dias.', icon: 'Flame' },
  { id: 'streak_7', title: 'Hábito Formado', description: 'Alcance uma ofensiva de 7 dias.', icon: 'CalendarCheck' },
  { id: 'rich', title: 'Acumulador', description: 'Junte 100 PobreCoins.', icon: 'Coins' },
  { id: 'scholar', title: 'Estudioso', description: 'Chegue ao Nível 5.', icon: 'GraduationCap' },
  { id: 'master', title: 'Mestre', description: 'Chegue ao Nível 10.', icon: 'Crown' },
];
