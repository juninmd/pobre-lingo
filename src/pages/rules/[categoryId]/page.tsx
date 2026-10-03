// @ts-nocheck
import {
	ArrowLeft,
	BookOpen,
	BookOpenText,
	CheckCircle,
	ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { useStudiedRules } from "@/hooks/useStudiedRules";
import { getCategoryById } from "@/lib/grammarRules";

export default function CategoryPage() {
	const { categoryId } = useParams<{ categoryId: string }>();
	const navigate = useNavigate();
	const category = getCategoryById(categoryId!);
	const { isStudied } = useStudiedRules();

	if (!category) {
		return (
			<PageContainer>
				<div className="text-center py-12">
					<p className="text-muted-foreground">Categoria não encontrada</p>
					<Button
						variant="outline"
						onClick={() => navigate("/rules")}
						className="mt-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Regras
					</Button>
				</div>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<PageHeader
				title={category.name_pt}
				description={category.description_pt}
				icon={BookOpen}
				iconClassName="text-blue-500"
				backLink="/rules"
				backLabel="Voltar para Categorias"
			>
				<Badge variant="secondary">
					{category.rules.length}{" "}
					{category.rules.length === 1 ? "regra" : "regras"}
				</Badge>
			</PageHeader>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{category.rules.map((rule) => {
					const studied = isStudied(rule.id);
					return (
						<Link to={`/rules/${category.id}/${rule.id}`} key={rule.id}>
							<Card className="hover:shadow-md hover:border-primary/30 transition-all h-full group">
								<CardContent className="p-4 flex items-center gap-4">
									<div
										className={`p-2 rounded-lg transition-colors ${studied ? "bg-green-500/20 group-hover:bg-green-500/30" : "bg-primary/10 group-hover:bg-primary/20"}`}
									>
										{studied ? (
											<CheckCircle className="h-6 w-6 text-green-500" />
										) : (
											<BookOpenText className="h-6 w-6 text-primary" />
										)}
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2">
											<CardTitle className="text-base group-hover:text-primary transition-colors">
												{rule.title_pt}
											</CardTitle>
											{studied && (
												<Badge
													variant="outline"
													className="text-[10px] px-1.5 py-0 h-5 bg-green-500/10 text-green-600 border-green-500/30"
												>
													Estudado
												</Badge>
											)}
										</div>
										<CardDescription className="text-sm text-muted-foreground truncate">
											{rule.title_en}
										</CardDescription>
									</div>
									<ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</PageContainer>
	);
}
