import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
	title?: string;
	description?: string;
	name?: string;
	type?: string;
}

export function SEO({
	title,
	description = "PobreLingo - Aprenda inglês de graça, do jeito certo.",
	name = "PobreLingo",
	type = "website",
}: SEOProps) {
	const finalTitle = title
		? `${title} | PobreLingo`
		: "PobreLingo - Inglês Grátis";

	return (
		<Helmet>
			{/* Standard metadata tags */}
			<title>{finalTitle}</title>
			<meta name="description" content={description} />

			{/* Facebook tags */}
			<meta property="og:type" content={type} />
			<meta property="og:title" content={finalTitle} />
			<meta property="og:description" content={description} />

			{/* Twitter tags */}
			<meta name="twitter:creator" content={name} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={finalTitle} />
			<meta name="twitter:description" content={description} />
		</Helmet>
	);
}
