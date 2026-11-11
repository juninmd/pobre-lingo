import type { ComponentType, LazyExoticComponent } from "react";
import type { PageModule } from "./routes";

type PageLoader = (
	load: () => Promise<PageModule>,
) => LazyExoticComponent<ComponentType>;

/** Rotas dos minigames do Arcade (aba Jogar). */
export const gameRoutes = (page: PageLoader) => [
	{
		path: "games/bubble-pop",
		Component: page(() => import("@/pages/games/BubblePopPage")),
	},
	{
		path: "games/speed-match",
		Component: page(() => import("@/pages/games/SpeedMatchPage")),
	},
	{
		path: "games/memory-match",
		Component: page(() => import("@/pages/games/MemoryMatchPage")),
	},
	{
		path: "games/word-scramble",
		Component: page(() => import("@/pages/games/WordScramblePage")),
	},
	{
		path: "games/flashcards",
		Component: page(() => import("@/pages/games/FlashcardsPage")),
	},
	{
		path: "games/word-search",
		Component: page(() => import("@/pages/games/WordSearchPage")),
	},
	{
		path: "games/sentence-rush",
		Component: page(() => import("@/pages/games/SentenceRushPage")),
	},
	{
		path: "games/word-wheel",
		Component: page(() => import("@/pages/games/WordWheelPage")),
	},
	{
		path: "games/hangman",
		Component: page(() => import("@/pages/games/HangmanPage")),
	},
];
