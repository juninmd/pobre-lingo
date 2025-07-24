import { PageContainer } from '@/components/common/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sentenceOrderingExercises, correctSentenceIdentificationExercises, findIncorrectWordsExercises, newsComprehensionExercises } from '@/lib/exerciseData';


const exerciseTypes = [
  { id: 'sentence-ordering', label: 'Ordenar Frases', path: '/exercises/sentence-ordering' },
  { id: 'sentence-identification', label: 'Identificar Sentenças Corretas', path: '/exercises/sentence-identification' },
  { id: 'find-incorrect-words', label: 'Encontrar Palavras Incorretas', path: '/exercises/find-incorrect-words' },
  { id: 'news-comprehension', label: 'Compreensão de Notícias', path: '/exercises/news-comprehension' },
];

export default function QuizGeneratorPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('any');
  const navigate = useNavigate();

  const handleTypeChange = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId) ? prev.filter(id => id !== typeId) : [...prev, typeId]
    );
  };

  const handleStartQuiz = () => {
    let allExercises: any[] = [];

    if (selectedTypes.includes('sentence-ordering')) {
      allExercises = [...allExercises, ...sentenceOrderingExercises];
    }
    if (selectedTypes.includes('sentence-identification')) {
      allExercises = [...allExercises, ...correctSentenceIdentificationExercises];
    }
    if (selectedTypes.includes('find-incorrect-words')) {
      allExercises = [...allExercises, ...findIncorrectWordsExercises];
    }
    if (selectedTypes.includes('news-comprehension')) {
      allExercises = [...allExercises, ...newsComprehensionExercises];
    }

    const filteredExercises = difficulty === 'any'
      ? allExercises
      : allExercises.filter(ex => ex.difficulty === difficulty);

    // Shuffle the exercises for variety
    const shuffledExercises = filteredExercises.sort(() => Math.random() - 0.5);

    navigate('/exercises/quiz', { state: { exercises: shuffledExercises } });
  };

  return (
    <PageContainer>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Configure seu Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">1. Escolha os Tipos de Exercício</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exerciseTypes.map(type => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => handleTypeChange(type.id)}
                    />
                    <Label htmlFor={type.id} className="cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">2. Escolha a Dificuldade</h3>
              <Select onValueChange={setDifficulty} defaultValue={difficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Qualquer Dificuldade</SelectItem>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleStartQuiz} disabled={selectedTypes.length === 0} className="w-full">
              Começar Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}