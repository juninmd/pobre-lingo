import React, { useState } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { useGamification } from '@/contexts/GamificationContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Shield, Crown, Sparkles, Gem } from 'lucide-react';
import { toast } from 'sonner';
import { Pobrelingo } from '@/components/mascot/Pobrelingo';
import confetti from 'canvas-confetti';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  category: 'powerup' | 'cosmetic' | 'subscription';
  action: (context: any) => boolean;
}

export default function ShopPage() {
  const { gems, hearts, setHearts, setGems, streak, setStreak } = useGamification();
  // We can add more state here for inventory if needed

  const handlePurchase = (item: ShopItem) => {
    if (gems < item.cost) {
      toast.error("Você não tem gemas suficientes!", {
          description: `Você precisa de mais ${item.cost - gems} gemas.`
      });
      return;
    }

    const success = item.action({ hearts, setHearts, streak, setStreak });

    if (success) {
      setGems(prev => prev - item.cost);
      toast.success(`Compra realizada: ${item.name}`, {
          icon: <span className="text-xl">💎</span>
      });
      confetti({
          particleCount: 50,
          spread: 60,
          colors: ['#3b82f6', '#1d4ed8', '#60a5fa'],
          origin: { y: 0.7 }
      });
    }
  };

  const SHOP_ITEMS: ShopItem[] = [
    {
      id: 'heart-refill',
      name: 'Recarregar Vidas',
      description: 'Recupere todas as suas 5 vidas imediatamente.',
      cost: 350,
      category: 'powerup',
      icon: <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />,
      action: ({ hearts, setHearts }) => {
        if (hearts >= 5) {
          toast.info("Suas vidas já estão cheias!");
          return false;
        }
        setHearts(5);
        return true;
      }
    },
    {
      id: 'streak-freeze',
      name: 'Congelar Ofensiva',
      description: 'Mantenha sua sequência mesmo se você perder um dia de estudo.',
      cost: 400,
      category: 'powerup',
      icon: <Shield className="w-8 h-8 text-blue-400 fill-blue-400" />,
      action: () => {
         // Logic to be implemented in a real backend or persistent state
         toast.success("Ofensiva congelada para amanhã!");
         return true;
      }
    },
    {
      id: 'double-xp',
      name: 'Poção de XP em Dobro',
      description: 'Ganhe o dobro de XP pelos próximos 30 minutos.',
      cost: 100,
      category: 'powerup',
      icon: <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />,
      action: () => {
         toast.success("XP em dobro ativado!");
         return true;
      }
    },
    {
      id: 'super-pobrelingo',
      name: 'Super Pobrelingo',
      description: 'Apoie o projeto e desbloqueie o ícone dourado.',
      cost: 2000,
      category: 'subscription',
      icon: <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500" />,
      action: () => {
          toast.success("Obrigado pelo seu apoio!");
          return true;
      }
    }
  ];

  return (
    <PageContainer className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center gap-3">
          <Gem className="w-10 h-10 text-blue-500" />
          Loja de Itens
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          Use suas gemas suadas para comprar power-ups e itens especiais!
        </p>
      </div>

      {/* Gem Balance */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Gem className="w-8 h-8" />
              </div>
              <div>
                  <p className="font-medium opacity-90">Seu Saldo</p>
                  <p className="text-3xl font-black">{gems} Gemas</p>
              </div>
          </div>
          <Button variant="secondary" className="font-bold hidden sm:flex">
            Ganhar Gemas
          </Button>
      </div>

      {/* Mascot Promo */}
      <div className="grid md:grid-cols-3 gap-6 items-center bg-card border rounded-2xl p-6 relative overflow-hidden">
          <div className="md:col-span-2 space-y-4 relative z-10">
              <h2 className="text-2xl font-bold">Pobrelingo Plus</h2>
              <p className="text-muted-foreground">
                  Apoie nossa missão de ensino gratuito e ganhe vidas infinitas, sem anúncios e suporte ao desenvolvimento.
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Saiba Mais
              </Button>
          </div>
          <div className="flex justify-center md:justify-end relative z-10">
               <Pobrelingo emotion="happy" className="w-32 h-32" />
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Shop Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOP_ITEMS.map((item) => (
            <Card key={item.id} className="relative overflow-hidden hover:border-primary/50 transition-colors group">
                <CardHeader className="pb-2">
                    <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                    <Button
                        onClick={() => handlePurchase(item)}
                        className="w-full font-bold group-hover:bg-primary group-hover:text-primary-foreground"
                        variant="secondary"
                    >
                        <Gem className="w-4 h-4 mr-2 text-blue-500 group-hover:text-white" />
                        {item.cost}
                    </Button>
                </CardContent>
            </Card>
        ))}
      </div>
    </PageContainer>
  );
}
