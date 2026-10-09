/** True only for in-app paths ("/x"); rejects "//host", "/\host", schemes and whitespace tricks. */
export function isSafeInternalHref(href: unknown): href is string {
	return (
		typeof href === "string" &&
		/^\/(?![/\\])/.test(href) &&
		!/[\s\\\p{Cc}]/u.test(href)
	);
}
