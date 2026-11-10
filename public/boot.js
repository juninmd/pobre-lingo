// Roda antes da primeira pintura. Arquivo externo porque a CSP do site não
// permite script inline (public/_headers).
(() => {
	// 1. Tema salvo, para a casca não piscar em branco no tema escuro.
	//    Mesma regra do ThemeProvider (src/contexts/ThemeContext.tsx).
	const root = document.documentElement;
	let theme = "light";
	try {
		theme = localStorage.getItem("vite-ui-theme") || "light";
	} catch {
		// Armazenamento bloqueado: segue no tema claro.
	}
	if (theme === "pobre-lingo") {
		root.setAttribute("data-theme", "pobre-lingo");
		root.classList.add("dark");
	} else {
		root.classList.add(theme === "dark" ? "dark" : "light");
	}

	// 2. Na tela inicial, adianta os chunks dela. O build deixa a lista em
	//    <link rel="home-preload" data-home="<base>"> inertes
	//    (config/preloadHomeRoute.ts); em outras rotas eles ficam inertes e
	//    nada extra é baixado. `data-home` é a URL da tela inicial: "/" ou
	//    "/pobre-lingo/" quando o app é servido num subcaminho.
	for (const hint of document.querySelectorAll('link[rel="home-preload"]')) {
		if (location.pathname !== hint.dataset.home) return;
		const link = document.createElement("link");
		link.rel = "modulepreload";
		link.crossOrigin = "";
		link.href = hint.href;
		document.head.appendChild(link);
	}
})();
