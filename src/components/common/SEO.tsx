import { useEffect } from "react";

const DEFAULT_TITLE = "PobreLingo - Inglês Grátis";
const DEFAULT_DESCRIPTION =
	"PobreLingo - Aprenda inglês de graça, do jeito certo.";

interface SEOProps {
	title?: string;
	description?: string;
	name?: string;
	type?: string;
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
	let tag = document.head.querySelector<HTMLMetaElement>(
		`meta[${attribute}="${key}"]`,
	);
	if (!tag) {
		tag = document.createElement("meta");
		tag.setAttribute(attribute, key);
		document.head.appendChild(tag);
	}
	tag.content = content;
}

function applyMeta(title: string, description: string, type: string) {
	document.title = title;
	setMeta("name", "description", description);
	setMeta("property", "og:type", type);
	setMeta("property", "og:title", title);
	setMeta("property", "og:description", description);
	setMeta("name", "twitter:title", title);
	setMeta("name", "twitter:description", description);
}

/**
 * Título e metadados da página. O Layout monta um `<SEO />` com os padrões;
 * a página sobrepõe com os dela e devolve os padrões ao sair.
 */
export function SEO({
	title,
	description = DEFAULT_DESCRIPTION,
	name = "PobreLingo",
	type = "website",
}: SEOProps) {
	const finalTitle = title ? `${title} | PobreLingo` : DEFAULT_TITLE;

	useEffect(() => {
		applyMeta(finalTitle, description, type);
		setMeta("name", "twitter:creator", name);
		setMeta("name", "twitter:card", "summary_large_image");
		return () => applyMeta(DEFAULT_TITLE, DEFAULT_DESCRIPTION, "website");
	}, [finalTitle, description, name, type]);

	return null;
}
