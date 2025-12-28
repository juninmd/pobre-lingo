import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/common/PageContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { curriculumData, Lesson, Module } from '@/lib/curriculumData';
import { useCurriculumProgress } from '@/hooks/useCurriculumProgress';
import { BookOpen, CheckCircle2, Star, ArrowRight, ArrowLeft, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dados de vocabulário por tópico
const vocabularyData: Record<string, { word: string; translation: string; example: string }[]> = {
  alphabet: [
    { word: 'A (ei)', translation: 'Letra A - pronuncia "ei"', example: 'Apple, Ate, Amazing' },
    { word: 'B (bi)', translation: 'Letra B - pronuncia "bi"', example: 'Book, Beautiful, Big' },
    { word: 'C (si)', translation: 'Letra C - pronuncia "si"', example: 'Cat, City, Circle' },
    { word: 'D (di)', translation: 'Letra D - pronuncia "di"', example: 'Dog, Dance, Day' },
    { word: 'E (i)', translation: 'Letra E - pronuncia "i"', example: 'Egg, Elephant, End' },
    { word: 'F (éf)', translation: 'Letra F - pronuncia "éf"', example: 'Fish, Friend, Fun' },
    { word: 'G (dji)', translation: 'Letra G - pronuncia "dji"', example: 'Game, Great, Good' },
    { word: 'H (eitch)', translation: 'Letra H - pronuncia "eitch"', example: 'House, Happy, Help' },
    { word: 'I (ai)', translation: 'Letra I - pronuncia "ai"', example: 'Ice, Island, Idea' },
    { word: 'J (djei)', translation: 'Letra J - pronuncia "djei"', example: 'Jump, Just, Joy' },
    { word: 'K (kei)', translation: 'Letra K - pronuncia "kei"', example: 'King, Keep, Kind' },
    { word: 'L (él)', translation: 'Letra L - pronuncia "él"', example: 'Love, Learn, Life' },
    { word: 'M (êm)', translation: 'Letra M - pronuncia "êm"', example: 'Mother, Music, Magic' },
    { word: 'N (ên)', translation: 'Letra N - pronuncia "ên"', example: 'Name, Night, New' },
    { word: 'O (ou)', translation: 'Letra O - pronuncia "ou"', example: 'Ocean, Open, Old' },
    { word: 'P (pi)', translation: 'Letra P - pronuncia "pi"', example: 'People, Perfect, Place' },
    { word: 'Q (kiu)', translation: 'Letra Q - pronuncia "kiu"', example: 'Queen, Question, Quick' },
    { word: 'R (ar)', translation: 'Letra R - pronuncia "ar"', example: 'Run, Really, Right' },
    { word: 'S (és)', translation: 'Letra S - pronuncia "és"', example: 'Sun, Smile, Story' },
    { word: 'T (ti)', translation: 'Letra T - pronuncia "ti"', example: 'Time, True, Take' },
    { word: 'U (iu)', translation: 'Letra U - pronuncia "iu"', example: 'Use, Under, Up' },
    { word: 'V (vi)', translation: 'Letra V - pronuncia "vi"', example: 'Very, Voice, View' },
    { word: 'W (dâbliu)', translation: 'Letra W - pronuncia "dâbliu"', example: 'Water, World, Why' },
    { word: 'X (éks)', translation: 'Letra X - pronuncia "éks"', example: 'Example, Exit, Box' },
    { word: 'Y (uai)', translation: 'Letra Y - pronuncia "uai"', example: 'Yes, Year, Young' },
    { word: 'Z (zi)', translation: 'Letra Z - pronuncia "zi"', example: 'Zero, Zoo, Zigzag' },
  ],
  'basic-sounds': [
    { word: '/æ/ (cat)', translation: 'Som do A em "gato" - vogal curta', example: 'Cat, hat, mat, bat, sad' },
    { word: '/eɪ/ (cake)', translation: 'Som do A em "bolo" - vogal longa', example: 'Cake, make, take, late, name' },
    { word: '/ɑː/ (car)', translation: 'Som do A em "carro" - vogal profunda', example: 'Car, far, star, park, hard' },
    { word: '/ɛ/ (bed)', translation: 'Som do E em "cama" - vogal curta', example: 'Bed, red, get, let, help' },
    { word: '/iː/ (see)', translation: 'Som do I longo em "ver"', example: 'See, tree, bee, free, meet' },
    { word: '/ɪ/ (sit)', translation: 'Som do I curto em "sentar"', example: 'Sit, hit, bit, fit, big' },
    { word: '/aɪ/ (like)', translation: 'Som do I em "gostar" - ditongo', example: 'Like, bike, time, white, fly' },
    { word: '/ɒ/ (hot)', translation: 'Som do O em "quente" - vogal curta', example: 'Hot, not, dog, stop, clock' },
    { word: '/əʊ/ (go)', translation: 'Som do O em "ir" - vogal longa', example: 'Go, no, home, hope, phone' },
    { word: '/ɔː/ (ball)', translation: 'Som do O em "bola" - vogal longa', example: 'Ball, tall, call, walk, talk' },
    { word: '/ʊ/ (book)', translation: 'Som do U em "livro" - vogal curta', example: 'Book, look, good, foot, put' },
    { word: '/uː/ (food)', translation: 'Som do U em "comida" - vogal longa', example: 'Food, moon, soon, blue, true' },
    { word: '/ʌ/ (cup)', translation: 'Som do U em "xícara" - vogal média', example: 'Cup, but, run, love, come' },
    { word: '/ɜː/ (bird)', translation: 'Som do ER em "pássaro"', example: 'Bird, word, girl, first, work' },
    { word: '/ə/ (about)', translation: 'Som do schwa - vogal neutra', example: 'About, banana, again, sofa' },
    { word: '/eə/ (hair)', translation: 'Som do AR em "cabelo" - ditongo', example: 'Hair, care, there, where, pair' },
    { word: '/ɔɪ/ (boy)', translation: 'Som do OI em "menino" - ditongo', example: 'Boy, toy, enjoy, voice, noise' },
    { word: '/aʊ/ (how)', translation: 'Som do OU em "como" - ditongo', example: 'How, now, brown, house, loud' },
    { word: '/p/ (pen)', translation: 'Som do P - consoante surda', example: 'Pen, put, happy, stop' },
    { word: '/b/ (ball)', translation: 'Som do B - consoante sonora', example: 'Ball, big, rabbit, club' },
    { word: '/t/ (time)', translation: 'Som do T - consoante surda', example: 'Time, top, better, cat' },
    { word: '/d/ (day)', translation: 'Som do D - consoante sonora', example: 'Day, did, ladder, bad' },
    { word: '/k/ (cat)', translation: 'Som do K/C - consoante surda', example: 'Cat, keep, book, cook' },
    { word: '/g/ (go)', translation: 'Som do G - consoante sonora', example: 'Go, get, bigger, dog' },
    { word: '/f/ (fish)', translation: 'Som do F - fricativa surda', example: 'Fish, fun, coffee, laugh' },
    { word: '/v/ (van)', translation: 'Som do V - fricativa sonora', example: 'Van, very, have, love' },
    { word: '/θ/ (think)', translation: 'Som do TH surdo em "pensar"', example: 'Think, thank, mouth, bath' },
    { word: '/ð/ (this)', translation: 'Som do TH sonoro em "este"', example: 'This, that, mother, with' },
    { word: '/s/ (sun)', translation: 'Som do S - sibilante surda', example: 'Sun, sit, pass, face' },
    { word: '/z/ (zoo)', translation: 'Som do Z - sibilante sonora', example: 'Zoo, zip, busy, has' },
    { word: '/ʃ/ (she)', translation: 'Som do CH em "ela"', example: 'She, ship, wash, machine' },
    { word: '/ʒ/ (vision)', translation: 'Som do J francês em "visão"', example: 'Vision, measure, beige' },
    { word: '/tʃ/ (church)', translation: 'Som do TCH em "igreja"', example: 'Church, chat, match, catch' },
    { word: '/dʒ/ (jump)', translation: 'Som do J em "pular"', example: 'Jump, job, age, bridge' },
    { word: '/h/ (hat)', translation: 'Som do H aspirado', example: 'Hat, help, behind, who' },
    { word: '/m/ (man)', translation: 'Som do M - nasal', example: 'Man, make, swim, home' },
    { word: '/n/ (no)', translation: 'Som do N - nasal', example: 'No, nice, run, pen' },
    { word: '/ŋ/ (sing)', translation: 'Som do NG em "cantar"', example: 'Sing, ring, long, think' },
    { word: '/l/ (love)', translation: 'Som do L - lateral', example: 'Love, like, tell, ball' },
    { word: '/r/ (run)', translation: 'Som do R inglês', example: 'Run, read, very, car' },
    { word: '/w/ (we)', translation: 'Som do W - semivogal', example: 'We, why, swim, away' },
    { word: '/j/ (yes)', translation: 'Som do Y - semivogal', example: 'Yes, you, beyond, few' },
  ],
  greetings: [
    { word: 'Hello', translation: 'Olá', example: 'Hello! How are you?' },
    { word: 'Good morning', translation: 'Bom dia', example: 'Good morning, everyone!' },
    { word: 'Good afternoon', translation: 'Boa tarde', example: 'Good afternoon, sir.' },
    { word: 'Good evening', translation: 'Boa noite (saudação)', example: 'Good evening, folks!' },
    { word: 'Good night', translation: 'Boa noite (despedida)', example: 'Good night, sleep well!' },
    { word: 'Goodbye', translation: 'Adeus', example: 'Goodbye! See you later.' },
    { word: 'See you', translation: 'Até logo', example: 'See you tomorrow!' },
    { word: 'How are you?', translation: 'Como você está?', example: 'Hi! How are you today?' },
    { word: "I'm fine", translation: 'Estou bem', example: "I'm fine, thank you!" },
    { word: 'Thank you', translation: 'Obrigado(a)', example: 'Thank you very much!' },
  ],
  numbers: [
    { word: 'One', translation: 'Um', example: 'I have one apple.' },
    { word: 'Two', translation: 'Dois', example: 'Two cats are playing.' },
    { word: 'Three', translation: 'Três', example: 'Three students arrived.' },
    { word: 'Four', translation: 'Quatro', example: 'I have four brothers.' },
    { word: 'Five', translation: 'Cinco', example: 'Five days a week.' },
    { word: 'Six', translation: 'Seis', example: 'Six o\'clock.' },
    { word: 'Seven', translation: 'Sete', example: 'Seven colors in the rainbow.' },
    { word: 'Eight', translation: 'Oito', example: 'Eight hours of sleep.' },
    { word: 'Nine', translation: 'Nove', example: 'Nine players on the team.' },
    { word: 'Ten', translation: 'Dez', example: 'Ten fingers.' },
  ],
  colors: [
    { word: 'Red', translation: 'Vermelho', example: 'The apple is red.' },
    { word: 'Blue', translation: 'Azul', example: 'The sky is blue.' },
    { word: 'Green', translation: 'Verde', example: 'The grass is green.' },
    { word: 'Yellow', translation: 'Amarelo', example: 'The sun is yellow.' },
    { word: 'Black', translation: 'Preto', example: 'The night is black.' },
    { word: 'White', translation: 'Branco', example: 'Snow is white.' },
    { word: 'Orange', translation: 'Laranja', example: 'The orange is orange.' },
    { word: 'Purple', translation: 'Roxo', example: 'The flower is purple.' },
    { word: 'Pink', translation: 'Rosa', example: 'Her dress is pink.' },
    { word: 'Brown', translation: 'Marrom', example: 'The tree is brown.' },
  ],
  family: [
    { word: 'Father', translation: 'Pai', example: 'My father is a teacher.' },
    { word: 'Mother', translation: 'Mãe', example: 'My mother cooks well.' },
    { word: 'Brother', translation: 'Irmão', example: 'I have one brother.' },
    { word: 'Sister', translation: 'Irmã', example: 'My sister is younger.' },
    { word: 'Grandfather', translation: 'Avô', example: 'My grandfather tells stories.' },
    { word: 'Grandmother', translation: 'Avó', example: 'Grandmother makes cookies.' },
    { word: 'Son', translation: 'Filho', example: 'He is my son.' },
    { word: 'Daughter', translation: 'Filha', example: 'She is my daughter.' },
    { word: 'Husband', translation: 'Marido', example: 'This is my husband.' },
    { word: 'Wife', translation: 'Esposa', example: 'This is my wife.' },
  ],
  introductions: [
    { word: 'My name is...', translation: 'Meu nome é...', example: 'My name is John.' },
    { word: 'I am from...', translation: 'Eu sou de...', example: 'I am from Brazil.' },
    { word: 'Nice to meet you', translation: 'Prazer em conhecê-lo', example: 'Nice to meet you, too!' },
    { word: 'What is your name?', translation: 'Qual é o seu nome?', example: 'What is your name, please?' },
    { word: 'Where are you from?', translation: 'De onde você é?', example: 'Where are you from?' },
    { word: 'I live in...', translation: 'Eu moro em...', example: 'I live in São Paulo.' },
    { word: 'I work as...', translation: 'Eu trabalho como...', example: 'I work as a teacher.' },
    { word: 'I am ... years old', translation: 'Eu tenho ... anos', example: 'I am 25 years old.' },
  ],
  'idioms-common': [
    { word: 'Break a leg', translation: 'Boa sorte', example: 'Break a leg on your exam!' },
    { word: 'Piece of cake', translation: 'Muito fácil', example: 'The test was a piece of cake.' },
    { word: 'Hit the books', translation: 'Estudar', example: 'I need to hit the books tonight.' },
    { word: 'Under the weather', translation: 'Doente/indisposto', example: 'I\'m feeling under the weather today.' },
    { word: 'Costs an arm and a leg', translation: 'Muito caro', example: 'That car costs an arm and a leg.' },
    { word: 'Let the cat out of the bag', translation: 'Revelar um segredo', example: 'Don\'t let the cat out of the bag!' },
    { word: 'Once in a blue moon', translation: 'Muito raramente', example: 'I see him once in a blue moon.' },
    { word: 'Spill the beans', translation: 'Contar o segredo', example: 'She spilled the beans about the party.' },
  ],
  'phrasal-verbs-advanced': [
    { word: 'Look forward to', translation: 'Aguardar ansiosamente', example: 'I look forward to seeing you.' },
    { word: 'Put up with', translation: 'Tolerar/aguentar', example: 'I can\'t put up with this noise.' },
    { word: 'Run into', translation: 'Encontrar por acaso', example: 'I ran into an old friend yesterday.' },
    { word: 'Get along with', translation: 'Se dar bem com', example: 'I get along with my colleagues.' },
    { word: 'Come across', translation: 'Encontrar/deparar-se', example: 'I came across an interesting article.' },
    { word: 'Bring up', translation: 'Mencionar/criar (filhos)', example: 'Don\'t bring up that subject.' },
    { word: 'Turn down', translation: 'Recusar/baixar volume', example: 'She turned down the job offer.' },
    { word: 'Call off', translation: 'Cancelar', example: 'They called off the meeting.' },
  ],
  'slang': [
    { word: 'Cool', translation: 'Legal/massa', example: 'That\'s so cool!' },
    { word: 'Awesome', translation: 'Incrível', example: 'The concert was awesome!' },
    { word: 'Chill', translation: 'Relaxado/relaxar', example: 'Let\'s just chill today.' },
    { word: 'Hang out', translation: 'Sair/ficar junto', example: 'Want to hang out later?' },
    { word: 'Grab', translation: 'Pegar (informal)', example: 'Let\'s grab some coffee.' },
    { word: 'Freak out', translation: 'Pirar/enlouquecer', example: 'Don\'t freak out!' },
  ],
  'colloquialisms': [
    { word: 'You bet', translation: 'Com certeza', example: 'Will you help me? You bet!' },
    { word: 'No way', translation: 'De jeito nenhum', example: 'No way I\'m doing that!' },
    { word: 'Kind of', translation: 'Meio que/mais ou menos', example: 'I\'m kind of tired.' },
    { word: 'Sort of', translation: 'Tipo/mais ou menos', example: 'It\'s sort of complicated.' },
    { word: 'Big deal', translation: 'Grande coisa', example: 'It\'s not a big deal.' },
    { word: 'Catch up', translation: 'Colocar em dia/alcançar', example: 'Let\'s catch up soon!' },
  ],
};

export default function VocabularyLessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { completeLesson, isLessonCompleted } = useCurriculumProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  // Encontrar a lição
  const module = curriculumData.modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);

  if (!module || !lesson) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Lição não encontrada</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/curriculum')}>
              Voltar para o Currículo
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }

  // Obter palavras de vocabulário
  const topics = lesson.vocabularyTopics || [];
  const allWords = topics.flatMap(topic => vocabularyData[topic] || []);

  const currentWord = allWords[currentIndex];
  const progress = ((currentIndex + 1) / allWords.length) * 100;
  const completed = isLessonCompleted(moduleId!, lessonId!);

  const handleNext = () => {
    if (currentIndex < allWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const handleMaster = () => {
    setMastered(prev => new Set(prev).add(currentIndex));
  };

  const handleComplete = () => {
    if (!completed) {
      completeLesson(moduleId!, lessonId!, lesson.xpReward);
    }
    navigate('/curriculum');
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/curriculum')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o Currículo
          </Button>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">{lesson.title_pt}</h1>
            {completed && (
              <Badge className="bg-green-500">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completo
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">{lesson.description_pt}</p>
        </div>

        {/* Progresso */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progresso</span>
              <span className="font-medium">
                {currentIndex + 1} / {allWords.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="mt-2 text-sm text-muted-foreground">
              {mastered.size} palavras dominadas
            </div>
          </CardContent>
        </Card>

        {/* Card de Vocabulário */}
        {currentWord && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Palavra {currentIndex + 1}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranslation(!showTranslation)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {showTranslation ? 'Ocultar' : 'Mostrar'} Tradução
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Palavra em Inglês */}
                <div className="text-center p-8 bg-blue-50 rounded-lg">
                  <h2 className="text-4xl font-bold mb-4">{currentWord.word}</h2>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Tradução */}
                {showTranslation && (
                  <div className="text-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
                    <p className="text-2xl font-semibold text-green-900">
                      {currentWord.translation}
                    </p>
                  </div>
                )}

                {/* Exemplo */}
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Exemplo:</h3>
                  <p className="text-lg italic">{currentWord.example}</p>
                </div>

                {/* Botão Dominar */}
                <div className="text-center">
                  <Button
                    onClick={handleMaster}
                    disabled={mastered.has(currentIndex)}
                    variant={mastered.has(currentIndex) ? "outline" : "default"}
                  >
                    {mastered.has(currentIndex) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Dominada
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        Marcar como Dominada
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navegação */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          {currentIndex === allWords.length - 1 ? (
            <Button onClick={handleComplete} size="lg">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {completed ? 'Voltar ao Currículo' : 'Concluir Lição'}
              {!completed && ` (+${lesson.xpReward} XP)`}
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Próxima
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
