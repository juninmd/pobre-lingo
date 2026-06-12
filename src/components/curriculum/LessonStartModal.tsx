import { Star, Zap } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Lesson } from "@/lib/curriculumData";

interface LessonStartModalProps {
	isOpen: boolean;
	onClose: () => void;
	onStart: () => void;
	lesson: Lesson | null;
}

export function LessonStartModal({
	isOpen,
	onClose,
	onStart,
	lesson,
}: LessonStartModalProps) {
	if (!lesson) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md border-b-8 border-primary/20">
				<DialogHeader className="space-y-4">
					<div className="mx-auto bg-primary/10 p-4 rounded-full">
						<Zap className="w-8 h-8 text-primary" />
					</div>
					<DialogTitle className="text-center text-2xl font-black uppercase tracking-wide">
						{lesson.title_pt}
					</DialogTitle>
					<DialogDescription className="text-center text-lg font-medium text-muted-foreground">
						{lesson.description_pt}
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-center py-6">
					<div className="flex items-center gap-2 bg-yellow-400/10 text-yellow-600 px-4 py-2 rounded-xl border border-yellow-400/20 font-bold">
						<Star className="fill-yellow-500 w-5 h-5" />+{lesson.xpReward} XP
					</div>
				</div>

				<DialogFooter className="sm:justify-center">
					<Button
						className="w-full h-12 text-lg font-bold bg-green-500 hover:bg-green-600 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all"
						onClick={onStart}
					>
						COMEÇAR
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
