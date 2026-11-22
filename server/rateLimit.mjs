const MAX_KEYS = 10_000;

/** Janela fixa por chave, em memória: basta para uma réplica só. */
export function createRateLimiter({
	limit,
	windowMs,
	now = Date.now,
	maxKeys = MAX_KEYS,
}) {
	// Map guarda a ordem de inserção; como resetAt = inserção + windowMs, as vencidas ficam no começo.
	const hits = new Map();
	// Chaves ainda abaixo do limite, na mesma ordem: acha a despejável sem varrer as bloqueadas.
	const open = new Set();
	const drop = (key) => {
		hits.delete(key);
		open.delete(key);
	};
	// Ao lotar, descarta janelas vencidas e, se preciso, a mais antiga que não estourou:
	// limpar tudo deixaria qualquer um zerar o próprio bloqueio enviando chaves novas.
	const makeRoom = (time) => {
		for (const [key, entry] of hits) {
			if (time < entry.resetAt) break;
			drop(key);
		}
		if (hits.size < maxKeys) return;
		drop(open.size ? open.values().next().value : hits.keys().next().value);
	};
	return (key) => {
		const time = now();
		const entry = hits.get(key);
		if (!entry || time >= entry.resetAt) {
			drop(key);
			if (hits.size >= maxKeys) makeRoom(time);
			hits.set(key, { count: 1, resetAt: time + windowMs });
			if (limit >= 1) open.add(key);
			return true;
		}
		entry.count += 1;
		if (entry.count > limit) open.delete(key);
		return entry.count <= limit;
	};
}
