import { grammarCategories } from '@/lib/grammarRules';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RulesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Regras Gramaticais</h1>
      <div className="grid gap-4">
        {grammarCategories.map((category) => (
          <Link to={`/rules/${category.id}`} key={category.id}>
            <Card className="hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{category.name_pt}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{category.description_pt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}