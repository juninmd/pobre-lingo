import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Zap, Headphones, Brain, GraduationCap, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const games = [
  {
    id: 'word-search',
    title: 'Caça Palavras',
    description: 'Encontre as palavras escondidas na grade antes do tempo acabar!',
    icon: Search,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    href: '/games/word-search',
    difficulty: 'Medium',
    xp: '100 XP'
  },
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Memorize vocabulário com cartões interativos. Ótimo para revisão!',
    icon: GraduationCap,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    href: '/games/flashcards',
    difficulty: 'Easy',
    xp: '10 XP / Card'
  },
  {
    id: 'speed-match',
    title: 'Speed Match',
    description: 'Combine palavras o mais rápido que puder! Corra contra o relógio.',
    icon: Zap,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    href: '/games/speed-match',
    difficulty: 'Easy',
    xp: '50 XP'
  },
  {
    id: 'word-scramble',
    title: 'Word Scramble',
    description: 'Desembaralhe as letras para encontrar a palavra correta.',
    icon: Brain,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    href: '/games/word-scramble',
    difficulty: 'Medium',
    xp: '75 XP'
  },
  {
    id: 'listening-challenge',
    title: 'Desafio de Escuta',
    description: 'Treine seus ouvidos com frases faladas por nativos (ou robôs).',
    icon: Headphones,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '/exercises/listening',
    difficulty: 'Hard',
    xp: '100 XP'
  }
];

export default function ArcadePage() {
  return (
    <PageContainer>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Arcade</h1>
            <p className="text-muted-foreground mt-1">
              Divirta-se enquanto aprende com minigames rápidos!
            </p>
          </div>
          <Trophy className="h-10 w-10 text-yellow-500 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 cursor-pointer group relative overflow-hidden">
               <div className={`absolute top-0 right-0 p-3 rounded-bl-xl ${game.bgColor}`}>
                  <game.icon className={`h-6 w-6 ${game.color}`} />
               </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  {game.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {game.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="font-normal">
                    {game.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                    +{game.xp}
                  </Badge>
                </div>
                <Button asChild className="w-full group-hover:scale-105 transition-transform" size="lg">
                  <Link to={game.href}>
                    Jogar Agora
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard Teaser */}
        <div className="mt-8 bg-muted/30 rounded-xl p-6 border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center">
            <Trophy className="h-12 w-12 text-muted-foreground/20 mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground">Placar de Líderes em Breve</h3>
            <p className="text-sm text-muted-foreground/70 max-w-md">
                Continue praticando para subir no ranking quando ele for lançado!
            </p>
        </div>
      </div>
    </PageContainer>
  );
}
