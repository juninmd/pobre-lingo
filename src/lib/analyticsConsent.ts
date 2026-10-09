/**
 * Consentimento para gravação de sessão (LogRocket). LGPD: nada é enviado até
 * o aluno ativar explicitamente em Configurações.
 */

const CONSENT_KEY = "pobrelingo_analytics_consent";
const LOGROCKET_APP_ID = "g2noug/pobre-lingo";

export function hasAnalyticsConsent(): boolean {
	try {
		return localStorage.getItem(CONSENT_KEY) === "granted";
	} catch {
		return false;
	}
}

export function setAnalyticsConsent(granted: boolean) {
	localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
}

/** Typed text, tutor chat and imported/essay content must never reach a replay. */
export const LOGROCKET_OPTIONS = {
	dom: {
		inputSanitizer: true,
		textSanitizer: "[data-private], [data-private] *",
	},
};

/** Carrega o LogRocket sob demanda, só com consentimento. */
export async function startAnalyticsIfConsented() {
	if (!hasAnalyticsConsent()) return;
	const { default: LogRocket } = await import("logrocket");
	LogRocket.init(LOGROCKET_APP_ID, LOGROCKET_OPTIONS);
}
