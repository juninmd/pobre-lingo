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

		if (theme === "pobre-lingo") {
			root.setAttribute("data-theme", "pobre-lingo");
			root.classList.add("dark"); // PobreLingo is a dark navy theme
		} else {
			root.removeAttribute("data-theme");
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
