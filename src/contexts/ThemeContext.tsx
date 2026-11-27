import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

export type Theme = "dark" | "light" | "pobre-lingo";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "light",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const THEMES: readonly Theme[] = ["dark", "light", "pobre-lingo"];

/**
 * Tema do Sonido para cada tema do app. O claro usa a pele clara; os dois
 * escuros usam `canto` (azul-noite), e a ponte de tokens em
 * `styles/sonido-bridge.css` troca as cores pelas do PobreLingo.
 */
const SONIDO_THEME: Record<Theme, "light" | "canto"> = {
	light: "light",
	dark: "canto",
	"pobre-lingo": "canto",
};

/** Storage may be blocked or hold a stale/edited value: never trust it. */
function readTheme(storageKey: string, fallback: Theme): Theme {
	try {
		const stored = localStorage.getItem(storageKey);
		return THEMES.find((theme) => theme === stored) ?? fallback;
	} catch {
		return fallback;
	}
}

export function ThemeProvider({
	children,
	defaultTheme = "light",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() =>
		readTheme(storageKey, defaultTheme),
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove("light", "dark", "pobre-lingo");
		// `data-theme` é do Sonido; a identidade do PobreLingo fica nas classes
		// (`dark`, `pobre-lingo`), que os tokens do app continuam lendo.
		root.setAttribute("data-theme", SONIDO_THEME[theme]);

		if (theme === "pobre-lingo") {
			root.classList.add("dark", "pobre-lingo");
		} else {
			root.classList.add(theme);
		}
	}, [theme]);

	const changeTheme = useCallback(
		(next: Theme) => {
			try {
				localStorage.setItem(storageKey, next);
			} catch {
				// Storage is full or blocked: the theme still applies for this session.
			}
			setTheme(next);
		},
		[storageKey],
	);

	const value = useMemo(
		() => ({ theme, setTheme: changeTheme }),
		[theme, changeTheme],
	);

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
