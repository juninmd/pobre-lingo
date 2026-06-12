import { Headphones } from "lucide-react";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { ListeningExercise } from "@/components/exercises/ListeningExercise";

export default function ListeningPage() {
	return (
		<PageContainer>
			<PageHeader
				title="Listening Practice"
				description="Improve your listening skills with native audio"
				icon={Headphones}
				iconClassName="text-indigo-500"
				backLink="/"
				backLabel="Back to Home"
			/>
			<ListeningExercise />
		</PageContainer>
	);
}
