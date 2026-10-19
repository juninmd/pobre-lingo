/** Janela fixa por chave, em memória: basta para uma réplica só. */
export function createRateLimiter({ limit, windowMs, now = Date.now }) {
	const hits = new Map();
	return (key) => {
		const time = now();
		const entry = hits.get(key);
		if (!entry || time >= entry.resetAt) {
			if (hits.size > 10_000) hits.clear();
			hits.set(key, { count: 1, resetAt: time + windowMs });
			return true;
		}
		entry.count += 1;
		return entry.count <= limit;
	};
}
