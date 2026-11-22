const MAX_KEYS = 10_000;

/** Janela fixa por chave, em memória: basta para uma réplica só. */
export function createRateLimiter({
	limit,
	windowMs,
	now = Date.now,
	maxKeys = MAX_KEYS,
}) {
	const hits = new Map();
	// Ao lotar, descarta janelas vencidas e, se preciso, a mais antiga que não estourou:
	// limpar tudo deixaria qualquer um zerar o próprio bloqueio enviando chaves novas.
	const makeRoom = (time) => {
		for (const [key, entry] of hits) {
			if (time >= entry.resetAt) hits.delete(key);
		}
		if (hits.size < maxKeys) return;
		for (const [key, entry] of hits) {
			if (entry.count <= limit) return void hits.delete(key);
		}
		hits.delete(hits.keys().next().value);
	};
	return (key) => {
		const time = now();
		const entry = hits.get(key);
		if (!entry || time >= entry.resetAt) {
			hits.delete(key);
			if (hits.size >= maxKeys) makeRoom(time);
			hits.set(key, { count: 1, resetAt: time + windowMs });
			return true;
		}
		entry.count += 1;
		return entry.count <= limit;
	};
}
