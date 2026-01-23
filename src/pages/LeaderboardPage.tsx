import React, { useMemo } from 'react';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Crown } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';
import { cn } from '@/lib/utils';

// Helper to generate consistent procedural competitors based on a seed
// In a real app, this would come from a backend.
function generateCompetitors(baseXp: number) {
  const names = [
    'Maria Silva', 'João Santos', 'Ana Costa', 'Pedro Oliveira',
    'Lucas Ferreira', 'Carla Souza', 'Marcos Lima', 'Julia Pereira', 'Roberto Alves'
  ];

  // Use current date as seed for "weekly" leaderboard stability
  const today = new Date();
  const seed = today.getFullYear() * 100 + getWeekNumber(today);

  return names.map((name, index) => {
    // Pseudo-random generation based on seed and index
    const randomFactor = Math.sin(seed + index) * 10000;
    const randomXp = Math.floor((Math.abs(randomFactor) % 3000) + 500); // Random XP between 500 and 3500

    return {
      id: `comp-${index}`,
      name,
      xp: randomXp,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
      isMe: false
    };
  });
}

function getWeekNumber(d: Date) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
}

export default function LeaderboardPage() {
  const { xp } = useGamification();

  const leaderboardData = useMemo(() => {
    const currentUser = {
      id: 'current-user',
      name: 'Você',
      xp: xp,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PobreLingoUser',
      isMe: true
    };

    // Generate competitors dynamically
    const competitors = generateCompetitors(xp);

    // Combine and sort
    const allUsers = [...competitors, currentUser].sort((a, b) => b.xp - a.xp);
    return allUsers.slice(0, 10); // Top 10
  }, [xp]);

  // Determine League based on top user
  const leagueName = "Divisão Diamante";

  return (
    <PageContainer>
      <div className="max-w-md mx-auto py-6 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
            </div>
            <h1 className="text-2xl font-bold">{leagueName}</h1>
            <p className="text-muted-foreground">Os 10 melhores alunos desta semana</p>
        </div>

        {/* List */}
        <Card className="border-0 shadow-lg overflow-hidden">
            <div className="divide-y">
                {leaderboardData.map((user, index) => {
                    const rank = index + 1;
                    let rankIcon = null;
                    let rankColor = "text-gray-500";

                    if (rank === 1) {
                        rankIcon = <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
                        rankColor = "text-yellow-600 font-bold";
                    } else if (rank === 2) {
                        rankIcon = <Medal className="w-5 h-5 text-gray-400 fill-gray-400" />;
                        rankColor = "text-gray-500 font-bold";
                    } else if (rank === 3) {
                        rankIcon = <Medal className="w-5 h-5 text-orange-400 fill-orange-400" />;
                        rankColor = "text-orange-600 font-bold";
                    }

                    return (
                        <div
                            key={user.id}
                            className={cn(
                                "flex items-center gap-4 p-4 transition-colors",
                                user.isMe ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-muted/50"
                            )}
                        >
                            {/* Rank */}
                            <div className="w-8 flex justify-center">
                                {rankIcon || <span className={cn("text-lg", rankColor)}>{rank}</span>}
                            </div>

                            {/* Avatar */}
                            <Avatar className={cn("w-10 h-10 border-2", user.isMe ? "border-primary" : "border-transparent")}>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className={cn("font-medium", user.isMe && "text-primary font-bold")}>
                                    {user.name}
                                </h3>
                            </div>

                            {/* XP */}
                            <div className="text-right">
                                <span className="font-bold text-muted-foreground">{user.xp} XP</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>

        {/* Motivation Card */}
        <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-lg mb-1">Continue subindo!</h3>
                    <p className="text-white/80 text-sm">Complete mais lições para alcançar o topo.</p>
                </div>
                <Trophy className="w-10 h-10 text-white/50" />
            </CardContent>
        </Card>

      </div>
    </PageContainer>
  );
}
