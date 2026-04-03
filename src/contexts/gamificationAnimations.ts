import confetti from 'canvas-confetti';
import { toast } from 'sonner';

export const triggerLevelUpAnimation = (level: number) => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#eab308', '#3b82f6', '#22c55e', '#ef4444'],
  });

  toast.success(`Nível Atualizado!`, {
    description: `Parabéns, você alcançou o Nível ${level}!`,
    icon: '👑',
    duration: 5000,
  });
};

export const triggerCoinAnimation = (amount: number) => {
  toast.success(`+${amount} PobreCoins`, {
    icon: '🪙',
    duration: 3000,
  });

  const numCoins = Math.min(amount, 10);
  const colors = ['#f59e0b', '#fbbf24', '#fcd34d']; // Gold colors
  confetti({
    particleCount: numCoins,
    spread: 60,
    origin: { y: 0.1, x: 0.8 }, // Top right corner near the coins counter
    colors: colors,
    shapes: ['circle'],
    gravity: 1.5,
    scalar: 1.2,
    ticks: 100,
    disableForReducedMotion: true,
  });
};
