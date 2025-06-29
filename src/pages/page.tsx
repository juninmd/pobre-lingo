import { grammarCategories } from '@/lib/grammarRules';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Clock, Palette, MapPin, Users, Link as LinkIcon, AlignLeft, LucideIcon, Sigma, SearchX, FileText } from 'lucide-react';
import { SectionTitle } from '@/components/common/SectionTitle';
import { LearningStreakDisplay } from '@/components/streaks/LearningStreakDisplay';
import { Link } from 'react-router-dom';

const iconMap: { [key: string]: LucideIcon } = {
  BookOpen,
  Clock,
  Palette,
  MapPin,
  Users,
  Link: LinkIcon,
  AlignLeft,
  Sigma,
  SearchX,
  FileText,
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <Card className="bg-primary/10 border-primary/30 shadow-lg">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">Bem-vindo ao PobreLingo!</h1>
            <p className="mt-2 text-lg text-foreground/80">
              Sua jornada para dominar a gramática inglesa começa aqui. Explore as regras, pratique com exercícios e acompanhe seu progresso.
            </p>
            <Link to="/rules">
              <Button className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                Começar a Aprender <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 md:mt-0 md:ml-6">
             <img src="https://placehold.co/300x200.png" alt="Learning Illustration" width={300} height={200} className="rounded-lg" data-ai-hint="education learning" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <SectionTitle>Categorias de Regras</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {grammarCategories.map((category) => {
              const IconComponent = category.icon ? iconMap[category.icon] || BookOpen : BookOpen;
              return (
                <Link to={`/rules/${category.id}`} key={category.id}>
                  <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col bg-card">
                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg font-semibold text-primary">{category.name_pt}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-sm text-muted-foreground">{category.description_pt}</CardDescription>
                    </CardContent>
                     <CardContent className="pt-0">
                       <Button variant="link" className="text-primary p-0 h-auto">
                        Ver Regras <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            </div>
        </div>
        <div className="space-y-6">
          <SectionTitle>Seu Progresso</SectionTitle>
          <LearningStreakDisplay />
           <Card className="bg-card shadow-lg">
            <CardHeader>
              <CardTitle className="text-primary">Exercícios Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to="/exercises/sentence-ordering">
                <Button variant="outline" className="w-full justify-start text-foreground">Ordenar Frases</Button>
              </Link>
              <Link to="/exercises/sentence-identification">
                <Button variant="outline" className="w-full justify-start text-foreground">Identificar Frases Corretas</Button>
              </Link>
              <Link to="/exercises/find-incorrect-words">
                <Button variant="outline" className="w-full justify-start text-foreground">Procurar Palavras Erradas</Button>
              </Link>
              <Link to="/exercises/news-comprehension">
                <Button variant="outline" className="w-full justify-start text-foreground">Interpretação de Artigos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
