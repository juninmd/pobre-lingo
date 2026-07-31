import { Lightbulb, Sparkles } from "lucide-react";
import { Pobrelingo } from "@/components/mascot/Pobrelingo";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface SurpriseModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const surprises = [
	{
		type: "fact",
		title: "Did you know?",
		content:
			'The most common letter in English is "E". It appears in 11% of all words!',
		icon: Lightbulb,
	},
	{
		type: "fact",
		title: "Fun Fact",
		content:
			'A "pangram" is a sentence that uses every letter of the alphabet. Example: "The quick brown fox jumps over the lazy dog."',
		icon: Sparkles,
	},
	{
		type: "joke",
		title: "Joke Time",
		content: "Why was the math book sad? Because it had too many problems.",
		icon: Sparkles,
	},
	{
		type: "tip",
		title: "Pro Tip",
		content:
			"Watch movies in English with English subtitles to improve your listening and reading simultaneously!",
		icon: Lightbulb,
	},
	{
		type: "fact",
		title: "Word Origin",
		content:
			'The word "Goodbye" originally comes from an Old English phrase meaning "God be with ye".',
		icon: Lightbulb,
	},
	{
		type: "joke",
		title: "Joke Time",
		content: "What do you call a bear with no teeth? A gummy bear!",
		icon: Sparkles,
	},
];

import { useEffect, useState } from "react";

export function SurpriseModal({ open, onOpenChange }: SurpriseModalProps) {
	// Pick a random surprise each time it opens
	const [surprise, setSurprise] = useState(
		() => surprises[Math.floor(Math.random() * surprises.length)],
	);

	useEffect(() => {
		if (open) {
			setSurprise(surprises[Math.floor(Math.random() * surprises.length)]);
		}
	}, [open]);

	const Icon = surprise.icon;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md border-4 border-yellow-400 bg-yellow-50">
				<DialogHeader>
					<DialogTitle className="text-center text-2xl text-yellow-800 flex items-center justify-center gap-2">
						<Icon className="h-6 w-6" />
						{surprise.title}
					</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col items-center p-6 space-y-6">
					<div className="animate-bounce">
						<Pobrelingo width={120} height={120} emotion="excited" />
					</div>

					<div className="text-center p-4 bg-card rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-900/50">
						<p className="text-lg font-medium text-foreground leading-relaxed">
							"{surprise.content}"
						</p>
					</div>

					<Button
						onClick={() => onOpenChange(false)}
						className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
					>
						Awesome!
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
