// Exemplo de como integrar o sistema de currículo com exercícios existentes
// Este arquivo demonstra como marcar lições como completas ao finalizar exercícios

import { useState } from "react";
import { LessonCompletionDialog } from "@/components/curriculum/LessonCompletionDialog";
import { curriculumData } from "@/lib/curriculumData";

/**
 * Exemplo de integração em um componente de exercício
 *
 * Copie este padrão para seus exercícios existentes:
 * - SentenceOrdering.tsx
 * - SentenceIdentification.tsx
 * - FindIncorrectWords.tsx
 * - NewsComprehension.tsx
 */

export function ExerciseExample() {
	const [showCompletion, setShowCompletion] = useState(false);
	const [_exerciseCompleted, setExerciseCompleted] = useState(false);

	// Quando o exercício for completado com sucesso
	const handleExerciseComplete = () => {
		setExerciseCompleted(true);

		// Encontrar a lição correspondente ao exercício atual
		// Exemplo para "sentence-ordering"
		const module = curriculumData.modules.find((m) =>
			m.lessons.some((l) => l.exerciseType === "sentence-ordering"),
		);

		if (module) {
			const lesson = module.lessons.find(
				(l) => l.exerciseType === "sentence-ordering",
			);

			if (lesson) {
				// Mostrar dialog de conclusão
				setShowCompletion(true);
			}
		}
	};

	return (
		<>
			{/* Seu exercício aqui */}
			<button type="button" onClick={handleExerciseComplete}>
				Completar Exercício
			</button>

			{/* Dialog de conclusão */}
			{showCompletion && (
				<LessonCompletionDialog
					open={showCompletion}
					onClose={() => setShowCompletion(false)}
					moduleId="foundations" // ID do módulo
					lessonId="simple-sentences-practice" // ID da lição
					xpReward={100} // XP da lição
					lessonTitle="Prática: Frases Simples" // Título da lição
				/>
			)}
		</>
	);
}

/**
 * Função auxiliar para encontrar lição por tipo de exercício
 */
export function findLessonByExerciseType(
	exerciseType:
		| "sentence-ordering"
		| "sentence-identification"
		| "find-incorrect-words"
		| "news-comprehension",
): {
	moduleId: string;
	lessonId: string;
	xpReward: number;
	lessonTitle: string;
} | null {
	for (const module of curriculumData.modules) {
		const lesson = module.lessons.find((l) => l.exerciseType === exerciseType);
		if (lesson) {
			return {
				moduleId: module.id,
				lessonId: lesson.id,
				xpReward: lesson.xpReward,
				lessonTitle: lesson.title_pt,
			};
		}
	}
	return null;
}

/**
 * EXEMPLO DE INTEGRAÇÃO COMPLETA
 *
 * 1. Importe as funções necessárias:
 *
 * import { useState } from 'react';
 * import { LessonCompletionDialog } from '@/components/curriculum/LessonCompletionDialog';
 * import { findLessonByExerciseType } from '@/examples/curriculum-integration-example';
 *
 * 2. Adicione state no seu componente:
 *
 * const [showCompletion, setShowCompletion] = useState(false);
 * const [lessonInfo, setLessonInfo] = useState(null);
 *
 * 3. Quando o exercício for completado:
 *
 * const handleSuccess = () => {
 *   const info = findLessonByExerciseType('sentence-ordering');
 *   if (info) {
 *     setLessonInfo(info);
 *     setShowCompletion(true);
 *   }
 * };
 *
 * 4. Adicione o Dialog no final do JSX:
 *
 * {showCompletion && lessonInfo && (
 *   <LessonCompletionDialog
 *     open={showCompletion}
 *     onClose={() => setShowCompletion(false)}
 *     moduleId={lessonInfo.moduleId}
 *     lessonId={lessonInfo.lessonId}
 *     xpReward={lessonInfo.xpReward}
 *     lessonTitle={lessonInfo.lessonTitle}
 *   />
 * )}
 */

/**
 * MAPEAMENTO DE EXERCÍCIOS PARA LIÇÕES
 *
 * sentence-ordering -> foundations/simple-sentences-practice
 * sentence-identification -> daily-conversations/conversation-practice
 * find-incorrect-words -> past-present/tenses-practice
 * news-comprehension -> perfect-tenses/perfect-reading
 *
 * Você pode ter múltiplas lições para o mesmo tipo de exercício
 * em diferentes módulos. Ajuste a lógica conforme necessário.
 */
