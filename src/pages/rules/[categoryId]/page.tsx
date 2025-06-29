import { useParams, Link } from 'react-router-dom';
import { getCategoryById } from '@/lib/grammarRules';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = getCategoryById(categoryId!);

  if (!category) {
    return <div>Categoria não encontrada</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{category.name_pt}</h1>
      <div className="grid gap-4">
        {category.rules.map((rule) => (
          <Link to={`/rules/${category.id}/${rule.id}`} key={rule.id}>
            <Card className="hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{rule.title_pt}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}