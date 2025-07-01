import { useParams, Link } from 'react-router-dom';
import { getCategoryById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpenText, ChevronRight } from 'lucide-react'; // Importar ícones
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const category = getCategoryById(categoryId!);

  if (!category) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Button>
      <h1 className="text-3xl font-bold mb-4">{category.name_pt}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {category.rules.map((rule) => (
          <Link to={`/rules/${category.id}/${rule.id}`} key={rule.id}>
            <Card className="hover:bg-muted/50 transition-colors duration-200 flex items-center p-4">
              <BookOpenText className="h-8 w-8 text-primary mr-4" />
              <div className="flex-1">
                <CardTitle className="text-lg">{rule.title_pt}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{rule.title_en}</CardDescription>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
