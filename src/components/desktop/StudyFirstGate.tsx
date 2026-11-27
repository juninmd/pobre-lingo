import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { loadGoalMinutes, minutesToday } from "@/lib/dailySession";
import {
	loadStudyFirst,
	saveStudyFirst,
	shouldShowGate,
	snooze,
	snoozesLeft,
	startSession,
} from "@/lib/studyFirst";
import { getStudyLog } from "@/lib/studyLogStore";

const CHECK_MS = 60_000;

/** Modo "estudar primeiro": pede a meta do dia antes do resto, com adiamento limitado. */
export function StudyFirstGate() {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const check = () => {
			const now = new Date();
			const reached = minutesToday(getStudyLog(), now) >= loadGoalMinutes();
			setVisible(shouldShowGate(loadStudyFirst(), now, reached));
		};
		check();
		const id = setInterval(check, CHECK_MS);
		document.addEventListener("visibilitychange", check);
		return () => {
			clearInterval(id);
			document.removeEventListener("visibilitychange", check);
		};
	}, []);

	if (!visible) return null;
	const now = new Date();
	const state = loadStudyFirst();
	const left = snoozesLeft(state, now);

	const start = () => {
		saveStudyFirst(startSession(state, now));
		setVisible(false);
		navigate("/");
	};
	const postpone = () => {
		saveStudyFirst(snooze(state, now));
		setVisible(false);
	};

	return (
		<Dialog open>
			<DialogContent
				onEscapeKeyDown={(e) => e.preventDefault()}
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle>Inglês primeiro</DialogTitle>
					<DialogDescription>
						Sua meta de {loadGoalMinutes()} minutos de hoje ainda não foi
						cumprida.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" disabled={left === 0} onClick={postpone}>
						{left === 0
							? "Sem adiamentos hoje"
							: `Adiar 30 min (${left} restantes)`}
					</Button>
					<Button onClick={start}>Começar agora</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
