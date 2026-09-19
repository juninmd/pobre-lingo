import {
	BookOpen,
	GraduationCap,
	MessageSquare,
	MessagesSquare,
	Mic,
	ScrollText,
} from "lucide-react";
import type { TrackStepKind } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const ICONS: Record<TrackStepKind, typeof BookOpen> = {
	lesson: GraduationCap,
	reader: BookOpen,
	rule: ScrollText,
	pronunciation: Mic,
	conversation: MessagesSquare,
	tutor: MessageSquare,
};

export function TrackStepIcon({
	kind,
	className,
}: {
	kind: TrackStepKind;
	className?: string;
}) {
	const Icon = ICONS[kind];
	return (
		<Icon
			className={cn("h-5 w-5 text-brand-aqua", className)}
			aria-hidden="true"
		/>
	);
}
